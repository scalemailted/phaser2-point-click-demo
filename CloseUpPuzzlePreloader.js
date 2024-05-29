/* Andy Howard Games 2017 */





(function(BasicGame) {
	'use strict';
	
	
	
	
	BasicGame.CloseUpPuzzlePreloader = function () {

		

		this.ready = false;
		
		
		

	};



	BasicGame.CloseUpPuzzlePreloader.prototype = {

		preload: function () {
				

            eval(systemSettings.roomLoadingScene.code.create);

            
			
		
		
			/* Close up puzzles START */
			var i;
            for (i = 0; i < closeUpPuzzles.length; i++)
            {

				if ((closeUpPuzzles[i].id == closeUpPuzzleCallback.puzzleId))
				{
					var x;
					for (x = 0; x < closeUpPuzzles[i].loadingImages.length; x++)
					{
						this.load.image("closeUpPuzzleImage"+closeUpPuzzles[i].loadingImages[x].id, closeUpPuzzles[i].loadingImages[x].imagePath);
					}

					var x;
					for (x = 0; x < closeUpPuzzles[i].loadingAnimations.length; x++)
					{
						if ((this.game.cache.checkImageKey("closeUpPuzzleAnimation" + closeUpPuzzles[i].loadingAnimations[x].id) == false)) {
                            this.game.load.atlasJSONHash("closeUpPuzzleAnimation" + closeUpPuzzles[i].loadingAnimations[x].id, closeUpPuzzles[i].loadingAnimations[x].filePath + ".png", closeUpPuzzles[i].loadingAnimations[x].filePath + ".json");
                        }
					}
				}
				
			}
        
        /* Close up puzzles END */
		
		
		
		
		
		
		

		/* Infrastructure END */
		


		/* Game images END */


		},

		create: function () {
			
            //this.preloadFill.cropEnabled = false;
			
			

        },


        

		update: function () {

			
			
			if (this.ready == false)
            {

				


				
					this.ready = true;
					this.state.start("CloseUpPuzzle");

					/* Set back to false so we can use it again START */
					this.ready = false;
					/* Set back to false so we can use it again END */
				

				
			}

		}

	};
})(BasicGame);