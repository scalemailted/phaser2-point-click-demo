/* Andy Howard Games 2022 */

var backgroundMusic;
var game;
var routeFinderGridIncrement;

var foleySoundsNumberId = 0;

var volumeScreenCallback;

var viewCloseUpImage = null;

var cutSceneCallback = null;

var closeUpPuzzleCallback = {
    "puzzleId": null,
    "protocolsToRun": []
};

var viewToDoList = null;

var viewDocument = null;

var currentMapId = null;

var continueProtocol = {
    "convoParams": []
};

var currentLang = null;

var currentRoom = null;

var previousRoom = null;

var currentPlayableCharacterId = null;

var gameSnapshot = null;

var endScreenMusicRef = null;

var endScreenBackgroundRef = null;

var optionsMusicRef = null;

var optionsBackgroundRef = null;

var previousGamesExist = false;

var intervalEventIdsToFinishRunning = [];

var roomEntranceTargetZoneId = null;

var gameDataLocalStorageName = null;

var textBlocksGroup = null;

var screenshotsPlaceholderGroup = null;
var screenshotsImageGroup = null;
var screenshotsTextGroup = null;

var previewRoomId = null;

var previousScreenType = 0; // 0=startup, 1=options, 2=room, 3=cutscene

if ((getURLValues('previewRoomId') != null))
{
    previewRoomId = parseInt(getURLValues('previewRoomId'));
}


/* Let's get the correct settings based on whether its a new game or an existing one START */


function getURLValues(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    }
    else {
        return results[1] || 0;
    }
}








function removeOptionsScreenAssets(){

    this.game.world.removeAll();
    this.game.sound.stopAll();

    if ((optionsMusicRef != null))
    {
        optionsMusicRef.stop();
        optionsMusicRef.destroy();
        this.game.sound.remove(optionsMusicRef);
        optionsMusicRef = null;
        this.game.cache.removeSound("backgroundMusic"+systemSettings.options.musicId);
        this.game.sound.removeByKey("backgroundMusic"+systemSettings.options.musicId);
    }

    if ((optionsBackgroundRef != null))
    {
        optionsBackgroundRef.destroy();
        this.game.cache.removeImage("optionsBackground", true);
    }


    var x;
    for (x = 0; x < systemSettings.options.loadingImages.length; x++)
    {
        this.game.cache.removeImage("optionsImage"+systemSettings.options.loadingImages[x].id, true);
    }

    var x;
    for (x = 0; x < systemSettings.options.loadingAnimations.length; x++)
    {
        this.game.cache.removeImage("optionsAnimation" + systemSettings.options.loadingAnimations[x].id, true);
        this.game.cache.removeJSON("optionsAnimation" + systemSettings.options.loadingAnimations[x].id);
    }

    
}




function renderGameSlots(mode){

// Mode 0 = Loading screen from start
// Mode 1 = Saving screen
// Mode 2 = Loading screen from within another game


var db = new Dexie(gameDataLocalStorageName);
						db.version(1).stores({
							myData: "gameData"
						});
						db.myData.toArray().then( (results) => {

                            screenshotsPlaceholderGroup = this.game.add.group();
                            screenshotsImageGroup = this.game.add.group();
                            screenshotsTextGroup = this.game.add.group();
							
                            var arrayOfGames = results[0];
                            
                            if ((mode == 1))
                            {
                                var nextAvailableSlotAtIndex = 0;
                            }


							var i;
							for (i = 0; i < systemSettings.loadingAndSavingGames.placeholders.length; i++)
							{
								this['placeholder'+systemSettings.loadingAndSavingGames.placeholders[i].id] = this.game.add.sprite(0, 0, 'loadingAndSavingGamesPlaceholder');
                                screenshotsPlaceholderGroup.add(this['placeholder'+systemSettings.loadingAndSavingGames.placeholders[i].id]);
								this['placeholder'+systemSettings.loadingAndSavingGames.placeholders[i].id].anchor.x = systemSettings.loadingAndSavingGames.loadingAndSavingGamesPlaceholderAnchorPointX;
								this['placeholder'+systemSettings.loadingAndSavingGames.placeholders[i].id].anchor.y = systemSettings.loadingAndSavingGames.loadingAndSavingGamesPlaceholderAnchorPointY;
								this['placeholder'+systemSettings.loadingAndSavingGames.placeholders[i].id].x = systemSettings.loadingAndSavingGames.placeholders[i].x;
								this['placeholder'+systemSettings.loadingAndSavingGames.placeholders[i].id].y = systemSettings.loadingAndSavingGames.placeholders[i].y;
							
							
							
								if ((arrayOfGames[i] != null))
								{

                                    if ((mode == 1))
                                    {
                                        nextAvailableSlotAtIndex = i+1;
                                    }

									this["loader"+systemSettings.loadingAndSavingGames.placeholders[i].id] = new Phaser.Loader(game);
									this["loader"+systemSettings.loadingAndSavingGames.placeholders[i].id].image("screenshotLoadedImage"+systemSettings.loadingAndSavingGames.placeholders[i].id, arrayOfGames[i].screenshot);
									
									this["loader"+systemSettings.loadingAndSavingGames.placeholders[i].id].onLoadComplete.add(applyGameSlotImagesAndText, this, this, systemSettings.loadingAndSavingGames.placeholders[i], arrayOfGames[i], i, mode);
									this["loader"+systemSettings.loadingAndSavingGames.placeholders[i].id].start();
                                }
                                

                                if ((mode == 1))
                                {
                                    if ((i == nextAvailableSlotAtIndex))
                                    {
                                        this['textStaticGameSave'] = this.game.add.text(20, 200, acquireSystemText("saveCurrentGameToThisSlot"), { font: ""+systemSettings.savingScene.saveToSlotText.languages[currentLang].fontSize+"px "+acquireFontName(systemSettings.savingScene.saveToSlotText.languages[currentLang].fontId)+"", fill: systemSettings.savingScene.saveToSlotText.textColor });
                                        screenshotsTextGroup.add(this['textStaticGameSave']);
                                        this['textStaticGameSave'].slotIndex = i;
                                        this['textStaticGameSave'].anchor.x = systemSettings.loadingAndSavingGames.loadingAndSavingGamesPlaceholderAnchorPointX;
                                        this['textStaticGameSave'].anchor.y = systemSettings.loadingAndSavingGames.loadingAndSavingGamesPlaceholderAnchorPointY;
                                        this['textStaticGameSave'].x = systemSettings.loadingAndSavingGames.placeholders[i].x;
                                        this['textStaticGameSave'].y = systemSettings.loadingAndSavingGames.placeholders[i].y;
                                        this['textStaticGameSave'].wordWrap = true;
                                        this['textStaticGameSave'].align = 'center';
                                        this['textStaticGameSave'].lineSpacing = systemSettings.savingScene.saveToSlotText.languages[currentLang].lineSpacing;
                                        this['textStaticGameSave'].wordWrapWidth = systemSettings.savingScene.saveToSlotText.width;

                                        if ((systemSettings.savingScene.saveToSlotText.stroke.show == true))
                                        {
                                            this['textStaticGameSave'].stroke = systemSettings.savingScene.saveToSlotText.stroke.color;
                                            this['textStaticGameSave'].strokeThickness = systemSettings.savingScene.saveToSlotText.stroke.thickness;
                                        }

                                        if ((systemSettings.savingScene.saveToSlotText.shadow.show == true))
                                        {
                                            this['textStaticGameSave'].setShadow(systemSettings.savingScene.saveToSlotText.shadow.x, systemSettings.savingScene.saveToSlotText.shadow.y, systemSettings.savingScene.saveToSlotText.shadow.color, systemSettings.savingScene.saveToSlotText.shadow.blur);
                                        }

                                        this['textStaticGameSave'].inputEnabled = true;
                                        this['textStaticGameSave'].events.onInputDown.add(saveToGameSlotIndex, this);
                                    }
                                }
                                
								
							
							}


							
							

							
						});

}


