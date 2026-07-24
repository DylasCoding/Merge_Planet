import { Particle } from "../Particle";
import { Vector2 } from "../../../utils/math/Vector2";
import { Assets } from "pixi.js";

export class ExplodeParticle extends Particle {
    private angleVelocity: number;
    private scale: number = 0.3;
    constructor(xCoord: number, yCoord: number, angleVelocity: number, speed: number) {
        const texture = Assets.get("explode");
        super(xCoord, yCoord, texture);
        this.angleVelocity = angleVelocity;
        this.sprite.scale.set(this.scale);
        this.velocity = new Vector2(
            Math.sin(this.angleVelocity) * speed,
            Math.cos(this.angleVelocity) * speed,
        );
    }
    public override update(deltaTime: number) {
        this.position.x += this.velocity.x * deltaTime;
        this.position.y += this.velocity.y * deltaTime;

        this.velocity.x *= 0.98;
        this.velocity.y *= 0.98;

        this.life -= deltaTime;
        this.sprite.alpha = this.life / this.maxLife;
        this.sprite.scale.set(this.scale * (this.life / this.maxLife));
        this.sprite.position.set(this.position.x, this.position.y);

        if (this.sprite.alpha <= 0) this.isRunOutOfLife = true;
    }
}
