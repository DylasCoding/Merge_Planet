import { Vector2 } from "../../utils/math/Vector2";
import type { Planet } from "../planet/entities/Planet";
import { PlanetFactory } from "../planet/factory/PlanetFactory";

export class MergePlanet {
    planetFactory: PlanetFactory;
    constructor(planetFactory: PlanetFactory) {
        this.planetFactory = planetFactory;
    }

    public mergePlanet(planet1: Planet, planet2: Planet) {
        const x = (planet1.planetRigidbody.position.x + planet2.planetRigidbody.position.x) / 2;

        const y = (planet1.planetRigidbody.position.y + planet2.planetRigidbody.position.y) / 2;

        const MergePlanetPosition = new Vector2(x, y);
        const newLevel = planet1.data.level + 1;
        return this.planetFactory.create({
            level: newLevel,
            position: MergePlanetPosition,
        });
    }
}
