import { Vector2 } from "../../../utils/math/Vector2";
import { Planet } from "../entities/Planet";
import { PlanetFactory } from "../PlanetFactory.ts";
import { PlanetManager } from "../PlanetManager.ts";
import { PlanetSpawnQueue } from "./PlanetSpawnQueue";
import { PlanetDragController } from "../interaction/PlanetDragController";
import { type IMouseTracker } from "../../../core/input/IMouseTracker.ts";
import type { PlanetInteractionManager } from "../interaction/PlanetInteractionManager.ts";

export class PlanetSpawner {
    private readonly queue: PlanetSpawnQueue;
    private readonly factory: PlanetFactory;
    private readonly manager: PlanetManager;
    private readonly bounds: { x: number; y: number; width: number; height: number };
    private readonly mouseTracker: IMouseTracker;
    private readonly interactionManager: PlanetInteractionManager;

    constructor(
        queue: PlanetSpawnQueue,
        factory: PlanetFactory,
        manager: PlanetManager,
        bounds: { x: number; y: number; width: number; height: number },
        mouseTracker: IMouseTracker,
        interactionManager: PlanetInteractionManager,
    ) {
        this.queue = queue;
        this.factory = factory;
        this.manager = manager;
        this.bounds = bounds;
        this.mouseTracker = mouseTracker;
        this.interactionManager = interactionManager;
    }

    public spawn(position?: Vector2): { planet: Planet; dragController: PlanetDragController } {
        const level = this.queue.takeNextLevel();

        const spawnPosition =
            position ??
            new Vector2(
                this.bounds.x + this.bounds.width / 2,
                this.bounds.y - 70,
            );

        const planet = this.factory.create({
            level,
            position: spawnPosition,
        });

        this.interactionManager.registerPlanet(planet);
        planet.planetRigidbody.isSleeping = false;
        planet.planetRigidbody.sleepTimer = 0;
        const dragController = new PlanetDragController(planet, this.mouseTracker, this.bounds);

        this.manager.add(planet);

        return { planet, dragController };
    }
}
