import type { Planet } from "../../features/planet/entities/Planet";

export class ImpulseResolve {
    public calculateImpulse(planet1: Planet, planet2: Planet, nx: number, ny: number) {
        const InverseMass1 = 1 / planet1.data.mass;
        const InverseMass2 = 1 / planet2.data.mass;

        const rvx = planet2.planetRigidbody.velocity.x - planet1.planetRigidbody.velocity.x;
        const rvy = planet2.planetRigidbody.velocity.y - planet1.planetRigidbody.velocity.y;

        const nvelocity = rvx * nx + rvy * ny;

        if (nvelocity > 0) return null;
        let eRestutition = Math.min(
            planet2.planetRigidbody.restitution,
            planet1.planetRigidbody.restitution,
        );
        if (Math.abs(nvelocity) < 1.0) {
            eRestutition = 0.0;
        }
        const j = (-(1 + eRestutition) * nvelocity) / (InverseMass1 + InverseMass2);
        const impulseX = j * nx;
        const impulseY = j * ny;

        return {
            impulseX,
            impulseY,
            j,
        };
    }
}
