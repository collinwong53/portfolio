$(document).ready(initialize)
var carBot =null;

function initialize(){
    var image_array=[
        'images/banelings.jpg',
        'images/cuterbaneling.jpg',
        'images/illidan.jpg',
        'images/infestor.png',
        'images/marine.jpg',
        'images/sky_zerg.jpg',
        'images/zeratul.jpg',
        'images/Zergling.jpg',
        'images/Ultralisk.png',
    ];
    var sound_object={
        'images/zeratul.jpg': new Audio("sounds/zeratul_goodjob.mp3"),
        'images/banelings.jpg': new Audio("sounds/baneling_roll.mp3"),
        'images/illidan.jpg': new Audio("sounds/not_prepared.mp3"),
        'images/cuterbaneling.jpg': new Audio("sounds/baneling_burst.mp3"),
        'images/infestor.png': new Audio("sounds/infestor_derp.mp3"),
        'images/sky_zerg.jpg': new Audio("sounds/multalisk.mp3"),
        'images/Ultralisk.png': new Audio("sounds/ultralisk.mp3"),
        'images/marine.jpg': new Audio("sounds/marine.mp3"),
        'images/Zergling.jpg': new Audio("sounds/zergling.mp3"),
        "clap": new Audio("sounds/applause.mp3"),
        "zerg_lick": new Audio("sounds/zerg_lick.mp3"),
        "rage": new Audio('sounds/Zealot_Death.mp3')
    }
    carBot = new Memory_match(image_array,sound_object);
    carBot.start_app();
}


