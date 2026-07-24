import { Container, Sprite } from "pixi.js";
import { type Planet } from "../../planet/entities/Planet";

export class PickaxeEffect extends Container {
    private readonly sprite = Sprite.from("tool1_icon");

    constructor() {
        super();
        this.sprite.anchor.set(0.2, 0.9);
        this.sprite.visible = false;
        this.addChild(this.sprite);
    }

    public async play(target: Planet): Promise<void> {
        this.sprite.visible = true;

        const distance = 50;
        this.position.set(
            target.x - Math.cos(this.rotation) * distance,
            target.y - Math.sin(this.rotation) * distance,
        );

        this.rotation = -0.8;

        await new Promise((resolve) => {
            setTimeout(resolve, 150);
        });

        this.rotation = 0.3;

        await new Promise((resolve) => {
            setTimeout(resolve, 120);
        });

        this.sprite.visible = false;
    }
}