function applyGameSlotImagesAndText(placeholderObj, arrayOfGamesObj, index, mode){

    this["screenshotDisplayImage"+placeholderObj.id] = game.add.sprite(200, 200, "screenshotLoadedImage"+placeholderObj.id);
    screenshotsImageGroup.add(this["screenshotDisplayImage"+placeholderObj.id]);
    this["screenshotDisplayImage"+placeholderObj.id].width = systemSettings.loadingAndSavingGames.screenshotWidth;
    this["screenshotDisplayImage"+placeholderObj.id].height = systemSettings.loadingAndSavingGames.screenshotHeight;

    this["screenshotDisplayImage"+placeholderObj.id].anchor.x = systemSettings.loadingAndSavingGames.loadingAndSavingGamesPlaceholderAnchorPointX;
    this["screenshotDisplayImage"+placeholderObj.id].anchor.y = systemSettings.loadingAndSavingGames.loadingAndSavingGamesPlaceholderAnchorPointY;
    this["screenshotDisplayImage"+placeholderObj.id].x = placeholderObj.x;
    this["screenshotDisplayImage"+placeholderObj.id].y = placeholderObj.y;
    


    if ((index == 0))
    {
        this['text'+placeholderObj.id] = this.game.add.text(20, 200, acquireSystemText("autosave") + "\r" + moment(arrayOfGamesObj.lastSaved).format('YYYY-MM-DD HH:mm:ss'), { font: ""+systemSettings.loadingAndSavingGames.screenshotText.languages[currentLang].fontSize+"px "+acquireFontName(systemSettings.loadingAndSavingGames.screenshotText.languages[currentLang].fontId)+"", fill: systemSettings.loadingAndSavingGames.screenshotText.textColor });
    }
    else
    {
        this['text'+placeholderObj.id] = this.game.add.text(20, 200, moment(arrayOfGamesObj.lastSaved).format('YYYY-MM-DD HH:mm:ss'), { font: ""+systemSettings.loadingAndSavingGames.screenshotText.languages[currentLang].fontSize+"px "+acquireFontName(systemSettings.loadingAndSavingGames.screenshotText.languages[currentLang].fontId)+"", fill: systemSettings.loadingAndSavingGames.screenshotText.textColor });
    }

    screenshotsTextGroup.add(this['text'+placeholderObj.id]);
    
    this['text'+placeholderObj.id].gameData = arrayOfGamesObj.gameData;
    
                            
    
    this['text'+placeholderObj.id].anchor.x = systemSettings.loadingAndSavingGames.loadingAndSavingGamesPlaceholderAnchorPointX;
    this['text'+placeholderObj.id].anchor.y = systemSettings.loadingAndSavingGames.loadingAndSavingGamesPlaceholderAnchorPointY;
    this['text'+placeholderObj.id].x = placeholderObj.x;
    this['text'+placeholderObj.id].y = placeholderObj.y;
    this['text'+placeholderObj.id].wordWrap = true;
    this['text'+placeholderObj.id].align = 'center';
    this['text'+placeholderObj.id].lineSpacing = systemSettings.loadingAndSavingGames.screenshotText.languages[currentLang].lineSpacing;
    
    if ((systemSettings.loadingAndSavingGames.screenshotText.stroke.show == true))
    {
        this['text'+placeholderObj.id].stroke = systemSettings.loadingAndSavingGames.screenshotText.stroke.color;
        this['text'+placeholderObj.id].strokeThickness = systemSettings.loadingAndSavingGames.screenshotText.stroke.thickness;
    }

    if ((systemSettings.loadingAndSavingGames.screenshotText.shadow.show == true))
    {
        this['text'+placeholderObj.id].setShadow(systemSettings.loadingAndSavingGames.screenshotText.shadow.x, systemSettings.loadingAndSavingGames.screenshotText.shadow.y, systemSettings.loadingAndSavingGames.screenshotText.shadow.color, systemSettings.loadingAndSavingGames.screenshotText.shadow.blur);
    }

    this['text'+placeholderObj.id].wordWrapWidth = systemSettings.loadingAndSavingGames.screenshotWidth - 20;
    this['text'+placeholderObj.id].inputEnabled = true;
    this['text'+placeholderObj.id].index = index;
    this['text'+placeholderObj.id].mode = mode;
    

    if ((mode == 0))
    {
        this['text'+placeholderObj.id].events.onInputDown.add(loadGameSlot, this);
    }
    // If already within a game, we don't want to allow saving to the auto-save as we would already be playing it
    if ((mode == 1) && (index > 0))
    {
        this['text'+placeholderObj.id].events.onInputDown.add(showOverwriteModal, this);
    }
    // If already within a game, we don't want to allow loading the auto-save as we would already be playing it
    if ((mode == 2) && (index > 0))
    {
        this['text'+placeholderObj.id].events.onInputDown.add(loadGameSlot, this);
    }
    

}

