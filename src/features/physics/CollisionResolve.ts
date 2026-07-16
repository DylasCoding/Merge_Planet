import type { GameBox } from "../../ui/components/GameBox";

import type { Planet } from "../planet/entities/Planet";
import { ApplylingResolve } from "./ApplyingResolve";

export class CollisionResolve {
    public applyingResolve: ApplylingResolve = new ApplylingResolve();

    resolvePlanetWithBox(planet: Planet, gameBox: GameBox) {
        this.applyingResolve.applyResolvePlanetwithBox(planet, gameBox);
    }
    resolvePlanetWithPlanet(planet1: Planet, planet2: Planet) {
        const normal = this.calculateNormal(planet1, planet2);

        if (!normal) return;
        this.applyingResolve.applyPositionCorrection(planet1, planet2, normal);

        const j = this.applyingResolve.applyingImpulse(planet1, planet2, normal);

        if (j === null) return;

        this.applyingResolve.applyFriction(planet1, planet2, normal, j);
    }

    private calculateNormal(planet1: Planet, planet2: Planet) {
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
