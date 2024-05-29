/* Andy Howard Games 2017 */





(function(BasicGame) {
	'use strict';
	
	
	
	
	BasicGame.EndScreenPreloader = function () {

		

		this.ready = false;
		
		
		

	};



	BasicGame.EndScreenPreloader.prototype = {

		preload: function () {
				

            eval(systemSettings.roomLoadingScene.code.create);

            unloadRoomAssets(true);

            currentRoom = null;
            previousRoom = null;

		/* Game images START */
		
		
		/* Load assets declared in JSON START */
		
        
       

		
		
		
					/* Load the end credits music START */
                    var i;
                    for (i = 0; i < music.length; i++) {
            
                        if ((music[i].id == systemSettings.endingScreen.musicId))
                        {
                            if ((this.game.cache.checkSoundKey("backgroundMusic"+music[i].id) == false))
                            {
                                this.endScreenMusic = "backgroundMusic"+music[i].id;
                                this.load.audio(this.endScreenMusic, ["" + music[i].musicPath + ".mp3", "" + music[i].musicPath + ".ogg"]);
                            }
                        }
            
                    }
                    /* Load the end credits music END */
		
		
		
		
                    this.load.image("endScreenBackground", ""+systemSettings.endingScreen.endScreenBackground);
		
		
		
		
		



		},

		create: function () {
			
            //this.preloadFill.cropEnabled = false;
			
			

        },


        

		update: function () {

			
			
			if (this.cache.isSoundDecoded(this.endScreenMusic) && this.ready == false)
            {



                
                this.ready = true;
                this.state.start('EndScreen');

                /* Set back to false so we can use it again START */
                this.ready = false;
				/* Set back to false so we can use it again END */
                


				
			}

		}

	};
})(BasicGame);