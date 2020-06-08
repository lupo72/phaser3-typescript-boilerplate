var config = {

    type:Phaser.AUTO,
    width:480,
    height:600,
    backgroundColor:'#cecece',
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {x: 0, y: 0 },
            debug: true
        }
    },
    scene: [StartScreen, Credits, GameScene],
};

var game = new Phaser.Game(config);
