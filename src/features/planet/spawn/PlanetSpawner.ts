import { Vector2 } from "../../../utils/math/Vector2";
import { Planet } from "../entities/Planet";
import { PlanetFactory } from "../factory/PlanetFactory";
import { PlanetManager } from "../manager/PlanetManager";
import { PlanetSpawnQueue } from "./PlanetSpawnQueue";

export class PlanetSpawner {
    private readonly queue: PlanetSpawnQueue;
    private readonly factory: PlanetFactory;
    private readonly manager: PlanetManager;

    constructor(queue: PlanetSpawnQueue, factory: PlanetFactory, manager: PlanetManager) {
        this.queue = queue;
        this.factory = factory;
        this.manager = manager;
    }

    public spawn(position: Vector2): Planet {
        const level = this.queue.takeNextLevel();

        const planet = this.factory.create({
            level,
            position,
        });

        this.manager.add(planet);

        return planet;
    }
}
