//Key Handler
$(window).keydown(function (event) {
    game_controller.handleKeyPress(event.key);
});

//Game Controller Constructor
function Game_controller() {
    /***************************************************************************************************
     * startGame - occurs in initializeApp() on document load.  Creates players and adds them to game_model
     * @param  {undefined} none
     * @returns {undefined} none
     * @calls {undefined} none
     */
    this.initializePlayers = function () {
        var playerOne = new Player_model();
        var playerTwo = new Player_model();

        playerOne.initializeAvailableKeys(1);
        playerTwo.initializeAvailableKeys(2);

        playerOne.index = 0;
        playerTwo.index = 1;
        game_model.players = [playerOne, playerTwo]
    };
    /***************************************************************************************************
     * end game - finds youtube video, changes background image, and shows start button
     * @param  (winnerPlayerModel) - player model of the winner
     */
    this.endGame = function (winnerPlayerModel) {
        get_youtube_data(winnerPlayerModel.pokemon.name).then(winner_video, failed_video);
        // displayWinVideo(winnerPlayerModel).then(play_video, no_video); // make this into a promise
        view.backgroundImage();
        $("#start_button").show();
    };

    /***************************************************************************************************
     * startTimer - initiates countdown, and triggers the start of the round after the countdown
     * @param  (time, startOfGame) - length of countdown, and a bool to check if this is the first round of the game
     */
    this.startTimer = function (time, startOfGame) { //Countdown that starts the round - triggered by button press
        view.updateBars();
        if (startOfGame) {
            player_controller.getPokemon(game_model.players[0]);
            player_controller.getPokemon(game_model.players[1]);
            $(".player_stats").find('ul').remove();
            game_model.players[0].completedMoves = 0;
            game_model.players[1].completedMoves = 0;
            view.displayCards();
            setTimeout(function(){
                $('.card').addClass('flipped');
            },2000);
        }
        audio_handler.play_sound('countdown');
        game_model.timerValue = time;
        view.remove_tablet_highlights();
        var timeBetweenUpdates = 1000;
        game_model.timerInterval = setInterval(function () {
            game_model.timerValue = game_model.timerValue - timeBetweenUpdates;
            if (game_model.timerValue / 1000 !== 0) {
                view.displayCountdownNumber(game_model.timerValue / 1000);
            } else {
                $("#pokeBall").show();
                setTimeout(function () {
                    $("#pokeBall").hide();
                }, 750)
            }

            if (game_model.timerValue <= 0) {
                view.updateBars();
                game_controller.startRound(startOfGame);
                this.clearInterval(game_model.timerInterval);
                view.updateBarCounter()
            }
        }, timeBetweenUpdates);
        view.displayCountdownNumber(game_model.timerValue / 1000);
    };

    /***************************************************************************************************
     * startRound - round begins, player commands are given and received
     * @param  (startOfGame) -  a bool to check if this is the first round of the game
     */
    this.startRound = function (startOfGame) {
        if (startOfGame) {
            get_card_api_data.get_pokemonDB(game_model.players[0].pokemon.name, '#player_0_stats').then(get_card_api_data.resolve_pokeDB, get_card_api_data.reject_pokeDB);
            get_card_api_data.get_pokemonDB(game_model.players[1].pokemon.name, '#player_1_stats').then(get_card_api_data.resolve_pokeDB, get_card_api_data.reject_pokeDB);
            view.remove_tablet_highlights();
            audio_handler.play_main();
            audio_handler.stop_victory_music();
            audio_handler.victory_phase = false;
            audio_handler.battle_phase = true;
        }
        game_model.roundStarted = true;
        player_controller.getRequiredMove(game_model.players[0]);
        player_controller.getRequiredMove(game_model.players[1]);
        view.displayPlayerName(game_model.players[0]);
        view.displayPlayerName(game_model.players[1]);
    };

    /***************************************************************************************************
     * handleKeyPress - deals with player input and compares it with game commands.  Triggered by key handler
     * @param  (keyPress)
     */
    this.handleKeyPress = function (keyPress) {
        if (game_model.roundStarted) {
            if (game_model.players[0].availableKeys.indexOf(keyPress) !== -1) { //player 1 keys
                if (game_model.players[0].requiredMove === keyPress) {
                    player_controller.completeMove(game_model.players[0]);
                    $('.player_0_arrows').addClass('tablet_right_move');
                    $('.player_0_arrows').removeClass('tablet_wrong_move');
                } else {
                    player_controller.missMove(game_model.players[0]);
                    $('.player_0_arrows').addClass('tablet_wrong_move');
                    $('.player_0_arrows').removeClass('tablet_right_move');
                }
                $('.player_0_arrows').find('.tablet_arrows').css('background', 'none');

            } else if (game_model.players[1].availableKeys.indexOf(keyPress) !== -1) { //player 2 keys
                if (game_model.players[1].requiredMove === keyPress) {
                    player_controller.completeMove(game_model.players[1]);
                    $('.player_1_arrows').addClass('tablet_right_move');
                    $('.player_1_arrows').removeClass('tablet_wrong_move');
                } else {
                    player_controller.missMove(game_model.players[1]);
                    $('.player_1_arrows').addClass('tablet_wrong_move');
                    $('.player_0_arrows').removeClass('tablet_right_move');
                }
                $('.player_1_arrows').find('.tablet_arrows').css('background', 'none');
            }
        }
    }
    this.tablet_arrows = function () {
        // const arrow_container = $(this).parent();
        // console.log(arrow_container[0]);
        // $(arrow_container[0]).find('.tablet_arrows').css('background','none');
        const arrow = $(this).attr('id');
        console.log(arrow);
        game_controller.handleKeyPress(arrow);

    }
}