function loadGameSlot(obj){

    if ((obj.mode == 0))
    {
        removeOptionsScreenAssets();
    }
    

    if ((systemSettings.loadingAndSavingGames.screenshotFoleySoundIdOnTap != null))
    {
        findAndPlayFoleySound(systemSettings.loadingAndSavingGames.screenshotFoleySoundIdOnTap);
    }

    gameData = obj.gameData;

    previousRoom = currentRoom;
    currentRoom = gameData.playerSettings.currentRoomId;
    
    currentPlayableCharacterId = gameData.playerSettings.currentPlayableCharacterId;
    determineLanguage(userSettings.currentLanguage);

    screenshotsTextGroup.destroy();
    screenshotsTextGroup = null;

    game.state.start('RoomPreloader');
}


function showOverwriteModal(obj){

    /* Disable clicking of other text blocks now START */
    screenshotsTextGroup.forEachAlive(function (element) {
        element.inputEnabled = false;
    }, this);
    /* Disable clicking of other text blocks now END */

    if ((systemSettings.loadingAndSavingGames.screenshotFoleySoundIdOnTap != null))
    {
        findAndPlayFoleySound(systemSettings.loadingAndSavingGames.screenshotFoleySoundIdOnTap);
    }

    


    /* Make the modal elements START */
    this.modalElementsGroup = this.game.add.group();
					
    this.confirmationModalBackground = this.game.add.sprite(systemSettings.savingScene.confirmationModal.uiConfirmationModalX, systemSettings.savingScene.confirmationModal.uiConfirmationModalY, 'confirmationModal');
    this.modalElementsGroup.add(this.confirmationModalBackground);
    
    this.confirmationText = this.game.add.text(16, systemSettings.savingScene.confirmationModal.titleText.y, acquireSystemText("confirmOverwriteGameSlot"), { font: ""+systemSettings.savingScene.confirmationModal.titleText.languages[currentLang].fontSize+"px "+acquireFontName(systemSettings.savingScene.confirmationModal.titleText.languages[currentLang].fontId)+"", fill: systemSettings.savingScene.confirmationModal.titleText.textColor });
    this.confirmationText.wordWrap = true;
    this.confirmationText.align = 'center';
    this.confirmationText.wordWrapWidth = systemSettings.savingScene.confirmationModal.titleText.width;
    this.confirmationText.lineSpacing = systemSettings.savingScene.confirmationModal.titleText.languages[currentLang].lineSpacing;
    
    if ((systemSettings.savingScene.confirmationModal.titleText.stroke.show == true))
	{
		this.confirmationText.stroke = systemSettings.savingScene.confirmationModal.titleText.stroke.color;
		this.confirmationText.strokeThickness = systemSettings.savingScene.confirmationModal.titleText.stroke.thickness;
    }
    
    if ((systemSettings.savingScene.confirmationModal.titleText.shadow.show == true))
	{
		this.confirmationText.setShadow(systemSettings.savingScene.confirmationModal.titleText.shadow.x, systemSettings.savingScene.confirmationModal.titleText.shadow.y, systemSettings.savingScene.confirmationModal.titleText.shadow.color, systemSettings.savingScene.confirmationModal.titleText.shadow.blur);
	}

    this.confirmationText.anchor.x = Math.round(this.confirmationText.width * 0.5) / this.confirmationText.width;
    this.confirmationText.x = this.game.width/2;
    this.modalElementsGroup.add(this.confirmationText);
    
    
    
    this.yesText = this.game.add.text(systemSettings.savingScene.confirmationModal.yesText.x, systemSettings.savingScene.confirmationModal.yesText.y, acquireSystemText("yes"), { font: ""+systemSettings.savingScene.confirmationModal.yesText.languages[currentLang].fontSize+"px "+acquireFontName(systemSettings.savingScene.confirmationModal.yesText.languages[currentLang].fontId)+"", fill: systemSettings.savingScene.confirmationModal.yesText.textColor });
    this.yesText.lineSpacing = systemSettings.savingScene.confirmationModal.yesText.languages[currentLang].lineSpacing;
    
    if ((systemSettings.savingScene.confirmationModal.yesText.stroke.show == true))
	{
		this.yesText.stroke = systemSettings.savingScene.confirmationModal.yesText.stroke.color;
		this.yesText.strokeThickness = systemSettings.savingScene.confirmationModal.yesText.stroke.thickness;
    }
    
    if ((systemSettings.savingScene.confirmationModal.yesText.shadow.show == true))
	{
		this.yesText.setShadow(systemSettings.savingScene.confirmationModal.yesText.shadow.x, systemSettings.savingScene.confirmationModal.yesText.shadow.y, systemSettings.savingScene.confirmationModal.yesText.shadow.color, systemSettings.savingScene.confirmationModal.yesText.shadow.blur);
	}

    this.yesText.inputEnabled = true;
    this.yesText.slotIndex = obj.index;
    this.yesText.events.onInputDown.add(saveToGameSlotIndex, this);
    this.modalElementsGroup.add(this.yesText);
    
    
    this.noText = this.game.add.text(systemSettings.savingScene.confirmationModal.noText.x, systemSettings.savingScene.confirmationModal.noText.y, acquireSystemText("no"), { font: ""+systemSettings.savingScene.confirmationModal.noText.languages[currentLang].fontSize+"px "+acquireFontName(systemSettings.savingScene.confirmationModal.noText.languages[currentLang].fontId)+"", fill: systemSettings.savingScene.confirmationModal.noText.textColor });
    this.noText.lineSpacing = systemSettings.savingScene.confirmationModal.noText.languages[currentLang].lineSpacing;
    
    if ((systemSettings.savingScene.confirmationModal.noText.stroke.show == true))
	{
		this.noText.stroke = systemSettings.savingScene.confirmationModal.noText.stroke.color;
		this.noText.strokeThickness = systemSettings.savingScene.confirmationModal.noText.stroke.thickness;
    }
    
    if ((systemSettings.savingScene.confirmationModal.noText.shadow.show == true))
	{
		this.noText.setShadow(systemSettings.savingScene.confirmationModal.noText.shadow.x, systemSettings.savingScene.confirmationModal.noText.shadow.y, systemSettings.savingScene.confirmationModal.noText.shadow.color, systemSettings.savingScene.confirmationModal.noText.shadow.blur);
	}

    this.noText.inputEnabled = true;
    this.noText.events.onInputDown.add(closeModal, this);
    this.modalElementsGroup.add(this.noText);
    /* Make the modal elements END */
}

