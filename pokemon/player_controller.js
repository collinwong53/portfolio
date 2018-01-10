//Player Controller Constructor
function Player_controller(){
    /***************************************************************************************************
     * getPokemon - player model received pokemon object and updates attributes
     * @param  (player_model)
     * @returns {undefined} none
     */
    this.getPokemon = function(player_model){
        player_model.pokemon = get_card_api_data.make_pokemon();
        player_model.hp = player_model.pokemon.hp;
        player_model.attack = player_model.pokemon.attack;
        player_model.completedMovesGoal = Math.floor((parseInt(player_model.hp) + parseInt(player_model.attack)) / 20);
        console.log(player_model.index + " will be ", player_model.pokemon);
        console.log(" and need to get " + player_model.completedMovesGoal)
    };
    /***************************************************************************************************
     * takeDamage - player model loses hp
     * @param  (player_model, damageAmount)
     * @returns {undefined} none
     * @calls   view.updateBars();
                view.updateBarCounter();
     */
    this.takeDamage = function(player_model, damageAmount) {
        player_model.hp -= damageAmount;
        handle_audio.play_sound('attack01');
        if(player_model.index===0){
           $('#player_0').addClass('got_hit');
           setTimeout(function(){
               $('#player_0').removeClass('got_hit');
           },2000)
           $("#attackText0").text("-"+game_model.players[1].attack).show();
           setTimeout(function(){
               $("#attackText0").hide();
           }, 750)
        }
        else{
           $('#player_1').addClass('got_hit')
           setTimeout(function(){
               $('#player_1').removeClass('got_hit');
           },2000)
            $("#attackText1").text("-"+game_model.players[0].attack).show();
            setTimeout(function(){
                $("#attackText1").hide();
            }, 750)
        }
        view.updateBars();
        view.updateBarCounter();
    };
    /***************************************************************************************************
     * completeMove - Occurs when player successfully follows command
     * @param  (player_model)
     * @returns {undefined} none
     */
    this.completeMove = function(player_model){
        view.arrowBoxMadeMove(player_model);
        view.hideArrowForMoment(player_model);
        player_model.completedMoves +=1;
        console.log(player_model.index + " Completed Move!  Now has " + player_model.completedMoves);
        this.checkIfWinRound(player_model);
        this.getRequiredMove(player_model);
        view.updateBars();
        view.updateBarCounter();
    };
    /***************************************************************************************************
     * missMove - Occurs when player hit wrong key
     * @param  (player_model)
     * @returns {undefined} none
     */
    this.missMove = function(player_model){
        view.arrowBoxMissMove(player_model);
        view.hideArrowForMoment(player_model);
        player_model.completedMoves -=1;
        if(player_model.completedMoves < 0){
            player_model.completedMoves = 0;
        }
        console.log(player_model.index + " MISSED!  Now has " + player_model.completedMoves);
        this.getRequiredMove(player_model);
        view.updateBars();
        view.updateBarCounter();
    };
    /***************************************************************************************************
     * getRequiredMove - Player receives command
     * @param  (player_model)
     * @returns {undefined} none
     */
    this.getRequiredMove = function(player_model){
        var availableKeys = player_model.availableKeys;
        var randomIndex = Math.floor(Math.random()*availableKeys.length);
        console.log(player_model.availableKeys[randomIndex]);
        player_model.requiredMove = player_model.availableKeys[randomIndex];
        view.displayArrow(player_model.requiredMove, player_model);

    };
    /***************************************************************************************************
     * resetCompletedMoves - completed moves reset to 0
     * @param  (player_model)
     * @returns {undefined} none
     */
    this.resetCompletedMoves = function(player_model){
        player_model.completedMoves = 0;
    };
    /***************************************************************************************************
     * checkWinRound - runs after successful command to check if player model's completedMovesGoal has been met
     * @param  (player_model)
     * @returns {undefined} none
     */
    this.checkIfWinRound = function(player_model){
        if(player_model.completedMoves >= player_model.completedMovesGoal){
            this.resetCompletedMoves(player_model);
            game_model.roundStarted = false;
            console.log(player_model.index + " WINS THE ROUND!")
            var otherPlayerIndex = 1 - player_model.index;
            this.resetCompletedMoves(player_model);
            // this.resetCompletedMoves(game_model.players[otherPlayerIndex]);
            this.takeDamage(game_model.players[otherPlayerIndex], player_model.attack);
            // game_controller.endRound();
            if(game_model.players[0].hp > 0 && game_model.players[1].hp > 0){
                game_controller.startTimer(3000, false);
            }
            else{
                handle_audio.player_wins();
                handle_audio.victory_phase = true;
                handle_audio.battle_phase = false;
                console.log("player " + player_model.index + " won the game!");
                player_model.wins += 1;
                winnerPlayerModel = player_model;
                game_controller.endGame(winnerPlayerModel);
            }
            $(".player_key_display").hide();
        }
    }
}