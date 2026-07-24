import { Sprite } from "pixi.js";

export class PickaxeCursor extends Sprite {
    private readonly sprite = Sprite.from("tool1_icon");
    constructor() {
        super();
        this.sprite.visible = false;
        this.sprite.anchor.set(0.92, 0.95);
        this.sprite.scale.set(1);
        this.sprite.eventMode = "none";
        this.addChild(this.sprite);
    }

    public show(): void {
        this.sprite.visible = true;
    }

    public hide(): void {
        this.sprite.visible = false;
    }

    public follow(x: number, y: number): void {
        this.sprite.position.set(x, y);
    }
}