function closeModal(){

    this.modalElementsGroup.destroy();

    /* Disable clicking of other text blocks now START */
    screenshotsTextGroup.forEachAlive(function (element) {
        element.inputEnabled = true;
    }, this);
    /* Disable clicking of other text blocks now END */

}

function saveToGameSlotIndex(obj){

    //Prevent the 'save to new slot button' from being pushed again
    this['textStaticGameSave'].inputEnabled = false;

    //Prevent the confirmation 'yes' button from being pushed again
    if ((this.yesText != null))
    {
        this.yesText.inputEnabled = false;
    }
    //Also prevent the no text from being pushed so that they can't quickly go back to the other screens after just hitting the 'yes' text
    if ((this.noText != null))
    {
        this.noText.inputEnabled = false;
    }

    /* Disable clicking of other text blocks now START */
    screenshotsTextGroup.forEachAlive(function (element) {
        element.inputEnabled = false;
    }, this);
    /* Disable clicking of other text blocks now END */
    

    if ((systemSettings.loadingAndSavingGames.screenshotFoleySoundIdOnTap != null))
    {
        findAndPlayFoleySound(systemSettings.loadingAndSavingGames.screenshotFoleySoundIdOnTap);
    }

    var db = new Dexie(gameDataLocalStorageName);
    db.version(1).stores({
        myData: "gameData"
    });
    db.myData.toArray().then(function (results) {
        
        var currentGameDataArray = results[0];

        currentGameDataArray.splice(obj.slotIndex,1,gameSnapshot);

        var db2 = new Dexie(gameDataLocalStorageName);
        db2.version(1).stores({
            myData: ""
        });
        db2.myData.put(currentGameDataArray, 'gameData');
        game.state.start('Room');
    });
}

function renderTextBlocks(arr){

    textBlocksGroup = this.game.add.group();

    var i;
    for (i = 0; i < arr.length; i++)
    {

        /* If link is trying to go to the load screen (from start up) option */
        if ((arr[i].linkToScene == 3))
        {
            if ((previousGamesExist == true))
            {
                populateTextBlocksUnit(arr[i], true);
            }
            else
            {
                populateTextBlocksUnit(arr[i], false);
            }
        }
        else
        {
            populateTextBlocksUnit(arr[i], true);
        }

    }

    
}

function populateTextBlocksUnit(obj, enableLoadGameLink){

    console.log(obj);

    this['text'+obj.id] = this.game.add.text(obj.x, obj.y, acquireSystemTextById(obj.systemTextId), { font: ""+obj.languages[currentLang].fontSize+"px "+acquireFontName(obj.languages[currentLang].fontId)+"", fill: ""+obj.textColor+"" });
    this['text'+obj.id].id = obj.id;

    if ((enableLoadGameLink == false))
    {
        this['text'+obj.id].alpha = 0.5;
    }

    if ((obj.stroke.show == true))
    {
        this['text'+obj.id].stroke = obj.stroke.color;
        this['text'+obj.id].strokeThickness = obj.stroke.thickness;
    }

    if ((obj.shadow.show == true))
    {
        this['text'+obj.id].setShadow(obj.shadow.x, obj.shadow.y, obj.shadow.color, obj.shadow.blur);
    }
    
    this['text'+obj.id].wordWrap = true;
    this['text'+obj.id].wordWrapWidth = obj.width;
    this['text'+obj.id].lineSpacing = obj.languages[currentLang].lineSpacing;

    if ((obj.align == 0))
    {
        this['text'+obj.id].align = 'left';
    }
    if ((obj.align == 1))
    {
        this['text'+obj.id].align = 'center';
    }
    if ((obj.align == 2))
    {
        this['text'+obj.id].align = 'right';
    }


    if ((obj.centerToStage == true))
    {
        this['text'+obj.id].anchor.setTo(0.5, 0.5);
        this['text'+obj.id].anchor.x = Math.round(this['text'+obj.id].width * 0.5) / this['text'+obj.id].width;
        this['text'+obj.id].x = this.game.width / 2;
    }

    if ((obj.linkToScene != null))
    {
        this['text'+obj.id].inputEnabled = true;
        this['text'+obj.id].impactType = obj.impactType;
        this['text'+obj.id].linkToScene = obj.linkToScene;
        this['text'+obj.id].foleySoundIdOnTap = obj.foleySoundIdOnTap;

        if ((enableLoadGameLink == true))
        {
            this['text'+obj.id].events.onInputDown.add(activateTextBlockLink, this);
        }
    }

    textBlocksGroup.add(this['text'+obj.id]);

}

