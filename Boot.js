/* Andy Howard Games 2017 */



var BasicGame = {

    
};


(function(BasicGame) {
    'use strict';

    BasicGame.Boot = function (game) {
    };

    BasicGame.Boot.prototype = {

        preload: function () {
      
            //  Here we load the assets required for our preloader (in this case a background and a loading bar)
            //this.load.image('preloaderBar', 'assets/images/preloadr_bar.png');
            this.load.image('preloadContainer', "" + systemSettings.loadingScreen.uiPreloadContainer + "");
            this.load.image('preloadFill', "" + systemSettings.loadingScreen.uiPreloadFill + "");
            this.load.image("loadingBackground", "" + systemSettings.loadingScreen.loadingBackground + "");
            

        },

        create: function () {
            
            /* Scaling START */
			this.scale.minWidth = 217;
			this.scale.minHeight = 122;
			this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
			this.scale.pageAlignHorizontally = true;
			this.scale.pageAlignVertically = true;
			
			this.scale.refresh();


            this.state.start('InitialPreloader');

        }




    };
})(BasicGame);