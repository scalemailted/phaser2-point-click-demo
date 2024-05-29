/* Andy Howard Games 2017 */
(function (BasicGame) {
    'use strict';

    BasicGame.Room = function () {


    };



    BasicGame.Room.prototype = {


        preload: function () {




        },




        create: function () {

            console.log("Room start building");

            this.closingScene = false;

            this.currentInventoryIndex = 1;
            this.currentDraggedInventoryItem = null;


            /* Set a repeat function triggered every 1 second to see if an item is being dragged throughout the inventory START */
            this.game.time.events.repeat(Phaser.Timer.SECOND * 1, 5000000000, this.scrollInventoryBarUpwards, this);
            this.game.time.events.repeat(Phaser.Timer.SECOND * 1, 5000000000, this.scrollInventoryBarDownwards, this);
            /* Set a repeat function triggered every 1 second to see if an item is being dragged throughout the inventory END */


            this.areasOfInterestIconsShowing = false;

            /* Set foley sounds START */
            this.foleySounds = this.game.add.audio("foleySoundsGameWide");
            this.foleySounds.allowMultiple = true;

            this.foleyFootstepsSounds = this.game.add.audio("foleySoundsGameWide");
            this.foleyFootstepsSounds.allowMultiple = true;
            /* Set foley sounds END */




            /* Set physics up START */
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            /* Set physics up END */



            this.inventoryBoxOpen = false;
            this.disableToolBarAndPlayerMovements = false;
            this.lastUserXInput = 0;
            this.lastUserYInput = 0;


            




            /* Set background START */
            var i;
            for (i = 0; i < gameData.rooms.length; i++) {

                if ((gameData.rooms[i].id == currentRoom)) {
                    this.background = this.game.add.sprite(0, 0, "backgroundImage"+gameData.rooms[i].id);
                    this.background.inputEnabled = true;
                    this.background.events.onInputDown.add(this.flashUpCurrentVerbIconAndMovePlayer, this);
                }
            }
            /* Set background END */


            /* Every 10 seconds we do a save of the game to local storage START */
            this.game.time.events.repeat(Phaser.Timer.SECOND * 10, 5000000000, this.saveGame, this);
            /* Every 10 seconds we do a save of the game to local storage END */










            /* Options bar START */
            this.optionsBarGroup = this.game.add.group();




            /* Inventory button START */
            if ((systemSettings.gameplaySettings.format == 0) || (systemSettings.gameplaySettings.format == 2))
            {
                this.inventoryButton = this.game.add.sprite(systemSettings.gameplaySettings.formatOptions.uiIconPositions.chest.x, systemSettings.gameplaySettings.formatOptions.uiIconPositions.chest.y, 'chest');
                this.inventoryButton.inputEnabled = true;
                this.inventoryButton.events.onInputDown.add(this.toggleInventoryBox, this);
                this.inventoryButton.fixedToCamera = true;
                this.optionsBarGroup.add(this.inventoryButton);
            }
            
            if ((systemSettings.gameplaySettings.format == 2))
            {
                this.bottomLookAtButton = this.game.add.sprite(systemSettings.gameplaySettings.formatOptions.uiIconPositions.lookAt.x, systemSettings.gameplaySettings.formatOptions.uiIconPositions.lookAt.y, 'lookAt');
                this.bottomLookAtButton.compRef = "lookAt";
                this.bottomLookAtButton.friendlyRef = acquireSystemText("lookAt");
                this.bottomLookAtButton.inputEnabled = true;
                this.bottomLookAtButton.events.onInputDown.add(this.setCurrentActionVerbFunction, this);
                this.bottomLookAtButton.fixedToCamera = true;
                this.bottomLookAtButton.type = "option";
                this.optionsBarGroup.add(this.bottomLookAtButton);

                this.bottomWalkToButton = this.game.add.sprite(systemSettings.gameplaySettings.formatOptions.uiIconPositions.walkTo.x, systemSettings.gameplaySettings.formatOptions.uiIconPositions.walkTo.y, 'walkTo');
                this.bottomWalkToButton.compRef = "walkTo";
                this.bottomWalkToButton.friendlyRef = acquireSystemText("walkTo");
                this.bottomWalkToButton.inputEnabled = true;
                this.bottomWalkToButton.events.onInputDown.add(this.setCurrentActionVerbFunction, this);
                this.bottomWalkToButton.fixedToCamera = true;
                this.bottomWalkToButton.type = "option";
                this.optionsBarGroup.add(this.bottomWalkToButton);

                this.bottomUseButton = this.game.add.sprite(systemSettings.gameplaySettings.formatOptions.uiIconPositions.use.x, systemSettings.gameplaySettings.formatOptions.uiIconPositions.use.y, 'use');
                this.bottomUseButton.compRef = "use";
                this.bottomUseButton.friendlyRef = acquireSystemText("use");
                this.bottomUseButton.inputEnabled = true;
                this.bottomUseButton.events.onInputDown.add(this.setCurrentActionVerbFunction, this);
                this.bottomUseButton.fixedToCamera = true;
                this.bottomUseButton.type = "option";
                this.optionsBarGroup.add(this.bottomUseButton);

                this.bottomGiveButton = this.game.add.sprite(systemSettings.gameplaySettings.formatOptions.uiIconPositions.give.x, systemSettings.gameplaySettings.formatOptions.uiIconPositions.give.y, 'give');
                this.bottomGiveButton.compRef = "give";
                this.bottomGiveButton.friendlyRef = acquireSystemText("give");
                this.bottomGiveButton.inputEnabled = true;
                this.bottomGiveButton.events.onInputDown.add(this.setCurrentActionVerbFunction, this);
                this.bottomGiveButton.fixedToCamera = true;
                this.bottomGiveButton.type = "option";
                this.optionsBarGroup.add(this.bottomGiveButton);

                this.bottomOpenButton = this.game.add.sprite(systemSettings.gameplaySettings.formatOptions.uiIconPositions.open.x, systemSettings.gameplaySettings.formatOptions.uiIconPositions.open.y, 'open');
                this.bottomOpenButton.compRef = "open";
                this.bottomOpenButton.friendlyRef = acquireSystemText("open");
                this.bottomOpenButton.inputEnabled = true;
                this.bottomOpenButton.events.onInputDown.add(this.setCurrentActionVerbFunction, this);
                this.bottomOpenButton.fixedToCamera = true;
                this.bottomOpenButton.type = "option";
                this.optionsBarGroup.add(this.bottomOpenButton);

                this.bottomPickUpButton = this.game.add.sprite(systemSettings.gameplaySettings.formatOptions.uiIconPositions.pickUp.x, systemSettings.gameplaySettings.formatOptions.uiIconPositions.pickUp.y, 'pickUp');
                this.bottomPickUpButton.compRef = "pickUp";
                this.bottomPickUpButton.friendlyRef = acquireSystemText("pickUp");
                this.bottomPickUpButton.inputEnabled = true;
                this.bottomPickUpButton.events.onInputDown.add(this.setCurrentActionVerbFunction, this);
                this.bottomPickUpButton.fixedToCamera = true;
                this.bottomPickUpButton.type = "option";
                this.optionsBarGroup.add(this.bottomPickUpButton);

                this.bottomPullButton = this.game.add.sprite(systemSettings.gameplaySettings.formatOptions.uiIconPositions.pull.x, systemSettings.gameplaySettings.formatOptions.uiIconPositions.pull.y, 'pull');
                this.bottomPullButton.compRef = "pull";
                this.bottomPullButton.friendlyRef = acquireSystemText("pull");
                this.bottomPullButton.inputEnabled = true;
                this.bottomPullButton.events.onInputDown.add(this.setCurrentActionVerbFunction, this);
                this.bottomPullButton.fixedToCamera = true;
                this.bottomPullButton.type = "option";
                this.optionsBarGroup.add(this.bottomPullButton);

                this.bottomPushButton = this.game.add.sprite(systemSettings.gameplaySettings.formatOptions.uiIconPositions.push.x, systemSettings.gameplaySettings.formatOptions.uiIconPositions.push.y, 'push');
                this.bottomPushButton.compRef = "push";
                this.bottomPushButton.friendlyRef = acquireSystemText("push");
                this.bottomPushButton.inputEnabled = true;
                this.bottomPushButton.events.onInputDown.add(this.setCurrentActionVerbFunction, this);
                this.bottomPushButton.fixedToCamera = true;
                this.bottomPushButton.type = "option";
                this.optionsBarGroup.add(this.bottomPushButton);

                this.bottomCloseButton = this.game.add.sprite(systemSettings.gameplaySettings.formatOptions.uiIconPositions.close.x, systemSettings.gameplaySettings.formatOptions.uiIconPositions.close.y, 'close');
                this.bottomCloseButton.compRef = "close";
                this.bottomCloseButton.friendlyRef = acquireSystemText("close");
                this.bottomCloseButton.inputEnabled = true;
                this.bottomCloseButton.events.onInputDown.add(this.setCurrentActionVerbFunction, this);
                this.bottomCloseButton.fixedToCamera = true;
                this.bottomCloseButton.type = "option";
                this.optionsBarGroup.add(this.bottomCloseButton);

                this.bottomTalkToButton = this.game.add.sprite(systemSettings.gameplaySettings.formatOptions.uiIconPositions.talkTo.x, systemSettings.gameplaySettings.formatOptions.uiIconPositions.talkTo.y, 'talkTo');
                this.bottomTalkToButton.compRef = "talkTo";
                this.bottomTalkToButton.friendlyRef = acquireSystemText("talkTo");
                this.bottomTalkToButton.inputEnabled = true;
                this.bottomTalkToButton.events.onInputDown.add(this.setCurrentActionVerbFunction, this);
                this.bottomTalkToButton.fixedToCamera = true;
                this.bottomTalkToButton.type = "option";
                this.optionsBarGroup.add(this.bottomTalkToButton);
            }
            /* Inventory button END */



            if ((systemSettings.gameplaySettings.uiIcons.uiMagnifyingGlassShow == true))
            {
                this.magnifyingGlassButton = this.game.add.sprite(systemSettings.gameplaySettings.uiIcons.uiMagnifyingGlassX, systemSettings.gameplaySettings.uiIcons.uiMagnifyingGlassY, 'magnifyingGlass');
                this.magnifyingGlassButton.inputEnabled = true;
                this.magnifyingGlassButton.events.onInputDown.add(this.showAreasOfInterest, this);
                this.magnifyingGlassButton.fixedToCamera = true;
                this.magnifyingGlassButton.compRef = "magnifyingGlass";
                this.optionsBarGroup.add(this.magnifyingGlassButton);
            }
            



            /* Save button START */
            /*this.saveButton = this.game.add.sprite(systemSettings.gameplaySettings.uiIcons.uiSaveIconX, systemSettings.gameplaySettings.uiIcons.uiSaveIconY, 'saveIcon');
            this.saveButton.inputEnabled = true;
            this.saveButton.events.onInputDown.add(this.physicalButtonSave, this);
            this.saveButton.fixedToCamera = true;
            this.saveButton.compRef = "saveIcon";

            this.optionsBarGroup.add(this.saveButton);*/
            /* Save button START */

            /* Options bar END */

























            /* Action words at top of screen START */
            this.setCurrentActionVerbFriendly = acquireSystemText("walkTo");
            this.setCurrentActionVerbComp = "walkTo";

            this.currentlySelectedItemName = "";
            this.currentlySelectedItemRef = "";
            this.setCurrentActionNoun = "";
            this.useItemBridgingWord = "";
            /* Action words at top of screen END */


            /* Set action mode text START */
            this.currentActionModeText = this.game.add.text(systemSettings.gameplaySettings.uiText.actionsText.x, systemSettings.gameplaySettings.uiText.actionsText.y, this.setCurrentActionVerbFriendly, { font: ""+this.calculateTextSizeInPercentage(systemSettings.gameplaySettings.uiText.actionsText.languages[currentLang].fontSize, userSettings.textSize.interface)+"px "+acquireFontName(systemSettings.gameplaySettings.uiText.actionsText.languages[currentLang].fontId)+"", fill: '#ffffff' });
            this.currentActionModeText.wordWrap = true;
            this.currentActionModeText.align = 'center';
            this.currentActionModeText.wordWrapWidth = systemSettings.gameplaySettings.uiText.actionsText.width;
            this.currentActionModeText.lineSpacing = systemSettings.gameplaySettings.uiText.actionsText.languages[currentLang].lineSpacing;
            
            if ((systemSettings.gameplaySettings.uiText.actionsText.stroke.show == true))
			{
				this.currentActionModeText.stroke = systemSettings.gameplaySettings.uiText.actionsText.stroke.color;
				this.currentActionModeText.strokeThickness = systemSettings.gameplaySettings.uiText.actionsText.stroke.thickness;
            }
            
            if ((systemSettings.gameplaySettings.uiText.actionsText.shadow.show == true))
			{
				this.currentActionModeText.setShadow(systemSettings.gameplaySettings.uiText.actionsText.shadow.x, systemSettings.gameplaySettings.uiText.actionsText.shadow.y, systemSettings.gameplaySettings.uiText.actionsText.shadow.color, systemSettings.gameplaySettings.uiText.actionsText.shadow.blur);
            }

            /* Colors START */
            var actionTextGradient = this.currentActionModeText.context.createLinearGradient(0, 0, 0, this.currentActionModeText.height);
            actionTextGradient.addColorStop(0, systemSettings.gameplaySettings.uiText.actionsText.textColor);
            actionTextGradient.addColorStop(1, systemSettings.gameplaySettings.uiText.actionsText.textColorAdditional);
            this.currentActionModeText.fill = actionTextGradient;
            /* Colors END */

            this.currentActionModeText.anchor.x = Math.round(this.currentActionModeText.width * 0.5) / this.currentActionModeText.width;
            this.currentActionModeText.x = systemSettings.gameplaySettings.uiText.actionsText.x;
            this.currentActionModeText.fixedToCamera = true;
            /* Set action mode text END */



            this.createNarratorText();








            this.charactersAndZonesGroup = this.game.add.group();


            



            this.questionsGroup = this.game.add.group();

            

            this.createZones();

            
            
            // If in room preview mode, only render the beginning playable character
            if ((previewRoomId != null))
            {
                this.createPlayableCharacter(gameData.playerSettings.currentPlayableCharacterId);
            }
            else
            {
                this.generatePlayableCharactersForCurrentRoom();
            }



            this.generateNpcCharactersForCurrentRoom();







            /* Generic narration START */
            var i;
            for (i = 0; i < localisation.languages.length; i++) {
                if ((localisation.languages[i].id == currentLang) && (localisation.languages[i].allowNarrationAudio == true)) {
                    this.globalNarration = this.game.add.audio("globalSpeeches");
                    this.globalNarration.allowMultiple = false;
                }
            }
            /* Generic narration END */




            /* Set narration START */
            var x;
            for (x = 0; x < localisation.languages.length; x++) {
                if ((localisation.languages[x].id == currentLang) && (localisation.languages[x].allowNarrationAudio == true)) {
                    var i;
                    for (i = 0; i < gameData.rooms.length; i++) {
                        if ((gameData.rooms[i].id == currentRoom)) {
                            this.narration = this.game.add.audio(gameData.rooms[i].narration.languages[currentLang].narrationId);
                            this.narration.allowMultiple = true;
                        }
                    }
                }
            }



            


            


            /* Set narration END */










            this.backgroundMusicSetup();



            this.foregroundGroup = this.game.add.group();

            /* Set foreground START */
            var i;
            for (i = 0; i < gameData.rooms.length; i++) {

                if ((gameData.rooms[i].id == currentRoom)) {

                    var k;
                    for (var k = gameData.rooms[i].foreground.length; k--;)
                    {
                        this.createForegroundElement(gameData.rooms[i].foreground[k].id);
                    }

                }
            }
            /* Set foreground END */








            /* If the scenes width extends beyond the canvas width than pan the camera with the player START */
            var i;
            for (i = 0; i < gameData.rooms.length; i++) {
                if ((gameData.rooms[i].id == currentRoom)) {
                    this.game.world.setBounds(0, 0, gameData.rooms[i].width, gameData.rooms[i].height);

                    this.game.camera.follow(this['player' + currentPlayableCharacterId], Phaser.Camera.FOLLOW_LOCKON, systemSettings.gameplaySettings.otherSettings.cameraFollowDelay, systemSettings.gameplaySettings.otherSettings.cameraFollowDelay);



                }
            }
            /* If the scenes width extends beyond the canvas width than pan the camera with the player END */








            this.blackTransitionOut();



            this.routeFindingAndBoundaries();








            //this.createSoundButton();

            //this.createTextAndSpeechButton();

            this.createPlayableCharacterAvatars();

            this.createSettingsButton();

            if ((previewRoomId == null))
            {
                /* Show indictor on current playable character START */
                this.createPlayerIndicator(this['avatarIcon' + currentPlayableCharacterId].x + (this['avatarIcon' + currentPlayableCharacterId].width/2), this['avatarIcon' + currentPlayableCharacterId].y + (this['avatarIcon' + currentPlayableCharacterId].height/2));
                /* Show indictor on current playable character END */
            }
            
            


            



            this.checkPlayerIsInWalkBox();





            /* Set hover text START */
            

            this.hoverText = this.game.add.text(16, 85, ' ', { font: ""+this.calculateTextSizeInPercentage(systemSettings.gameplaySettings.uiText.hoverText.languages[currentLang].fontSize, userSettings.textSize.interface)+"px "+acquireFontName(systemSettings.gameplaySettings.uiText.hoverText.languages[currentLang].fontId)+"", fill: systemSettings.gameplaySettings.uiText.hoverText.textColor });
            this.hoverText.wordWrap = true;
            this.hoverText.align = 'center';
            this.hoverText.wordWrapWidth = systemSettings.gameplaySettings.uiText.hoverText.width;
            this.hoverText.lineSpacing = systemSettings.gameplaySettings.uiText.hoverText.languages[currentLang].lineSpacing;
            
            if ((systemSettings.gameplaySettings.uiText.hoverText.stroke.show == true))
            {
                this.hoverText.stroke = systemSettings.gameplaySettings.uiText.hoverText.stroke.color;
                this.hoverText.strokeThickness = systemSettings.gameplaySettings.uiText.hoverText.stroke.thickness;
            }
                        
            if ((systemSettings.gameplaySettings.uiText.hoverText.shadow.show == true))
            {
                this.hoverText.setShadow(systemSettings.gameplaySettings.uiText.hoverText.shadow.x, systemSettings.gameplaySettings.uiText.hoverText.shadow.y, systemSettings.gameplaySettings.uiText.hoverText.shadow.color, systemSettings.gameplaySettings.uiText.hoverText.shadow.blur);
            }

            this.hoverText.anchor.x = Math.round(this.hoverText.width * 0.5) / this.hoverText.width;
            this.hoverText.anchor.y = 1;
            this.hoverText.x = this.game.input.x;
            this.hoverText.y = this.game.input.y - 40;

            



            // Only run room entrance protocols if we are not in room preview mode
            this.runRoomEntranceAndAfterCutSceneProtocols();
            
            

            this.runIntervalEventProtocols();



            /* If we have just completed a close up puzzle, then run the protocol on success START */
            if ((closeUpPuzzleCallback.protocolsToRun.length > 0))
            {
                this.speechAndMovements(closeUpPuzzleCallback.protocolsToRun);
                closeUpPuzzleCallback.puzzleId = null;
                closeUpPuzzleCallback.protocolsToRun = [];
            }
            /* If we have just completed a close up puzzle, then run the protocol on success END */


            this.generateInventoryForCurrentRoom();



            /* We might have come back from a closeup image or to do list, so run the remaining protocols (if any) START */
            if ((continueProtocol.convoParams.length > 0))
            {
                this.removeConvoSegmentAndRerun(continueProtocol.convoParams);
            }
            /* We might have come back from a closeup image or to do list, so run the remaining protocols (if any) END */


            console.log(currentPlayableCharacterId);

            

        },


        createNarratorText: function(){

            this.narratorText = this.game.add.text(systemSettings.gameplaySettings.uiText.narratorText.x, systemSettings.gameplaySettings.uiText.narratorText.y, " ", { font: ""+this.calculateTextSizeInPercentage(systemSettings.gameplaySettings.uiText.narratorText.languages[currentLang].fontSize, userSettings.textSize.interface)+"px "+acquireFontName(systemSettings.gameplaySettings.uiText.narratorText.languages[currentLang].fontId)+"", fill: '#ffffff' });
            this.narratorText.wordWrap = true;
            this.narratorText.align = 'center';
            this.narratorText.wordWrapWidth = systemSettings.gameplaySettings.uiText.narratorText.width;
            this.narratorText.lineSpacing = systemSettings.gameplaySettings.uiText.narratorText.languages[currentLang].lineSpacing;
            
            if ((systemSettings.gameplaySettings.uiText.narratorText.stroke.show == true))
			{
				this.narratorText.stroke = systemSettings.gameplaySettings.uiText.narratorText.stroke.color;
				this.narratorText.strokeThickness = systemSettings.gameplaySettings.uiText.narratorText.stroke.thickness;
            }
            
            if ((systemSettings.gameplaySettings.uiText.narratorText.shadow.show == true))
			{
				this.narratorText.setShadow(systemSettings.gameplaySettings.uiText.narratorText.shadow.x, systemSettings.gameplaySettings.uiText.narratorText.shadow.y, systemSettings.gameplaySettings.uiText.narratorText.shadow.color, systemSettings.gameplaySettings.uiText.narratorText.shadow.blur);
            }

            /* Colors START */
            var actionTextGradient = this.narratorText.context.createLinearGradient(0, 0, 0, this.narratorText.height);
            actionTextGradient.addColorStop(0, systemSettings.gameplaySettings.uiText.narratorText.textColor);
            actionTextGradient.addColorStop(1, systemSettings.gameplaySettings.uiText.narratorText.textColorAdditional);
            this.narratorText.fill = actionTextGradient;
            /* Colors END */

            this.narratorText.anchor.x = Math.round(this.narratorText.width * 0.5) / this.narratorText.width;
            this.narratorText.x = systemSettings.gameplaySettings.uiText.narratorText.x;
            this.narratorText.fixedToCamera = true;
            /* Set action mode text END */

        },


        createForegroundElement: function(foregroundId){

            var i;
            for (i = 0; i < gameData.rooms.length; i++) {

                if ((gameData.rooms[i].id == currentRoom)) {

                    var k;
                    for (k = 0; k < gameData.rooms[i].foreground.length; k++)
                    {

                        if ((gameData.rooms[i].foreground[k].id == foregroundId && gameData.rooms[i].foreground[k].display === true))
                        {

                            if ((gameData.rooms[i].foreground[k].includeAnimation == false))
                            {
                                this['foreground' + gameData.rooms[i].foreground[k].id] = this.game.add.sprite(gameData.rooms[i].foreground[k].foregroundXPosition, gameData.rooms[i].foreground[k].foregroundYPosition, "foregroundImage"+gameData.rooms[i].foreground[k].id);
                            }
                            else
                            {
                                this['foreground' + gameData.rooms[i].foreground[k].id] = this.game.add.sprite(gameData.rooms[i].foreground[k].foregroundXPosition, gameData.rooms[i].foreground[k].foregroundYPosition);
                                this['foreground' + gameData.rooms[i].foreground[k].id].loadTexture("foregroundAnimation" + gameData.rooms[i].foreground[k].id, 0);
                                this['foreground' + gameData.rooms[i].foreground[k].id].animations.add("foregroundAnimation" + gameData.rooms[i].foreground[k].id);
                                this['foreground' + gameData.rooms[i].foreground[k].id].animations.play("foregroundAnimation" + gameData.rooms[i].foreground[k].id, gameData.rooms[i].foreground[k].animation.frameRate, gameData.rooms[i].foreground[k].animation.loop);
                            }

                            this['foreground' + gameData.rooms[i].foreground[k].id].originalXPosition = gameData.rooms[i].foreground[k].foregroundXPosition;
                            this['foreground' + gameData.rooms[i].foreground[k].id].fixedToCamera = gameData.rooms[i].foreground[k].foregroundFixToCamera;
                            this['foreground' + gameData.rooms[i].foreground[k].id].foregroundParallaxSpeed = gameData.rooms[i].foreground[k].foregroundParallaxSpeed;
                            this['foreground' + gameData.rooms[i].foreground[k].id].alphaOnPlayerOverlap = gameData.rooms[i].foreground[k].alphaOnPlayerOverlap;
                            this.foregroundGroup.add(this['foreground' + gameData.rooms[i].foreground[k].id]);

                        }
                    }

                }
            }

        },

        

        calculateTextSizeInPercentage: function(val, decimal){

            var convertDecimalToPercentage = decimal * 100;
            var calculateNewPixelSize = convertDecimalToPercentage * val / 100;
            var result = calculateNewPixelSize;

            if ((calculateNewPixelSize < userSettings.textSize.min))
            {
                result = userSettings.textSize.min;
            }
            
            if ((calculateNewPixelSize > userSettings.textSize.max))
            {
                result = userSettings.textSize.max;
            }

            return result;

        },


        runRoomEntranceAndAfterCutSceneProtocols: function (){

            

            /* Cut Scene on completion protocols take priority */
            var protocolForCutScenes = [];

            var i;
            for (i = 0; i < cutScenes.length; i++) {

                if ((cutScenes[i].id == cutSceneCallback)) {
                                        
                    if ((cutScenes[i].actionTypeOnCompletion == 1))
                    {
                        protocolForCutScenes = cutScenes[i].protocolOnCompletion;
                    }
                    
                }
            }



            /* Then we add room entrance protocols */
            var protocolForRoomEntrances = [];

            var i;
            for (i = 0; i < gameData.rooms.length; i++) {
                if ((gameData.rooms[i].id == currentRoom)) {

                    var x;
                    for (x = 0; x < gameData.rooms[i].roomEntranceProtocol.length; x++) {

                        if ((gameData.rooms[i].roomEntranceProtocol[x].available == true))
                        {
                            if ((gameData.rooms[i].roomEntranceProtocol[x].appliesToAllPlayableCharacters == true) || (gameData.rooms[i].roomEntranceProtocol[x].appliesToPlayableCharacterIds.indexOf(currentPlayableCharacterId) >= 0))
                            {

                                if ((previousScreenType == 0) && (gameData.rooms[i].roomEntranceProtocol[x].runOnStartup == true)) //Startup
                                {
                                    protocolForRoomEntrances = gameData.rooms[i].roomEntranceProtocol[x].protocol;
                                    break;
                                }
                                else if ((previousScreenType == 1) && (gameData.rooms[i].roomEntranceProtocol[x].runAfterVisitingOptions == true)) //Options
                                {
                                    protocolForRoomEntrances = gameData.rooms[i].roomEntranceProtocol[x].protocol;
                                    break;
                                }
                                else if ((previousScreenType == 2) && (gameData.rooms[i].roomEntranceProtocol[x].runOnEnteringViaTargetZones == true)) //Room
                                {
                                    if ((gameData.rooms[i].roomEntranceProtocol[x].targetZoneIds.length > 0) && (gameData.rooms[i].roomEntranceProtocol[x].targetZoneIds.indexOf(roomEntranceTargetZoneId) >= 0))
                                    {
                                        protocolForRoomEntrances = gameData.rooms[i].roomEntranceProtocol[x].protocol;
                                        break;
                                    }
                                }
                                else if ((previousScreenType == 3) && (gameData.rooms[i].roomEntranceProtocol[x].runAfterCutScenes == true)) //Cutscene
                                {
                                    if ((gameData.rooms[i].roomEntranceProtocol[x].cutSceneIds.length > 0) && (gameData.rooms[i].roomEntranceProtocol[x].cutSceneIds.indexOf(cutSceneCallback) >= 0))
                                    {
                                        protocolForRoomEntrances = gameData.rooms[i].roomEntranceProtocol[x].protocol;
                                        break;
                                    }
                                }
                                
                            }
                        }

                    }

                    roomEntranceTargetZoneId = null;
                    cutSceneCallback = null;

                }
            }

            
            var protocolToContruct = protocolForCutScenes.concat(protocolForRoomEntrances);

            if ((protocolToContruct.length > 0))
            {
                this.speechAndMovements(protocolToContruct);
            }
            

        },





        runIntervalEventProtocols: function (){
            

            var i;
            for (i = 0; i < gameData.rooms.length; i++) {
                if ((gameData.rooms[i].id == currentRoom)) {

                    var x;
                    for (x = 0; x < gameData.rooms[i].intervalEvents.length; x++) {

                        this.runSpecificIntervalEventProtocol(gameData.rooms[i].intervalEvents[x].id);

                    }

                }
            }

        },


        runSpecificIntervalEventProtocol: function (id){
            

            var i;
            for (i = 0; i < gameData.rooms.length; i++) {
                if ((gameData.rooms[i].id == currentRoom)) {

                    var x;
                    for (x = 0; x < gameData.rooms[i].intervalEvents.length; x++) {

                        if ((gameData.rooms[i].intervalEvents[x].id == id) && (gameData.rooms[i].intervalEvents[x].run == true))
                        {

                            // Deal with sequencial
                            if ((gameData.rooms[i].intervalEvents[x].runType == 0))
                            {
                                if ((gameData.rooms[i].intervalEvents[x].lastRunProtocolBlockIndex == null))
                                {
                                    this.speechAndMovements(gameData.rooms[i].intervalEvents[x].protocols[0]);
                                    gameData.rooms[i].intervalEvents[x].lastRunProtocolBlockIndex = 0;
                                }
                                else
                                {
                                    if ((gameData.rooms[i].intervalEvents[x].lastRunProtocolBlockIndex+1 < gameData.rooms[i].intervalEvents[x].protocols.length))
                                    {
                                        this.speechAndMovements(gameData.rooms[i].intervalEvents[x].protocols[gameData.rooms[i].intervalEvents[x].lastRunProtocolBlockIndex+1]);
                                        gameData.rooms[i].intervalEvents[x].lastRunProtocolBlockIndex++;
                                    }
                                    else
                                    {
                                        this.speechAndMovements(gameData.rooms[i].intervalEvents[x].protocols[0]);
                                        gameData.rooms[i].intervalEvents[x].lastRunProtocolBlockIndex = 0;
                                    }
                                }
                            }

                            // Deal with randomly
                            if ((gameData.rooms[i].intervalEvents[x].runType == 1))
                            {
                                // If theres only one protcol then just keep playing that one
                                if ((gameData.rooms[i].intervalEvents[x].protocols.length == 1))
                                {
                                    this.speechAndMovements(gameData.rooms[i].intervalEvents[x].protocols[0]);
                                    gameData.rooms[i].intervalEvents[x].lastRunProtocolBlockIndex = 0;
                                }
                                else
                                {
                                    // Generate a random number between 0 and the number of protocols available -1
                                    var randomnumber = Math.floor(Math.random() * (gameData.rooms[i].intervalEvents[x].protocols.length-1 - 0 + 1)) + 0;

                                    // Only run the protocol providing it's different from the last one that was played
                                    if ((randomnumber != gameData.rooms[i].intervalEvents[x].lastRunProtocolBlockIndex))
                                    {
                                        this.speechAndMovements(gameData.rooms[i].intervalEvents[x].protocols[randomnumber]);
                                        gameData.rooms[i].intervalEvents[x].lastRunProtocolBlockIndex = randomnumber;
                                    }
                                    // Otherwise send this protocol through again until we do get a different protocol from last time
                                    else
                                    {
                                        this.runSpecificIntervalEventProtocol(id);
                                    }
                                }
                            }
                            
                        }

                    }

                }
            }

        },
        



        generatePlayableCharactersForCurrentRoom: function () {
            var i;
            for (i = 0; i < gameData.playerSettings.playableCharacters.length; i++) {

                if ((gameData.playerSettings.playableCharacters[i].currentRoomId == currentRoom))
                {
                    this.createPlayableCharacter(gameData.playerSettings.playableCharacters[i].id);
                }
                
            }

           

        },



        createPlayableCharacter: function (forPlayableCharacterId) {

            var i;
            for (i = 0; i < gameData.playerSettings.playableCharacters.length; i++) {

                if ((gameData.playerSettings.playableCharacters[i].id == forPlayableCharacterId)) {

                    this['player' + gameData.playerSettings.playableCharacters[i].id] = this.game.add.sprite(0, 0);

                    this['player' + gameData.playerSettings.playableCharacters[i].id].numberOfPixelsToTravelAtPerSecond = gameData.playerSettings.playableCharacters[i].numberOfPixelsToTravelAtPerSecond;
                    this['player' + gameData.playerSettings.playableCharacters[i].id].playingWalkingSignal = false;
                    this['player' + gameData.playerSettings.playableCharacters[i].id].type = "playerableCharacter";
                    this['player' + gameData.playerSettings.playableCharacters[i].id].playerXPositions = [];
                    this['player' + gameData.playerSettings.playableCharacters[i].id].playerYPositions = [];
                    this['player' + gameData.playerSettings.playableCharacters[i].id].id = gameData.playerSettings.playableCharacters[i].id;
                    this['player' + gameData.playerSettings.playableCharacters[i].id].name = gameData.playerSettings.playableCharacters[i].languages[currentLang].name;
                    this['player' + gameData.playerSettings.playableCharacters[i].id].inputEnabled = true;
                    this['player' + gameData.playerSettings.playableCharacters[i].id].input.pixelPerfectClick = gameData.playerSettings.playableCharacters[i].pixelPerfectClick;
                    this['player' + gameData.playerSettings.playableCharacters[i].id].input.pixelPerfectOver = gameData.playerSettings.playableCharacters[i].pixelPerfectOver;
                    this['player' + gameData.playerSettings.playableCharacters[i].id].ignore = gameData.playerSettings.playableCharacters[i].ignore;
                    this['player' + gameData.playerSettings.playableCharacters[i].id].callbackFunction = "playerableCharacterInteraction";
                    this['player' + gameData.playerSettings.playableCharacters[i].id].events.onInputDown.add(this.flashUpCurrentVerbIconAndMovePlayer, this);

                    this.game.physics.arcade.enable(this['player' + gameData.playerSettings.playableCharacters[i].id]);

                    this.charactersAndZonesGroup.add(this['player' + gameData.playerSettings.playableCharacters[i].id]);


                    this.setPlayerAnimation(13, gameData.playerSettings.playableCharacters[i].id); //Idle Front

                    this['player' + gameData.playerSettings.playableCharacters[i].id].anchor.setTo(0.5, 1);


                    /* Create speech text START */
                    this['player' + gameData.playerSettings.playableCharacters[i].id].speechText = this.game.add.text(16, 85, ' ', { font: ""+this.calculateTextSizeInPercentage(systemSettings.gameplaySettings.uiText.dialogText.languages[currentLang].fontSize, userSettings.textSize.interface)+"px "+acquireFontName(systemSettings.gameplaySettings.uiText.dialogText.languages[currentLang].fontId)+"", fill: '#ffffff' });
                    this['player' + gameData.playerSettings.playableCharacters[i].id].speechText.wordWrap = true;
                    this['player' + gameData.playerSettings.playableCharacters[i].id].speechText.align = 'center';
                    this['player' + gameData.playerSettings.playableCharacters[i].id].speechText.wordWrapWidth = systemSettings.gameplaySettings.uiText.dialogText.width;
                    this['player' + gameData.playerSettings.playableCharacters[i].id].speechText.lineSpacing = systemSettings.gameplaySettings.uiText.dialogText.languages[currentLang].lineSpacing;
                    
                    if ((systemSettings.gameplaySettings.uiText.dialogText.stroke.show == true))
					{
						this['player' + gameData.playerSettings.playableCharacters[i].id].speechText.stroke = systemSettings.gameplaySettings.uiText.dialogText.stroke.color;
						this['player' + gameData.playerSettings.playableCharacters[i].id].speechText.strokeThickness = systemSettings.gameplaySettings.uiText.dialogText.stroke.thickness;
                    }
                    
                    if ((systemSettings.gameplaySettings.uiText.dialogText.shadow.show == true))
					{
						this['player' + gameData.playerSettings.playableCharacters[i].id].speechText.setShadow(systemSettings.gameplaySettings.uiText.dialogText.shadow.x, systemSettings.gameplaySettings.uiText.dialogText.shadow.y, systemSettings.gameplaySettings.uiText.dialogText.shadow.color, systemSettings.gameplaySettings.uiText.dialogText.shadow.blur);
					}

                    this['player' + gameData.playerSettings.playableCharacters[i].id].speechText.anchor.x = Math.round(this['player' + gameData.playerSettings.playableCharacters[i].id].speechText.width * 0.5) / this['player' + gameData.playerSettings.playableCharacters[i].id].speechText.width;
                    this['player' + gameData.playerSettings.playableCharacters[i].id].speechText.x = this.game.width / 2;
                    this['player' + gameData.playerSettings.playableCharacters[i].id].speechText.alpha = 1;
                    this['player' + gameData.playerSettings.playableCharacters[i].id].speechText.speechTextYOffset = gameData.playerSettings.playableCharacters[i].speechTextYOffset;
                    this['player' + gameData.playerSettings.playableCharacters[i].id].speechText.conversationFillColor = gameData.playerSettings.playableCharacters[i].conversationFillColor;
                    this['player' + gameData.playerSettings.playableCharacters[i].id].speechText.conversationFillColorAdditional = gameData.playerSettings.playableCharacters[i].conversationFillColorAdditional;
                    this['player' + gameData.playerSettings.playableCharacters[i].id].speechText.fill = gameData.playerSettings.playableCharacters[i].conversationFillColor;
                    //this['player' + gameData.playerSettings.playableCharacters[i].id].speechText.fixedToCamera = true;
                    /* Create speech text END */

                    if ((previewRoomId != null))
                    {
                        this['player' + gameData.playerSettings.playableCharacters[i].id].x = parseInt(getURLValues('previewRoomPositionX'));
                        this['player' + gameData.playerSettings.playableCharacters[i].id].y = parseInt(getURLValues('previewRoomPositionY'));
                    }
                    else
                    {
                        this['player' + gameData.playerSettings.playableCharacters[i].id].x = gameData.playerSettings.playableCharacters[i].position.x;
                        this['player' + gameData.playerSettings.playableCharacters[i].id].y = gameData.playerSettings.playableCharacters[i].position.y;
                    }
                    


                }

            }

            




        },



        showAreasOfInterest: function () {

            

            if ((this.inventoryBoxOpen == true)) {
                this.toggleInventoryBox("close");
            }

            this.closeCompass();
            this.destroyCloseUpImage();
            this.destroyToDoList();


            if ((this.areasOfInterestIconsShowing != true)) {

                this.playOpenPointsOfInterestSound();

                /* Target zones START */
                this.charactersAndZonesGroup.forEachAlive(function (item) {
                    if ((item.ignore == false) && (item.type == "targetZone")) {
                        this.createAreasOfInterestIcon(item, "targetZone");
                    }
                }, this);
                /* Target zones END */

                /* Inventory on scene START */
                this.charactersAndZonesGroup.forEachAlive(function (item) {
                    if ((item.ignore == false) && (item.type == "inventory")) {
                        this.createAreasOfInterestIcon(item, "inventory");
                    }
                }, this);
                /* Inventory on scene END */

                /* NPCS START */
                this.charactersAndZonesGroup.forEachAlive(function (item) {
                    if ((item.ignore == false) && (item.type == "npc")) {
                        this.createAreasOfInterestIcon(item, "npc");
                    }
                }, this);
                /* NPCS END */

            }


        },



        getPolygonCentroid: function (pts) {
            var first = pts[0], last = pts[pts.length-1];
            if (first.x != last.x || first.y != last.y) pts.push(first);
            var twicearea=0,
            x=0, y=0,
            nPts = pts.length,
            p1, p2, f;
            for ( var i=0, j=nPts-1 ; i<nPts ; j=i++ ) {
                p1 = pts[i]; p2 = pts[j];
                f = p1.x*p2.y - p2.x*p1.y;
                twicearea += f;          
                x += ( p1.x + p2.x ) * f;
                y += ( p1.y + p2.y ) * f;
            }
            f = twicearea * 3;
            return { x:x/f, y:y/f };
         },



        createAreasOfInterestIcon: function (item, type) {

            this.areasOfInterestIconsShowing = true;

            var areaOfInterestIcon = this.game.add.sprite(0, 0, "magnifyingGlass");

            areaOfInterestIcon.anchor.x = Math.round(areaOfInterestIcon.width * 0.5) / areaOfInterestIcon.width;
            areaOfInterestIcon.anchor.y = Math.round(areaOfInterestIcon.height * 0.5) / areaOfInterestIcon.height;

            /* Calculate where to place icon START */
            console.log(item);
            if ((type == "targetZone"))
            {
                // Graphical
                if ((item.targetZoneType == 0))
                {
                    var anchorAmountX = item.anchor.x * 100;
                    var topLeftPositionX = item.x - (anchorAmountX * item.width / 100);

                    var anchorAmountY = item.anchor.y * 100;
                    var topLeftPositionY = item.y - (anchorAmountY * item.height / 100);

                    areaOfInterestIcon.x = topLeftPositionX + (50 * item.width / 100);
                    areaOfInterestIcon.y = topLeftPositionY + (50 * item.height / 100);
                }

                // Hotspot
                if ((item.targetZoneType == 1))
                {
                    var split = item.area.split(",");
                    var arr = [];

                    for(let i = 0; i < split.length; i++){
                    arr.push({"x":parseInt(split[i]), "y":parseInt(split[++i])})
                    }

                    console.log(arr);
                    console.log(this.getPolygonCentroid(arr));

                    areaOfInterestIcon.x = this.getPolygonCentroid(arr).x;
                    areaOfInterestIcon.y = this.getPolygonCentroid(arr).y;
                }
            }
            if ((type == "inventory"))
            {
                    var anchorAmountX = item.anchor.x * 100;
                    var topLeftPositionX = item.x - (anchorAmountX * item.width / 100);

                    var anchorAmountY = item.anchor.y * 100;
                    var topLeftPositionY = item.y - (anchorAmountY * item.height / 100);

                    areaOfInterestIcon.x = topLeftPositionX + (50 * item.width / 100);
                    areaOfInterestIcon.y = topLeftPositionY + (50 * item.height / 100);
            }
            if ((type == "npc"))
            {
                    var anchorAmountX = item.anchor.x * 100;
                    var topLeftPositionX = item.x - (anchorAmountX * item.width / 100);

                    var anchorAmountY = item.anchor.y * 100;
                    var topLeftPositionY = item.y - (anchorAmountY * item.height / 100);

                    areaOfInterestIcon.x = topLeftPositionX + (50 * item.width / 100);
                    areaOfInterestIcon.y = topLeftPositionY + (50 * item.height / 100);
            }
            /* Calculate where to place icon END */


            areaOfInterestIcon.scale.set(0.5, 0.5);

            areaOfInterestIcon.alpha = 0;

            var animBlip01 = this.game.add.tween(areaOfInterestIcon).to({ alpha: 1 }, 300);
            var animBlip02 = this.game.add.tween(areaOfInterestIcon.scale).to({ x: 1.0, y: 1.0 }, 300);
            animBlip01.start();
            animBlip02.start();

            animBlip02.onComplete.add(function () {

                this.game.time.events.add(Phaser.Timer.SECOND * 2, function () { this.destroyAreasOfInterestIcon(areaOfInterestIcon) }, this);

            }, this);

        },



        destroyAreasOfInterestIcon: function (icon) {



            var animBlip01 = this.game.add.tween(icon).to({ alpha: 0 }, 300);
            var animBlip02 = this.game.add.tween(icon.scale).to({ x: 1.2, y: 1.2 }, 300);
            animBlip01.start();
            animBlip02.start();

            animBlip02.onComplete.add(function () {

                icon.destroy();
                this.areasOfInterestIconsShowing = false;

            }, this);


        },





        setPlayerAnimation: function (animId, playerId) {


            console.log("xxxxxxxxxbbbbbbbbbb");



            /* Set player animations START */
            var i;
            for (i = 0; i < gameData.playerSettings.playableCharacters.length; i++) {

                if ((gameData.playerSettings.playableCharacters[i].id == playerId)) {

                    var k;
                    for (k = 0; k < gameData.playerSettings.playableCharacters[i].groupAnimations.length; k++)
                    {

                        if ((gameData.playerSettings.playableCharacters[i].groupAnimations[k].id == gameData.playerSettings.playableCharacters[i].currentGroupAnimationId))
                        {
                            var x;
                            for (x = 0; x < gameData.playerSettings.playableCharacters[i].groupAnimations[k].animations.length; x++)
                            {

                                if ((gameData.playerSettings.playableCharacters[i].groupAnimations[k].animations[x].id == animId))
                                {
                                    this['player' + playerId].loadTexture("player" + playerId + gameData.playerSettings.playableCharacters[i].groupAnimations[k].id + animId, 0);
                                    this['player' + playerId].animations.add("player" + playerId + gameData.playerSettings.playableCharacters[i].groupAnimations[k].id + animId);
                                    this['player' + playerId].animations.play("player" + playerId + gameData.playerSettings.playableCharacters[i].groupAnimations[k].id + animId, gameData.playerSettings.playableCharacters[i].groupAnimations[k].animations[x].frameRate, gameData.playerSettings.playableCharacters[i].groupAnimations[k].animations[x].loop);
                                }

                                
                            }
                        }

                    }
                    
                }

            }
            /* Set player animations END */



        },




        setNpcAnimation: function (animId, npcId) {

            var i;
            for (i = 0; i < gameData.rooms.length; i++) {
                if ((gameData.rooms[i].id == currentRoom)) {
                    var k;
                    for (k = 0; k < gameData.rooms[i].npc.length; k++) {


                        if ((gameData.rooms[i].npc[k].id == npcId))
                        {
                            /* Animations START */
                            var x;
                            for (x = 0; x < gameData.rooms[i].npc[k].animations.length; x++) {
                                if ((gameData.rooms[i].npc[k].animations[x].id == animId)) {
                                    this['npc' + npcId].loadTexture("npc" + npcId + animId, 0);
                                    this['npc' + npcId].animations.add("npc" + npcId + animId);
                                    this['npc' + npcId].animations.play("npc" + npcId + animId, gameData.rooms[i].npc[k].animations[x].frameRate, gameData.rooms[i].npc[k].animations[x].loop);
                                }
                            }
                            /* Animations END */
                        }

                        

                    }
                }
            }
            /* Place in NPCS END */



        },



        setTargetZoneAnimation: function (animId, targetZoneId) {


            var i;
            for (i = 0; i < gameData.rooms.length; i++) {
                if ((gameData.rooms[i].id == currentRoom)) {
                    var k;
                    for (k = 0; k < gameData.rooms[i].targetZones.length; k++) {

                        if ((gameData.rooms[i].targetZones[k].id == targetZoneId))
                        {
                            /* Animations START */
                            var x;
                            for (x = 0; x < gameData.rooms[i].targetZones[k].graphicalOptions.animations.length; x++) {
                                if ((gameData.rooms[i].targetZones[k].graphicalOptions.animations[x].id == animId)) {
                                    this['targetZone' + targetZoneId].loadTexture("targetZone" + targetZoneId + animId, 0);
                                    this['targetZone' + targetZoneId].animations.add("targetZone" + targetZoneId + animId);
                                    this['targetZone' + targetZoneId].animations.play("targetZone" + targetZoneId + animId, gameData.rooms[i].targetZones[k].graphicalOptions.animations[x].frameRate, gameData.rooms[i].targetZones[k].graphicalOptions.animations[x].loop);
                                }
                            }
                            /* Animations END */
                        }

                        

                    }
                }
            }
            /* Place in NPCS END */



        },




        checkPlayerIsInWalkBox: function () {

            /* Check if walk boxes contain the player START */
            var i;
            for (i = 0; i < gameData.rooms.length; i++) {
                if ((gameData.rooms[i].id == currentRoom)) {

                    var k;
                    for (k = 0; k < gameData.rooms[i].walkBoxes.length; k++) {

                        if ((gameData.rooms[i].walkBoxes[k].appliesToAllPlayableCharacters == true) || (gameData.rooms[i].walkBoxes[k].appliesToPlayableCharacterIds.indexOf(currentPlayableCharacterId) >= 0))
                        {

                            var coordsValues = gameData.rooms[i].walkBoxes[k].area;
                            /* Convert the string over to a numbered array START */
                            var convertedCoordsValues = new Array();
                            convertedCoordsValues = JSON.parse("[" + coordsValues + "]");
                            /* Convert the string over to a numbered array END */

                            /* Now set the co-ordinates onto the page START */
                            var polygonArray = new Phaser.Polygon(convertedCoordsValues);
                            /* Now set the co-ordinates onto the page END */


                            if ((polygonArray.contains(this['player' + currentPlayableCharacterId].x, this['player' + currentPlayableCharacterId].y))) {
                                /* Just allow the protocol to fire once START */
                                if ((gameData.rooms[i].walkBoxes[k].alreadyOnProtocolAvailable == true)) {
                                    this.speechAndMovements(gameData.rooms[i].walkBoxes[k].alreadyOnProtocol);
                                    gameData.rooms[i].walkBoxes[k].alreadyOnProtocolAvailable = false;
                                }
                                /* Just allow the protocol to fire once END */
                            }

                        }

                    }

                }
            }
            /* Check if walk boxes contain the player END */

        },




        delayInNextAction: function (convoParams) {

            this.removeConvoSegmentAndRerun(convoParams);

        },






        tvStaticEffect: function () {

            this.tvStaticAnim = this.game.add.tileSprite(0, 0, 5000, 477, 'tvStatic');

            this.tvStaticAnim.animations.add('static', [0, 1, 2, 3]);

            this.tvStaticAnim.animations.play('static', 8, true);

            this.tvStaticAnim.alpha = 0;




            var tween = this.game.add.tween(this.tvStaticAnim).to({ alpha: 1 }, 500, "Linear", true, 0, -1);
            tween.yoyo(true, 500);





        },









        blackTransitionOut: function () {

            /* Create blackout and fade out for scene transition START */
            var blackOut = this.game.add.graphics(0, 0);

            blackOut.beginFill(0x000000, 1);
            
            var i;
            for (i = 0; i < gameData.rooms.length; i++)
            {
                if ((gameData.rooms[i].id == currentRoom))
                {
                    blackOut.drawRect(0, 0, gameData.rooms[i].width, gameData.rooms[i].height);
                }
            }

            blackOut.endFill();

            var fadeOutBlackTransition = this.game.add.tween(blackOut).to({ alpha: 0 }, 1000, Phaser.Easing.none).start();
            fadeOutBlackTransition.onComplete.add(function () {
                blackOut.kill();
                this.saveGame();
            }, this);
            /* Create blackout and fade out for scene transition END */

        },







        createSoundButton: function () {



            /* Add sound button START */
            this.soundButton = this.game.add.sprite(systemSettings.gameplaySettings.uiIcons.uiSoundButtonX, systemSettings.gameplaySettings.uiIcons.uiSoundButtonY, 'soundButton');
            this.soundButton.fixedToCamera = true;
            this.soundButton.inputEnabled = true;
            this.soundButton.events.onInputDown.add(this.toggleSound, this);
            this.soundButton.compRef = "soundButton";
            this.optionsBarGroup.add(this.soundButton);
            /* Add sound button END */


        },


        createTextAndSpeechButton: function () {



            /* Add sound button START */
            this.textAndSpeechButton = this.game.add.sprite(systemSettings.gameplaySettings.uiIcons.uiTextAndSpeechButtonX, systemSettings.gameplaySettings.uiIcons.uiTextAndSpeechButtonY, 'textAndSpeechButton');
            this.textAndSpeechButton.fixedToCamera = true;
            this.textAndSpeechButton.inputEnabled = true;
            this.textAndSpeechButton.events.onInputDown.add(this.goToTextAndSpeechOptions, this);
            this.textAndSpeechButton.compRef = "textAndSpeechButton";
            this.optionsBarGroup.add(this.textAndSpeechButton);
            /* Add sound button END */


        },


        createSettingsButton: function () {



            /* Add sound button START */
            this.settingsButton = this.game.add.sprite(systemSettings.gameplaySettings.uiIcons.uiSettingsButtonX, systemSettings.gameplaySettings.uiIcons.uiSettingsButtonY, 'settingsButton');
            this.settingsButton.fixedToCamera = true;
            this.settingsButton.inputEnabled = true;
            this.settingsButton.events.onInputDown.add(this.goToSettingsOptions, this);
            this.settingsButton.compRef = "settingsButton";
            this.optionsBarGroup.add(this.settingsButton);
            /* Add sound button END */


        },



        createPlayableCharacterAvatars: function () {

            this.avatarIconGroup = this.game.add.group();

            if ((previewRoomId == null))
            {
                var startingXPos = systemSettings.gameplaySettings.otherSettings.avatarIcons.startingXPos;
                var startingYPos = systemSettings.gameplaySettings.otherSettings.avatarIcons.startingYPos;
    
                /* Add avatar button START */
                var i;
                for (i = 0; i < gameData.playerSettings.playableCharacters.length; i++) {
    
                    if ((gameData.playerSettings.playableCharacters[i].avatarIconState != 2))
                    {
    
                        this['avatarIcon' + gameData.playerSettings.playableCharacters[i].id] = this.game.add.sprite(startingXPos, startingYPos, "player" + gameData.playerSettings.playableCharacters[i].id + "Avatar");
                        this['avatarIcon' + gameData.playerSettings.playableCharacters[i].id].avatarId = gameData.playerSettings.playableCharacters[i].id;
                        this['avatarIcon' + gameData.playerSettings.playableCharacters[i].id].fixedToCamera = true;
                        this['avatarIcon' + gameData.playerSettings.playableCharacters[i].id].avatarIconState = gameData.playerSettings.playableCharacters[i].avatarIconState;
                        this['avatarIcon' + gameData.playerSettings.playableCharacters[i].id].events.onInputDown.add(this.togglePlayableCharacter, this);
    
                        
                        if ((systemSettings.gameplaySettings.otherSettings.avatarIcons.orientationMode == 0))
                        {
                            startingXPos = startingXPos + systemSettings.gameplaySettings.otherSettings.avatarIcons.iconGap + this['avatarIcon' + gameData.playerSettings.playableCharacters[i].id].width;
                        }
                        else
                        {
                            startingYPos = startingYPos + systemSettings.gameplaySettings.otherSettings.avatarIcons.iconGap + this['avatarIcon' + gameData.playerSettings.playableCharacters[i].id].height;
                        }
    
                        this.avatarIconGroup.add(this['avatarIcon' + gameData.playerSettings.playableCharacters[i].id]);
                    }
                }
                /* Add avatar button END */
            }


        },


        createPlayerIndicator: function (xPos, yPos) {

            this.avatarIndicator = this.game.add.sprite(xPos - this.camera.x, yPos, 'currentPlayerIndicator');
            this.avatarIndicator.fixedToCamera = true;

            this.avatarIndicator.anchor.x = Math.round(this.avatarIndicator.width * 0.5) / this.avatarIndicator.width;
            this.avatarIndicator.anchor.y = Math.round(this.avatarIndicator.height * 0.5) / this.avatarIndicator.height;

            this.optionsBarGroup.add(this.avatarIndicator);

        },



        destroyNarrationAudio: function (){

            /* Remove narration START */
            var z;
            for (z = 0; z < gameData.rooms.length; z++) {
                if ((gameData.rooms[z].id == currentRoom)) {

                    var i;
                    for (i = 0; i < localisation.languages.length; i++) {
                        if ((localisation.languages[i].id == currentLang) && (localisation.languages[i].allowNarrationAudio == true)) {
                            this.narration.stop();
                            this.narration.destroy();
                            this.game.sound.remove(this.narration);
                            this.narration = null;
                            this.game.cache.removeSound(gameData.rooms[z].narration.languages[currentLang].narrationId);
                            this.game.sound.removeByKey(gameData.rooms[z].narration.languages[currentLang].narrationId);
                        }
                    }

                    
                }
            }
            /* Remove narration END */

        },


        togglePlayableCharacter: function (thisAvatar) {

            this.cancelPlayerWalkingTweenAndSetToIdle(currentPlayableCharacterId);

            this.playSwitchPlayableCharacterSound();

            if ((this.inventoryBoxOpen == true)) {
                this.toggleInventoryBox("close");
            }

            /*this.destroyCloseUpImage();

            this.destroyToDoList();*/

            this.closeCompass();


            

            this.saveGame();

            


            var roomNextPlayerIsIn;


            /* Find out if the character we want to switch to is in the same room or not */
            var i;
            for (i = 0; i < gameData.playerSettings.playableCharacters.length; i++) {
                if ((gameData.playerSettings.playableCharacters[i].id == thisAvatar.avatarId)) {

                    roomNextPlayerIsIn = gameData.playerSettings.playableCharacters[i].currentRoomId;
                    roomNextPlayerIsIn = parseInt(roomNextPlayerIsIn);

                }
            }



            /* They're in the same room START */
            if ((roomNextPlayerIsIn == currentRoom)) {

                currentPlayableCharacterId = thisAvatar.avatarId;
                this.avatarIndicator.destroy();
                this.createPlayerIndicator(this['avatarIcon' + thisAvatar.avatarId].x + (this['avatarIcon' + thisAvatar.avatarId].width/2), this['avatarIcon' + thisAvatar.avatarId].y + (this['avatarIcon' + thisAvatar.avatarId].height/2));

                this.game.camera.follow(this['player' + currentPlayableCharacterId], Phaser.Camera.FOLLOW_LOCKON, systemSettings.gameplaySettings.otherSettings.cameraFollowDelay, systemSettings.gameplaySettings.otherSettings.cameraFollowDelay);

            }
            /* They're in the same room END */
            else {

                /* Go to room START */
                this.disableToolBarAndPlayerMovements = true;

                /* Create blackIn and fade out for scene transition START */
                var blackIn = this.game.add.graphics(0, 0);

                blackIn.beginFill(0x000000, 1);
                
                var i;
                for (i = 0; i < gameData.rooms.length; i++)
                {
                    if ((gameData.rooms[i].id == currentRoom))
                    {
                        blackIn.drawRect(0, 0, gameData.rooms[i].width, gameData.rooms[i].height);
                    }
                }

                blackIn.endFill();
                blackIn.alpha = 0;

                var fadeInBlackTransition = this.game.add.tween(blackIn).to({ alpha: 1 }, 1000, Phaser.Easing.none).start();
                fadeInBlackTransition.onComplete.add( () => {


                    this.destroyNarrationAudio();

                    /* Stop foley sounds START */
                    this.foleySounds.stop();
                    this.foleyFootstepsSounds.stop();
                    /* Stop foley sounds END */


                    /* Record what the previous room id was so that we can position the player correctly when we load up the next room START */
                    previousRoom = currentRoom;
                    /* Record what the previous room id was so that we can position the player correctly when we load up the next room END */

                    /* Set the new room id we are going to START */
                    currentRoom = roomNextPlayerIsIn;
                    /* Set the new room id we are going to END */

                    /* Record the current room id the player is now in START */
                    gameData.playerSettings.currentRoomId = parseInt(currentRoom);
                    /* Record the current room id the player is now in END */

                    currentPlayableCharacterId = thisAvatar.avatarId;

                    this.state.start('RoomPreloader');
                    /* Go to room number END */




                }, this);
                /* Create blackIn and fade out for scene transition END */
            }


        },




        toggleSound: function () {

            this.foleySounds.stop();
            this.foleyFootstepsSounds.stop();
            this.playOpenVolumesSound();
            this.saveGame();
            //this.cancelPlayerWalkingTweenAndSetToIdle(currentPlayableCharacterId);
            this.state.start('Volume');

        },



        goToTextAndSpeechOptions: function () {

            this.foleySounds.stop();
            this.foleyFootstepsSounds.stop();
            this.playOpenTextAndSpeechSound();
            this.saveGame();
            //this.cancelPlayerWalkingTweenAndSetToIdle(currentPlayableCharacterId);
            this.state.start('TextAndSpeech');

        },



        goToSettingsOptions: function () {

            //this.saveGame();
            this.physicalButtonSave(); // Save snapshot

            this.foleySounds.stop();
            this.foleyFootstepsSounds.stop();
            this.playOpenSettingsSound();
            
            //this.cancelPlayerWalkingTweenAndSetToIdle(currentPlayableCharacterId);
            this.state.start('OptionsWithinGame');

        },



        routeFindingAndBoundaries: function () {

            /* Draw walkable area START */
            var i;
            for (i = 0; i < gameData.rooms.length; i++) {
                if ((gameData.rooms[i].id == currentRoom)) {
                    /* Get string from the JSON START */
                    var coordsValues = gameData.rooms[i].walkableArea;
                    var roomWidth = gameData.rooms[i].width;
                    var roomHeight = gameData.rooms[i].height;
                    routeFinderGridIncrement = gameData.rooms[i].routeFinderGridIncrement;

                    var widthIncrement = roomWidth / routeFinderGridIncrement;
                    widthIncrement = widthIncrement | 0;

                    var heightIncrement = roomHeight / routeFinderGridIncrement;
                    heightIncrement = heightIncrement | 0;
                    /* Get string from the JSON END */
                }
            }



            this.walkableAreas = [];
            var i;
            for (i = 0; i < coordsValues.length; i++) {
                var walkableAreaArrayCoords = new Array();
                walkableAreaArrayCoords = JSON.parse("[" + coordsValues[i] + "]");
                this.walkableAreas.push(new Phaser.Polygon(walkableAreaArrayCoords));
            }
            console.log(this.walkableAreas);

            /* Now list out the walkable area in a grid array START */
            this.theBigArrayContainer = [];
            var eachLineArray = [];
            var startingX = 0;
            var startingY = 0;


            var i;
            for (i = 0; i < heightIncrement; i++) {
                var k;
                for (k = 0; k < widthIncrement; k++) {


                    var found = false;

                    var x;
                    for (x = 0; x < this.walkableAreas.length; x++) {
                        
                        if (this.walkableAreas[x].contains(startingX, startingY)) {
                            found = true;
                        }
                    }


                    if ((found == true)) {
                        0 // Its walkable
                        eachLineArray.push(0);
                    }
                    else {
                        1 // Non-accessible
                        eachLineArray.push(1);
                    }



                    /* If we have come to the end of the width, then push this to the big array */
                    if (k == widthIncrement - 1) {
                        this.theBigArrayContainer.push(eachLineArray);

                        /* Then make a new eachLineArray so that we can start the next line */
                        eachLineArray = null;
                        eachLineArray = [];
                    }
                    else {
                        startingX = startingX + routeFinderGridIncrement;
                    }



                }

                startingX = 0;
                startingY = startingY + routeFinderGridIncrement;


            }


            /* Now list out the walkable area in a grid array END */





            /* Draw walkable area END */

        },



        routePlayableCharacter: function (goToX, goToY, type, possibleObject, forPlayableCharacterId, activateEscorting) {

            
             


            /* Only move the player if we have clicked away from 40 pixels distance otherwise the player can suddenly disappear from the scene START */
            var dX = this['player' + forPlayableCharacterId].x - goToX;
            var dY = this['player' + forPlayableCharacterId].y - goToY;
            var numberOfPixelsDistance = Math.sqrt(dX * dX + dY * dY);

            if ((numberOfPixelsDistance < 40)) {
                if ((continueProtocol.convoParams.length > 0)) {
                    this.cancelPlayerWalkingTweenAndSetToIdle(forPlayableCharacterId);
                    this.removeConvoSegmentAndRerun(continueProtocol.convoParams);
                    return false;
                }
                if ((type == "playerableCharacter")) {
                    this.activatePlayerableCharactersInteraction(possibleObject);
                }
                if ((type == "npc")) {
                    this.activateNpcsInteraction(possibleObject);
                }
                if ((type == "targetZone")) {
                    this.activateTargetZonesInteraction(possibleObject);
                }
                if ((type == "items")) {
                    this.activateInventorySceneItemClickedOn(possibleObject);
                }
                return false;
            }
            /* Only move the player if we have clicked away from 40 pixels distance otherwise the player can suddenly disappear from the scene END */


            /* Round the full whole co-ordinate value down to a multiple of 50 and then divide it by 50 so that we can work it out later START */
            var calculateCurrentLocationGridPositionX = Math.round(this['player' + forPlayableCharacterId].x / routeFinderGridIncrement) * routeFinderGridIncrement;
            calculateCurrentLocationGridPositionX = calculateCurrentLocationGridPositionX / routeFinderGridIncrement;
            var calculateCurrentLocationGridPositionY = Math.round(this['player' + forPlayableCharacterId].y / routeFinderGridIncrement) * routeFinderGridIncrement;
            calculateCurrentLocationGridPositionY = calculateCurrentLocationGridPositionY / routeFinderGridIncrement;

            var calculateDestinationGridPositionX = Math.round(goToX / routeFinderGridIncrement) * routeFinderGridIncrement;
            calculateDestinationGridPositionX = calculateDestinationGridPositionX / routeFinderGridIncrement;
            var calculateDestinationGridPositionY = Math.round(goToY / routeFinderGridIncrement) * routeFinderGridIncrement;
            calculateDestinationGridPositionY = calculateDestinationGridPositionY / routeFinderGridIncrement;
            /* Round the full whole co-ordinate value down to a multiple of 50 and then divide it by 50 so that we can work it out later END */


            /* Now activate easystar and get the co-ordinates route START */
            var easystar = new EasyStar.js();
            var level = this.theBigArrayContainer;
            easystar.setGrid(level);

            easystar.setAcceptableTiles([0]);
            easystar.enableDiagonals();


            /* My own code - Make 2 new arrays, one for X plot points and other for Y START */




            




            /* My own code - Make 2 new arrays, one for X plot points and other for Y END */

            easystar.findPath(calculateCurrentLocationGridPositionX, calculateCurrentLocationGridPositionY, calculateDestinationGridPositionX, calculateDestinationGridPositionY, (path) => {

                
                if ((this.closingScene == true))
                {
                    return false;
                }



                if (path === null) {
                    console.log("The path to the destination point was not found.");
                }
                else {

                    var xPoints = [];
                    var yPoints = [];

                    for (var i = 0; i < path.length; i++) {
                        xPoints.push(path[i].x * routeFinderGridIncrement);
                        yPoints.push(path[i].y * routeFinderGridIncrement);
                    }

                    /* Now remove the first values of both arrays otherwise the player will be walking on the spot briefly START */
                    xPoints.shift();
                    yPoints.shift();
                    /* Now remove the first values of both arrays otherwise the player will be walking on the spot briefly END */











                    /* Calculate how long it should take to have an evenly timed pace to the new area START */
                    /*var overallDistance = xPoints.length * routeFinderGridIncrement;

                    if ((this['player' + forPlayableCharacterId].y > goToY))
                    {
                        var yDistanceForThePlayer = this['player' + forPlayableCharacterId].y - goToY;
                    }
                    else
                    {
                        var yDistanceForThePlayer = goToY - this['player' + forPlayableCharacterId].y;
                    }

                    
                    var numberOfPixelsToTravelAtPerSecond = 280 - yDistanceForThePlayer;
                    var playerSpeedTime = (overallDistance / numberOfPixelsToTravelAtPerSecond) * 1000;*/


                    var overallDistance = xPoints.length * routeFinderGridIncrement;
                    var numberOfPixelsToTravelAtPerSecond = this['player' + forPlayableCharacterId].numberOfPixelsToTravelAtPerSecond;
                    var playerSpeedTime = (overallDistance / numberOfPixelsToTravelAtPerSecond) * 1000;
                    /* Calculate how long it should take to have an evenly timed pace to the new area END */






                    /* Start the tween START */
                    //this.cancelWalkingFollowers(forPlayableCharacterId);
                    this.cancelPlayerWalkingTweenAndSetToIdle(forPlayableCharacterId);
                    this.playDefaultPlayableCharactersFootstepsSound(forPlayableCharacterId);
                    this['player' + forPlayableCharacterId].playingWalkingSignal = true;


                    /* Permit any escorting on start to occur now START */
                    if ((type != "playerableCharacter") && (this.disableToolBarAndPlayerMovements == false) && (activateEscorting == true))
                    {
                        this.activateEscortingOnWalkStart(goToX, goToY, forPlayableCharacterId);
                    }
                    /* Permit any escorting on start to occur now END */
                    
                    
                    this['playerWalking' + forPlayableCharacterId] = game.add.tween(this['player' + forPlayableCharacterId]);
                    this['playerWalking' + forPlayableCharacterId].destinationX = goToX;
                    this['playerWalking' + forPlayableCharacterId].destinationY = goToY;
                    this['playerWalking' + forPlayableCharacterId].speedTimeAmended = false;
                    this['playerWalking' + forPlayableCharacterId].onComplete.add(function () {

                        // Only make the followers follow if you are NOT giving them something
                        if ((type != "playerableCharacter") && (this.disableToolBarAndPlayerMovements == false) && (activateEscorting == true))
                        {
                            this.activateEscortingOnWalkEnd(forPlayableCharacterId);
                        }

                        this.cancelPlayerWalkingTweenAndSetToIdle(forPlayableCharacterId);

                        /* Check to see if a protocol is running this START */
                        if ((continueProtocol.convoParams.length > 0)) {
                            this.removeConvoSegmentAndRerun(continueProtocol.convoParams);
                            return false;
                        }
                        /* Check to see if a protocol is running this END */

                        if ((type == "playerableCharacter")) {
                            this.activatePlayerableCharactersInteraction(possibleObject);
                        }

                        if ((type == "npc")) {
                            this.activateNpcsInteraction(possibleObject);
                        }

                        if ((type == "targetZone")) {
                            this.activateTargetZonesInteraction(possibleObject);
                        }

                        if ((type == "items")) {
                            this.activateInventorySceneItemClickedOn(possibleObject);
                        }

                        if ((type == "none")) {

                            /* Save current players x and y co-ords so on restart we know exactly how they were positioned START */
                            var i;
                            for (i = 0; i < gameData.playerSettings.playableCharacters.length; i++) {
                                if ((gameData.playerSettings.playableCharacters[i].id == forPlayableCharacterId)) {
                                    gameData.playerSettings.playableCharacters[i].position.x = this['player' + forPlayableCharacterId].x;
                                    gameData.playerSettings.playableCharacters[i].position.y = this['player' + forPlayableCharacterId].y;
                                }
                            }
                            /* Save current players x and y co-ords so on restart we know exactly how they were positioned END */
                        }



                    }, this);



                    this['playerWalking' + forPlayableCharacterId].to({ x: xPoints, y: yPoints }, playerSpeedTime, Phaser.Easing.None);

                    this['playerWalking' + forPlayableCharacterId].start();

                    


                    /* Now start the animation END */

                }
            });

            easystar.calculate();



            /* Now activate easystar and get the co-ordinates route END */










        },







        routeNpcCharacter: function (goToX, goToY, forNpcCharacterId, convoParams) {


            


            /* Only move the player if we have clicked away from 40 pixels distance otherwise the player can suddenly disappear from the scene START */
            var dX = this['npc' + forNpcCharacterId].x - goToX;
            var dY = this['npc' + forNpcCharacterId].y - goToY;
            var numberOfPixelsDistance = Math.sqrt(dX * dX + dY * dY);

            if ((numberOfPixelsDistance < 40)) {
                if ((convoParams.length > 0)) {
                    this.cancelNpcWalkingTweenAndSetToIdle(forNpcCharacterId);
                    this.removeConvoSegmentAndRerun(convoParams);
                    return false;
                }
                
                return false;
            }
            /* Only move the player if we have clicked away from 40 pixels distance otherwise the player can suddenly disappear from the scene END */


            /* Round the full whole co-ordinate value down to a multiple of 50 and then divide it by 50 so that we can work it out later START */
            var calculateCurrentLocationGridPositionX = Math.round(this['npc' + forNpcCharacterId].x / routeFinderGridIncrement) * routeFinderGridIncrement;
            calculateCurrentLocationGridPositionX = calculateCurrentLocationGridPositionX / routeFinderGridIncrement;
            var calculateCurrentLocationGridPositionY = Math.round(this['npc' + forNpcCharacterId].y / routeFinderGridIncrement) * routeFinderGridIncrement;
            calculateCurrentLocationGridPositionY = calculateCurrentLocationGridPositionY / routeFinderGridIncrement;

            var calculateDestinationGridPositionX = Math.round(goToX / routeFinderGridIncrement) * routeFinderGridIncrement;
            calculateDestinationGridPositionX = calculateDestinationGridPositionX / routeFinderGridIncrement;
            var calculateDestinationGridPositionY = Math.round(goToY / routeFinderGridIncrement) * routeFinderGridIncrement;
            calculateDestinationGridPositionY = calculateDestinationGridPositionY / routeFinderGridIncrement;
            /* Round the full whole co-ordinate value down to a multiple of 50 and then divide it by 50 so that we can work it out later END */


            /* Now activate easystar and get the co-ordinates route START */
            var easystar = new EasyStar.js();
            var level = this.theBigArrayContainer;
            easystar.setGrid(level);

            easystar.setAcceptableTiles([0]);
            easystar.enableDiagonals();


            /* My own code - Make 2 new arrays, one for X plot points and other for Y START */




            




            /* My own code - Make 2 new arrays, one for X plot points and other for Y END */

            easystar.findPath(calculateCurrentLocationGridPositionX, calculateCurrentLocationGridPositionY, calculateDestinationGridPositionX, calculateDestinationGridPositionY, (path) => {

                if ((this.closingScene == true))
                {
                    return false;
                }

                if (path === null) {
                    console.log("The path to the destination point was not found.");
                }
                else {

                    var xPoints = [];
                    var yPoints = [];

                    for (var i = 0; i < path.length; i++) {
                        xPoints.push(path[i].x * routeFinderGridIncrement);
                        yPoints.push(path[i].y * routeFinderGridIncrement);
                    }

                    /* Now remove the first values of both arrays otherwise the player will be walking on the spot briefly START */
                    xPoints.shift();
                    yPoints.shift();
                    /* Now remove the first values of both arrays otherwise the player will be walking on the spot briefly END */











                    


                    var overallDistance = xPoints.length * routeFinderGridIncrement;
                    var numberOfPixelsToTravelAtPerSecond = this['npc' + forNpcCharacterId].numberOfPixelsToTravelAtPerSecond;
                    var playerSpeedTime = (overallDistance / numberOfPixelsToTravelAtPerSecond) * 1000;


                    /* Calculate how long it should take to have an evenly timed pace to the new area END */






                    /* Start the tween START */
                    
                    this.cancelNpcWalkingTweenAndSetToIdle(forNpcCharacterId);
                    this.playDefaultNpcCharactersFootstepsSound(forNpcCharacterId);
                    this['npc' + forNpcCharacterId].playingWalkingSignal = true;
                    
                    
                    this['npcWalking' + forNpcCharacterId] = game.add.tween(this['npc' + forNpcCharacterId]);
                    this['npcWalking' + forNpcCharacterId].onComplete.add(function () {

                        
                        this.cancelNpcWalkingTweenAndSetToIdle(forNpcCharacterId);
                        

                        /* Check to see if a protocol is running this START */
                        if ((convoParams.length > 0)) {
                            this.removeConvoSegmentAndRerun(convoParams);
                            return false;
                        }
                        /* Check to see if a protocol is running this END */

                        



                    }, this);



                    this['npcWalking' + forNpcCharacterId].to({ x: xPoints, y: yPoints }, playerSpeedTime, Phaser.Easing.None);

                    this['npcWalking' + forNpcCharacterId].start();



                    /* Now start the animation END */

                }
            });

            easystar.calculate();



            /* Now activate easystar and get the co-ordinates route END */










        },



        cancelNpcWalkingTweenAndSetToIdle: function (forNpcCharacterId) {

            this.stopNpcCharactersFootstepsSound(forNpcCharacterId);
            this['npc' + forNpcCharacterId].playingWalkingSignal = false;
            this.game.tweens.remove(this['npcWalking' + forNpcCharacterId]);

        /* If player is already walking, cancel that tween and then perform it again START */

        if ((this['npc' + forNpcCharacterId].animations.currentAnim.name == "npc" + forNpcCharacterId + 16) /* Walk Left */ || (this['npc' + forNpcCharacterId].animations.currentAnim.name == "npc" + forNpcCharacterId + 14) /* Walk Back */ || (this['npc' + forNpcCharacterId].animations.currentAnim.name == "npc" + forNpcCharacterId + 17) /* Walk Right */ || (this['npc' + forNpcCharacterId].animations.currentAnim.name == "npc" + forNpcCharacterId + 15)) /* Walk Front */ {
            
            /* Set the player to idle START */
            this.setNpcAnimation(7, forNpcCharacterId); //Idle Front
            /* Set the player to idle END */

        }

        /* If player is already walking, cancel that tween and then perform it again END */




    },




        backgroundMusicSetup: function () {

            /* Set music START */

            /* If any music is currently playing START */
            if ((backgroundMusic != null)) {

                var i;
                for (i = 0; i < gameData.rooms.length; i++) {
                    if ((gameData.rooms[i].id == currentRoom)) {
                        if ((backgroundMusic.name == "backgroundMusic"+gameData.rooms[i].music.musicId)) {
                            // Do nothing, just let the same music play and don't let the function continue any further
                            return false;
                        }

                    }
                }

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
            /* If any music is currently playing END */

            /* Now set the new music into place START */
            var i;
            for (i = 0; i < gameData.rooms.length; i++) {

                if ((gameData.rooms[i].id == currentRoom) && (gameData.rooms[i].music.musicId != null)) {
                    backgroundMusic = this.game.add.audio("backgroundMusic"+gameData.rooms[i].music.musicId);
                    backgroundMusic.volume = userSettings.volumes.musicVolume;
                    backgroundMusic.loop = gameData.rooms[i].music.musicLoop;
                    backgroundMusic.play();
                }
            }
            /* Now set the new music into place END */
            /* Set music END */

        },


        saveGame: function () {

            /* We use local storage as they might close all their windows down and we don't want them losing their progress just because of that START */
            /* Only save when we are outside a conversation with NPCs as various parameters in gamedata are changed temporarily during conversations and we dont want to save things if its in that process */

            if ((this.inventoryBoxOpen == false) && (this.disableToolBarAndPlayerMovements == false)) {
                console.log("saved");

                previousGamesExist = true;

                /* Save all current game progress START */
                /* Also save player position START */
                var i;
                for (i = 0; i < gameData.playerSettings.playableCharacters.length; i++) {
                    if ((gameData.playerSettings.playableCharacters[i].currentRoomId == currentRoom) && (this['player' + gameData.playerSettings.playableCharacters[i].id] != null)) {
                        gameData.playerSettings.playableCharacters[i].position.x = this['player' + gameData.playerSettings.playableCharacters[i].id].x;
                        gameData.playerSettings.playableCharacters[i].position.y = this['player' + gameData.playerSettings.playableCharacters[i].id].y;
                    }
                }
                /* Also save player position END */

                gameData.playerSettings.currentRoomId = currentRoom;
                gameData.playerSettings.currentPlayableCharacterId = currentPlayableCharacterId;
                /* Save all current game progress END */



                /* Save a screenshot of their current game START */
                var currentGameContainer = document.getElementsByTagName("canvas");
                var dataImageURL = currentGameContainer[0].toDataURL("image/jpeg", 0.5);
                
                
                var dataToSave = {
                    "screenshot": dataImageURL,
                    "lastSaved": new Date(),
                    "gameData": gameData
                };
                /* Save back the date and time we saved the game END */



                

                
                
                // Lets get the current gamedata from the indexedb
                var db = new Dexie(gameDataLocalStorageName);
						db.version(1).stores({
							myData: "gameData"
						});
						db.myData.toArray().then(function (results) {
                            console.log(results);
                            var currentGameDataArray = results[0];

                            currentGameDataArray.splice(0,1,dataToSave);
                            console.log(currentGameDataArray);

                            console.log(currentPlayableCharacterId);


                            var db2 = new Dexie(gameDataLocalStorageName);
                            db2.version(1).stores({
                                myData: ""
                            });
                            db2.myData.put(currentGameDataArray, 'gameData');

                        });
                        



                    
                    
                    
                
            }

            /* We use local storage as they might close all their windows down and we don't want them losing their progress just because of that END */


        },



        physicalButtonSave: function () {

            this.cancelPlayerWalkingTweenAndSetToIdle(currentPlayableCharacterId);

            /* We use local storage as they might close all their windows down and we don't want them losing their progress just because of that START */
            /* Only save when we are outside a conversation with NPCs as various parameters in gamedata are changed temporarily during conversations and we dont want to save things if its in that process */

            if ((this.inventoryBoxOpen == false) && (this.disableToolBarAndPlayerMovements == false)) {
                console.log("saved");

                //this.playSaveAndLoadSound();

                /* Save all current game progress START */
                /* Also save player position START */
                var i;
                for (i = 0; i < gameData.playerSettings.playableCharacters.length; i++) {
                    if ((gameData.playerSettings.playableCharacters[i].currentRoomId == currentRoom) && (this['player' + gameData.playerSettings.playableCharacters[i].id] != null)) {
                        gameData.playerSettings.playableCharacters[i].position.x = this['player' + gameData.playerSettings.playableCharacters[i].id].x;
                        gameData.playerSettings.playableCharacters[i].position.y = this['player' + gameData.playerSettings.playableCharacters[i].id].y;
                    }
                }
                /* Also save player position END */

                gameData.playerSettings.currentRoomId = currentRoom;
                gameData.playerSettings.currentPlayableCharacterId = currentPlayableCharacterId;
                /* Save all current game progress END */



                /* Save a screenshot of their current game START */
                var currentGameContainer = document.getElementsByTagName("canvas");
                var dataImageURL = currentGameContainer[0].toDataURL("image/jpeg", 0.5);
                
                gameSnapshot = {
                    "screenshot": dataImageURL,
                    "lastSaved": new Date(),
                    "gameData": gameData
                };
                /* Save back the date and time we saved the game END */


                //this.state.start('SaveOrLoadGameSlot');
                    
                    
                
            }

            /* We use local storage as they might close all their windows down and we don't want them losing their progress just because of that END */


        },






        closeCompass: function () {

            if ((this.compass != null)) {
                this.compass.destroy();
                this.compassOptionsGroup.destroy();
            }

        },




        playerableCharactersSetNounAndWalkingRoute: function (possibleObject) {

            console.log("xxxxx");


            this.closeCompass();


            
                

            if ((this['player' + possibleObject.id].x < this['player' + currentPlayableCharacterId].x)) {
                var calculatedPositions = this.getNearestAvailableCoordinatesToPlayableCharacter(this['player' + possibleObject.id].x, this['player' + possibleObject.id].y, "right", 0, 100);
            }
            else {
                var calculatedPositions = this.getNearestAvailableCoordinatesToPlayableCharacter(this['player' + possibleObject.id].x, this['player' + possibleObject.id].y, "left", 0, 100);
            }

                    

                    /* Set the npcs name at the top of the screen START */
                    var i;
                    for (i = 0; i < gameData.playerSettings.playableCharacters.length; i++) {
                        if ((gameData.playerSettings.playableCharacters[i].id == possibleObject.id)) {
                            this.setCurrentActionNoun = gameData.playerSettings.playableCharacters[i].languages[currentLang].name;
                        }
                    }
                    this.currentActionModeText.fill = "#ffff00";
                    /* Set the npcs name at the top of the screen END */

                    this.routePlayableCharacter(calculatedPositions.x, calculatedPositions.y, "playerableCharacter", possibleObject, currentPlayableCharacterId, true);

                
            


        },


        getNearestAvailableCoordinatesToPlayableCharacter: function (destinationX, destinationY, side, angle, distance){

            

            var result = {
                "x": 0,
                "y": 0
            };

            if ((side == "right"))
            {
                distance = Math.abs(distance) //Positive figure
            }
            else
            {
                distance = -Math.abs(distance) //Positive figure
            }
                
                var calculatedX = Math.cos(angle) * distance + destinationX;
                var calculatedY = Math.sin(angle) * distance + destinationY;



                var found = false;

                var x;
                for (x = 0; x < this.walkableAreas.length; x++) {
                    if (this.walkableAreas[x].contains(calculatedX, calculatedY)) {
                        found = true;
                    }
                }

                /* Check to see if this point falls within the walkable area START */
                if ((found == true))
                {
                    result.x = calculatedX;
                    result.y = calculatedY;
                    return result;
                }
                /* Check to see if this point falls within the walkable area START */
                else
                {
                    return this.getNearestAvailableCoordinatesToPlayableCharacter(destinationX, destinationY, side, angle + 20, distance);
                }

            


            

        },




        npcsSetNounAndWalkingRoute: function (possibleObject) {



            this.closeCompass();




            var i;
            for (i = 0; i < gameData.rooms.length; i++) {
                if ((gameData.rooms[i].id == currentRoom)) {
                    var k;
                    for (k = 0; k < gameData.rooms[i].npc.length; k++) {
                        if ((gameData.rooms[i].npc[k].id == possibleObject.id)) {
                            var calculatedXPos = gameData.rooms[i].npc[k].playerInteractPosition.x;
                            var calculatedYPos = gameData.rooms[i].npc[k].playerInteractPosition.y;

                            /* Set the npcs name at the top of the screen START */
                            var relationshipTermId = gameData.rooms[i].npc[k].relationshipTermId;

                            var x;
                            for (x = 0; x < gameData.rooms[i].npc[k].relationTerms.length; x++) {

                                if ((gameData.rooms[i].npc[k].relationTerms[x].id == relationshipTermId)) {
                                    this.setCurrentActionNoun = gameData.rooms[i].npc[k].relationTerms[x].languages[currentLang].name;
                                }

                            }

                            this.currentActionModeText.fill = "#ffff00";
                            /* Set the npcs name at the top of the screen END */

                            
                            this.routePlayableCharacter(calculatedXPos, calculatedYPos, "npc", possibleObject, currentPlayableCharacterId, true);
                        }
                    }
                }
            }


        },



        targetZonesSetNounAndWalkingRoute: function (possibleObject) {



            this.closeCompass();



            var i;
            for (i = 0; i < gameData.rooms.length; i++) {
                if ((gameData.rooms[i].id == currentRoom)) {
                    var k;
                    for (k = 0; k < gameData.rooms[i].targetZones.length; k++) {
                        if ((gameData.rooms[i].targetZones[k].id == possibleObject.id)) {
                            var calculatedXPos = gameData.rooms[i].targetZones[k].playerInteractPosition.x;
                            var calculatedYPos = gameData.rooms[i].targetZones[k].playerInteractPosition.y;

                            /* Now set the target zone name at the top of the screen START */
                            var currentStateLevel = gameData.rooms[i].targetZones[k].stateId;
                            var x;
                            for (x = 0; x < gameData.rooms[i].targetZones[k].states.length; x++) {

                                if ((gameData.rooms[i].targetZones[k].states[x].id == currentStateLevel)) {
                                    this.setCurrentActionNoun = gameData.rooms[i].targetZones[k].states[x].languages[currentLang].name;
                                }

                            }
                            this.currentActionModeText.fill = "#ffff00";
                            /* Now set the target zone name at the top of the screen END */

                            this.routePlayableCharacter(calculatedXPos, calculatedYPos, "targetZone", possibleObject, currentPlayableCharacterId, true);
                        }
                    }
                }
            }


        },



        itemsSetNounAndWalkingRoute: function (possibleObject) {

            this.closeCompass();

            var i;
            for (i = 0; i < gameData.inventoryBox.length; i++) {
                if ((gameData.inventoryBox[i].id == possibleObject.id)) {

                    var calculatedXPos = gameData.inventoryBox[i].pickUpOnSceneDetails.playerInteractPosition.x;
                    var calculatedYPos = gameData.inventoryBox[i].pickUpOnSceneDetails.playerInteractPosition.y;

                    /* Now set the target zone name at the top of the screen START */
                    this.setCurrentActionNoun = gameData.inventoryBox[i].languages[currentLang].name;
                    this.currentActionModeText.fill = "#ffff00";
                    /* Now set the target zone name at the top of the screen END */

                    this.routePlayableCharacter(calculatedXPos, calculatedYPos, "items", possibleObject, currentPlayableCharacterId, true);

                }
            }



        },



        acquirePlayableCharactersCurrentGroupAnimationId: function(playerId){
            var result = null;


            var i;
            for (i = 0; i < gameData.playerSettings.playableCharacters.length; i++)
            {

                if ((gameData.playerSettings.playableCharacters[i].id == playerId))
                {
                    result = gameData.playerSettings.playableCharacters[i].currentGroupAnimationId;
                }
                
            }

            return result;

        },


        


        doesPlayerCharacterBelongToRoom(characterId)
        {
            var result = false;

            var i;
            for (i = 0; i < gameData.playerSettings.playableCharacters.length; i++)
            {

                if ((gameData.playerSettings.playableCharacters[i].currentRoomId == currentRoom) && (gameData.playerSettings.playableCharacters[i].id == characterId))
                {
                    result = true;
                }
                
            }

            return result;
        },



        cancelWalkingFollowers: function (leaderId){

            var i;
            for (i = 0; i < gameData.escort.length; i++) {
                if ((gameData.escort[i].available == true) && (gameData.escort[i].leaderCharacterId == leaderId)) {
                    var k;
                    for (k = 0; k < gameData.escort[i].followerCharacterIds.length; k++) {

                        var followerId = gameData.escort[i].followerCharacterIds[k];

                        if ((this['player' + followerId] != null) && (this.doesPlayerCharacterBelongToRoom(followerId) == true))
                        {
                            this.cancelPlayerWalkingTweenAndSetToIdle(gameData.escort[i].followerCharacterIds[k]);
                        }
                        
                    }
                }
            }
        },



        activateEscortingOnWalkStart: function (destinationX, destinationY, leaderCharacterId){

            

            var i;
            for (i = 0; i < gameData.escort.length; i++) {
                console.log("bb");
                if ((gameData.escort[i].available == true) && (gameData.escort[i].type == 0) && (gameData.escort[i].leaderCharacterId == currentPlayableCharacterId)) {

                    

                    var k;
                    for (k = 0; k < gameData.escort[i].followerCharacterIds.length; k++) {

                            var followerId = gameData.escort[i].followerCharacterIds[k];

                            if ((this['player' + followerId] != null) && (this.doesPlayerCharacterBelongToRoom(followerId) == true))
                            {
                            
                                if ((destinationX < this['player' + followerId].x)) {
                                    var calculatedPositions = this.getNearestAvailableCoordinatesToPlayableCharacter(destinationX, destinationY, "right", 0, gameData.escort[i].distanceAwayFromLeader);
                                }
                                else {
                                    var calculatedPositions = this.getNearestAvailableCoordinatesToPlayableCharacter(destinationX, destinationY, "left", 0, gameData.escort[i].distanceAwayFromLeader);
                                }
                    
                                

                                // Only trigger walk for follower if they're not already walking, otherwise we tinker with that in the update method
                                this.game.time.events.add(gameData.escort[i].followersWalkingDelay, this.routePlayableCharacter, this, calculatedPositions.x, calculatedPositions.y, "none", null, followerId, false);
                                

                            }

                        
                    }
                }
            }
        },
        

        activateEscortingOnWalkEnd: function (leaderCharacterId){

            var i;
            for (i = 0; i < gameData.escort.length; i++) {
                console.log("bb");
                if ((gameData.escort[i].available == true) && (gameData.escort[i].type == 1) && (gameData.escort[i].leaderCharacterId == currentPlayableCharacterId)) {
                    var k;
                    for (k = 0; k < gameData.escort[i].followerCharacterIds.length; k++) {

                        
                            var destinationX = this['player' + gameData.escort[i].leaderCharacterId].x;
                            var destinationY = this['player' + gameData.escort[i].leaderCharacterId].y;
                            var followerId = gameData.escort[i].followerCharacterIds[k];

                            if ((this['player' + followerId] != null) && (this.doesPlayerCharacterBelongToRoom(followerId) == true))
                            {
                            
                                if ((destinationX < this['player' + followerId].x)) {
                                    var calculatedPositions = this.getNearestAvailableCoordinatesToPlayableCharacter(destinationX, destinationY, "right", 0, gameData.escort[i].distanceAwayFromLeader);
                                }
                                else {
                                    var calculatedPositions = this.getNearestAvailableCoordinatesToPlayableCharacter(destinationX, destinationY, "left", 0, gameData.escort[i].distanceAwayFromLeader);
                                }
                    
                                
                                this.game.time.events.add(gameData.escort[i].followersWalkingDelay, this.routePlayableCharacter, this, calculatedPositions.x, calculatedPositions.y, "none", null, followerId, false);
                                
                                

                            }

                        
                    }
                }
            }
        },


        assignEscortFollowersToNextRoom: function (roomId, targetZoneId){

            

            var i;
            for (i = 0; i < gameData.escort.length; i++) {
                
                if ((gameData.escort[i].available == true)) {
                    var k;
                    for (k = 0; k < gameData.escort[i].followerCharacterIds.length; k++) {

                            var followerId = gameData.escort[i].followerCharacterIds[k];

                            if ((this['player' + followerId] != null) && (currentPlayableCharacterId == gameData.escort[i].leaderCharacterId))
                            {
                            
                                var z;
                                for (z = 0; z < gameData.playerSettings.playableCharacters.length; z++) {
                                    if ((gameData.playerSettings.playableCharacters[z].id == followerId)) {
                                        gameData.playerSettings.playableCharacters[z].currentRoomId = roomId;
                                        gameData.playerSettings.playableCharacters[z].position = getTargetZonePlayerInteractionCoords(currentRoom, targetZoneId);
                                    }
                                }
                                
                            }

                        
                    }
                }
            }
        },



        determineCompassPosition(x,y){

            var result = {
                "x": x+this.game.camera.x,
                "y": y+this.game.camera.y
            }

            if ((x < systemSettings.gameplaySettings.formatOptions.compassPositions.minX))
            {
                result.x = systemSettings.gameplaySettings.formatOptions.compassPositions.minX + this.game.camera.x;
            }

            if ((x > systemSettings.gameplaySettings.formatOptions.compassPositions.maxX))
            {
                result.x = systemSettings.gameplaySettings.formatOptions.compassPositions.maxX + this.game.camera.x;
            }

            if ((y < systemSettings.gameplaySettings.formatOptions.compassPositions.minY))
            {
                result.y = systemSettings.gameplaySettings.formatOptions.compassPositions.minY + this.game.camera.y;
            }

            if ((y > systemSettings.gameplaySettings.formatOptions.compassPositions.maxY))
            {
                result.y = systemSettings.gameplaySettings.formatOptions.compassPositions.maxY + this.game.camera.y;
            }

            console.log(x);
            console.log(y);
            console.log(result);
            console.log(systemSettings.gameplaySettings.formatOptions.compassPositions);

            return result;
        },



        flashUpCurrentVerbIconAndMovePlayer: function (possibleObject/*, specifiedX, specifiedY*/) {

            

            console.log(gameData);

            


            /* Workout if the player is allowed to interact with the game START */
            if ((this.disableToolBarAndPlayerMovements == true) || (this.inventoryBoxOpen == true)) {
                return false;
            }
            /* Workout if the player is allowed to interact with the game END */




            this.closeCompass();




            this.cancelPlayerWalkingTweenAndSetToIdle(currentPlayableCharacterId);



            /* Prevent the bug happening where if the user clicks in the exact same area the player will vanish START */
            /*if ((this.game.input.x == this.lastUserXInput) && (this.game.input.y == this.lastUserYInput)) {
                return false;
            }
            this.lastUserXInput = this.game.input.x;
            this.lastUserYInput = this.game.input.y;*/
            /* Prevent the bug happening where if the user clicks in the exact same area the player will vanish END */


            /* FLASH UP ICON START */
            /* Set the icon to be at the temporary co-ords of the input for the animation START */

            this.icon = this.game.add.sprite(this.game.input.x, this.game.input.y, 'tapPointer');


            this.icon.anchor.x = Math.round(this.icon.width * 0.5) / this.icon.width;
            this.icon.anchor.y = Math.round(this.icon.height * 0.5) / this.icon.height;

            this.icon.x = this.game.input.x + this.game.camera.x;
            this.icon.y = this.game.input.y + this.game.camera.y;

            this.icon.scale.set(0.5, 0.5);
            /* Set the icon to be at the temporary co-ords of the input for the animation END */


            /* Now perform animation START */
            var animBlip01 = this.game.add.tween(this.icon).to({ alpha: 0 }, 300);
            var animBlip02 = this.game.add.tween(this.icon.scale).to({ x: 1.2, y: 1.2 }, 300);
            animBlip01.start();
            animBlip02.start();

            animBlip01.onComplete.add(function () {

                this.icon.destroy();

            }, this);
            /* Now perform animation END */
            /* FLASH UP ICON END */









            /* MOVE PLAYER START */


            /* If another playable character was clicked on START */
            if ((possibleObject.callbackFunction == "playerableCharacterInteraction") && (possibleObject.id != currentPlayableCharacterId) && (possibleObject.ignore == false)) {


                if ((this.currentlySelectedItemName == "") && (this.currentlySelectedItemRef == "")) {

                    this.playOpenOptionsForPointsOfInterestSound();





                    var compassX = this.determineCompassPosition(this.game.input.x,this.game.input.y).x;
                    var compassY = this.determineCompassPosition(this.game.input.x,this.game.input.y).y;
                    



                    /* Do some calculation of how we would show the compass START */
                    this.compass = this.game.add.sprite(compassX, compassY, 'compassNavBackground');
                    this.compass.anchor.x = Math.round(this.compass.width * 0.5) / this.compass.width;
                    this.compass.anchor.y = Math.round(this.compass.height * 0.5) / this.compass.height;
                    this.compass.alpha = 0;
                    var animCompassBackground = this.game.add.tween(this.compass).to({ alpha: 1 }, 300);
                    animCompassBackground.start();

                    var toRadians = Math.PI / 180;
                    var requiredAngle = -90 * toRadians;
                    var halfWidthOfBigCircle = 76;
                    var spreadAmount = 3;
                    var angleIncrement = (360 / spreadAmount) * toRadians;

                    var optionsRefArray = ["lookAt", "walkTo", "talkTo"];
                    var optionsNameArray = [acquireSystemText("lookAt"), acquireSystemText("walkTo"), acquireSystemText("talkTo")];

                    this.compassOptionsGroup = this.game.add.group();

                    var k;
                    for (k = 0; k < optionsRefArray.length; k++) {


                        var optionDestinationX = compassX + Math.cos(requiredAngle) * halfWidthOfBigCircle;
                        var optionDestinationY = compassY + Math.sin(requiredAngle) * halfWidthOfBigCircle;

                        this.option = this.game.add.sprite(compassX, compassY, optionsRefArray[k]);
                        this.option.anchor.x = Math.round(this.option.width * 0.5) / this.option.width;
                        this.option.anchor.y = Math.round(this.option.height * 0.5) / this.option.height;
                        this.option.alpha = 0;

                        this.option.compRef = optionsRefArray[k];
                        this.option.friendlyRef = optionsNameArray[k];

                        this.option.inputEnabled = true;
                        this.option.events.onInputDown.add(this.setCurrentActionVerbFunction, this);
                        this.option.events.onInputDown.add(function () { this.playerableCharactersSetNounAndWalkingRoute(possibleObject) }, this);

                        this.compassOptionsGroup.add(this.option);

                        /* Do animation START */
                        var animOptionAlpha = this.game.add.tween(this.option).to({ alpha: 1 }, 200);
                        var animOptionMove = this.game.add.tween(this.option).to({ x: optionDestinationX, y: optionDestinationY }, 200, Phaser.Easing.Exponential.Out);
                        animOptionAlpha.start();
                        animOptionMove.start();
                        /* Do animation END */


                        requiredAngle = requiredAngle + angleIncrement;


                    };


                    /* Do some calculation of how we would show the compass END */
                }
                else {
                    this.playerableCharactersSetNounAndWalkingRoute(possibleObject);
                }


                return false;



            }
            /* If another playable character was clicked on END */



            /* If an npc was clicked on START */
            if ((possibleObject.callbackFunction == "npcsInteraction") && (possibleObject.ignore == false)) {


                    var optionsRefArray = ["lookAt", "walkTo"];
                    var optionsNameArray = [acquireSystemText("lookAt"), acquireSystemText("walkTo")];

                    /* COMBOS START */
                    var i;
                    for (i = 0; i < gameData.rooms.length; i++) {
                        if ((gameData.rooms[i].id == currentRoom)) {
                            var k;
                            for (k = 0; k < gameData.rooms[i].npc.length; k++) {
                                if ((gameData.rooms[i].npc[k].id == possibleObject.id)) {
                                    
    
    
                                        var x;
                                        for (x = 0; x < gameData.rooms[i].npc[k].itemAndActionCombinations.length; x++) {
    
                                            if ((gameData.rooms[i].npc[k].itemAndActionCombinations[x].available == true && gameData.rooms[i].npc[k].itemAndActionCombinations[x].appliesToAllPlayableCharacters == true) || (gameData.rooms[i].npc[k].itemAndActionCombinations[x].available == true && gameData.rooms[i].npc[k].itemAndActionCombinations[x].appliesToPlayableCharacterIds.indexOf(currentPlayableCharacterId) >= 0))
                                            {
                                                /*if ((gameData.rooms[i].npc[k].itemAndActionCombinations[x].actionRequired.indexOf("give") > -1) && (optionsRefArray.includes("give")) === false) {
                                                    optionsRefArray.push("give");
                                                    optionsNameArray.push(acquireSystemText("give"));
                                                }
                                                if ((gameData.rooms[i].npc[k].itemAndActionCombinations[x].actionRequired.indexOf("use") > -1) && (optionsRefArray.includes("use")) === false) {
                                                    optionsRefArray.push("use");
                                                    optionsNameArray.push(acquireSystemText("use"));
                                                }*/
                                                if ((gameData.rooms[i].npc[k].itemAndActionCombinations[x].actionRequired.indexOf("pickUp") > -1) && (optionsRefArray.includes("pickUp")) === false) {
                                                    optionsRefArray.push("pickUp");
                                                    optionsNameArray.push(acquireSystemText("pickUp"));
                                                }
                                                if ((gameData.rooms[i].npc[k].itemAndActionCombinations[x].actionRequired.indexOf("talkTo") > -1) && (optionsRefArray.includes("talkTo")) === false) {
                                                    optionsRefArray.push("talkTo");
                                                    optionsNameArray.push(acquireSystemText("talkTo"));
                                                }
                                                if ((gameData.rooms[i].npc[k].itemAndActionCombinations[x].actionRequired.indexOf("open") > -1) && (optionsRefArray.includes("open")) === false) {
                                                    optionsRefArray.push("open");
                                                    optionsNameArray.push(acquireSystemText("open"));
                                                }
                                                if ((gameData.rooms[i].npc[k].itemAndActionCombinations[x].actionRequired.indexOf("close") > -1) && (optionsRefArray.includes("close")) === false) {
                                                    optionsRefArray.push("close");
                                                    optionsNameArray.push(acquireSystemText("close"));
                                                }
                                                if ((gameData.rooms[i].npc[k].itemAndActionCombinations[x].actionRequired.indexOf("push") > -1) && (optionsRefArray.includes("push")) === false) {
                                                    optionsRefArray.push("push");
                                                    optionsNameArray.push(acquireSystemText("push"));
                                                }
                                                if ((gameData.rooms[i].npc[k].itemAndActionCombinations[x].actionRequired.indexOf("pull") > -1) && (optionsRefArray.includes("pull")) === false) {
                                                    optionsRefArray.push("pull");
                                                    optionsNameArray.push(acquireSystemText("pull"));
                                                }
                                            }
    
                                            
                                        }
                                    
                                }
                            }
                        }
                    }
                    /* COMBOS END */




                if ((this.currentlySelectedItemName == "") && (this.currentlySelectedItemRef == "")) {

                    this.playOpenOptionsForPointsOfInterestSound();


                    var compassX = this.determineCompassPosition(this.game.input.x,this.game.input.y).x;
                    var compassY = this.determineCompassPosition(this.game.input.x,this.game.input.y).y;



                    /* Do some calculation of how we would show the compass START */
                    this.compass = this.game.add.sprite(compassX, compassY, 'compassNavBackground');
                    this.compass.anchor.x = Math.round(this.compass.width * 0.5) / this.compass.width;
                    this.compass.anchor.y = Math.round(this.compass.height * 0.5) / this.compass.height;
                    this.compass.alpha = 0;
                    var animCompassBackground = this.game.add.tween(this.compass).to({ alpha: 1 }, 300);
                    animCompassBackground.start();

                    var toRadians = Math.PI / 180;
                    var requiredAngle = -90 * toRadians;
                    var halfWidthOfBigCircle = 76;
                    var angleIncrement = (360 / optionsRefArray.length) * toRadians;

                    




                    this.compassOptionsGroup = this.game.add.group();

                    var k;
                    for (k = 0; k < optionsRefArray.length; k++) {


                        var optionDestinationX = compassX + Math.cos(requiredAngle) * halfWidthOfBigCircle;
                        var optionDestinationY = compassY + Math.sin(requiredAngle) * halfWidthOfBigCircle;

                        this.option = this.game.add.sprite(compassX, compassY, optionsRefArray[k]);
                        this.option.anchor.x = Math.round(this.option.width * 0.5) / this.option.width;
                        this.option.anchor.y = Math.round(this.option.height * 0.5) / this.option.height;
                        this.option.alpha = 0;

                        this.option.compRef = optionsRefArray[k];
                        this.option.friendlyRef = optionsNameArray[k];

                        this.option.inputEnabled = true;
                        this.option.events.onInputDown.add(this.setCurrentActionVerbFunction, this);
                        this.option.events.onInputDown.add(function () { this.npcsSetNounAndWalkingRoute(possibleObject) }, this);

                        this.compassOptionsGroup.add(this.option);

                        /* Do animation START */
                        var animOptionAlpha = this.game.add.tween(this.option).to({ alpha: 1 }, 200);
                        var animOptionMove = this.game.add.tween(this.option).to({ x: optionDestinationX, y: optionDestinationY }, 200, Phaser.Easing.Exponential.Out);
                        animOptionAlpha.start();
                        animOptionMove.start();
                        /* Do animation END */


                        requiredAngle = requiredAngle + angleIncrement;


                    };


                    /* Do some calculation of how we would show the compass END */
                }
                else {
                    this.npcsSetNounAndWalkingRoute(possibleObject);
                }

                return false;



            }
            /* If an npc was clicked on END */

            /* If a target zone was clicked on START */
            if ((possibleObject.callbackFunction == "targetZoneInteraction") && (possibleObject.ignore == false)) {

                /* Look target zones allow these options START */
                var optionsRefArray = ["lookAt", "walkTo"];
                var optionsNameArray = [acquireSystemText("lookAt"), acquireSystemText("walkTo")];
                /* Look target zones allow these options END */


                /* Find out if its a door, as we don't want the compass to show if its a door START */
                var i;
                for (i = 0; i < gameData.rooms.length; i++) {
                    if ((gameData.rooms[i].id == currentRoom)) {
                        var k;
                        for (k = 0; k < gameData.rooms[i].targetZones.length; k++) {
                            if ((gameData.rooms[i].targetZones[k].id == possibleObject.id)) {
                                


                                    var x;
                                    for (x = 0; x < gameData.rooms[i].targetZones[k].combinations.length; x++) {

                                        if ((gameData.rooms[i].targetZones[k].combinations[x].available == true && gameData.rooms[i].targetZones[k].combinations[x].appliesToAllPlayableCharacters == true) || (gameData.rooms[i].targetZones[k].combinations[x].available == true && gameData.rooms[i].targetZones[k].combinations[x].appliesToPlayableCharacterIds.indexOf(currentPlayableCharacterId) >= 0))
                                        {
                                            /*if ((gameData.rooms[i].targetZones[k].combinations[x].actionRequired.indexOf("give") > -1) && (optionsRefArray.includes("give")) === false) {
                                                optionsRefArray.push("give");
                                                optionsNameArray.push(acquireSystemText("give"));
                                            }*/
                                            if ((gameData.rooms[i].targetZones[k].combinations[x].actionRequired.indexOf("use") > -1) && (optionsRefArray.includes("use")) === false) {
                                                optionsRefArray.push("use");
                                                optionsNameArray.push(acquireSystemText("use"));
                                            }
                                            if ((gameData.rooms[i].targetZones[k].combinations[x].actionRequired.indexOf("pickUp") > -1) && (optionsRefArray.includes("pickUp")) === false) {
                                                optionsRefArray.push("pickUp");
                                                optionsNameArray.push(acquireSystemText("pickUp"));
                                            }
                                            if ((gameData.rooms[i].targetZones[k].combinations[x].actionRequired.indexOf("talkTo") > -1) && (optionsRefArray.includes("talkTo")) === false) {
                                                optionsRefArray.push("talkTo");
                                                optionsNameArray.push(acquireSystemText("talkTo"));
                                            }
                                            if ((gameData.rooms[i].targetZones[k].combinations[x].actionRequired.indexOf("open") > -1) && (optionsRefArray.includes("open")) === false) {
                                                optionsRefArray.push("open");
                                                optionsNameArray.push(acquireSystemText("open"));
                                            }
                                            if ((gameData.rooms[i].targetZones[k].combinations[x].actionRequired.indexOf("close") > -1) && (optionsRefArray.includes("close")) === false) {
                                                optionsRefArray.push("close");
                                                optionsNameArray.push(acquireSystemText("close"));
                                            }
                                            if ((gameData.rooms[i].targetZones[k].combinations[x].actionRequired.indexOf("push") > -1) && (optionsRefArray.includes("push")) === false) {
                                                optionsRefArray.push("push");
                                                optionsNameArray.push(acquireSystemText("push"));
                                            }
                                            if ((gameData.rooms[i].targetZones[k].combinations[x].actionRequired.indexOf("pull") > -1) && (optionsRefArray.includes("pull")) === false) {
                                                optionsRefArray.push("pull");
                                                optionsNameArray.push(acquireSystemText("pull"));
                                            }
                                        }

                                        
                                    }
                                
                            }
                        }
                    }
                }
                /* Find out if its a door, as we don't want the compass to show if its a door END */



                if ((this.currentlySelectedItemName == "") && (this.currentlySelectedItemRef == "")) {

                    this.playOpenOptionsForPointsOfInterestSound();

                    console.log(possibleObject);

                    
                    
                    var compassX = this.determineCompassPosition(this.game.input.x,this.game.input.y).x;
                    var compassY = this.determineCompassPosition(this.game.input.x,this.game.input.y).y;



                    /* Do some calculation of how we would show the compass START */
                    this.compass = this.game.add.sprite(compassX, compassY, 'compassNavBackground');
                    this.compass.anchor.x = Math.round(this.compass.width * 0.5) / this.compass.width;
                    this.compass.anchor.y = Math.round(this.compass.height * 0.5) / this.compass.height;
                    this.compass.alpha = 0;
                    var animCompassBackground = this.game.add.tween(this.compass).to({ alpha: 1 }, 300);
                    animCompassBackground.start();

                    var toRadians = Math.PI / 180;
                    var requiredAngle = -90 * toRadians;
                    var halfWidthOfBigCircle = 76;
                    var angleIncrement = (360 / optionsRefArray.length) * toRadians;
                    this.compassOptionsGroup = this.game.add.group();

                    var k;
                    for (k = 0; k < optionsRefArray.length; k++) {


                        var optionDestinationX = compassX + Math.cos(requiredAngle) * halfWidthOfBigCircle;
                        var optionDestinationY = compassY + Math.sin(requiredAngle) * halfWidthOfBigCircle;

                        this.option = this.game.add.sprite(compassX, compassY, optionsRefArray[k]);
                        this.option.anchor.x = Math.round(this.option.width * 0.5) / this.option.width;
                        this.option.anchor.y = Math.round(this.option.height * 0.5) / this.option.height;
                        this.option.alpha = 0;

                        this.option.compRef = optionsRefArray[k];
                        this.option.friendlyRef = optionsNameArray[k];

                        this.option.inputEnabled = true;
                        this.option.events.onInputDown.add(this.setCurrentActionVerbFunction, this);
                        this.option.events.onInputDown.add(function () { this.targetZonesSetNounAndWalkingRoute(possibleObject) }, this);

                        this.compassOptionsGroup.add(this.option);

                        /* Do animation START */
                        var animOptionAlpha = this.game.add.tween(this.option).to({ alpha: 1 }, 200);
                        var animOptionMove = this.game.add.tween(this.option).to({ x: optionDestinationX, y: optionDestinationY }, 200, Phaser.Easing.Exponential.Out);
                        animOptionAlpha.start();
                        animOptionMove.start();
                        /* Do animation END */



                        requiredAngle = requiredAngle + angleIncrement;


                    };


                    /* Do some calculation of how we would show the compass END */
                }
                else {
                    this.targetZonesSetNounAndWalkingRoute(possibleObject);
                }


                return false;

            }
			/* If a target zone was clicked on START */

            /* If an item was clicked on START */
            if ((possibleObject.callbackFunction == "inventorySceneItemClickedOn") && (possibleObject.ignore == false)) {


                var optionsRefArray = ["lookAt", "walkTo"];
                var optionsNameArray = [acquireSystemText("lookAt"), acquireSystemText("walkTo")];


                var i;
                for (i = 0; i < gameData.inventoryBox.length; i++) {
                    if ((gameData.inventoryBox[i].id == possibleObject.id)) {

                                    var x;
                                    for (x = 0; x < gameData.inventoryBox[i].pickUpOnSceneDetails.collectionProtocol.length; x++) {

                                        if ((gameData.inventoryBox[i].pickUpOnSceneDetails.collectionProtocol[x].available == true && gameData.inventoryBox[i].pickUpOnSceneDetails.collectionProtocol[x].appliesToAllPlayableCharacters == true) || (gameData.inventoryBox[i].pickUpOnSceneDetails.collectionProtocol[x].available == true && gameData.inventoryBox[i].pickUpOnSceneDetails.collectionProtocol[x].appliesToPlayableCharacterIds.indexOf(currentPlayableCharacterId) >= 0))
                                        {

                                            
                                            
                                            if ((gameData.inventoryBox[i].pickUpOnSceneDetails.collectionProtocol[x].actionRequired.indexOf("pickUp") > -1) && (optionsRefArray.includes("pickUp")) === false) {
                                                optionsRefArray.push("pickUp");
                                                optionsNameArray.push(acquireSystemText("pickUp"));
                                            }
                                            if ((gameData.inventoryBox[i].pickUpOnSceneDetails.collectionProtocol[x].actionRequired.indexOf("open") > -1) && (optionsRefArray.includes("open")) === false) {
                                                optionsRefArray.push("open");
                                                optionsNameArray.push(acquireSystemText("open"));
                                            }
                                            if ((gameData.inventoryBox[i].pickUpOnSceneDetails.collectionProtocol[x].actionRequired.indexOf("close") > -1) && (optionsRefArray.includes("close")) === false) {
                                                optionsRefArray.push("close");
                                                optionsNameArray.push(acquireSystemText("close"));
                                            }
                                            if ((gameData.inventoryBox[i].pickUpOnSceneDetails.collectionProtocol[x].actionRequired.indexOf("push") > -1) && (optionsRefArray.includes("push")) === false) {
                                                optionsRefArray.push("push");
                                                optionsNameArray.push(acquireSystemText("push"));
                                            }
                                            if ((gameData.inventoryBox[i].pickUpOnSceneDetails.collectionProtocol[x].actionRequired.indexOf("pull") > -1) && (optionsRefArray.includes("pull")) === false) {
                                                optionsRefArray.push("pull");
                                                optionsNameArray.push(acquireSystemText("pull"));
                                            }
                                        }
                            
                        }
                    }
                }



                if ((this.currentlySelectedItemName == "") && (this.currentlySelectedItemRef == "")) {

                    this.playOpenOptionsForPointsOfInterestSound();


                    var compassX = this.determineCompassPosition(this.game.input.x,this.game.input.y).x;
                    var compassY = this.determineCompassPosition(this.game.input.x,this.game.input.y).y;


                    /* Do some calculation of how we would show the compass START */
                    this.compass = this.game.add.sprite(compassX, compassY, 'compassNavBackground');
                    this.compass.anchor.x = Math.round(this.compass.width * 0.5) / this.compass.width;
                    this.compass.anchor.y = Math.round(this.compass.height * 0.5) / this.compass.height;
                    this.compass.alpha = 0;
                    var animCompassBackground = this.game.add.tween(this.compass).to({ alpha: 1 }, 300);
                    animCompassBackground.start();

                    var toRadians = Math.PI / 180;
                    var requiredAngle = -90 * toRadians;
                    var halfWidthOfBigCircle = 76;
                    var angleIncrement = (360 / optionsRefArray.length) * toRadians;
                    this.compassOptionsGroup = this.game.add.group();

                    var k;
                    for (k = 0; k < optionsRefArray.length; k++) {


                        var optionDestinationX = compassX + Math.cos(requiredAngle) * halfWidthOfBigCircle;
                        var optionDestinationY = compassY + Math.sin(requiredAngle) * halfWidthOfBigCircle;

                        this.option = this.game.add.sprite(compassX, compassY, optionsRefArray[k]);
                        this.option.anchor.x = Math.round(this.option.width * 0.5) / this.option.width;
                        this.option.anchor.y = Math.round(this.option.height * 0.5) / this.option.height;
                        this.option.alpha = 0;

                        this.option.compRef = optionsRefArray[k];
                        this.option.friendlyRef = optionsNameArray[k];

                        this.option.inputEnabled = true;
                        this.option.events.onInputDown.add(this.setCurrentActionVerbFunction, this);
                        this.option.events.onInputDown.add(function () { this.itemsSetNounAndWalkingRoute(possibleObject) }, this);

                        this.compassOptionsGroup.add(this.option);

                        /* Do animation START */
                        var animOptionAlpha = this.game.add.tween(this.option).to({ alpha: 1 }, 200);
                        var animOptionMove = this.game.add.tween(this.option).to({ x: optionDestinationX, y: optionDestinationY }, 200, Phaser.Easing.Exponential.Out);
                        animOptionAlpha.start();
                        animOptionMove.start();
                        /* Do animation END */



                        requiredAngle = requiredAngle + angleIncrement;


                    };


                    /* Do some calculation of how we would show the compass END */
                }
                else {
                    this.itemsSetNounAndWalkingRoute(possibleObject);
                }

                return false;

            }
            /* If an item was clicked on END */


            /* Still move the player if the user hit within the allowed polygon area START */
            if ((possibleObject.callbackFunction == null) || (possibleObject.ignore == true)) {


                this.resetActionModes();



                var found = false;

                var x;
                for (x = 0; x < this.walkableAreas.length; x++) {
                    if (this.walkableAreas[x].contains(this.game.input.x, this.game.input.y)) {
                        found = true;
                    }
                }

                if ((found == true)) {






                    if ((this['player' + currentPlayableCharacterId].animations.currentAnim.name == "player" + currentPlayableCharacterId + this.acquirePlayableCharactersCurrentGroupAnimationId(currentPlayableCharacterId) + 22) /* Walk Left */ || (this['player' + currentPlayableCharacterId].animations.currentAnim.name == "player" + currentPlayableCharacterId + this.acquirePlayableCharactersCurrentGroupAnimationId(currentPlayableCharacterId) + 20) /* Walk Back */ || (this['player' + currentPlayableCharacterId].animations.currentAnim.name == "player" + currentPlayableCharacterId + this.acquirePlayableCharactersCurrentGroupAnimationId(currentPlayableCharacterId) + 23) /* Walk Right */ || (this['player' + currentPlayableCharacterId].animations.currentAnim.name == "player" + currentPlayableCharacterId + this.acquirePlayableCharactersCurrentGroupAnimationId(currentPlayableCharacterId) + 21)) /* Walk Front */ {
                        this.resetActionModes();
                    }




                    var calculatedXPos = this.game.input.x + this.game.camera.x;
                    var calculatedYPos = this.game.input.y + this.game.camera.y;




                    this.routePlayableCharacter(calculatedXPos, calculatedYPos, "none", null, currentPlayableCharacterId, true);






                }
                else {






                    if ((this['player' + currentPlayableCharacterId].animations.currentAnim.name == "player" + currentPlayableCharacterId + this.acquirePlayableCharactersCurrentGroupAnimationId(currentPlayableCharacterId) + 22) /* Walk Left */ || (this['player' + currentPlayableCharacterId].animations.currentAnim.name == "player" + currentPlayableCharacterId + this.acquirePlayableCharactersCurrentGroupAnimationId(currentPlayableCharacterId) + 20) /* Walk Back */ || (this['player' + currentPlayableCharacterId].animations.currentAnim.name == "player" + currentPlayableCharacterId + this.acquirePlayableCharactersCurrentGroupAnimationId(currentPlayableCharacterId) + 23) /* Walk Right */ || (this['player' + currentPlayableCharacterId].animations.currentAnim.name == "player" + currentPlayableCharacterId + this.acquirePlayableCharactersCurrentGroupAnimationId(currentPlayableCharacterId) + 21)) /* Walk Front */ {

                        this.resetActionModes();

                    }

                    var calculatedXPos = this.game.input.x + this.game.camera.x;
                    var calculatedYPos = this.game.input.y + this.game.camera.y;
                    var pathFound;

                    /* We know we have hit a dud area, so find the nearest available y position to move to START */
                    /* Do this 500 times until we give up START */
                    var i;
                    for (i = 0; i < 500; i++) {


                        var found = false;

                        var x;
                        for (x = 0; x < this.walkableAreas.length; x++) {
                            if (this.walkableAreas[x].contains(calculatedXPos, calculatedYPos)) {
                                found = true;
                            }
                        }

                        if ((found == true)) {
                            /* We now know that this y position is ok to use but we'll add some more so that the calculation isn't straight to the edge  */
                            calculatedYPos = calculatedYPos + 8;
                            pathFound = true;
                            break;
                        }
                        else {
                            calculatedYPos = calculatedYPos + 1;
                        }
                    }
                    /* Do this 500 times until we give up END */
                    /* We know we have hit a dud area, so find the nearest available y position to move to END */

                    if ((pathFound == true)) {

                        this.routePlayableCharacter(calculatedXPos, calculatedYPos, "none", null, currentPlayableCharacterId, true);
                    }












                }
            }
            /* Still move the player if the user hit within the allowed polygon area START */
            /* MOVE PLAYER END */







        },





        activatePlayerableCharactersInteraction: function (possibleObject) {

            if ((this.inventoryBoxOpen == true)) {
                this.toggleInventoryBox("close");
            }


            var i;
            for (i = 0; i < gameData.playerSettings.playableCharacters.length; i++) {
                if ((gameData.playerSettings.playableCharacters[i].id == currentPlayableCharacterId)) {
                    gameData.playerSettings.playableCharacters[i].position.x = this['player' + currentPlayableCharacterId].x;
                    gameData.playerSettings.playableCharacters[i].position.y = this['player' + currentPlayableCharacterId].y;

                    /* Reset the action modes at the top of the screen after going to the npc for a few seconds and then reset it START */
                    this.game.time.events.add(Phaser.Timer.SECOND * 1, this.resetActionModes, this);
                    /* Reset the action modes at the top of the screen after going to the npc for a few seconds and then reset it END */

                    /* Trigger off the interaction function START */
                    this.playerableCharactersInteraction(possibleObject);
                    /* Trigger off the interaction function END */

                }
            }






        },







        /* Declare all callback functions START */
        activateNpcsInteraction: function (possibleObject) {

            if ((this.inventoryBoxOpen == true)) {
                this.toggleInventoryBox("close");
            }


            var i;
            for (i = 0; i < gameData.playerSettings.playableCharacters.length; i++) {
                if ((gameData.playerSettings.playableCharacters[i].id == currentPlayableCharacterId)) {
                    gameData.playerSettings.playableCharacters[i].position.x = this['player' + currentPlayableCharacterId].x;
                    gameData.playerSettings.playableCharacters[i].position.y = this['player' + currentPlayableCharacterId].y;

                    /* Reset the action modes at the top of the screen after going to the npc for a few seconds and then reset it START */
                    this.game.time.events.add(Phaser.Timer.SECOND * 1, this.resetActionModes, this);
                    /* Reset the action modes at the top of the screen after going to the npc for a few seconds and then reset it END */

                    /* Trigger off the interaction function START */
                    this.npcsInteraction(possibleObject);
                    /* Trigger off the interaction function END */

                }
            }






        },

        activateTargetZonesInteraction: function (possibleObject) {



            if ((this.inventoryBoxOpen == true)) {
                this.toggleInventoryBox("close");
            }



            /* Save current players x and y co-ords so on restart we know exactly how they were positioned START */
            var i;
            for (i = 0; i < gameData.playerSettings.playableCharacters.length; i++) {
                if ((gameData.playerSettings.playableCharacters[i].id == currentPlayableCharacterId)) {
                    gameData.playerSettings.playableCharacters[i].position.x = this['player' + currentPlayableCharacterId].x;
                    gameData.playerSettings.playableCharacters[i].position.y = this['player' + currentPlayableCharacterId].y;
                }
            }
            /* Save current players x and y co-ords so on restart we know exactly how they were positioned END */

            /* Reset the action modes at the top of the screen after going to the npc for a few seconds and then reset it START */
            this.game.time.events.add(Phaser.Timer.SECOND * 1, this.resetActionModes, this);
            /* Reset the action modes at the top of the screen after going to the npc for a few seconds and then reset it END */

            /* Trigger off the interaction function START */
            this.targetZoneInteraction(possibleObject);
            /* Trigger off the interaction function END */




        },

        activateInventorySceneItemClickedOn: function (possibleObject) {

            if ((this.inventoryBoxOpen == true)) {
                this.toggleInventoryBox("close");
            }


            var i;
            for (i = 0; i < gameData.playerSettings.playableCharacters.length; i++) {
                if ((gameData.playerSettings.playableCharacters[i].id == currentPlayableCharacterId)) {
                    gameData.playerSettings.playableCharacters[i].position.x = this['player' + currentPlayableCharacterId].x;
                    gameData.playerSettings.playableCharacters[i].position.y = this['player' + currentPlayableCharacterId].y;

                    /* Reset the action modes at the top of the screen after going to the npc for a few seconds and then reset it START */
                    this.game.time.events.add(Phaser.Timer.SECOND * 1, this.resetActionModes, this);
                    /* Reset the action modes at the top of the screen after going to the npc for a few seconds and then reset it END */

                    /* Trigger off the interaction function START */
                    this.inventorySceneItemClickedOn(possibleObject);
                    /* Trigger off the interaction function END */

                }
            }






        },
        /* Declare all callback functions END */





        createZones: function () {

            /* Set any target zone areas for object to fall on START */

            /* Loop through each object and assign it's properties START */
            var i;
            for (i = 0; i < gameData.rooms.length; i++) {
                if ((gameData.rooms[i].id == currentRoom)) {
                    var k;
                    for (k = 0; k < gameData.rooms[i].targetZones.length; k++) {

                        if ((gameData.rooms[i].targetZones[k].type == 0))
                        {
                            this['targetZone' + gameData.rooms[i].targetZones[k].id] = this.game.add.sprite(gameData.rooms[i].targetZones[k].graphicalOptions.position.x, gameData.rooms[i].targetZones[k].graphicalOptions.position.y);
                            this.setTargetZoneAnimation(gameData.rooms[i].targetZones[k].graphicalOptions.defaultAnimationId, gameData.rooms[i].targetZones[k].id);
                            this['targetZone' + gameData.rooms[i].targetZones[k].id].anchor.setTo(gameData.rooms[i].targetZones[k].graphicalOptions.anchor.x, gameData.rooms[i].targetZones[k].graphicalOptions.anchor.y);
                        }

                        if ((gameData.rooms[i].targetZones[k].type == 1))
                        {
                            var coordsValues = gameData.rooms[i].targetZones[k].hotspotOptions.area;
                            var walkableAreaArrayCoords = new Array();
                            walkableAreaArrayCoords = JSON.parse("[" + coordsValues + "]");

                            var clickableGroup = new Phaser.Polygon(walkableAreaArrayCoords);

                            this['targetZone' + gameData.rooms[i].targetZones[k].id] = game.add.graphics(0, 0);
                            this['targetZone' + gameData.rooms[i].targetZones[k].id].beginFill(0xFF33ff);
                            this['targetZone' + gameData.rooms[i].targetZones[k].id].drawPolygon(clickableGroup);
                            this['targetZone' + gameData.rooms[i].targetZones[k].id].endFill();
                            this['targetZone' + gameData.rooms[i].targetZones[k].id].alpha = 0;
                            this['targetZone' + gameData.rooms[i].targetZones[k].id].area = gameData.rooms[i].targetZones[k].hotspotOptions.area;
                        }



                        this['targetZone' + gameData.rooms[i].targetZones[k].id].id = gameData.rooms[i].targetZones[k].id;
                        this['targetZone' + gameData.rooms[i].targetZones[k].id].targetZoneType = gameData.rooms[i].targetZones[k].type;
                        
                        
                        
                        


                        /* State terms START */
                        var stateId = gameData.rooms[i].targetZones[k].stateId;

                        var q;
                        for (q = 0; q < gameData.rooms[i].targetZones[k].states.length; q++) {
                            if ((gameData.rooms[i].targetZones[k].states[q].id == stateId)) {
                                this['targetZone' + gameData.rooms[i].targetZones[k].id].name = gameData.rooms[i].targetZones[k].states[q].languages[currentLang].name;
                            }
                        }
                        /* State terms END */


                        


                        this['targetZone' + gameData.rooms[i].targetZones[k].id].inputEnabled = true;

                        if ((gameData.rooms[i].targetZones[k].type == 0))
                        {
                            this['targetZone' + gameData.rooms[i].targetZones[k].id].input.pixelPerfectClick = gameData.rooms[i].targetZones[k].graphicalOptions.pixelPerfectClick;
                            this['targetZone' + gameData.rooms[i].targetZones[k].id].input.pixelPerfectOver = gameData.rooms[i].targetZones[k].graphicalOptions.pixelPerfectOver;
                        }
                        
                        this['targetZone' + gameData.rooms[i].targetZones[k].id].ignore = gameData.rooms[i].targetZones[k].ignore;
                        this['targetZone' + gameData.rooms[i].targetZones[k].id].callbackFunction = "targetZoneInteraction";
                        this['targetZone' + gameData.rooms[i].targetZones[k].id].events.onInputDown.add(this.flashUpCurrentVerbIconAndMovePlayer, this);
                        this['targetZone' + gameData.rooms[i].targetZones[k].id].type = "targetZone";

                        this.charactersAndZonesGroup.add(this['targetZone' + gameData.rooms[i].targetZones[k].id]);
                    }
                }
            }
            /* Set any target zone areas for object to fall on END */

        },


        generateInventoryForCurrentRoom: function () {

            /* Loop through each object and assign it's properties START */
            var i;
            for (i = 0; i < gameData.inventoryBox.length; i++) {

                if ((gameData.inventoryBox[i].pickUpOnSceneDetails != null) && (gameData.inventoryBox[i].pickUpOnSceneDetails.placedInRoomId == currentRoom) && (gameData.inventoryBox[i].pickUpOnSceneDetails.hidden == false) && (gameData.inventoryBox[i].orderNumber == 0)) {

                    this.createInventoryItem(gameData.inventoryBox[i].id);

                }

            }
            /* Loop through each object and assign it's properties END */


        },


        createInventoryItem: function (id) {

            /* Loop through each object and assign it's properties START */
            var i;
            for (i = 0; i < gameData.inventoryBox.length; i++) {

                if ((gameData.inventoryBox[i].id == id)) {

                    this['inventory' + gameData.inventoryBox[i].id] = this.game.add.sprite(gameData.inventoryBox[i].pickUpOnSceneDetails.position.x, gameData.inventoryBox[i].pickUpOnSceneDetails.position.y, "inventorySceneImage"+gameData.inventoryBox[i].id);
                    this['inventory' + gameData.inventoryBox[i].id].id = gameData.inventoryBox[i].id;
                    this['inventory' + gameData.inventoryBox[i].id].name = gameData.inventoryBox[i].languages[currentLang].name;
                    this['inventory' + gameData.inventoryBox[i].id].type = "inventory";
                    this['inventory' + gameData.inventoryBox[i].id].anchor.setTo(gameData.inventoryBox[i].pickUpOnSceneDetails.anchor.x, gameData.inventoryBox[i].pickUpOnSceneDetails.anchor.y);
                    this['inventory' + gameData.inventoryBox[i].id].inputEnabled = true;

                    this['inventory' + gameData.inventoryBox[i].id].input.pixelPerfectClick = gameData.inventoryBox[i].pickUpOnSceneDetails.pixelPerfectClick;
                    this['inventory' + gameData.inventoryBox[i].id].input.pixelPerfectOver = gameData.inventoryBox[i].pickUpOnSceneDetails.pixelPerfectOver;
                    this['inventory' + gameData.inventoryBox[i].id].ignore = gameData.inventoryBox[i].pickUpOnSceneDetails.ignore;

                    this['inventory' + gameData.inventoryBox[i].id].callbackFunction = "inventorySceneItemClickedOn";
                    this['inventory' + gameData.inventoryBox[i].id].events.onInputDown.add(this.flashUpCurrentVerbIconAndMovePlayer, this);
                    

                    this.charactersAndZonesGroup.add(this['inventory' + gameData.inventoryBox[i].id]);

                }

            }
            /* Loop through each object and assign it's properties END */


        },




        playerableCharactersInteraction: function (playerableCharacter) {

            var characterXposition;


            /* Make the player face the direction of the npc START */
            var i;
            for (i = 0; i < gameData.playerSettings.playableCharacters.length; i++) {

                if ((gameData.playerSettings.playableCharacters[i].id == playerableCharacter.id)) {



                    this.charactersAndZonesGroup.forEachAlive(function (character) {
                        if ((character.id == gameData.playerSettings.playableCharacters[i].id) && (character.type == "playerableCharacter")) {
                            characterXposition = character.x;
                        }
                    }, this);




                    if ((this['player' + currentPlayableCharacterId].x > characterXposition)) {
                        this.setPlayerAnimation(10, currentPlayableCharacterId); //Focus Left
                    }
                    if ((this['player' + currentPlayableCharacterId].x <= characterXposition)) {
                        this.setPlayerAnimation(11, currentPlayableCharacterId);//Focus Right
                    }

                }
            }
            /* Make the player face the direction of the npc END */






            /* Walking START */
            if ((this.setCurrentActionVerbComp == "walkTo")) {

                this.cancelPlayerWalkingTweenAndSetToIdle(currentPlayableCharacterId);

                return false;

            }
            /* Walking END */


            /* Talking START */


            if ((this.setCurrentActionVerbComp == "talkTo")) {
                var i;
                for (i = 0; i < gameData.playerSettings.playableCharacters.length; i++) {
                    if ((gameData.playerSettings.playableCharacters[i].id == currentPlayableCharacterId)) {
                        this.speechAndMovements(gameData.playerSettings.playableCharacters[i].defaultGlobalSpeeches.talkToOtherPlayableCharacter);
                    }
                }

                return false;
            }

            /* Talking END */

            /* Looking START */


            if ((this.setCurrentActionVerbComp == "lookAt")) {
                var i;
                for (i = 0; i < gameData.playerSettings.playableCharacters.length; i++) {
                    if ((gameData.playerSettings.playableCharacters[i].id == currentPlayableCharacterId)) {
                        this.speechAndMovements(gameData.playerSettings.playableCharacters[i].defaultGlobalSpeeches.lookAtOtherPlayableCharacter);
                    }
                }

                return false;
            }

            /* Looking END */


            /* Pick up START */
            if ((this.setCurrentActionVerbComp == "pickUp")) {
                var i;
                for (i = 0; i < gameData.playerSettings.playableCharacters.length; i++) {
                    if ((gameData.playerSettings.playableCharacters[i].id == currentPlayableCharacterId)) {
                        this.speechAndMovements(gameData.playerSettings.playableCharacters[i].defaultGlobalSpeeches.pickUpNPC);
                    }
                }

                return false;
            }
            /* Pick up END */


            /* Open START */
            if ((this.setCurrentActionVerbComp == "open")) {
                var i;
                for (i = 0; i < gameData.playerSettings.playableCharacters.length; i++) {
                    if ((gameData.playerSettings.playableCharacters[i].id == currentPlayableCharacterId)) {
                        this.speechAndMovements(gameData.playerSettings.playableCharacters[i].defaultGlobalSpeeches.openNPC);
                    }
                }

                return false;
            }
            /* Open END */

            /* Close START */
            if ((this.setCurrentActionVerbComp == "close")) {
                var i;
                for (i = 0; i < gameData.playerSettings.playableCharacters.length; i++) {
                    if ((gameData.playerSettings.playableCharacters[i].id == currentPlayableCharacterId)) {
                        this.speechAndMovements(gameData.playerSettings.playableCharacters[i].defaultGlobalSpeeches.closeNPC);
                    }
                }

                return false;
            }
            /* Close END */

            /* Close START */
            if ((this.setCurrentActionVerbComp == "push")) {
                var i;
                for (i = 0; i < gameData.playerSettings.playableCharacters.length; i++) {
                    if ((gameData.playerSettings.playableCharacters[i].id == currentPlayableCharacterId)) {
                        this.speechAndMovements(gameData.playerSettings.playableCharacters[i].defaultGlobalSpeeches.pushNPC);
                    }
                }

                return false;
            }
            /* Close END */

            /* Pull START */
            if ((this.setCurrentActionVerbComp == "pull")) {
                var i;
                for (i = 0; i < gameData.playerSettings.playableCharacters.length; i++) {
                    if ((gameData.playerSettings.playableCharacters[i].id == currentPlayableCharacterId)) {
                        this.speechAndMovements(gameData.playerSettings.playableCharacters[i].defaultGlobalSpeeches.pullNPC);
                    }
                }

                return false;
            }
            /* Pull END */



            /* Give or Use START */
            if ((this.setCurrentActionVerbComp == "give") || (this.setCurrentActionVerbComp == "use")) {

                console.log(playerableCharacter);

                this.removeFromInventory(this.currentlySelectedItemRef, currentPlayableCharacterId);
                this.addToInventoryRecords(this.currentlySelectedItemRef, playerableCharacter.id);

                if ((playerableCharacter.x < this['player' + currentPlayableCharacterId].x)) {
                    var animation = 6; //Collect stand left
                }
                else {
                    var animation = 7; //Collect stand right
                }

                /* Show the animation of the giving character START */
                var z;
                for (z = 0; z < gameData.playerSettings.playableCharacters.length; z++) {

                    if ((gameData.playerSettings.playableCharacters[z].id == currentPlayableCharacterId)) {



                        var k;
                        for (k = 0; k < gameData.playerSettings.playableCharacters[z].groupAnimations.length; k++) {
                            if ((gameData.playerSettings.playableCharacters[z].groupAnimations[k].id == gameData.playerSettings.playableCharacters[z].currentGroupAnimationId))
                            {

                                var x;
                                for (x = 0; x < gameData.playerSettings.playableCharacters[z].groupAnimations[k].animations.length; x++)
                                {

                                    if ((gameData.playerSettings.playableCharacters[z].groupAnimations[k].animations[x].id == animation))
                                    {
                                        this['player' + currentPlayableCharacterId].loadTexture("player" + currentPlayableCharacterId + gameData.playerSettings.playableCharacters[z].groupAnimations[k].id + animation, 0);
                                        this['player' + currentPlayableCharacterId].animations.add("player" + currentPlayableCharacterId + gameData.playerSettings.playableCharacters[z].groupAnimations[k].id + animation);
                                        this.playerCollectionAnim = this['player' + currentPlayableCharacterId].animations.play("player" + currentPlayableCharacterId + gameData.playerSettings.playableCharacters[z].groupAnimations[k].id + animation, gameData.playerSettings.playableCharacters[z].groupAnimations[k].animations[x].frameRate, gameData.playerSettings.playableCharacters[z].groupAnimations[k].animations[x].loop);
                                        
                                        this.playerCollectionAnim.onComplete.add(function () {
                                            this.setPlayerToIdleAfterGive(currentPlayableCharacterId);
                                        }, this);
                                    }

                                    
                                }

                            }
                        }




                        
                    }
                }
                /* Show the animation of the giving character END */

                /* Disable the player from moving whilst we are perfoming the pick up animation START */
                this.disableToolBarAndPlayerMovements = true;
                /* Disable the player from moving whilst we are perfoming the pick up animation END */

                this.game.time.events.add(1000, function () { this.disableToolBarAndPlayerMovements = false; }, this);

                return false;
            }
            /* Give or Use END */




        },





        generateNpcCharactersForCurrentRoom: function () {



            /* Place in NPCS START */
            var i;
            for (i = 0; i < gameData.rooms.length; i++) {
                if ((gameData.rooms[i].id == currentRoom)) {
                    var k;
                    for (k = 0; k < gameData.rooms[i].npc.length; k++) {

                        if ((gameData.rooms[i].npc[k].hidden === false))
                        {
                            this.createNpc(gameData.rooms[i].npc[k].id);
                        }

                    }
                }
            }
            /* Place in NPCS END */

        },


        createNpc: function (id) {



            /* Place in NPCS START */
            var i;
            for (i = 0; i < gameData.rooms.length; i++) {
                if ((gameData.rooms[i].id == currentRoom)) {
                    var k;
                    for (k = 0; k < gameData.rooms[i].npc.length; k++) {


                        if ((gameData.rooms[i].npc[k].id == id))
                        {

                            this['npc' + gameData.rooms[i].npc[k].id] = this.game.add.sprite(gameData.rooms[i].npc[k].position.x, gameData.rooms[i].npc[k].position.y);
                            this.game.physics.arcade.enable(this['npc' + gameData.rooms[i].npc[k].id]);
                            this['npc' + gameData.rooms[i].npc[k].id].id = gameData.rooms[i].npc[k].id;
    
                            this['npc' + gameData.rooms[i].npc[k].id].npcXPositions = [];
                            this['npc' + gameData.rooms[i].npc[k].id].npcYPositions = [];
                            
    
                            /* Relationship terms START */
                            var relationshipTermId = gameData.rooms[i].npc[k].relationshipTermId;
    
                            var q;
                            for (q = 0; q < gameData.rooms[i].npc[k].relationTerms.length; q++) {
                                if ((gameData.rooms[i].npc[k].relationTerms[q].id == relationshipTermId)) {
                                    this['npc' + gameData.rooms[i].npc[k].id].name = gameData.rooms[i].npc[k].relationTerms[q].languages[currentLang].name;
                                }
                            }
                            /* Relationship terms END */
    
    
                            /* Speech text START */
                            this['npc' + gameData.rooms[i].npc[k].id].speechText = this.game.add.text(16, 85, ' ', { font: ""+this.calculateTextSizeInPercentage(systemSettings.gameplaySettings.uiText.dialogText.languages[currentLang].fontSize, userSettings.textSize.interface)+"px "+acquireFontName(systemSettings.gameplaySettings.uiText.dialogText.languages[currentLang].fontId)+"", fill: '#ffffff' });
                            this['npc' + gameData.rooms[i].npc[k].id].speechText.wordWrap = true;
                            this['npc' + gameData.rooms[i].npc[k].id].speechText.align = 'center';
                            this['npc' + gameData.rooms[i].npc[k].id].speechText.wordWrapWidth = 380;
                            this['npc' + gameData.rooms[i].npc[k].id].speechText.lineSpacing = systemSettings.gameplaySettings.uiText.dialogText.languages[currentLang].lineSpacing;
                            
                            if ((systemSettings.gameplaySettings.uiText.dialogText.stroke.show == true))
                            {
                                this['npc' + gameData.rooms[i].npc[k].id].speechText.stroke = systemSettings.gameplaySettings.uiText.dialogText.stroke.color;
                                this['npc' + gameData.rooms[i].npc[k].id].speechText.strokeThickness = systemSettings.gameplaySettings.uiText.dialogText.stroke.thickness;
                            }
                            
                            if ((systemSettings.gameplaySettings.uiText.dialogText.shadow.show == true))
                            {
                                this['npc' + gameData.rooms[i].npc[k].id].speechText.setShadow(systemSettings.gameplaySettings.uiText.dialogText.shadow.x, systemSettings.gameplaySettings.uiText.dialogText.shadow.y, systemSettings.gameplaySettings.uiText.dialogText.shadow.color, systemSettings.gameplaySettings.uiText.dialogText.shadow.blur);
                            }
    
                            this['npc' + gameData.rooms[i].npc[k].id].speechText.anchor.x = Math.round(this['npc' + gameData.rooms[i].npc[k].id].speechText.width * 0.5) / this['npc' + gameData.rooms[i].npc[k].id].speechText.width;
                            this['npc' + gameData.rooms[i].npc[k].id].speechText.x = this.game.width / 2;
                            this['npc' + gameData.rooms[i].npc[k].id].speechText.alpha = 1;
                            this['npc' + gameData.rooms[i].npc[k].id].speechText.speechTextYOffset = gameData.rooms[i].npc[k].speechTextYOffset;
                            this['npc' + gameData.rooms[i].npc[k].id].speechText.conversationFillColor = gameData.rooms[i].npc[k].conversationFillColor;
                            this['npc' + gameData.rooms[i].npc[k].id].speechText.conversationFillColorAdditional = gameData.rooms[i].npc[k].conversationFillColorAdditional;
                            this['npc' + gameData.rooms[i].npc[k].id].speechText.fill = gameData.rooms[i].npc[k].conversationFillColor;
                            /* Speech text END */
    
    
                            
                            this.setNpcAnimation(gameData.rooms[i].npc[k].defaultAnimationId, gameData.rooms[i].npc[k].id);
                            
    
    
    
                                /* Position to the center START */
                                this['npc' + gameData.rooms[i].npc[k].id].anchor.setTo(gameData.rooms[i].npc[k].anchor.x, gameData.rooms[i].npc[k].anchor.y);
                                /* Position to the center END */
    
                                
                                this['npc' + gameData.rooms[i].npc[k].id].inputEnabled = true;
                                this['npc' + gameData.rooms[i].npc[k].id].input.pixelPerfectClick = gameData.rooms[i].npc[k].pixelPerfectClick;
                                this['npc' + gameData.rooms[i].npc[k].id].input.pixelPerfectOver = gameData.rooms[i].npc[k].pixelPerfectOver;
                                this['npc' + gameData.rooms[i].npc[k].id].ignore = gameData.rooms[i].npc[k].ignore;
                                this['npc' + gameData.rooms[i].npc[k].id].callbackFunction = "npcsInteraction";
                                this['npc' + gameData.rooms[i].npc[k].id].events.onInputDown.add(this.flashUpCurrentVerbIconAndMovePlayer, this);
                            
    
                                this['npc' + gameData.rooms[i].npc[k].id].type = "npc";
                                this['npc' + gameData.rooms[i].npc[k].id].playingWalkingSignal = false;
                                this['npc' + gameData.rooms[i].npc[k].id].numberOfPixelsToTravelAtPerSecond = gameData.rooms[i].npc[k].numberOfPixelsToTravelAtPerSecond;
    
                                this.charactersAndZonesGroup.add(this['npc' + gameData.rooms[i].npc[k].id]);
                        }

                        

                    }
                }
            }
            /* Place in NPCS END */

        },


        npcsInteraction: function (npc) {

            var npcXposition;


            var i;
            for (i = 0; i < gameData.rooms.length; i++) {
                if ((gameData.rooms[i].id == currentRoom)) {
                    var k;
                    for (k = 0; k < gameData.rooms[i].npc.length; k++) {
                        if ((gameData.rooms[i].npc[k].id == npc.id)) {

                            /* Make the player face the direction of the npc START */
                            this.charactersAndZonesGroup.forEachAlive(function (npc) {
                                if ((npc.id == gameData.rooms[i].npc[k].id) && (npc.type == "npc")) {
                                    npcXposition = npc.x;
                                }
                            }, this);




                            if ((this['player' + currentPlayableCharacterId].x > npcXposition)) {
                                this.setPlayerAnimation(10, currentPlayableCharacterId); //Focus Left
                            }
                            if ((this['player' + currentPlayableCharacterId].x <= npcXposition)) {
                                this.setPlayerAnimation(11, currentPlayableCharacterId); //Focus Right
                            }



                            /* Make the player face the direction of the npc END */





                            /* Walking START */
                            if ((this.setCurrentActionVerbComp == "walkTo")) {

                                this.cancelPlayerWalkingTweenAndSetToIdle(currentPlayableCharacterId);

                                return false;

                            }
                            /* Walking END */


                            /* Talking START */
                            if ((this.setCurrentActionVerbComp == "talkTo")) {

                                var x;
                                for (x = 0; x < gameData.rooms[i].npc[k].itemAndActionCombinations.length; x++) {
                                    if ((gameData.rooms[i].npc[k].itemAndActionCombinations[x].actionRequired == "talkTo") && (gameData.rooms[i].npc[k].itemAndActionCombinations[x].available == true)) {
                                        this.speechAndMovements(gameData.rooms[i].npc[k].itemAndActionCombinations[x].protocol);
                                        return false;
                                    }
                                }

                                return false;

                            }
                            /* Talking END */

                            /* Looking START */
                            if ((this.setCurrentActionVerbComp == "lookAt")) {

                                var descriptionId = gameData.rooms[i].npc[k].descriptionId;

                                var x;
                                for (x = 0; x < gameData.rooms[i].npc[k].description.length; x++) {

                                    if ((gameData.rooms[i].npc[k].description[x].id == descriptionId)) {
                                        this.speechAndMovements(gameData.rooms[i].npc[k].description[x].protocol);
                                    }

                                }

                                return false;
                            }
                            /* Looking END */






                            /* Pick up START */
                            if ((this.setCurrentActionVerbComp == "pickUp")) {
                                var x;
                                for (x = 0; x < gameData.rooms[i].npc[k].itemAndActionCombinations.length; x++) {
                                    if ((gameData.rooms[i].npc[k].itemAndActionCombinations[x].actionRequired == "pickUp") && (gameData.rooms[i].npc[k].itemAndActionCombinations[x].available == true)) {
                                        this.speechAndMovements(gameData.rooms[i].npc[k].itemAndActionCombinations[x].protocol);
                                        return false;
                                    }
                                }

                                var x;
                                for (x = 0; x < gameData.playerSettings.playableCharacters.length; x++) {
                                    if ((gameData.playerSettings.playableCharacters[x].id == currentPlayableCharacterId)) {
                                        this.speechAndMovements(gameData.playerSettings.playableCharacters[x].defaultGlobalSpeeches.pickUpNPC);
                                    }
                                }
                                return false;
                            }
                            /* Pick up END */


                            /* Open START */
                            if ((this.setCurrentActionVerbComp == "open")) {
                                var x;
                                for (x = 0; x < gameData.rooms[i].npc[k].itemAndActionCombinations.length; x++) {
                                    if ((gameData.rooms[i].npc[k].itemAndActionCombinations[x].actionRequired == "open") && (gameData.rooms[i].npc[k].itemAndActionCombinations[x].available == true)) {
                                        this.speechAndMovements(gameData.rooms[i].npc[k].itemAndActionCombinations[x].protocol);
                                        return false;
                                    }
                                }

                                var x;
                                for (x = 0; x < gameData.playerSettings.playableCharacters.length; x++) {
                                    if ((gameData.playerSettings.playableCharacters[x].id == currentPlayableCharacterId)) {
                                        this.speechAndMovements(gameData.playerSettings.playableCharacters[x].defaultGlobalSpeeches.openNPC);
                                    }
                                }

                                return false;
                            }
                            /* Open END */


                            /* Close START */
                            if ((this.setCurrentActionVerbComp == "close")) {
                                var x;
                                for (x = 0; x < gameData.rooms[i].npc[k].itemAndActionCombinations.length; x++) {
                                    if ((gameData.rooms[i].npc[k].itemAndActionCombinations[x].actionRequired == "close") && (gameData.rooms[i].npc[k].itemAndActionCombinations[x].available == true)) {
                                        this.speechAndMovements(gameData.rooms[i].npc[k].itemAndActionCombinations[x].protocol);
                                        return false;
                                    }
                                }

                                var x;
                                for (x = 0; x < gameData.playerSettings.playableCharacters.length; x++) {
                                    if ((gameData.playerSettings.playableCharacters[x].id == currentPlayableCharacterId)) {
                                        this.speechAndMovements(gameData.playerSettings.playableCharacters[x].defaultGlobalSpeeches.closeNPC);
                                    }
                                }

                                return false;
                            }
                            /* Close END */


                            /* Push START */
                            if ((this.setCurrentActionVerbComp == "push")) {
                                var x;
                                for (x = 0; x < gameData.rooms[i].npc[k].itemAndActionCombinations.length; x++) {
                                    if ((gameData.rooms[i].npc[k].itemAndActionCombinations[x].actionRequired == "push") && (gameData.rooms[i].npc[k].itemAndActionCombinations[x].available == true)) {
                                        this.speechAndMovements(gameData.rooms[i].npc[k].itemAndActionCombinations[x].protocol);
                                        return false;
                                    }
                                }

                                var x;
                                for (x = 0; x < gameData.playerSettings.playableCharacters.length; x++) {
                                    if ((gameData.playerSettings.playableCharacters[x].id == currentPlayableCharacterId)) {
                                        this.speechAndMovements(gameData.playerSettings.playableCharacters[x].defaultGlobalSpeeches.pushNPC);
                                    }
                                }

                                return false;
                            }
                            /* Push END */


                            /* Pull START */
                            if ((this.setCurrentActionVerbComp == "pull")) {
                                var x;
                                for (x = 0; x < gameData.rooms[i].npc[k].itemAndActionCombinations.length; x++) {
                                    if ((gameData.rooms[i].npc[k].itemAndActionCombinations[x].actionRequired == "pull") && (gameData.rooms[i].npc[k].itemAndActionCombinations[x].available == true)) {
                                        this.speechAndMovements(gameData.rooms[i].npc[k].itemAndActionCombinations[x].protocol);
                                        return false;
                                    }
                                }

                                var x;
                                for (x = 0; x < gameData.playerSettings.playableCharacters.length; x++) {
                                    if ((gameData.playerSettings.playableCharacters[x].id == currentPlayableCharacterId)) {
                                        this.speechAndMovements(gameData.playerSettings.playableCharacters[x].defaultGlobalSpeeches.pullNPC);
                                    }
                                }

                                return false;
                            }
                            /* Pull END */


                            /* Give or Use START */
                            if ((this.setCurrentActionVerbComp == "give") || (this.setCurrentActionVerbComp == "use")) {
                                var x;
                                for (x = 0; x < gameData.rooms[i].npc[k].itemAndActionCombinations.length; x++) {
                                    /* Check to see that there is a conversation matching the item selected AND the correct action matches one of those allowed */
                                    if ((gameData.rooms[i].npc[k].itemAndActionCombinations[x].itemRequired == this.currentlySelectedItemRef) && (gameData.rooms[i].npc[k].itemAndActionCombinations[x].actionRequired.indexOf(this.setCurrentActionVerbComp) > -1) && (gameData.rooms[i].npc[k].itemAndActionCombinations[x].available == true)) {
                                        this.speechAndMovements(gameData.rooms[i].npc[k].itemAndActionCombinations[x].protocol);
                                        return false;
                                    }

                                }

                                var x;
                                for (x = 0; x < gameData.playerSettings.playableCharacters.length; x++) {
                                    if ((gameData.playerSettings.playableCharacters[x].id == currentPlayableCharacterId)) {
                                        this.speechAndMovements(gameData.playerSettings.playableCharacters[x].defaultGlobalSpeeches.giveUseToNPC);
                                    }
                                }

                                return false;
                            }
                            /* Give or Use END */

                        }
                    }
                }
            }



        },





        setCurrentActionVerbFunction: function (modeClickedOn) {

            this.playSelectActionSound();

            this.resetActionModes();

            /* Change that item has now been acquired START */
            this.setCurrentActionVerbFriendly = modeClickedOn.friendlyRef;
            this.setCurrentActionVerbComp = modeClickedOn.compRef;
            /* Change that item has now been acquired END */



        },




        completeItemPickUp: function (itemId) {


            /* Remove the item from the scene START */
            this['inventory' + itemId].kill();
            /* Remove the item from the scene END */

            this.playerCollectionAnim.onComplete.add(function () {

                /* Allow the player to move again START */
                this.disableToolBarAndPlayerMovements = false;
                /* Allow the player to move again END */


                /* Set the player to go back to normal idle anim START */
                if ((this['player' + currentPlayableCharacterId].animations.currentAnim.name == "player" + currentPlayableCharacterId + this.acquirePlayableCharactersCurrentGroupAnimationId(currentPlayableCharacterId) + 2) /* Collect Crouch Left */ || (this['player' + currentPlayableCharacterId].animations.currentAnim.name == "player" + currentPlayableCharacterId + this.acquirePlayableCharactersCurrentGroupAnimationId(currentPlayableCharacterId) + 4) /* Collect Reach Left */ || (this['player' + currentPlayableCharacterId].animations.currentAnim.name == "player" + currentPlayableCharacterId + this.acquirePlayableCharactersCurrentGroupAnimationId(currentPlayableCharacterId) + 6)) /* Collect Stand Left */ {
                    this.setPlayerAnimation(14, currentPlayableCharacterId); //Idle Left
                }

                if ((this['player' + currentPlayableCharacterId].animations.currentAnim.name == "player" + currentPlayableCharacterId + this.acquirePlayableCharactersCurrentGroupAnimationId(currentPlayableCharacterId) + 3) /* Collect Crouch Right */ || (this['player' + currentPlayableCharacterId].animations.currentAnim.name == "player" + currentPlayableCharacterId + this.acquirePlayableCharactersCurrentGroupAnimationId(currentPlayableCharacterId) + 5) /* Collect Reach Right */ || (this['player' + currentPlayableCharacterId].animations.currentAnim.name == "player" + currentPlayableCharacterId + this.acquirePlayableCharactersCurrentGroupAnimationId(currentPlayableCharacterId) + 7)) /* Collect Stand Right */ {
                    this.setPlayerAnimation(15, currentPlayableCharacterId); //Idle Right
                }

                /* Set the player to go back to normal idle anim END */




            }, this);



        },




        inventorySceneItemClickedOn: function (itemPickedUp) {

            var i;
            for (i = 0; i < gameData.inventoryBox.length; i++) {



                if ((gameData.inventoryBox[i].id == itemPickedUp.id)) {


                    /* If just walking to the item, just go to it and do nothing else START */
                    if ((this.setCurrentActionVerbComp == "walkTo")) {
                        this.cancelPlayerWalkingTweenAndSetToIdle(currentPlayableCharacterId);

                        return false;
                    }
                    /* If just walking to the item, just go to it and do nothing else END */

                    /* If looking at the item, describe it START */
                    if ((this.setCurrentActionVerbComp == "lookAt")) {
                        this.cancelPlayerWalkingTweenAndSetToIdle(currentPlayableCharacterId);

                        this.speechAndMovements(gameData.inventoryBox[i].pickUpOnSceneDetails.lookAtProtocolItemOnScene);

                        return false;
                    }
                    /* If looking at the item, describe it END */



                    /* NEW START */
                    var x;
                    for (x = 0; x < gameData.inventoryBox[i].pickUpOnSceneDetails.collectionProtocol.length; x++) {

                        // Has to be available first
                        if ((gameData.inventoryBox[i].pickUpOnSceneDetails.collectionProtocol[x].available == true)) {

                            if ((gameData.inventoryBox[i].pickUpOnSceneDetails.collectionProtocol[x].appliesToAllPlayableCharacters == true) || (gameData.inventoryBox[i].pickUpOnSceneDetails.collectionProtocol[x].appliesToPlayableCharacterIds.indexOf(currentPlayableCharacterId) >= 0))
                            {

                                        if ((gameData.inventoryBox[i].pickUpOnSceneDetails.collectionProtocol[x].actionRequired.indexOf(this.setCurrentActionVerbComp) > -1))
                                        {

                                            /* Disable the player from moving whilst we are perfoming the pick up animation START */
                                            this.disableToolBarAndPlayerMovements = true;
                                            /* Disable the player from moving whilst we are perfoming the pick up animation END */

                                            this.collectionProtocolToFinish = gameData.inventoryBox[i].pickUpOnSceneDetails.collectionProtocol[x].id;
                                            this.speechAndMovements(gameData.inventoryBox[i].pickUpOnSceneDetails.collectionProtocol[x].protocolBeforeCollectionAnim);

                                            
                                            return false;
                                            break;
                                        }

                            }
                        }
                    }
                    /* NEW END */



                    
                    
                        var k;
                        for (k = 0; k < gameData.playerSettings.playableCharacters.length; k++) {
                            if ((gameData.playerSettings.playableCharacters[k].id == currentPlayableCharacterId)) {
                                this.speechAndMovements(gameData.playerSettings.playableCharacters[k].defaultGlobalSpeeches.inventoryItemOnSceneIncorrectAction);
                            }
                        }
                    
                    /* Remove the item from the scene and add the item to the inventory JSON END */



                }







            }





        },




        performAfterCollectionProtocols: function () {

            var i;
            for (i = 0; i < gameData.inventoryBox.length; i++) {

                if ((gameData.inventoryBox[i].pickUpOnSceneDetails != null))
                {

                    /* NEW START */
                    var x;
                    for (x = 0; x < gameData.inventoryBox[i].pickUpOnSceneDetails.collectionProtocol.length; x++) {

                        // Has to be available first
                        if ((gameData.inventoryBox[i].pickUpOnSceneDetails.collectionProtocol[x].id == this.collectionProtocolToFinish)) {


                            this.collectionProtocolToFinish = null;

                                            // If can collect then remove item off scene
                                            if ((gameData.inventoryBox[i].pickUpOnSceneDetails.collectionProtocol[x].type == 0) || (gameData.inventoryBox[i].pickUpOnSceneDetails.collectionProtocol[x].type == 1))
                                            {

                                                this.playerCollectionAnim = this.runPlayerCollectionAnimation(gameData.inventoryBox[i].pickUpOnSceneDetails.collectionProtocol[x].playerCollectionAnimId);

                                                var temp = gameData.inventoryBox[i].pickUpOnSceneDetails.collectionProtocol[x].protocolAfterCollectionAnim;
                                                this.playerCollectionAnim.onComplete.add(function () {
                                                    this.speechAndMovements(temp);
                                                }, this);

                                                /* Add to inventory records START */
                                                if ((gameData.inventoryBox[i].pickUpOnSceneDetails.collectionProtocol[x].type == 0))
                                                {
                                                    this.addToInventoryRecords(gameData.inventoryBox[i].id, currentPlayableCharacterId);
                                                    gameData.inventoryBox[i].pickUpOnSceneDetails.placedInRoomId = 0;
                                                    var inventoryId = gameData.inventoryBox[i].id;
                                                    this.game.time.events.add(this.acquirePlayerCollectionTimeDelay(gameData.inventoryBox[i].pickUpOnSceneDetails.collectionProtocol[x].playerCollectionAnimId), function () { this.completeItemPickUp(inventoryId) }, this);
                                                }
                                                /* Add to inventory records END */

                                            }
                                            else
                                            {
                                                this.speechAndMovements(gameData.inventoryBox[i].pickUpOnSceneDetails.collectionProtocol[x].protocolAfterCollectionAnim);
                                            }
                            
                        }
                    }
                    /* NEW END */
                    
                    /* Remove the item from the scene and add the item to the inventory JSON END */

                }


            }


        },





        runPlayerCollectionAnimation: function (animation){

            var result = null;

            /* Play the player collection animation START */
            var z;
            for (z = 0; z < gameData.playerSettings.playableCharacters.length; z++) {
                if ((gameData.playerSettings.playableCharacters[z].id == currentPlayableCharacterId)) {

                    

                    var k;
                    for (k = 0; k < gameData.playerSettings.playableCharacters[z].groupAnimations.length; k++) {
                        if ((gameData.playerSettings.playableCharacters[z].groupAnimations[k].id == gameData.playerSettings.playableCharacters[z].currentGroupAnimationId))
                        {

                            var x;
                            for (x = 0; x < gameData.playerSettings.playableCharacters[z].groupAnimations[k].animations.length; x++)
                            {

                                if ((gameData.playerSettings.playableCharacters[z].groupAnimations[k].animations[x].id == animation))
                                {
                                    this['player' + currentPlayableCharacterId].loadTexture("player" + currentPlayableCharacterId + gameData.playerSettings.playableCharacters[z].groupAnimations[k].id + animation, 0);
                                    this['player' + currentPlayableCharacterId].animations.add("player" + currentPlayableCharacterId + gameData.playerSettings.playableCharacters[z].groupAnimations[k].id + animation);
                                    result = this['player' + currentPlayableCharacterId].animations.play("player" + currentPlayableCharacterId + gameData.playerSettings.playableCharacters[z].groupAnimations[k].id + animation, gameData.playerSettings.playableCharacters[z].groupAnimations[k].animations[x].frameRate, gameData.playerSettings.playableCharacters[z].groupAnimations[k].animations[x].loop);
                                
                                }

                                
                            }

                        }
                    }





                    
                }
            }

            return result;

        },



        acquirePlayerCollectionTimeDelay: function (animation){

            var result = 0;

            /* Play the player collection animation START */
            var z;
            for (z = 0; z < gameData.playerSettings.playableCharacters.length; z++) {
                if ((gameData.playerSettings.playableCharacters[z].id == currentPlayableCharacterId)) {

                    

                    var k;
                    for (k = 0; k < gameData.playerSettings.playableCharacters[z].groupAnimations.length; k++) {
                        if ((gameData.playerSettings.playableCharacters[z].groupAnimations[k].id == gameData.playerSettings.playableCharacters[z].currentGroupAnimationId))
                        {

                            var x;
                            for (x = 0; x < gameData.playerSettings.playableCharacters[z].groupAnimations[k].animations.length; x++)
                            {

                                if ((gameData.playerSettings.playableCharacters[z].groupAnimations[k].animations[x].id == animation))
                                {
                                    result = gameData.playerSettings.playableCharacters[z].groupAnimations[k].animations[x].pickUpItemDelay;
                                }

                                
                            }

                        }
                    }





                    
                }
            }

            return result;

        },







        removeFromInventory: function (itemToBeRemoved, playerId) {

                    var dealingWithPlayerId;

                    if ((playerId == -1))
                    {
                        dealingWithPlayerId = currentPlayableCharacterId;
                    }
                    else
                    {
                        dealingWithPlayerId = playerId;
                    }



            /* Set the order number in the inventory box back to 0 since we no long have it START */
            var i;
            for (i = 0; i < gameData.inventoryBox.length; i++) {
                if ((gameData.inventoryBox[i].id == itemToBeRemoved)) {
                    var thisItemsOrderNumber = gameData.inventoryBox[i].orderNumber;
                    gameData.inventoryBox[i].orderNumber = 0;
                    gameData.inventoryBox[i].ownedByPlayableCharacterId = null;
                }
            }
            /* Set the order number in the inventory box back to 0 since we no long have it END */


            /* Any items which have a higher number than the item we've just removed, then move it down one START */
            var i;
            for (i = 0; i < gameData.inventoryBox.length; i++) {
                if ((gameData.inventoryBox[i].orderNumber > thisItemsOrderNumber) && (gameData.inventoryBox[i].ownedByPlayableCharacterId == dealingWithPlayerId)) {
                    gameData.inventoryBox[i].orderNumber = gameData.inventoryBox[i].orderNumber - 1;
                }
            }
            /* Any items which have a higher number than the item we've just removed, then move it down one END */


        },


        addToInventoryRecords: function (itemPickedUp, assignToPlayerId) {

            /* UPDATE INVENTORY START */



            /* Put all the inventory item order numbers into an array START */
            var k = [0];

            var i;
            for (i = 0; i < gameData.inventoryBox.length; i++) {
                if ((gameData.inventoryBox[i].ownedByPlayableCharacterId == assignToPlayerId)) {
                    k.push(gameData.inventoryBox[i].orderNumber);
                }
            }
            /* Put all the inventory item order numbers into an array END */

            /* Remove any duplicates START */
            var newArr = [],
                origLen = k.length,
                found, x, y;

            for (x = 0; x < origLen; x++) {
                found = undefined;
                for (y = 0; y < newArr.length; y++) {
                    if (k[x] === newArr[y]) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    newArr.push(k[x]);
                }
            }
            /* Remove any duplicates END */

            /* Then sort the list and locate the smallest available order number starting from 1 START */
            newArr.sort(function (a, b) { return a - b; });   // To sort by numeric

            var offset = newArr[0];
            var lowest = -1;
            for (i = 0; i < newArr.length; ++i) {
                if (newArr[i] != offset) {
                    lowest = offset;
                    break;
                }
                ++offset;
            }
            if (lowest == -1) {
                lowest = newArr[newArr.length - 1] + 1;
            }
            /* Then sort the list and locate the smallest available order number starting from 1 END */

            /* Then set the items order number START */
            var i;
            for (i = 0; i < gameData.inventoryBox.length; i++) {

                if ((gameData.inventoryBox[i].id == itemPickedUp)) {
                    gameData.inventoryBox[i].orderNumber = lowest;
                    gameData.inventoryBox[i].ownedByPlayableCharacterId = assignToPlayerId;
                }
            }
            /* Then set the items order number END */








            /* UPDATE INVENTORY END */


        },








        playDefaultPlayableCharactersFootstepsSound: function (playableCharacterId){

            var foleyId;

            var i;
            for (i = 0; i < gameData.playerSettings.playableCharacters.length; i++) {
                if ((gameData.playerSettings.playableCharacters[i].id == playableCharacterId)) {
                    foleyId = gameData.playerSettings.playableCharacters[i].defaultFootstepsAudio;
                }
            }


            var i;
            for (i = 0; i < foleySounds.items.length; i++) {
                if ((foleySounds.items[i].id == foleyId)) {
                    this.foleyFootstepsSounds.addMarker("playableCharacterFootstepsSound"+playableCharacterId, foleySounds.items[i].start, foleySounds.items[i].duration, userSettings.volumes.sfxVolume, true);
                    this.foleyFootstepsSounds.play("playableCharacterFootstepsSound"+playableCharacterId);
                }
            }
        },


        stopPlayableCharactersFootstepsSound: function (playableCharacterId){
            this.foleyFootstepsSounds.stop("playableCharacterFootstepsSound"+playableCharacterId);
            this.foleyFootstepsSounds.removeMarker("playableCharacterFootstepsSound"+playableCharacterId);
        },


        playAnimationOverridePlayableCharactersFootstepsSound: function (playableCharacterId){

            var foleyId;

            var i;
            for (i = 0; i < gameData.rooms.length; i++) {
                if ((gameData.rooms[i].id == currentRoom)) {

                    var k;
                    for (k = 0; k < gameData.rooms[i].animationOverrideAreas.length; k++) {

                        if ((gameData.rooms[i].animationOverrideAreas[k].appliesToAllPlayableCharacters == true))
                        {
                            var foleyId = gameData.rooms[i].animationOverrideAreas[k].walkFootstepsAudio;
                        }

                    }

                }
            }


            var i;
            for (i = 0; i < foleySounds.items.length; i++) {
                if ((foleySounds.items[i].id == foleyId)) {
                    this.foleyFootstepsSounds.addMarker("playableCharacterAnimationOverrideFootstepsSound"+playableCharacterId, foleySounds.items[i].start, foleySounds.items[i].duration, userSettings.volumes.sfxVolume, true);
                    this.foleyFootstepsSounds.play("playableCharacterAnimationOverrideFootstepsSound"+playableCharacterId);
                }
            }
        },


        stopAnimationOverridePlayableCharactersFootstepsSound: function (playableCharacterId){
            this.foleyFootstepsSounds.stop("playableCharacterAnimationOverrideFootstepsSound"+playableCharacterId);
            this.foleyFootstepsSounds.removeMarker("playableCharacterAnimationOverrideFootstepsSound"+playableCharacterId);
        },





        playDefaultNpcCharactersFootstepsSound: function (npcCharacterId){

            var foleyId;

            var i;
            for (i = 0; i < gameData.rooms.length; i++)
            {
                if ((gameData.rooms[i].id == currentRoom))
                {
                    var k;
                    for (k = 0; k < gameData.rooms[i].npc.length; k++)
                    {
                        if ((gameData.rooms[i].npc[k].id == npcCharacterId))
                        {
                            foleyId = gameData.rooms[i].npc[k].defaultFootstepsAudio;
                        }
                    }
                }
            }


            var i;
            for (i = 0; i < foleySounds.items.length; i++) {
                if ((foleySounds.items[i].id == foleyId)) {
                    this.foleyFootstepsSounds.addMarker("npcCharacterFootstepsSound"+npcCharacterId, foleySounds.items[i].start, foleySounds.items[i].duration, userSettings.volumes.sfxVolume, true);
                    this.foleyFootstepsSounds.play("npcCharacterFootstepsSound"+npcCharacterId);
                }
            }
        },

        stopNpcCharactersFootstepsSound: function (npcCharacterId){
            this.foleyFootstepsSounds.stop("npcCharacterFootstepsSound"+npcCharacterId);
            this.foleyFootstepsSounds.removeMarker("npcCharacterFootstepsSound"+npcCharacterId);
        },







        playOpenInventorySound: function (){
            var i;
            for (i = 0; i < foleySounds.items.length; i++) {
                if ((foleySounds.items[i].id == systemSettings.gameplaySettings.uiSounds.openInventory)) {
                    this.foleySounds.addMarker("openInventorySound", foleySounds.items[i].start, foleySounds.items[i].duration, userSettings.volumes.sfxVolume, false);
                    this.foleySounds.play("openInventorySound");
                }
            }
        },

        playSaveAndLoadSound: function (){
            var i;
            for (i = 0; i < foleySounds.items.length; i++) {
                if ((foleySounds.items[i].id == systemSettings.gameplaySettings.uiSounds.openSaveAndLoad)) {
                    this.foleySounds.addMarker("saveAndLoadSound", foleySounds.items[i].start, foleySounds.items[i].duration, userSettings.volumes.sfxVolume, false);
                    this.foleySounds.play("saveAndLoadSound");
                }
            }
        },

        playOpenVolumesSound: function (){
            var i;
            for (i = 0; i < foleySounds.items.length; i++) {
                if ((foleySounds.items[i].id == systemSettings.gameplaySettings.uiSounds.openVolumes)) {
                    this.foleySounds.addMarker("openVolumesSound", foleySounds.items[i].start, foleySounds.items[i].duration, userSettings.volumes.sfxVolume, false);
                    this.foleySounds.play("openVolumesSound");
                }
            }
        },

        playOpenTextAndSpeechSound: function (){
            var i;
            for (i = 0; i < foleySounds.items.length; i++) {
                if ((foleySounds.items[i].id == systemSettings.gameplaySettings.uiSounds.openTextAndSpeech)) {
                    this.foleySounds.addMarker("openTextAndSpeechSound", foleySounds.items[i].start, foleySounds.items[i].duration, userSettings.volumes.sfxVolume, false);
                    this.foleySounds.play("openTextAndSpeechSound");
                }
            }
        },

        playOpenSettingsSound: function (){
            var i;
            for (i = 0; i < foleySounds.items.length; i++) {
                if ((foleySounds.items[i].id == systemSettings.gameplaySettings.uiSounds.openSettings)) {
                    this.foleySounds.addMarker("openSettingsSound", foleySounds.items[i].start, foleySounds.items[i].duration, userSettings.volumes.sfxVolume, false);
                    this.foleySounds.play("openSettingsSound");
                }
            }
        },

        playOpenPointsOfInterestSound: function (){
            var i;
            for (i = 0; i < foleySounds.items.length; i++) {
                if ((foleySounds.items[i].id == systemSettings.gameplaySettings.uiSounds.openPointsOfInterest)) {
                    this.foleySounds.addMarker("openPointsOfInterestSound", foleySounds.items[i].start, foleySounds.items[i].duration, userSettings.volumes.sfxVolume, false);
                    this.foleySounds.play("openPointsOfInterestSound");
                }
            }
        },

        playInventoryArrowsSound: function (){
            var i;
            for (i = 0; i < foleySounds.items.length; i++) {
                if ((foleySounds.items[i].id == systemSettings.gameplaySettings.uiSounds.inventoryArrows)) {
                    this.foleySounds.addMarker("inventoryArrowsSound", foleySounds.items[i].start, foleySounds.items[i].duration, userSettings.volumes.sfxVolume, false);
                    this.foleySounds.play("inventoryArrowsSound");
                }
            }
        },

        playSwitchPlayableCharacterSound: function (){
            var i;
            for (i = 0; i < foleySounds.items.length; i++) {
                if ((foleySounds.items[i].id == systemSettings.gameplaySettings.uiSounds.switchPlayableCharacter)) {
                    this.foleySounds.addMarker("switchPlayableCharacterSound", foleySounds.items[i].start, foleySounds.items[i].duration, userSettings.volumes.sfxVolume, false);
                    this.foleySounds.play("switchPlayableCharacterSound");
                }
            }
        },

        playOpenOptionsForPointsOfInterestSound: function (){
            var i;
            for (i = 0; i < foleySounds.items.length; i++) {
                if ((foleySounds.items[i].id == systemSettings.gameplaySettings.uiSounds.openOptionsForPointsOfInterest)) {
                    this.foleySounds.addMarker("openOptionsForPointsOfInterestSound", foleySounds.items[i].start, foleySounds.items[i].duration, userSettings.volumes.sfxVolume, false);
                    this.foleySounds.play("openOptionsForPointsOfInterestSound");
                }
            }
        },

        playSelectActionSound: function (){
            var i;
            for (i = 0; i < foleySounds.items.length; i++) {
                if ((foleySounds.items[i].id == systemSettings.gameplaySettings.uiSounds.selectAction)) {
                    this.foleySounds.addMarker("selectActionSound", foleySounds.items[i].start, foleySounds.items[i].duration, userSettings.volumes.sfxVolume, false);
                    this.foleySounds.play("selectActionSound");
                }
            }
        },




        toggleInventoryBox: function (forceState) {

            this.cancelPlayerWalkingTweenAndSetToIdle(currentPlayableCharacterId);

            this.destroyCloseUpImage();

            this.destroyToDoList();

            this.playOpenInventorySound();

            console.log(gameData);


            this.closeCompass();




            if ((forceState == "close") || (this.inventoryBoxOpen == true)) {





                this.inventoryBoxOpen = false;


                /* If the current action is set to look at, then automatically set it to walk to START */

                if ((this.setCurrentActionVerbComp == "")) {
                    this.setCurrentActionVerbFriendly = acquireSystemText("walkTo");
                    this.setCurrentActionVerbComp = "walkTo";
                }

                /* If the current action is set to look at, then automatically set it to walk to END */


                /* Remove the entire inventory box group START */
                this.inventoryBoxConstructionGroup.destroy();
                /* Remove the entire inventory box group END */

                this.currentInventoryIndex = 1;
                this.currentDraggedInventoryItem = null;

                this.topScrollInventoryBar = null;
                this.bottomScrollInventoryBar = null;



            }



            /* Opening */
            else {

                this.inventoryBoxOpen = true;


                
                


                /* If the current action is set to walk to, then automatically set it to look at START */
                this.setCurrentActionVerbFriendly = "";
                this.setCurrentActionVerbComp = "";
                this.currentlySelectedItemRef = "";
                this.currentlySelectedItemName = "";
                this.setCurrentActionNoun = "";
                this.useItemBridgingWord = "";
                
                /* Current action mode Colors START */
                var actionTextGradient = this.currentActionModeText.context.createLinearGradient(0, 0, 0, this.currentActionModeText.height);
                actionTextGradient.addColorStop(0, systemSettings.gameplaySettings.uiText.actionsText.textColor);
                actionTextGradient.addColorStop(1, systemSettings.gameplaySettings.uiText.actionsText.textColorAdditional);
                this.currentActionModeText.fill = actionTextGradient;
                /* Current action mode Colors END */
                /* If the current action is set to walk to, then automatically set it to look at END */


                this.inventoryBoxConstructionGroup = this.game.add.group();

                this.buildInventoryInterface(true);









            }




        },





        buildInventoryInterface: function (brandNewOpen) {




            /* If this is a brand new open, only build the things that need to be built once START */
            if ((brandNewOpen == true)) {
                this.buildInventoryInvisibleCloseBoxes();
                this.buildInventoryBackground();
                this.buildInventoryInstructionText();

                if ((systemSettings.gameplaySettings.format == 0))
                {
                    this.buildInventorySideOptions();
                }
                
                this.buildInventoryTopAndBottomScrollBars();
            }
            /* If this is a brand new open, only build the things that need to be built once END */


            this.inventoryBoxConstructionGroup.forEachAlive(function (element) {
                if ((element.type == "arrow")) {
                    element.kill();
                }
                if ((element.type == "placeholder")) {
                    element.kill();
                }
                if ((element.type == "item")) {
                    element.kill();
                }
            }, this);





            this.buildInventoryPlaceholders();

            this.populateInventory();

            this.buildInventoryArrows();








        },





        buildInventoryInvisibleCloseBoxes: function () {

            /* Put on the invisible rectangle areas around the inventory box background so that it closes down when user presses away START */
            this.invisibleCloseBox = this.game.add.sprite(0, 0, 'invisibleCloseBox');
            this.invisibleCloseBox.width = systemSettings.resolution.width;
            this.invisibleCloseBox.height = systemSettings.resolution.height;
            this.invisibleCloseBox.inputEnabled = true;
            this.invisibleCloseBox.events.onInputDown.add(this.toggleInventoryBox, this, "close");
            this.invisibleCloseBox.fixedToCamera = true;
            this.invisibleCloseBox.type = "invisibleCloseBox";
            this.inventoryBoxConstructionGroup.add(this.invisibleCloseBox);
            /* Put on the invisible rectangle areas around the inventory box background so that it closes down when user presses away END */

        },


        buildInventoryBackground: function () {

            /* Put on the inventory background START */
            this.inventoryBox = this.game.add.sprite(systemSettings.gameplaySettings.formatOptions.uiIconPositions.inventoryBackground.x, systemSettings.gameplaySettings.formatOptions.uiIconPositions.inventoryBackground.y, 'inventoryBox');
            this.inventoryBox.fixedToCamera = true;
            this.inventoryBox.type = "background";
            this.inventoryBoxConstructionGroup.add(this.inventoryBox);
            /* Put on the inventory background END */

        },


        buildInventoryPlaceholders: function () {

            var i;
            for (i = 0; i < systemSettings.gameplaySettings.formatOptions.placeholders.length; i++) {

                this['inventoryPlaceholder' + systemSettings.gameplaySettings.formatOptions.placeholders[i].id] = this.game.add.sprite(systemSettings.gameplaySettings.formatOptions.placeholders[i].x, systemSettings.gameplaySettings.formatOptions.placeholders[i].y, 'inventoryPlaceholder');
                this['inventoryPlaceholder' + systemSettings.gameplaySettings.formatOptions.placeholders[i].id].anchor.x = systemSettings.gameplaySettings.uiIcons.uiInventoryPlaceholderAnchorPointX;
                this['inventoryPlaceholder' + systemSettings.gameplaySettings.formatOptions.placeholders[i].id].anchor.y = systemSettings.gameplaySettings.uiIcons.uiInventoryPlaceholderAnchorPointY;
                this['inventoryPlaceholder' + systemSettings.gameplaySettings.formatOptions.placeholders[i].id].orderNumber = this.currentInventoryIndex + i;
                this['inventoryPlaceholder' + systemSettings.gameplaySettings.formatOptions.placeholders[i].id].fixedToCamera = true;
                this['inventoryPlaceholder' + systemSettings.gameplaySettings.formatOptions.placeholders[i].id].type = "placeholder";
                this.inventoryBoxConstructionGroup.add(this['inventoryPlaceholder' + systemSettings.gameplaySettings.formatOptions.placeholders[i].id]);
                
            }

        },



        buildInventoryInstructionText: function () {

            /* Display text on how to combine items START */
            this.combineItemsInstructionText = this.game.add.text(systemSettings.gameplaySettings.uiText.combineItemsText.x, systemSettings.gameplaySettings.uiText.combineItemsText.y, acquireSystemText("combineItemsInstructionText"), { font: ""+this.calculateTextSizeInPercentage(systemSettings.gameplaySettings.uiText.combineItemsText.languages[currentLang].fontSize, userSettings.textSize.interface)+"px "+acquireFontName(systemSettings.gameplaySettings.uiText.combineItemsText.languages[currentLang].fontId)+"", fill: systemSettings.gameplaySettings.uiText.combineItemsText.textColor });
            this.combineItemsInstructionText.wordWrap = true;
            this.combineItemsInstructionText.align = 'center';
            this.combineItemsInstructionText.wordWrap = true;
            this.combineItemsInstructionText.wordWrapWidth = systemSettings.gameplaySettings.uiText.combineItemsText.width;
            this.combineItemsInstructionText.lineSpacing = systemSettings.gameplaySettings.uiText.combineItemsText.languages[currentLang].lineSpacing;
            
            if ((systemSettings.gameplaySettings.uiText.combineItemsText.stroke.show == true))
			{
				this.combineItemsInstructionText.stroke = systemSettings.gameplaySettings.uiText.combineItemsText.stroke.color;
				this.combineItemsInstructionText.strokeThickness = systemSettings.gameplaySettings.uiText.combineItemsText.stroke.thickness;
            }
                    
            if ((systemSettings.gameplaySettings.uiText.combineItemsText.shadow.show == true))
			{
				this.combineItemsInstructionText.setShadow(systemSettings.gameplaySettings.uiText.combineItemsText.shadow.x, systemSettings.gameplaySettings.uiText.combineItemsText.shadow.y, systemSettings.gameplaySettings.uiText.combineItemsText.shadow.color, systemSettings.gameplaySettings.uiText.combineItemsText.shadow.blur);
            }

            /* Colors START */
            var combineTextGradient = this.combineItemsInstructionText.context.createLinearGradient(0, 0, 0, this.combineItemsInstructionText.height);
            combineTextGradient.addColorStop(0, systemSettings.gameplaySettings.uiText.combineItemsText.textColor);
            combineTextGradient.addColorStop(1, systemSettings.gameplaySettings.uiText.combineItemsText.textColorAdditional);
            this.combineItemsInstructionText.fill = combineTextGradient;
            /* Colors END */

            this.combineItemsInstructionText.anchor.x = Math.round(this.combineItemsInstructionText.width * 0.5) / this.combineItemsInstructionText.width;
            this.combineItemsInstructionText.x = systemSettings.gameplaySettings.uiText.combineItemsText.x;
            this.combineItemsInstructionText.fixedToCamera = true;
            this.combineItemsInstructionText.type = "instructionText";
            this.inventoryBoxConstructionGroup.add(this.combineItemsInstructionText);
            /* Display text on how to combine items END */

        },


        buildInventorySideOptions: function () {

            

                this.sideOptionLookAt = this.game.add.sprite(systemSettings.gameplaySettings.formatOptions.uiIconPositions.lookAt.x, systemSettings.gameplaySettings.formatOptions.uiIconPositions.lookAt.y, "lookAt");
                this.sideOptionLookAt.compRef = "lookAt";
                this.sideOptionLookAt.friendlyRef = acquireSystemText("lookAt");
                this.sideOptionLookAt.inputEnabled = true;
                this.sideOptionLookAt.events.onInputDown.add(this.setCurrentActionVerbFunction, this);
                this.sideOptionLookAt.fixedToCamera = true;
                this.sideOptionLookAt.type = "option";
                this.inventoryBoxConstructionGroup.add(this.sideOptionLookAt);

                this.sideOptionUse = this.game.add.sprite(systemSettings.gameplaySettings.formatOptions.uiIconPositions.use.x, systemSettings.gameplaySettings.formatOptions.uiIconPositions.use.y, "use");
                this.sideOptionUse.compRef = "use";
                this.sideOptionUse.friendlyRef = acquireSystemText("use");
                this.sideOptionUse.inputEnabled = true;
                this.sideOptionUse.events.onInputDown.add(this.setCurrentActionVerbFunction, this);
                this.sideOptionUse.fixedToCamera = true;
                this.sideOptionUse.type = "option";
                this.inventoryBoxConstructionGroup.add(this.sideOptionUse);

                this.sideOptionGive = this.game.add.sprite(systemSettings.gameplaySettings.formatOptions.uiIconPositions.give.x, systemSettings.gameplaySettings.formatOptions.uiIconPositions.give.y, "give");
                this.sideOptionGive.compRef = "give";
                this.sideOptionGive.friendlyRef = acquireSystemText("give");
                this.sideOptionGive.inputEnabled = true;
                this.sideOptionGive.events.onInputDown.add(this.setCurrentActionVerbFunction, this);
                this.sideOptionGive.fixedToCamera = true;
                this.sideOptionGive.type = "option";
                this.inventoryBoxConstructionGroup.add(this.sideOptionGive);

            

        },




        numberOfItemsToShow: function () {

            /* Work out how many items there are to show based on the current item we need to start from START */
            var currentAmountOfItemsToShow = 0;

            var i;
            for (i = 0; i < gameData.inventoryBox.length; i++) {

                if ((gameData.inventoryBox[i].ownedByPlayableCharacterId == currentPlayableCharacterId) && (this.currentInventoryIndex <= gameData.inventoryBox[i].orderNumber)) {
                    currentAmountOfItemsToShow = currentAmountOfItemsToShow + 1;
                }

            }
            /* Work out how many items there are to show based on the current item we need to start from END */


            if ((this.currentDraggedInventoryItem != null)) {
                currentAmountOfItemsToShow = currentAmountOfItemsToShow - 1;
            }

            console.log(currentAmountOfItemsToShow);
            return currentAmountOfItemsToShow;

        },



        buildInventoryArrows: function () {



            var currentAmountOfItemsToShow = this.numberOfItemsToShow();






            /* If the index from number isn't 1, then we know we need to display the up arrow START */
            this.inventoryUpArrow = this.game.add.sprite(systemSettings.gameplaySettings.formatOptions.uiIconPositions.upArrow.x, systemSettings.gameplaySettings.formatOptions.uiIconPositions.upArrow.y, 'inventoryUpArrow');
            this.inventoryUpArrow.fixedToCamera = true;
            this.inventoryUpArrow.type = "arrow";
            this.inventoryUpArrow.inputEnabled = true;

            if ((this.currentInventoryIndex > 1)) {

                this.inventoryUpArrow.events.onInputDown.add(function () { this.deductFromCurrentInventoryIndex() }, this);
            }
            else {
                this.inventoryUpArrow.alpha = 0.2;
            }

            this.inventoryBoxConstructionGroup.add(this.inventoryUpArrow);
            /* If the index from number isn't 1, then we know we need to display the up arrow END */

            /* If the number of items to show exceeds 9, then show a down arrow START */
            this.inventoryDownArrow = this.game.add.sprite(systemSettings.gameplaySettings.formatOptions.uiIconPositions.downArrow.x, systemSettings.gameplaySettings.formatOptions.uiIconPositions.downArrow.y, 'inventoryDownArrow');
            this.inventoryDownArrow.fixedToCamera = true;
            this.inventoryDownArrow.type = "arrow";
            this.inventoryDownArrow.inputEnabled = true;

            if ((currentAmountOfItemsToShow > 8)) {

                this.inventoryDownArrow.events.onInputDown.add(function () { this.addToCurrentInventoryIndex() }, this);
            }
            else {
                this.inventoryDownArrow.alpha = 0.2;
            }

            this.inventoryBoxConstructionGroup.add(this.inventoryDownArrow);
            /* If the number of items to show exceeds 9, then show a down arrow END */










        },


        deductFromCurrentInventoryIndex: function () {
            this.playInventoryArrowsSound();
            this.currentInventoryIndex = this.currentInventoryIndex - systemSettings.gameplaySettings.formatOptions.inventoryScrollAmount;
            this.buildInventoryInterface(false)
        },

        addToCurrentInventoryIndex: function () {
            this.playInventoryArrowsSound();
            this.currentInventoryIndex = this.currentInventoryIndex + systemSettings.gameplaySettings.formatOptions.inventoryScrollAmount;
            this.buildInventoryInterface(false)
        },



        buildInventoryTopAndBottomScrollBars: function () {

            this.topScrollInventoryBar = new Phaser.Polygon([new Phaser.Point(systemSettings.gameplaySettings.formatOptions.inventoryScrollBars.top.topLeft.x, systemSettings.gameplaySettings.formatOptions.inventoryScrollBars.top.topLeft.y), new Phaser.Point(systemSettings.gameplaySettings.formatOptions.inventoryScrollBars.top.topRight.x, systemSettings.gameplaySettings.formatOptions.inventoryScrollBars.top.topRight.y), new Phaser.Point(systemSettings.gameplaySettings.formatOptions.inventoryScrollBars.top.bottomRight.x, systemSettings.gameplaySettings.formatOptions.inventoryScrollBars.top.bottomRight.y), new Phaser.Point(systemSettings.gameplaySettings.formatOptions.inventoryScrollBars.top.bottomLeft.x, systemSettings.gameplaySettings.formatOptions.inventoryScrollBars.top.bottomLeft.y)]);
            this.bottomScrollInventoryBar = new Phaser.Polygon([new Phaser.Point(systemSettings.gameplaySettings.formatOptions.inventoryScrollBars.bottom.topLeft.x, systemSettings.gameplaySettings.formatOptions.inventoryScrollBars.bottom.topLeft.y), new Phaser.Point(systemSettings.gameplaySettings.formatOptions.inventoryScrollBars.bottom.topRight.x, systemSettings.gameplaySettings.formatOptions.inventoryScrollBars.bottom.topRight.y), new Phaser.Point(systemSettings.gameplaySettings.formatOptions.inventoryScrollBars.bottom.bottomRight.x, systemSettings.gameplaySettings.formatOptions.inventoryScrollBars.bottom.bottomRight.y), new Phaser.Point(systemSettings.gameplaySettings.formatOptions.inventoryScrollBars.bottom.bottomLeft.x, systemSettings.gameplaySettings.formatOptions.inventoryScrollBars.bottom.bottomLeft.y)]);

        },



        destroyCloseUpImage: function () {
            if ((this.currentCloseUpImage != null)) {
                this.currentCloseUpImage.destroy();
            }
        },


        destroyToDoList: function () {

            if ((this.toDoListTextGroup != null) && (this.currentCloseUpImage != null)) {
                this.toDoListTextGroup.destroy();
                this.currentCloseUpImage.destroy();
            }


        },



        populateInventory: function () {





            /* Populate the inventory START */


            var i;
            for (i = 0; i < gameData.inventoryBox.length; i++) {

                if ((gameData.inventoryBox[i].orderNumber > 0) && (gameData.inventoryBox[i].ownedByPlayableCharacterId == currentPlayableCharacterId) && (gameData.inventoryBox[i].orderNumber >= this.currentInventoryIndex) && (gameData.inventoryBox[i].orderNumber < this.currentInventoryIndex + systemSettings.gameplaySettings.formatOptions.placeholders.length) && (gameData.inventoryBox[i].id != this.currentDraggedInventoryItem)) {

                    /* Get the inventory display image id for the item in question START */
                    this['inventoryItem' + gameData.inventoryBox[i].id] = this.game.add.sprite(0, 0, "inventoryDisplayImage"+gameData.inventoryBox[i].id);
                    /* Get the inventory display image id for the item in question END */



                    /* Set physics on this since we need to overlay it with target zones START */
                    this.game.physics.arcade.enable(this['inventoryItem' + gameData.inventoryBox[i].id]);
                    /* Set physics on this since we need to overlay it with target zones END */

                    /* Enable drag START */
                    this['inventoryItem' + gameData.inventoryBox[i].id].inputEnabled = true;
                    this['inventoryItem' + gameData.inventoryBox[i].id].input.enableDrag(false, true);
                    /* Enable drag END */

                    /* Set the anchor point to be center START */
                    this['inventoryItem' + gameData.inventoryBox[i].id].anchor.x = Math.round(this['inventoryItem' + gameData.inventoryBox[i].id].width * 0.5) / this['inventoryItem' + gameData.inventoryBox[i].id].width;
                    this['inventoryItem' + gameData.inventoryBox[i].id].anchor.y = Math.round(this['inventoryItem' + gameData.inventoryBox[i].id].height * 0.5) / this['inventoryItem' + gameData.inventoryBox[i].id].height;
                    /* Set the anchor point to be center END */

                    /* Set the original reference name START */
                    this['inventoryItem' + gameData.inventoryBox[i].id].id = gameData.inventoryBox[i].id;
                    this['inventoryItem' + gameData.inventoryBox[i].id].name = gameData.inventoryBox[i].languages[currentLang].name;
                    /* Set the original reference name END */



                    /* Now position onto the relevant placeholder START */
                    this.inventoryBoxConstructionGroup.forEachAlive(function (element) {
                        if ((element.orderNumber == gameData.inventoryBox[i].orderNumber) && (element.type == "placeholder")) {
                            /* Set the order number onto the newly created item and position it START */
                            this['inventoryItem' + gameData.inventoryBox[i].id].orderNumber = gameData.inventoryBox[i].orderNumber;
                            this['inventoryItem' + gameData.inventoryBox[i].id].x = element.x;
                            this['inventoryItem' + gameData.inventoryBox[i].id].y = element.y;
                            /* Set the order number onto the newly created item and position it END */

                        }
                    }, this);
                    /* Now position onto the relevant placeholder END */

                    /* Apply input events START */
                    this['inventoryItem' + gameData.inventoryBox[i].id].events.onDragStart.add(this.itemDragStart, this);
                    this['inventoryItem' + gameData.inventoryBox[i].id].events.onDragStop.add(this.itemDragEnd, this);
                    this['inventoryItem' + gameData.inventoryBox[i].id].events.onInputDown.add(this.inventoryItemDisplayClickedOn, this);
                    /* Apply input events END */

                    this['inventoryItem' + gameData.inventoryBox[i].id].fixedToCamera = true;

                    this['inventoryItem' + gameData.inventoryBox[i].id].type = "item";



                    /* Shake the item if the item is ticked to draw attention START */
                    if ((gameData.inventoryBox[i].bringToAttention == true))
                    {
                        var anim01 = this.game.add.tween(this['inventoryItem' + gameData.inventoryBox[i].id]).to({ angle: -10 }, 300);
                        var anim02 = this.game.add.tween(this['inventoryItem' + gameData.inventoryBox[i].id]).to({ angle: 10 }, 300);
                        anim01.chain(anim02);
                        anim02.onComplete.add(function () {

                            anim01.start();

                        }, this);
                        anim01.start();
                    }
                    /* Shake the item if the item is ticked to draw attention END */



                    /* Add to the inventory display group START */
                    this.inventoryBoxConstructionGroup.add(this['inventoryItem' + gameData.inventoryBox[i].id]);
                    /* Add to the inventory display group END */



                }




            }
            /* Populate the inventory END */




        },


        itemDragStart: function (itemBeingMoved) {

            this.currentDraggedInventoryItem = itemBeingMoved.id;
            this.draggingInventoryGroup = this.game.add.group();
            this.draggingInventoryGroup.add(itemBeingMoved);

        },



        itemDragEnd: function (itemBeingMoved) {



            /* If dragged item is dropped over another item START */
            this.inventoryBoxConstructionGroup.forEachAlive(function (element) {
                if ((element.type == "item")) {
                    this.game.physics.arcade.overlap(itemBeingMoved, element, this.overlayItemWithAnotherItem, null, this);
                }
            }, this);
            /* If dragged item is dropped over another item END */

            this.currentDraggedInventoryItem = null;
            this.draggingInventoryGroup.destroy();

            this.toggleInventoryBox("close");



        },







        scrollInventoryBarUpwards: function () {



            if ((this.topScrollInventoryBar != null) && (this.currentDraggedInventoryItem != null)) {
                if (this.topScrollInventoryBar.contains(this.game.input.x, this.game.input.y)) {

                    /* If we are scrolling up, and there are no more items to show then cancel the timer and don't progress any further START */
                    if ((this.currentInventoryIndex >= systemSettings.gameplaySettings.formatOptions.inventoryScrollAmount)) {
                        this.currentInventoryIndex = this.currentInventoryIndex - systemSettings.gameplaySettings.formatOptions.inventoryScrollAmount;
                        this.buildInventoryInterface(false);
                    }
                    /* If we are scrolling up, and there are no more items to show then cancel the timer and don't progress any further END */


                }

            }

        },


        scrollInventoryBarDownwards: function () {



            if ((this.bottomScrollInventoryBar != null) && (this.currentDraggedInventoryItem != null)) {
                if (this.bottomScrollInventoryBar.contains(this.game.input.x, this.game.input.y)) {

                    /* If we are scrolling down, and the last row has at least 1 item to show then cancel the timer and don't progress any further START */
                    if ((this.numberOfItemsToShow() > (systemSettings.gameplaySettings.formatOptions.placeholders.length - systemSettings.gameplaySettings.formatOptions.inventoryScrollAmount))) {
                        this.currentInventoryIndex = this.currentInventoryIndex + systemSettings.gameplaySettings.formatOptions.inventoryScrollAmount;
                        this.buildInventoryInterface(false);
                    }
                    /* If we are scrolling down, and the last row has at least 1 item to show then cancel the timer and don't progress any further END */



                }

            }

        },


        overlayItemWithAnotherItem: function (item1, item2) {

            console.log(item1);
            console.log(item2);

            this.toggleInventoryBox("close");

            var found = false;

            /* See if these 2 items can be matched START */
            var k;
            for (k = 0; k < permittedItemCombos.length; k++) {
                if ((permittedItemCombos[k].item1Id == item1.id) && (permittedItemCombos[k].item2Id == item2.id) || (permittedItemCombos[k].item1Id == item2.id) && (permittedItemCombos[k].item2Id == item1.id)) {
                    this.speechAndMovements(permittedItemCombos[k].protocolOnCombo);
                    found = true;
                    break;
                }
            }
            /* See if these 2 items can be matched END */


            if ((found == false))
            {
                var i;
                    for (i = 0; i < gameData.playerSettings.playableCharacters.length; i++) {
                        if ((gameData.playerSettings.playableCharacters[i].id == currentPlayableCharacterId)) {
                            this.speechAndMovements(gameData.playerSettings.playableCharacters[i].defaultGlobalSpeeches.wrongInventoryItemCombo);
                        }
                    }
            }

        },




        resetActionModes: function () {


            /* Only reset if the current action ISN'T look at START */
            if ((this.inventoryBoxOpen == true)) {
                this.setCurrentActionVerbFriendly = "";
                this.setCurrentActionVerbComp = "";
            }
            else {
                this.setCurrentActionVerbFriendly = acquireSystemText("walkTo");
                this.setCurrentActionVerbComp = "walkTo";
            }
            /* Only reset if the current action ISN'T look at END */


            this.currentlySelectedItemRef = "";
            this.currentlySelectedItemName = "";
            this.setCurrentActionNoun = "";
            this.useItemBridgingWord = "";
            
            /* Current action mode Colors START */
            var actionTextGradient = this.currentActionModeText.context.createLinearGradient(0, 0, 0, this.currentActionModeText.height);
            actionTextGradient.addColorStop(0, systemSettings.gameplaySettings.uiText.actionsText.textColor);
            actionTextGradient.addColorStop(1, systemSettings.gameplaySettings.uiText.actionsText.textColorAdditional);
            this.currentActionModeText.fill = actionTextGradient;
            /* Current action mode Colors END */


        },






        targetZoneInteraction: function (targetZone) {

            /* No matches so START */
            var z;
            for (z = 0; z < gameData.playerSettings.playableCharacters.length; z++) {
                if ((gameData.playerSettings.playableCharacters[z].id == currentPlayableCharacterId)) {
                    var noMatchesProtocol = gameData.playerSettings.playableCharacters[z].defaultGlobalSpeeches.inventoryItemOnSceneIncorrectAction;
                }
            }
            /* No matches so END */


            
            
                var i;
                for (i = 0; i < gameData.rooms.length; i++) {
                    if ((gameData.rooms[i].id == currentRoom)) {
                        var k;
                        for (k = 0; k < gameData.rooms[i].targetZones.length; k++) {
                            if ((gameData.rooms[i].targetZones[k].id == targetZone.id)) {


                                /* Make the player face the direction of the target zone START */
                                this.setPlayerAnimation(gameData.rooms[i].targetZones[k].playerFocusAnimationId, currentPlayableCharacterId);
                                /* Make the player face the direction of the target zone END */


                                if ((this.setCurrentActionVerbComp == "lookAt"))
                                {
                                    var x;
                                    for (x = 0; x < gameData.rooms[i].targetZones[k].states.length; x++) {
                                        if ((gameData.rooms[i].targetZones[k].states[x].id == gameData.rooms[i].targetZones[k].stateId)) {
                                            this.speechAndMovements(gameData.rooms[i].targetZones[k].states[x].lookAtProtocol);
                                            return false;
                                            break;
                                        }
                                    }
                                }
                                else
                                {
                                    var x;
                                    for (x = 0; x < gameData.rooms[i].targetZones[k].combinations.length; x++) {


                                        var actionRequired = gameData.rooms[i].targetZones[k].combinations[x].actionRequired;
                                        var itemRequired = gameData.rooms[i].targetZones[k].combinations[x].itemRequired;
                                        var availability = gameData.rooms[i].targetZones[k].combinations[x].available;
                                        

                                        
                                        // Has to be available first
                                        if ((availability == true)) {

                                            if ((gameData.rooms[i].targetZones[k].combinations[x].appliesToAllPlayableCharacters == true) || (gameData.rooms[i].targetZones[k].combinations[x].appliesToPlayableCharacterIds.indexOf(currentPlayableCharacterId) >= 0))
                                            {

                                                if ((itemRequired == null))
                                                {
                                                    if ((this.currentlySelectedItemRef == ""))
                                                    {
                                                        if ((actionRequired.indexOf(this.setCurrentActionVerbComp) > -1))
                                                        {
                                                            this.speechAndMovements(gameData.rooms[i].targetZones[k].combinations[x].protocolToRunOnMatch);
                                                            return false;
                                                            break;
                                                        }
                                                    }
                                                }
                                                else
                                                {
                                                    if ((actionRequired.indexOf(this.setCurrentActionVerbComp) > -1))
                                                    {
                                                        if ((this.currentlySelectedItemRef == itemRequired))
                                                        {
                                                            this.speechAndMovements(gameData.rooms[i].targetZones[k].combinations[x].protocolToRunOnMatch);
                                                            return false;
                                                            break;
                                                        }
                                                    }
                                                }
                                               
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            

                /* Can't find a match, so if its a walk action we'll just walk to it */
                if ((this.setCurrentActionVerbComp == "walkTo")) {
                    this.cancelPlayerWalkingTweenAndSetToIdle(currentPlayableCharacterId);
                }
                else
                {
                    this.speechAndMovements(noMatchesProtocol);
                }
            


        },





        npcsChangeRelationshipTerm: function (roomId, newRelationshipId, characterId) {

            var i;
            for (i = 0; i < gameData.rooms.length; i++) {
                if ((gameData.rooms[i].id == roomId)) {
                    var k;
                    for (k = 0; k < gameData.rooms[i].npc.length; k++) {
                        if ((gameData.rooms[i].npc[k].id == characterId)) {

                            /* Then set the new relationship status START */
                            gameData.rooms[i].npc[k].relationshipTermId = newRelationshipId;
                            /* Then set the new relationship status END */

                            var relationshipTermId = gameData.rooms[i].npc[k].relationshipTermId;

                            var q;
                            for (q = 0; q < gameData.rooms[i].npc[k].relationTerms.length; q++) {
                                if ((gameData.rooms[i].npc[k].relationTerms[q].id == relationshipTermId)) {
                                    this['npc' + gameData.rooms[i].npc[k].id].name = gameData.rooms[i].npc[k].relationTerms[q].languages[currentLang].name;
                                }
                            }
                            

                        }
                    }
                }
            }


        },




        npcsChangeConversationIntroLevel: function (roomId, newIntroId, characterId) {

            var i;
            for (i = 0; i < gameData.rooms.length; i++) {
                if ((gameData.rooms[i].id == roomId)) {
                    var k;
                    for (k = 0; k < gameData.rooms[i].npc.length; k++) {
                        if ((gameData.rooms[i].npc[k].id == characterId)) {

                            /* Then set the new relationship status START */
                            gameData.rooms[i].npc[k].conversationIntroId = newIntroId;
                            /* Then set the new relationship status END */

                        }
                    }
                }
            }


        },




        determineCharactersAnimationAfterProtocolSegment: function (convoParams) {

            var convoParams = JSON.parse(JSON.stringify(convoParams));

            var nextProtocolToRun = null;
            if ((convoParams[1] != undefined)) {
                nextProtocolToRun = convoParams[1];
            }




            /* If this is the last segment to run START */
            if ((nextProtocolToRun == null))
            {

                /* If the current action is speech, then set the characters to focus */
                if ((convoParams[0].type == "roomSpeech") || (convoParams[0].type == "globalSpeech"))
                {

                    /* If this is a conversation with another character */
                    if ((convoParams[0].param3 == 1))
                    {
                        /* Ending a conversation with another character START */
                        if ((this.getCharacterType(convoParams[0].characterId) == "playableCharacter"))
                        {
                            this.setPlayableCharacterToIdleAfterSpeechOrFocus(convoParams[0].characterId);
                            this.setNpcCharacterToIdleAfterSpeechOrFocus(convoParams[0].param4)
                        }
                        else
                        {
                            this.setNpcCharacterToIdleAfterSpeechOrFocus(convoParams[0].characterId)
                            this.setPlayableCharacterToIdleAfterSpeechOrFocus(convoParams[0].param4);
                        }
                        /* Ending a conversation with another character END */
                    }
                    /* Else this is an observation */
                    else
                    {
                        if ((this.getCharacterType(convoParams[0].characterId) == "playableCharacter"))
                        {
                            this.setPlayableCharacterToIdleAfterSpeechOrFocus(convoParams[0].characterId);
                        }
                        else
                        {
                            this.setNpcCharacterToIdleAfterSpeechOrFocus(convoParams[0].characterId)
                        }
                    }
                    
                }
                else{
                    this.setPlayableCharacterToIdleAfterSpeechOrFocus(currentPlayableCharacterId);
                }

            }
            /* If this is the last segment to run END */



            /* If there is another segment to run START */
            if ((nextProtocolToRun != null))
            {
                /* If the current action is speech, then set the characters to focus */
                if ((convoParams[0].type == "roomSpeech") || (convoParams[0].type == "globalSpeech"))
                {
                    /* If this is a conversation with another character */
                    if ((convoParams[0].param3 == 1))
                    {
                        /* Ending a conversation with another character START */
                        if ((this.getCharacterType(convoParams[0].characterId) == "playableCharacter"))
                        {
                            this.setPlayableCharacterToFocusAfterSpeech(convoParams[0].characterId);
                            this.setNpcCharacterToFocusAfterSpeech(convoParams[0].param4)
                        }
                        else
                        {
                            this.setNpcCharacterToFocusAfterSpeech(convoParams[0].characterId)
                            this.setPlayableCharacterToFocusAfterSpeech(convoParams[0].param4);
                        }
                        /* Ending a conversation with another character END */
                    }
                    /* Else this is an observation */
                    else
                    {
                        if ((this.getCharacterType(convoParams[0].characterId) == "playableCharacter"))
                        {
                            this.setPlayableCharacterToIdleAfterSpeechOrFocus(convoParams[0].characterId);
                        }
                        else
                        {
                            this.setNpcCharacterToIdleAfterSpeechOrFocus(convoParams[0].characterId);
                        }
                    }
                }
            }
            /* If there is another segment to run END */
            


            

        },


       getIntervalEventRunStatus: function(id){

        var status;

        var i;
        for (i = 0; i < gameData.rooms.length; i++) {
            if ((gameData.rooms[i].id == currentRoom)) {

                var x;
                for (x = 0; x < gameData.rooms[i].intervalEvents.length; x++) {

                    if ((gameData.rooms[i].intervalEvents[x].id == id))
                    {
                        status = gameData.rooms[i].intervalEvents[x].run;
                    }

                }

            }
        }

        return status;

       },




        removeConvoSegmentAndRerun: function (convoParams, removeNumberOfSegments) {

            var convoParams = JSON.parse(JSON.stringify(convoParams));

            continueProtocol.convoParams = [];

            
            /* If the current speech is not an interval event START */
            if ((convoParams[0].intervalEventId == null))
            {

                /* Remove the skip button as the skip button only appears for non interval events START */
                if ((this.skipButton != null)) {
                    this.skipButton.destroy();
                }
                /* Remove the skip button as the skip button only appears for non interval events END */

            }
            /* If the current speech is not an interval event END */


            /* If the current action is speech START */
            if ((convoParams[0].type == "roomSpeech") || (convoParams[0].type == "globalSpeech"))
            {

                // Cancel the timer of the character talking START
                this.game.time.events.remove(this['currentTimedSpeechEvent' + convoParams[0].characterId]);
                // Cancel the timer of the character talking END

                /* Get the current talking character type and blank out the speech text START */
                var speakingCharacterType = this.getCharacterType(convoParams[0].characterId);
                if ((speakingCharacterType == "narrator"))
                {
                    this.narratorText.setText(" ");
                }
                if ((speakingCharacterType == "playableCharacter"))
                {
                    if ((convoParams[0].characterId == -1))
                    {
                        this['player' + currentPlayableCharacterId].speechText.setText(" ");
                    }
                    else
                    {
                        this['player' + convoParams[0].characterId].speechText.setText(" ");
                    }
                }
                if ((speakingCharacterType == "npc"))
                {
                    this['npc' + convoParams[0].characterId].speechText.setText(" ");
                }
                /* Get the current talking character type and blank out the speech text END */


            }
            /* If the current action is speech END */


            /* Check to see if there is another protocol coming up START */
            if ((convoParams[0].characterId != -2))
            {
                this.determineCharactersAnimationAfterProtocolSegment(convoParams);
            }
            /* Check to see if there is another protocol coming up END */
            
            





            if ((removeNumberOfSegments === undefined)) {
                var removeNumberOfSegments = 1;
            }



            if ((convoParams.length > 0)) {


                


                /* If this is an interval event */
                if ((convoParams[0].intervalEventId != null))
                {

                    var status = this.getIntervalEventRunStatus(convoParams[0].intervalEventId);

                    /* And it's the last one, then re-run it */
                    if ((convoParams.length == 1))
                    {
                        if ((status == true))
                        {
                            this.runSpecificIntervalEventProtocol(convoParams[0].intervalEventId);
                        }
                        else
                        {
                            /* Remove the number from the array so that any non-interval event protocols waiting to run can now start */
                            intervalEventIdsToFinishRunning.splice(intervalEventIdsToFinishRunning.indexOf(convoParams[0].intervalEventId),1);
                        }
                    }
                    /* Otherwise */
                    else
                    {
                        /* Get it's current status and if its allowed to be run, then continue with the next segment */
                        if ((status == true))
                        {
                            /* Strip out the number of segments we've been asked to do START */
                            var i;
                            for (i = 0; i < removeNumberOfSegments; i++) {
                                convoParams.shift();
                            }
                            /* Strip out the number of segments we've been asked to do END */

                            /* Run the function again START */
                            this.speechAndMovements(convoParams);
                            /* Run the function again END */
                        }
                        else
                        {
                            /* Remove the number from the array so that any non-interval event protocols waiting to run can now start */
                            intervalEventIdsToFinishRunning.splice(intervalEventIdsToFinishRunning.indexOf(convoParams[0].intervalEventId),1);
                        }
                    }
                }
                /* Else just rip the current protocol off and re-run like normal */
                else
                {

                    /* If there are interval events waiting to finish, keep coming back to this function until we're allowed to proceed */
                    if ((intervalEventIdsToFinishRunning.length > 0))
                    {
                        console.log(intervalEventIdsToFinishRunning);
                        setTimeout(() => this.removeConvoSegmentAndRerun(convoParams), 10);
                    }
                    else
                    {
                        /* Strip out the number of segments we've been asked to do START */
                        var i;
                        for (i = 0; i < removeNumberOfSegments; i++) {
                            convoParams.shift();
                        }
                        /* Strip out the number of segments we've been asked to do END */

                        /* Run the function again START */
                        this.speechAndMovements(convoParams);
                        /* Run the function again END */
                    }
                    
                }
                

            }


        },




        addQuestionAvailability: function (roomId, questionId) {


            var i;
            for (i = 0; i < gameData.rooms.length; i++) {
                if ((gameData.rooms[i].id == roomId)) {


                    this.scanForQuestionItems = this.scanForQuestion(gameData.rooms[i].conversations, questionId);
                    this.scanForQuestionItems.available = true;


                }
            }



        },




        removeQuestionAvailability: function (roomId, questionId) {

            var i;
            for (i = 0; i < gameData.rooms.length; i++) {
                if ((gameData.rooms[i].id == roomId)) {


                    this.scanForQuestionItems = this.scanForQuestion(gameData.rooms[i].conversations, questionId);
                    this.scanForQuestionItems.available = false;


                }
            }


        },



        scanForQuestion: function (conversationArray, questionId) {

            var i;
            for (i = 0; i < conversationArray.length; i++) {
                var k;
                for (k = 0; k < conversationArray[i].items.length; k++) {
                    if ((conversationArray[i].items[k].id == questionId)) {
                        this.scanForQuestionItems = conversationArray[i].items[k];
                    }
                    else {
                        this.scanForQuestion(conversationArray[i].items[k].conversations, questionId);
                    }

                }
            }

            return this.scanForQuestionItems;

        },



        








        submitQuestion: function (question) {

            /* Remove all the questions as we generate them from brand new each time START */
            this.questionsGroup.destroy();
            /* Remove all the questions as we generate them from brand new each time END */

            /* Send the protocol off START */
            this.speechAndMovements(question.protocol);
            /* Send the protocol off END */


        },


        getCharacterType: function(characterId){

            var speakingCharacterType;

            if ((characterId == -2)) {
                speakingCharacterType = "narrator";
            }
            else if ((characterId == -1)) {
                speakingCharacterType = "playableCharacter";
            }
            else {
                /* Check playable character records START */
                var z;
                for (z = 0; z < gameData.playerSettings.playableCharacters.length; z++) {
                    if ((gameData.playerSettings.playableCharacters[z].id == characterId)) {
                        speakingCharacterType = "playableCharacter";
                    }
                }
                /* Check playable character records END */

                /* If we still don't have a match then it must be an npc START */
                if ((speakingCharacterType == null)) {
                    speakingCharacterType = "npc";
                }
                /* If we still don't have a match then it must be an npc END */

            }

            return speakingCharacterType;
        },


        scanForConversationItems: function (conversationArray, conversationGroupId) {



            var i;
            for (i = 0; i < conversationArray.length; i++) {
                if ((conversationArray[i].id == conversationGroupId)) {
                    this.scanForConvoItems = conversationArray[i].items
                    break;
                }
                else {
                    var k;
                    for (k = 0; k < conversationArray[i].items.length; k++) {
                        this.scanForConversationItems(conversationArray[i].items[k].conversations, conversationGroupId);
                    }
                }

            }


            return this.scanForConvoItems;

        },


        getConversationGroup: function (conversationGroupId) {


            var i;
            for (i = 0; i < gameData.rooms.length; i++) {
                if ((gameData.rooms[i].id == currentRoom)) {

                    this.scanForConvoItems = this.scanForConversationItems(gameData.rooms[i].conversations, conversationGroupId);
                    this.listOutNPCQuestions(this.scanForConvoItems);

                }
            }




        },




        listOutNPCQuestions: function (arr) {

            console.log(arr);

            this.questionsGroup = this.game.add.group();
            var startingYPos = systemSettings.gameplaySettings.uiText.questionsText.y;

            var i;
            for (var i = arr.length; i--;) {
                if (((arr[i].available == true))) {

                    if ((arr[i].appliesToAllPlayableCharacters == true) || (arr[i].appliesToPlayableCharacterIds.indexOf(currentPlayableCharacterId) >= 0))
                    {

                        var questionText = arr[i].languages[currentLang].statement;

                        this.question = this.game.add.text(systemSettings.gameplaySettings.uiText.questionsText.x, startingYPos, questionText, { font: ""+this.calculateTextSizeInPercentage(systemSettings.gameplaySettings.uiText.questionsText.languages[currentLang].fontSize, userSettings.textSize.interface)+"px "+acquireFontName(systemSettings.gameplaySettings.uiText.questionsText.languages[currentLang].fontId)+"", fill: systemSettings.gameplaySettings.uiText.questionsText.textColor });
                        
                        if ((systemSettings.gameplaySettings.uiText.questionsText.stroke.show == true))
                        {
                            this.question.stroke = systemSettings.gameplaySettings.uiText.questionsText.stroke.color;
                            this.question.strokeThickness = systemSettings.gameplaySettings.uiText.questionsText.stroke.thickness;
                        }
                        
                        if ((systemSettings.gameplaySettings.uiText.questionsText.shadow.show == true))
                        {
                            this.question.setShadow(systemSettings.gameplaySettings.uiText.questionsText.shadow.x, systemSettings.gameplaySettings.uiText.questionsText.shadow.y, systemSettings.gameplaySettings.uiText.questionsText.shadow.color, systemSettings.gameplaySettings.uiText.questionsText.shadow.blur);
                        }

                        this.question.lineSpacing = systemSettings.gameplaySettings.uiText.questionsText.languages[currentLang].lineSpacing;
                        this.question.wordWrapWidth = systemSettings.gameplaySettings.uiText.questionsText.width;
                        this.question.wordWrap = true;
                        this.question.inputEnabled = true;
                        this.question.fixedToCamera = true;

                        this.question.anchor.y = 1;

                        this.question.protocol = arr[i].protocol;
                        this.question.events.onInputDown.add(this.submitQuestion, this);
                        /* List out all available questions END */

                        console.log(this.question.height);

                        startingYPos = startingYPos - this.question.height - systemSettings.gameplaySettings.uiText.questionsText.itemGap;

                        this.questionsGroup.add(this.question);

                    }

                }
            }

        },



        resetDigitsSoFar: function () {

            this.digitsSoFar.destroy();

        },



        digitComboSubmit: function (digit) {

            /* Play button press sound START */
            this.speechAndMovements("playFoleySound*" + this.numberComboPuzzleButtonPressStartMarker + "^" + this.numberComboPuzzleButtonPressDuration + "^^^%|");
            /* Play button press sound END */

            this.enteredInDigits += digit.digitValue;

            this.digitsSoFar.setText(this.enteredInDigits);

            /* If all the digits have been entered, then check it START */
            if ((this.enteredInDigits.length == this.numberOfDigitsRequired)) {
                /* Remove the displays from the screen START */
                this.digitGroup.destroy();
                /* Remove the displays from the screen END */

                /* Does the entered in combo match what it should be START */
                if ((this.enteredInDigits == this.actualComboNeeded)) {
                    /* It matches */
                    this.digitsSoFar.fill = "#5CFF26"; /* Turn green */
                    this.game.time.events.add(Phaser.Timer.SECOND * 2, this.resetDigitsSoFar, this);
                    this.removeConvoSegmentAndRerun(this.numberComboPuzzleConvoParams, this.numberComboPuzzleNumberOfActionLines, this.numberComboPuzzleNumberOfLinesToSkip);
                }
                else {
                    /* It doesn't match */
                    this.digitsSoFar.fill = "#D90000"; /* Turn red */
                    this.game.time.events.add(Phaser.Timer.SECOND * 2, this.resetDigitsSoFar, this);
                    this.removeConvoSegmentAndRerun(this.numberComboPuzzleConvoParams, this.numberComboPuzzleNumberOfActionLines);
                }
                /* Does the entered in combo match what it should be END */
            }
            /* If all the digits have been entered, then check it END */

        },



        askForNumberCombo: function (correctComboNumber) {

            this.enteredInDigits = "";
            this.numberOfDigitsRequired = correctComboNumber.length;
            this.actualComboNeeded = correctComboNumber;

            /* Display of numbers entered START */
            this.digitsSoFar = this.game.add.text(100, 2, "", { font: '60px uiFont', fill: '#ffffff' });
            this.digitsSoFar.wordWrap = true;
            this.digitsSoFar.align = 'center';
            this.digitsSoFar.wordWrapWidth = 680;
            this.digitsSoFar.lineSpacing = -10;
            this.digitsSoFar.stroke = "#000000";
            this.digitsSoFar.strokeThickness = 8;
            this.digitsSoFar.anchor.x = Math.round(this.digitsSoFar.width * 0.5) / this.digitsSoFar.width;
            this.digitsSoFar.x = this.game.width / 2;
            this.digitsSoFar.fixedToCamera = true;
            /* Display of numbers entered END */


            this.digitGroup = this.game.add.group();
            var startingXPos = 50;

            var i;
            for (i = 0; i < 10; i++) {

                /* List out all available questions START */
                var digitText = this.game.add.text(startingXPos, 150, i, { font: '60px uiFont', fill: '#ffffff' });
                digitText.stroke = "#000000";
                digitText.strokeThickness = 8;
                digitText.inputEnabled = true;
                digitText.fixedToCamera = true;
                digitText.digitValue = "" + i + "";
                digitText.events.onInputDown.add(this.digitComboSubmit, this);
                /* List out all available questions END */

                startingXPos = startingXPos + 100;

                this.digitGroup.add(digitText);

            }

        },




        setPlayableCharacterToFocusAfterSpeech: function (playerId) {

            var dealingWithPlayerId;

            if ((playerId == -1))
            {
                dealingWithPlayerId = currentPlayableCharacterId;
            }
            else
            {
                dealingWithPlayerId = playerId;
            }

            /* By default always set the player to go back to an idle state START */

            var currentPlayerAnim = this['player' + dealingWithPlayerId].animations.currentAnim.name;

            if ((currentPlayerAnim == "player" + dealingWithPlayerId + this.acquirePlayableCharactersCurrentGroupAnimationId(dealingWithPlayerId) + 18) /* Talk Left */) {
                this.setPlayerAnimation(10, dealingWithPlayerId); //Focus Left
            }
            if ((currentPlayerAnim == "player" + dealingWithPlayerId + this.acquirePlayableCharactersCurrentGroupAnimationId(dealingWithPlayerId) + 19) /* Talk Right */) {
                this.setPlayerAnimation(11, dealingWithPlayerId); //Focus Right
            }
            if ((currentPlayerAnim == "player" + dealingWithPlayerId + this.acquirePlayableCharactersCurrentGroupAnimationId(dealingWithPlayerId) + 17) /* Talk Front */) {
                this.setPlayerAnimation(9, dealingWithPlayerId); //Focus Front
            }
            if ((currentPlayerAnim == "player" + dealingWithPlayerId + this.acquirePlayableCharactersCurrentGroupAnimationId(dealingWithPlayerId) + 16) /* Talk Back */) {
                this.setPlayerAnimation(8, dealingWithPlayerId); //Focus Back
            }
            /* By default always set the player to go back to an idle state END */


        },



        setNpcCharacterToFocusAfterSpeech: function (npcId) {

            

            /* By default always set the player to go back to an idle state START */

            var currentNpcAnim = this['npc' + npcId].animations.currentAnim.name;

            if ((currentNpcAnim == "npc" + npcId + 12) /* Talk Left */) {
                this.setNpcAnimation(4, npcId); //Focus Left
            }
            if ((currentNpcAnim == "npc" + npcId + 13) /* Talk Right */) {
                this.setNpcAnimation(5, npcId); //Focus Right
            }
            if ((currentNpcAnim == "npc" + npcId + 11) /* Talk Front */) {
                this.setNpcAnimation(3, npcId); //Focus Front
            }
            if ((currentNpcAnim == "npc" + npcId + 10) /* Talk Back */) {
                this.setNpcAnimation(2, npcId); //Focus Back
            }
            /* By default always set the player to go back to an idle state END */


        },





        setPlayableCharacterToIdleAfterSpeechOrFocus: function (playerId) {

            var dealingWithPlayerId;

            if ((playerId == -1))
            {
                dealingWithPlayerId = currentPlayableCharacterId;
            }
            else
            {
                dealingWithPlayerId = playerId;
            }

            /* By default always set the player to go back to an idle state START */

            var currentPlayerAnim = this['player' + dealingWithPlayerId].animations.currentAnim.name;

            if ((currentPlayerAnim == "player" + dealingWithPlayerId + this.acquirePlayableCharactersCurrentGroupAnimationId(dealingWithPlayerId) + 18) /* Talk Left */ || (currentPlayerAnim == "player" + dealingWithPlayerId + this.acquirePlayableCharactersCurrentGroupAnimationId(dealingWithPlayerId) + 10) /* Focus Left */ || (currentPlayerAnim == "player" + dealingWithPlayerId + this.acquirePlayableCharactersCurrentGroupAnimationId(dealingWithPlayerId) + 14) /* Idle Left */)  {
                this.setPlayerAnimation(14, dealingWithPlayerId); //Idle Left
            }
            else if ((currentPlayerAnim == "player" + dealingWithPlayerId + this.acquirePlayableCharactersCurrentGroupAnimationId(dealingWithPlayerId) + 19) /* Talk Right */ || (currentPlayerAnim == "player" + dealingWithPlayerId + this.acquirePlayableCharactersCurrentGroupAnimationId(dealingWithPlayerId) + 11) /* Focus Right */ || (currentPlayerAnim == "player" + dealingWithPlayerId + this.acquirePlayableCharactersCurrentGroupAnimationId(dealingWithPlayerId) + 15) /* Idle Right */)  {
                this.setPlayerAnimation(15, dealingWithPlayerId); //Idle Right
            }
            else if ((currentPlayerAnim == "player" + dealingWithPlayerId + this.acquirePlayableCharactersCurrentGroupAnimationId(dealingWithPlayerId) + 17) /* Talk Front */ || (currentPlayerAnim == "player" + dealingWithPlayerId + this.acquirePlayableCharactersCurrentGroupAnimationId(dealingWithPlayerId) + 9) /* Focus Front */ || (currentPlayerAnim == "player" + dealingWithPlayerId + this.acquirePlayableCharactersCurrentGroupAnimationId(dealingWithPlayerId) + 13) /* Idle Front */)  {
                this.setPlayerAnimation(13, dealingWithPlayerId); //Idle Front
            }
            else if ((currentPlayerAnim == "player" + dealingWithPlayerId + this.acquirePlayableCharactersCurrentGroupAnimationId(dealingWithPlayerId) + 16) /* Talk Back */ || (currentPlayerAnim == "player" + dealingWithPlayerId + this.acquirePlayableCharactersCurrentGroupAnimationId(dealingWithPlayerId) + 8)/* Focus Back */ || (currentPlayerAnim == "player" + dealingWithPlayerId + this.acquirePlayableCharactersCurrentGroupAnimationId(dealingWithPlayerId) + 12)/* Idle Back */ )  {
                this.setPlayerAnimation(12, dealingWithPlayerId); //Idle Back
            }
            /* By default always set the player to go back to an idle state END */

            /* Otherwise it could be a custom talking animation of which we won't know which direction they are facing, so set them to idle front */
            else
            {
                this.setPlayerAnimation(13, dealingWithPlayerId); //Idle Front
            }
            

        },



        setNpcCharacterToIdleAfterSpeechOrFocus: function (npcId) {

            

            /* By default always set the player to go back to an idle state START */

            var currentNpcAnim = this['npc' + npcId].animations.currentAnim.name;

            if ((currentNpcAnim == "npc" + npcId + 12) /* Talk Left */ || (currentNpcAnim == "npc" + npcId + 4) /* Focus Left */ || (currentNpcAnim == "npc" + npcId + 8) /* Idle Left */)  {
                this.setNpcAnimation(8, npcId); //Idle Left
            }
            else if ((currentNpcAnim == "npc" + npcId + 13) /* Talk Right */ || (currentNpcAnim == "npc" + npcId + 5) /* Focus Right */ || (currentNpcAnim == "npc" + npcId + 9) /* Idle Right */)  {
                this.setNpcAnimation(9, npcId); //Idle Right
            }
            else if ((currentNpcAnim == "npc" + npcId + 11) /* Talk Front */ || (currentNpcAnim == "npc" + npcId + 3) /* Focus Front */ || (currentNpcAnim == "npc" + npcId + 7) /* Idle Front */)  {
                this.setNpcAnimation(7, npcId); //Idle Front
            }
            else if ((currentNpcAnim == "npc" + npcId + 10) /* Talk Back */ || (currentNpcAnim == "npc" + npcId + 2)/* Focus Back */ || (currentNpcAnim == "npc" + npcId + 6)/* Idle Back */ )  {
                this.setNpcAnimation(6, npcId); //Idle Back
            }
            /* By default always set the player to go back to an idle state END */

            /* Otherwise it could be a custom talking animation of which we won't know which direction they are facing, so set them to idle front */
            else
            {
                this.setNpcAnimation(7, npcId); //Idle Front
            }
            

        },



        setAllCharactersIdle: function (convoParams) {

            console.log(currentPlayableCharacterId);

            /* By default always set the player to go back to an idle state START */

            var currentPlayerAnim = this['player' + currentPlayableCharacterId].animations.currentAnim.name;

            if ((currentPlayerAnim == "player" + currentPlayableCharacterId + this.acquirePlayableCharactersCurrentGroupAnimationId(currentPlayableCharacterId) + 18) /* Talk Left */ || (currentPlayerAnim == "player" + currentPlayableCharacterId + this.acquirePlayableCharactersCurrentGroupAnimationId(currentPlayableCharacterId) + 10)) /* Focus Left */ {
                this.setPlayerAnimation(14, currentPlayableCharacterId); //Idle Left
            }
            if ((currentPlayerAnim == "player" + currentPlayableCharacterId + this.acquirePlayableCharactersCurrentGroupAnimationId(currentPlayableCharacterId) + 19) /* Talk Right */ || (currentPlayerAnim == "player" + currentPlayableCharacterId + this.acquirePlayableCharactersCurrentGroupAnimationId(currentPlayableCharacterId) + 11)) /* Focus Right */ {
                this.setPlayerAnimation(15, currentPlayableCharacterId); //Idle Right
            }
            if ((currentPlayerAnim == "player" + currentPlayableCharacterId + this.acquirePlayableCharactersCurrentGroupAnimationId(currentPlayableCharacterId) + 17) /* Talk Front */ || (currentPlayerAnim == "player" + currentPlayableCharacterId + this.acquirePlayableCharactersCurrentGroupAnimationId(currentPlayableCharacterId) + 9)) /* Focus Front */ {
                this.setPlayerAnimation(13, currentPlayableCharacterId); //Idle Front
            }
            if ((currentPlayerAnim == "player" + currentPlayableCharacterId + this.acquirePlayableCharactersCurrentGroupAnimationId(currentPlayableCharacterId) + 16) /* Talk Back */ || (currentPlayerAnim == "player" + currentPlayableCharacterId + this.acquirePlayableCharactersCurrentGroupAnimationId(currentPlayableCharacterId) + 8)) /* Focus Back */ {
                this.setPlayerAnimation(12, currentPlayableCharacterId); //Idle Back
            }
            /* By default always set the player to go back to an idle state END */





            /* Also set any npcs to go back to an idle state by default START */
            this.charactersAndZonesGroup.forEachAlive(function (npc) {
                if ((npc.type == "npc")) {
                    this.setNpcAnimation(7, npc.id); //Idle Front
                }
            }, this);
            /* Also set any npcs to go back to an idle state by default END */


        },


        speechAndMovements: function (convoParams) {

            var convoParams = JSON.parse(JSON.stringify(convoParams));


            /* Rip out the params of the first or only conversation passed through START */
            if ((convoParams[0] != undefined)) {
                var currentActionLine = convoParams[0];
                var type = currentActionLine.type;
                var param1 = currentActionLine.param1;
                var param2 = currentActionLine.param2;
                var param3 = currentActionLine.param3;
                var param4 = currentActionLine.param4;
                var param5 = currentActionLine.param5;
                var param6 = currentActionLine.param6;
                var param7 = currentActionLine.param7;
                var param8 = currentActionLine.param8;
                var param9 = currentActionLine.param9;
                var intervalEventId = currentActionLine.intervalEventId;
                var characterId = currentActionLine.characterId;
            }

            


            /* Disable player interaction whilst any protocols are in action START */
            /* Only disable controls if we DON'T perform an override for npcs talking for example when you're walking around in a walkbox START */
            if ((intervalEventId == null))
            {
                if ((convoParams.length > 0))
                {
                    this.disableToolBarAndPlayerMovements = true;
                }
                else
                {
                    // Check if there is an after collection protocol to run
                    if ((this.collectionProtocolToFinish != null))
                    {
                        this.performAfterCollectionProtocols();
                    }
                    else
                    {
                        this.disableToolBarAndPlayerMovements = false;
                        this.saveGame();
                    }
                }
            }
            /* Only disable controls if we DON'T perform an override for npcs talking for example when you're walking around in a walkbox END */
            /* Disable player interaction whilst any protocols are in action END */





            


            switch (type) {





                case "startConversationGroup":



                    var currentPlayerAnim = this['player' + currentPlayableCharacterId].animations.currentAnim.name;

                    if ((currentPlayerAnim == "player" + currentPlayableCharacterId + this.acquirePlayableCharactersCurrentGroupAnimationId(currentPlayableCharacterId) + 18) /* Talk Left */ || (currentPlayerAnim == "player" + currentPlayableCharacterId + this.acquirePlayableCharactersCurrentGroupAnimationId(currentPlayableCharacterId) + 14)) /* Idle Left */ {

                        this.setPlayerAnimation(10, currentPlayableCharacterId); //Focus Left
                    }
                    if ((currentPlayerAnim == "player" + currentPlayableCharacterId + this.acquirePlayableCharactersCurrentGroupAnimationId(currentPlayableCharacterId) + 19) /* Talk Right */ || (currentPlayerAnim == "player" + currentPlayableCharacterId + this.acquirePlayableCharactersCurrentGroupAnimationId(currentPlayableCharacterId) + 15)) /* Idle Right */ {
                        this.setPlayerAnimation(11, currentPlayableCharacterId); //Focus Right
                    }
                    if ((currentPlayerAnim == "player" + currentPlayableCharacterId + this.acquirePlayableCharactersCurrentGroupAnimationId(currentPlayableCharacterId) + 17) /* Talk Front */ || (currentPlayerAnim == "player" + currentPlayableCharacterId + this.acquirePlayableCharactersCurrentGroupAnimationId(currentPlayableCharacterId) + 13)) /* Idle Front */ {
                        this.setPlayerAnimation(9, currentPlayableCharacterId); //Focus Front
                    }
                    if ((currentPlayerAnim == "player" + currentPlayableCharacterId + this.acquirePlayableCharactersCurrentGroupAnimationId(currentPlayableCharacterId) + 16) /* Talk Back */ || (currentPlayerAnim == "player" + currentPlayableCharacterId + this.acquirePlayableCharactersCurrentGroupAnimationId(currentPlayableCharacterId) + 12)) /* Idle Back */ {
                        this.setPlayerAnimation(8, currentPlayableCharacterId); //Focus Back
                    }





                    this.getConversationGroup(param1);





                    break;





                case "numberComboPuzzle":

                    this.setPlayerAnimation(9, currentPlayableCharacterId); //Focus Front

                    this.numberComboPuzzleConvoParams = convoParams;
                    this.numberComboPuzzleNumberOfActionLines = convoParams.length;
                    this.numberComboPuzzleNumberOfLinesToSkip = param2;
                    this.numberComboPuzzleButtonPressStartMarker = param3;
                    this.numberComboPuzzleButtonPressDuration = param4;

                    this.askForNumberCombo(param1);

                    break;





                case "changeTargetZoneDefaultAnimation":



                    /* Get the name of the current animation running START */


                    /* Save the new animation it is playing back to the JSON so that the target zone looks the same when we go back to the scene START */
                    var i;
                    for (i = 0; i < gameData.rooms.length; i++) {
                        if ((gameData.rooms[i].id == param1)) {



                            var k;
                            for (k = 0; k < gameData.rooms[i].targetZones.length; k++) {
                                if ((gameData.rooms[i].targetZones[k].id == param2)) {

                                    gameData.rooms[i].targetZones[k].graphicalOptions.defaultAnimationId = param3;
                                    this.removeConvoSegmentAndRerun(convoParams);
                                }
                            }
                        }
                    }
                    /* Save the new animation it is playing back to the JSON so that the target zone looks the same when we go back to the scene END */


                    /* Get the name of the current animation running END */

                    break;




                case "disableTargetZoneCombinationAvailability":



                    /* Save the new animation it is playing back to the JSON so that the target zone looks the same when we go back to the scene START */
                    var i;
                    for (i = 0; i < gameData.rooms.length; i++) {
                        if ((gameData.rooms[i].id == param1)) {
                            var k;
                            for (k = 0; k < gameData.rooms[i].targetZones.length; k++) {
                                if ((gameData.rooms[i].targetZones[k].id == param2)) {

                                    var x;
                                    for (x = 0; x < gameData.rooms[i].targetZones[k].combinations.length; x++) {

                                        if ((gameData.rooms[i].targetZones[k].combinations[x].id == param3)) {
                                            gameData.rooms[i].targetZones[k].combinations[x].available = false;
                                            this.removeConvoSegmentAndRerun(convoParams);
                                        }

                                    }

                                }
                            }
                        }
                    }
                    /* Save the new animation it is playing back to the JSON so that the target zone looks the same when we go back to the scene END */

                    break;





                case "enableTargetZoneCombinationAvailability":


                    /* Save the new animation it is playing back to the JSON so that the target zone looks the same when we go back to the scene START */
                    var i;
                    for (i = 0; i < gameData.rooms.length; i++) {
                        if ((gameData.rooms[i].id == param1)) {
                            var k;
                            for (k = 0; k < gameData.rooms[i].targetZones.length; k++) {
                                if ((gameData.rooms[i].targetZones[k].id == param2)) {

                                    var x;
                                    for (x = 0; x < gameData.rooms[i].targetZones[k].combinations.length; x++) {

                                        if ((gameData.rooms[i].targetZones[k].combinations[x].id == param3)) {
                                            gameData.rooms[i].targetZones[k].combinations[x].available = true;
                                            this.removeConvoSegmentAndRerun(convoParams);
                                        }

                                    }

                                }
                            }
                        }
                    }
                    /* Save the new animation it is playing back to the JSON so that the target zone looks the same when we go back to the scene END */

                    break;



                case "enableMapRoomGroupAvailability":


                    /* Save the new animation it is playing back to the JSON so that the target zone looks the same when we go back to the scene START */
                    var i;
                    for (i = 0; i < gameData.maps.length; i++) {
                        if ((gameData.maps[i].id == param1)) {
                            var k;
                            for (k = 0; k < gameData.maps[i].roomGroups.length; k++) {
                                if ((gameData.maps[i].roomGroups[k].id == param2)) {
                                    gameData.maps[i].roomGroups[k].available = true;
                                    this.removeConvoSegmentAndRerun(convoParams);
                                }
                            }
                        }
                    }
                    /* Save the new animation it is playing back to the JSON so that the target zone looks the same when we go back to the scene END */

                    break;





                    case "disableMapRoomGroupAvailability":


                    /* Save the new animation it is playing back to the JSON so that the target zone looks the same when we go back to the scene START */
                    var i;
                    for (i = 0; i < gameData.maps.length; i++) {
                        if ((gameData.maps[i].id == param1)) {
                            var k;
                            for (k = 0; k < gameData.maps[i].roomGroups.length; k++) {
                                if ((gameData.maps[i].roomGroups[k].id == param2)) {
                                    gameData.maps[i].roomGroups[k].available = false;
                                    this.removeConvoSegmentAndRerun(convoParams);
                                }
                            }
                        }
                    }
                    /* Save the new animation it is playing back to the JSON so that the target zone looks the same when we go back to the scene END */

                    break;



                case "disableNpcCombinationAvailability":


                    /* Save the new animation it is playing back to the JSON so that the target zone looks the same when we go back to the scene START */
                    var i;
                    for (i = 0; i < gameData.rooms.length; i++) {
                        if ((gameData.rooms[i].id == param1)) {
                            var k;
                            for (k = 0; k < gameData.rooms[i].npc.length; k++) {
                                if ((gameData.rooms[i].npc[k].id == characterId)) {

                                    var x;
                                    for (x = 0; x < gameData.rooms[i].npc[k].itemAndActionCombinations.length; x++) {

                                        if ((gameData.rooms[i].npc[k].itemAndActionCombinations[x].id == param2)) {
                                            gameData.rooms[i].npc[k].itemAndActionCombinations[x].available = false;
                                            this.removeConvoSegmentAndRerun(convoParams);
                                        }

                                    }
                                }
                            }
                        }
                    }
                    /* Save the new animation it is playing back to the JSON so that the target zone looks the same when we go back to the scene END */

                    break;




                case "enableNpcCombinationAvailability":



                    /* Save the new animation it is playing back to the JSON so that the target zone looks the same when we go back to the scene START */
                    var i;
                    for (i = 0; i < gameData.rooms.length; i++) {
                        if ((gameData.rooms[i].id == param1)) {
                            var k;
                            for (k = 0; k < gameData.rooms[i].npc.length; k++) {
                                if ((gameData.rooms[i].npc[k].id == characterId)) {

                                    var x;
                                    for (x = 0; x < gameData.rooms[i].npc[k].itemAndActionCombinations.length; x++) {

                                        if ((gameData.rooms[i].npc[k].itemAndActionCombinations[x].id == param2)) {

                                            gameData.rooms[i].npc[k].itemAndActionCombinations[x].available = true;
                                            this.removeConvoSegmentAndRerun(convoParams);
                                        }

                                    }

                                }
                            }
                        }
                    }
                    /* Save the new animation it is playing back to the JSON so that the target zone looks the same when we go back to the scene END */

                    break;



                case "animateTargetZone":



                    var i;
                    for (i = 0; i < gameData.rooms.length; i++) {
                        if ((gameData.rooms[i].id == currentRoom)) {
                            var k;
                            for (k = 0; k < gameData.rooms[i].targetZones.length; k++) {

                                if ((gameData.rooms[i].targetZones[k].id == param1))
                                {
                                    /* Animations START */
                                    var x;
                                    for (x = 0; x < gameData.rooms[i].targetZones[k].graphicalOptions.animations.length; x++) {
                                        if ((gameData.rooms[i].targetZones[k].graphicalOptions.animations[x].id == param2)) {

                                            this['targetZone' + param1].loadTexture("targetZone" + param1 + param2, 0);
                                            this['targetZone' + param1].animations.add("targetZone" + param1 + param2);
                                            var currentAnim = this['targetZone' + param1].animations.play("targetZone" + param1 + param2, gameData.rooms[i].targetZones[k].graphicalOptions.animations[x].frameRate, gameData.rooms[i].targetZones[k].graphicalOptions.animations[x].loop);

                                            /* Do we wait for the animation to complete before proceeding the protocol */
                                            if ((param3 == 0)) {
                                                this.removeConvoSegmentAndRerun(convoParams);
                                                return false;
                                            }

                                            if ((param3 == 1)) {
                                                currentAnim.onComplete.add(function () {

                                                    /* Once animation is complete, then go to next action block START */
                                                    this.removeConvoSegmentAndRerun(convoParams);
                                                    /* Once animation is complete, then go to next action block END */

                                                }, this);
                                            }
                                            

                                        }
                                    }
                                    /* Animations END */
                                }

                                

                            }
                        }
                    }


                    

                    break;





                case "toggleInventoryBox":

                    this.toggleInventoryBox(param1);

                    this.removeConvoSegmentAndRerun(convoParams);

                    break;










                case "cancelPlayerWalk":

                    this.cancelPlayerWalkingTweenAndSetToIdle(currentPlayableCharacterId);

                    this.removeConvoSegmentAndRerun(convoParams);

                    break;






                    case "hideForegroundLayer":

                        var i;
                        for (i = 0; i < gameData.rooms.length; i++) {
                            if ((gameData.rooms[i].id == param1)) {
    
                                var k;
                                for (k = 0; k < gameData.rooms[i].foreground.length; k++) {
                                    if ((gameData.rooms[i].foreground[k].id == param2)) {
                                        gameData.rooms[i].foreground[k].display = false;

                                        if ((param1 == currentRoom))
                                        {
                                            this['foreground' + gameData.rooms[i].foreground[k].id].destroy();
                                        }
                                    }
                                }
                            }
                        }
    
    
                        this.removeConvoSegmentAndRerun(convoParams);
    
                        break;




                        case "showForegroundLayer":

                        var i;
                        for (i = 0; i < gameData.rooms.length; i++) {
                            if ((gameData.rooms[i].id == param1)) {
    
                                var k;
                                for (k = 0; k < gameData.rooms[i].foreground.length; k++) {
                                    if ((gameData.rooms[i].foreground[k].id == param2)) {
                                        gameData.rooms[i].foreground[k].display = true;

                                        if ((param1 == currentRoom))
                                        {
                                            this.createForegroundElement(gameData.rooms[i].foreground[k].id);
                                        }
                                    }
                                }
                            }
                        }
    
    
                        this.removeConvoSegmentAndRerun(convoParams);
    
                        break;






                    case "disableIntervalEvent":

                        var i;
                        for (i = 0; i < gameData.rooms.length; i++) {
                            if ((gameData.rooms[i].id == param1)) {
    
                                var k;
                                for (k = 0; k < gameData.rooms[i].intervalEvents.length; k++) {
                                    if ((gameData.rooms[i].intervalEvents[k].id == param2) && (gameData.rooms[i].intervalEvents[k].run == true)) {
                                        gameData.rooms[i].intervalEvents[k].run = false;

                                        if ((gameData.rooms[i].id == currentRoom))
                                        {
                                            intervalEventIdsToFinishRunning.push(param2);
                                        }
                                        
                                    }
                                }
    
    
                            }
                        }
    
    
                        this.removeConvoSegmentAndRerun(convoParams);
    
                        break;




                        case "enableIntervalEvent":

                        var i;
                        for (i = 0; i < gameData.rooms.length; i++) {
                            if ((gameData.rooms[i].id == param1)) {
    
                                var k;
                                for (k = 0; k < gameData.rooms[i].intervalEvents.length; k++) {
                                    if ((gameData.rooms[i].intervalEvents[k].id == param2)) {
                                        gameData.rooms[i].intervalEvents[k].run = true;
                                        this.runSpecificIntervalEventProtocol(param2);
                                    }
                                }
    
    
                            }
                        }
    
    
                        this.removeConvoSegmentAndRerun(convoParams);
    
                        break;





                case "disableWalkBox":




                    var i;
                    for (i = 0; i < gameData.rooms.length; i++) {
                        if ((gameData.rooms[i].id == param1)) {

                            var k;
                            for (k = 0; k < gameData.rooms[i].walkBoxes.length; k++) {
                                if ((gameData.rooms[i].walkBoxes[k].id == param2)) {
                                    gameData.rooms[i].walkBoxes[k].walkBoxValid = false;
                                }
                            }


                        }
                    }


                    this.removeConvoSegmentAndRerun(convoParams);

                    break;






                case "enableWalkBox":




                    var i;
                    for (i = 0; i < gameData.rooms.length; i++) {
                        if ((gameData.rooms[i].id == param1)) {

                            var k;
                            for (k = 0; k < gameData.rooms[i].walkBoxes.length; k++) {
                                if ((gameData.rooms[i].walkBoxes[k].id == param2)) {
                                    gameData.rooms[i].walkBoxes[k].walkBoxValid = true;
                                }
                            }

                        }
                    }


                    this.removeConvoSegmentAndRerun(convoParams);

                    break;





                case "showPlayableCharacter":




                        /* Then deal with the playable characters START */
                        var i;
                        for (i = 0; i < gameData.playerSettings.playableCharacters.length; i++)
                        {
                            /* Only render if this playable character hasn't already been rendered */
                            if ((gameData.playerSettings.playableCharacters[i].currentRoomId != currentRoom) && (gameData.playerSettings.playableCharacters[i].id == characterId))
                            {
                                gameData.playerSettings.playableCharacters[i].position.x = param2;
                                gameData.playerSettings.playableCharacters[i].position.y = param3;

                                this.createPlayableCharacter(gameData.playerSettings.playableCharacters[i].id);
                            }

                        }
                        /* Then deal with the playable characters END */

                    

                    this.removeConvoSegmentAndRerun(convoParams);

                    break;





                    case "showNpcCharacter":

                    
                    

                        /* First show any npcs START */
                        var i;
                        for (i = 0; i < gameData.rooms.length; i++) {
                            if ((gameData.rooms[i].id == param1)) {
                                var k;
                                for (k = 0; k < gameData.rooms[i].npc.length; k++) {
                                    if ((gameData.rooms[i].npc[k].id == characterId))
                                    {

                                        gameData.rooms[i].npc[k].hidden = false;
                                        this.createNpc(gameData.rooms[i].npc[k].id);

                                    }
                                }
                            }
                        }
                        /* First show any npcs END */

                    

                    this.removeConvoSegmentAndRerun(convoParams);

                    break;





                    case "removePlayableCharacterFromGame":

                        /* Then deal with the playable characters START */
                        var i;
                        for (i = 0; i < gameData.playerSettings.playableCharacters.length; i++)
                        {
                            /* Only render if this playable character hasn't already been rendered */
                            if ((gameData.playerSettings.playableCharacters[i].id == characterId))
                            {
                                gameData.playerSettings.playableCharacters[i].position.x = null;
                                gameData.playerSettings.playableCharacters[i].position.y = null;
                                gameData.playerSettings.playableCharacters[i].currentRoomId = null;
                            }

                        }
                        /* Then deal with the playable characters END */

                        /* If character is in current scene, then remove them */
                        this['player' + characterId].destroy();

                    

                    this.removeConvoSegmentAndRerun(convoParams);

                    break;




                    case "changeRoomAndPositionForPlayableCharacter":

                        /* Then deal with the playable characters START */
                        var i;
                        for (i = 0; i < gameData.playerSettings.playableCharacters.length; i++)
                        {
                            /* Only render if this playable character hasn't already been rendered */
                            if ((gameData.playerSettings.playableCharacters[i].id == characterId))
                            {
                                gameData.playerSettings.playableCharacters[i].position.x = param2;
                                gameData.playerSettings.playableCharacters[i].position.y = param3;
                                gameData.playerSettings.playableCharacters[i].currentRoomId = param1;
                            }
                        }
                        /* Then deal with the playable characters END */


                        /* If character is in current scene, then route them to the new place */
                        if ((this['player' + characterId] != null))
                        {
                            this.routePlayableCharacter(param2, param3, "none", null, characterId, true);
                        }

                    

                    this.removeConvoSegmentAndRerun(convoParams);

                    break;






                    case "switchToPlayableCharacter":

                    var myObj = {
                        "avatarId": characterId
                    }
                        
                        this.togglePlayableCharacter(myObj);

                    

                    this.removeConvoSegmentAndRerun(convoParams);

                    break;







                case "hideNpcCharacter":

                    
                    

                        var i;
                        for (i = 0; i < gameData.rooms.length; i++) {
                            if ((gameData.rooms[i].id == param1)) {
                                var k;
                                for (k = 0; k < gameData.rooms[i].npc.length; k++) {
                                    if ((gameData.rooms[i].npc[k].id == characterId)) {

                                        gameData.rooms[i].npc[k].hidden = true;
                                        this['npc' + gameData.rooms[i].npc[k].id].destroy();

                                    }
                                }
                            }
                        }

                    

                    this.removeConvoSegmentAndRerun(convoParams);

                    break;







                case "showItemOnScene":

                    /* Also set in the gamedata that this item is allowed to be seen incase user exits the game START */
                    var i;
                    for (i = 0; i < gameData.inventoryBox.length; i++) {
                        if ((gameData.inventoryBox[i].id == param1)) {
                            gameData.inventoryBox[i].pickUpOnSceneDetails.hidden = false;
                            this.createInventoryItem(gameData.inventoryBox[i].id);
                        }
                    }
                    /* Also set in the gamedata that this item is allowed to be seen incase user exits the game END */


                    this.removeConvoSegmentAndRerun(convoParams);

                    break;





                case "hideItemOnScene":

                    /* Also set in the gamedata that this item is allowed to be seen incase user exits the game START */
                    var i;
                    for (i = 0; i < gameData.inventoryBox.length; i++) {
                        if ((gameData.inventoryBox[i].id == param1)) {
                            gameData.inventoryBox[i].pickUpOnSceneDetails.hidden = true;
                            this['inventory' + gameData.inventoryBox[i].id].destroy();
                        }
                    }
                    /* Also set in the gamedata that this item is allowed to be seen incase user exits the game END */


                    this.removeConvoSegmentAndRerun(convoParams);

                    break;






                case "changeNpcInteractCoords":




                    var i;
                    for (i = 0; i < gameData.rooms.length; i++) {
                        if ((gameData.rooms[i].id == param1)) {
                            var k;
                            for (k = 0; k < gameData.rooms[i].npc.length; k++) {
                                if ((gameData.rooms[i].npc[k].id == characterId)) {

                                    gameData.rooms[i].npc[k].playerInteractPosition.x = param2;
                                    gameData.rooms[i].npc[k].playerInteractPosition.y = param3;

                                }
                            }
                        }
                    }

                    this.removeConvoSegmentAndRerun(convoParams);

                    break;




                case "changeNpcsDefaultPosition":




                    

                        var i;
                        for (i = 0; i < gameData.rooms.length; i++) {
                            if ((gameData.rooms[i].id == param1)) {
                                var k;
                                for (k = 0; k < gameData.rooms[i].npc.length; k++) {
                                    if ((gameData.rooms[i].npc[k].id == characterId)) {

                                        gameData.rooms[i].npc[k].position.x = param2;
                                        gameData.rooms[i].npc[k].position.y = param3;

                                    }
                                }
                            }
                        }


                    

                    this.removeConvoSegmentAndRerun(convoParams);

                    break;





                case "filter":

                    if ((param2 == "on")) {
                        $("body").addClass(param1);
                    }
                    else {
                        $("body").removeClass(param1);
                    }

                    this.removeConvoSegmentAndRerun(convoParams);

                    break;




                case "routeCharacter":

                    continueProtocol.convoParams = convoParams;
                    


                    if ((characterId == -1)) {
                        this.routePlayableCharacter(param1, param2, "none", null, currentPlayableCharacterId, true);
                    }
                    else {
                        this.routePlayableCharacter(param1, param2, "none", null, characterId, true);
                    }

                    break;




                    case "routeNpcCharacter":

                       
                        
                        this.routeNpcCharacter(param1, param2, characterId, convoParams);
                        
    
                        break;






                    case "animatePlayableCharacter":

                    

                            var playableCharacterId;

                            if ((characterId == -1))
                            {
                                playableCharacterId = currentPlayableCharacterId;
                            }
                            else
                            {
                                playableCharacterId = characterId;
                            }


                            

                            if ((this['player' + playableCharacterId] != null))
                            {
                                /* Check for a specific playable character START */
                                var i;
                                for (i = 0; i < gameData.playerSettings.playableCharacters.length; i++) {

                                    if ((gameData.playerSettings.playableCharacters[i].id == playableCharacterId)) {

                                        


                                        /* If the user had to choose an animation group in order to select a specific animation for this specific playable character, let's save the animation group START */
                                        if ((characterId != -1))
                                        {
                                            gameData.playerSettings.playableCharacters[i].currentGroupAnimationId = param1;
                                        }
                                        /* If the user had to choose an animation group in order to select a specific animation for this specific playable character, let's save the animation group END */


                                        var k;
                                        for (k = 0; k < gameData.playerSettings.playableCharacters[i].groupAnimations.length; k++)
                                        {

                                            if ((gameData.playerSettings.playableCharacters[i].groupAnimations[k].id == gameData.playerSettings.playableCharacters[i].currentGroupAnimationId))
                                            {

                                                

                                                var x;
                                                for (x = 0; x < gameData.playerSettings.playableCharacters[i].groupAnimations[k].animations.length; x++)
                                                {

                                                    

                                                    if ((gameData.playerSettings.playableCharacters[i].groupAnimations[k].animations[x].id == param2))
                                                    {

                                                        

                                                        this['player' + playableCharacterId].loadTexture("player" + playableCharacterId + gameData.playerSettings.playableCharacters[i].currentGroupAnimationId + param2, 0);
                                                        this['player' + playableCharacterId].animations.add("player" + playableCharacterId + gameData.playerSettings.playableCharacters[i].currentGroupAnimationId + param2);
                                                        var currentAnim = this['player' + playableCharacterId].animations.play("player" + playableCharacterId + gameData.playerSettings.playableCharacters[i].currentGroupAnimationId + param2, gameData.playerSettings.playableCharacters[i].groupAnimations[k].animations[x].frameRate, gameData.playerSettings.playableCharacters[i].groupAnimations[k].animations[x].loop);



                                                        /* Animate the player END */

                                                        /* Do we wait for the animation to complete before proceeding the protocol */
                                                        if ((param3 == 0)) {
                                                            this.removeConvoSegmentAndRerun(convoParams);
                                                            return false;
                                                        }

                                                        if ((param3 == 1)) {
                                                            currentAnim.onComplete.add(function () {

                                                                /* Once animation is complete, then go to next action block START */
                                                                this.removeConvoSegmentAndRerun(convoParams);
                                                                /* Once animation is complete, then go to next action block END */

                                                            }, this);
                                                        }
                                                        





                                                    }

                                                }
                                            }

                                            


                                            
                                        }
                                    }

                                }
                            }
                            else
                            {
                                alert("Playable character is not on scene!");
                            }
    
                            
                            
    
    
                        
    
                        break;












                        case "animateNpcCharacter":
    
    
    
                            /* Animate the NPC START */
                            var i;
                            for (i = 0; i < gameData.rooms.length; i++) {
                                if ((gameData.rooms[i].id == currentRoom)) {
                                    var k;
                                    for (k = 0; k < gameData.rooms[i].npc.length; k++) {
    
    
                                        /* Animations START */
                                        var x;
                                        for (x = 0; x < gameData.rooms[i].npc[k].animations.length; x++) {
                                            if ((gameData.rooms[i].npc[k].animations[x].id == param1)) {
    
                                                this['npc' + characterId].loadTexture("npc" + characterId + param1, 0);
                                                this['npc' + characterId].animations.add("npc" + characterId + param1);
                                                var currentAnim = this['npc' + characterId].animations.play("npc" + characterId + param1, gameData.rooms[i].npc[k].animations[x].frameRate, gameData.rooms[i].npc[k].animations[x].loop);
    
                                                /* Do we wait for the animation to complete before proceeding the protocol */
                                                if ((param2 == 0)) {
                                                    this.removeConvoSegmentAndRerun(convoParams);
                                                    return false;
                                                }
    
                                                if ((param2 == 1)) {
                                                    currentAnim.onComplete.add(function () {
    
                                                        /* Once animation is complete, then go to next action block START */
                                                        this.removeConvoSegmentAndRerun(convoParams);
                                                        /* Once animation is complete, then go to next action block END */
    
                                                    }, this);
                                                }
                                                
    
                                            }
                                        }
                                        /* Animations END */
    
                                    }
                                }
                            }
    
    
                        
    
                        break;







                    case "changeCurrentGroupAnimationForCharacter":

    
                            /* Check for a specific playable character START */
                            var i;
                            for (i = 0; i < gameData.playerSettings.playableCharacters.length; i++) {
    
                                if ((gameData.playerSettings.playableCharacters[i].id == characterId)) {
    
    
                                    /* Since the user had to choose an animation group in order to select a specific animation for this specific playable character, let's save the animation group START */
                                    gameData.playerSettings.playableCharacters[i].currentGroupAnimationId = param1;
                                    /* Since the user had to choose an animation group in order to select a specific animation for this specific playable character, let's save the animation group END */
    
                                    this.removeConvoSegmentAndRerun(convoParams);
                                    
                                }
    
                            }
                            /* Check for a specific playable character END */
                        
    
                        break;










                    case "changeNpcDefaultAnimation":

                        
    
                            /* Animate the NPC START */
                            var i;
                            for (i = 0; i < gameData.rooms.length; i++) {
                                if ((gameData.rooms[i].id == param1)) {
                                    var k;
                                    for (k = 0; k < gameData.rooms[i].npc.length; k++) {
                                        if ((gameData.rooms[i].npc[k].id == characterId))
                                        {
                                            gameData.rooms[i].npc[k].defaultAnimationId = param2;
                                            this.removeConvoSegmentAndRerun(convoParams);
                                        }
                                    }
                                }
                            }
    
    
                        
    
                        break;












                case "moveTargetZone":


                            /* Calculate time to perform the tween START */
                            var timeForTween;

                            if ((param4 == 0))
                            {
                                var dX = this['targetZone' + param1].x - param2;
                                var dY = this['targetZone' + param1].y - param3;
                                var numberOfPixelsDistance = Math.sqrt(dX * dX + dY * dY);
                                var numberOfPixelsToTravelAtPerSecond = param5;
                                timeForTween = (numberOfPixelsDistance / numberOfPixelsToTravelAtPerSecond) * 1000;
                            }
                            if ((param4 == 1))
                            {
                                timeForTween = param5;
                            }
                            /* Calculate time to perform the tween END */

                    

                            var currentAnim = this.game.add.tween(this['targetZone' + param1]).to({ x: param2, y: param3 }, timeForTween, getEasingMode(param6)).start();

                            /*****/
                            if ((param7 == 0)) {
                                this.removeConvoSegmentAndRerun(convoParams);
                                return false;
                            }

                            if ((param7 == 1)) {
                                currentAnim.onComplete.add(function () {

                                    /* Once animation is complete, then go to next action block START */
                                    this.removeConvoSegmentAndRerun(convoParams);
                                    /* Once animation is complete, then go to next action block END */

                                }, this);
                            }
                            

                       



                    break;



                case "moveNpcCharacter":

                
                                /* Calculate time to perform the tween START */
                                var timeForTween;

                                if ((param3 == 0))
                                {
                                    var dX = this['npc' + characterId].x - param1;
                                    var dY = this['npc' + characterId].y - param2;
                                    var numberOfPixelsDistance = Math.sqrt(dX * dX + dY * dY);
                                    var numberOfPixelsToTravelAtPerSecond = param4;
                                    timeForTween = (numberOfPixelsDistance / numberOfPixelsToTravelAtPerSecond) * 1000;
                                }
                                if ((param3 == 1))
                                {
                                    timeForTween = param4;
                                }
                                /* Calculate time to perform the tween END */

                               

                                var currentAnim = this.game.add.tween(this['npc' + characterId]).to({ x: param1, y: param2 }, timeForTween, getEasingMode(param5)).start();



                                /*****/
                                if ((param6 == 0)) {
                                    this.removeConvoSegmentAndRerun(convoParams);
                                    return false;
                                }

                                if ((param6 == 1)) {
                                    currentAnim.onComplete.add(function () {

                                        /* Once animation is complete, then go to next action block START */
                                        this.removeConvoSegmentAndRerun(convoParams);
                                        /* Once animation is complete, then go to next action block END */

                                    }, this);
                                }
                                /* Or its a specific number of seconds START */
                                

                    break;





                    case "movePlayableCharacter":


                        var dealingWithPlayerId;

                        if ((characterId == -1))
                        {
                            dealingWithPlayerId = currentPlayableCharacterId;
                        }
                        else
                        {
                            dealingWithPlayerId = characterId;
                        }


                                /* Calculate time to perform the tween START */
                                var timeForTween;

                                if ((param3 == 0))
                                {
                                    var dX = this['player' + dealingWithPlayerId].x - param1;
                                    var dY = this['player' + dealingWithPlayerId].y - param2;
                                    var numberOfPixelsDistance = Math.sqrt(dX * dX + dY * dY);
                                    var numberOfPixelsToTravelAtPerSecond = param4;
                                    timeForTween = (numberOfPixelsDistance / numberOfPixelsToTravelAtPerSecond) * 1000;
                                }
                                if ((param3 == 1))
                                {
                                    timeForTween = param4;
                                }
                                /* Calculate time to perform the tween END */

                               

                                var currentAnim = this.game.add.tween(this['player' + dealingWithPlayerId]).to({ x: param1, y: param2 }, timeForTween, getEasingMode(param5)).start();



                                /*****/
                                if ((param6 == 0)) {
                                    this.removeConvoSegmentAndRerun(convoParams);
                                    return false;
                                }

                                if ((param6 == 1)) {
                                    currentAnim.onComplete.add(function () {

                                        /* Once animation is complete, then go to next action block START */
                                        this.removeConvoSegmentAndRerun(convoParams);
                                        /* Once animation is complete, then go to next action block END */

                                    }, this);
                                }
                                /* Or its a specific number of seconds START */
                                

                    break;



                case "addQuestionAvailability":

                    this.addQuestionAvailability(param1, param2);

                    this.removeConvoSegmentAndRerun(convoParams);

                    break;





                case "changeTargetZoneStateLevel":



                    /* Make target zone action number go to the one you have stated START */
                    var i;
                    for (i = 0; i < gameData.rooms.length; i++) {
                        if ((gameData.rooms[i].id == param1)) {
                            var k;
                            for (k = 0; k < gameData.rooms[i].targetZones.length; k++) {
                                if ((gameData.rooms[i].targetZones[k].id == param2)) {
                                    gameData.rooms[i].targetZones[k].stateId = param3;


                                    var stateId = gameData.rooms[i].targetZones[k].stateId;

                                    var q;
                                    for (q = 0; q < gameData.rooms[i].targetZones[k].states.length; q++) {
                                        if ((gameData.rooms[i].targetZones[k].states[q].id == stateId)) {
                                            this['targetZone' + gameData.rooms[i].targetZones[k].id].name = gameData.rooms[i].targetZones[k].states[q].languages[currentLang].name;
                                        }
                                    }

                                }
                            }
                        }
                    }
                    /* Make target zone action number go to the one you have stated END */

                    this.removeConvoSegmentAndRerun(convoParams);

                    break;







                case "blackTransitionIn":



                    this.blackInTransition = this.game.add.graphics(0, 0);

                    this.blackInTransition.beginFill(0x000000, 1);
                    
                    var i;
                    for (i = 0; i < gameData.rooms.length; i++)
                    {
                        if ((gameData.rooms[i].id == currentRoom))
                        {
                            this.blackInTransition.drawRect(0, 0, gameData.rooms[i].width, gameData.rooms[i].height);
                        }
                    }

                    this.blackInTransition.endFill();
                    this.blackInTransition.alpha = 0;

                    this.game.add.tween(this.blackInTransition).to({ alpha: 1 }, param1, Phaser.Easing.none).start();


                    this.removeConvoSegmentAndRerun(convoParams);

                    break;





                case "blackTransitionOut":



                    this.game.add.tween(this.blackInTransition).to({ alpha: 0 }, param1, Phaser.Easing.none).start();


                    this.removeConvoSegmentAndRerun(convoParams);

                    break;






                case "disableRoomEntranceProtocol":

                    /* Make target zone action number go to the one you have stated START */
                    var i;
                    for (i = 0; i < gameData.rooms.length; i++) {
                        if ((gameData.rooms[i].id == param1)) {
                            var x;
                            for (x = 0; x < gameData.rooms[i].roomEntranceProtocol.length; x++) {
                                if ((gameData.rooms[i].roomEntranceProtocol[x].id == param2))
                                {
                                    gameData.rooms[i].roomEntranceProtocol[x].available = false;
                                }
                            }
                        }
                    }
                    /* Make target zone action number go to the one you have stated END */

                    this.removeConvoSegmentAndRerun(convoParams);

                    break;





                    case "enableRoomEntranceProtocol":

                    /* Make target zone action number go to the one you have stated START */
                    var i;
                    for (i = 0; i < gameData.rooms.length; i++) {
                        if ((gameData.rooms[i].id == param1)) {
                            var x;
                            for (x = 0; x < gameData.rooms[i].roomEntranceProtocol.length; x++) {
                                if ((gameData.rooms[i].roomEntranceProtocol[x].id == param2))
                                {
                                    gameData.rooms[i].roomEntranceProtocol[x].available = true;
                                }
                            }
                        }
                    }
                    /* Make target zone action number go to the one you have stated END */

                    this.removeConvoSegmentAndRerun(convoParams);

                    break;





                case "endProtocol":

                    convoParams = convoParams.splice(1);

                    this.removeConvoSegmentAndRerun(convoParams);

                    //this.setAllCharactersIdle();

                    break;





                case "checkIfItemAcquired":


                    var i;
                    for (i = 0; i < gameData.inventoryBox.length; i++) {
                        if ((gameData.inventoryBox[i].id == param1)) {
                            if ((gameData.inventoryBox[i].orderNumber != 0)) {
                                /* Item IS ACQUIRED, so we skip over the steps */
                                this.removeConvoSegmentAndRerun(convoParams, param2);
                            }
                            else {
                                /* Item IS NOT ACQUIRED, so we just play the immediate next line */
                                this.removeConvoSegmentAndRerun(convoParams);
                            }
                        }
                    }

                    break;





                    case "checkIfAllPlayableCharactersPresent":

                    var totalPlayableCharactersInGame = gameData.playerSettings.playableCharacters.length;
                    var counter = 0;

                    this.charactersAndZonesGroup.forEachAlive(function (zone) {
                        if ((zone.type == "playerableCharacter")) {

                            counter ++;

                        }
                    }, this);


                    console.log(totalPlayableCharactersInGame);
                    console.log(counter);

                    if ((counter == totalPlayableCharactersInGame)) {
                        /* All playable characters are present so skip the number of protocols */
                        this.removeConvoSegmentAndRerun(convoParams, param1);
                    }
                    else {
                        /* Not all playable characters are present so run the protocol as normal */
                        this.removeConvoSegmentAndRerun(convoParams);
                    }


                    break;






                    case "checkIfGlobalVariableValueEquals":

                        var variableName = "";

                        var i;
                        for (i = 0; i < globalVarsArray.length; i++) {
                            if ((globalVarsArray[i].id == param1))
                            {
                                variableName = globalVarsArray[i].name;
                            }
                        }


                    if ((param2 == 0))
                    {
                        if ((gameData.globalVars[variableName] == param3)) {
                            /* All playable characters are present so skip the number of protocols */
                            this.removeConvoSegmentAndRerun(convoParams, param4);
                        }
                        else {
                            this.removeConvoSegmentAndRerun(convoParams);
                        }
                    }

                    if ((param2 == 1))
                    {
                        if ((gameData.globalVars[variableName] < param3)) {
                            /* All playable characters are present so skip the number of protocols */
                            this.removeConvoSegmentAndRerun(convoParams, param4);
                        }
                        else {
                            this.removeConvoSegmentAndRerun(convoParams);
                        }
                    }

                    if ((param2 == 2))
                    {
                        if ((gameData.globalVars[variableName] <= param3)) {
                            /* All playable characters are present so skip the number of protocols */
                            this.removeConvoSegmentAndRerun(convoParams, param4);
                        }
                        else {
                            this.removeConvoSegmentAndRerun(convoParams);
                        }
                    }

                    if ((param2 == 3))
                    {
                        if ((gameData.globalVars[variableName] > param3)) {
                            /* All playable characters are present so skip the number of protocols */
                            this.removeConvoSegmentAndRerun(convoParams, param4);
                        }
                        else {
                            this.removeConvoSegmentAndRerun(convoParams);
                        }
                    }

                    if ((param2 == 4))
                    {
                        if ((gameData.globalVars[variableName] >= param3)) {
                            /* All playable characters are present so skip the number of protocols */
                            this.removeConvoSegmentAndRerun(convoParams, param4);
                        }
                        else {
                            this.removeConvoSegmentAndRerun(convoParams);
                        }
                    }
                    


                    break;




                case "checkZoneStatusConditionMet":



                    this.charactersAndZonesGroup.forEachAlive(function (zone) {
                        if ((zone.id == param1) && (zone.type == "targetZone")) {

                            if ((zone.animations.currentAnim.name == param2)) {
                                /* It matches the zone state */
                                this.removeConvoSegmentAndRerun(convoParams, param3);
                            }
                            else {
                                /* It DOESN'T match the zone state */
                                this.removeConvoSegmentAndRerun(convoParams);
                            }

                        }
                    }, this);

                    break;



                case "removeQuestionAvailability":

                    this.removeQuestionAvailability(param1, param2);

                    this.removeConvoSegmentAndRerun(convoParams);

                    break;



                    case "customProtocol":

                        eval(param1);

                        //this.removeConvoSegmentAndRerun(convoParams);
                        

                        break;




                        case "setGlobalVariableValue":

                        var variableName = "";

                            var i;
                            for (i = 0; i < globalVarsArray.length; i++) {
                                if ((globalVarsArray[i].id == param1))
                                {
                                    variableName = globalVarsArray[i].name;
                                }
                            }

                        gameData.globalVars[variableName] = param2;

                        this.removeConvoSegmentAndRerun(convoParams);

                        break;





                        case "incrementGlobalVariableNumberValue":

                        var variableName = "";

                            var i;
                            for (i = 0; i < globalVarsArray.length; i++) {
                                if ((globalVarsArray[i].id == param1))
                                {
                                    variableName = globalVarsArray[i].name;
                                }
                            }

                        gameData.globalVars[variableName]++;

                        this.removeConvoSegmentAndRerun(convoParams);

                        break;





                        case "decrementGlobalVariableNumberValue":

                        var variableName = "";

                            var i;
                            for (i = 0; i < globalVarsArray.length; i++) {
                                if ((globalVarsArray[i].id == param1))
                                {
                                    variableName = globalVarsArray[i].name;
                                }
                            }

                        gameData.globalVars[variableName]--;

                        this.removeConvoSegmentAndRerun(convoParams);

                        break;





                case "changePlayableCharacterAvatarStatus":


                    var i;
                    for (i = 0; i < gameData.playerSettings.playableCharacters.length; i++) {
                        if ((gameData.playerSettings.playableCharacters[i].id == characterId)) {

                            var previousState = gameData.playerSettings.playableCharacters[i].avatarIconState;
                            var newState = param1;

                            /* Save record START */
                            gameData.playerSettings.playableCharacters[i].avatarIconState = param1;
                            /* Save record END */

                            /* If the icon was previously hidden, then we need to destory the whole avatar icon group and rebuild it again START */
                            if ((previousState == 2) && (newState < 2))
                            {
                                this.avatarIconGroup.destroy();
                                this.createPlayableCharacterAvatars();
                            }
                            /* If the icon was showing but now we're hiding it */
                            else if ((previousState < 2) && (newState == 2))
                            {
                                this.avatarIconGroup.destroy();
                                this.createPlayableCharacterAvatars();
                            }
                            /* If the icon was previously hidden, then we need to destory the whole avatar icon group and rebuild it again END */
                            else
                            {
                                this.avatarIconGroup.forEachAlive(function (option) {
                                    if ((option.avatarId == characterId)) {
                                        option.avatarIconState = param1;
                                    }
                                }, this);
                            }
                        }
                    }


                    this.removeConvoSegmentAndRerun(convoParams);

                    break;




                case "changeRoomBackgroundMusic":

                    param1 = parseFloat(param1).toFixed(2);


                    var i;
                    for (i = 0; i < gameData.rooms.length; i++) {
                        if ((gameData.rooms[i].id == param1)) {
                            gameData.rooms[i].music.musicId = param2;
                            //gameData.rooms[i].music.musicPath = param2;
                        }
                    }


                    this.removeConvoSegmentAndRerun(convoParams);

                    break;




                case "goThroughGateway":

                    previewRoomId = null;

                    this.closingScene = true;

                    this.cancelWalkingFollowers(currentPlayableCharacterId);

                    this.currentActionModeText.alpha = 0;

                    this.disableToolBarAndPlayerMovements = true;

                    /* Create blackIn and fade out for scene transition START */
                    var blackIn = this.game.add.graphics(0, 0);

                    blackIn.beginFill(0x000000, 1);
                    
                    var i;
                    for (i = 0; i < gameData.rooms.length; i++)
                    {
                        if ((gameData.rooms[i].id == currentRoom))
                        {
                            blackIn.drawRect(0, 0, gameData.rooms[i].width, gameData.rooms[i].height);
                        }
                    }

                    blackIn.endFill();
                    blackIn.alpha = 0;

                    var fadeInBlackTransition = this.game.add.tween(blackIn).to({ alpha: 1 }, 1000, Phaser.Easing.none).start();
                    fadeInBlackTransition.onComplete.add( () => {

                        this.destroyNarrationAudio();

                        /* Stop foley sounds START */
                        this.foleySounds.stop();
                        this.foleyFootstepsSounds.stop();
                        /* Stop foley sounds END */

                        previousRoom = currentRoom;

                        

                            /* Set the new room id we are going to START */
                            currentRoom = param1;
                            /* Set the new room id we are going to END */

                            /* Record the current room id the player is now in START */
                            gameData.playerSettings.currentRoomId = parseInt(currentRoom);

                            var i;
                            for (i = 0; i < gameData.playerSettings.playableCharacters.length; i++) {
                                if ((gameData.playerSettings.playableCharacters[i].id == currentPlayableCharacterId)) {
                                    gameData.playerSettings.playableCharacters[i].currentRoomId = parseInt(currentRoom);
                                    gameData.playerSettings.playableCharacters[i].position = getTargetZonePlayerInteractionCoords(currentRoom, param2);
                                    previousScreenType = 2;
                                    roomEntranceTargetZoneId = param2;
                                }
                            }
                            /* Record the current room id the player is now in END */

                            this.assignEscortFollowersToNextRoom(currentRoom, param2);

                            console.log(this.game);
                            this.foleySounds.stop();
                            this.foleyFootstepsSounds.stop();
                            this.state.start('RoomPreloader');

                            
                            /* Go to room number END */
                        

                        return false;

                    }, this);
                    /* Create blackIn and fade out for scene transition END */


                    break;



                    case "showEndScreen":

                    this.currentActionModeText.alpha = 0;

                    /* Create blackIn and fade out for scene transition START */
                    var blackIn = this.game.add.graphics(0, 0);

                    blackIn.beginFill(0x000000, 1);
                    
                    var i;
                    for (i = 0; i < gameData.rooms.length; i++)
                    {
                        if ((gameData.rooms[i].id == currentRoom))
                        {
                            blackIn.drawRect(0, 0, gameData.rooms[i].width, gameData.rooms[i].height);
                        }
                    }

                    blackIn.endFill();
                    blackIn.alpha = 0;

                    var fadeInBlackTransition = this.game.add.tween(blackIn).to({ alpha: 1 }, 1000, Phaser.Easing.none).start();
                    fadeInBlackTransition.onComplete.add( () => {

                        this.destroyNarrationAudio();

                        /* Stop foley sounds START */
                        this.foleySounds.stop();
                        this.foleyFootstepsSounds.stop();
                        /* Stop foley sounds END */

                        previousRoom = currentRoom;

                        
                        if ((systemSettings.endingScreen.enable == true))
                        {
                            game.state.start('EndScreenPreloader');
                        }
                        else
                        {
                            game.state.start('TitleCard');
                        }
                        

                        return false;

                    }, this);
                    /* Create blackIn and fade out for scene transition END */


                    break;




                    case "goToCutScene":

                    this.cancelPlayerWalkingTweenAndSetToIdle(currentPlayableCharacterId);

                    this.currentActionModeText.alpha = 0;

                    this.disableToolBarAndPlayerMovements = true;

                    /* Create blackIn and fade out for scene transition START */
                    var blackIn = this.game.add.graphics(0, 0);

                    blackIn.beginFill(0x000000, 1);
                    
                    var i;
                    for (i = 0; i < gameData.rooms.length; i++)
                    {
                        if ((gameData.rooms[i].id == currentRoom))
                        {
                            blackIn.drawRect(0, 0, gameData.rooms[i].width, gameData.rooms[i].height);
                        }
                    }

                    blackIn.endFill();
                    blackIn.alpha = 0;

                    var fadeInBlackTransition = this.game.add.tween(blackIn).to({ alpha: 1 }, 1000, Phaser.Easing.none).start();
                    fadeInBlackTransition.onComplete.add( () => {

                        this.destroyNarrationAudio();

                        /* Stop foley sounds START */
                        this.foleySounds.stop();
                        this.foleyFootstepsSounds.stop();
                        /* Stop foley sounds END */

                        previousRoom = currentRoom;

                        this.saveGame();

                        cutSceneCallback = param1;

						this.state.start("CutScenePreloader");

                        return false;

                    }, this);
                    /* Create blackIn and fade out for scene transition END */


                    break;








                case "bringCharacterToTop":

                    if ((characterId == -1)) {

                        this.game.world.bringToTop(this['player' + currentPlayableCharacterId]);


                    }
                    else {
                        this.charactersAndZonesGroup.forEachAlive(function (npc) {
                            if ((npc.id == characterId) && (npc.type == "npc")) {
                                this.game.world.bringToTop(npc);
                            }
                        }, this);
                    }

                    this.removeConvoSegmentAndRerun(convoParams);

                    break;



                case "removeFromInventory":

                    this.removeFromInventory(param1, characterId);

                    this.removeConvoSegmentAndRerun(convoParams);

                    break;







                case "markInventoryItemAttentionStatus":


                    var i;
                    for (i = 0; i < gameData.inventoryBox.length; i++) {
                        if ((gameData.inventoryBox[i].id == param1)) {

                            gameData.inventoryBox[i].bringToAttention = param2;

                        }
                    }

                    this.removeConvoSegmentAndRerun(convoParams);

                    break;




                    case "enableEscortingItem":

                        var i;
                        for (i = 0; i < gameData.escort.length; i++) {
                            if ((gameData.escort[i].id == param1)) {
    
                                gameData.escort[i].available = true;
    
                            }
                        }

                        // Make any followers follow you immediately
                        this.activateEscortingOnWalkEnd(currentPlayableCharacterId);
    
                        this.removeConvoSegmentAndRerun(convoParams);
    
                        break;



                        case "disableEscortingItem":

                        var i;
                        for (i = 0; i < gameData.escort.length; i++) {
                            if ((gameData.escort[i].id == param1)) {
    
                                gameData.escort[i].available = false;
    
                            }
                        }
    
                        this.removeConvoSegmentAndRerun(convoParams);
    
                        break;





                case "showCloseUpImage":


                    continueProtocol.convoParams = convoParams;


                    var i;
                    for (i = 0; i < closeUpImages.length; i++) {
                        if ((closeUpImages[i].id == param1)) {

                            viewCloseUpImage = closeUpImages[i].id;

                        }
                    }



                    
                    this.foleySounds.stop();
                    this.foleyFootstepsSounds.stop();
                    this.saveGame();
                    this.cancelPlayerWalkingTweenAndSetToIdle(currentPlayableCharacterId);
                    this.state.start('CloseUpImagePreloader');

                    /*this.currentCloseUpImage = this.game.add.sprite(0, 0, param1);
                    this.currentCloseUpImage.fixedToCamera = true;
                    this.currentCloseUpImage.inputEnabled = true;
                    this.currentCloseUpImage.events.onInputDown.add(this.destroyCloseUpImage, this);

                    this.removeConvoSegmentAndRerun(convoParams);*/

                    break;




                case "showMap":

                    currentMapId = param1;

                    this.foleySounds.stop();
                    this.foleyFootstepsSounds.stop();
                    this.saveGame();
                    this.cancelPlayerWalkingTweenAndSetToIdle(currentPlayableCharacterId);
                    this.state.start('Map');

                    break;




                case "showCloseUpPuzzle":

                    closeUpPuzzleCallback.puzzleId = param1;
                    
                    this.foleySounds.stop();
                    this.foleyFootstepsSounds.stop();
                    this.saveGame();
                    this.cancelPlayerWalkingTweenAndSetToIdle(currentPlayableCharacterId);
                    this.state.start("CloseUpPuzzlePreloader");

                    break;




                case "showToDoList":


                    continueProtocol.convoParams = convoParams;
                    


                    viewToDoList = param1;
                    this.foleySounds.stop();
                    this.foleyFootstepsSounds.stop();
                    this.saveGame();
                    this.cancelPlayerWalkingTweenAndSetToIdle(currentPlayableCharacterId);
                    this.state.start('ToDoList');

                    /*this.currentCloseUpImage = this.game.add.sprite(0, 0, param1);
                    this.currentCloseUpImage.fixedToCamera = true;
                    this.currentCloseUpImage.inputEnabled = true;
                    this.currentCloseUpImage.events.onInputDown.add(this.destroyToDoList, this);

              

                    this.toDoListTextGroup = this.game.add.group();
                    var startingYPos = 150;

                    
                    var i;
                    for (i = 0; i < gameData.inventoryBox.length; i++) {

                        if ((gameData.inventoryBox[i].id == param1)) {

                            var currentList = gameData.inventoryBox[i].toDoListDetails.currentList;

                            var k;
                            for (k = 0; k < gameData.inventoryBox[i].toDoListDetails.lists[currentList].length; k++) {
                                if ((gameData.inventoryBox[i].toDoListDetails.lists[currentList][k].status == 0 || gameData.inventoryBox[i].toDoListDetails.lists[currentList][k].status == 1)) {

                                    var text = gameData.inventoryBox[i].toDoListDetails.lists[currentList][k].text + "\n";

                                    var toDoListText = this.game.add.text(310, startingYPos, text, { font: '36px uiFont', fill: '#000000' });
                                    toDoListText.wordWrap = true;
                                    toDoListText.lineSpacing = -10;
                                    toDoListText.wordWrapWidth = 400;

                                    if ((gameData.inventoryBox[i].toDoListDetails.lists[currentList][k].status == 1))
                                    {
                                        toDoListText.alpha = 0.3;
                                    }


                                    this.toDoListTextGroup.add(toDoListText);

                                    startingYPos = startingYPos + toDoListText.height - 20;



                                }
                            }
                        }

                    }
                    

                    this.toDoListTextGroup.fixedToCamera = true;
                    this.toDoListTextGroup.angle = 357;


                    this.removeConvoSegmentAndRerun(convoParams);
                    */

                    break;






                    case "showDocument":

                    continueProtocol.convoParams = convoParams;
                    


                    viewDocument = param1;
                    this.foleySounds.stop();
                    this.foleyFootstepsSounds.stop();
                    this.saveGame();
                    this.cancelPlayerWalkingTweenAndSetToIdle(currentPlayableCharacterId);
                    this.state.start('Document');



                    break;






                case "changeToDoListTaskStatus":




                    /* Loop START */
                    var i;
                    for (i = 0; i < gameData.toDoLists.length; i++) {

                        if ((gameData.toDoLists[i].id == param1)) {

                            var k;
                            for (k = 0; k < gameData.toDoLists[i].lists.length; k++) {
                                if ((gameData.toDoLists[i].lists[k].id == param2)) {

                                    var x;
                                    for (x = 0; x < gameData.toDoLists[i].lists[k].items.length; x++) {

                                        if ((gameData.toDoLists[i].lists[k].items[x].id == param3)) {
                                            gameData.toDoLists[i].lists[k].items[x].status = param4;
                                        }

                                    }

                                }
                            }



                        }

                    }
                    /* Loop END */


                    this.removeConvoSegmentAndRerun(convoParams);

                    break;




                    case "changeCurrentListInToDoList":

                        /* Loop START */
                        var i;
                        for (i = 0; i < gameData.toDoLists.length; i++) {
    
                            if ((gameData.toDoLists[i].id == param1)) {
    
                                gameData.toDoLists[i].lists[k].currentListId == param2
    
                            }
    
                        }
                        /* Loop END */
    
    
                        this.removeConvoSegmentAndRerun(convoParams);
    
                        break;







                    case "focusCameraOnCharacter":

                    if ((characterId == -1))
                    {
                        this.game.camera.follow(this['player' + currentPlayableCharacterId], Phaser.Camera.FOLLOW_LOCKON, systemSettings.gameplaySettings.otherSettings.cameraFollowDelay, systemSettings.gameplaySettings.otherSettings.cameraFollowDelay);
                    }
                    else
                    {
                        this.game.camera.follow(this['player' + characterId], Phaser.Camera.FOLLOW_LOCKON, systemSettings.gameplaySettings.otherSettings.cameraFollowDelay, systemSettings.gameplaySettings.otherSettings.cameraFollowDelay);
                    }
                    

                    this.removeConvoSegmentAndRerun(convoParams);

                    break;




                case "npcsChangeRelationshipTerm":

                    this.npcsChangeRelationshipTerm(param1, param2, characterId);

                    this.removeConvoSegmentAndRerun(convoParams);

                    break;



                case "npcsChangeConversationIntroLevel":

                    this.npcsChangeConversationIntroLevel(param1, param2, characterId);

                    this.removeConvoSegmentAndRerun(convoParams);

                    break;




                case "addToInventoryRecords":

                    var dealingWithPlayerId;

                    if ((characterId == -1))
                    {
                        dealingWithPlayerId = currentPlayableCharacterId;
                    }
                    else
                    {
                        dealingWithPlayerId = characterId;
                    }

                    this.addToInventoryRecords(param1, dealingWithPlayerId);

                    /* If param3 has been set to true, then remove the item from the scene as well START */
                    /*if ((param2 == true)) {
                        this.charactersAndZonesGroup.forEachAlive(function (item) {
                            if ((item.id == param1) && (item.type == "inventory")) {
                                item.kill();
                            }

                        }, this);
                    }*/
                    /* If param3 has been set to true, then remove the item from the scene as well END */

                    this.removeConvoSegmentAndRerun(convoParams);

                    break;




                case "playFoleySound":

                    var soundStartPoint;
                    var soundDuration;

                    var i;
                    for (i = 0; i < foleySounds.items.length; i++) {
                        if ((foleySounds.items[i].id == param1)) {
                            soundStartPoint = foleySounds.items[i].start;
                            soundDuration = foleySounds.items[i].duration;
                        }
                    }


                    /* If an id hasn't been specified then just set the name to be default START */
                    if ((param3 === false) || (param3 === null)) {
                        param4 = "currentSound";
                    }
                    /* If an id hasn't been specified then just set the name to be default END */

                    


                    this.foleySounds.addMarker(param4, soundStartPoint, soundDuration, userSettings.volumes.sfxVolume, param2);
                    this.foleySounds.play(param4);

                    if ((param2 === false) || (param2 === null)) {
                        this.foleySounds.removeMarker(param4);
                    }

                    
                    this.removeConvoSegmentAndRerun(convoParams);
                    
                    

                    break;



                case "stopFoleySound":

                    this.foleySounds.stop(param1);

                    this.foleySounds.removeMarker(param1);

                    this.removeConvoSegmentAndRerun(convoParams);

                    break;



                case "fadeInBackgroundMusic":

                    /* Convertions START */
                    param1 = parseFloat(param1).toFixed(2);
                    /* Convertions END */

                    backgroundMusic.fadeIn(param1);

                    this.removeConvoSegmentAndRerun(convoParams);

                    break;




                case "fadeOutBackgroundMusic":

                    /* Convertions START */
                    param1 = parseFloat(param1).toFixed(2);
                    /* Convertions END */

                    backgroundMusic.fadeOut(param1);

                    this.removeConvoSegmentAndRerun(convoParams);

                    break;





                case "tempChangeBackgroundMusicVolume":

                    /* Convertions START */
                    param1 = parseFloat(param1).toFixed(2);
                    /* Convertions END */

                    backgroundMusic.volume = param1;

                    this.removeConvoSegmentAndRerun(convoParams);

                    break;




                case "setBackgroundMusicVolumeToDefault":

                    backgroundMusic.volume = userSettings.volumes.musicVolume;

                    this.removeConvoSegmentAndRerun(convoParams);

                    break;




                case "setToPlayerTint":

                    /* Convertions START */
                    param1 = param1.substring(1); //Remove #
                    param1 = "0x" + param1;
                    /* Convertions END */


                    this['player' + currentPlayableCharacterId].tint = param1;




                    this.removeConvoSegmentAndRerun(convoParams);

                    break;






                case "delay":

                    /* Convertions START */
                    param1 = parseFloat(param1).toFixed(2);
                    /* Convertions END */

                    this.game.time.events.add(param1, function () { this.delayInNextAction(convoParams) }, this);

                    break;



                case "effect":

                    if ((param1 == "tvStaticEffect") && (param2 == "on")) {
                        this.tvStaticEffect();
                    }
                    if ((param1 == "tvStaticEffect") && (param2 == "off")) {
                        this.tvStaticAnim.destroy();
                    }

                    this.removeConvoSegmentAndRerun(convoParams);

                    break;




                case "roomSpeech":
                case "globalSpeech":                   


                    /* Work out if this is a playable character or an npc START */
                    var speakingCharacterType = this.getCharacterType(characterId);
                    /* Work out if this is a playable character or an npc END */



                    /* id p is the player */
                    if ((speakingCharacterType == "narrator")) {
                        this.narratorText.setText(param1.languages[currentLang].text);
                    }
                    else if ((speakingCharacterType == "playableCharacter")) {

                        var playableCharacterId;

                        if ((characterId == -1))
                        {
                            playableCharacterId = currentPlayableCharacterId;
                        }
                        else
                        {
                            playableCharacterId = characterId;
                        }



                        if ((this['player' + playableCharacterId] != null))
                        {
                            /* Set the text START */
                            if ((userSettings.speechMode == 0) || (userSettings.speechMode == 2))
                            {
                                if ((param1.languages[currentLang].text != null))
                                {
                                    this['player' + playableCharacterId].speechText.setText(param1.languages[currentLang].text);

                                    /* Colors START */
                                    var speechTextGradient = this['player' + playableCharacterId].speechText.context.createLinearGradient(0, 0, 0, this['player' + playableCharacterId].speechText.height);
                                    speechTextGradient.addColorStop(0, this['player' + playableCharacterId].speechText.conversationFillColor);
                                    speechTextGradient.addColorStop(1, this['player' + playableCharacterId].speechText.conversationFillColorAdditional);
                                    this['player' + playableCharacterId].speechText.fill = speechTextGradient;
                                    /* Colors END */
                                }
                                else{
                                    alert("Speech text missing");
                                }
                            }
                            /* Set the text END */




                            /* If no mode is set we will just speak in the current direction we are facing */
                            if ((param3 == null))
                            {
                                var currentWalkingAnim = this['player' + playableCharacterId].animations.currentAnim.name;
                                if ((currentWalkingAnim == "player" + playableCharacterId + this.acquirePlayableCharactersCurrentGroupAnimationId(playableCharacterId) + 22) /* Walk Left */ || (currentWalkingAnim == "player" + playableCharacterId + this.acquirePlayableCharactersCurrentGroupAnimationId(playableCharacterId) + 10)) /* Focus Left */ {
                                    this.setPlayerAnimation(18, playableCharacterId); //Talk Left
                                }
                                if ((currentWalkingAnim == "player" + playableCharacterId + this.acquirePlayableCharactersCurrentGroupAnimationId(playableCharacterId) + 23) /* Walk Right */ || (currentWalkingAnim == "player" + playableCharacterId + this.acquirePlayableCharactersCurrentGroupAnimationId(playableCharacterId) + 11)) /* Focus Right */ {
                                    this.setPlayerAnimation(19, playableCharacterId); //Talk Right
                                }
                                if ((currentWalkingAnim == "player" + playableCharacterId + this.acquirePlayableCharactersCurrentGroupAnimationId(playableCharacterId) + 21) /* Walk Front */ || (currentWalkingAnim == "player" + playableCharacterId + this.acquirePlayableCharactersCurrentGroupAnimationId(playableCharacterId) + 9)) /* Focus Front */ {
                                    this.setPlayerAnimation(17, playableCharacterId); //Talk Front
                                }
                                if ((currentWalkingAnim == "player" + playableCharacterId + this.acquirePlayableCharactersCurrentGroupAnimationId(playableCharacterId) + 20) /* Walk Back */ || (currentWalkingAnim == "player" + playableCharacterId + this.acquirePlayableCharactersCurrentGroupAnimationId(playableCharacterId) + 8)) /* Focus Back */ {
                                    this.setPlayerAnimation(16, playableCharacterId); //Talk Back
                                }

                                /* It might be introductory narration START */
                                if ((currentWalkingAnim != "player" + playableCharacterId + this.acquirePlayableCharactersCurrentGroupAnimationId(playableCharacterId) + 22) /* Walk Left */ && (currentWalkingAnim != "player" + playableCharacterId + this.acquirePlayableCharactersCurrentGroupAnimationId(playableCharacterId) + 23) /* Walk Right */ && (currentWalkingAnim != "player" + playableCharacterId + this.acquirePlayableCharactersCurrentGroupAnimationId(playableCharacterId) + 21) /* Walk Front */ && (currentWalkingAnim != "player" + playableCharacterId + this.acquirePlayableCharactersCurrentGroupAnimationId(playableCharacterId) + 20) /* Walk Back */ && (currentWalkingAnim != "player" + playableCharacterId + this.acquirePlayableCharactersCurrentGroupAnimationId(playableCharacterId) + 10) /* Focus Left */ && (currentWalkingAnim != "player" + playableCharacterId + this.acquirePlayableCharactersCurrentGroupAnimationId(playableCharacterId) + 11) /* Focus Right */ && (currentWalkingAnim != "player" + playableCharacterId + this.acquirePlayableCharactersCurrentGroupAnimationId(playableCharacterId) + 9) /* Focus Front */ && (currentWalkingAnim != "player" + playableCharacterId + this.acquirePlayableCharactersCurrentGroupAnimationId(playableCharacterId) + 8)) /* Focus Back */ {
                                    this.setPlayerAnimation(17, playableCharacterId); //Talk Front
                                }
                            }

                            /* A specific talking animation has been set */
                            if ((param3 == 0))
                            {
                                this.setPlayerAnimation(param4, playableCharacterId);
                            }

                            /* We are talking to a specfic npc, so we will run the appropriate talking animation */
                            if ((param3 == 1)) {

                                    var i;
                                    for (i = 0; i < gameData.rooms.length; i++) {
                                        if ((gameData.rooms[i].id == currentRoom)) {
                                            var k;
                                            for (k = 0; k < gameData.rooms[i].npc.length; k++) {
                                                if ((gameData.rooms[i].npc[k].id == param4)) {

                                                    /* Only set the players talking animation if hes not already talking START */
                                                    if ((this['player' + playableCharacterId].animations.currentAnim.name != gameData.rooms[i].npc[k].playerTalkAnimId)) {
                                                        this.setPlayerAnimation(gameData.rooms[i].npc[k].playerTalkAnimId, playableCharacterId);
                                                    }
                                                    /* Only set the players talking animation if hes not already talking END */

                                                }
                                            }
                                        }
                                    }
                                

                                if ((this['player' + playableCharacterId].x > this['npc' + param4].x))
                                {
                                    this.setNpcAnimation(5, param4); //Focus Right
                                }
                                else
                                {
                                    this.setNpcAnimation(4, param4); //Focus Left
                                }
                                

                            }
                            /* Player is talking to someone END */
                        }
                        else
                        {
                            alert("Playable character is not on scene!");
                        }

                    }
                    /* Its a npc character */
                    else {


                        /* Set speech text START */
                        if ((userSettings.speechMode == 0) || (userSettings.speechMode == 2))
                        {
                            this.charactersAndZonesGroup.forEachAlive(function (npc) {
                                if ((npc.id == characterId) && (npc.type == "npc")) {
    
                                    if ((param1.languages[currentLang].text != null))
                                    {
                                        npc.speechText.setText(param1.languages[currentLang].text);

                                        /* Colors START */
                                        var speechTextGradient = this['npc' + npc.id].speechText.context.createLinearGradient(0, 0, 0, this['npc' + npc.id].speechText.height);
                                        speechTextGradient.addColorStop(0, this['npc' + npc.id].speechText.conversationFillColor);
                                        speechTextGradient.addColorStop(1, this['npc' + npc.id].speechText.conversationFillColorAdditional);
                                        this['npc' + npc.id].speechText.fill = speechTextGradient;
                                        /* Colors END */
                                    }
                                    else
                                    {
                                        alert("Speech text missing");
                                    }
                                }
    
                            }, this);
                        }
                        /* Set speech text END */


                        if ((param3 == null))
                        {
                            this.setNpcAnimation(11, characterId); //Talk Front
                        }


                        if ((param3 == 0))
                        {
                            this.setNpcAnimation(param4, characterId);
                        }


                        if ((param3 == 1))
                        {

                            var dealingWithPlayerId;

                            if ((param4 == -1))
                            {
                                dealingWithPlayerId = currentPlayableCharacterId;
                            }
                            else
                            {
                                dealingWithPlayerId = param4;
                            }

                            if ((this['player' + dealingWithPlayerId].x > this['npc' + characterId].x))
                                {
                                    this.setNpcAnimation(13, characterId); //Talk Right
                                }
                                else
                                {
                                    this.setNpcAnimation(12, characterId); //Talk Left
                                }
                        }
                        
                        

                        /* If the npc is talking to the player then set the player focus animation START */
                        if ((param3 == 1))
                        {

                            /* New way of focusing, just determine where the characters are facing START */
                            var dealingWithPlayerId;

                            if ((param4 == -1))
                            {
                                dealingWithPlayerId = currentPlayableCharacterId;
                            }
                            else
                            {
                                dealingWithPlayerId = param4;
                            }

                            if ((this['player' + dealingWithPlayerId].x > this['npc' + characterId].x))
                            {
                                this.setPlayerAnimation(10, dealingWithPlayerId); //Focus Left
                            }
                            else
                            {
                                this.setPlayerAnimation(11, dealingWithPlayerId); //Focus Right
                            }
                            /* New way of focusing, just determine where the characters are facing END */



                            /*if ((param4 === -1)) {

                                var i;
                                for (i = 0; i < gameData.rooms.length; i++) {
                                    if ((gameData.rooms[i].id == currentRoom)) {
                                        var k;
                                        for (k = 0; k < gameData.rooms[i].npc.length; k++) {
                                            if ((gameData.rooms[i].npc[k].id == characterId)) {
    
                                                
                                                this.setPlayerAnimation(gameData.rooms[i].npc[k].playerFocusAnimId, currentPlayableCharacterId);
                                                

                                                
    
                                            }
                                        }
                                    }
                                }
                            }*/
                        }
                        /* If the npc is talking to the player then set the player focus animation END */


                    }
                    /* Set the fill color depending on the character END */

                    

                    /* Play audio file if durationMarker has been set and workout legnth of time to show text START */
                    if ((param2.languages[currentLang] != null) && (userSettings.speechMode < 2)) {

                        /* Loop through the array to find the relevant markers for this character START */
                        var startMarker;
                        var durationMarker;

                        /* Check for playable characters first START */
                        if ((speakingCharacterType == "playableCharacter"))
                        {

                            if ((characterId == -1))
                            {
                                var i;
                                for (i = 0; i < param2.languages[currentLang].length; i++) {
                                    if ((param2.languages[currentLang][i].characterId == currentPlayableCharacterId)) {
                                        startMarker = param2.languages[currentLang][i].start;
                                        durationMarker = param2.languages[currentLang][i].duration;
                                    }
                                }
                            }
                            else
                            {
                                var i;
                                for (i = 0; i < param2.languages[currentLang].length; i++) {
                                    if ((param2.languages[currentLang][i].characterId == characterId)) {
                                        startMarker = param2.languages[currentLang][i].start;
                                        durationMarker = param2.languages[currentLang][i].duration;
                                    }
                                }
                            }
                            
                        }
                        else
                        {
                            var i;
                            for (i = 0; i < param2.languages[currentLang].length; i++) {
                                if ((param2.languages[currentLang][i].characterId == characterId)) {
                                    startMarker = param2.languages[currentLang][i].start;
                                    durationMarker = param2.languages[currentLang][i].duration;
                                }
                            }
                        }
                        /* Check for playable characters first END */


                        var timeToShowText;

                        if ((startMarker == null) && (durationMarker == null)) {
                            timeToShowText = param1.languages[currentLang].text.split(' ').length / 2;
                        }
                        else
                        {
                            if ((type == "roomSpeech")) {
                                var i;
                                for (i = 0; i < localisation.languages.length; i++) {
                                    if ((localisation.languages[i].id == currentLang) && (localisation.languages[i].allowNarrationAudio == true)) {
                                        this.narration.addMarker("currentSpeech", startMarker, durationMarker, userSettings.volumes.voicesVolume);
                                        this.narration.play("currentSpeech");
                                    }
                                }
                                
                            }
                            if ((type == "globalSpeech")) {
                                var i;
                                for (i = 0; i < localisation.languages.length; i++) {
                                    if ((localisation.languages[i].id == currentLang) && (localisation.languages[i].allowNarrationAudio == true)) {
                                        this.globalNarration.addMarker("currentSpeech", startMarker, durationMarker, userSettings.volumes.voicesVolume);
                                        this.globalNarration.play("currentSpeech");
                                    }
                                }
                                
                            }

                            timeToShowText = durationMarker;
                        }
                        /* Loop through the array to find the relevant markers for this character END */




                        

                        /* We know the exact durationMarker of the text being spoken START */
                        /* Normal seconds */
                        
                        /* We know the exact durationMarker of the text being spoken END */
                    }
                    else {
                        /* We don't exactly know the length of the text being spoken so we do a quick calculation on how long it would take to say. Roughly 2 words per second START */
                        /* Normal seconds */
                        var timeToShowText = param1.languages[currentLang].text.split(' ').length / 2.5;
                        var speechTextSpeedConvertedToPercentage = userSettings.speechTextSpeed * 100;
                        timeToShowText = timeToShowText / speechTextSpeedConvertedToPercentage * 100;
                        console.log(timeToShowText);
                        /* We don't exactly know the length of the text being spoken so we do a quick calculation on how long it would take to say. Roughly 2 words per second START */
                    }
                    /* Play audio file if durationMarker has been set and workout legnth of time to show text START */


                    /* Now we know how long to show the text, we need to know how much of a time delay gap there is before we go to the next action START */
                    /* First we'll check if the override has been set */
                    
                    /* Else we'll get the global setting */
                    timeToShowText = timeToShowText + systemSettings.gameplaySettings.otherSettings.timeDelayBetweenActorsVoices;
                    /* Now we know how long to show the text, we need to know how much of a time delay gap there is before we go to the next action END */



                    /* Display the skip button only if it is NOT an interval event START */
                    if ((intervalEventId == null))
                    {
                        this.skipButton = this.game.add.graphics(0, 0);
                        this.skipButton.beginFill(0x000000, 1);

                        var i;
                        for (i = 0; i < gameData.rooms.length; i++)
                        {
                            if ((gameData.rooms[i].id == currentRoom))
                            {
                                this.skipButton.drawRect(0, 0, gameData.rooms[i].width, gameData.rooms[i].height);
                            }
                        }

                        this.skipButton.endFill();
                        this.skipButton.alpha = 0;

                        this.skipButton.fixedToCamera = true;
                        this.skipButton.inputEnabled = true;

                        /* Display the skip button START */
                        this.skipButton.events.onInputDown.add(function () { this.skipButtonAction(convoParams) }, this);
                        /* Display the skip button END */
                    }
                    


                    /* Set a timer START */
                    this['currentTimedSpeechEvent' + characterId] = this.game.time.events.add(Phaser.Timer.SECOND * timeToShowText, this.removeConvoSegmentAndRerun, this, convoParams);
                    /* Set a timer END */



                    break;



                default:

                    /* If none of the types are met then set the characters back to idle START */
                    console.log("Idle was here");
                    /* If none of the types are met then set the characters back to idle END */

            }


        },



        skipButtonAction: function (convoParams) {

            /* If the current speech is not an interval event START */
            if ((convoParams[0].intervalEventId == null))
            {

                /* Remove the skip button as the skip button only appears for non interval events START */
                if ((this.skipButton != null)) {
                    this.skipButton.destroy();
                }
                /* Remove the skip button as the skip button only appears for non interval events END */

            }
            /* If the current speech is not an interval event END */

            var i;
            for (i = 0; i < localisation.languages.length; i++) {
                if ((localisation.languages[i].id == currentLang) && (localisation.languages[i].allowNarrationAudio == true)) {
                    this.narration.stop();
                    this.globalNarration.stop();
                }
            }

            this.removeConvoSegmentAndRerun(convoParams);

        },



        cancelPlayerWalkingTweenAndSetToIdle: function (forPlayableCharacterId) {

                this.stopPlayableCharactersFootstepsSound(forPlayableCharacterId);
                this['player' + forPlayableCharacterId].playingWalkingSignal = false;
                this.game.tweens.remove(this['playerWalking' + forPlayableCharacterId]);

            /* If player is already walking, cancel that tween and then perform it again START */

            if ((this['player' + forPlayableCharacterId].animations.currentAnim.name == "player" + forPlayableCharacterId + this.acquirePlayableCharactersCurrentGroupAnimationId(forPlayableCharacterId) + 22) /* Walk Left */ || (this['player' + forPlayableCharacterId].animations.currentAnim.name == "player" + forPlayableCharacterId + this.acquirePlayableCharactersCurrentGroupAnimationId(forPlayableCharacterId) + 20) /* Walk Back */ || (this['player' + forPlayableCharacterId].animations.currentAnim.name == "player" + forPlayableCharacterId + this.acquirePlayableCharactersCurrentGroupAnimationId(forPlayableCharacterId) + 23) /* Walk Right */ || (this['player' + forPlayableCharacterId].animations.currentAnim.name == "player" + forPlayableCharacterId + this.acquirePlayableCharactersCurrentGroupAnimationId(forPlayableCharacterId) + 21)) /* Walk Front */ {
                

                /* Set the player to idle START */
                var currentWalkingAnim = this['player' + forPlayableCharacterId].animations.currentAnim.name;
                if ((currentWalkingAnim == "player" + forPlayableCharacterId + this.acquirePlayableCharactersCurrentGroupAnimationId(forPlayableCharacterId) + 22)) /* Walk Left */ {
                    this.setPlayerAnimation(14, forPlayableCharacterId); //Idle Left
                }
                if ((currentWalkingAnim == "player" + forPlayableCharacterId + this.acquirePlayableCharactersCurrentGroupAnimationId(forPlayableCharacterId) + 23)) /* Walk Right */ {
                    this.setPlayerAnimation(15, forPlayableCharacterId); //Idle Right
                }
                if ((currentWalkingAnim == "player" + forPlayableCharacterId + this.acquirePlayableCharactersCurrentGroupAnimationId(forPlayableCharacterId) + 21)) /* Walk Front */ {
                    this.setPlayerAnimation(13, forPlayableCharacterId); //Idle Front
                }
                if ((currentWalkingAnim == "player" + forPlayableCharacterId + this.acquirePlayableCharactersCurrentGroupAnimationId(forPlayableCharacterId) + 20)) /* Walk Back */ {
                    this.setPlayerAnimation(12, forPlayableCharacterId); //Idle Back
                }
                /* Set the player to idle END */

            }

            /* If player is already walking, cancel that tween and then perform it again END */




        },



        setPlayerToIdleAfterGive: function (forPlayableCharacterId) {

                if ((this['player' + forPlayableCharacterId].animations.currentAnim.name == "player" + forPlayableCharacterId + this.acquirePlayableCharactersCurrentGroupAnimationId(forPlayableCharacterId) + 6) /* Collect Stand Left */ || (this['player' + forPlayableCharacterId].animations.currentAnim.name == "player" + forPlayableCharacterId + this.acquirePlayableCharactersCurrentGroupAnimationId(forPlayableCharacterId) + 7) /* Collect Stand Right */) /* Walk Front */ {
                    
                    /* Set the player to idle START */
                    var currentGivingAnim = this['player' + forPlayableCharacterId].animations.currentAnim.name;
                    if ((currentGivingAnim == "player" + forPlayableCharacterId + this.acquirePlayableCharactersCurrentGroupAnimationId(forPlayableCharacterId) + 6)) /* Give Left */ {
                        this.setPlayerAnimation(14, forPlayableCharacterId); //Idle Left
                    }
                    if ((currentGivingAnim == "player" + forPlayableCharacterId + this.acquirePlayableCharactersCurrentGroupAnimationId(forPlayableCharacterId) + 7)) /* Give Right */ {
                        this.setPlayerAnimation(15, forPlayableCharacterId); //Idle Right
                    }
                    /* Set the player to idle END */

                }

        },



        inventoryItemDisplayClickedOn: function (itemBeingClicked) {

            /* Reset this each time as the user might click on multiple items in the inventory at one time START */
            this.useItemBridgingWord = "";
            /* Reset this each time as the user might click on multiple items in the inventory at one time END */


            /* If observing the item, then read out the description we have for it START */
            if ((this.setCurrentActionVerbComp == "lookAt")) {



                this.cancelPlayerWalkingTweenAndSetToIdle(currentPlayableCharacterId);

                /* Display the params in the header START */
                this.currentlySelectedItemRef = itemBeingClicked.id;
                this.currentlySelectedItemName = itemBeingClicked.name;
                /* Set action text to yellow and then reset it START */
                this.currentActionModeText.fill = "#ffff00";
                this.game.time.events.add(Phaser.Timer.SECOND * 2, this.resetActionModes, this);
                /* Set action text to yellow and then reset it END */
                /* Display the params in the header END */


                var i;
                for (i = 0; i < gameData.inventoryBox.length; i++) {
                    if ((gameData.inventoryBox[i].id == itemBeingClicked.id)) {
                        this.speechAndMovements(gameData.inventoryBox[i].lookAtProtocolItemInInventory);
                    }
                }

            }
            /* If observing the item, then read out the description we have for it END */


            /* If we intend to use it, then just set the params in the header START */
            if ((this.setCurrentActionVerbComp == "use")) {

                this.toggleInventoryBox("close");

                this.currentlySelectedItemRef = itemBeingClicked.id;
                this.currentlySelectedItemName = itemBeingClicked.name;


                /* First determine if this item can be used by itself and in the room the player is in START */
                var i;
                for (i = 0; i < gameData.inventoryBox.length; i++) {
                    if ((gameData.inventoryBox[i].id == itemBeingClicked.id)) {
                        /* Check if the item can be used by itself START */
                        if ((gameData.inventoryBox[i].useItemByItselfDetails != null)) {

                            this.cancelPlayerWalkingTweenAndSetToIdle(currentPlayableCharacterId);

                            this.currentActionModeText.fill = "#ffff00";
                            this.game.time.events.add(Phaser.Timer.SECOND * 1, this.resetActionModes, this);








                            console.log(currentPlayableCharacterId);

                            /* Check to see if the item is being used by the correct playable character START */
                            if (gameData.inventoryBox[i].useItemByItselfDetails.itemCanBeUsedByPlayableCharacterIds.indexOf(currentPlayableCharacterId) !== -1)
                            {
                                if ((gameData.inventoryBox[i].useItemByItselfDetails.itemCanBeUsedByItselfInRoomIds.indexOf(currentRoom) !== -1) || (gameData.inventoryBox[i].useItemByItselfDetails.itemCanBeUsedInAllRooms == true))
                                {
                                    this.speechAndMovements(gameData.inventoryBox[i].useItemByItselfDetails.protocolWhenItemUsedInCorrectRoomIdAndCorrectPlayableCharacterId);
                                }
                                else
                                {
                                    this.speechAndMovements(gameData.inventoryBox[i].useItemByItselfDetails.protocolWhenItemUsedInWrongRoomId);
                                }
                            }
                            else
                            {
                                this.speechAndMovements(gameData.inventoryBox[i].useItemByItselfDetails.protocolWhenItemUsedByWrongPlayableCharacterId);
                            }
                            /* Check to see if the item is being used by the correct playable character END */


                        }
                        /* Check if the item can be used by itself END */
                        else {
                            this.useItemBridgingWord = acquireSystemText("on");
                        }
                    }
                }
                /* First determine if this item can be used by itself and in the room the player is in END */


            }
            /* If we intend to use it, then just set the params in the header END */



            /* If we intend to use it, then just set the params in the header START */
            if ((this.setCurrentActionVerbComp == "give")) {

                this.toggleInventoryBox("close");

                this.currentlySelectedItemRef = itemBeingClicked.id;
                this.currentlySelectedItemName = itemBeingClicked.name;


                /* First determine if this item can be used by itself and in the room the player is in START */
                var i;
                for (i = 0; i < gameData.inventoryBox.length; i++) {
                    if ((gameData.inventoryBox[i].id == itemBeingClicked.id)) {
                        this.useItemBridgingWord = acquireSystemText("on");
                    }
                }
                /* First determine if this item can be used by itself and in the room the player is in END */


            }
            /* If we intend to use it, then just set the params in the header END */


        },




        checkOverlap: function(spriteA, spriteB){

            var boundsA = spriteA.getBounds();
            var boundsB = spriteB.getBounds();
            
            return Phaser.Rectangle.intersects(boundsA, boundsB);
            
        },




        checkForAnimationOverride: function (item, type){

            var result = {
                "found": false,
                "animToPlay": null
            };

            var i;
            for (i = 0; i < gameData.rooms.length; i++) {
                if ((gameData.rooms[i].id == currentRoom)) {

                    var k;
                    for (k = 0; k < gameData.rooms[i].animationOverrideAreas.length; k++) {


                        var coordsValues = gameData.rooms[i].animationOverrideAreas[k].area;
                        /* Convert the string over to a numbered array START */
                        var convertedCoordsValues = new Array();
                        convertedCoordsValues = JSON.parse("[" + coordsValues + "]");
                        /* Convert the string over to a numbered array END */

                        /* Now set the co-ordinates onto the page START */
                        var polygonArray = new Phaser.Polygon(convertedCoordsValues);
                        /* Now set the co-ordinates onto the page END */

                        

                        
                                if ((polygonArray.contains(item.x, item.y))) {
                                    
                                    if ((gameData.rooms[i].animationOverrideAreas[k][type] != null))
                                    {
                                        result.found = true;
                                        result.animToPlay = gameData.rooms[i].animationOverrideAreas[k][type];
                                    }
                                    
                                }
                                


                    }

                }
            }


            return result;

        },





        checkForAnimationOverrideFootsteps: function (item){

            

            var i;
            for (i = 0; i < gameData.rooms.length; i++) {
                if ((gameData.rooms[i].id == currentRoom)) {

                    var k;
                    for (k = 0; k < gameData.rooms[i].animationOverrideAreas.length; k++) {

                        if ((gameData.rooms[i].animationOverrideAreas[k].appliesToAllPlayableCharacters == true))
                        {

                            var coordsValues = gameData.rooms[i].animationOverrideAreas[k].area;
                            /* Convert the string over to a numbered array START */
                            var convertedCoordsValues = new Array();
                            convertedCoordsValues = JSON.parse("[" + coordsValues + "]");
                            /* Convert the string over to a numbered array END */
    
                            /* Now set the co-ordinates onto the page START */
                            var polygonArray = new Phaser.Polygon(convertedCoordsValues);
                            /* Now set the co-ordinates onto the page END */
                            
                                    if ((polygonArray.contains(item.x, item.y)))
                                    {
                                        if ((this.foleyFootstepsSounds.markers['playableCharacterAnimationOverrideFootstepsSound'+item.id] == null))
                                        {
                                            this.playAnimationOverridePlayableCharactersFootstepsSound(item.id);
                                        }
                                    }
                                    else
                                    {
                                        if ((this.foleyFootstepsSounds.isPlaying == false))
                                        {
                                            this.stopAnimationOverridePlayableCharactersFootstepsSound(item.id);
                                            this.foleyFootstepsSounds.markers['playableCharacterAnimationOverrideFootstepsSound'+item.id] = null;
                                            this.playDefaultPlayableCharactersFootstepsSound(item.id);
                                        }
                                        
                                    }
                                    
                                    
                        }

                        
                                


                    }

                }
            }

        },




        isPlayerInOverrideArea: function (item){

            var result = false;

            var i;
            for (i = 0; i < gameData.rooms.length; i++) {
                if ((gameData.rooms[i].id == currentRoom)) {

                    var k;
                    for (k = 0; k < gameData.rooms[i].animationOverrideAreas.length; k++) {


                        var coordsValues = gameData.rooms[i].animationOverrideAreas[k].area;
                        /* Convert the string over to a numbered array START */
                        var convertedCoordsValues = new Array();
                        convertedCoordsValues = JSON.parse("[" + coordsValues + "]");
                        /* Convert the string over to a numbered array END */

                        /* Now set the co-ordinates onto the page START */
                        var polygonArray = new Phaser.Polygon(convertedCoordsValues);
                        /* Now set the co-ordinates onto the page END */

                        

                        
                                if ((polygonArray.contains(item.x, item.y))) {
                                    
                                    
                                        result = true;
                                        
                                    
                                    
                                }
                                


                    }

                }
            }


            return result;

        },



        


        update: function () {

            this.game.world.bringToTop(this.avatarIconGroup);
            this.game.world.bringToTop(this.optionsBarGroup);
            this.game.world.bringToTop(this.currentActionModeText);



            /* Any speech text, follow their respective characters START */
            this.charactersAndZonesGroup.forEachAlive(function (item) {
                if ((item.type == "playerableCharacter") || (item.type == "npc")) {

                    /* If the playable character is standing too far to the left START */
                    if ((item.x < 190)) {
                        item.speechText.x = 190 + 20;
                    }
                    /* If the playable character is standing too far to the left END */
                    /* If the playable character is standing too far to the right START */
                    else if ((item.x > this.game.world.bounds.width - 190)) {
                        item.speechText.x = this.game.world.bounds.width - 190;
                    }
                    /* If the playable character is standing too far to the right END */
                    else {
                        item.speechText.x = item.x;
                    }


                    item.speechText.y = item.y - item.height - item.speechText.height + item.speechText.speechTextYOffset;
                }
            }, this);
            /* Any speech text, follow their respective characters END */



            if ((this.draggingInventoryGroup != null)) {
                this.game.world.bringToTop(this.draggingInventoryGroup);
            }



            /*
            this.currentlySelectedItemName = this.currentlySelectedItemName.charAt(0).toLowerCase() + this.currentlySelectedItemName.slice(1);
            this.setCurrentActionNoun = this.setCurrentActionNoun.charAt(0).toLowerCase() + this.setCurrentActionNoun.slice(1);
            */

            /* Display current actions at the top of the screen START */
            /* If you have an item currently selected then display the correct terminology in the header START */
            if ((this.currentlySelectedItemName != "")) {
                if ((this.setCurrentActionVerbComp == "lookAt") || (this.setCurrentActionVerbComp == "pickUp") || (this.setCurrentActionVerbComp == "talkTo") || (this.setCurrentActionVerbComp == "open") || (this.setCurrentActionVerbComp == "close") || (this.setCurrentActionVerbComp == "push") || (this.setCurrentActionVerbComp == "pull")) {
                    this.currentActionModeText.setText(this.setCurrentActionVerbFriendly + " " + this.currentlySelectedItemName + " " + this.setCurrentActionNoun);
                }

                if ((this.setCurrentActionVerbComp == "give")) {
                    this.currentActionModeText.setText(this.setCurrentActionVerbFriendly + " " + this.currentlySelectedItemName + " " + acquireSystemText("to") + " " + this.setCurrentActionNoun);
                }

                if ((this.setCurrentActionVerbComp == "use")) {
                    this.currentActionModeText.setText(this.setCurrentActionVerbFriendly + " " + this.currentlySelectedItemName + " " + this.useItemBridgingWord + " " + this.setCurrentActionNoun);
                }
            }
            /* If you have an item currently selected then display the correct terminology in the header END */
            /* Otherwise show the correct terminology when you have simply selected an area on the scene START */
            else {
                this.currentActionModeText.setText(this.setCurrentActionVerbFriendly + " " + this.setCurrentActionNoun);
            }
            /* Otherwise show the correct terminology when you have simply selected an area on the scene END */
            /* Display current actions at the top of the screen END */



            /* Switch the bar options availability depending on whether the inventory box is open or not START */
            if ((this.disableToolBarAndPlayerMovements == false)) {

                this.avatarIconGroup.forEachAlive(function (option) {
                    if ((option.avatarIconState === 0)) {
                        option.alpha = 1;
                        option.inputEnabled = true;
                    }
                    else {
                        option.alpha = 0.2;
                        option.inputEnabled = false;
                    }
                }, this);

                this.optionsBarGroup.forEachAlive(function (option) {
                    option.alpha = 1;
                    option.inputEnabled = true;
                }, this);

                this.charactersAndZonesGroup.forEachAlive(function (item) {
                    if ((item.type == "inventory"))
                    {
                        item.inputEnabled = true;
                    }
                    
                }, this);

                this.charactersAndZonesGroup.forEachAlive(function (zone) {
                    if ((zone.type == "targetZone")) {
                        zone.inputEnabled = true;
                    }
                }, this);

                this.charactersAndZonesGroup.forEachAlive(function (npc) {
                    if ((npc.type == "npc")) {
                        npc.inputEnabled = true;
                    }
                }, this);
            }
            /* Switch the bar options availability depending on whether the inventory box is open or not END */
            else {

                this.avatarIconGroup.forEachAlive(function (option) {
                    option.alpha = 0.2;
                    option.inputEnabled = false;
                }, this);

                this.optionsBarGroup.forEachAlive(function (option) {
                    option.alpha = 0.2;
                    option.inputEnabled = false;

                }, this);

                this.charactersAndZonesGroup.forEachAlive(function (item) {
                    if ((item.type == "inventory"))
                    {
                        item.inputEnabled = false;
                    }
                    
                }, this);

                this.charactersAndZonesGroup.forEachAlive(function (zone) {
                    if ((zone.type == "targetZone")) {
                        zone.inputEnabled = false;
                    }
                }, this);

                this.charactersAndZonesGroup.forEachAlive(function (npc) {
                    if ((npc.type == "npc")) {
                        npc.inputEnabled = false;
                    }
                }, this);


            }






            /* Allow a highlight when npcs questions appear START */
            this.questionsGroup.forEachAlive(function (question) {
                if (question.input.pointerOver()) {
                    question.fill = systemSettings.gameplaySettings.uiText.questionsText.textColorHoverOver;
                }
                else {
                    //question.fill = systemSettings.gameplaySettings.uiText.questionsText.textColor;

                    /* Gradient START */
                    var questionTextGradient = question.context.createLinearGradient(0, 0, 0, question.height);
                    questionTextGradient.addColorStop(0, systemSettings.gameplaySettings.uiText.questionsText.textColor);
                    questionTextGradient.addColorStop(1, systemSettings.gameplaySettings.uiText.questionsText.textColorAdditional);
                    question.fill = questionTextGradient;
                    /* Gradient END */
                }
            }, this);
            /* Allow a highlight when npcs questions appear END */










            /* Allow all characters to be scaled based on the scale areas START */
            
            this.charactersAndZonesGroup.forEachAlive(function (item) {

                if ((item.type == "playerableCharacter")) {



                    var i;
                    for (i = 0; i < gameData.rooms.length; i++) {
                        if ((gameData.rooms[i].id == currentRoom)) {

                            var k;
                            for (k = 0; k < gameData.rooms[i].scaleAreas.length; k++) {


                                var coordsValues = gameData.rooms[i].scaleAreas[k].area;
                                /* Convert the string over to a numbered array START */
                                var convertedCoordsValues = new Array();
                                convertedCoordsValues = JSON.parse("[" + coordsValues + "]");
                                /* Convert the string over to a numbered array END */

                                /* Now set the co-ordinates onto the page START */
                                var polygonArray = new Phaser.Polygon(convertedCoordsValues);
                                /* Now set the co-ordinates onto the page END */


                                   
                                        if ((polygonArray.contains(item.x, item.y))) {

                                            /* Adjust the duration of any walking tweens START */
                                            if ((this['playerWalking' + item.id] != null))
                                            {
                                                if ((this['playerWalking' + item.id].isRunning) && (this['playerWalking' + item.id].speedTimeAmended == false))
                                                {
                                                    this['playerWalking' + item.id].speedTimeAmended = true;

                                                    /* Calculate new duration speed START */
                                                    var dX = this['player' + item.id].x - this['playerWalking' + item.id].destinationX;
                                                    var dY = this['player' + item.id].y - this['playerWalking' + item.id].destinationY;
                                                    
                                                    var overallDistance = Math.sqrt(dX * dX + dY * dY);
                                                    var defaultPlayerSpeedTime = (overallDistance / this['player' + item.id].numberOfPixelsToTravelAtPerSecond) * 1000;
                                                    /* */
                                                    var speedFactor = gameData.rooms[i].scaleAreas[k].speedFactor * 100;
                                                    var newDuration = defaultPlayerSpeedTime;
                                                    

                                                    if ((speedFactor < 100))
                                                    {  
                                                        var a = 100 - speedFactor;
                                                        var b = a * defaultPlayerSpeedTime / 100;
                                                        newDuration = b + defaultPlayerSpeedTime;
                                                    }
                                                    /* Calculate new duration speed END */

                                                    
                                                    console.log(this['playerWalking' + item.id]);
                                                    console.log("xxx-"+newDuration);
                                                    
                                                    if ((this['playerWalking' + item.id].timeline[0].duration < newDuration))
                                                    {
                                                        this['playerWalking' + item.id].updateTweenData("duration", newDuration);
                                                    }
                                                    
                                                }
                                            }
                                            /* Adjust the duration of any walking tweens END */
                                            
                                            /* Get the lowest y axis value START */
                                            var lowestYAxis = 2000000000;

                                            var z;
                                            for (z = 0; z < polygonArray._points.length; z++) {
                                                if ((polygonArray._points[z].y < lowestYAxis))
                                                {
                                                    lowestYAxis = polygonArray._points[z].y;
                                                }
                                            }
                                            /* Get the lowest y axis value END */


                                            /* Get the highest y axis value START */
                                            var highestYAxis = 0;

                                            var z;
                                            for (z = 0; z < polygonArray._points.length; z++) {
                                                if ((polygonArray._points[z].y > highestYAxis))
                                                {
                                                    highestYAxis = polygonArray._points[z].y;
                                                }
                                            }
                                            /* Get the highest y axis value END */

                                            

                                            /* Calculate the percentage of where the character is standing within the polygon START */
                                            var standingPercentage = (item.y-lowestYAxis) / (highestYAxis-lowestYAxis) * 100;
                                            /* Calculate the percentage of where the character is standing within the polygon END */

                                            /* Calculate the new scale START */
                                            var range = gameData.rooms[i].scaleAreas[k].bottomEdgeScaleAmount-gameData.rooms[i].scaleAreas[k].topEdgeScaleAmount;
                                            var calculatedScale = range * (standingPercentage/100) + gameData.rooms[i].scaleAreas[k].topEdgeScaleAmount;
                                            /* Calculate the new scale END */

                                            


                                            item.scale.setTo(calculatedScale, calculatedScale);
                                            break;
                                        }
                                        else {
                                            //item.scale.setTo(1, 1);
                                            item.scale.setTo(1, 1);
                                            if ((this['playerWalking' + item.id] != null))
                                            {
                                                this['playerWalking' + item.id].speedTimeAmended = false;
                                            }
                                        }
                                    
                                    



                            }

                        }
                    }

                }

            }, this);
            /* Allow all characters to be scaled based on the scale areas END */








            /* When walking, play suitable walking animation START */
            this.charactersAndZonesGroup.forEachAlive(function (item) {
                if ((item.type === "playerableCharacter")) {

                    if ((this['player' + item.id].playingWalkingSignal == true)) {

                        

                        //this.checkForAnimationOverrideFootsteps(item);
                        
                        
                        

                        var numberOfPixelsToCount = 2; /* Only change this number */
                        var jsNumberAmount = numberOfPixelsToCount - 1;

                        /* Record all our x and y positions START */
                        this['player' + item.id].playerXPositions.unshift(this['player' + item.id].x);
                        this['player' + item.id].playerYPositions.unshift(this['player' + item.id].y);
                        /* Record all our x and y positions START */

                        /* Trim the array down when it goes over 3 items START */
                        if ((this['player' + item.id].playerXPositions[numberOfPixelsToCount] != null) && (this['player' + item.id].playerYPositions[numberOfPixelsToCount] != null)) {
                            this['player' + item.id].playerXPositions.splice(numberOfPixelsToCount, 1);
                            this['player' + item.id].playerYPositions.splice(numberOfPixelsToCount, 1);
                        }
                        /* Trim the array down when it goes over 3 items END */

                        var currentWalkingAnim = this['player' + item.id].animations.currentAnim.name;

                            // Walking right
                            if ((this['player' + item.id].playerXPositions[0] > this['player' + item.id].playerXPositions[jsNumberAmount]) && (this['player' + item.id].playerYPositions[0] == this['player' + item.id].playerYPositions[jsNumberAmount])) {
                                if ((this.checkForAnimationOverride(item,'walkRightAnimId').found == true))
                                    {
                                        if ((currentWalkingAnim != "player" + item.id + this.acquirePlayableCharactersCurrentGroupAnimationId(item.id) + this.checkForAnimationOverride(item,'walkRightAnimId').animToPlay))
                                        {
                                            this.setPlayerAnimation(this.checkForAnimationOverride(item,'walkRightAnimId').animToPlay, item.id);
                                            return false;
                                        }
                                    }
                                    // Otherwise play the default one
                                    else
                                    {
                                        if ((currentWalkingAnim != "player" + item.id + this.acquirePlayableCharactersCurrentGroupAnimationId(item.id) + 23)) /* Walk Right */ {
                                            this.setPlayerAnimation(23, item.id); //Walk Right
                                            return false;
                                        }
                                    }
                            }
    
                            // Walking left
                            else if ((this['player' + item.id].playerXPositions[0] < this['player' + item.id].playerXPositions[jsNumberAmount]) && (this['player' + item.id].playerYPositions[0] == this['player' + item.id].playerYPositions[jsNumberAmount])) {
                                if ((this.checkForAnimationOverride(item,'walkLeftAnimId').found == true))
                                    {
                                        if ((currentWalkingAnim != "player" + item.id + this.acquirePlayableCharactersCurrentGroupAnimationId(item.id) + this.checkForAnimationOverride(item,'walkLeftAnimId').animToPlay))
                                        {
                                            this.setPlayerAnimation(this.checkForAnimationOverride(item,'walkLeftAnimId').animToPlay, item.id);
                                            return false;
                                        }
                                    }
                                    // Otherwise play the default one
                                    else
                                    {
                                        if ((currentWalkingAnim != "player" + item.id + this.acquirePlayableCharactersCurrentGroupAnimationId(item.id) + 22)) /* Walk Left */ {
                                            this.setPlayerAnimation(22, item.id); //Walk Left
                                            return false;
                                        }
                                    }
                            }

                            // Walking down
                            else if ((this['player' + item.id].playerXPositions[0] == this['player' + item.id].playerXPositions[jsNumberAmount]) && (this['player' + item.id].playerYPositions[0] > this['player' + item.id].playerYPositions[jsNumberAmount])) {

                                // If in an animation override area where the walk down anim has been set, then play that anim
                                if ((this.checkForAnimationOverride(item,'walkDownAnimId').found == true))
                                {
                                    if ((currentWalkingAnim != "player" + item.id + this.acquirePlayableCharactersCurrentGroupAnimationId(item.id) + this.checkForAnimationOverride(item,'walkDownAnimId').animToPlay))
                                    {
                                        this.setPlayerAnimation(this.checkForAnimationOverride(item,'walkDownAnimId').animToPlay, item.id);
                                        return false;
                                    }
                                }
                                // Otherwise play the default one
                                else
                                {
                                    if ((currentWalkingAnim != "player" + item.id + this.acquirePlayableCharactersCurrentGroupAnimationId(item.id) + 21)) /* Walk Front */ {
                                        this.setPlayerAnimation(21, item.id); //Walk Front
                                        return false;
                                    }
                                }
                            }
    

                            // Walking up
                            else if ((this['player' + item.id].playerXPositions[0] == this['player' + item.id].playerXPositions[jsNumberAmount]) && (this['player' + item.id].playerYPositions[0] < this['player' + item.id].playerYPositions[jsNumberAmount])) {
                                
                                // If in an animation override area where the walk down anim has been set, then play that anim
                                if ((this.checkForAnimationOverride(item,'walkUpAnimId').found == true))
                                {
                                    if ((currentWalkingAnim != "player" + item.id + this.acquirePlayableCharactersCurrentGroupAnimationId(item.id) + this.checkForAnimationOverride(item,'walkUpAnimId').animToPlay))
                                    {
                                        this.setPlayerAnimation(this.checkForAnimationOverride(item,'walkUpAnimId').animToPlay, item.id);
                                        return false;
                                    }
                                }
                                // Otherwise play the default one
                                else
                                {
                                    if ((currentWalkingAnim != "player" + item.id + this.acquirePlayableCharactersCurrentGroupAnimationId(item.id) + 20)) /* Walk Back */ {
                                        this.setPlayerAnimation(20, item.id); //Walk Back
                                        return false;
                                    }
                                }
                            }
    
    
                            
                            else
                            {
                                
                                if ((this['player' + item.id].playerXPositions[0] > this['player' + item.id].playerXPositions[jsNumberAmount])) {
                                    if ((this.isPlayerInOverrideArea(item) == false))
                                    {
                                        if ((currentWalkingAnim != "player" + item.id + this.acquirePlayableCharactersCurrentGroupAnimationId(item.id) + 23)) /* Walk Right */ {
                                            this.setPlayerAnimation(23, item.id); //Walk Right
                                            return false;
                                        }
                                    }
                                    
                                }

                                if ((this['player' + item.id].playerXPositions[0] < this['player' + item.id].playerXPositions[jsNumberAmount])) {
                                    if ((this.isPlayerInOverrideArea(item) == false))
                                    {
                                        if ((currentWalkingAnim != "player" + item.id + this.acquirePlayableCharactersCurrentGroupAnimationId(item.id) + 22)) /* Walk Left */ {
                                            this.setPlayerAnimation(22, item.id); //Walk Left
                                            return false;
                                        }
                                    }
                                }
                                
                            }
                            
                        



                        


                        



                    }

                    /* When walking, play suitable walking animation END */
                }
            }, this);








            /* Route walking for NPCS START */
            this.charactersAndZonesGroup.forEachAlive(function (item) {
                if ((item.type === "npc")) {

                    if ((this['npc' + item.id].playingWalkingSignal == true)) {

                        console.log(item.id);

                        var numberOfPixelsToCount = 2; /* Only change this number */
                        var jsNumberAmount = numberOfPixelsToCount - 1;

                        /* Record all our x and y positions START */
                        this['npc' + item.id].npcXPositions.unshift(this['npc' + item.id].x);
                        this['npc' + item.id].npcYPositions.unshift(this['npc' + item.id].y);
                        /* Record all our x and y positions START */

                        /* Trim the array down when it goes over 3 items START */
                        if ((this['npc' + item.id].npcXPositions[numberOfPixelsToCount] != null) && (this['npc' + item.id].npcYPositions[numberOfPixelsToCount] != null)) {
                            this['npc' + item.id].npcXPositions.splice(numberOfPixelsToCount, 1);
                            this['npc' + item.id].npcYPositions.splice(numberOfPixelsToCount, 1);
                        }
                        /* Trim the array down when it goes over 3 items END */

                        var currentWalkingAnim = this['npc' + item.id].animations.currentAnim.name;

                            // Walking right
                            if ((this['npc' + item.id].npcXPositions[0] > this['npc' + item.id].npcXPositions[jsNumberAmount]) && (this['npc' + item.id].npcYPositions[0] == this['npc' + item.id].npcYPositions[jsNumberAmount])) {
                                
                                    
                                        if ((currentWalkingAnim != "npc" + item.id + 17)) /* Walk Right */ {
                                            this.setNpcAnimation(17, item.id); //Walk Right
                                            return false;
                                        }
                                    
                            }
    
                            // Walking left
                            else if ((this['npc' + item.id].npcXPositions[0] < this['npc' + item.id].npcXPositions[jsNumberAmount]) && (this['npc' + item.id].npcYPositions[0] == this['npc' + item.id].npcYPositions[jsNumberAmount])) {
                                
                                    
                                        if ((currentWalkingAnim != "npc" + item.id + 16)) /* Walk Left */ {
                                            this.setNpcAnimation(16, item.id); //Walk Left
                                            return false;
                                        }
                                    
                            }

                            // Walking down
                            else if ((this['npc' + item.id].npcXPositions[0] == this['npc' + item.id].npcXPositions[jsNumberAmount]) && (this['npc' + item.id].npcYPositions[0] > this['npc' + item.id].npcYPositions[jsNumberAmount])) {

                                
                                
                                    if ((currentWalkingAnim != "npc" + item.id + 15)) /* Walk Front */ {
                                        this.setNpcAnimation(15, item.id); //Walk Front
                                        return false;
                                    }
                                
                            }
    

                            // Walking up
                            else if ((this['npc' + item.id].npcXPositions[0] == this['npc' + item.id].npcXPositions[jsNumberAmount]) && (this['npc' + item.id].npcYPositions[0] < this['npc' + item.id].npcYPositions[jsNumberAmount])) {
                                
                                
                                
                                    if ((currentWalkingAnim != "npc" + item.id + 14)) /* Walk Back */ {
                                        this.setNpcAnimation(14, item.id); //Walk Back
                                        return false;
                                    }
                                
                            }
    
    
                            
                            else
                            {
                                
                                if ((this['npc' + item.id].npcXPositions[0] > this['npc' + item.id].npcXPositions[jsNumberAmount])) {
                                    
                                        if ((currentWalkingAnim != "npc" + item.id + 17)) /* Walk Right */ {
                                            this.setNpcAnimation(17, item.id); //Walk Right
                                            return false;
                                        }
                                    
                                    
                                }

                                if ((this['npc' + item.id].npcXPositions[0] < this['npc' + item.id].npcXPositions[jsNumberAmount])) {
                                    
                                        if ((currentWalkingAnim != "npc" + item.id + 16)) /* Walk Left */ {
                                            this.setNpcAnimation(16, item.id); //Walk Left
                                            return false;
                                        }
                                    
                                }
                                
                            }


                    }

                    /* When walking, play suitable walking animation END */
                }
            }, this);
            /* Route walking for NPCS START */






            /* Check if walk boxes contain the player START */
            var i;
            for (i = 0; i < gameData.rooms.length; i++) {
                if ((gameData.rooms[i].id == currentRoom)) {

                    var k;
                    for (k = 0; k < gameData.rooms[i].walkBoxes.length; k++) {

                        var coordsValues = gameData.rooms[i].walkBoxes[k].area;
                        /* Convert the string over to a numbered array START */
                        var convertedCoordsValues = new Array();
                        convertedCoordsValues = JSON.parse("[" + coordsValues + "]");
                        /* Convert the string over to a numbered array END */

                        /* Now set the co-ordinates onto the page START */
                        var polygonArray = new Phaser.Polygon(convertedCoordsValues);
                        /* Now set the co-ordinates onto the page END */


                        if ((this['player' + currentPlayableCharacterId] != null)) {
                            if ((polygonArray.contains(this['player' + currentPlayableCharacterId].x, this['player' + currentPlayableCharacterId].y))) {
                                /* Just allow the protocol to fire once START */
                                if ((gameData.rooms[i].walkBoxes[k].walkInProtocolAvailable == true) && (gameData.rooms[i].walkBoxes[k].walkBoxValid == true)) {

                                    if ((gameData.rooms[i].walkBoxes[k].appliesToAllPlayableCharacters == true) || (gameData.rooms[i].walkBoxes[k].appliesToPlayableCharacterIds.indexOf(currentPlayableCharacterId) >= 0))
                                    {

                                        this.game.time.events.add(Phaser.Timer.SECOND * 1, this.resetActionModes, this);

                                        gameData.rooms[i].walkBoxes[k].walkInProtocolAvailable = false;
                                        this.speechAndMovements(gameData.rooms[i].walkBoxes[k].walkInProtocol);

                                        return false;

                                    }
                                }
                                /* Just allow the protocol to fire once END */
                            }
                            else {
                                if ((gameData.rooms[i].walkBoxes[k].walkInProtocolAvailable == false) && (gameData.rooms[i].walkBoxes[k].walkBoxValid == true)) {
                                    gameData.rooms[i].walkBoxes[k].walkInProtocolAvailable = true;
                                    gameData.rooms[i].walkBoxes[k].alreadyOnProtocolAvailable = true;
                                    return false;
                                }
                            }
                        }








                    }

                }
            }
            /* Check if walk boxes contain the player END */



            /* Only allow items to be dragged if no action mode has been set START */
            if ((this.inventoryDisplayGroup != null)) {
                this.inventoryDisplayGroup.forEachAlive(function (item) {
                    if ((this.setCurrentActionVerbComp == "") && (this.disableToolBarAndPlayerMovements == false)) {
                        item.input.draggable = true;
                    }
                    else {
                        item.input.draggable = false;
                    }

                }, this);
            }
            /* Only allow items to be dragged if no action mode has been set END */


            this.charactersAndZonesGroup.sort('y', Phaser.Group.SORT_ASCENDING);




            /* Allow a highlight when npcs questions appear START */
            if ((window.innerWidth > 1200) && (this.disableToolBarAndPlayerMovements == false))
            {
                this.hoverText.x = this.game.input.x + this.game.camera.x;
                this.hoverText.y = this.game.input.y + this.game.camera.y - 40;


                var pointerElementFound = false;

                this.charactersAndZonesGroup.forEachAlive(function (element) {
                    if (element.input.pointerOver()) {
                        pointerElementFound = true;
                    }
                }, this);

                if ((pointerElementFound == true)) {
                    this.charactersAndZonesGroup.forEachAlive(function (element) {
                        if (element.input.pointerOver()) {
                            if ((element.type == "npc") && (element.ignore == false)) {
                                this.hoverText.setText(element.name);
                            }
                            if ((element.type == "playerableCharacter") && (element.id != currentPlayableCharacterId) && (element.ignore == false)) {
                                this.hoverText.setText(element.name);
                            }
                            if ((element.type == "targetZone") && (element.ignore == false)) {
                                this.hoverText.setText(element.name);
                            }
                            if ((element.type == "inventory") && (element.ignore == false)) {
                                this.hoverText.setText(element.name);
                            }

                            /* Gradient START */
                            var hoverTextGradient = this.hoverText.context.createLinearGradient(0, 0, 0, this.hoverText.height);
                            hoverTextGradient.addColorStop(0, systemSettings.gameplaySettings.uiText.hoverText.textColor);
                            hoverTextGradient.addColorStop(1, systemSettings.gameplaySettings.uiText.hoverText.textColorAdditional);
                            this.hoverText.fill = hoverTextGradient;
                            /* Gradient END */

                        }
                    }, this);
                }
                else {
                    this.hoverText.setText(" ");
                }
            }
            else {
                this.hoverText.setText(" ");
            }
            /* Allow a highlight when npcs questions appear END */



            /* Pallarax foreground START */
            this.foregroundGroup.forEachAlive(function (element) {
                if ((element.foregroundParallaxSpeed != 0))
                {
                    
                        var distance = element.originalXPosition - this.game.camera.x;
                        var factor = element.foregroundParallaxSpeed * 100;
                        var calculation = distance * factor / 100;
                        element.x = calculation + element.originalXPosition;
                    
                }
            }, this);
            /* Pallarax foreground END */


            if ((this.disableToolBarAndPlayerMovements == false))
            {
                if ((this['player' + currentPlayableCharacterId] != null))
                {
                    this.foregroundGroup.forEachAlive(function (element) {
                       
                            if (this.checkOverlap(element, this['player' + currentPlayableCharacterId]))
                            {
                                element.alpha = element.alphaOnPlayerOverlap;
                            }
                            else
                            {
                                element.alpha = 1;
                            }
                        
                    }, this);
                }
            }
            
                
            
            

            



        }
    };

})(BasicGame);