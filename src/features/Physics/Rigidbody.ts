import { Vector2 } from "../../utils/math/Vector2";

export class RigidBody {
    public position: Vector2;
    public velocity: Vector2;
    public fallingSpeed: number;
    public gravity: number;
    public restitution: number = 0.15;

    public rotation: number = 0;
    public angularVelocity: number = 0;

    public isGrounded = false;
    public isSleeping = false;
    public sleepTimer = 0;

    constructor(x: number, y: number) {
        this.fallingSpeed = 65;
        this.gravity = 9.8;
        this.position = new Vector2(x, y);
        this.velocity = new Vector2(0, 0);
    }
    update(dt: number) {
        if (this.isSleeping) return;

        this.isGrounded = false;
        if (!this.isGrounded) {
            this.velocity.y += this.fallingSpeed * this.gravity * dt;
        } else {
            this.velocity.y = 0;
        }
        this.position.x += this.velocity.x * dt;
        this.position.y += this.velocity.y * dt;

        this.angularVelocity *= 0.98;

        if (Math.abs(this.angularVelocity) < 0.2) {
            this.angularVelocity = 0;
        }
        this.rotation += this.angularVelocity * dt;
    }
}
