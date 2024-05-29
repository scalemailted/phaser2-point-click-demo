/* Andy Howard Games 2017 */

(function(BasicGame) {
    'use strict';

    BasicGame.Credits = function () {

        
    };

    

    BasicGame.Credits.prototype = {
		
		
		
		
        create: function () {
			
			
						
                        this.currentLang = userSettings.currentLanguage;
			

						

						/* Put background on START */
						this.creditsBackground = this.game.add.sprite(0, 0, 'creditsBackground');
						this.creditsBackground.inputEnabled = true;
						this.creditsBackground.events.onInputDown.add(this.goBackToSelectScreen, this);
						/* Put background on END */
						
						/* Andy Howard Logo START */
						this.companyLogo = this.game.add.sprite(0, systemSettings.credits.companyLogoYPosition, 'companyLogo');
						this.companyLogo.anchor.x = Math.round(this.companyLogo.width * 0.5) / this.companyLogo.width;
						this.companyLogo.x = this.game.width/2;
						this.companyLogo.alpha = 0;
						
						var logoTween = this.game.add.tween(this.companyLogo).to({alpha: 1}, 1000, Phaser.Easing.none).start();
						/* Andy Howard Logo END */
						

						/* Set the style for the credits titles START */
						this.title = this.game.add.text(16, systemSettings.credits.creditsStyling.yPosition, '.', { font: ""+systemSettings.credits.creditsStyling.languages[currentLang].fontSize+"px "+acquireFontName(systemSettings.credits.creditsStyling.languages[currentLang].fontId)+"", fill: systemSettings.credits.creditsStyling.textColor });
						this.title.wordWrap = true;
						this.title.align = 'center';
                        this.title.wordWrapWidth = systemSettings.credits.creditsStyling.width;
						this.title.lineSpacing = systemSettings.credits.creditsStyling.languages[currentLang].lineSpacing;
						this.title.anchor.x = Math.round(this.title.width * 0.5) / this.title.width;
						this.title.x = this.game.width/2;
						this.title.alpha = 0;

						if ((systemSettings.credits.creditsStyling.stroke.show == true))
						{
							this.title.stroke = systemSettings.credits.creditsStyling.stroke.color;
							this.title.strokeThickness = systemSettings.credits.creditsStyling.stroke.thickness;
						}

						if ((systemSettings.credits.creditsStyling.shadow.show == true))
						{
							this.title.setShadow(systemSettings.credits.creditsStyling.shadow.x, systemSettings.credits.creditsStyling.shadow.y, systemSettings.credits.creditsStyling.shadow.color, systemSettings.credits.creditsStyling.shadow.blur);
						}
						/* Set the style for the credits titles END */
						
						/* Set the starting position on the credits START */
						this.startingCreditPosition = 0;
						/* Set the starting position on the credits END */
						
						
						this.loopThroughCredits();
						
						
						
						
						renderTextBlocks(systemSettings.credits.textBlocks);
						



						

            
        },
		
		
		

		
		

		
		
		
		
		
		loopThroughCredits: function() {
			
			if ((credits[this.startingCreditPosition]))
			{
                this.title.setText(credits[this.startingCreditPosition].languages[this.currentLang].role + "\n" +credits[this.startingCreditPosition].name);
				this.fadeInCredit();
			}
			else
			{
				this.goBackToSelectScreen();
			}
				

			
			
		},
		
		
		fadeInCredit: function() {
			
			var fadeInCreditTween = this.game.add.tween(this.title).to({alpha: 1}, 1000, Phaser.Easing.none).start();
				
					fadeInCreditTween.onComplete.add(function() {
						this.game.time.events.add(Phaser.Timer.SECOND * 2, this.fadeOutCredit, this);
					}, this);
			
		},
		
		
		fadeOutCredit: function() {
			
			var fadeOutCreditTween = this.game.add.tween(this.title).to({alpha: 0}, 1000, Phaser.Easing.none).start();
					
					fadeOutCreditTween.onComplete.add(function() {
						this.startingCreditPosition = this.startingCreditPosition + 1;
						this.loopThroughCredits();
					}, this);
			
		},
		
		
		
		goBackToSelectScreen: function() {
			
			
				
				
				
					
			game.state.start('TitleCard');

			
			
		},
		
		
		
		
		
		
        update: function() {
            
            
          
            
            
        }
     };

})(BasicGame);