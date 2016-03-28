var Azura = Azura || {};

//loading the game assets
Azura.Preload = {
  preload: function() {
    //show loading screen
    this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY - 100, 'logo');
    this.logo.anchor.setTo(0.5);
    
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 100, 'loadingBar');
    this.preloadBar.anchor.setTo(0, 0.5);
    this.load.setPreloadSprite(this.preloadBar);

    //load game assets    
    this.load.image('generic_wilderness', 'assets/images/town.png');  
    this.load.spritesheet('player', 'assets/images/char.png', 24, 32);

    //load game data
    this.load.tilemap('genericMap', 'assets/maps/Basic_Map.json', null, Phaser.Tilemap.TILED_JSON);
  },
  create: function() {
  	this.game.stage.backgroundColor = '#FFCCE7';
    this.state.start('Home');
  }
};