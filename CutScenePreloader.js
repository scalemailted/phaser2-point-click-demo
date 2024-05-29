/* Andy Howard Games 2017 */





(function(BasicGame) {
	'use strict';
	
	
	
	
	BasicGame.CutScenePreloader = function () {

		

		this.ready = false;
		
		
		

	};



	BasicGame.CutScenePreloader.prototype = {

		preload: function () {
				

            eval(systemSettings.roomLoadingScene.code.create);

            unloadRoomAssets(true);
			
		
		
			/* Cut scenes START */
			var i;
            for (i = 0; i < cutScenes.length; i++)
            {
                if ((cutScenes[i].id == cutSceneCallback))
                {
					var x;
					for (x = 0; x < cutScenes[i].loadingImages.length; x++)
					{
						this.load.image("cutSceneImage"+cutScenes[i].loadingImages[x].id, cutScenes[i].loadingImages[x].imagePath);
					}

					var x;
					for (x = 0; x < cutScenes[i].loadingAnimations.length; x++)
					{
						if ((this.game.cache.checkImageKey("cutSceneAnimation" + cutScenes[i].loadingAnimations[x].id) == false)) {
                            this.game.load.atlasJSONHash("cutSceneAnimation" + cutScenes[i].loadingAnimations[x].id, cutScenes[i].loadingAnimations[x].filePath + ".png", cutScenes[i].loadingAnimations[x].filePath + ".json");
                        }
					}

					var x;
					for (x = 0; x < cutScenes[i].loadingMusic.length; x++)
					{
						this.load.audio("cutSceneMusic"+cutScenes[i].loadingMusic[x].id, ["" + acquireMusicPath(cutScenes[i].loadingMusic[x].musicId) + ".mp3", "" + acquireMusicPath(cutScenes[i].loadingMusic[x].musicId)+".ogg"]);
					}
				}
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

				var i;
				for (i = 0; i < cutScenes.length; i++)
				{
					if ((cutScenes[i].id == cutSceneCallback))
					{

						audioItemsToLoad = cutScenes[i].loadingMusic.length;

						var x;
						for (x = 0; x < cutScenes[i].loadingMusic.length; x++)
						{
							if (this.cache.isSoundDecoded("cutSceneMusic"+cutScenes[i].loadingMusic[x].id))
                    		{
								audioItemsLoaded++;
							}
						}
					}
				}


				if ((audioItemsToLoad == audioItemsLoaded))
				{
					this.ready = true;
					this.state.start("CutScene");

					/* Set back to false so we can use it again START */
					this.ready = false;
					/* Set back to false so we can use it again END */
				}

				
			}

		}

	};
})(BasicGame);