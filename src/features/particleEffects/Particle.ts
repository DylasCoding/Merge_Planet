import { Sprite, Texture } from "pixi.js";
import { Vector2 } from "../../utils/math/Vector2";

export class Particle {
    public sprite: Sprite;
    public position: Vector2;
    public velocity: Vector2;
    public life: number;
    public maxLife: number = 0.5;
    public isRunOutOfLife: boolean;

    constructor(xCoord: number, yCoord: number, texture: Texture) {
        this.sprite = new Sprite(texture);
        this.sprite.anchor.set(0.5);
        this.sprite.scale.set(0.2);
        this.position = new Vector2(xCoord, yCoord);
        this.velocity = new Vector2(0, 0);
        this.life = this.maxLife;
        this.isRunOutOfLife = false;
    }
    public update(deltaTime: number) {
        this.position.x += this.velocity.x * deltaTime;
        this.position.y += this.velocity.y * deltaTime;
        this.velocity.x *= 0.98;
        this.velocity.y *= 0.98;

        this.life -= deltaTime;

        this.sprite.alpha = this.life / this.maxLife;
        this.sprite.position.set(this.position.x, this.position.y);

        if (this.sprite.alpha <= 0) this.isRunOutOfLife = true;
    }
}
