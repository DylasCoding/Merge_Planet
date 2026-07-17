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
import { Timer } from "../features/planet/spawn/TimerSpawner.ts";
import { SettingsOverlay } from "../ui/settings/SettingsOverlay.ts";
import { SkinShopOverlay } from "../ui/shop/SkinShopOverlay.ts";
import { SkinManager } from "../features/planet/skin/SkinManager.ts";
import { particleManager } from "../core/ParticleManager.ts";
import { ToolController } from "../features/tool/ToolController.ts";
import { ToolManager } from "../features/tool/ToolManager.ts";
import { PickaxeTool } from "../features/tool/tools/PickaxeTool.ts";
import { ToolOverlayWithPickaxe } from "../ui/overlays/ToolOverlayWithPickaxe.ts";
import { ToolPrice, ToolType } from "../features/tool/ToolType.ts";
import { GameOverOverlay } from "../ui/GameOverOverlay.ts";
import { EventBus, GameEvent } from "../core/event/GameEvent.ts";
import { WarningLine } from "../ui/components/WarningLine.ts";
import { PickaxeEffect } from "../features/tool/effects/PickaxeEffect.ts";
import { ShakeBoxEffect } from "../features/tool/effects/ShakeBoxEffect.ts";
import { ShuffleTool } from "../features/tool/tools/ShuffleTool.ts";
import { PickaxeCursor } from "../features/tool/effects/PickaxeCursor.ts";
import { StorageManager } from "../core/manager/StorageManager.ts";

export class GameScene extends BaseScene {
    private readonly world = new Container();

    private hud!: HUD;
    private gameBox!: GameBox;
    private warningLine!: WarningLine;
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

    private pickaxeEffect!: PickaxeEffect;
    private pickaxeCursor!: PickaxeCursor;
    private shuffleTool!: ShuffleTool;
    private shakeBoxEffect!: ShakeBoxEffect;
    private isShuffling = false;

    private currentDragController: PlanetDragController | null = null;
    private timer!: Timer;
    private shouldSpawnNext = false;
    private currentPlanet!: Planet;

    private isInputLocked = false;
    private isGameOver = false;

    private gameOverOverlay!: GameOverOverlay;

    constructor(app: Application) {
        super(app);
    }

