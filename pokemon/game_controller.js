//Key Handler
$(window).keydown(function (event) {
    gameController.handleKeyPress(event.key);
});

//Game Controller Constructor
function GameController() {
    /***************************************************************************************************
     * startGame - occurs in initializeApp() on document load.  Creates players and adds them to gameModel
     * @param  {undefined} none
     * @returns {undefined} none
     * @calls {undefined} none
     */
    this.initializePlayers = function () {
        var playerOne = new PlayerModel();
        var playerTwo = new PlayerModel();

        playerOne.initializeAvailableKeys(1);
        playerTwo.initializeAvailableKeys(2);

        playerOne.index = 0;
        playerTwo.index = 1;
        gameModel.players = [playerOne, playerTwo]
    };
    /***************************************************************************************************
     * end game - finds youtube video, changes background image, and shows start button
     * @param  (winnerPlayerModel) - player model of the winner
     */
    this.endGame = function (winnerPlayerModel) {
        getYoutubeData(winnerPlayerModel.pokemon.name).then(winnerVideo, failedVideo);
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
            playerController.getPokemon(gameModel.players[0]);
            playerController.getPokemon(gameModel.players[1]);
            $(".player_stats").find('ul').remove();
            gameModel.players[0].completedMoves = 0;
            gameModel.players[1].completedMoves = 0;
            view.displayCards();
            setTimeout(function(){
                $('.card').addClass('flipped');
            },2000);
        }

        audioHandler.playSound('countdown');
        gameModel.timerValue = time;
        view.removeTabletHighlights();


        var timeBetweenUpdates = 1000;
        gameModel.timerInterval = setInterval(function () {
            gameModel.timerValue = gameModel.timerValue - timeBetweenUpdates;
            if (gameModel.timerValue / 1000 !== 0) {
                view.displayCountdownNumber(gameModel.timerValue / 1000);
            } else {
                $("#pokeBall").show();
                setTimeout(function () {
                    $("#pokeBall").hide();
                }, 750)
            }

            if (gameModel.timerValue <= 0) {
                view.updateBars();
                gameController.startRound(startOfGame);
                this.clearInterval(gameModel.timerInterval);
                view.updateBarCounter()
            }
        }, timeBetweenUpdates);
        view.displayCountdownNumber(gameModel.timerValue / 1000);
    };

    /***************************************************************************************************
     * startRound - round begins, player commands are given and received
     * @param  (startOfGame) -  a bool to check if this is the first round of the game
     */
    this.startRound = function (startOfGame) {
        if (startOfGame) {
            getCardApiData.getPokemonDB(gameModel.players[0].pokemon.name, '#player_0_stats').then(getCardApiData.resolvePokeDB, getCardApiData.rejectPokeDB);
            getCardApiData.getPokemonDB(gameModel.players[1].pokemon.name, '#player_1_stats').then(getCardApiData.resolvePokeDB, getCardApiData.rejectPokeDB);
            view.removeTabletHighlights();
            audioHandler.playMain();
            audioHandler.stopVictoryMusic();
            audioHandler.victoryPhase = false;
            audioHandler.battlePhase = true;
        }
        gameModel.roundStarted = true;
        playerController.getRequiredMove(gameModel.players[0]);
        playerController.getRequiredMove(gameModel.players[1]);
        view.displayPlayerName(gameModel.players[0]);
        view.displayPlayerName(gameModel.players[1]);
    };

    /***************************************************************************************************
     * handleKeyPress - deals with player input and compares it with game commands.  Triggered by key handler
     * @param  (keyPress)
     */
    this.handleKeyPress = function (keyPress) {
        if (gameModel.roundStarted) {
            if (gameModel.players[0].availableKeys.indexOf(keyPress) !== -1) { //player 1 keys
                if (gameModel.players[0].requiredMove === keyPress) {
                    playerController.completeMove(gameModel.players[0]);
                    $('.player_0_arrows').addClass('tablet_right_move');
                    $('.player_0_arrows').removeClass('tablet_wrong_move');
                } else {
                    playerController.missMove(gameModel.players[0]);
                    $('.player_0_arrows').addClass('tablet_wrong_move');
                    $('.player_0_arrows').removeClass('tablet_right_move');
                }
                $('.player_0_arrows').find('.tablet_arrows').css('background', 'none');

            } else if (gameModel.players[1].availableKeys.indexOf(keyPress) !== -1) { //player 2 keys
                if (gameModel.players[1].requiredMove === keyPress) {
                    playerController.completeMove(gameModel.players[1]);
                    $('.player_1_arrows').addClass('tablet_right_move');
                    $('.player_1_arrows').removeClass('tablet_wrong_move');
                } else {
                    playerController.missMove(gameModel.players[1]);
                    $('.player_1_arrows').addClass('tablet_wrong_move');
                    $('.player_0_arrows').removeClass('tablet_right_move');
                }
                $('.player_1_arrows').find('.tablet_arrows').css('background', 'none');
            }
        }
    };
    this.tabletArrows = function () {
        const arrow = $(this).attr('id');
        gameController.handleKeyPress(arrow);
    }
}