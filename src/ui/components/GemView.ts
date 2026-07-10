import { Container, Sprite, Text } from "pixi.js";

export class GemView extends Container {
    private readonly gemText: Text;

    constructor() {
        super();

        const bg = Sprite.from("gem_bg");
        const icon = Sprite.from("gem_icon");

        this.gemText = new Text({
            text: "0",
            style: {
                fill: 0x80ffff,
                fontSize: 24,
            },
        });

        bg.scale.x = 0.35;
        bg.scale.y = 0.5;

        icon.scale.set(0.5);

        bg.anchor.set(0, 0);
        icon.anchor.set(0.5);
        this.gemText.anchor.set(0.5);

        bg.position.set(0, 0);

        icon.position.set(25, bg.height / 2);

        this.gemText.position.set(bg.width * 0.65, bg.height / 2);

        this.addChild(bg, icon, this.gemText);
    }

    public setGemText(gem: number): void {
        this.gemText.text = gem.toString();
    }
}
