
/***************************************************************************************************
 * grab youtube api - gets the information from the youtube api
 * @param  {undefined} none
 * @returns {undefined} none
 * @calls {undefined} none
 */

/***************************************************************************************************
 * text appear - starts showing text on page for game play (called by start game function)
 * @param  {undefined} none
 * @returns {undefined} none
 * @calls {undefined} none
 */


/***************************************************************************************************
 * initialize - starts loading everything needed (tells model to load apis)
 * @param  {undefined} none
 * @returns {undefined} none
 * @calls {undefined} none
 */


/***************************************************************************************************
 * start game - starts function in model to make text appear for player (called by start button)
 * @param  {undefined} none
 * @returns {undefined} none
 * @calls {undefined} none
 */



/***************************************************************************************************
 * card animation - card slides in and flips after start
 * @param  {undefined} none
 * @returns {undefined} none
 * @calls {undefined} none
 */

/***************************************************************************************************
 * button light - lights up buttons
 * @param  {undefined} none
 * @returns {undefined} none
 * @calls {undefined} none
 */

/***************************************************************************************************
 * start button - starts game, calls start game function in controller
 * @param  {undefined} none
 * @returns {undefined} none
 * @calls {undefined} none
 */
$(document).ready(initializeApp);

var winnerPlayerModel = null;
var handle_audio = null;
var winner_video_link = null;
var available_cards = null;
var get_card_api_data = null;
var video_list = null;
var game_model = null;
var game_controller = null;
var player_controller = null;
var view = null;
function initializeApp(){
    get_card_api_data = new Grab_data();
    get_card_api_data.get_card_data().then(get_card_api_data.make_pokemon_object, get_card_api_data.failed_to_get_data);
    game_model = new Game_model();
    game_controller = new Game_controller();
    player_controller = new Player_controller();
    game_controller.startGame();
    view = new View();
    view.backgroundImage();
    view.displayPlayerIcon();
    handle_audio = new audio_handler;
    $("#start_button").on('click', function(){
        if(available_cards === null){
            return
        }
        game_controller.startTimer(3000, true);
        $("#start_button").hide();
    });
    $("#pause_music").click(handle_audio.toggle_victory_music);
    $("#countDown").css("display", "none");
    $(".player_key_display").hide();
    $("#instructions").modal('show');
    $('.close_modal_butt').click(close_youtube)
    $('#winner_modal').on('hidden.bs.modal',close_youtube);
}


