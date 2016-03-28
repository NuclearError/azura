var Azura = Azura || {};

Azura.Game = {

  init: function(currentMap) {  
  
  	this.game.stage.backgroundColor = '#59C1DA';
  	  
    //set map if level not found
    this.currentMap = currentMap ? currentMap : 'genericMap';

    //constants
    this.PLAYER_SPEED = 90;
    this.playerInputDirection = this.playerInputDirection || 'S';
    
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
      if(this.cursors.left.isDown) {
      	this.playerInputDirection = 'W';
        this.player.body.velocity.x = -this.PLAYER_SPEED;
      }
      if(this.cursors.right.isDown) {
      	this.playerInputDirection = 'E';
        this.player.body.velocity.x = this.PLAYER_SPEED;
      }
      if(this.cursors.up.isDown) {
      	this.playerInputDirection = 'N';
        this.player.body.velocity.y = -this.PLAYER_SPEED;
      }
      if(this.cursors.down.isDown) {
      	this.playerInputDirection = 'S';
        this.player.body.velocity.y = this.PLAYER_SPEED;
      }

    }
    
  	//control player walking animation
  	if(this.player.body.velocity.x != 0 || this.player.body.velocity.y != 0) {
  		// check for direction, play appropriate animation
  		if (this.playerInputDirection == 'W'){
  			this.player.play('walkLeft');
  		}
  		if (this.playerInputDirection == 'E'){
  			this.player.play('walkRight');
  		}
  		if (this.playerInputDirection == 'N'){
  			this.player.play('walkUp');
  		}
  		if (this.playerInputDirection == 'S'){
  			this.player.play('walkDown');
  		}
  	} else {
  		// stop all animation
      	this.player.animations.stop();
     
      	if (this.playerInputDirection == 'W'){
  			this.player.frame = 4;
  		}
  		if (this.playerInputDirection == 'E'){
  			this.player.frame = 12;
  		}
  		if (this.playerInputDirection == 'N'){
  			this.player.frame = 8;
  		}
  		if (this.playerInputDirection == 'S'){
  			this.player.frame = 0;
  		}
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