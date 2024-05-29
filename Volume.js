/* Andy Howard Games 2017 */

(function(BasicGame) {
    'use strict';

    BasicGame.Volume = function () {

        
    };

    

    BasicGame.Volume.prototype = {
		
		
		
		
        create: function () {
			
			

			

            console.log(gameData);
			
			
			
						
            
			
						

						/* Put background on START */
						this.background = this.game.add.sprite(0, 0, 'volumeBackground');
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
						
						

						renderTextBlocks(systemSettings.volumes.textBlocks);


						
						
                        
						

						/* Slide bars START */						
						var musicVolumeBar = this.game.add.sprite(systemSettings.volumes.uiVolumeSlideBarMusic.x, systemSettings.volumes.uiVolumeSlideBarMusic.y, 'volumeSlideBar');				
						var sfxVolumeBar = this.game.add.sprite(systemSettings.volumes.uiVolumeSlideBarSfx.x, systemSettings.volumes.uiVolumeSlideBarSfx.y, 'volumeSlideBar');
                        var voicesVolumeBar = this.game.add.sprite(systemSettings.volumes.uiVolumeSlideBarVoices.x, systemSettings.volumes.uiVolumeSlideBarVoices.y, 'volumeSlideBar');
						/* Slide bars END */
						


						this.volumeSpotGroup = this.game.add.group();
						
						/* Volume Spots START */
						var musicVolumeSpot = this.game.add.sprite(0, 0, 'volumeSlideSpot');
						musicVolumeSpot.anchor.x = Math.round(musicVolumeSpot.width * 0.5) / musicVolumeSpot.width;
						musicVolumeSpot.anchor.y = Math.round(musicVolumeSpot.height * 0.5) / musicVolumeSpot.height;
						musicVolumeSpot.x = this.calculateXPositionBasedOnUserSetting(userSettings.volumes.musicVolume, musicVolumeBar);
						musicVolumeSpot.y = musicVolumeBar.y + musicVolumeBar.height/2;
						musicVolumeSpot.volumeType = "music";
						musicVolumeSpot.min = musicVolumeBar.x;
						musicVolumeSpot.max = musicVolumeBar.x + musicVolumeBar.width;
						musicVolumeSpot.inputEnabled = true;
						musicVolumeSpot.input.enableDrag();
						musicVolumeSpot.input.allowVerticalDrag = false;
						musicVolumeSpot.events.onDragStop.add(this.toggleSpot, this);
						this.volumeSpotGroup.add(musicVolumeSpot);



						
						var sfxVolumeSpot = this.game.add.sprite(0, 0, 'volumeSlideSpot');
						sfxVolumeSpot.anchor.x = Math.round(sfxVolumeSpot.width * 0.5) / sfxVolumeSpot.width;
						sfxVolumeSpot.anchor.y = Math.round(sfxVolumeSpot.height * 0.5) / sfxVolumeSpot.height;
                        sfxVolumeSpot.x = this.calculateXPositionBasedOnUserSetting(userSettings.volumes.sfxVolume, sfxVolumeBar);
						sfxVolumeSpot.y = sfxVolumeBar.y + sfxVolumeBar.height/2;
						sfxVolumeSpot.volumeType = "sfx";
						sfxVolumeSpot.min = sfxVolumeBar.x;
						sfxVolumeSpot.max = sfxVolumeBar.x + sfxVolumeBar.width;
						sfxVolumeSpot.inputEnabled = true;
						sfxVolumeSpot.input.enableDrag();
						sfxVolumeSpot.input.allowVerticalDrag = false;
						sfxVolumeSpot.events.onDragStop.add(this.toggleSpot, this);
						this.volumeSpotGroup.add(sfxVolumeSpot);
						


                        
                        var voicesVolumeSpot = this.game.add.sprite(0, 0, 'volumeSlideSpot');
						voicesVolumeSpot.anchor.x = Math.round(voicesVolumeSpot.width * 0.5) / voicesVolumeSpot.width;
						voicesVolumeSpot.anchor.y = Math.round(voicesVolumeSpot.height * 0.5) / voicesVolumeSpot.height;
                        voicesVolumeSpot.x = this.calculateXPositionBasedOnUserSetting(userSettings.volumes.voicesVolume, voicesVolumeBar);
                        voicesVolumeSpot.y = voicesVolumeBar.y + voicesVolumeBar.height/2;
						voicesVolumeSpot.volumeType = "voices";
						voicesVolumeSpot.min = voicesVolumeBar.x;
						voicesVolumeSpot.max = voicesVolumeBar.x + voicesVolumeBar.width;
                        voicesVolumeSpot.inputEnabled = true;
                        voicesVolumeSpot.input.enableDrag();
                        voicesVolumeSpot.input.allowVerticalDrag = false;
                        voicesVolumeSpot.events.onDragStop.add(this.toggleSpot, this);
                        this.volumeSpotGroup.add(voicesVolumeSpot);
						/* Volume Spots END */
						

            
        },
		
		

		calculateXPositionBasedOnUserSetting: function(currentValue, bar){

			var minPxVal = bar.x;
			var convertedCurrentValueToPercentage = currentValue * 100;
			var calculatedPercentageValue = convertedCurrentValueToPercentage * bar.width / 100;

			return calculatedPercentageValue + minPxVal;

		},


		calculateNewDecimalBasedOnUserInteraction: function(itemBeingMoved){

			var numberOfPixelsSpotIsInSlider = itemBeingMoved.x - itemBeingMoved.min;
			var widthOfSlider = itemBeingMoved.max - itemBeingMoved.min;
			var calculatedPercentageValue = numberOfPixelsSpotIsInSlider / widthOfSlider * 100;
			
			return calculatedPercentageValue / 100;

		},
		

		
		toggleSpot: function(itemBeingMoved) {
				
				
			var volumeToDecimal = this.calculateNewDecimalBasedOnUserInteraction(itemBeingMoved);
			console.log(volumeToDecimal);
				
				
				
				if ((itemBeingMoved.volumeType == "music"))
				{
                    userSettings.volumes.musicVolume = volumeToDecimal;
                    optionsMusicRef.volume = volumeToDecimal;
				}
				
				if ((itemBeingMoved.volumeType == "sfx"))
				{
                    userSettings.volumes.sfxVolume = volumeToDecimal;
				}
				
                if ((itemBeingMoved.volumeType == "voices"))
                {
                    userSettings.volumes.voicesVolume = volumeToDecimal;
				}
				
				/* Set the volume into the gameData file END */
				
				

				var db2 = new Dexie(gameDataLocalStorageName);
                            db2.version(1).stores({
                                myData: ""
                            });
                            db2.myData.put(userSettings, 'userSettings');

            
			},
		
		
		
		
		goBackToGame: function() {
					
			playBackAndSkipLinksSound();

			this.state.start('Options');
				
				

		},

		
		
		
		
		
		
        update: function() {
            

			
			
			
			
				if ((this.volumeSpotGroup != null))
				{
					this.volumeSpotGroup.forEachAlive(function(item)
					{
						if ((item.x < item.min))
						{
							item.x = item.min;
						}
						
						if ((item.x > item.max))
						{
							item.x = item.max;
						}				
						
					}, this);
				}
			
          
            
            
        }
     };

})(BasicGame);