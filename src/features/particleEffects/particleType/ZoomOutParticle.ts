import { Particle } from "../Particle";
import { Vector2 } from "../../../utils/math/Vector2";
import { Assets } from "pixi.js";

export class ZoomOutParticle extends Particle {
    private scale: number;
    constructor(xCoord: number, yCoord: number, radius: number) {
        const texture = Assets.get("transparentCircle");
        super(xCoord, yCoord, texture);
        this.scale = radius / 56;

        this.sprite.scale.set(this.scale);
        this.velocity = new Vector2(0, 50);
    }
    public override update(deltaTime: number) {
        console.log("particle hoat doong");
        this.position.x += this.velocity.x * deltaTime;
        this.position.y += this.velocity.y * deltaTime;

        this.velocity.x *= 0.98;
        this.velocity.y *= 0.98;

        this.life -= deltaTime;
        this.sprite.alpha = this.life / this.maxLife;
        const t = 1 - this.life / this.maxLife;
        this.sprite.scale.set(this.scale * (1 + t));
        this.sprite.position.set(this.position.x, this.position.y);

        if (this.sprite.alpha <= 0) this.isRunOutOfLife = true;
    }
}
