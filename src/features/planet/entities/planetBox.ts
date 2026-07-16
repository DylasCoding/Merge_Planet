import { Container, Graphics, Sprite } from "pixi.js";

export class planetBox extends Container {
    public sprite: Sprite;
    public strokeWidth: number;
    public boxX: number;
    public boxY: number;
    public boxWidth: number;
    public boxHeight: number;
    constructor(xCoord: number, yCoord: number, boxWidth: number, boxHeight: number) {
        super();
        this.sprite = Sprite.from("boxSprite");
        this.strokeWidth = 6;
        this.boxX = xCoord;
        this.boxY = yCoord;
        this.boxWidth = boxWidth;
        this.boxHeight = boxHeight;
        //temporary Box for checking object
        const boxStroke = new Graphics()
            .moveTo(this.boxX, this.boxY)
            .lineTo(this.boxX, this.boxHeight)
            .lineTo(this.boxWidth, this.boxHeight)
            .lineTo(this.boxWidth, this.boxY)
            .stroke({
                width: 6,
                color: 0xffffff,
            });
        
        this.addChild(boxStroke);
        this.pivot.set(this.boxWidth / 2, this.boxHeight / 2);
    }
    planetBoxSpriteLoad() {}
}
