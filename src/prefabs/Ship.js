class Ship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, timeValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.movementSpeed = game.settings.spaceshipSpeed;
        this.seconds = timeValue;
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