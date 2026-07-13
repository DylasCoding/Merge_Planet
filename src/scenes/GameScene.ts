import { BaseScene } from "./BaseScene.ts";
import { type Application, Assets, Container } from "pixi.js";
import { HUD } from "../ui/hud/HUD.ts";
import { GameBox } from "../ui/components/GameBox.ts";
import { PlanetFactory } from "../features/planet/factory/PlanetFactory.ts";
import { PlanetManager } from "../features/planet/manager/PlanetManager.ts";
import { PlanetRandomizer } from "../features/planet/random/PlanetRandomizer.ts";
import { PlanetSpawnQueue } from "../features/planet/spawn/PlanetSpawnQueue.ts";
import { MouseInputManager } from "../core/input/MouseInputManager.ts";
import { PlanetInteractionManager } from "../features/planet/interaction/PlanetInteractionManager.ts";
import { PlanetSpawner } from "../features/planet/spawn/PlanetSpawner.ts";
import { PlanetDragController } from "../features/planet/interaction/PlanetDragController.ts";

export class GameScene extends BaseScene {
    private readonly world = new Container();

    private hud!: HUD;
    private gameBox!: GameBox;

    private planetManager!: PlanetManager;
    private mouseInputManager!: MouseInputManager;
    private interactionManager!: PlanetInteractionManager;
    private planetSpawner!: PlanetSpawner;

    private currentDragController: PlanetDragController | null = null;
    private shouldSpawnNext = false;

    constructor(app: Application) {
        super(app);
    }

    public async initialize(): Promise<void> {
        await Assets.loadBundle(["ui", "planets"]);

        this.gameBox = new GameBox();
        this.gameBox.position.set(this.app.screen.width / 2, this.app.screen.height / 1.65);
        this.world.addChild(this.gameBox);

        this.planetManager = new PlanetManager();
        this.mouseInputManager = new MouseInputManager(this.app);
        this.interactionManager = new PlanetInteractionManager(this.mouseInputManager);

        const randomizer = new PlanetRandomizer();
        const queue = new PlanetSpawnQueue(randomizer, 3);
        const factory = new PlanetFactory();

        this.planetSpawner = new PlanetSpawner(
            queue,
            factory,
            this.planetManager,
            this.gameBox.getBoundsAsObject(),
            this.mouseInputManager,
        );

        this.hud = new HUD(this.app);

        this.addChild(this.world);
        this.addChild(this.hud);

        this.spawnNextPlanet();

        this.mouseInputManager.onMouseClick(() => {
            if (this.currentDragController) {
                this.currentDragController.endDrag();
                this.shouldSpawnNext = true;
            }
        });
    }

    private spawnNextPlanet(): void {
        const { planet, dragController } = this.planetSpawner.spawn();
        this.world.addChild(planet);

        this.currentDragController = dragController;
        this.interactionManager.setDraggedPlanet(dragController);
    }

    public update(): void {
        if (this.shouldSpawnNext) {
            this.shouldSpawnNext = false;
            this.spawnNextPlanet();
            this.interactionManager.updateDrag();
        }

        this.interactionManager.updateDrag();
    }
}
