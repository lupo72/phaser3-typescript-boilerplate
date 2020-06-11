// https://phasergames.com/extend-a-sprite-in-phaser-3/
export class BasePlayer extends Phaser.Physics.Arcade.Sprite {
    body: Phaser.Physics.Arcade.Body;
    public speedX;
    public speedY;
    public canClimb;
    public canJump;
    public cursors;
    public falling;

    constructor(config, sprite_key) {
        super(config.scene, config.x, config.y, sprite_key, 1);
        config.scene.add.existing(this);
        config.scene.physics.add.existing(this);
        this.canClimb = false;
        this.canJump = false;
    }


    resetOnLadder() {
        this.canClimb = false;
    }

    onLadder() {
        this.canClimb = true;
    }

    update() {
        this.moveBasic();
        this.resetOnLadder();
    }

    move() {

        if (this.cursors.left.isDown || this.cursors.right.isDown) {
            if (this.cursors.left.isDown) this.body.setVelocityX(-this.speedX);
            if (this.cursors.right.isDown) this.body.setVelocityX(this.speedX);
        } else {
            this.body.setVelocityX(0);
        }

        if (this.body.onFloor() && this.cursors.up.isDown && !this.canClimb && !this.canJump) {
            this.body.setVelocityY(-400);
            this.canJump = true;
        } else if (this.canClimb && (this.cursors.up.isDown || this.cursors.down.isDown)) {
            if (this.cursors.up.isDown) this.body.setVelocityY(-this.speedY);
            if (this.cursors.down.isDown) this.body.setVelocityY(this.speedY);
        } else if (!this.body.onFloor() && !this.canJump) {
            this.body.setVelocityY(100);
        }
    }

    moveBasic() {
        if (this.body.onFloor()) {
            this.canJump = false;
            this.falling = false;
        }
        if (!this.body.onFloor() && !this.canClimb ) {
            this.canJump = false;
            this.falling = true;
        }
        console.log(this.body.onFloor(), this.falling, this.canClimb);
        let velX = this.cursors.left.isDown ? -this.speedX : this.cursors.right.isDown ? this.speedX : 0;
        if (this.falling && velX != 0) velX = 0;
        let velY = 0;
        if (!this.body.onFloor() && !this.canJump /*&& !this.falling*/) velY = this.speedY;

        if (this.body.onFloor()) {
            this.canJump = false;
        }
        if (this.canClimb) velY = this.cursors.up.isDown ? -this.speedY : this.cursors.down.isDown ? this.speedY : 0;

        if (this.cursors.up.isDown && this.body.onFloor() && ! this.canJump && ! this.falling)
        {
            console.log('jump');
            this.canJump = true;
            velY = -400;
        }

        this.body.setVelocity(velX, velY);
    }


}
