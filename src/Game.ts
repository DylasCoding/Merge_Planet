import { Application } from "pixi.js";
import { GameScene } from "./scenes/GameScene.ts";
import { GameSession } from "./core/manager/GameSession.ts";
import { SoundManager } from "./core/SoundManager.ts";
import { EventManager } from "./core/event/EventManager.ts";

export class Game {
    private readonly app: Application;
    private gameScene!: GameScene;

    constructor(app: Application) {
        this.app = app;
    }

    public async initialize(): Promise<void> {
        SoundManager.initialize();
        SoundManager.registerEvents();

        EventManager.onGameStart(() => {
            this.reloadGameScene();
        });

        await this.reloadGameScene();

        this.app.ticker.add((ticker) => {
            const deltaTime = ticker.deltaMS / 1000;
            if (this.gameScene) {
                this.gameScene.update(deltaTime);
            }
        });
    }

    private async reloadGameScene(): Promise<void> {
        EventManager.removeAllListenerEvents();
        EventManager.onGameStart(() => {
            this.reloadGameScene();
        });

        SoundManager.registerEvents();

        GameSession.Instance.reset();

        if (this.gameScene) {
            this.app.stage.removeChild(this.gameScene);
            this.gameScene.destroy({ children: true });
        }

        this.gameScene = new GameScene(this.app);
        await this.gameScene.initialize();

        this.app.stage.addChild(this.gameScene);
    }
}