function activateTextBlockLink(obj){

    /* Disable clicking of other text blocks now START */
    textBlocksGroup.forEachAlive(function (element) {
        element.inputEnabled = false;
    }, this);
    /* Disable clicking of other text blocks now END */

    var textId = obj.id;

    console.log(textId);

    this['text'+textId].inputEnabled = false;

    if ((this['text'+textId].foleySoundIdOnTap != null))
    {
        findAndPlayFoleySound(this['text'+textId].foleySoundIdOnTap);
    }

    if ((this['text'+textId].impactType == 0))
    {
        var tweenIn = this.game.add.tween(this['text'+textId].scale).to({x: 0.9,y: 0.9}, 300, Phaser.Easing.Exponential.Out).start();
        var tweenOut = this.game.add.tween(this['text'+textId].scale).to({x: 1,y: 1}, 300, Phaser.Easing.Exponential.Out);
    
        tweenIn.onComplete.add(function() {
            tweenOut.start();
        }, this);
        
        tweenOut.onComplete.add(function() {
            goToTextBlockLinkState(this['text'+textId].linkToScene);
        }, this);
    }
    else
    {
        goToTextBlockLinkState(this['text'+textId].linkToScene);
    }

}

function goToTextBlockLinkState(linkId){


    if ((linkId == 0))
    {
        game.state.start("Credits");
    }

    if ((linkId == 1))
    {
        game.state.start("OptionsPreloader");
    }

    if ((linkId == 2))
    {

        removeOptionsScreenAssets();

        loadJSON(function (response) {
            
            gameData = JSON.parse(response);

            setMainGameObjects();

            delete gameData.defaultUserSettings; //Remove object name as we don't need to save that to the game slots

            currentRoom = gameData.playerSettings.currentRoomId;
            previousRoom = null;
            currentPlayableCharacterId = gameData.playerSettings.currentPlayableCharacterId;
            determineLanguage(userSettings.currentLanguage);

            //Brand new game, find out if we need to play a cut scene or go straight to the gameplay
            if ((systemSettings.startingScreen.type == 0))
            {
                var i;
                for (i = 0; i < cutScenes.length; i++)
                {
                    if ((cutScenes[i].id == systemSettings.startingScreen.cutSceneId))
                    {
                        cutSceneCallback = cutScenes[i].id;
                        game.state.start("CutScenePreloader");
                    }
                }
            }
            /* If we need to go to normal gameplay */
            if ((systemSettings.startingScreen.type == 1))
            {
                game.state.start('RoomPreloader');
            }
        });

    }

    if ((linkId == 3))
    {
        game.state.start('LoadGameSlot');
    }

    if ((linkId == 4))
    {
        game.state.start('LoadGameSlotWithinGame');
    }

    if ((linkId == 5))
    {
        game.state.start('TitleCard');

        /* Remove cache for the end screen START */
        if ((endScreenMusicRef != null))
        {
            endScreenMusicRef.stop();
            endScreenMusicRef.destroy();
            this.game.sound.remove(endScreenMusicRef);
            endScreenMusicRef = null;
            this.game.cache.removeSound("backgroundMusic"+systemSettings.endingScreen.musicId);
            this.game.sound.removeByKey("backgroundMusic"+systemSettings.endingScreen.musicId);
        }
		
        if ((endScreenBackgroundRef != null))
        {
            endScreenBackgroundRef.destroy();
            this.game.cache.removeImage("endScreenBackground", true);
        }
		/* Remove cache for the end screen END */
    }

    if ((linkId == 6))
    {
        game.state.start('SaveToGameSlot');
    }

    if ((linkId == 7))
    {
        game.state.start('Instructions');
    }

    if ((linkId == 8))
    {
        game.state.start('TextAndSpeechWithinGame');
    }

    if ((linkId == 9))
    {
        game.state.start('VolumeWithinGame');
    }

    if ((linkId == 10))
    {
        game.state.start('SaveOrLoadGameSlot');
    }

    if ((linkId == 11))
    {
        game.state.start('InstructionsWithinGame');
    }

    if ((linkId == 12))
    {
        game.state.start('TextAndSpeech');
    }

    if ((linkId == 13))
    {
        game.state.start('Volume');
    }

}


