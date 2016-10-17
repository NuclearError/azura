var Azura = Azura || {};

Azura.Boot = {
  init: function() {
    //loading screen will have a white background
    this.game.stage.backgroundColor = '#fff';

    //physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    if (this.game.device.desktop) {
        //  desktop-specific settings
        this.scale.pageAlignHorizontally = true;
    } else {
        //  mobile-specific settings
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.setMinMax(480, 260, 768, 384);
        this.scale.forceLandscape = true;
        this.scale.pageAlignHorizontally = true;
    }
  },
  preload: function() {
    //assets required by the loading screen
    this.load.image('loadingBar', 'assets/images/loadbar.png');
    this.load.image('logo', 'assets/images/logo.png');
  },
  create: function() {
    this.state.start('Preload');
  }
};
