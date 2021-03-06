/*
Name: Chantel Gee
Project Title: Rocket Patrol Mod
Date: April 14, 2021
Time to Completion: about 7 hours
---------------------------------------------
Points Breakdown
---------------------------------------------
Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (20)
Create new artwork for all of the in-game assets (rocket, spaceships, explosion) (20) 
Implement mouse control for player movement and mouse click to fire (20)
Create a new title screen (10)
Create 4 new explosion SFX and randomize which one plays on impact (10)
Implement parallax scrolling (10)
Replace UI borders with new artwork (10)
Add your own (copyright-free) background music to the Play scene (5)

Total Points: 105
---------------------------------------------
Credits
---------------------------------------------
All visual assets remade by me.
'smallboom.wav' from V-ktor on freesound.org (https://freesound.org/people/V-ktor/sounds/482993/)
'medboom.wav' from ryansnook on freesound.org (https://freesound.org/people/ryansnook/sounds/110115/)
'laserboom.wav' from dpoggioli on freesound.org (https://freesound.org/people/Dpoggioli/sounds/213610/)
'dnt.wav' from Free Music on YouTube (https://www.youtube.com/watch?v=OuRvOCf9mJ4&list=PLwJjxqYuirCLkq42mGw4XKGQlpZSfxsYd&index=4)
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