function getEasingMode(id){
    var result;

    if ((id == 0))
    {
        result = Phaser.Easing.none;
    }

    if ((id == 1))
    {
        result = Phaser.Easing.Back.In;
    }

    if ((id == 2))
    {
        result = Phaser.Easing.Back.Out;
    }

    if ((id == 3))
    {
        result = Phaser.Easing.Back.InOut;
    }

    if ((id == 4))
    {
        result = Phaser.Easing.Bounce.In;
    }

    if ((id == 5))
    {
        result = Phaser.Easing.Bounce.Out;
    }

    if ((id == 6))
    {
        result = Phaser.Easing.Bounce.InOut;
    }

    if ((id == 7))
    {
        result = Phaser.Easing.Circular.In;
    }

    if ((id == 8))
    {
        result = Phaser.Easing.Circular.Out;
    }

    if ((id == 9))
    {
        result = Phaser.Easing.Circular.InOut;
    }

    if ((id == 10))
    {
        result = Phaser.Easing.Cubic.In;
    }

    if ((id == 11))
    {
        result = Phaser.Easing.Cubic.Out;
    }

    if ((id == 12))
    {
        result = Phaser.Easing.Cubic.InOut;
    }

    if ((id == 13))
    {
        result = Phaser.Easing.Elastic.In;
    }

    if ((id == 14))
    {
        result = Phaser.Easing.Elastic.Out;
    }

    if ((id == 15))
    {
        result = Phaser.Easing.Elastic.InOut;
    }

    if ((id == 16))
    {
        result = Phaser.Easing.Exponential.In;
    }

    if ((id == 17))
    {
        result = Phaser.Easing.Exponential.Out;
    }

    if ((id == 18))
    {
        result = Phaser.Easing.Exponential.InOut;
    }

    if ((id == 19))
    {
        result = Phaser.Easing.Linear;
    }

    if ((id == 20))
    {
        result = Phaser.Easing.Quadratic.In;
    }

    if ((id == 21))
    {
        result = Phaser.Easing.Quadratic.Out;
    }

    if ((id == 22))
    {
        result = Phaser.Easing.Quadratic.InOut;
    }

    if ((id == 23))
    {
        result = Phaser.Easing.Quartic.In;
    }

    if ((id == 24))
    {
        result = Phaser.Easing.Quartic.Out;
    }

    if ((id == 25))
    {
        result = Phaser.Easing.Quartic.InOut;
    }

    if ((id == 26))
    {
        result = Phaser.Easing.Quintic.In;
    }

    if ((id == 27))
    {
        result = Phaser.Easing.Quintic.Out;
    }

    if ((id == 28))
    {
        result = Phaser.Easing.Quintic.InOut;
    }

    if ((id == 29))
    {
        result = Phaser.Easing.Sinusoidal.In;
    }

    if ((id == 30))
    {
        result = Phaser.Easing.Sinusoidal.Out;
    }

    if ((id == 31))
    {
        result = Phaser.Easing.Sinusoidal.InOut;
    }

    return result;
}


function playBackAndSkipLinksSound()
{
    var foleySoundsTap = this.game.add.audio("foleySoundsGameWide");
    foleySoundsTap.allowMultiple = true;

    var i;
            for (i = 0; i < foleySounds.items.length; i++) {
                if ((foleySounds.items[i].id == systemSettings.gameplaySettings.uiSounds.backAndSkipLinks)) {
                    foleySoundsTap.addMarker("backAndSkipLinksSound", foleySounds.items[i].start, foleySounds.items[i].duration, userSettings.volumes.sfxVolume, false);
                    foleySoundsTap.play("backAndSkipLinksSound");
                }
            }
}

function findAndPlayFoleySound(id)
{
    var foleySound = this.game.add.audio("foleySoundsGameWide");
    foleySound.allowMultiple = true;

    var i;
            for (i = 0; i < foleySounds.items.length; i++) {
                if ((foleySounds.items[i].id == id)) {
                    foleySound.addMarker("foleySound", foleySounds.items[i].start, foleySounds.items[i].duration, userSettings.volumes.sfxVolume, false);
                    foleySound.play("foleySound");
                }
            }
}


function acquireFontName(fontId)
{
    var result = "Arial";

    var i;
    for (i = 0; i < fonts.length; i++) {
        if ((fonts[i].id == fontId)) {
            result = fonts[i].refName;
        }
    }

    return result;
}


function acquireSystemText(requestKey)
{
    var result;

    var i;
    for (i = 0; i < systemText.length; i++) {
        if ((systemText[i].key == requestKey)) {
            result = systemText[i].languages[currentLang].value;
        }
    }

    return result;
}


function acquireSystemTextById(id)
{
    var result;

    var i;
    for (i = 0; i < systemText.length; i++) {
        if ((systemText[i].id == id)) {
            result = systemText[i].languages[currentLang].value;
        }
    }

    return result;
}


function acquireMusicPath(id)
{
    var result;

    var i;
    for (i = 0; i < music.length; i++) {
        if ((music[i].id == id)) {
            result = music[i].musicPath;
        }
    }

    return result;
}


