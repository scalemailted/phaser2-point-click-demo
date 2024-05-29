/* Andy Howard Games 2017 */

(function(BasicGame) {
    'use strict';

    BasicGame.TitleCard = function () {

        
    };

    

    BasicGame.TitleCard.prototype = {
		
		
        create: function () {


            /* This only happens when coming from a completed game START */
            unloadRoomAssets(true);
            currentRoom = null;
            previousRoom = null;
            /* This only happens when coming from a completed game END */

			
			this.background = this.game.add.sprite(0, 0, 'titleCardBackground');

            eval(systemSettings.titleCard.code.create);

			renderTextBlocks(systemSettings.titleCard.textBlocks);
            
		},
		

		
		
        update: function() {
            
            eval(systemSettings.titleCard.code.update);
            
        }
     };

})(BasicGame);