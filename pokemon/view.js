function View() {
    /***************************************************************************************************
     * displayCards - adds the cards to the dom, both the back and the front
     * @param  {undefined} none
     * @returns {undefined} none
     * @calls {undefined} none
     */
    const self = this;
    this.desktop = true;
    this.displayCards = function () {
        // var back_image1 = $('<div>').addClass('back').css('background-image', "url('images/card_back.png')");
        // var back_image2 = $('<div>').addClass('back').css('background-image', "url('images/card_back.png')");
        var card_back = "images/cardback.png";
        var back_image1 = $('<div>').addClass('back').prepend('<img src="'+card_back+'">');
        var back_image2 = $('<div>').addClass('back').prepend('<img src="'+card_back+'">');
        var player0BackgroundImage = gameModel.players[0].pokemon.image;
        var player1BackgroundImage = gameModel.players[1].pokemon.image;
        var player_0_front = $('<div>').addClass('front').prepend('<img src=' + "'" + player0BackgroundImage + "'" + '/>');
        var player_1_front = $('<div>').addClass('front').prepend('<img src=' + "'" + player1BackgroundImage + "'" + '/>');
        var player_0_card = $('<div>').addClass('card').append(player_0_front, back_image1);
        var player_1_card = $('<div>').addClass('card').append(player_1_front, back_image2);
        $("#player_0").html(player_0_card);
        $("#player_1").html(player_1_card);
    };

    /***************************************************************************************************
     * displayArrow - controls which arrow image needs to be displayed on the DOM
     * @param  keyInput, playerModel
     * @returns {undefined} none
     * @calls {undefined} none
     */
    this.displayArrow = function (keyInput, playerModel) {
        setTimeout(function () {
            var divID = "#player_" + playerModel.index + "_key_display";
            var image = null;
            switch (keyInput) {
                case "w":
                case "ArrowUp":
                    image = "'images/arrow_up.png'";
                    break;
                case "a":
                case "ArrowLeft":
                    image = "'images/arrow_left.png'";
                    break;
                case "s":
                case "ArrowDown":
                    image = "'images/arrow_down.png'";
                    break;
                case "d":
                case "ArrowRight":
                    image = "'images/arrow_right.png'";
                    break;
            }
            $('#'+keyInput).css('background','yellow');
            $(divID).css("background-image", "url(" + image + ")");
        }, 150)
    };

    /***************************************************************************************************
     * hideArrowForMoment - hide the arrow
     * @param  playerModel
     * @returns {undefined} none
     * @calls {undefined} none
     */
    this.hideArrowForMoment = function (playerModel) {
        var divID = "#player_" + playerModel.index + "_key_display";
        $(divID).css("background-image", "none");
    };

    /***************************************************************************************************
     * arrowBoxMadeMove - highlights box green if the play was correct
     * @param  playerModel
     * @returns {undefined} none
     * @calls {undefined} none
     */
    this.arrowBoxMadeMove = function (playerModel) {
        var divID = "#player_" + playerModel.index + "_key_display";
        $(divID).css("border", "5px solid green").css("box-sizing", "border-box");
        setTimeout(function () {
            $(divID).css("border", "none");
        }, 150)
    };

    /***************************************************************************************************
     * arrowBoxMissMove - highlights box red if the player misses the play
     * @param  playerModel
     * @returns {undefined} none
     * @calls {undefined} none
     */
    this.arrowBoxMissMove = function (playerModel) {
        var divID = "#player_" + playerModel.index + "_key_display";
        $(divID).css("border", "5px solid red").css("box-sizing", "border-box");
        setTimeout(function () {
            $(divID).css("border", "none");
        }, 150)
    };

    /***************************************************************************************************
     * displayCountdownNumber - shows the countdown on the DOM
     * @param  number
     * @returns {undefined} none
     * @calls {undefined} none
     */
    this.displayCountdownNumber = function (number) {
        $("#countDown").text(number).show();
        $("#player_0_key_display").css("background-image", "none");
        $("#player_1_key_display").css("background-image", "none");
        setTimeout(function () {
            $("#countDown").text(number).hide();
        }, 500)
    };

    /***************************************************************************************************
     * updateBarCounter - updates the numbers on the health and power bars
     * @param  {undefined} none
     * @returns {undefined} none
     * @calls {undefined} none
     */
    this.updateBarCounter = function () {
        $('#hp_0').text(gameModel.players[0].hp + "/" + gameModel.players[0].pokemon.hp);
        $('#hp_1').text(gameModel.players[1].hp + "/" + gameModel.players[1].pokemon.hp);
        $('#power_0').text(gameModel.players[0].completedMoves + "/" + gameModel.players[0].completedMovesGoal);
        $('#power_1').text(gameModel.players[1].completedMoves + "/" + gameModel.players[1].completedMovesGoal);
    };

    /***************************************************************************************************
     * updateBars - updates the health and power bars
     * @param  {undefined} none
     * @returns {undefined} none
     * @calls {undefined} none
     */
    this.updateBars = function () {
        var player0HPpercentage = gameModel.players[0].hp / gameModel.players[0].pokemon.hp;
        var player1HPpercentage = gameModel.players[1].hp / gameModel.players[1].pokemon.hp;
        var player0Powerpercentage = gameModel.players[0].completedMoves / gameModel.players[0].completedMovesGoal;
        var player1Powerpercentage = gameModel.players[1].completedMoves / gameModel.players[1].completedMovesGoal;
        $("#player_0_health_bar").css("width", (player0HPpercentage * 100 + "%"));
        $("#player_1_health_bar").css("width", (player1HPpercentage * 100 + "%"));
        $("#player_0_power_bar").css("width", (player0Powerpercentage * 100 + "%"));
        $("#player_1_power_bar").css("width", (player1Powerpercentage * 100 + "%"))
    };

    /***************************************************************************************************
     * displayPlayerName - shows the player name and the pokemon name
     * @param  playerModel
     * @returns {undefined} none
     * @calls {undefined} none
     */
    this.displayPlayerName = function (playerModel) {
        var playerNumber = playerModel.index + 1;
        var pokemonName = playerModel.pokemon.name;
        if (playerModel.index === 0) {
            $("#player_0_name").text("Player " + playerNumber + ": " + pokemonName);
        } else {
            $("#player_1_name").text("Player " + playerNumber + ": " + pokemonName);
        }
    };

    /***************************************************************************************************
     * backgroundImage - creates and adds background images
     * @param  {undefined} none
     * @returns {undefined} none
     * @calls {undefined} none
     */
    this.backgroundImage = function () {
        this.backgroundImageArray = [
            'images/639ff710788da2f05b1879a6cc5e1f2d.jpg',
            'images/Dahara_City.png',
            'images/Pokemon-Sun-and-Moon-ALola-Map-Island-One.jpg',
            'images/Prof_Juniper_Lab_anime-696x392.jpg'
        ];
        this.addImageToBackground = function () {
            var randomIndex = Math.floor(Math.random() * this.backgroundImageArray.length);
            return this.backgroundImageArray[randomIndex]
        };
        $('body').css('background-image', 'url(' + this.addImageToBackground() + ')');
    };

    /***************************************************************************************************
     * playerIcon - adds and displays player icons
     * @param  {undefined} none
     * @returns {undefined} none
     * @calls {undefined} none
     */

    this.displayPlayerIcon = function () {
        var playerIconArray = [
            "images/trainer_1_transparent.png",
            "images/trainer_2_transparent.png",
            "images/trainer_3_transparent.png",
            "images/trainer_4_transparent.png",
            "images/trainer_5_transparent.png",
            "images/trainer_6_transparent.png"
        ];

        var randomIndex = Math.floor(Math.random() * playerIconArray.length);
        this.removeImageFromArray = function () {
            playerIconArray.splice(randomIndex, 1);
        };

        $("#player_0_icon_image").attr("src", playerIconArray[randomIndex]);

        this.removeImageFromArray();

        if (randomIndex === 5) {
            --randomIndex;
            $("#player_1_icon_image").attr("src", playerIconArray[randomIndex]);
        } else {
            $("#player_1_icon_image").attr("src", playerIconArray[randomIndex]);
        }
    };

    /***************************************************************************************************
     * tabletSwitch - changes into tablet mode for game
     * @param  {undefined} none
     * @returns {undefined} none
     * @calls {undefined} none
     */
    this.tabletSwitch = function () {
        $('.arrows_tablet_container').css('display', 'flex');
        $('.player_key_display, .player_stats, .player_icon').css('display', 'none');
        $('.top_player_container').addClass('tablet_player_container');
        $('.main').attr('id', 'tablet_main');
        $('.player_hpAndPower').addClass('tablet_player_hp_and_pp');
        $('.player_box').addClass('tablet_player_box');
        $('.top_container').attr('id', 'tablet_top_container');
        $('.bottom_container').attr('id', 'tablet_bottom_container');
        $('#tablet_icon').removeClass('hidden');
        $('#keyboard_icon').addClass('hidden');
        this.desktop = false;
    };

    /***************************************************************************************************
     * desktopSwitch - changes into desktop mode for game
     * @param  {undefined} none
     * @returns {undefined} none
     * @calls {undefined} none
     */
    this.desktopSwitch = function(){
        $('.arrows_tablet_container').css('display', 'none');
        $('.player_key_display, .player_stats, .player_icon').css('display', 'block');
        $('.top_player_container').removeClass('tablet_player_container');
        $('.main').removeAttr('id');
        $('.player_hpAndPower').removeClass('tablet_player_hp_and_pp');
        $('.player_box').removeClass('tablet_player_box');
        $('.top_container').removeAttr('id');
        $('.bottom_container').removeAttr('id');
        $('#tablet_icon').addClass('hidden');
        $('#keyboard_icon').removeClass('hidden');
    };

    /***************************************************************************************************
     * ApplyClickHandlers - apply click handlers from view object
     * @param  {undefined} none
     * @returns {undefined} none
     * @calls {undefined} none
     */

    this.applyClickHandlers = function(){
        $("#start_button").on('click', function () {
            if (availableCards === null) {
                return
            }
            gameController.startTimer(3000, true);
            $("#start_button").hide();
        });
        $('#touch_switch').click(this.tabletSwitch);
        $('.close_modal_butt').click(this.closeYoutube);
        $('#winner_modal').on('hidden.bs.modal', this.closeYoutube);
        $('.tablet_arrows').click(gameController.tabletArrows);
        $('#tablet_icon, #keyboard_icon').click(this.toggleView);
        $('#info').click(this.showInstructions);
    };

    /***************************************************************************************************
     * closeYoutube- closes youtube video
     * @param  {undefined} none
     * @returns {undefined} none
     * @calls {undefined} none
     */

    this.closeYoutube = function(){
        $("#video_display").removeAttr('src');
    };

    /***************************************************************************************************
 * removeTabletHighLights - remove arrow and container borders from tablet arrows
 * @param  {undefined} none
 * @returns {undefined} none
 * @calls View.tabletSwitch, View.desktopSwitch
 */

    this.removeTabletHighlights = function(){
        $('.arrows_tablet_container').removeClass('tablet_right_move tablet_wrong_move');
        $('.tablet_arrows').css('background','none');
    };

    this.toggleView = function(){
        if(self.desktop){
            self.tabletSwitch();
        }else{
            self.desktopSwitch();
            self.desktop = true;
        }
    }
    this.showInstructions = function(){
        $("#instructions").modal('show');
    }
}