function unloadRoomAssets(removeBackgroundMusic){

	console.log(this.game);
    console.log(this.charactersAndZonesGroup);

            if ((removeBackgroundMusic == true))
            {
                var i;
                for (i = 0; i < gameData.rooms.length; i++) {
                    if ((gameData.rooms[i].id == previousRoom)) {
                        backgroundMusic.stop();
                        backgroundMusic.destroy();
                        this.game.sound.remove(backgroundMusic);
                        backgroundMusic = null;
                        this.game.cache.removeSound("backgroundMusic"+gameData.rooms[i].music.musicId);
                        this.game.sound.removeByKey("backgroundMusic"+gameData.rooms[i].music.musicId);
                    }
                }
            }
        
            console.log("b");
        
        
            if ((this.background != null))
            {
                this.background.kill();
                this.background.destroy();
                this.background = null;
            }
        
            console.log("c");
            
            
        
            console.log("d");
        
            var i;
            for (i = 0; i < gameData.rooms.length; i++)
            {
                if ((gameData.rooms[i].id == previousRoom))
                {
        
                    console.log(previousRoom);
        
                    this.game.cache.removeImage("backgroundImage"+gameData.rooms[i].id, true);
        

                    if ((this.foregroundGroup != null))
                    {
                        this.foregroundGroup.forEach(function(item){
                                item.kill();
                                item.destroy();
                                item = null;
                        }, this);
                    }

                    var k;
                    for (k = 0; k < gameData.rooms[i].foreground.length; k++)
                    {
                        if ((gameData.rooms[i].foreground[k].includeAnimation == false))
                        {
                            this.game.cache.removeImage("foregroundImage"+gameData.rooms[i].foreground[k].id, true);
                        }

                        if ((gameData.rooms[i].foreground[k].includeAnimation == true))
                        {
                            this.game.cache.removeImage("foregroundAnimation" + gameData.rooms[i].foreground[k].id, true);
                            this.game.cache.removeJSON("foregroundAnimation" + gameData.rooms[i].foreground[k].id);
                        }
                    }
                    
                    
                    console.log("f");
                    
                    /* Remove all target zones START */
                    if ((this.charactersAndZonesGroup != null))
                    {
                        this.charactersAndZonesGroup.forEach(function(item){
                            if ((item.type == "targetZone"))
                            {
                                item.kill();
                                item.destroy();
                                item = null;
                            }
                        }, this);
                    }
        
                    console.log("g");
                    
                    var k;
                    for (k = 0; k < gameData.rooms[i].targetZones.length; k++)
                    {

                        if ((gameData.rooms[i].targetZones[k].type == 0))
                        {
                            var x;
                            for (x = 0; x < gameData.rooms[i].targetZones[k].graphicalOptions.animations.length; x++) {
                                if ((gameData.rooms[i].targetZones[k].graphicalOptions.animations[x].type > -1))
                                {
                                    this.game.cache.removeImage("targetZone" + gameData.rooms[i].targetZones[k].id + gameData.rooms[i].targetZones[k].graphicalOptions.animations[x].id, true);
                                    this.game.cache.removeJSON("targetZone" + gameData.rooms[i].targetZones[k].id + gameData.rooms[i].targetZones[k].graphicalOptions.animations[x].id);
                                }
                                
                            }
                        }
                        
                    }
                    /* Remove all target zones END */
        
                    console.log("h");
        
                    /* Remove all npcs START */
                    if ((this.charactersAndZonesGroup != null)) {
                        this.charactersAndZonesGroup.forEach(function (item) {
                            if ((item.type == "npc")) {
                                item.kill();
                                item.destroy();
                                item = null;
                            }
                        }, this);
                    }
        
                    console.log("i");
        
                    var k;
                    for (k = 0; k < gameData.rooms[i].npc.length; k++) {
                        var x;
                        for (x = 0; x < gameData.rooms[i].npc[k].animations.length; x++) {
                            if ((gameData.rooms[i].npc[k].animations[x].type > -1))
                            {
                                this.game.cache.removeImage("npc" + gameData.rooms[i].npc[k].id + gameData.rooms[i].npc[k].animations[x].id, true);
                                this.game.cache.removeJSON("npc" + gameData.rooms[i].npc[k].id + gameData.rooms[i].npc[k].animations[x].id);
                            }
                            
                        }
                    }
                    /* Remove all npcs END */
        
                    console.log("j");
                    
                }
            }
}




/* Get system code START */
function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'gameData.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}
/* Get system code END */

/* */
function determineLanguage(langInJsonFile) {
    
    currentLang = langInJsonFile;

	/*if ((getURLValues('overrideLang') != null))
	{
		currentLang = (getURLValues('overrideLang'));
	}
	else
	{
		currentLang = langInJsonFile;
	}*/
}
/* */




function getTargetZonePlayerInteractionCoords(roomId, targetZoneId){

    var result = {
        "x": null,
        "y": null
    };

    var q;
    for (q = 0; q < gameData.rooms.length; q++) {
        if ((gameData.rooms[q].id == roomId)) {
            var k;
            for (k = 0; k < gameData.rooms[q].targetZones.length; k++) {
                if ((gameData.rooms[q].targetZones[k].id == targetZoneId)) {

                    result.x = gameData.rooms[q].targetZones[k].playerInteractPosition.x;
                    result.y = gameData.rooms[q].targetZones[k].playerInteractPosition.y;
                    
                }
            }
        }
    }

    return result;
}



function setMainGameObjects()
{
    systemSettings = gameData.systemSettings;
    delete gameData.systemSettings; //Remove object name as we don't need to save that to the game slots

    systemText = gameData.systemText;
    delete gameData.systemText; //Remove object name as we don't need to save that to the game slots

    fonts = gameData.fonts;
    delete gameData.fonts; //Remove object name as we don't need to save that to the game slots

    localisation = gameData.localisation;
    delete gameData.localisation; //Remove object name as we don't need to save that to the game slots

    closeUpImages = gameData.closeUpImages;
    delete gameData.closeUpImages; //Remove object name as we don't need to save that to the game slots

    closeUpPuzzles = gameData.closeUpPuzzles;
    delete gameData.closeUpPuzzles; //Remove object name as we don't need to save that to the game slots

    credits = gameData.credits;
    delete gameData.credits; //Remove object name as we don't need to save that to the game slots

    cutScenes = gameData.cutScenes;
    delete gameData.cutScenes; //Remove object name as we don't need to save that to the game slots

    documents = gameData.documents;
    delete gameData.documents; //Remove object name as we don't need to save that to the game slots

    foleySounds = gameData.foleySounds;
    delete gameData.foleySounds; //Remove object name as we don't need to save that to the game slots

    globalSpeeches = gameData.globalSpeeches;
    delete gameData.globalSpeeches; //Remove object name as we don't need to save that to the game slots

    music = gameData.music;
    delete gameData.music; //Remove object name as we don't need to save that to the game slots

    permittedItemCombos = gameData.permittedItemCombos;
    delete gameData.permittedItemCombos; //Remove object name as we don't need to save that to the game slots

    imageLibrary = gameData.imageLibrary;
    delete gameData.imageLibrary; //Remove object name as we don't need to save that to the game slots


    //Convert the global vars from an array into an object START
    globalVarsArray = JSON.parse(JSON.stringify(gameData.globalVars));

    var newGlobalVarsObject = {};

    var i;
    for (i = 0; i < globalVarsArray.length; i++) {
        newGlobalVarsObject[globalVarsArray[i].name] = globalVarsArray[i].value;
    }

    gameData.globalVars = newGlobalVarsObject;
    //Convert the global vars from an array into an object END

}


