var Azura = Azura || {};

Azura.Player = function(state, x, y, data) {
  Phaser.Sprite.call(this, state.game, x, y, 'player');

  this.state = state;
  this.game = state.game;
  this.data = data;
  this.anchor.setTo(0.5);
  this.direction = this.game.playerInputDirection;

  //walking animation
  this.animations.add('walkDown', [0,1,2,3], 6, true);
  this.animations.add('walkLeft', [4,5,6,7], 6, true);
  this.animations.add('walkUp', [8,9,10,11], 6, true);
  this.animations.add('walkRight', [12,13,14,15], 6, true);
  
  //enable physics
  this.game.physics.arcade.enable(this);
  this.body.collideWorldBounds = true;
};

Azura.Player.prototype = Object.create(Phaser.Sprite.prototype);
Azura.Player.prototype.constructor = Azura.Player;

