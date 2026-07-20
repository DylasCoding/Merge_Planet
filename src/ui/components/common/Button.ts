import { Container, Sprite, Text } from "pixi.js";
import { Font } from "../../../core/Font.ts";

export class Button extends Container {
    private baseScale = 1;
    private buttonText: Text;
    private icon!: Sprite;
    private background: Sprite;

    constructor(text: string, background: Sprite, icon?: string) {
        super();

        this.background = background;

        this.buttonText = new Text({
            text: text,
            style: {
                fontFamily: Font.Righteous_Regular,
                fill: 0x000000,
                fontSize: 18,
            },
        });

        this.background.anchor.set(0.5);
        this.buttonText.anchor.set(0.5);
        this.background.scale.set(0.6);
        this.buttonText.position.set(this.background.x, this.background.y);

        this.addChild(this.background);

        if (icon) {
            this.icon = Sprite.from(icon);
            this.icon.anchor.set(0.6);
            this.icon.scale.set(0.35);
            this.icon.position.set(this.background.x - 20, this.background.y + 5);

            this.addChild(this.icon);

            this.buttonText.position.set(this.icon.x + this.icon.width / 2, this.background.y);
        }

        this.addChild(this.buttonText);

        this.eventMode = "static";
        this.cursor = "pointer";

        this.on("pointerdown", () => {
            this.scale.set(this.baseScale * 0.95);
        });

        this.on("pointerup", () => {
            this.scale.set(this.baseScale);
        });

        this.on("pointerupoutside", () => {
            this.scale.set(this.baseScale);
        });
    }

    public setButtonScale(scaleValue: number): void {
        this.baseScale = scaleValue;
        this.scale.set(scaleValue);
    }

    public setTextColor(color: number): void {
        this.buttonText.style.fill = color;
    }

    public setBorderColor(color: number, width: number): void {
        this.buttonText.style.stroke = {
            color: color,
            width: width,
        };
    }

    public onClick(callback: () => void): void {
        this.on("pointertap", callback);
    }
}
