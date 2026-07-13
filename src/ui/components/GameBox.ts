import { Container, Sprite, Assets, Rectangle } from "pixi.js";

export class GameBox extends Container {
    private background: Sprite;

    constructor() {
        super();

        const texture = Assets.get("box");

        this.background = new Sprite(texture);

        this.background.anchor.set(0.5);

        this.addChild(this.background);
    }

    public getAreaBounds(): Rectangle {
        const width = this.background.width - 130;
        const height = this.background.height - 30;

        return new Rectangle(this.x - width / 2, this.y - height / 2, width, height);
    }

    public getBoundsAsObject(): { x: number; y: number; width: number; height: number } {
        const bounds = this.getAreaBounds();
        return {
            x: bounds.x,
            y: bounds.y,
            width: bounds.width,
            height: bounds.height,
        };
    }
}
