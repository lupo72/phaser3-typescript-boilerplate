import { BasePlayer } from "./BasePlayer";

export class Player extends BasePlayer {
    constructor(config) {
       super(config, "Player");
        this.speedX = 150;
        this.speedY = 200;
    }



}
