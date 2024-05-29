/* Andy Howard Games 2017 */

(function(BasicGame) {
    'use strict';

    BasicGame.IntroMadeBy = function () {

        
    };

    

    BasicGame.IntroMadeBy.prototype = {
		
		
		
		
        create: function () {
			
			
						/* Set foley sounds START */
						/*this.foleySounds = this.game.add.audio("foleySoundsGameWide");
						this.foleySounds.allowMultiple = true;*/
						/* Set foley sounds END */
						
			
						
								eval(systemSettings.introMadeBy.code.create);
							
						
						

            
        },
		
		
		/*
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
        },*/
		
		
		endScene: function(){
            console.log("Closing down scene");
            this.game.world.removeAll();
            this.game.sound.stopAll();

            /* Unload cut scene assets here START */
            
                    var x;
                    for (x = 0; x < systemSettings.introMadeBy.loadingImages.length; x++)
                    {
                        this.game.cache.removeImage("introMadeByImage"+systemSettings.introMadeBy.loadingImages[x].id, true);
                    }

                    var x;
                    for (x = 0; x < systemSettings.introMadeBy.loadingAnimations.length; x++)
                    {
                        this.game.cache.removeImage("introMadeByAnimation" + systemSettings.introMadeBy.loadingAnimations[x].id, true);
                        this.game.cache.removeJSON("introMadeByAnimation" + systemSettings.introMadeBy.loadingAnimations[x].id);
                    }

                    var x;
                    for (x = 0; x < systemSettings.introMadeBy.loadingMusic.length; x++)
                    {
                        this.game.cache.removeSound("introMadeByMusic"+systemSettings.introMadeBy.loadingMusic[x].id);
                        this.game.sound.removeByKey("introMadeByMusic"+systemSettings.introMadeBy.loadingMusic[x].id);
                    }
                
            /* Unload cut scene assets here END */

            
			this.state.start('TitleCard');

                            
        },
		
		
		
		
        update: function() {
            
            
			eval(systemSettings.introMadeBy.code.update);
            
            
        }
     };

})(BasicGame);