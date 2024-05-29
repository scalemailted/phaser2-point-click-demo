/* Andy Howard Games 2017 */
(function(BasicGame) {
	'use strict';
	
	
	
	
	BasicGame.IntroMadeByPreloader = function () {

		

		this.ready = false;
		
		
		

	};



	BasicGame.IntroMadeByPreloader.prototype = {

		preload: function () {
				

            eval(systemSettings.roomLoadingScene.code.create);

            
			
		
		
			/* Cut scenes START */
			
					var x;
					for (x = 0; x < systemSettings.introMadeBy.loadingImages.length; x++)
					{
						this.load.image("introMadeByImage"+systemSettings.introMadeBy.loadingImages[x].id, systemSettings.introMadeBy.loadingImages[x].imagePath);
					}

					var x;
					for (x = 0; x < systemSettings.introMadeBy.loadingAnimations.length; x++)
					{
						if ((this.game.cache.checkImageKey("introMadeByAnimation" + systemSettings.introMadeBy.loadingAnimations[x].id) == false)) {
                            this.game.load.atlasJSONHash("introMadeByAnimation" + systemSettings.introMadeBy.loadingAnimations[x].id, systemSettings.introMadeBy.loadingAnimations[x].filePath + ".png", systemSettings.introMadeBy.loadingAnimations[x].filePath + ".json");
                        }
					}

					var x;
					for (x = 0; x < systemSettings.introMadeBy.loadingMusic.length; x++)
					{
						this.load.audio("introMadeByMusic"+systemSettings.introMadeBy.loadingMusic[x].id, ["" + acquireMusicPath(systemSettings.introMadeBy.loadingMusic[x].musicId) + ".mp3", "" + acquireMusicPath(systemSettings.introMadeBy.loadingMusic[x].musicId)+".ogg"]);
					}
				
            /* Cut scenes END */
		
		
		
		
		
		
		

		/* Infrastructure END */
		


		/* Game images END */


		},

		create: function () {
			
            //this.preloadFill.cropEnabled = false;
			
			

        },


        

		update: function () {

			
			
			if (this.ready == false)
            {

				var audioItemsToLoad = 0;
				var audioItemsLoaded = 0;

				

						audioItemsToLoad = systemSettings.introMadeBy.loadingMusic.length;

						var x;
						for (x = 0; x < systemSettings.introMadeBy.loadingMusic.length; x++)
						{
							if (this.cache.isSoundDecoded("introMadeByMusic"+systemSettings.introMadeBy.loadingMusic[x].id))
                    		{
								audioItemsLoaded++;
							}
						}
					


				if ((audioItemsToLoad == audioItemsLoaded))
				{
					this.ready = true;
					this.state.start("IntroMadeBy");

					/* Set back to false so we can use it again START */
					this.ready = false;
					/* Set back to false so we can use it again END */
				}

				
			}

		}

	};
})(BasicGame);