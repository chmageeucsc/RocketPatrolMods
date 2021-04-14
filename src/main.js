/*
Name: Chantel Gee
Project Title: Rocket Patrol Mod
Date: April 13, 2021
Time to Completion: about 5 hours
---------------------------------------------
Points Breakdown
---------------------------------------------
Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (25)
Create new artwork for all of the in-game assets (rocket, spaceships, explosion) (25) 
Implement mouse control for player movement and mouse click to fire (25)
Create a new title screen (15)
Implement parallax scrolling (15)

Total Points: 105
*/

let config = {
    type : Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play],
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT, keyUP, keyDOWN;
