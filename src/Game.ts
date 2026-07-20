import { Application } from "pixi.js";
import { GameScene } from "./scenes/GameScene.ts";
import { EventBus, GameEvent } from "./core/event/GameEvent.ts";
import { GameSession } from "./core/manager/GameSession.ts";
import { SoundManager } from "./core/SoundManager.ts";
import { StorageManager } from "./core/manager/StorageManager.ts";

export class Game {
    private readonly app: Application;
    private gameScene!: GameScene;

    constructor(app: Application) {
        this.app = app;
    }

    public async initialize(): Promise<void> {
        SoundManager.initialize();
        SoundManager.registerEvents();

        EventBus.instance.on(GameEvent.GameStart, this.resstartGameScene, this);

        await this.reloadGameScene();

        this.app.ticker.add((ticker) => {
            const deltaTime = ticker.deltaMS / 1000;
            if (this.gameScene) {
                this.gameScene.update(deltaTime);
            }
        });
    }

    private async reloadGameScene(): Promise<void> {
        EventBus.instance.removeAllListeners();
        EventBus.instance.on(GameEvent.GameStart, this.resstartGameScene, this);

        SoundManager.registerEvents();

        GameSession.Instance.reset();
        StorageManager.resetData();
        if (this.gameScene) {
            this.app.stage.removeChild(this.gameScene);
            this.gameScene.destroy({ children: true });
        }

        this.gameScene = new GameScene(this.app);
        await this.gameScene.initialize();

        this.app.stage.addChild(this.gameScene);
    }

    private async resstartGameScene(): Promise<void> {
        EventBus.instance.removeAllListeners();
        EventBus.instance.on(GameEvent.GameStart, this.resstartGameScene, this);

        SoundManager.registerEvents();

        GameSession.Instance.reset();
        StorageManager.resetData();

        if (this.gameScene) {
            this.app.stage.removeChild(this.gameScene);
            this.gameScene.destroy({ children: true });
        }

        this.gameScene = new GameScene(this.app);
        await this.gameScene.initialize();

        this.app.stage.addChild(this.gameScene);
    }
}
