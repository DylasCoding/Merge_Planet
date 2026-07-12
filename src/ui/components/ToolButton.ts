import { Container, Sprite, Text, TextStyle } from "pixi.js";
import { Font } from "../../core/Font.ts";

export class ToolButton extends Container {
    private bg: Sprite;
    private defaultScale: number = 1;

    constructor(iconTexture: string, price: number, onClick: () => void) {
        super();

        this.eventMode = "static";
        this.cursor = "pointer";

        this.bg = Sprite.from("nextPlanet_bg");
        this.bg.anchor.set(0.5);
        this.bg.scale.x = 0.45;
        this.bg.scale.y = 0.5;
        this.addChild(this.bg);

        const icon = Sprite.from(iconTexture);
        icon.anchor.set(0.5);
        icon.scale.set(0.8);
        this.addChild(icon);

        const priceContainer = new Container();

        const gemIcon = Sprite.from("gem_icon");
        gemIcon.anchor.set(0.5);
        gemIcon.scale.set(0.5);

        const priceStyle = new TextStyle({
            fontFamily: Font.Righteous_Regular,
            fontSize: 18,
            fill: 0x80ffff,
            fontWeight: "bold",
            // stroke: { color: 0x000000, width: 2 },
        });

        const priceText = new Text(price.toString(), priceStyle);
        priceText.anchor.set(0, 0.5);

        gemIcon.x = 0;
        gemIcon.scale.set(0.35);
        priceText.x = gemIcon.width / 2;

        priceContainer.addChild(gemIcon, priceText);

        priceContainer.x = -priceContainer.width / 2 + gemIcon.width / 2;
        priceContainer.y = this.bg.height / 2 + 15;

        this.addChild(priceContainer);

        this.on("pointerover", this.onHover.bind(this));
        this.on("pointerout", this.onHoverOut.bind(this));
        this.on("pointerdown", this.onDown.bind(this));
        this.on("pointerup", this.onUp.bind(this));
        this.on("pointerupoutside", this.onUp.bind(this));

        this.on("pointertap", onClick);
    }

    private onHover() {
        this.scale.set(this.defaultScale * 1.05);
        this.bg.tint = 0xdddddd;
    }

    private onHoverOut() {
        this.scale.set(this.defaultScale);
        this.bg.tint = 0xffffff;
    }

    private onDown() {
        this.scale.set(this.defaultScale * 0.95);
        this.bg.tint = 0xaaaaaa;
    }

    private onUp() {
        this.scale.set(this.defaultScale * 1.05);
        this.bg.tint = 0xdddddd;
    }
}
