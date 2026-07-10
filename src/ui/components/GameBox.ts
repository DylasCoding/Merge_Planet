import { Container, Sprite, Assets } from "pixi.js";

export class GameBox extends Container {
    private background: Sprite;

    constructor() {
        super();

        const texture = Assets.get("box");

        this.background = new Sprite(texture);

        this.background.anchor.set(0.5);

        this.addChild(this.background);
    }
}
