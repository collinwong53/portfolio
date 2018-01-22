//Player Controller Constructor
function PlayerController() {
    /***************************************************************************************************
     * getPokemon - player model received pokemon object and updates attributes
     * @param  (playerModel)
     * @returns {undefined} none
     */
    this.getPokemon = function (playerModel) {
        playerModel.pokemon = apiData.makePokemon();
        playerModel.hp = playerModel.pokemon.hp;
        playerModel.attack = playerModel.pokemon.attack;
        playerModel.completedMovesGoal = Math.floor((parseInt(playerModel.hp) + parseInt(playerModel.attack)) / 20);
    };
    /***************************************************************************************************
     * takeDamage - player model loses hp
     * @param  (playerModel, damageAmount)
     * @returns {undefined} none
     * @calls   view.updateBars();
                view.updateBarCounter();
     */
    this.takeDamage = function (playerModel, damageAmount) {
        playerModel.hp -= damageAmount;
        audioHandler.playSound('attack01');
        view.showDamage(playerModel, damageAmount);
        view.updateBars();
        view.updateBarCounter();
    };
    /***************************************************************************************************
     * completeMove - Occurs when player successfully follows command
     * @param  (playerModel)
     * @returns {undefined} none
     */
    this.completeMove = function (playerModel) {
        view.arrowBoxMadeMove(playerModel);
        view.hideArrowForMoment(playerModel);
        playerModel.completedMoves += 1;
        this.checkIfWinRound(playerModel);
        view.updateBars();
        view.updateBarCounter();
    };
    /***************************************************************************************************
     * missMove - Occurs when player hit wrong key
     * @param  (playerModel)
     * @returns {undefined} none
     */
    this.missMove = function (playerModel) {
        view.arrowBoxMissMove(playerModel);
        view.hideArrowForMoment(playerModel);
        playerModel.completedMoves -= 1;
        if (playerModel.completedMoves < 0) {
            playerModel.completedMoves = 0;
        }
        this.getRequiredMove(playerModel);
        view.updateBars();
        view.updateBarCounter();
    };
    /***************************************************************************************************
     * getRequiredMove - Player receives command
     * @param  (playerModel)
     * @returns {undefined} none
     */
    this.getRequiredMove = function (playerModel) {
        var availableKeys = playerModel.availableKeys;
        var randomIndex = Math.floor(Math.random() * availableKeys.length);
        playerModel.requiredMove = playerModel.availableKeys[randomIndex];
        view.displayArrow(playerModel.requiredMove, playerModel);
    };
    /***************************************************************************************************
     * resetCompletedMoves - completed moves reset to 0
     * @param  (playerModel)
     * @returns {undefined} none
     */
    this.resetCompletedMoves = function (playerModel) {
        playerModel.completedMoves = 0;
    };
    /***************************************************************************************************
     * checkWinRound - runs after successful command to check if player model's completedMovesGoal has been met
     * @param  (playerModel)
     * @returns {undefined} none
     */
    this.checkIfWinRound = function (playerModel) {
        if (playerModel.completedMoves >= playerModel.completedMovesGoal) {
            this.resetCompletedMoves(playerModel);
            gameModel.roundStarted = false;
            var otherPlayerIndex = 1 - playerModel.index;
            this.resetCompletedMoves(playerModel);
            this.takeDamage(gameModel.players[otherPlayerIndex], playerModel.attack);
            if (gameModel.players[0].hp > 0 && gameModel.players[1].hp > 0) {
                gameController.startTimer(3000, false);
            } else {
                audioHandler.playerWins();
                audioHandler.victoryPhase = true;
                audioHandler.battlePhase = false;
                playerModel.wins += 1;
                winnerPlayerModel = playerModel;
                gameController.endGame(winnerPlayerModel);
            }
        }
        else{
            this.getRequiredMove(playerModel);
        }
    }
}