import { Vector2 } from "../../utils/math/Vector2";
import type { Planet } from "../planet/entities/Planet";
import { PlanetFactory } from "../planet/factory/PlanetFactory";
import { GameSession } from "../../core/manager/GameSession.ts";
import { StorageManager } from "../../core/manager/StorageManager.ts";
import { EventManager } from "../../core/event/EventManager.ts";

export class MergePlanet {
    planetFactory: PlanetFactory;
    constructor(planetFactory: PlanetFactory) {
        this.planetFactory = planetFactory;
    }

    public mergePlanet(planet1: Planet, planet2: Planet) {
        const x = (planet1.planetRigidbody.position.x + planet2.planetRigidbody.position.x) / 2;

        const y =
            (planet1.planetRigidbody.position.y + planet2.planetRigidbody.position.y) / 2 -
            planet1.data.radius * 0.8;

        EventManager.planetMerged();

        GameSession.Instance.score = (planet1.data.level + planet2.data.level) * 10;
        this.updateHighScore(GameSession.Instance.score);

        const MergePlanetPosition = new Vector2(x, y);
        let newLevel = planet1.data.level + 1;
        if (newLevel > 10) {
            newLevel = 10;
        }
        return this.planetFactory.create({
            level: newLevel,
            position: MergePlanetPosition,
        });
    }

    private updateHighScore(score: number): void {
        if (score > StorageManager.highScore) {
            StorageManager.updateHighScore(score);
        }
    }
}
