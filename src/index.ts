import "phaser";
import { StartScreen } from './scenes/StartScreen';
import { GameScene } from "./scenes/GameScene";
import { Credits } from "./scenes/Credits";

/// <reference path="../../phaser.d.ts"/>

var config: GameConfig = {
    title: "BlockNinja Platform Dummy: a Phaser3 BoilerPlate",
    type:Phaser.AUTO,
    width:480,
    height:600,
    backgroundColor:'#cecece',
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {x: 0, y: 10 },
            debug: true
        }
    },
    scene: [StartScreen, Credits, GameScene],
};


export class Game extends Phaser.Game {
    constructor(config: GameConfig) {
      super(config);
    }
}

window.onload = () => {
    var game = new Game(config);
};




// import "phaser";
// import { initialScene } from "./scenes/initialScene";
//
// /// <reference path="../../phaser.d.ts"/>
//
// const config: GameConfig = {
//     title: "Phaser3 BoilerPlate",
//     type: Phaser.AUTO,
//     width: 800,
//     height: 600,
//     scene: [initialScene],
//     input: {
//         keyboard: true,
//         mouse: false,
//         touch: false,
//         gamepad: false
//     }
// };
//
// export class Game extends Phaser.Game {
//     constructor(config: GameConfig) {
//       super(config);
//     }
// }
//
// window.onload = () => {
//     var game = new Game(config);
// };
