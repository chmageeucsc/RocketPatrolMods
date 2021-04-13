class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.movementSpeed = 3
        this.isFiring = false;
        this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
    }

    update() {
        if(this.isFiring) {
            this.y -= this.movementSpeed;
            if(this.y < (borderUISize * 3 + 15)) {
                this.y = game.config.height - borderUISize - borderPadding;
                this.isFiring = false;
                this.reset();
            }
        } else {
            if(game.settings.mouse) {
                this.x = game.input.mousePointer.x;

                // fire button
                if (game.input.activePointer.isDown && !this.isFiring) {
                    this.isFiring = true;
                    this.sfxRocket.play();  // play sfx
                }
        
                this.x = Phaser.Math.Clamp(
                    this.x, 
                    borderUISize + borderPadding, 
                    game.config.width - borderUISize - borderPadding);
            }

            else {

                if(keyLEFT.isDown) {
                    this.x -= this.movementSpeed;
                }
                if(keyRIGHT.isDown) {
                    this.x += this.movementSpeed;
                }

                // fire button
                if (Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
                    this.isFiring = true;
                    this.sfxRocket.play();  // play sfx
                }
        
                this.x = Phaser.Math.Clamp(
                    this.x, 
                    borderUISize + borderPadding, 
                    game.config.width - borderUISize - borderPadding);
            }
        }
        
    }

    reset() {
        this.y = game.config.height - borderUISize - borderPadding;
        this.isFiring = false;
    }
}