    public async initialize(): Promise<void> {
        await Assets.loadBundle(["ui", "planets", "particle", "spaces"]);

        this.pickaxeCursor = new PickaxeCursor();
        this.app.stage.addChild(this.pickaxeCursor);

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

        this.timer = new Timer();
        this.timer.setTimer(0.6);

        this.toolManager = new ToolManager();
        this.pickaxeTool = new PickaxeTool(this.planetManager);
        this.pickaxeEffect = new PickaxeEffect();
        this.shuffleTool = new ShuffleTool(this.planetManager);
        this.shakeBoxEffect = new ShakeBoxEffect(this.gameBox);
        this.toolController = new ToolController(
            this.toolManager,
            this.pickaxeTool,
            this.pickaxeEffect,
            this.pickaxeCursor,
            this.shuffleTool,
            this.shakeBoxEffect,
        );
        this.toolController.setOnToolFinished(() => {
            this.toolOverlay.hide();
        });

        this.interactionManager = new PlanetInteractionManager(
            this.mouseInputManager,
            this.toolController,
        );

        this.interactionManager.isLockedCheck = () => this.isInputLocked;

        this.mergeManager = new MergeManager(
            factory,
            this.planetManager,
            this,
            randomizer,
            this.particleManager,
            this.interactionManager,
        );

        this.planetSpawner = new PlanetSpawner(
            queue,
            factory,
            this.planetManager,
            this.gameBox.getBoundsAsObject(),
            this.mouseInputManager,
            this.interactionManager,
        );
        this.warningLine = new WarningLine(
            this.gameBox.getBoundsAsObject().x,
            this.gameBox.getBoundsAsObject().y + 30,
        );
        this.addChild(this.warningLine);
        this.CollisionManager.setComponentForCollision(
            this.planetManager.planets,
            this.gameBox,
            this.mergeManager,
            this.warningLine,
        );

        this.hud = new HUD(
            this.app,
            this.openSettings.bind(this),
            this.openSkinShop.bind(this),
            () => this.toggleTool(ToolType.Pickaxe),
            () => {
                if (this.toolController.isUsingTool()) {
                    return;
                }
                this.warningLine.turnWorking();

                this.onShuffleClick();
            },
        );
        this.toolOverlay = new ToolOverlayWithPickaxe();
        this.toolOverlay.redraw(this.app.screen, this.gameBox.getBoundsAsObject());

        this.gameOverOverlay = new GameOverOverlay(this.app);

        // this.triggerGameOver(100);

        this.settingsOverlay = new SettingsOverlay(this.app);
        this.settingsOverlay.onClose = () => {
            this.blockInput();
        };
        this.skinShopOverlay = new SkinShopOverlay(this.app, this.planetManager);
        this.skinShopOverlay.onClose = () => {
            this.blockInput();
        };
        SkinManager.getInstance().onSkinChanged = () => {
            this.planetManager.refreshAllPlanetTextures();
        };
        // this.settingsOverlay.show();
        // this.skinShopOverlay.show();

        this.addChild(this.world);
        this.addChild(this.pickaxeEffect);
        this.addChild(this.toolOverlay);
        this.addChild(this.hud);

        this.spawnNextPlanet();

        this.mouseInputManager.onMouseClick(() => {
            if (this.isInputLocked) {
                return;
            }

            if (this.toolController.isUsingTool()) {
                return;
            }

            if (this.isShuffling) {
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
        this.addChild(this.gameOverOverlay);

        EventBus.instance.on(GameEvent.GameOver, (finalScore: number) => {
            this.triggerGameOver(finalScore);
        });
    }

    private openSettings(): void {
        this.settingsOverlay.show();
        this.isInputLocked = true;
    }

    private openSkinShop(): void {
        this.skinShopOverlay.show();
        this.isInputLocked = true;
    }

    private blockInput(): void {
        setTimeout(() => {
            this.isInputLocked = false;
        }, 50);
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
        if (this.isShuffling) {
            return;
        }

        if (StorageManager.gems < ToolPrice[ToolType.Pickaxe]) {
            return;
        }

        this.toolController.toggleTool(tool);

        if (this.toolController.isUsingTool()) {
            this.toolOverlay.show();
        } else {
            this.toolOverlay.hide();
        }
    }

    private async onShuffleClick(): Promise<void> {
        if (StorageManager.gems < ToolPrice[ToolType.Shuffle]) {
            this.warningLine.turnWorking();
            return;
        }
        this.isShuffling = true;
        StorageManager.updateGems(-ToolPrice[ToolType.Shuffle]);
        EventBus.instance.emit(GameEvent.GemChanged, StorageManager.gems);
        await this.toolController.useShuffle();
        this.isShuffling = false;
        this.warningLine.turnWorking();
    }

    public triggerGameOver(finalScore: number): void {
        this.isInputLocked = true;
        this.isGameOver = true;

        if (this.currentDragController) {
            this.currentDragController.endDrag();
            this.currentDragController = null;
        }

        if (this.currentPlanet) {
            this.currentPlanet.visible = false;
        }

        this.gameOverOverlay.setScore(finalScore);
        this.gameOverOverlay.show();
    }

    public update(deltaTime: number): void {
        if (!this.isShuffling && this.shouldSpawnNext && this.timer.timeUp()) {
            this.timer.turnTimer();
            this.shouldSpawnNext = false;
            this.spawnNextPlanet();
            this.interactionManager.updateDrag();
        }
        this.gameBox.update();

        this.planetManager.update(deltaTime);
        this.CollisionManager.update();
        this.mergeManager.update();
        this.particleManager.update(deltaTime);
        this.timer.update(deltaTime);
        this.interactionManager.updateDrag();
        if (!this.isGameOver) {
            this.warningLine.update(deltaTime);
        }

        if (this.toolOverlay.visible) {
            this.toolOverlay.update(deltaTime);
        }

        if (this.pickaxeCursor.visible) {
            const mouse = this.mouseInputManager.getMousePosition();
            this.pickaxeCursor.follow(mouse.x, mouse.y);
        }

        this.gameOverOverlay.update(deltaTime);
    }
}
