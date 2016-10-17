var Azura = Azura || {};

Azura.game = new Phaser.Game(768, 384, Phaser.AUTO, 'gameContainer');

Azura.game.state.add('Boot', Azura.Boot);
Azura.game.state.add('Preload', Azura.Preload);
Azura.game.state.add('Home', Azura.Home);
Azura.game.state.add('Game', Azura.Game);

Azura.game.state.start('Boot');
