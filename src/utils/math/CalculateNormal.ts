import type { Planet } from "../../features/planet/entities/Planet";

export class NormalResolve {
    public calculateNormal(planet1: Planet, planet2: Planet) {
        const dx = planet2.planetRigidbody.position.x - planet1.planetRigidbody.position.x;
        const dy = planet2.planetRigidbody.position.y - planet1.planetRigidbody.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance <= 0.00001) return null;
        return {
            nx: dx / distance,
            ny: dy / distance,
            distance,
        };
    }
}
