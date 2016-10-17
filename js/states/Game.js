var Azura = Azura || {};

Azura.Game = {

  init: function(currentMap) {

  	this.game.stage.backgroundColor = '#59C1DA';

    //set map if level not found
    this.currentMap = currentMap ? currentMap : 'genericMap';

    //constants
    this.PLAYER_SPEED = 90;
    this.playerInputDirection = this.playerInputDirection || 'S';
    this.animationData = 0;

    this.walkingData = {
        "left": { cDirection: "W", axis: "x", vDirection: -1, animation: "walkLeft", stopFrame: 4 },
        "right": { cDirection: "E", axis: "x", vDirection: 1, animation: "walkRight", stopFrame: 12 },
        "up": { cDirection: "N", axis: "y", vDirection: -1, animation: "walkUp", stopFrame: 8 },
        "down": { cDirection: "S", axis: "y", vDirection: 1, animation: "walkDown", stopFrame: 0 }
    }

    //no gravity in a top-down game
    this.game.physics.arcade.gravity.y = 0;

    //keyboard cursors
    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.uiBlocked = false;
  },

  create: function() {

    this.loadMap();
    this.loadPlayer();

  },

  update: function() {

  	//collision between the player and the collision layer
    this.game.physics.arcade.collide(this.player, this.Walls);

	   // stop the player
	    this.player.body.velocity.x = 0;
      this.player.body.velocity.y = 0;



    if(!this.uiBlocked) {
      for (var direction in this.walkingData) {
          if (this.cursors[direction].isDown) {
              var directionData = this.walkingData[direction];
              if (directionData.vDirection === 1) {
                this.player.body.velocity[directionData.axis] = this.PLAYER_SPEED
              } else {
                this.player.body.velocity[directionData.axis] = -this.PLAYER_SPEED;
              }
              this.animationData = directionData;
          }
      }
    }

  	//control player walking animation
  	if(this.player.body.velocity.x || this.player.body.velocity.y) {
  	   this.player.play(this.animationData.animation); 
  	} else {
      // stop all animation
      this.player.animations.stop();
      // make sure correct 'stop' frame is showing, based on direction
      this.player.frame = this.animationData.stopFrame;
    }

  },
  loadMap: function(){
    //create a tilemap object
    this.map = this.add.tilemap(this.currentMap);

    //join the tile images to the json data
    this.map.addTilesetImage('town', 'generic_wilderness');

    //create tile layers
    this.Floor = this.map.createLayer('Floor');
    this.shadows = this.map.createLayer('shadows');
    this.Walls = this.map.createLayer('Walls');

    //send background to the back
    this.game.world.sendToBack(this.shadows);
    this.game.world.sendToBack(this.Floor);


    //collision layer
    this.map.setCollisionBetween(1,600, true, 'Walls');

    //resize the world to fit the layer
    this.Floor.resizeWorld();

  },
  loadPlayer: function(){
  	var playerMapLocation = this.findObjectsByType('player', this.map, 'Objects');

    //create player
    var playerData = {
      //list of items
      items: [],

      //player stats
      health: 25,
      attack: 12,
      defense: 8,
      gold: 100,

      //quest
      quests: []
    };

    this.player = new Azura.Player(this, playerMapLocation[0].x, playerMapLocation[0].y, playerData);

    //add player to the world
    this.add.existing(this.player);

    //follow player with the camera
    this.game.camera.follow(this.player);
  },
  findObjectsByType: function(targetType, tilemap, layer){
    var result = [];

    tilemap.objects[layer].forEach(function(element){

      if(element.type == targetType) {
        element.y -= tilemap.tileHeight;
        result.push(element);
      }

    }, this);

    return result;
  },
  gameOver: function() {
    this.state.start('Home', true, false, 'GAME OVER');
  }


};