/***************************************************************************************************
 * displayWinVideo - shows a video of the winning pokemon
 * @param  {undefined} none
 * @returns {undefined} none
 * @calls {undefined} none
 */

function displayWinVideo(winnerPlayerModel) {

    this.displayVideo = function () {
        $(".modal-title").text("Player " + parseInt(winnerPlayerModel.index + 1) + " Wins!"); // The text will be the name of the pokemon
        $("#video_display").attr('src', winnerVideoLink);
        $("#winner_modal").modal('show');
        view.removeTabletHighlights();
    };
    this.displayVideo();
}



function closeYoutube() {
    $("#video_display").removeAttr('src');
}

/***************************************************************************************************
 * grab youtube api - gets the information from the youtube api
 * @param  {pokemonName} name of winner player model's pokemon
 * @calls winnerVideo();
 *        failedVideo();
 */


function getYoutubeData(pokemonName) {
    var promise = { //create an object that will handle the promise itself
        then: function (resolve, reject) {
            this.reject = reject;
            this.resolve = resolve;
        }
    };

    $.ajax({
        url: 'https://s-apis.learningfuze.com/hackathon/youtube/search.php',
        dataType: 'json',
        method: 'post',
        data: {
            q: pokemonName,
            maxResults: 10,
            type: "video"
        },
        success: function (data) {
            promise.resolve(data); //use the promise object to trigger the success function
        },
        error: function () {
            promise.reject('oops!'); //use the promise object to trigger the error function
        }
    });
    return promise;
}
/***************************************************************************************************
 * winner pokemon video
 * @param  {data} pokemon youtube video list from api
 * @calls displayWinVideo(winnerPlayerModel);
 */

function winnerVideo(data) {
    videoList = data;
    var randomVid = videoList.video[Math.floor(Math.random() * videoList.video.length)].id;
    winnerVideoLink = "https://www.youtube.com/embed/" + randomVid;
    displayWinVideo(winnerPlayerModel);
}
/***************************************************************************************************
 * failed to grab youtube video list from api
 */

function failedVideo(message) {
    $(".modal-title").text("Player " + parseInt(winnerPlayerModel.index + 1) + " Wins!"); // The text will be the name of the pokemon
    $("#video_display").text(message);
    $("#winner_modal").modal('show');
}