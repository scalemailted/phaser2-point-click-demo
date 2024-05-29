/* Andy Howard Games 2017 */

(function(BasicGame) {
    'use strict';

    BasicGame.EndScreen = function () {

        
    };

    

    BasicGame.EndScreen.prototype = {
		
		
		
		
        create: function () {


						/* Play music START */
                        endScreenMusicRef = this.game.add.audio("backgroundMusic"+systemSettings.endingScreen.musicId);
                        endScreenMusicRef.volume = userSettings.volumes.musicVolume;
						endScreenMusicRef.loop = true;
						endScreenMusicRef.play();
						/* Play music END */

						/* Put background on START */
						endScreenBackgroundRef = this.game.add.sprite(0, 0, 'endScreenBackground');
						/* Put background on END */
						
						
                        renderTextBlocks(systemSettings.endingScreen.textBlocks);

            
        },
		
		
		
        update: function() {
            
            
          
            
            
        }
     };

})(BasicGame);