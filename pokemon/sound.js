/***************************************************************************************************
 * audio_handler - calls and organizes the audio files
 * @param  {undefined} none
 * @returns {undefined} none
 * @calls {undefined} none
 */

function Audio_handler(){
    var self = this;
    this.victory_playing = true;
    this.victory_phase = false;
    this.battle_phase = false;
    this.is_muted = false;
    this.sound_object = {
        'main': new Audio('sound/pokemon_battle_music.mp3'),
        'countdown':new Audio('sound/countdown.mp3'),
        'attack01':new Audio('sound/poke_attack_sound01.wav'),
        'victory':new Audio('sound/pokemon_victory_sound.mp3')
    }
    this.play_main = function(){
        if(!self.is_muted){
            self.sound_object['main'].play();
        }
    }
    this.play_sound = function(file){
        if(!self.is_muted){
            self.sound_object[file].currentTime = 0;
            self.sound_object[file].play();
        }
    }
    this.toggle_mute = function(){
        $('.sound_off, .sound_on').toggleClass('hidden');
        if(!self.is_muted){
            for(let audio in self.sound_object){
                self.sound_object[audio].pause();
                self.sound_object[audio].currentTime = 0;
            }
        }else{
            if(self.battle_phase){
                self.sound_object['main'].play();
            }else if(self.victory_phase){
                self.sound_object['victory'].play();
            }
        }
        self.is_muted = !self.is_muted;
    }
    this.toggle_victory_music = function(){
        if(self.victory_playing){
            self.stop_victory_music();
            self.victory_playing = false;
        }
        else{
            self.sound_object['victory'].play();
            self.victory_playing = true;
        }
    }
    this.stop_victory_music = function(){
        self.sound_object['victory'].currentTime = 0;
        self.sound_object['victory'].pause();
    }
    this.player_wins = function(){
        self.sound_object['main'].pause();
        self.sound_object['main'].currentTime = 0;
        self.play_sound('victory');
    }
    this.apply_click_handlers = function(){
        $('#mute').click(self.toggle_mute);
    }
}