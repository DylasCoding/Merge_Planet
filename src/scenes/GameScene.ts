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
import type { Planet } from "../features/planet/entities/Planet.ts";
import { CollisionManager } from "../core/CollisionManager.ts";
import { MergeManager } from "../core/MergeManager.ts";
import { TimerSpawner } from "../features/planet/spawn/TimerSpawner.ts";
import { SettingsOverlay } from "../ui/settings/SettingsOverlay.ts";
import { SkinShopOverlay } from "../ui/shop/SkinShopOverlay.ts";
import { SkinManager } from "../features/planet/skin/SkinManager.ts";
import { particleManager } from "../core/ParticleManager.ts";
import { ToolController } from "../features/tool/ToolController.ts";
import { ToolManager } from "../features/tool/ToolManager.ts";
import { PickaxeTool } from "../features/tool/tools/PickaxeTool.ts";
import { ToolOverlayWithPickaxe } from "../ui/overlays/ToolOverlayWithPickaxe.ts";
import { ToolType } from "../features/tool/ToolType.ts";

export class GameScene extends BaseScene {
    private readonly world = new Container();

    private hud!: HUD;
    private gameBox!: GameBox;
    private settingsOverlay!: SettingsOverlay;
    private skinShopOverlay!: SkinShopOverlay;

    private planetManager!: PlanetManager;
    private mouseInputManager!: MouseInputManager;
    private interactionManager!: PlanetInteractionManager;
    private planetSpawner!: PlanetSpawner;
    private CollisionManager!: CollisionManager;
    private mergeManager!: MergeManager;
    private particleManager!: particleManager;
    private toolController!: ToolController;
    private toolManager!: ToolManager;
    private pickaxeTool!: PickaxeTool;
    private toolOverlay!: ToolOverlayWithPickaxe;

    private currentDragController: PlanetDragController | null = null;
    private timer!: TimerSpawner;
    private shouldSpawnNext = false;
    private currentPlanet!: Planet;

    constructor(app: Application) {
        super(app);
    }

    public async initialize(): Promise<void> {
        await Assets.loadBundle(["ui", "planets", "particle", "spaces"]);

        this.gameBox = new GameBox();

        this.gameBox.position.set(this.app.screen.width / 2, this.app.screen.height / 1.65);
        this.world.addChild(this.gameBox);
        console.log(this.gameBox.position);

        this.planetManager = new PlanetManager();
        this.CollisionManager = new CollisionManager();
        this.mouseInputManager = new MouseInputManager(this.app, this.gameBox.getBoundsAsObject());
        this.particleManager = new particleManager(this);

        const randomizer = new PlanetRandomizer();
        const queue = new PlanetSpawnQueue(randomizer, 3);
        const factory = new PlanetFactory();

        this.timer = new TimerSpawner();
        this.timer.setTimer(0.7);

        this.toolManager = new ToolManager();
        this.pickaxeTool = new PickaxeTool(this.planetManager);
        this.toolController = new ToolController(this.toolManager, this.pickaxeTool);
        this.toolController.setOnToolFinished(() => {
            this.toolOverlay.hide();
        });

        this.interactionManager = new PlanetInteractionManager(
            this.mouseInputManager,
            this.toolController,
        );

        this.mergeManager = new MergeManager(
            factory,
            this.planetManager,
            this,
            randomizer,
            this.particleManager,
        );

        this.planetSpawner = new PlanetSpawner(
            queue,
            factory,
            this.planetManager,
            this.gameBox.getBoundsAsObject(),
            this.mouseInputManager,
            this.interactionManager,
        );

        this.CollisionManager.setComponentForCollision(
            this.planetManager.planets,
            this.gameBox,
            this.mergeManager,
        );

        this.hud = new HUD(
            this.app,
            this.openSettings.bind(this),
            this.openSkinShop.bind(this),
            () => this.toggleTool(ToolType.Pickaxe),
        );
        this.toolOverlay = new ToolOverlayWithPickaxe();
        this.toolOverlay.redraw(this.app.screen, this.gameBox.getBoundsAsObject());

        this.addChild(this.toolOverlay);
        this.settingsOverlay = new SettingsOverlay(this.app);
        this.skinShopOverlay = new SkinShopOverlay(this.app, this.planetManager);
        SkinManager.getInstance().onSkinChanged = () => {
            this.planetManager.refreshAllPlanetTextures();
        };
        // this.settingsOverlay.show();
        // this.skinShopOverlay.show();

        this.addChild(this.world);
        this.addChild(this.toolOverlay);
        this.addChild(this.hud);

        this.spawnNextPlanet();

        this.mouseInputManager.onMouseClick(() => {
            if (this.toolController.isUsingTool()) {
                return;
            }

            if (this.currentDragController) {
                this.planetManager.setDropPlanet(this.currentPlanet);
                this.currentDragController.endDrag();
                this.shouldSpawnNext = true;
                this.timer.turnTimer();
            }
        });
        this.addChild(this.settingsOverlay);
        this.addChild(this.skinShopOverlay);
    }

    private openSettings(): void {
        this.settingsOverlay.show();
    }

    private openSkinShop(): void {
        this.skinShopOverlay.show();
    }

    private spawnNextPlanet(): void {
        const { planet, dragController } = this.planetSpawner.spawn();
        this.currentPlanet = planet;
        this.world.addChild(planet);

        this.currentDragController = dragController;
        this.interactionManager.setDraggedPlanet(dragController);
    }
    public addPlanet(planet: Planet) {
        this.world.addChild(planet);
    }
    public removePlanet(planet1: Planet, planet2: Planet) {
        this.world.removeChild(planet1);
        this.world.removeChild(planet2);
    }

    private toggleTool(tool: ToolType): void {
        this.toolController.toggleTool(tool);

        if (this.toolController.isUsingTool()) {
            this.toolOverlay.show();
        } else {
            this.toolOverlay.hide();
        }
    }

    public update(deltaTime: number): void {
        if (this.shouldSpawnNext && this.timer.timeUp()) {
            this.timer.turnTimer();
            this.shouldSpawnNext = false;
            this.spawnNextPlanet();
            this.interactionManager.updateDrag();
        }
        this.planetManager.update(deltaTime);
        this.CollisionManager.update();
        this.mergeManager.update();
        this.particleManager.update(deltaTime);
        this.timer.update(deltaTime);
        this.interactionManager.updateDrag();

        if (this.toolOverlay.visible) {
            this.toolOverlay.update(deltaTime);
        }
    }
}
