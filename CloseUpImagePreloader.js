/* Andy Howard Games 2017 */





(function(BasicGame) {
	'use strict';
	
	
	
	
	BasicGame.CloseUpImagePreloader = function () {

		

		this.ready = false;
		
		
		

	};



	BasicGame.CloseUpImagePreloader.prototype = {

		preload: function () {
				

            eval(systemSettings.roomLoadingScene.code.create);

            
			
		
		
			/* Load close up images START */
			var i;
			for (i = 0; i < closeUpImages.length; i++)
			{
				if ((closeUpImages[i].id == viewCloseUpImage))
				{
					this.load.image("closeUpImage"+closeUpImages[i].id, "" + closeUpImages[i].imagePath + "");
				}
			}
			/* Load close up images END */
		
		
		
		
		
		
		

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
					this.state.start("CloseUpImage");

					/* Set back to false so we can use it again START */
					this.ready = false;
					/* Set back to false so we can use it again END */
				

				
			}

		}

	};
})(BasicGame);