/* Andy Howard Games 2017 */

(function(BasicGame) {
    'use strict';

    BasicGame.ToDoList = function () {

        
    };

    

    BasicGame.ToDoList.prototype = {
		
		
		
		
        create: function () {
			
			
            
			

            console.log(gameData);
			
			
            


						/* List out tasks START */
                        


                        var i;
                        for (i = 0; i < gameData.toDoLists.length; i++) {

                            if ((gameData.toDoLists[i].id == viewToDoList)) {

                                

                                var currentListId = gameData.toDoLists[i].currentListId;

                                var k;
                                for (k = 0; k < gameData.toDoLists[i].lists.length; k++) {

                                    if ((gameData.toDoLists[i].lists[k].id == currentListId))
                                    {

                                        

                                        
                                        var startingYPos = gameData.toDoLists[i].lists[k].startingYPos;
                                        
                                       
                                        
                                        
                                        
                                        


                                        /* Put background on START */
                                        this.background = this.game.add.sprite(0, 0, "imageLibrary"+gameData.toDoLists[i].lists[k].backgroundImageId);
						                /* Put background on END */

                                        this.toDoListTextGroup = this.game.add.group();
                                        this.toDoListTextGroup.angle = gameData.toDoLists[i].lists[k].textAngle;


                                        var x;
                                        for (x = 0; x < gameData.toDoLists[i].lists[k].items.length; x++) {

                                            if ((gameData.toDoLists[i].lists[k].items[x].status == 0 || gameData.toDoLists[i].lists[k].items[x].status == 1)) {

                                                

                                                var text = gameData.toDoLists[i].lists[k].items[x].languages[currentLang].text + "\n";

                                                var toDoListText = this.game.add.text(gameData.toDoLists[i].lists[k].startingXPos, startingYPos, text, { font: gameData.toDoLists[i].lists[k].languages[currentLang].fontSize + "px "+acquireFontName(gameData.toDoLists[i].lists[k].languages[currentLang].fontId)+"", fill: gameData.toDoLists[i].lists[k].textColor });
                                                toDoListText.wordWrap = true;
                                                toDoListText.lineSpacing = gameData.toDoLists[i].lists[k].languages[currentLang].lineSpacing;
                                                toDoListText.wordWrapWidth = gameData.toDoLists[i].lists[k].width;
                                                toDoListText.anchor.y = 1;

                                                if ((gameData.toDoLists[i].lists[k].items[x].status == 1)) {
                                                    toDoListText.alpha = 0.3;
                                                }


                                                this.toDoListTextGroup.add(toDoListText);

                                                startingYPos = startingYPos + gameData.toDoLists[i].lists[k].itemGap;



                                            }

                                        }
                                    }


                                    
                                }
                            }

                        }



                        
                        /* List out tasks END */
						



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
                    
            playBackAndSkipLinksSound();

					this.state.start('Room');
				
				

		},

		
		
		
		
		
		
        update: function() {
            


			
          
            
            
        }
     };

})(BasicGame);