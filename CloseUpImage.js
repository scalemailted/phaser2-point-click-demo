/* Andy Howard Games 2017 */

(function(BasicGame) {
    'use strict';

    BasicGame.CloseUpImage = function () {

        
    };

    

    BasicGame.CloseUpImage.prototype = {
		
		
		
		
        create: function () {
			
			
            
			

            console.log(gameData);
			
			
			
                        var currentLang = userSettings.currentLanguage;
			
			
						

						/* Put background on START */
                        this.background = this.game.add.sprite(0, 0, "closeUpImage"+viewCloseUpImage);
						/* Put background on END */
						
						
						
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
						
						
						
						
                        
						

            
        },
		
		
		

		

		
		
		
		
		goBackToGame: function() {
                    
            

                    var i;
                    for (i = 0; i < closeUpImages.length; i++)
                    {
                        if ((closeUpImages[i].id == viewCloseUpImage))
                        {
                            this.game.cache.removeImage("closeUpImage"+closeUpImages[i].id, true);
                        }
                    }

                    playBackAndSkipLinksSound();

                    
					this.state.start('Room');
				
				

		},

		
		
		
		
		
		
        update: function() {
            


			
          
            
            
        }
     };

})(BasicGame);