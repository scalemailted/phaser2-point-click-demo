/* Andy Howard Games 2017 */

(function(BasicGame) {
    'use strict';

    BasicGame.Document = function () {

        
    };

    

    BasicGame.Document.prototype = {
		
		
		
		
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



                        var i;
                        for (i = 0; i < documents.length; i++) {

                            if ((documents[i].id == viewDocument)) {

                                
                                        /* Put background on START */
                                        this.background = this.game.add.sprite(0, 0, "imageLibrary"+documents[i].pages[viewingPage].backgroundImageId);
						                /* Put background on END */


                                        /* Arrows START */
                                        if ((viewingPage > 0))
                                        {
                                            this.leftArrow = this.game.add.sprite(documents[i].pages[viewingPage].pagination.leftArrow.position.x, documents[i].pages[viewingPage].pagination.leftArrow.position.y, "imageLibrary"+documents[i].pages[viewingPage].pagination.leftArrow.imageId);
                                            this.leftArrow.inputEnabled = true;
                                            this.leftArrow.events.onInputDown.add(function () { this.generatePage(viewingPage-1, true) }, this);
                                        }
                                        if ((viewingPage < documents[i].pages.length-1))
                                        {
                                            this.rightArrow = this.game.add.sprite(documents[i].pages[viewingPage].pagination.rightArrow.position.x, documents[i].pages[viewingPage].pagination.rightArrow.position.y, "imageLibrary"+documents[i].pages[viewingPage].pagination.rightArrow.imageId);
                                            this.rightArrow.inputEnabled = true;
                                            this.rightArrow.events.onInputDown.add(function () { this.generatePage(viewingPage+1, true) }, this);
                                        }
                                        /* Arrows END */



                                        

                                        
                                        
                                       
                                        
                                        


                                        

                                                this.textGroup = this.game.add.group();


                                                var k;
                                                for (k = 0; k < documents[i].pages[viewingPage].textBlocks.length; k++)
                                                {
                                                    var toDoListText = this.game.add.text(documents[i].pages[viewingPage].textBlocks[k].textPosition.x, documents[i].pages[viewingPage].textBlocks[k].textPosition.y, documents[i].pages[viewingPage].textBlocks[k].languages[currentLang].text + "\n", { font: documents[i].pages[viewingPage].textBlocks[k].languages[currentLang].fontSize + "px "+acquireFontName(documents[i].pages[viewingPage].textBlocks[k].languages[currentLang].fontId)+"", fill: documents[i].pages[viewingPage].textBlocks[k].textColor });
                                                    toDoListText.wordWrap = true;
                                                    toDoListText.lineSpacing = documents[i].pages[viewingPage].textBlocks[k].languages[currentLang].lineSpacing;
                                                    toDoListText.wordWrapWidth = documents[i].pages[viewingPage].textBlocks[k].width;
                                                    toDoListText.angle = documents[i].pages[viewingPage].textBlocks[k].textAngle;
                                                    this.textGroup.add(toDoListText);
                                                }




                            }

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

                    
					this.state.start('Room');
				
				

		},

		
		
		
		
		
		
        update: function() {
            


			
          
            
            
        }
     };

})(BasicGame);