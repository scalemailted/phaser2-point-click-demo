/* Andy Howard Games 2017 */

(function(BasicGame) {
    'use strict';

    BasicGame.Map = function () {

        
    };

    

    BasicGame.Map.prototype = {
		
		
		
		
        create: function () {
			
			
            this.regionGroup = this.game.add.group();
			

            console.log(currentPlayableCharacterId);
			
			
			
                        this.listenForClickEvents = true;
			
			
						

						/* Put background on START */
                        var i;
                        for (i = 0; i < gameData.maps.length; i++)
                        {
                            if ((gameData.maps[i].id == currentMapId))
                            {
                                this.background = this.game.add.sprite(0, 0, "mapImage"+gameData.maps[i].id);
                            }
                        }
						/* Put background on END */


                        this.routeFindingAndBoundaries();

						
						
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
						



                        /* Set action mode text START */
                        var i;
                        for (i = 0; i < gameData.maps.length; i++) {
                            if ((gameData.maps[i].id == currentMapId)) {
                                this.currentActionModeText = this.game.add.text(16, gameData.maps[i].warningTextStyling.yPosition, " ", { font: ""+gameData.maps[i].warningTextStyling.languages[currentLang].fontSize+"px "+acquireFontName(gameData.maps[i].warningTextStyling.languages[currentLang].fontId)+"", fill: gameData.maps[i].warningTextStyling.textColor });
                                this.currentActionModeText.wordWrap = true;
                                this.currentActionModeText.align = 'center';
                                this.currentActionModeText.wordWrapWidth = gameData.maps[i].warningTextStyling.width;
                                this.currentActionModeText.lineSpacing = gameData.maps[i].warningTextStyling.languages[currentLang].lineSpacing;
                                
                                if ((gameData.maps[i].warningTextStyling.stroke.show == true))
                                {
                                    this.currentActionModeText.stroke = gameData.maps[i].warningTextStyling.stroke.color;
                                    this.currentActionModeText.strokeThickness = gameData.maps[i].warningTextStyling.stroke.thickness;
                                }

                                if ((gameData.maps[i].warningTextStyling.shadow.show == true))
                                {
                                    this.currentActionModeText.setShadow(gameData.maps[i].warningTextStyling.shadow.x, gameData.maps[i].warningTextStyling.shadow.y, gameData.maps[i].warningTextStyling.shadow.color, gameData.maps[i].warningTextStyling.shadow.blur);
                                }

                                this.currentActionModeText.anchor.x = Math.round(this.currentActionModeText.width * 0.5) / this.currentActionModeText.width;
                                this.currentActionModeText.x = this.game.width / 2;
                                this.currentActionModeText.fixedToCamera = true;
                            }
                        }
			            /* Set action mode text END */


						
                        if ((this.isCharacterInKnownLocation() == true))
                        {

                            

                            /* First draw all the group areas we can go to START */
                            var i;
                            for (i = 0; i < gameData.maps.length; i++) {
                                if ((gameData.maps[i].id == currentMapId)) {

                                    var k;
                                    for (k = 0; k < gameData.maps[i].roomGroups.length; k++) {

                                        var coordsValues = gameData.maps[i].roomGroups[k].boundaryClickPoints;
                                        var walkableAreaArrayCoords = new Array();
                                        walkableAreaArrayCoords = JSON.parse("[" + coordsValues + "]");

                                        var clickableGroup = new Phaser.Polygon(walkableAreaArrayCoords);

                                        var graphics = game.add.graphics(0, 0);
                                        graphics.beginFill(0xFF33ff);
                                        graphics.drawPolygon(clickableGroup);
                                        graphics.endFill();
                                        graphics.alpha= 0;
                                        graphics.inputEnabled = true;
                                        graphics.name = gameData.maps[i].roomGroups[k].languages[currentLang].name;
                                        graphics.playerInteractPositionX = gameData.maps[i].roomGroups[k].playerInteractPosition.x;
                                        graphics.playerInteractPositionY = gameData.maps[i].roomGroups[k].playerInteractPosition.y;
                                        graphics.introRoomId = gameData.maps[i].roomGroups[k].introRoomId;
                                        graphics.playerStandNextToTargetZone = gameData.maps[i].roomGroups[k].playerStandNextToTargetZone;
                                        graphics.available = gameData.maps[i].roomGroups[k].available;
                                        graphics.events.onInputDown.add(this.goToGroup, this);

                                        this.regionGroup.add(graphics);

                                    }

                                }
                            }
                            /* First draw all the group areas we can go to END */


                            /* Now draw the player START */
                            var i;
                            for (i = 0; i < gameData.playerSettings.playableCharacters.length; i++)
                            {
                                if ((gameData.playerSettings.playableCharacters[i].id == currentPlayableCharacterId))
                                {
                                    this.character = this.game.add.sprite(0, 0, "player" + gameData.playerSettings.playableCharacters[i].id + "MapAvatar");

                                    this.character.anchor.x = Math.round(this.character.width * 0.5) / this.character.width;
                                    this.character.anchor.y = Math.round(this.character.height * 0.5) / this.character.height;
                                }
                            }
                            /* Now draw the player END */

                            /* Reposition the player in relation to the group they are in START */
                            var i;
                            for (i = 0; i < gameData.rooms.length; i++)
                            {
                                if ((gameData.rooms[i].id == this.getCurrentRoomId()))
                                {
                                    var k;
                                    for (k = 0; k < gameData.rooms[i].mapReferences.length; k++) {
                                        if ((gameData.rooms[i].mapReferences[k].id == currentMapId)) {

                                            this.roomGroupPlayerIsIn = gameData.rooms[i].mapReferences[k].roomGroupId;

                                        }
                                    }
                                }
                            }





                            var i;
                            for (i = 0; i < gameData.maps.length; i++) {
                                if ((gameData.maps[i].id == currentMapId)) {

                                    var k;
                                    for (k = 0; k < gameData.maps[i].roomGroups.length; k++) {
                                        if ((gameData.maps[i].roomGroups[k].id == this.roomGroupPlayerIsIn)) {
                                            this.character.x = gameData.maps[i].roomGroups[k].playerInteractPosition.x;
                                            this.character.y = gameData.maps[i].roomGroups[k].playerInteractPosition.y;
                                        }
                                    }

                                }
                            }
                            /* Reposition the player in relation to the group they are in END */
                        }
                        else
                        {
                            this.currentActionModeText.setText(acquireSystemText("mapNotRelevant"));
                        }
						
						




                        /* Hover text START */
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
						/* Hover text END */

            
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
        
        
        getCurrentRoomId: function()
        {
            var result;

            var i;
            for (i = 0; i < gameData.playerSettings.playableCharacters.length; i++)
            {
                if ((gameData.playerSettings.playableCharacters[i].id == currentPlayableCharacterId))
                {
                    result = gameData.playerSettings.playableCharacters[i].currentRoomId;
                }
            }

            return result;
        },


        isCharacterInKnownLocation: function()
        {
            
            var found = false;

            /* Reposition the player in relation to the group they are in START */
            var i;
            for (i = 0; i < gameData.rooms.length; i++)
            {
                if ((gameData.rooms[i].id == this.getCurrentRoomId()))
                {

                    var k;
                    for (k = 0; k < gameData.rooms[i].mapReferences.length; k++)
                    {
                        if ((gameData.rooms[i].mapReferences[k].id == currentMapId) && (gameData.rooms[i].mapReferences[k].roomGroupId != null))
                        {
                            found = true;
                        }
                    }
                }
            }

            return found;
        },



        routeFindingAndBoundaries: function () {

           /* Draw walkable area START */
                    /* Get string from the JSON START */
                    var i;
                    for (i = 0; i < gameData.maps.length; i++) {
                        if ((gameData.maps[i].id == currentMapId)) {
                            var coordsValues = gameData.maps[i].walkingPoints;
                        }
                    }

                    
                    var mapWidth = systemSettings.resolution.width;
                    var mapHeight = systemSettings.resolution.height;
                    routeFinderGridIncrement = 3;

                    var widthIncrement = mapWidth / routeFinderGridIncrement;
                    widthIncrement = widthIncrement | 0;

                    var heightIncrement = mapHeight / routeFinderGridIncrement;
                    heightIncrement = heightIncrement | 0;
                    /* Get string from the JSON END */
                
            

                    var walkableAreas = [];
                    var i;
                    for (i = 0; i < coordsValues.length; i++) {
                        var walkableAreaArrayCoords = new Array();
                        walkableAreaArrayCoords = JSON.parse("[" + coordsValues[i] + "]");
                        walkableAreas.push(new Phaser.Polygon(walkableAreaArrayCoords));
                    }

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
                    for (x = 0; x < walkableAreas.length; x++) {
                        
                        if (walkableAreas[x].contains(startingX, startingY)) {
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


            console.log(this.theBigArrayContainer);


            /* Draw walkable area END */

        },



        resetTopText: function () {
            this.currentActionModeText.setText(" ");
        },


		
        goToGroup: function (group) {

            var goToX = group.playerInteractPositionX;
            var goToY = group.playerInteractPositionY;


            /* Don't do anything if we're not listening for click events START */
            if ((this.listenForClickEvents == false))
            {
                return false;
            }
            /* Don't do anything if we're not listening for click events END */


            /* Check if the area they want to get to is available START */
            if ((group.available === false))
            {
                this.currentActionModeText.setText(acquireSystemText("notAccessibleOnMap"));
                this.game.time.events.add(Phaser.Timer.SECOND * 3, this.resetTopText, this);
                return false;
            }
            /* Check if the area they want to get to is available END */

            /* Check that the character isn't already there START */
            if ((this.character.x == goToX) && (this.character.y == goToY))
            {
                return false;
            }
            /* Check that the character isn't already there END */



            this.listenForClickEvents = false;





            /* Round the full whole co-ordinate value down to a multiple of 50 and then divide it by 50 so that we can work it out later START */
            var calculateCurrentLocationGridPositionX = Math.round(this.character.x / routeFinderGridIncrement) * routeFinderGridIncrement;
            calculateCurrentLocationGridPositionX = calculateCurrentLocationGridPositionX / routeFinderGridIncrement;
            var calculateCurrentLocationGridPositionY = Math.round(this.character.y / routeFinderGridIncrement) * routeFinderGridIncrement;
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
                    var numberOfPixelsToTravelAtPerSecond = systemSettings.gameplaySettings.otherSettings.pixelsPerSecondForMap;
                    var playerSpeedTime = (overallDistance / numberOfPixelsToTravelAtPerSecond) * 1000;


                    /* Calculate how long it should take to have an evenly timed pace to the new area END */






                    /* Start the tween START */
                    this.playingWalkingSignal = true;
                    var playerWalking = game.add.tween(this.character);
                    playerWalking.onComplete.add(function () {

                        this.goToRoom(group);



                    }, this);



                    playerWalking.to({ x: xPoints, y: yPoints }, playerSpeedTime, Phaser.Easing.None);

                    playerWalking.start();


                    /* Now start the animation END */

                }
            });

            easystar.calculate();



			/* Now activate easystar and get the co-ordinates route END */





        },


        assignEscortFollowersToNextRoom: function (roomId, targetZoneId){

            

            var i;
            for (i = 0; i < gameData.escort.length; i++) {
                
                if ((gameData.escort[i].available == true)) {
                    var k;
                    for (k = 0; k < gameData.escort[i].followerCharacterIds.length; k++) {

                            var followerId = gameData.escort[i].followerCharacterIds[k];

                            if ((currentPlayableCharacterId == gameData.escort[i].leaderCharacterId))
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
		

        goToRoom: function (area) {

            /* Create blackIn and fade out for scene transition START */


                /* Remove narration START */
                var i;
                for (i = 0; i < gameData.rooms.length; i++) {
                    if ((gameData.rooms[i].id == currentRoom)) {

                        var currentLang = userSettings.currentLanguage;
                        var x;
                        for (x = 0; x < localisation.languages.length; x++) {
                            if ((localisation.languages[x].id == currentLang) && (localisation.languages[x].allowNarrationAudio == true)) {
                                //this.narration.stop();
                                //this.narration.destroy();
                                //this.game.sound.remove(this.narration);
                                this.narration = null;
                                this.game.cache.removeSound(gameData.rooms[i].narration.languages[currentLang].narrationId);
                                this.game.sound.removeByKey(gameData.rooms[i].narration.languages[currentLang].narrationId);
                            }
                        }

                        
                    }
                }
                /* Remove narration END */

                /* Stop foley sounds START */
                //this.foleySounds.stop();
                /* Stop foley sounds END */




                    /* Record what the previous room id was so that we can position the player correctly when we load up the next room START */
                    previousRoom = currentRoom;
                    /* Record what the previous room id was so that we can position the player correctly when we load up the next room END */

                    /* Set the new room id we are going to START */
                    currentRoom = area.introRoomId;
                    /* Set the new room id we are going to END */

                    /* Record the current room id the player is now in START */
                    gameData.playerSettings.currentRoomId = parseInt(currentRoom);

                    var i;
                    for (i = 0; i < gameData.playerSettings.playableCharacters.length; i++) {
                        if ((gameData.playerSettings.playableCharacters[i].id == currentPlayableCharacterId)) {
                            gameData.playerSettings.playableCharacters[i].currentRoomId = parseInt(currentRoom);
                            gameData.playerSettings.playableCharacters[i].position = getTargetZonePlayerInteractionCoords(currentRoom, area.playerStandNextToTargetZone);
                        }
                    }
                    /* Record the current room id the player is now in END */

                    this.assignEscortFollowersToNextRoom(currentRoom, area.playerStandNextToTargetZone);

                    this.state.start('RoomPreloader');
                    /* Go to room number END */
                

                return false;

          
					/* Create blackIn and fade out for scene transition END */

        },
		
		
		
		goBackToGame: function() {
                    
            playBackAndSkipLinksSound();

                    
					this.state.start('Room');
				
				

		},

		
		
		
		
		
		
        update: function() {
            

                /* Hover text START */
			    this.hoverText.x = this.game.input.x + this.game.camera.x;
                this.hoverText.y = this.game.input.y + this.game.camera.y - 40;


                var pointerElementFound = false;

                this.regionGroup.forEachAlive(function (element) {
                    if (element.input.pointerOver()) {
                        pointerElementFound = true;
                    }
                }, this);

                if ((pointerElementFound == true)) {
                    this.regionGroup.forEachAlive(function (element) {
                        if (element.input.pointerOver()) {
                           
                            this.hoverText.setText(element.name);

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
			    /* Hover text END */

			
          
            
            
        }
     };

})(BasicGame);