/* If its a brand new game START */
function determineGameSession() {

    loadJSON(function (response) {

        gameData = JSON.parse(response);

        setMainGameObjects();



        // Set localstorage
        if ((getURLValues('dev') == "true"))
        {
            gameDataLocalStorageName = "devGameData" + Date.now();
        }
        else
        {
            gameDataLocalStorageName = systemSettings.storageName;
        }

        

        //	Create your Phaser game and inject it into the game div.
        //	We did it in a window.onload event, but you can do it anywhere (requireJS load, anonymous function, jQuery dom ready, - whatever floats your boat)
        //	We're using a game size of 1024 x 768 here, but you can use whatever you feel makes sense for your game of course.
        game = new Phaser.Game(systemSettings.resolution.width, systemSettings.resolution.height, Phaser.CANVAS);
        
        
        //	Add the States your game has.
        //	You don't have to do this in the html, it could be done in your Boot state too, but for simplicity I'll keep it here.
        game.state.add('Boot', BasicGame.Boot);
        game.state.add('InitialPreloader', BasicGame.InitialPreloader);
        game.state.add('IntroMadeByPreloader', BasicGame.IntroMadeByPreloader);
        game.state.add('IntroMadeBy', BasicGame.IntroMadeBy);
        game.state.add('TitleCard', BasicGame.TitleCard);
        game.state.add('Credits', BasicGame.Credits);
        game.state.add('OptionsPreloader', BasicGame.OptionsPreloader);
        game.state.add('Options', BasicGame.Options);
        game.state.add('SaveOrLoadGameSlot', BasicGame.SaveOrLoadGameSlot);
        game.state.add('LoadGameSlot', BasicGame.LoadGameSlot);
        game.state.add('LoadGameSlotWithinGame', BasicGame.LoadGameSlotWithinGame);
        game.state.add('SaveToGameSlot', BasicGame.SaveToGameSlot);
        game.state.add('RoomPreloader', BasicGame.RoomPreloader);
        game.state.add('Room', BasicGame.Room);
        game.state.add('EndScreenPreloader', BasicGame.EndScreenPreloader);
        game.state.add('EndScreen', BasicGame.EndScreen);
        game.state.add('Volume', BasicGame.Volume);
        game.state.add('VolumeWithinGame', BasicGame.VolumeWithinGame);
        game.state.add('TextAndSpeech', BasicGame.TextAndSpeech);
        game.state.add('TextAndSpeechWithinGame', BasicGame.TextAndSpeechWithinGame);
        game.state.add('CloseUpImagePreloader', BasicGame.CloseUpImagePreloader);
        game.state.add('CloseUpImage', BasicGame.CloseUpImage);
        game.state.add('ToDoList', BasicGame.ToDoList);
        game.state.add('Document', BasicGame.Document);
        game.state.add('OptionsWithinGame', BasicGame.OptionsWithinGame);
        game.state.add('Map', BasicGame.Map);
        game.state.add('CloseUpPuzzlePreloader', BasicGame.CloseUpPuzzlePreloader);
        game.state.add('CloseUpPuzzle', BasicGame.CloseUpPuzzle);
        game.state.add('CutScenePreloader', BasicGame.CutScenePreloader);
        game.state.add('CutScene', BasicGame.CutScene);
        game.state.add('Instructions', BasicGame.Instructions);
        game.state.add('InstructionsWithinGame', BasicGame.InstructionsWithinGame);



        
        
        Dexie.exists(gameDataLocalStorageName).then(function(exists) {
            if (!exists){

                // Use the user settings from the json file
                userSettings = gameData.defaultUserSettings;
                delete gameData.defaultUserSettings; //Remove object name as we don't need to save that to the game slots
                determineLanguage(userSettings.currentLanguage);

                // If a brand new user, create a new indexedDB and save the default user settings into it
                var db = new Dexie(gameDataLocalStorageName);
                db.version(1).stores({
                    myData: ""
                });
                db.myData.put(userSettings, 'userSettings');
                db.myData.put([], 'gameData'); //Empty array for gamedata as we'll need to keep saving to it
                game.state.start("Boot");
            }
            else
            {
                // User has been here before so set the user settings from their saved indexedDB
                var db = new Dexie(gameDataLocalStorageName);
                db.version(1).stores({
                    myData: "userSettings"
                });
                db.myData.toArray().then(function (results) {
                    userSettings = results[1];
                    determineLanguage(userSettings.currentLanguage);

                    if ((results[0].length > 0))
                    {
                        previousGamesExist = true;
                    }

                    game.state.start("Boot");
                });
            }
            
        });

    });
	
};
/* Let's get the correct settings based on whether its a new game or an existing one END */







(function(Phaser) {
  	
    determineGameSession();

}(Phaser));







/* Fix for Phaser to properly remove music cache START */
Phaser.Sound.prototype.onEndedHandler = function () {
	this._sound.onended = null;
	this.isPlaying = false;
	this.stop();

	if (this.externalNode)
	{
		this._sound.disconnect(this.externalNode);
	}
	else
	{
		this._sound.disconnect(this.gainNode);
	}
};

Phaser.Sound.prototype.stop = function () {

   if (this.isPlaying && this._sound)
   {
	   if (this.usingWebAudio)
	   {
		   if (typeof this._sound.stop === 'undefined')
		   {
			   this._sound.noteOff(0);
		   }
		   else
		   {
			   try {
				   this._sound.stop(0);
			   }
			   catch (e)
			   {
				   //  Thanks Android 4.4
			   }
		   }
	   }
	   else if (this.usingAudioTag)
	   {
		   this._sound.pause();
		   this._sound.currentTime = 0;
	   }
   }

   this.pendingPlayback = false;
   this.isPlaying = false;
   var prevMarker = this.currentMarker;

   if (this.currentMarker !== '')
   {
	   this.onMarkerComplete.dispatch(this.currentMarker, this);
   }

   this.currentMarker = '';

   if (this.fadeTween !== null)
   {
	   this.fadeTween.stop();
   }

   if (!this.paused)
   {
	   this.onStop.dispatch(this, prevMarker);
   }

};
/* Fix for Phaser to properly remove music cache END */
