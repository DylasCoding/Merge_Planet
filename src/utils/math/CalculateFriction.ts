import type { Planet } from "../../features/planet/entities/Planet";

export class FrictionResolve {
    public calculateFriction(planet1: Planet, planet2: Planet, nx: number, ny: number, j: number) {
        const InverseMass1 = 1 / planet1.data.mass;
        const InverseMass2 = 1 / planet2.data.mass;

        const rvx = planet2.planetRigidbody.velocity.x - planet1.planetRigidbody.velocity.x;
        const rvy = planet2.planetRigidbody.velocity.y - planet1.planetRigidbody.velocity.y;
        const tx = -ny;
        const ty = nx;
        const tVelocity = rvx * tx + rvy * ty;
        let jt = -tVelocity / (InverseMass1 + InverseMass2);
        const mu = 0.05;
        const maxFriction = mu * j;
        jt = Math.max(-maxFriction, Math.min(maxFriction, jt));
        const frictionX = jt * tx;
        const frictionY = jt * ty;
        return {
            frictionX,
            frictionY,
        };
    }
}
