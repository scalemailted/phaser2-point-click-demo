/* Andy Howard Games 2017 */

(function(BasicGame) {
	'use strict';
	
	
	
	
	BasicGame.InitialPreloader = function () {

		

		this.ready = false;
		
		
		

	};



	BasicGame.InitialPreloader.prototype = {

		preload: function () {
			
			this.loadingBackground = this.add.sprite(0, 0, 'loadingBackground');
            this.preloadContainer = this.add.sprite(systemSettings.loadingScreen.uiPreloadContainerX, systemSettings.loadingScreen.uiPreloadContainerY, 'preloadContainer');
            this.preloadFill = this.add.sprite(systemSettings.loadingScreen.uiPreloadFillX, systemSettings.loadingScreen.uiPreloadFillY, 'preloadFill');
			
            this.load.setPreloadSprite(this.preloadFill);
			
		
        
            


		/* Game assets START */
        
        this.load.audio("foleySoundsGameWide", [foleySounds.musicPath + ".mp3", foleySounds.musicPath +".ogg"]);

        /* System START */
        

        this.load.image("loadingAndSavingGamesBackground", systemSettings.loadingAndSavingGames.loadingAndSavingGames);
        this.load.image("loadingAndSavingGamesPlaceholder", systemSettings.loadingAndSavingGames.loadingAndSavingGamesPlaceholder);

        this.load.image("optionsFromWithinGameBackground", systemSettings.optionsFromWithinGame.optionsFromWithinGame);

        this.load.image("volumeBackground", systemSettings.volumes.volumeBackground);
        this.load.image("creditsBackground", systemSettings.credits.creditsBackground);
        this.load.image("volumeSlideBar", systemSettings.volumes.uiVolumeSlideBar);
        this.load.image("volumeSlideSpot", systemSettings.volumes.uiVolumeSlideSpot);
        
        this.load.image("textAndSpeechBackground", systemSettings.textAndSpeech.textAndSpeechBackground);
        this.load.image("uiTextAndSpeechSlideBar", systemSettings.textAndSpeech.uiTextAndSpeechSlideBar);
        this.load.image("uiTextSizeSlideSpot", systemSettings.textAndSpeech.uiTextSizeSlideSpot);

		this.load.image("magnifyingGlass", systemSettings.gameplaySettings.uiIcons.uiMagnifyingGlass);
        this.load.image("inventoryBox", systemSettings.gameplaySettings.uiIcons.uiInventoryBox);
        this.load.image("inventoryPlaceholder", systemSettings.gameplaySettings.uiIcons.uiInventoryPlaceholder);
		this.load.image("walkTo", systemSettings.gameplaySettings.uiIcons.uiWalkTo);
		this.load.image("lookAt", systemSettings.gameplaySettings.uiIcons.uiLookAt);
		this.load.image("pickUp", systemSettings.gameplaySettings.uiIcons.uiPickUp);
		this.load.image("talkTo", systemSettings.gameplaySettings.uiIcons.uiTalkTo);
		this.load.image("open", systemSettings.gameplaySettings.uiIcons.uiOpen);
		this.load.image("close", systemSettings.gameplaySettings.uiIcons.uiClose);
		this.load.image("push", systemSettings.gameplaySettings.uiIcons.uiPush);
		this.load.image("pull", systemSettings.gameplaySettings.uiIcons.uiPull);
		this.load.image("give", systemSettings.gameplaySettings.uiIcons.uiGive);
		this.load.image("use", systemSettings.gameplaySettings.uiIcons.uiUse);
		this.load.image("chest", systemSettings.gameplaySettings.uiIcons.uiChest);
        this.load.image("settingsButton", systemSettings.gameplaySettings.uiIcons.uiSettingsButton);
        this.load.image("currentPlayerIndicator", systemSettings.gameplaySettings.uiIcons.uiCurrentPlayerIndicator);
        this.load.image("tapPointer", systemSettings.gameplaySettings.uiIcons.uiTapPointer);
        this.load.image("compassNavBackground", systemSettings.gameplaySettings.uiIcons.uiCompassNavBackground);
        this.load.image("inventoryUpArrow", systemSettings.gameplaySettings.uiIcons.uiInventoryUpArrow);
        this.load.image("inventoryDownArrow", systemSettings.gameplaySettings.uiIcons.uiInventoryDownArrow);
        this.load.image("confirmationModal", systemSettings.savingScene.confirmationModal.uiConfirmationModal);
        /* System END */

        
        this.load.image('rotate', 'rotate.png');



        
        /* Title card specific assets START */
        this.load.image("titleCardBackground", systemSettings.titleCard.titleCard);

        var x;
        for (x = 0; x < systemSettings.titleCard.loadingImages.length; x++)
        {
            this.load.image("titleCardImage"+systemSettings.titleCard.loadingImages[x].id, systemSettings.titleCard.loadingImages[x].imagePath);
        }

        var x;
        for (x = 0; x < systemSettings.titleCard.loadingAnimations.length; x++)
        {
            if ((this.game.cache.checkImageKey("titleCardAnimation" + systemSettings.titleCard.loadingAnimations[x].id) == false)) {
                this.game.load.atlasJSONHash("titleCardAnimation" + systemSettings.titleCard.loadingAnimations[x].id, systemSettings.titleCard.loadingAnimations[x].filePath + ".png", systemSettings.titleCard.loadingAnimations[x].filePath + ".json");
            }
        }
        /* Title card specific assets END */




        /* Room loading scene specific assets START */
        if ((systemSettings.roomLoadingScene.roomLoadingScene != null))
        {
            this.load.image("roomLoadingSceneBackground", systemSettings.roomLoadingScene.roomLoadingScene);
        }

        var x;
        for (x = 0; x < systemSettings.roomLoadingScene.loadingImages.length; x++)
        {
            this.load.image("roomLoadingSceneImage"+systemSettings.roomLoadingScene.loadingImages[x].id, systemSettings.roomLoadingScene.loadingImages[x].imagePath);
        }

        var x;
        for (x = 0; x < systemSettings.roomLoadingScene.loadingAnimations.length; x++)
        {
            if ((this.game.cache.checkImageKey("roomLoadingSceneAnimation" + systemSettings.roomLoadingScene.loadingAnimations[x].id) == false)) {
                this.game.load.atlasJSONHash("roomLoadingSceneAnimation" + systemSettings.roomLoadingScene.loadingAnimations[x].id, systemSettings.roomLoadingScene.loadingAnimations[x].filePath + ".png", systemSettings.roomLoadingScene.loadingAnimations[x].filePath + ".json");
            }
        }
        /* Room loading scene specific assets END */

        
        
        
        /* Misc START */
		this.load.image('invisibleCloseBox', 'invisibleCloseBox.png');
        this.load.image('companyLogo', systemSettings.credits.companyLogo);
		this.load.spritesheet('tvStatic', 'tvStatic.png', 100, 586);
		/* Misc END */
		
		


        /* Global narration START */
        var currentLang = userSettings.currentLanguage;
        var i;
        for (i = 0; i < localisation.languages.length; i++)
        {
            if ((localisation.languages[i].id == currentLang) && (localisation.languages[i].allowNarrationAudio == true) && (globalSpeeches.languages[currentLang].id != null))
            {
                this.load.audio("globalSpeeches", ["" + globalSpeeches.languages[currentLang].id + ".mp3", "" + globalSpeeches.languages[currentLang].id + ".ogg"]);
            }
        }
        /* Global narration END */

		
		
		var i;
		for (i = 0; i < gameData.playerSettings.playableCharacters.length; i++)
        {

            /* Load in the avatars START */
            this.load.image("player" + gameData.playerSettings.playableCharacters[i].id + "Avatar", "" + gameData.playerSettings.playableCharacters[i].mainAvatarPath);
            this.load.image("player" + gameData.playerSettings.playableCharacters[i].id + "MapAvatar", "" + gameData.playerSettings.playableCharacters[i].mapAvatarPath);
            /* Load in the avatars END */

            /* Now load the animations in START */
			var k;
			for (k = 0; k < gameData.playerSettings.playableCharacters[i].groupAnimations.length; k++)
			{

                var x;
                for (x = 0; x < gameData.playerSettings.playableCharacters[i].groupAnimations[k].animations.length; x++)
                {
                    if ((gameData.playerSettings.playableCharacters[i].groupAnimations[k].animations[x].type > -1))
                    {
                        this.game.load.atlasJSONHash("player" + gameData.playerSettings.playableCharacters[i].id + gameData.playerSettings.playableCharacters[i].groupAnimations[k].id + gameData.playerSettings.playableCharacters[i].groupAnimations[k].animations[x].id, gameData.playerSettings.playableCharacters[i].groupAnimations[k].animations[x].filePath + ".png", gameData.playerSettings.playableCharacters[i].groupAnimations[k].animations[x].filePath + ".json");
                    }
                }

            }
            /* Now load the animations in END */
		}
		
		
		/* Load inventory items from JSON START */
		var i;
        for (i = 0; i < gameData.inventoryBox.length; i++)
        {
				
				/* Not all items are displayed in the scene, so only load the ones that are set START */
                if ((gameData.inventoryBox[i].pickUpOnSceneDetails != null))
				{
                    this.load.image("inventorySceneImage"+gameData.inventoryBox[i].id, "" + gameData.inventoryBox[i].pickUpOnSceneDetails.sceneImagePath+"");
				}
				/* Not all items are displayed in the scene, so only load the ones that are set END */
					
                this.load.image("inventoryDisplayImage"+gameData.inventoryBox[i].id, "" + gameData.inventoryBox[i].displayImagePath + "");
				
		}
        /* Load inventory items from JSON END */
        

        


        
		
        
        


        /* Load inventory items from JSON START */
		var i;
        for (i = 0; i < imageLibrary.length; i++)
        {
            this.load.image("imageLibrary"+imageLibrary[i].id, imageLibrary[i].imagePath);
		}
        /* Load inventory items from JSON END */




		
        /* Maps START */
        var i;
        for (i = 0; i < gameData.maps.length; i++)
        {
            this.load.image("mapImage"+gameData.maps[i].id, gameData.maps[i].imagePath);
        }
		/* Maps END */
		
		
		
		/* Game assets END */



		},

		create: function () {
			
            this.preloadFill.cropEnabled = false;

		},

		update: function () {

			
			
			if ((this.cache.isSoundDecoded("foleySoundsGameWide")) && (this.ready == false))
			{
				this.ready = true;

                // If in room preview mode, go straight there
                if ((previewRoomId != null))
                {
                    loadJSON(function (response) {
                    
                        gameData = JSON.parse(response);
            
                        setMainGameObjects();
            
                        delete gameData.defaultUserSettings; //Remove object name as we don't need to save that to the game slots
            
                        currentRoom = previewRoomId;
                        previousRoom = null;
                        currentPlayableCharacterId = gameData.playerSettings.currentPlayableCharacterId;
                        determineLanguage(userSettings.currentLanguage);
            
                        game.state.start('RoomPreloader');
                    });
                }
                else
                {
                    if ((systemSettings.introMadeBy.enable == true))
                    {
                        this.state.start('IntroMadeByPreloader');
                    }
                    else
                    {
                        this.state.start('TitleCard');
                    }
                }
                
				
			}

		}

	};
})(BasicGame);