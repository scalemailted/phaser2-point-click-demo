/* Andy Howard Games 2017 */

(function(BasicGame) {
    'use strict';

    BasicGame.CutScene = function () {

        
    };

    

    BasicGame.CutScene.prototype = {
		
		
		
		
        create: function () {


            /* Set foley sounds START */
            this.foleySounds = this.game.add.audio("foleySoundsGameWide");
            this.foleySounds.allowMultiple = true;
            /* Set foley sounds END */


            /* Generic narration START */
            var i;
            for (i = 0; i < localisation.languages.length; i++) {
                if ((localisation.languages[i].id == currentLang) && (localisation.languages[i].allowNarrationAudio == true)) {
                    this.globalNarration = this.game.add.audio("globalSpeeches");
                    this.globalNarration.allowMultiple = false;
                }
            }
            /* Generic narration END */
			

            var i;
            for (i = 0; i < cutScenes.length; i++)
            {
                if ((cutScenes[i].id == cutSceneCallback))
                {
                    eval(cutScenes[i].code.create);
                }


                if ((cutScenes[i].canSkip === true))
                {
                    /* Skip button START */
                    this.skipButton = this.game.add.text(systemSettings.gameplaySettings.uiText.backAndSkipLinks.x, systemSettings.gameplaySettings.uiText.backAndSkipLinks.y, acquireSystemText("skip"), { font: ""+systemSettings.gameplaySettings.uiText.backAndSkipLinks.languages[currentLang].fontSize+"px "+acquireFontName(systemSettings.gameplaySettings.uiText.backAndSkipLinks.languages[currentLang].fontId)+"", fill: systemSettings.gameplaySettings.uiText.backAndSkipLinks.textColor });
                        
                    if ((systemSettings.gameplaySettings.uiText.backAndSkipLinks.stroke.show == true))
                    {
                        this.skipButton.stroke = systemSettings.gameplaySettings.uiText.backAndSkipLinks.stroke.color;
                        this.skipButton.strokeThickness = systemSettings.gameplaySettings.uiText.backAndSkipLinks.stroke.thickness;
                    }
                    
                    if ((systemSettings.gameplaySettings.uiText.backAndSkipLinks.shadow.show == true))
                    {
                        this.skipButton.setShadow(systemSettings.gameplaySettings.uiText.backAndSkipLinks.shadow.x, systemSettings.gameplaySettings.uiText.backAndSkipLinks.shadow.y, systemSettings.gameplaySettings.uiText.backAndSkipLinks.shadow.color, systemSettings.gameplaySettings.uiText.backAndSkipLinks.shadow.blur);
                    }

                    /* Colors START */
                    var backTextGradient = this.skipButton.context.createLinearGradient(0, 0, 0, this.skipButton.height);
                    backTextGradient.addColorStop(0, systemSettings.gameplaySettings.uiText.backAndSkipLinks.textColor);
                    backTextGradient.addColorStop(1, systemSettings.gameplaySettings.uiText.backAndSkipLinks.textColorAdditional);
                    this.skipButton.fill = backTextGradient;
                    /* Colors END */
                    this.skipButton.inputEnabled = true;
                    this.skipButton.events.onInputDown.add(function () { this.skipCutScene() }, this);
                    /* Skip button END */
                }

            }



                        


            
        },


		playFoleySound: function(id, loop, uniqueId){
            var i;
            for (i = 0; i < foleySounds.items.length; i++) {
                if ((foleySounds.items[i].id == id)) {
                    this.foleySounds.addMarker(uniqueId, foleySounds.items[i].start, foleySounds.items[i].duration, userSettings.volumes.sfxVolume, loop);
                    this.foleySounds.play(uniqueId);
                }
            }
        },

        stopFoleySound: function(uniqueId){
            this.foleySounds.stop(uniqueId);
            this.foleySounds.removeMarker(uniqueId);
        },



        showSpeechText: function(id){

            var i;
            for (i = 0; i < cutScenes.length; i++)
            {
                if ((cutScenes[i].id == cutSceneCallback))
                {
                    var k;
                    for (k = 0; k < cutScenes[i].speeches.length; k++)
                    {
                        if ((cutScenes[i].speeches[k].id == id))
                        {
                            this.populateSpeechTextBlocksUnit(cutScenes[i].speeches[k]);
                            this.playCharacterSpeech(cutScenes[i].speeches[k]);
                        }
                    }
                }
            }

        },


        showText: function(id){

            var i;
            for (i = 0; i < cutScenes.length; i++)
            {
                if ((cutScenes[i].id == cutSceneCallback))
                {
                    var k;
                    for (k = 0; k < cutScenes[i].textBlocks.length; k++)
                    {
                        if ((cutScenes[i].textBlocks[k].id == id))
                        {
                            this.populateTextBlocksUnit(cutScenes[i].textBlocks[k]);
                        }
                    }
                }
            }

        },


        hideText: function(id){
            this['text'+id].destroy();
        },



        playCharacterSpeech: function(obj){

            if ((obj.languages[currentLang].clip != null) && (userSettings.speechMode < 2)) {

                /* Loop through the array to find the relevant markers for this character START */
                var startMarker;
                var durationMarker;
                /* Check for playable characters first START */
                

                    if ((obj.characterId == -1))
                    {
                        var i;
                        for (i = 0; i < obj.languages[currentLang].clip.length; i++) {
                            if ((obj.languages[currentLang].clip[i].characterId == currentPlayableCharacterId)) {
                                startMarker = obj.languages[currentLang].clip[i].start;
                                durationMarker = obj.languages[currentLang].clip[i].duration;
                            }
                        }
                    }
                    else
                    {
                        var i;
                        for (i = 0; i < obj.languages[currentLang].clip.length; i++) {
                            if ((obj.languages[currentLang].clip[i].characterId == obj.characterId)) {
                                startMarker = obj.languages[currentLang].clip[i].start;
                                durationMarker = obj.languages[currentLang].clip[i].duration;
                            }
                        }
                    }


                var timeToShowText;

                if ((startMarker == null) && (durationMarker == null)) {
                    timeToShowText = obj.languages[currentLang].text.split(' ').length / 2;
                }
                else
                {
                    
                        var i;
                        for (i = 0; i < localisation.languages.length; i++) {
                            if ((localisation.languages[i].id == currentLang) && (localisation.languages[i].allowNarrationAudio == true)) {
                                this.globalNarration.addMarker("currentSpeech", startMarker, durationMarker, userSettings.volumes.voicesVolume);
                                this.globalNarration.play("currentSpeech");
                                //alert("ddddd");
                            }
                        }

                    timeToShowText = durationMarker;
                }
                
                
            }
            else {
                /* We don't exactly know the length of the text being spoken so we do a quick calculation on how long it would take to say. Roughly 2 words per second START */
                /* Normal seconds */
                var timeToShowText = obj.languages[currentLang].text.split(' ').length / 2.5;
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



            // Delete the speech text after play through
            this['currentTimedSpeechEvent' + obj.characterId] = this.game.time.events.add(Phaser.Timer.SECOND * timeToShowText, function () {
                this['text'+obj.id].destroy();

                eval(obj.codeToRunOnComplete);

            }, this);

        },


        determineTextColor: function(textBlock, obj){

            var actionTextGradient = textBlock.context.createLinearGradient(0, 0, 0, textBlock.height);

            // Custom, so use the text color
            if ((obj.characterId == -3))
            {
                actionTextGradient.addColorStop(0, obj.conversationFillColor);
                actionTextGradient.addColorStop(1, obj.conversationFillColorAdditional);
            }
            // If narrator
            else if ((obj.characterId == -2))
            {
                actionTextGradient.addColorStop(0, systemSettings.gameplaySettings.uiText.narratorText.textColor);
                actionTextGradient.addColorStop(1, systemSettings.gameplaySettings.uiText.narratorText.textColorAdditional);
            }
            else if ((obj.characterId == -1))
            {
                // Find the text color for the current playable character
                var i;
                for (i = 0; i < gameData.playerSettings.playableCharacters.length; i++)
                {
                    if ((gameData.playerSettings.playableCharacters[i].id == currentPlayableCharacterId))
                    {
                        actionTextGradient.addColorStop(0, gameData.playerSettings.playableCharacters[i].conversationFillColor);
                        actionTextGradient.addColorStop(1, gameData.playerSettings.playableCharacters[i].conversationFillColorAdditional);
                    }
                }
            }
            else
            {
                // It's a precise playable character
                var i;
                for (i = 0; i < gameData.playerSettings.playableCharacters.length; i++)
                {
                    if ((gameData.playerSettings.playableCharacters[i].id == obj.characterId))
                    {
                        actionTextGradient.addColorStop(0, gameData.playerSettings.playableCharacters[i].conversationFillColor);
                        actionTextGradient.addColorStop(1, gameData.playerSettings.playableCharacters[i].conversationFillColorAdditional);
                    }
                }

                // It might be an npc
                var i;
                for (i = 0; i < gameData.rooms.length; i++)
                {
                    var k;
                    for (k = 0; k < gameData.rooms[i].npc.length; k++)
                    {
                        if ((gameData.rooms[i].npc[k].id == obj.characterId))
                        {
                            actionTextGradient.addColorStop(0, gameData.rooms[i].npc[k].conversationFillColor);
                            actionTextGradient.addColorStop(1, gameData.rooms[i].npc[k].conversationFillColorAdditional);
                        }
                    }
                }
            }

            textBlock.fill = actionTextGradient;

        },


        populateSpeechTextBlocksUnit: function(obj){

            console.log(obj);
            console.log(currentLang);
        
            this['text'+obj.id] = this.game.add.text(obj.x, obj.y, obj.languages[currentLang].text, { font: ""+obj.languages[currentLang].fontSize+"px "+acquireFontName(obj.languages[currentLang].fontId)+"", fill: '#ffffff' });
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

            this.determineTextColor(this['text'+obj.id], obj);
        
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





        skipCutScene: function(){
            this.game.world.removeAll();
            this.game.sound.stopAll();
            playBackAndSkipLinksSound();
            this.processCloseDownCutScene();
        },

        endCutScene: function(){
            this.game.world.removeAll();
            this.game.sound.stopAll();
            this.processCloseDownCutScene();
        },


        processCloseDownCutScene: function(){

            previousScreenType = 3;

            /* Unload cut scene assets here START */
            var i;
            for (i = 0; i < cutScenes.length; i++)
            {
                if ((cutScenes[i].id == cutSceneCallback))
                {
                    var x;
                    for (x = 0; x < cutScenes[i].loadingImages.length; x++)
                    {
                        this.game.cache.removeImage("cutSceneImage"+cutScenes[i].loadingImages[x].id, true);
                    }

                    var x;
                    for (x = 0; x < cutScenes[i].loadingAnimations.length; x++)
                    {
                        this.game.cache.removeImage("cutSceneAnimation" + cutScenes[i].loadingAnimations[x].id, true);
                        this.game.cache.removeJSON("cutSceneAnimation" + cutScenes[i].loadingAnimations[x].id);
                    }

                    var x;
                    for (x = 0; x < cutScenes[i].loadingMusic.length; x++)
                    {
                        this.game.cache.removeSound("cutSceneMusic"+cutScenes[i].loadingMusic[x].id);
                        this.game.sound.removeByKey("cutSceneMusic"+cutScenes[i].loadingMusic[x].id);
                    }
                }
            }
            /* Unload cut scene assets here END */

            


                            var i;
                            for (i = 0; i < cutScenes.length; i++) {
                
                                if ((cutScenes[i].id == cutSceneCallback)) {
                                    
                
                                    /* If we need to run another cut scene then run it */
                                    if ((cutScenes[i].actionTypeOnCompletion == 0))
                                    {
                                        cutSceneCallback = cutScenes[i].cutSceneIdOnCompletion;
                                        game.state.start('CutScenePreloader');
                                    }
                                    /* If we need to go back to normal gameplay */
                                    if ((cutScenes[i].actionTypeOnCompletion == 1))
                                    {
                                        previousRoom = null;
                                        game.state.start('RoomPreloader');
                                    }
                                    if ((cutScenes[i].actionTypeOnCompletion == 2))
                                    {
                                        previousRoom = null;
                                        if ((systemSettings.endingScreen.enable == true))
                                        {
                                            game.state.start('EndScreenPreloader');
                                        }
                                        else
                                        {
                                            game.state.start('TitleCard');
                                        }
                                        
                                    }
                                    
                                }
                            }

        },
		
		
        update: function() {
            
            this.game.world.bringToTop(this.skipButton);

            var i;
            for (i = 0; i < cutScenes.length; i++)
            {
                if ((cutScenes[i].id == cutSceneCallback))
                {
                    eval(cutScenes[i].code.update);
                }
            }
            
            
        }
     };

})(BasicGame);