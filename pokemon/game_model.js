function Game_model(){
    this.players = [{}, {}];    //storage for Player_model objects
    this.timerValue = 0;
    this.timerInterval = null;
    this.roudStarted = false;
    this.winner = null;
}


