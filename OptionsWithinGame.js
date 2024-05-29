/* Andy Howard Games 2017 */

(function(BasicGame) {
    'use strict';

    BasicGame.OptionsWithinGame = function () {

        
    };

    

    BasicGame.OptionsWithinGame.prototype = {
		
		
		
		preload: function () {
      
            

        },
		
		
		
		
		
		
        create: function () {
			
			
			this.background = this.game.add.sprite(0, 0, 'optionsFromWithinGameBackground');


			/* Credits button START */
			var mainScreenButton = this.game.add.text(systemSettings.gameplaySettings.uiText.backAndSkipLinks.x, systemSettings.gameplaySettings.uiText.backAndSkipLinks.y, acquireSystemText("back"), { font: ""+systemSettings.gameplaySettings.uiText.backAndSkipLinks.languages[currentLang].fontSize+"px "+acquireFontName(systemSettings.gameplaySettings.uiText.backAndSkipLinks.languages[currentLang].fontId)+"", fill: systemSettings.gameplaySettings.uiText.backAndSkipLinks.textColor });
                        
                        if ((systemSettings.gameplaySettings.uiText.backAndSkipLinks.stroke.show == true))
                        {
                            mainScreenButton.stroke = systemSettings.gameplaySettings.uiText.backAndSkipLinks.stroke.color;
                            mainScreenButton.strokeThickness = systemSettings.gameplaySettings.uiText.backAndSkipLinks.stroke.thickness;
                        }
                        
                        if ((systemSettings.gameplaySettings.uiText.backAndSkipLinks.shadow.show == true))
                        {
                            mainScreenButton.setShadow(systemSettings.gameplaySettings.uiText.backAndSkipLinks.shadow.x, systemSettings.gameplaySettings.uiText.backAndSkipLinks.shadow.y, systemSettings.gameplaySettings.uiText.backAndSkipLinks.shadow.color, systemSettings.gameplaySettings.uiText.backAndSkipLinks.shadow.blur);
                        }

                        /* Colors START */
                        var backTextGradient = mainScreenButton.context.createLinearGradient(0, 0, 0, mainScreenButton.height);
                        backTextGradient.addColorStop(0, systemSettings.gameplaySettings.uiText.backAndSkipLinks.textColor);
                        backTextGradient.addColorStop(1, systemSettings.gameplaySettings.uiText.backAndSkipLinks.textColorAdditional);
                        mainScreenButton.fill = backTextGradient;
						/* Colors END */
						
						
			mainScreenButton.inputEnabled = true;
			mainScreenButton.events.onInputDown.add(this.goBackToGame, this);
			/* Credits button END */
						

			renderTextBlocks(systemSettings.optionsFromWithinGame.textBlocks);
            
		},
		

		


		goBackToGame: function() {
                    
            previousScreenType = 1;
			playBackAndSkipLinksSound();
			this.state.start('Room');

		},

		
        update: function() {
            
            
        }
     };

})(BasicGame);