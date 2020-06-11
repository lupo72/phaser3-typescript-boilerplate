export class StartScreen extends Phaser.Scene {
    constructor() {
        super({key: "StartScreen"});
    }

    preload()
    {
        this.load.spritesheet('Player', './src/assets/block-ninja-32px.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('MyBasicTileset', './src/assets/tilesets/MyBasicTileset.png', {frameWidth:32, frameHeight:32});
        this.load.tilemapTiledJSON('MyTilemap', './src/assets/tilemaps/demo-level-02.json');
    }

    init() {

    }

    create()
    {
        this.add.text(100,260,'Startscreen' , {fontFamily: "Verdana", fontSize: 40, fontStyle:"italic"});
        this.add.text(109,320,'click or press any key to go to next scene', {fontFamily: "Verdana", fontSize: 16});

        this.input.keyboard.on('keyup', function(evt){
            this.scene.start("GameScene");
        }, this);
    }

    update()
    {
        if (this.input.activePointer.isDown)
        {
            this.scene.start("GameScene");
        }
    }

}
