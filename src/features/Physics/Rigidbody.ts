import { Vector2 } from "../../utils/math/Vector2";

export class rigidBody {
    public position: Vector2;
    public velocity: Vector2;
    public fallingSpeed: number;
    public gravity: number;
    public restitution: number;
    constructor(x: number, y: number) {
        this.fallingSpeed = 65;
        this.gravity = 9.8;
        this.restitution = 0.15;
        this.position = new Vector2(x, y);
        this.velocity = new Vector2(0, 0);
    }
    update(dt: number) {
        this.velocity.y += this.fallingSpeed * this.gravity * dt;

        this.position.x += this.velocity.x * dt;
        this.position.y += this.velocity.y * dt;
    }
}
