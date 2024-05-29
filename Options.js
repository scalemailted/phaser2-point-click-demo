/* Andy Howard Games 2017 */

(function(BasicGame) {
    'use strict';

    BasicGame.Options = function () {

        
    };

    

    BasicGame.Options.prototype = {
		
		
		
		preload: function () {
      
            

        },
		
		
        create: function () {

            

            /* Set foley sounds START */
            this.foleySounds = this.game.add.audio("foleySoundsGameWide");
            this.foleySounds.allowMultiple = true;
            /* Set foley sounds END */



            /* Play music START */
            if ((optionsMusicRef == null))
            {
                optionsMusicRef = this.game.add.audio("backgroundMusic"+systemSettings.options.musicId);
                optionsMusicRef.volume = userSettings.volumes.musicVolume;
                optionsMusicRef.loop = true;
                optionsMusicRef.play();
            }
            /* Play music END */
			
			optionsBackgroundRef = this.game.add.sprite(0, 0, 'optionsBackground');

            eval(systemSettings.options.code.create);

			renderTextBlocks(systemSettings.options.textBlocks);
            
		},



        playFoleySound: function(id, loop, uniqueId){
            var i;
            for (i = 0; i < foleySounds.items.length; i++) {
                if ((foleySounds.items[i].id == id)) {
                    this.foleySounds.addMarker(uniqueId, foleySounds.items[i].start, foleySounds.items[i].duration, userSettings.volumes.sfxVolume, loop);
                    this.foleySounds.play(uniqueId);
                }
            }
        },

        stopFoleySound: function(uniqueId){
            this.foleySounds.stop(uniqueId);
            this.foleySounds.removeMarker(uniqueId);
        },



        

		
        update: function() {
            
            eval(systemSettings.options.code.update);

        }
     };

})(BasicGame);