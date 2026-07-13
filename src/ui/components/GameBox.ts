import { Container, Sprite, Assets, Rectangle, Graphics } from "pixi.js";

export class GameBox extends Container {
    private background: Sprite;
    public gameBoxBounds!: Rectangle;
    constructor() {
        super();

        const texture = Assets.get("box");

        this.background = new Sprite(texture);

        this.background.anchor.set(0.5);

        this.addChild(this.background);
    }

    public InitAreaBounds(): Rectangle {
        const width = this.background.width - 145;
        const height = this.background.height - 131;
        // this.rect = new Graphics()
        //     .rect(this.x - width  / 2, this.y - height / 2, width, height)
        //     .fill("red");
        // this.addChild(this.rect);
        this.gameBoxBounds = new Rectangle(this.x - width / 2, this.y - height / 2, width, height);
        return this.gameBoxBounds;
    }

    public getBoundsAsObject(): { x: number; y: number; width: number; height: number } {
        this.InitAreaBounds();
        // const boxStroke = new Graphics()
        //     .moveTo(this.gameBoxBounds.x, this.gameBoxBounds.x)
        //     .lineTo(this.gameBoxBounds.x, this.gameBoxBounds.height)
        //     .lineTo(this.gameBoxBounds.width, this.gameBoxBounds.height)
        //     .lineTo(this.gameBoxBounds.width, this.gameBoxBounds.y)
        //     .stroke({
        //         width: 6,
        //         color: 0xffffff,
        //     });

        // this.addChild(boxStroke);
        return {
            x: this.gameBoxBounds.x,
            y: this.gameBoxBounds.y,
            width: this.gameBoxBounds.width,
            height: this.gameBoxBounds.height,
        };
    }
}
