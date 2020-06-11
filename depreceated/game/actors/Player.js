class Player extends BaseActor {

    body;

    constructor(config) {
       super(config, "Player");
       config.scene.add.existing(this);
       config.scene.physics.add.existing(this);
       this.speedX = 150;
       this.speedY = 200;
       this.canClimb = false;
       this.jumping = false;
       // this.layer = config.layer;
    }

    resetOnLadder() {
        this.canClimb = false;
    }

    onLadder() {
        this.canClimb = true;
    }

    init()
    {
    }

    create()
    {
    }

    update()
    {
      this.moveBasic();
    }

    move() {

        if( this.cursors.left.isDown || this.cursors.right.isDown )
        {
            if (this.cursors.left.isDown ) this.body.setVelocityX(-this.speedX);
            if (this.cursors.right.isDown ) this.body.setVelocityX(this.speedX);
        }
        else
        {
            this.body.setVelocityX(0);
        }

        if ( this.body.onFloor() && this.cursors.up.isDown && ! this.canClimb && ! this.jumping )
        {
            this.body.setVelocityY(-400);
            this.jumping = true;
        }
        else if ( this.canClimb && (this.cursors.up.isDown || this.cursors.down.isDown) )
        {
            if (this.cursors.up.isDown) this.body.setVelocityY(-this.speedY);
            if (this.cursors.down.isDown) this.body.setVelocityY(this.speedY);
        }
        else if ( ! this.body.onFloor() && ! this.jumping )
        {
            this.body.setVelocityY(100);
        }
    }

    moveBasic() {
        this.canClimb = true;
        if ( this.body.onFloor() && ! this.canClimb ) this.jumping = false;
        let velX = this.cursors.left.isDown ? - this.speedX : this.cursors.right.isDown ? this.speedX : 0;
        let velY = 0;
        if ( ! this.body.onFloor() && ! this.jumping ) velY = this.speedY;
        if ( this.body.onFloor() ) this.jumping = false;
        if (this.canClimb) velY = this.cursors.up.isDown ? - this.speedY : this.cursors.down.isDown ? this.speedY : 0;
        /*
        if (this.cursors.up.isDown && this.body.onFloor() && ! this.canJump)
        {
            console.log('jump');
            this.canJump = true;
            velY = -400;
        }
        */
        this.body.setVelocity(velX, velY);
    }

    moveAdvanced() {
        let moving = false;
        let velX = 0;
        let velY = 0;
        let onLadder = this.canClimb;



        if ( ! onLadder || this.layer.getTileAtWorldXY(this.body.x, this.body.y) === null)
        {
            this.body.setAllowGravity(true);
        }
        else if (onLadder) {

            // if ( this.ladderTiles.indexOf(this.layer.getTileAtWorldXY(this.body.x, this.body.y).index) > -1)
            // {
                this.changeGravity();
                // onLadder = true;
            // }
        }

        // if (this.cursors.space.isDown) running = true;

        if (this.cursors.left.isDown)
        {
            velX = - this.walkX;
            this.flipX = false;
            moving = true;
        }
        else if (this.cursors.right.isDown)
        {
            velX = this.walkX;
            this.flipX = true;
            moving = true;
        }

        var canJump = (this.body.blocked.down || this.body.touching.down) && ! onLadder;

        if(this.cursors.up.isDown && canJump)
        {
            this.body.setVelocityY(-300);
        }
        else if(this.cursors.up.isDown && onLadder)
        {
            velY = - this.speedY;
            moving = true;
        }
        else if(this.cursors.down.isDown && onLadder)
        {
            velY = this.speedY;
            moving = true;
        }

        var tileBelow = this.layer.getTileAtWorldXY(this.body.x, this.body.y + 32);
        console.log(this.layer);

        if ( moving )
        {
            this.body.setVelocityX(velX);
            if (onLadder || (tileBelow && this.ladderTiles.indexOf(tileBelow.index) > -1) ) this.body.setVelocityY(velY);
        }
        else
        {
            this.body.setVelocityX(0);
            if (onLadder) this.body.setVelocityY(0);
        }
    }

}
