/* Andy Howard Games 2017 */





(function(BasicGame) {
	'use strict';
	
	
	
	
	BasicGame.RoomPreloader = function () {

		

		this.ready = false;
		
		
		

	};



	BasicGame.RoomPreloader.prototype = {

		preload: function () {
				
            if ((systemSettings.roomLoadingScene.roomLoadingScene != null))
            {
                this.background = this.game.add.sprite(0, 0, 'roomLoadingSceneBackground');
            }

            eval(systemSettings.roomLoadingScene.code.create);
            
            

            

            unloadRoomAssets(false);
			
		
		
			var i;
			for (i = 0; i < gameData.rooms.length; i++) {

					if ((gameData.rooms[i].id == currentRoom))
					{
						/* Load in narration audio START */
                        var currentLang = userSettings.currentLanguage;
                        var x;
                        for (x = 0; x < localisation.languages.length; x++) {
                            if ((localisation.languages[x].id == currentLang) && (localisation.languages[x].allowNarrationAudio == true)) {
                                if ((this.game.cache.checkSoundKey(gameData.rooms[i].narration.languages[currentLang].narrationId) == false) && (gameData.rooms[i].narration.languages[currentLang].narrationId != null)) {
                                    this.load.audio(gameData.rooms[i].narration.languages[currentLang].narrationId, ["" + gameData.rooms[i].narration.languages[currentLang].narrationId + ".mp3", "" + gameData.rooms[i].narration.languages[currentLang].narrationId + ".ogg"]);
                                }
                            }
                        }
						/* Load in narration audio END */
						
                        /* Load in music START */
                        this.musicRequired = false;

                        if ((gameData.rooms[i].music.musicId != null))
                        {
                            if ((this.game.cache.checkSoundKey("backgroundMusic"+gameData.rooms[i].music.musicId) == false))
                            {
                                this.musicRequired = true;
                                this.musicId = "backgroundMusic"+gameData.rooms[i].music.musicId;
                                this.load.audio(this.musicId, ["" + acquireMusicPath(gameData.rooms[i].music.musicId) + ".mp3", "" + acquireMusicPath(gameData.rooms[i].music.musicId)+".ogg"]);
                            }
                        }
						/* Load in music END */
						
						/* Load in background image START */
						if ((this.game.cache.checkImageKey("backgroundImage"+gameData.rooms[i].id) == false))
						{
                            this.load.image("backgroundImage"+gameData.rooms[i].id, ""+gameData.rooms[i].background.backgroundImagePath+"");
						}
						/* Load in background image END */
						
						/* Load in foreground image START */
                        var k;
                        for (k = 0; k < gameData.rooms[i].foreground.length; k++)
                        {
                            
                                if ((gameData.rooms[i].foreground[k].includeAnimation == false))
                                {
                                    if ((this.game.cache.checkImageKey("foregroundImage"+gameData.rooms[i].foreground[k].id) == false))
                                    {
                                        this.load.image("foregroundImage"+gameData.rooms[i].foreground[k].id, "" + gameData.rooms[i].foreground[k].foregroundImagePath + "");
                                    }
                                }

                                if ((gameData.rooms[i].foreground[k].includeAnimation == true))
                                {
                                    if ((this.game.cache.checkImageKey("foregroundAnimation" + gameData.rooms[i].foreground[k].id) == false)) {
                                        this.game.load.atlasJSONHash("foregroundAnimation" + gameData.rooms[i].foreground[k].id, gameData.rooms[i].foreground[k].animation.filePath + ".png", gameData.rooms[i].foreground[k].animation.filePath + ".json");
                                    }
                                }
                            
						}
						/* Load in foreground image END */
						
						
					}
			}
		/* Load assets declared in JSON END */
		
		
		
		/* Load target zones graphics from JSON START */
		var i;
		for (i = 0; i < gameData.rooms.length; i++)
		{
			if ((gameData.rooms[i].id == currentRoom))
			{
				var k;
                for (k = 0; k < gameData.rooms[i].targetZones.length; k++) {

                    if ((gameData.rooms[i].targetZones[k].type == 0))
                    {
                        var x;
                        for (x = 0; x < gameData.rooms[i].targetZones[k].graphicalOptions.animations.length; x++) {
                            if ((this.game.cache.checkImageKey("targetZone" + gameData.rooms[i].targetZones[k].id + gameData.rooms[i].targetZones[k].graphicalOptions.animations[x].id) == false) && (gameData.rooms[i].targetZones[k].graphicalOptions.animations[x].type > -1)) {
                                this.game.load.atlasJSONHash("targetZone" + gameData.rooms[i].targetZones[k].id + gameData.rooms[i].targetZones[k].graphicalOptions.animations[x].id, gameData.rooms[i].targetZones[k].graphicalOptions.animations[x].filePath + ".png", gameData.rooms[i].targetZones[k].graphicalOptions.animations[x].filePath + ".json");
                            }
                        }
                    }

                }
			}
		}
		/* Load target zones graphics from JSON END */
		
		

        /* Load NPC data and spritesheet START */
        var i;
        for (i = 0; i < gameData.rooms.length; i++) {
            if ((gameData.rooms[i].id == currentRoom)) {
                var k;
                for (k = 0; k < gameData.rooms[i].npc.length; k++) {

                    var x;
                    for (x = 0; x < gameData.rooms[i].npc[k].animations.length; x++) {
                        if ((this.game.cache.checkImageKey("npc" + gameData.rooms[i].npc[k].id + gameData.rooms[i].npc[k].animations[x].id) == false) && (gameData.rooms[i].npc[k].animations[x].type > -1)) {
                            this.game.load.atlasJSONHash("npc" + gameData.rooms[i].npc[k].id + gameData.rooms[i].npc[k].animations[x].id, gameData.rooms[i].npc[k].animations[x].filePath + ".png", gameData.rooms[i].npc[k].animations[x].filePath + ".json");
                        }
                    }

                }
            }
        }
		/* Load NPC data and spritesheet END */
		
		
		
		

		/* Infrastructure END */
		


		/* Game images END */


		},

		create: function () {
			
            //this.preloadFill.cropEnabled = false;
			
			

        },




        showText: function(id){

            
                
                    var k;
                    for (k = 0; k < systemSettings.roomLoadingScene.textBlocks.length; k++)
                    {
                        if ((systemSettings.roomLoadingScene.textBlocks[k].id == id))
                        {
                            this.populateTextBlocksUnit(systemSettings.roomLoadingScene.textBlocks[k]);
                        }
                    }
                
            

        },


        hideText: function(id){
            this['text'+id].destroy();
        },



        populateTextBlocksUnit: function(obj){

            console.log(obj);
            console.log(currentLang);
        
            this['text'+obj.id] = this.game.add.text(obj.x, obj.y, acquireSystemTextById(obj.systemTextId), { font: ""+obj.languages[currentLang].fontSize+"px "+acquireFontName(obj.languages[currentLang].fontId)+"", fill: ""+obj.textColor+"" });
            this['text'+obj.id].id = obj.id;
        
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
        
        },


        

		update: function () {

            
            
            if ((this.ready == false))
            {
                if ((this.musicRequired == true))
                {
                    if (this.cache.isSoundDecoded(this.musicId))
                    {
                        
                        this.ready = true;
                        this.state.start('Room');
        
                        /* Set back to false so we can use it again START */
                        this.ready = false;
                        /* Set back to false so we can use it again END */
                        
                    }
                }
                else
                {

                    this.ready = true;
                    this.state.start('Room');
    
                    /* Set back to false so we can use it again START */
                    this.ready = false;
                    /* Set back to false so we can use it again END */
                    
                }
            }


			
			

		}

	};
})(BasicGame);