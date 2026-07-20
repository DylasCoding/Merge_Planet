import type { Vector2 } from "../../utils/math/Vector2";
import type { RigidBody } from "./Rigidbody";

export class CircleCollider {
    public radius: number;
    public position: Vector2;
    public body: RigidBody | null = null;
    constructor(radius: number, position: Vector2, body: RigidBody) {
        this.radius = radius;
        this.position = position;
        this.body = body;
    }
    public update() {
        if (this.body) {
            this.position = this.body.position;
        }
    }
}
