class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    
    preload() {
        this.load.audio('dnt', 'assets/dnt.wav');
        this.load.image('borders', 'assets/border ui.png')
        this.load.image('foreground', 'assets/foreground.png');
        this.load.image('starfield', 'assets/starfield.png');
        this.load.image('smallship', 'assets/smallship.png')
        this.load.image('rocket', 'assets/rocket.png');
        this.load.image('spaceship', 'assets/spaceship.png');
        this.load.spritesheet('explosion', './assets/explosion.png',
            {frameWidth: 64, 
            frameHeight: 32, 
            startFrame: 0, 
            endFrame: 9});
        this.load.spritesheet('smallexplosion', './assets/smallexplosion.png',
            {frameWidth: 64, 
            frameHeight: 32, 
            startFrame: 0, 
            endFrame: 9});
    }

    create() {

        this.sound.add('dnt').play();


        //starfield
        this.starfield = this.add.tileSprite(
            0,
            0,
            640,
            480,
            'starfield'
            ).setOrigin(0,0);
        
        this.p1Rocket = new Rocket(
            this,
            game.config.width / 2,
            game.config.height - borderUISize - borderPadding * 3.5,
            'rocket'
        );

        this.ship1 = new Ship (
            this,
            100,
            200,
            'spaceship',
            0,
            30,
            3000
        );

        this.ship2 = new Ship (
            this,
            300,
            240,
            'spaceship',
            0,
            20,
            2000
        );

        this.ship3 = new Ship (
            this,
            380,
            300,
            'spaceship',
            0,
            10,
            1000
        );

        this.ship4 = new Small (
            this,
            100,
            150,
            'smallship',
            0,
            50,
            5000
        );

        //foreground
        this.foreground = this.add.tileSprite(
            0,
            0,
            640,
            480,
            'foreground'
            ).setOrigin(0,0);

        // green UI bg
                this.add.rectangle(0, borderUISize + borderPadding, 
                    game.config.width, borderUISize * 2, 0xff99ed,).setOrigin(0,0);  

        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0x1d0c47).setOrigin(0 ,0); //left
        // this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0x1d0c47).setOrigin(0 ,0); //bottom
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0x1d0c47).setOrigin(0 ,0); //right
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x1d0c47).setOrigin(0 ,0); //top

         //borders ui
         this.borders = this.add.tileSprite(
            0,
            0,
            640,
            480,
            'borders'
            ).setOrigin(0,0);

        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);   
        
        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        this.anims.create({
            key: 'smallexplode',
            frames: this.anims.generateFrameNumbers('smallexplosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        //init score
        this.p1Score = 0;

        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#fce9c2',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + 
            borderPadding*2, this.p1Score, scoreConfig);

        /*// display high score
        let hsConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#fce9c2',
            color: '#843605',
            align: 'center',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 300
        }
        this.hsMiddle = this.add.text(borderUISize + borderPadding * 13, borderUISize + 
            borderPadding*2, "High Score: " + this.p1Score / 1000, hsConfig);    

        // display time
        let timeConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#fce9c2',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }
        this.timeRight = this.add.text(borderUISize + borderPadding * 43, borderUISize + 
            borderPadding*2, this.game.settings.gameTimer / 1000, timeConfig);*/
        
        // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
        
    }

    update() {
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        if (!this.gameOver) {               
            this.p1Rocket.update();         // update rocket sprite
            this.ship1.update();           // update spaceships (x3)
            this.ship2.update();
            this.ship3.update();
            this.ship4.update();
        } 

        
        this.starfield.tilePositionX -= 4;
        this.foreground.tilePositionX -= 6;
        
        // check collisions
        if (this.checkCollision(this.p1Rocket, this.ship4)) {
            this.p1Rocket.reset();
            this.smallshipExplode(this.ship4);
        }
        if(this.checkCollision(this.p1Rocket, this.ship3)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship3);
        }
        if (this.checkCollision(this.p1Rocket, this.ship2)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship2);
        }
        if (this.checkCollision(this.p1Rocket, this.ship1)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship1);
        }
        
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
            ship.reset();                         // reset ship position
            ship.alpha = 1;                       // make ship visible again
            boom.destroy();                       // remove explosion sprite
            // score add and repaint
            this.p1Score += ship.points;
            this.scoreLeft.text = this.p1Score;  
            //this.game.settings.gameTimer += ship.seconds;
            //this.timeRight.text = this.game.settings.gameTimer / 1000;
            this.sound.play('sfx_explosion');
        });       
    }

    smallshipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'smallexplosion').setOrigin(0, 0);
        boom.anims.play('smallexplode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
            ship.reset();                         // reset ship position
            ship.alpha = 1;                       // make ship visible again
            boom.destroy();                       // remove explosion sprite
            // score add and repaint
            this.p1Score += ship.points;
            this.scoreLeft.text = this.p1Score;  
            //this.game.settings.gameTimer += ship.seconds;
            //this.timeRight.text = this.game.settings.gameTimer / 1000;
            this.sound.play('sfx_explosion');
        });       
    }
    
}