function Memory_match(images,sounds){
    this.images = images;
    this.sounds = sounds;
    var self = this;
    this.pair = false;
    this.matches = 0;
    this.attempts = 0;
    this.accuracy = 0;
    this.games_played =0;
    this.lock = false;
    this.first_card_clicked = null;
    this.second_card_clicked = null;
    this.random_sort = function(image_array){
        var sorted_array = [];
        while(image_array.length>0){
            var i = Math.floor(Math.random()*image_array.length);
            sorted_array.push(image_array.splice(i,1));
        }//end inner while
        return sorted_array;
    }//end random_sort
    this.create_board =function(image_array){
        var images = image_array.concat(image_array);
        var random_images = this.random_sort(images);
        for(var i = 0; i < random_images.length;i++){
            var image = random_images[i];
            $('<div>').addClass('card').attr('id', 'card' + i).appendTo('.game_area');
            $('<div>').addClass('front').prepend('<img src='+"'"+image+"'"+'/>').appendTo('#card' + i);
            $('<div>').addClass('back').prepend('<img src="images/card_pack.png"/>').appendTo('#card' + i);
        }//end for loop
    }//end create board
    this.reset_stats = function(){
        self.matches = 0;
        self.attempts = 0;
        self.accuracy = 0;
        $('.accuracy').find(".value").text(0);
    }
    this.card_clicked = function(){
        console.log("this was clicked");
        var card = $(this);
        var face = card.find('.front').is('#revealed');
       if(self.lock === true){
            return;
       }//end lock check;
        if(self.first_card_clicked === null && self.lock === false && face === false){
           console.log("first card");
            card.toggleClass('flipped');
            self.first_card_clicked = card;
        }//end first card check
        else if(self.lock === false && self.first_card_clicked.attr('id') !== card.attr('id') && face ===false){
            console.log("second card");
            self.attempts++;
            card.toggleClass('flipped');
            self.second_card_clicked = card;
            if(self.second_card_clicked.find('img').attr('src') === self.first_card_clicked.find('img').attr('src')){
                var image = self.second_card_clicked.find('img').attr('src');
                self.sounds[image].play();
                self.lock = true;
                self.matches++;
                self.display_accuracy();
                self.check_win();
            }//end if match
            else{
                if(self.attempts === 18) {
                    self.display_gg();
                }//end if too many attempts
                self.display_accuracy();
                self.lock = true;
                setTimeout(self.reset_cards,1000);
            }//end else if no match
        }//end second card check
    }//end cards clicked
    this.check_win = function(){
        if(this.attempts === 18 && this.matches !==9){
            self.display_gg();
            self.lock = true;
            setTimeout(this.lock_delay,1000);
        }//end if
        else {
            self.lock = true;
            $(self.first_card_clicked).find('.front').fadeOut(1500);
            $(self.second_card_clicked).find('.front').fadeOut(1500);
            setTimeout(self.reset_cards,1000);
            self.pair = true;
            if(self.matches===9&&this.accuracy<60){
                $("#modal_body").css("background-image","url(images/balllicking.gif)");
                $("#modal_body").css("display", "block");
                self.sounds["zerg_lick"].play();
            }//end if
            else if(this.matches === 9){
                $('#modal_body').css("display","block");
                self.sounds['clap'].play();
            }//end else if
        }//end else
        return;
    }//end check win
    this.apply_click_handlers = function(){
        $('.card').click(self.card_clicked);
        $('.card').hover(function(){
            if(!$(this).find('.front').is('#revealed')){
                $(this).toggleClass("glow");
            }
        })

    }//end add click handlers
    this.reset_cards = function(){
        self.display_stats();
        if(self.pair === false) {
            self.first_card_clicked.toggleClass('flipped');
            self.second_card_clicked.toggleClass('flipped');
        }// if no pair
        else{
            self.first_card_clicked.find('.front').attr('id','revealed');
            self.second_card_clicked.find('.front').attr('id','revealed');
            if(self.second_card_clicked.hasClass("glow")){
                self.second_card_clicked.toggleClass("glow");
            }//disable glow
            if(self.first_card_clicked.hasClass('glow')){
                self.first_card_clicked.toggleClass('glow');
            }//disable glow
        }//add display none;
        self.first_card_clicked = null;
        self.second_card_clicked = null;
        self.pair = false;
        self.lock = false;
    }//end reset cards
    this.display_stats = function(){
        $('.games_played').find('.value').text(self.games_played);
        $('.attempts').find('.value').text(self.attempts+'/18');
    }//end display stats
    this.start_app = function(){
        this.create_board(images);
        this.apply_click_handlers();
        $('.reset').click(this.reset_button);
        $('.card').toggleClass('flipped');
        self.lock = true;
        $('#modal_body').css('background-image','url(images/clapping_zerg.gif)');
        setTimeout(this.start_match,2000);
        setTimeout(self.lock_delay,3000);
    }//end start app
    this.start_match = function(){
        $('.card').removeClass('flipped');
    }
    this.lock_delay = function(){
        self.lock = false;
    }
    this.display_gg = function(){
        $('#modal_body').css("background-image", "url(images/GG.gif)");
        $("#modal_body").css("display", "block");
        sounds['rage'].play();
    }//end display gg
    this.reset_button = function(){
        if(self.lock === true){
            return;
        }//end if
        self.first_card_clicked = null;
        self.second_card_clicked = null;
        self.reset_stats();
        self.display_stats();
        self.lock = false;
        self.games_played++;
        $('.back').removeAttr('id');
        $('.front').removeAttr('id');
        $('.game_area').html('');
        $('#modal_body').css('display','none');
        self.start_app();
    }//end reset button
    this.display_accuracy = function(){
        var old_accuracy = self.accuracy;
        self.accuracy = (Math.floor(self.matches/self.attempts*100));
        var a = setInterval(change_accuracy,10);
        function change_accuracy(){
            if(old_accuracy===self.accuracy){
                clearInterval(a);
            }
            else{
                if(old_accuracy>self.accuracy){
                    old_accuracy--;
                    $('.accuracy').find(".value").text("%"+old_accuracy);
                }
                else{
                    old_accuracy++;
                    $('.accuracy').find(".value").text("%"+old_accuracy);
                }
            }
        }//end else
    }//end accuracy

}//end memory_match