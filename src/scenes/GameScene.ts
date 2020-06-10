import { Player } from "../actors/Player";
export class GameScene extends Phaser.Scene {

    public player;
    public ladders;

    constructor() {
        super({key: "GameScene"});
    }

    preload() {
        this.load.spritesheet('MyBasicTileset', './src/assets/tilesets/MyBasicTileset.png', {frameWidth:32, frameHeight:32});
        this.load.tilemapTiledJSON('MyTilemap', './src/assets/tilemaps/demo-level-02.json');
    }

    init() {

    }

    create() {
        const map = this.make.tilemap({key:'MyTilemap', tileWidth: 32, tileHeight: 32});
        // param tilesetName from TILED Editor
        const tileset = map.addTilesetImage('MyBasicTileset');

        this.add.text(100, 260, 'Game Scene', {fontFamily: "Verdana", fontSize: 40, fontStyle: "italic"});
        this.player = new Player({scene: this, x: 10, y: 440} );
        this.player.cursors = this.input.keyboard.createCursorKeys();
        // https://www.html5gamedevs.com/topic/40809-how-to-alter-player-hitbox/
        this.player.setSize(16,34);
        this.player.setCollideWorldBounds(true);

        // param layerID from TILED Editor
        const platforms = map.createStaticLayer('Floors', tileset, 0, -32);
        platforms.setCollisionByExclusion([-1], true);
        this.physics.add.collider(this.player, platforms);

        // param layerID from TILED Editor
        const ladders = map.createStaticLayer('Ladders', tileset, 0, -32);
        ladders.setCollision([18,19], false);
        this.physics.add.collider(this.player, ladders);
        ladders.setTileIndexCallback([19,20], this.player.onLadder, this.player);

        this.player.depth = 1;

        // Activate for Old-School Feelings:
        //
        // this.cameras.main.setZoom(2);
        // this.cameras.main.startFollow(this.player);
        // this.cameras.main.centerOn(this.player.x, this.player.y);
    }

    update(time, delta) {

        if (this.player)
        {
            this.player.update();
        }
    }
}


