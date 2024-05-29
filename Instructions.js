/* Andy Howard Games 2017 */

(function(BasicGame) {
    'use strict';

    BasicGame.Instructions = function () {

        
    };

    

    BasicGame.Instructions.prototype = {
		
		
		
		
        create: function () {
            
            
            

			
            
			

            console.log(gameData);
			
			
            


						/* List out tasks START */
                        this.generatePage(0, false);


                        


            
        },
		
		
		

		generatePage(viewingPage, playPageTurningSound){

            if ((playPageTurningSound == true))
            {
                findAndPlayFoleySound(systemSettings.gameplaySettings.uiSounds.documentArrows);
            }
            

            if ((this.background != null))
            {
                this.background.destroy();
            }
            if ((this.leftArrow != null))
            {
                this.leftArrow.destroy();
            }
            if ((this.rightArrow != null))
            {
                this.rightArrow.destroy();
            }
            if ((this.textGroup != null))
            {
                this.textGroup.destroy();
            }
            if ((this.backButton != null))
            {
                this.backButton.destroy();
            }



                        

                                
                                        /* Put background on START */
                                        this.background = this.game.add.sprite(0, 0, "imageLibrary"+systemSettings.instructions[viewingPage].backgroundImageId);
						                /* Put background on END */


                                        /* Arrows START */
                                        if ((viewingPage > 0))
                                        {
                                            this.leftArrow = this.game.add.sprite(systemSettings.instructions[viewingPage].pagination.leftArrow.position.x, systemSettings.instructions[viewingPage].pagination.leftArrow.position.y, "imageLibrary"+systemSettings.instructions[viewingPage].pagination.leftArrow.imageId);
                                            this.leftArrow.inputEnabled = true;
                                            this.leftArrow.events.onInputDown.add(function () { this.generatePage(viewingPage-1, true) }, this);
                                        }
                                        if ((viewingPage < systemSettings.instructions.length-1))
                                        {
                                            this.rightArrow = this.game.add.sprite(systemSettings.instructions[viewingPage].pagination.rightArrow.position.x, systemSettings.instructions[viewingPage].pagination.rightArrow.position.y, "imageLibrary"+systemSettings.instructions[viewingPage].pagination.rightArrow.imageId);
                                            this.rightArrow.inputEnabled = true;
                                            this.rightArrow.events.onInputDown.add(function () { this.generatePage(viewingPage+1, true) }, this);
                                        }
                                        /* Arrows END */



                                        

                                                this.textGroup = this.game.add.group();


                                                var k;
                                                for (k = 0; k < systemSettings.instructions[viewingPage].textBlocks.length; k++)
                                                {
                                                    var toDoListText = this.game.add.text(systemSettings.instructions[viewingPage].textBlocks[k].textPosition.x, systemSettings.instructions[viewingPage].textBlocks[k].textPosition.y, systemSettings.instructions[viewingPage].textBlocks[k].languages[currentLang].text + "\n", { font: systemSettings.instructions[viewingPage].textBlocks[k].languages[currentLang].fontSize + "px "+acquireFontName(systemSettings.instructions[viewingPage].textBlocks[k].languages[currentLang].fontId)+"", fill: systemSettings.instructions[viewingPage].textBlocks[k].textColor });
                                                    toDoListText.wordWrap = true;
                                                    toDoListText.lineSpacing = systemSettings.instructions[viewingPage].textBlocks[k].languages[currentLang].lineSpacing;
                                                    toDoListText.wordWrapWidth = systemSettings.instructions[viewingPage].textBlocks[k].width;
                                                    toDoListText.angle = systemSettings.instructions[viewingPage].textBlocks[k].textAngle;
                                                    this.textGroup.add(toDoListText);
                                                }




                            



                        
                        /* List out tasks END */
						



                        /* Credits button START */
                        this.backButton = this.game.add.text(systemSettings.gameplaySettings.uiText.backAndSkipLinks.x, systemSettings.gameplaySettings.uiText.backAndSkipLinks.y, acquireSystemText("back"), { font: ""+systemSettings.gameplaySettings.uiText.backAndSkipLinks.languages[currentLang].fontSize+"px "+acquireFontName(systemSettings.gameplaySettings.uiText.backAndSkipLinks.languages[currentLang].fontId)+"", fill: systemSettings.gameplaySettings.uiText.backAndSkipLinks.textColor });
                        
                        if ((systemSettings.gameplaySettings.uiText.backAndSkipLinks.stroke.show == true))
                        {
                            this.backButton.stroke = systemSettings.gameplaySettings.uiText.backAndSkipLinks.stroke.color;
                            this.backButton.strokeThickness = systemSettings.gameplaySettings.uiText.backAndSkipLinks.stroke.thickness;
                        }
                        
                        if ((systemSettings.gameplaySettings.uiText.backAndSkipLinks.shadow.show == true))
                        {
                            this.backButton.setShadow(systemSettings.gameplaySettings.uiText.backAndSkipLinks.shadow.x, systemSettings.gameplaySettings.uiText.backAndSkipLinks.shadow.y, systemSettings.gameplaySettings.uiText.backAndSkipLinks.shadow.color, systemSettings.gameplaySettings.uiText.backAndSkipLinks.shadow.blur);
                        }

                        /* Colors START */
                        var backTextGradient = this.backButton.context.createLinearGradient(0, 0, 0, this.backButton.height);
                        backTextGradient.addColorStop(0, systemSettings.gameplaySettings.uiText.backAndSkipLinks.textColor);
                        backTextGradient.addColorStop(1, systemSettings.gameplaySettings.uiText.backAndSkipLinks.textColorAdditional);
                        this.backButton.fill = backTextGradient;
                        /* Colors END */
                        
                        this.backButton.inputEnabled = true;
                        this.backButton.events.onInputDown.add(this.goBackToGame, this);
						/* Credits button END */

        },

		
		
		
		
		goBackToGame: function() {
                    
                    playBackAndSkipLinksSound();

                    
					this.state.start('Options');
				
				

		},

		
		
		
		
		
		
        update: function() {
            


			
          
            
            
        }
     };

})(BasicGame);