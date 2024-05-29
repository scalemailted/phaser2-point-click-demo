/* Andy Howard Games 2017 */

(function(BasicGame) {
    'use strict';

    BasicGame.TextAndSpeech = function () {

        
    };

    

    BasicGame.TextAndSpeech.prototype = {
		
		
		
		
        create: function () {

			/* Make a record remembering the old lang we are in START */
			this.oldLang = currentLang;
			/* Make a record remembering the old lang we are in END */
			
			
			/* Set foley sounds START */
			this.foleySounds = this.game.add.audio("foleySoundsGameWide");
			this.foleySounds.allowMultiple = true;
			/* Set foley sounds END */
			

            console.log(gameData);
			
			
			
						
            
			
						

						/* Put background on START */
						this.background = this.game.add.sprite(0, 0, 'textAndSpeechBackground');
						/* Put background on END */
						
						
						
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


						/* Language change text button START */
						this.languageButton = this.game.add.text(16, systemSettings.textAndSpeech.languageNameStyling.yPosition, '.', { font: ""+systemSettings.textAndSpeech.languageNameStyling.languages[currentLang].fontSize+"px "+acquireFontName(systemSettings.textAndSpeech.languageNameStyling.languages[currentLang].fontId)+"", fill: systemSettings.textAndSpeech.languageNameStyling.textColor });
						this.languageButton.wordWrap = true;
						this.languageButton.align = 'center';
                        this.languageButton.wordWrapWidth = systemSettings.textAndSpeech.languageNameStyling.width;
						this.languageButton.lineSpacing = systemSettings.textAndSpeech.languageNameStyling.languages[currentLang].lineSpacing;

						if ((systemSettings.textAndSpeech.languageNameStyling.stroke.show == true))
						{
							this.languageButton.stroke = systemSettings.textAndSpeech.languageNameStyling.stroke.color;
							this.languageButton.strokeThickness = systemSettings.textAndSpeech.languageNameStyling.stroke.thickness;
						}

						if ((systemSettings.textAndSpeech.languageNameStyling.shadow.show == true))
						{
							this.languageButton.setShadow(systemSettings.textAndSpeech.languageNameStyling.shadow.x, systemSettings.textAndSpeech.languageNameStyling.shadow.y, systemSettings.textAndSpeech.languageNameStyling.shadow.color, systemSettings.textAndSpeech.languageNameStyling.shadow.blur);
						}
						
						this.languageButton.anchor.x = Math.round(this.languageButton.width * 0.5) / this.languageButton.width;
						this.languageButton.x = this.game.width/2;
						this.languageButton.inputEnabled = true;
						this.languageButton.events.onInputDown.add(this.goToNextLanguage, this);
						this.getCurrentLanguageName();
						/* Language change text button END */


						/* Speech mode button START */
						this.speechModeButton = this.game.add.text(16, systemSettings.textAndSpeech.speechModeNameStyling.yPosition, '.', { font: ""+systemSettings.textAndSpeech.speechModeNameStyling.languages[currentLang].fontSize+"px "+acquireFontName(systemSettings.textAndSpeech.speechModeNameStyling.languages[currentLang].fontId)+"", fill: systemSettings.textAndSpeech.speechModeNameStyling.textColor });
						this.speechModeButton.wordWrap = true;
						this.speechModeButton.align = 'center';
                        this.speechModeButton.wordWrapWidth = systemSettings.textAndSpeech.speechModeNameStyling.width;
						this.speechModeButton.lineSpacing = systemSettings.textAndSpeech.speechModeNameStyling.languages[currentLang].lineSpacing;

						if ((systemSettings.textAndSpeech.speechModeNameStyling.stroke.show == true))
						{
							this.speechModeButton.stroke = systemSettings.textAndSpeech.speechModeNameStyling.stroke.color;
							this.speechModeButton.strokeThickness = systemSettings.textAndSpeech.speechModeNameStyling.stroke.thickness;
						}

						if ((systemSettings.textAndSpeech.speechModeNameStyling.shadow.show == true))
						{
							this.speechModeButton.setShadow(systemSettings.textAndSpeech.speechModeNameStyling.shadow.x, systemSettings.textAndSpeech.speechModeNameStyling.shadow.y, systemSettings.textAndSpeech.speechModeNameStyling.shadow.color, systemSettings.textAndSpeech.speechModeNameStyling.shadow.blur);
						}
						
						this.speechModeButton.anchor.x = Math.round(this.speechModeButton.width * 0.5) / this.speechModeButton.width;
						this.speechModeButton.x = this.game.width/2;
						this.speechModeButton.inputEnabled = true;
						this.speechModeButton.events.onInputDown.add(this.changeSpeechMode, this);
						this.getCurrentSpeechModeName();
						/* Speech mode button END */

						
						

						renderTextBlocks(systemSettings.textAndSpeech.textBlocks);


						
						
                        
						

						/* Slide bars START */						
						var interfaceTextSizeBar = this.game.add.sprite(systemSettings.textAndSpeech.uiTextAndSpeechSlideBarInterfaceTextSize.x, systemSettings.textAndSpeech.uiTextAndSpeechSlideBarInterfaceTextSize.y, 'uiTextAndSpeechSlideBar');				
						var speechTextSpeedBar = this.game.add.sprite(systemSettings.textAndSpeech.uiTextAndSpeechSlideBarSpeechTextSpeed.x, systemSettings.textAndSpeech.uiTextAndSpeechSlideBarSpeechTextSpeed.y, 'uiTextAndSpeechSlideBar');
						/* Slide bars END */
						


						this.textSizeSpotGroup = this.game.add.group();
						
						/* Volume Spots START */
						var interfaceTextSizeSpot = this.game.add.sprite(0, 0, 'uiTextSizeSlideSpot');
						interfaceTextSizeSpot.anchor.x = Math.round(interfaceTextSizeSpot.width * 0.5) / interfaceTextSizeSpot.width;
						interfaceTextSizeSpot.anchor.y = Math.round(interfaceTextSizeSpot.height * 0.5) / interfaceTextSizeSpot.height;
						interfaceTextSizeSpot.x = this.calculateXPositionBasedOnUserSetting(userSettings.textSize.interface, interfaceTextSizeBar);
						interfaceTextSizeSpot.y = interfaceTextSizeBar.y + interfaceTextSizeBar.height/2;
						interfaceTextSizeSpot.type = "interface";
						interfaceTextSizeSpot.min = interfaceTextSizeBar.x;
						interfaceTextSizeSpot.max = interfaceTextSizeBar.x + interfaceTextSizeBar.width;
						interfaceTextSizeSpot.barWidth = interfaceTextSizeBar.width;
						interfaceTextSizeSpot.inputEnabled = true;
						interfaceTextSizeSpot.input.enableDrag();
						interfaceTextSizeSpot.input.allowVerticalDrag = false;
						interfaceTextSizeSpot.events.onDragStop.add(this.toggleSpot, this);
						this.textSizeSpotGroup.add(interfaceTextSizeSpot);



						
						var speechTextSpeedSpot = this.game.add.sprite(0, 0, 'uiTextSizeSlideSpot');
						speechTextSpeedSpot.anchor.x = Math.round(speechTextSpeedSpot.width * 0.5) / speechTextSpeedSpot.width;
						speechTextSpeedSpot.anchor.y = Math.round(speechTextSpeedSpot.height * 0.5) / speechTextSpeedSpot.height;
                        speechTextSpeedSpot.x = this.calculateXPositionBasedOnUserSetting(userSettings.speechTextSpeed, speechTextSpeedBar);
						speechTextSpeedSpot.y = speechTextSpeedBar.y + speechTextSpeedBar.height/2;
						speechTextSpeedSpot.type = "speechSpeed";
						speechTextSpeedSpot.min = speechTextSpeedBar.x;
						speechTextSpeedSpot.max = speechTextSpeedBar.x + speechTextSpeedBar.width;
						speechTextSpeedSpot.barWidth = speechTextSpeedBar.width;
						speechTextSpeedSpot.inputEnabled = true;
						speechTextSpeedSpot.input.enableDrag();
						speechTextSpeedSpot.input.allowVerticalDrag = false;
						speechTextSpeedSpot.events.onDragStop.add(this.toggleSpot, this);
						this.textSizeSpotGroup.add(speechTextSpeedSpot);
						


                        
                        
						/* Volume Spots END */
						

            
		},


		resetAllOtherTextInNewLanguage: function(){
			this.backButton.setText(acquireSystemText("back"));
			textBlocksGroup.destroy();
			renderTextBlocks(systemSettings.textAndSpeech.textBlocks);
		},


		setSpeechModeBasedOnCurrentLanguageNarrationAbility: function(){

			var disabled;

			var doesSupportNarration = false;

				var i;
				for (i = 0; i < localisation.languages.length; i++)
				{
					if ((localisation.languages[i].id == currentLang))
					{
						doesSupportNarration = localisation.languages[i].allowNarrationAudio;
					}
				}


				if ((doesSupportNarration == true))
				{
					userSettings.speechMode = 0;
					this.speechModeButton.alpha = 1;
					disabled = false;
				}
				else
				{
					userSettings.speechMode = 2;
					this.speechModeButton.alpha = 0.8;
					disabled = true;
				}

				return disabled;

		},


		playLanguageChangeSound: function (){
            var i;
            for (i = 0; i < foleySounds.items.length; i++) {
                if ((foleySounds.items[i].id == systemSettings.textAndSpeech.languageNameStyling.sound)) {
                    this.foleySounds.addMarker("languageChangeSound", foleySounds.items[i].start, foleySounds.items[i].duration, userSettings.volumes.sfxVolume, false);
                    this.foleySounds.play("languageChangeSound");
                }
            }
		},
		

		playSpeechModeChangeSound: function (){
            var i;
            for (i = 0; i < foleySounds.items.length; i++) {
                if ((foleySounds.items[i].id == systemSettings.textAndSpeech.speechModeNameStyling.sound)) {
                    this.foleySounds.addMarker("speechModeChangeSound", foleySounds.items[i].start, foleySounds.items[i].duration, userSettings.volumes.sfxVolume, false);
                    this.foleySounds.play("speechModeChangeSound");
                }
            }
        },



		goToNextLanguage: function(){

			if ((localisation.languages.length > 1))
			{
				this.playLanguageChangeSound();
			}
			

			var currentLanguageIndex;
			var numberOfLanguages = localisation.languages.length;

			var i;
			for (i = 0; i < localisation.languages.length; i++)
			{
				if ((localisation.languages[i].id == currentLang))
				{
					currentLanguageIndex = i + 1;
				}
			}

			
			/* If current language is the last one, then go back to the first one in the list START */
			if ((currentLanguageIndex == numberOfLanguages))
			{
				currentLang = localisation.languages[0].id;
				userSettings.currentLanguage = localisation.languages[0].id;
			}
			/* If current language is the last one, then go back to the first one in the list END */
			else
			{
				currentLang = localisation.languages[currentLanguageIndex].id;
				userSettings.currentLanguage = localisation.languages[currentLanguageIndex].id;
			}

			
			this.setSpeechModeBasedOnCurrentLanguageNarrationAbility();
			this.getCurrentLanguageName();
			this.getCurrentSpeechModeName();
			this.resetAllOtherTextInNewLanguage();
			this.saveCurrentUserSettings();

		},


		getCurrentLanguageName: function(){

			var result;

			var i;
				for (i = 0; i < localisation.languages.length; i++)
				{
					if ((localisation.languages[i].id == currentLang))
					{
						result = localisation.languages[i].name;
					}
				}

			this.languageButton.setText(result);

		},



		changeSpeechMode: function() {

			var currentMode = userSettings.speechMode;
					
			/* If this language already allows voice, then go to voice only */
			if ((currentMode == 0))
			{
				this.playSpeechModeChangeSound();
				userSettings.speechMode = 1;
			}

			/* We can always go from voice only to speech text only */
			if ((currentMode == 1))
			{
				this.playSpeechModeChangeSound();
				userSettings.speechMode = 2;
			}

			if ((currentMode == 2))
			{
				/* Check to see if language supports voice. If it does go to voice and speech text mode, otherwise disable the button and fade out slightly */
				var disabled = this.setSpeechModeBasedOnCurrentLanguageNarrationAbility();
				if ((disabled == false))
				{
					this.playSpeechModeChangeSound();
				}

			}

			this.getCurrentSpeechModeName();
			this.saveCurrentUserSettings();
				
		},
		

		getCurrentSpeechModeName: function(){

			var result;

			if ((userSettings.speechMode == 0))
			{
				result = acquireSystemText("hearVoiceAndViewSpeechText");
			}

			if ((userSettings.speechMode == 1))
			{
				result = acquireSystemText("hearVoiceOnly");
			}

			if ((userSettings.speechMode == 2))
			{
				result = acquireSystemText("viewSpeechTextOnly");
			}

			this.speechModeButton.setText(result);

		},

		

		saveCurrentUserSettings: function(){

			var db2 = new Dexie(gameDataLocalStorageName);
			db2.version(1).stores({
				myData: ""
			});
			db2.myData.put(userSettings, 'userSettings');

		},
		
		

		calculateXPositionBasedOnUserSetting: function(currentValue, bar){

			console.log(currentValue);
			console.log(bar);

			var min = 0.5;
			var max = 1.5;

			// Caculate the normalize value 0..1
			var pcnt = (currentValue - min) / (max - min);
			// The position is the bar width * percent + min
			return bar.x + (bar.width * pcnt);

		},


		calculateNewDecimalBasedOnUserInteraction: function(itemBeingMoved){

			var min = 0.5;
			var max = 1.5;

			var pcnt = (itemBeingMoved.x - itemBeingMoved.min) / itemBeingMoved.barWidth;
    		return min + ((max - min) * pcnt);

		},
		

		
		toggleSpot: function(itemBeingMoved) {
				
				
			var toDecimal = this.calculateNewDecimalBasedOnUserInteraction(itemBeingMoved);
			
				
				
				
				if ((itemBeingMoved.type == "interface"))
				{
                    userSettings.textSize.interface = toDecimal;
				}
				
				if ((itemBeingMoved.type == "speechSpeed"))
				{
                    userSettings.speechTextSpeed = toDecimal;
				}				
				/* Set the volume into the gameData file END */
				
				

				this.saveCurrentUserSettings();

            
			},
		
		
		
		
		goBackToGame: function() {

			playBackAndSkipLinksSound();

			/* If the language has been changed, remove the old language narration from the current room and load in the new one START */
			//alert(this.oldLang);
			//alert(currentLang);

			/* Remove narration START */
			if ((this.oldLang != currentLang))
			{

				// Room narration
				var z;
				for (z = 0; z < gameData.rooms.length; z++) {
					if ((gameData.rooms[z].id == currentRoom)) {
						var i;
						for (i = 0; i < localisation.languages.length; i++) {
							if ((localisation.languages[i].id == this.oldLang) && (localisation.languages[i].allowNarrationAudio == true)) {
								this.game.cache.removeSound(gameData.rooms[z].narration.languages[this.oldLang].narrationId);
								this.game.sound.removeByKey(gameData.rooms[z].narration.languages[this.oldLang].narrationId);
							}
						}
					}
				}

				// Global narration
				var i;
				for (i = 0; i < localisation.languages.length; i++)
				{
					if ((localisation.languages[i].id == this.oldLang) && (localisation.languages[i].allowNarrationAudio == true) && (globalSpeeches.languages[this.oldLang].id != null))
					{
						this.game.cache.removeSound("globalSpeeches");
						this.game.sound.removeByKey("globalSpeeches");
					}
				}
				/* Remove narration END */

				

				/* Load in Global narration START */
				var i;
				for (i = 0; i < localisation.languages.length; i++)
				{
					if ((localisation.languages[i].id == currentLang) && (localisation.languages[i].allowNarrationAudio == true) && (globalSpeeches.languages[currentLang].id != null))
					{
						if ((this.game.cache.checkSoundKey(globalSpeeches.languages[currentLang].id) == false)) {

							this.backButton.setText(acquireSystemText("pleaseWait"));
							this.backButton.inputEnabled = false;

							var newGlobalNarrationToLoad = new Phaser.Loader(game);
							newGlobalNarrationToLoad.audio("globalSpeeches", ["" + globalSpeeches.languages[currentLang].id + ".mp3", "" + globalSpeeches.languages[currentLang].id + ".ogg"]);
							newGlobalNarrationToLoad.onLoadComplete.add(this.goBackToOptions, this, this);
							newGlobalNarrationToLoad.start();
						}
					}
					else
					{
						this.goBackToOptions();
					}
				}
				/* Load in Global narration END */

			}
			/* If the language has been changed, remove the old language narration from the current room and load in the new one END */
			else
			{
				this.goBackToOptions();
			}
				
				

		},

		
		goBackToOptions: function(){
			this.state.start('Options');
		},
		
		
		
		
        update: function() {
            

			
			
			
			
				if ((this.textSizeSpotGroup != null))
				{
					this.textSizeSpotGroup.forEachAlive(function(item)
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