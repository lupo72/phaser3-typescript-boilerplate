import { Player } from "../actors/Player";
export class GameScene extends Phaser.Scene {

    public player;
    public ladders;

    constructor() {
        super({key: "GameScene"});
    }

    preload() {
        this.load.spritesheet('MyBasicTileset', './src/assets/tilesets/MyBasicTileset.png', {frameWidth:32, frameHeight:32});
        this.load.tilemapTiledJSON('MyTilemap', './src/assets/tilemaps/demo-level-01.json');
    }

    init() {

    }

    create() {
        // this.add.grid(0, 0, this.game.config.width, this.game.config.height, 32, 32);

        const map = this.make.tilemap({key:'MyTilemap', tileWidth: 32, tileHeight: 32});
        // param tilesetName from TILED Editor
        const tileset = map.addTilesetImage('MyBasicTileset');
        // param layerID from TILED Editor
        const platforms = map.createStaticLayer('Floors', tileset, 0, -32);
        platforms.setCollisionByExclusion([-1], true);

        this.ladders = new Phaser.GameObjects.Group(this.physics.scene);
        map.findObject('Ladders', function(obj) {
            let frame = Math.floor(Math.random() * 2) + 1 ;
            let ladderSprite = new Phaser.GameObjects.Sprite(this, obj['x'], obj['y'], 'MyBasicTileset', frame === 2 ? 18 : 19);

            // Adjust position
            ladderSprite.setOrigin(-0.25 , 2.0);
            this.physics.add.existing(ladderSprite);
            this.add.existing(ladderSprite);
            this.ladders.add(ladderSprite);
        }, this);


        this.add.text(100, 260, 'Game Scene', {fontFamily: "Verdana", fontSize: 40, fontStyle: "italic"});
        this.player = new Player({scene: this, x: 10, y: 440} );
        this.player.cursors = this.input.keyboard.createCursorKeys();
        // https://www.html5gamedevs.com/topic/40809-how-to-alter-player-hitbox/
        this.player.setSize(16,32);

        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, platforms);

        // Activate for Old-School Feelings:
        //
        // this.cameras.main.setZoom(2);
        // this.cameras.main.startFollow(this.player);
        // this.cameras.main.centerOn(this.player.x, this.player.y);
    }

    update(time, delta) {

        if (this.player)
        {
            this.player.resetOnLadder();
            // https://www.html5gamedevs.com/topic/36632-changing-collision-detection-for-arcade-physics/
            this.physics.world.overlap(this.player, this.ladders, this.player.onLadder, null, this.player);
            this.player.update();
        }
    }
}
