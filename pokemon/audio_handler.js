/***************************************************************************************************
 * audioHandler - calls and organizes the audio files
 * @param  {undefined} none
 * @returns {undefined} none
 * @calls {undefined} none
 */

function AudioHandler() {
    var self = this;
    this.victoryPlaying = true;
    this.victoryPhase = false;
    this.battlePhase = false;
    this.isMuted = false;
    this.soundObject = {
        'main': new Audio('audio/battle_music.mp3'),
        'countdown': new Audio('audio/countdown.mp3'),
        'attack01': new Audio('audio/attack.wav'),
        'victory': new Audio('audio/victory_music.mp3')
    };
    this.playMain = function () {
        if (!self.isMuted) {
            self.soundObject['main'].play();
        }
    };
    this.playSound = function (file) {
        if (!self.isMuted) {
            self.soundObject[file].currentTime = 0;
            self.soundObject[file].play();
        }
    };
    this.toggleMute = function () {
        $('.sound_off, .sound_on').toggleClass('hidden');
        if (!self.isMuted) {
            for (let audio in self.soundObject) {
                self.soundObject[audio].pause();
                self.soundObject[audio].currentTime = 0;
            }
        } else {
            if (self.battlePhase) {
                self.soundObject['main'].play();
            } else if (self.victoryPhase) {
                self.soundObject['victory'].play();
            }
        }
        self.isMuted = !self.isMuted;
    };
    this.toggleVictoryMusic = function () {
        if (self.victoryPlaying) {
            self.stopVictoryMusic();
            self.victoryPlaying = false;
        } else {
            self.soundObject['victory'].play();
            self.victoryPlaying = true;
        }
    };
    this.stopVictoryMusic = function () {
        self.soundObject['victory'].currentTime = 0;
        self.soundObject['victory'].pause();
    };
    this.playerWins = function () {
        self.soundObject['main'].pause();
        self.soundObject['main'].currentTime = 0;
        self.playSound('victory');
    };
    this.applyClickHandlers = function () {
        $('#mute').click(self.toggleMute);
        $("#pause_music").click(audioHandler.toggleVictoryMusic);
    }
}