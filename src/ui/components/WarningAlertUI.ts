import { Assets, Container, Sprite, Text, TextStyle } from "pixi.js";

export class WarningAlert extends Container {
    private sprite: Sprite;
    private text: Text;
    public isWarning: boolean = false;
    private flashTime: number = 0;
    private timer: number = 0;
    constructor(xCoord: number, yCoord: number) {
        console.log("create icon alert");
        super();
        const texture = Assets.get("warningAlert_icon");
        this.sprite = new Sprite(texture);
        this.sprite.scale.set(0.03);
        this.text = this.textStyle("3");
        this.text.anchor.set(0.5);
        this.text.position.x = this.sprite.position.x + this.sprite.width / 2;
        this.text.position.y = this.sprite.position.y + 70;
        this.position.set(xCoord, yCoord);
        this.addChild(this.sprite);
        this.addChild(this.text);
    }
    update(deltaTime: number) {
        if (this.isWarning) {
            this.visible = true;
            this.flashTime += deltaTime * 5;
            this.sprite.alpha = 0.5 + Math.sin(this.flashTime) * 0.3;

            this.timer += deltaTime;
            this.text.text = this.timer.toFixed(2);
        } else {
            this.visible = false;
            this.timer = 0;
        }
    }
    textStyle(message: string) {
        const style = new TextStyle({
            fontFamily: "",
            fontSize: 36,
            fontWeight: "bold",
            fill: "cyan",
        });
        return new Text({
            text: message,
            style: style,
        });
    }
}
