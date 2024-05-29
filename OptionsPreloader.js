/* Andy Howard Games 2017 */
(function(BasicGame) {
	'use strict';
	
	
	
	
	BasicGame.OptionsPreloader = function () {

		

		this.ready = false;
		
		
		

	};



	BasicGame.OptionsPreloader.prototype = {

		preload: function () {
				

            eval(systemSettings.roomLoadingScene.code.create);

            
			
		
		
			/* Cut scenes START */

			this.load.image("optionsBackground", systemSettings.options.options);
			
					var x;
					for (x = 0; x < systemSettings.options.loadingImages.length; x++)
					{
						this.load.image("optionsImage"+systemSettings.options.loadingImages[x].id, systemSettings.options.loadingImages[x].imagePath);
					}

					var x;
					for (x = 0; x < systemSettings.options.loadingAnimations.length; x++)
					{
						if ((this.game.cache.checkImageKey("optionsAnimation" + systemSettings.options.loadingAnimations[x].id) == false)) {
                            this.game.load.atlasJSONHash("optionsAnimation" + systemSettings.options.loadingAnimations[x].id, systemSettings.options.loadingAnimations[x].filePath + ".png", systemSettings.options.loadingAnimations[x].filePath + ".json");
                        }
					}

					/* Load the end credits music START */
                    var i;
                    for (i = 0; i < music.length; i++) {
            
                        if ((music[i].id == systemSettings.options.musicId))
                        {
                            if ((this.game.cache.checkSoundKey("backgroundMusic"+music[i].id) == false))
                            {
                                this.optionsMusic = "backgroundMusic"+music[i].id;
                                this.load.audio(this.optionsMusic, ["" + music[i].musicPath + ".mp3", "" + music[i].musicPath + ".ogg"]);
                            }
                        }
            
                    }
                    /* Load the end credits music END */
				
            /* Cut scenes END */
		
		
		
		
		
		
		

		/* Infrastructure END */
		


		/* Game images END */


		},

		create: function () {
			
            //this.preloadFill.cropEnabled = false;
			
			

        },


        

		update: function () {

			
			
			if (this.cache.isSoundDecoded(this.optionsMusic) && this.ready == false)
            {



                
                this.ready = true;
                this.state.start('Options');

                /* Set back to false so we can use it again START */
                this.ready = false;
				/* Set back to false so we can use it again END */
                


				
			}

		}

	};
})(BasicGame);