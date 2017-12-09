/***************************************************************************************************
 * audio_handler - calls and organizes the audio files
 * @param  {undefined} none
 * @returns {undefined} none
 * @calls {undefined} none
 */

function audio_handler(){
    var self = this;
    this.victory_playing = true;
    this.sound_object = {
        'main': new Audio('sound/pokemon_battle_music.mp3'),
        'countdown':new Audio('sound/countdown.mp3'),
        'attack01':new Audio('sound/poke_attack_sound01.wav'),
        'victory':new Audio('sound/pokemon_victory_sound.mp3')
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
        self.sound_object['victory'].play();
    }
}