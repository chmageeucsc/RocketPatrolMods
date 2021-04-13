class Small extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame,)
        scene.add.existing(this);
        this.points = pointValue;
        this.movementSpeed = 5;
    }

    update() {
        this.x -= this.movementSpeed;

        if(this.x < 0 -this.width) {
            this.reset();
        }
    }

    reset() {
        this.x = game.config.width + 50;
    }
}