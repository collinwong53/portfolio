$(document).ready(initializeApp);

var winnerPlayerModel = null;
var audioHandler = null;
var winnerVideoLink = null;
var availableCards = null;
var apiData = null;
var videoList = null;
var gameModel = null;
var gameController = null;
var playerController = null;
var view = null;

function initializeApp() {
    apiData = new APIData();
    apiData.getCardData().then(apiData.makePokemonObject, apiData.failedToGetData);
    gameModel = new GameModel();
    gameController = new GameController();
    playerController = new PlayerController();
    gameController.initializePlayers();
    view = new View();
    view.backgroundImage();
    view.displayPlayerIcon();
    audioHandler = new AudioHandler;
    audioHandler.applyClickHandlers();
    $("#countDown").css("display", "none");
    $("#instructions").modal('show');
    view.applyClickHandlers();
}