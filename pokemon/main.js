$(document).ready(initializeApp);

var winnerPlayerModel = null;
var audio_handler = null;
var winner_video_link = null;
var available_cards = null;
var get_card_api_data = null;
var video_list = null;
var game_model = null;
var game_controller = null;
var player_controller = null;
var view = null;

function initializeApp() {
    get_card_api_data = new Grab_data();
    get_card_api_data.get_card_data().then(get_card_api_data.make_pokemon_object, get_card_api_data.failed_to_get_data);
    game_model = new Game_model();
    game_controller = new Game_controller();
    player_controller = new Player_controller();
    game_controller.initializePlayers();
    view = new View();
    view.backgroundImage();
    view.displayPlayerIcon();
    audio_handler = new Audio_handler;
    audio_handler.apply_click_handlers();
    $("#countDown").css("display", "none");
    $("#instructions").modal('show');
    view.apply_click_handlers();
}