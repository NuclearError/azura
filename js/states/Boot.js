var Azura = Azura || {};

Azura.Boot = {
  init: function() {
    //loading screen will have a white background
    this.game.stage.backgroundColor = '#fff';  
    
    //scaling options
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    
    //have the game centered on the page
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    //physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);    
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