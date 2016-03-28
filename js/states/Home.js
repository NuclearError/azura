var Azura = Azura || {};

Azura.Home = {

  init: function(message) {
    this.message = message;
  },

  create: function() {
    this.game.stage.backgroundColor = '#59C1DA';
    
    this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY - 100, 'logo');
    this.logo.anchor.setTo(0.5);

    this.game.input.onDown.add(function(){
      this.state.start('Game');
    }, this);

    var textStyle = {font: '24px Arial', fill: '#000'};
    this.game.add.text(30, this.game.world.centerY, 'Grave Game', textStyle);
    this.game.add.text(30, this.game.world.centerY + 60, 'click anywhere to start', textStyle);
  
    if(this.message) {
      this.game.add.text(60, this.game.world.centerY - 120, this.message, textStyle);
    }
  }
};