// https://phasergames.com/extend-a-sprite-in-phaser-3/
class BaseActor extends Phaser.Physics.Arcade.Sprite {

    constructor(config, sprite_key)
    {
        super(config.scene, config.x, config.y, sprite_key, 1);
        // config.scene.add.existing(this);
    }

    update()
    {
        console.log('base actor')
    }

}
