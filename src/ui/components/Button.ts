import { Container, Sprite, Text } from "pixi.js";
import { Font } from "../../core/Font.ts";

export class Button extends Container {
    constructor(text: string, background: Sprite) {
        super();

        // text = "Button";
        // background = Sprite.from("button_purple");

        const buttonText = new Text({
            text: text,
            style: {
                fontFamily: Font.Righteous_Regular,
                fill: 0x000000,
                fontSize: 18,
            },
        });

        background.anchor.set(0.5);
        buttonText.anchor.set(0.5);

        background.scale.set(0.6);

        buttonText.position.set(background.x, background.y);

        this.addChild(background, buttonText);

        this.eventMode = "static";
        this.cursor = "pointer";

        this.on("pointerdown", () => {
            this.scale.set(0.95);
        });

        this.on("pointerup", () => {
            this.scale.set(1);
        });

        this.on("pointerupoutside", () => {
            this.scale.set(1);
        });
    }

    public onClick(callback: () => void): void {
        this.on("pointertap", callback);
    }
}
