import { Application } from "pixi.js";
import { GameScene } from "./scenes/GameScene.ts";

export class Game {
    private readonly app: Application;
    private readonly gameScene: GameScene;

    constructor(app: Application) {
        this.app = app;
        this.gameScene = new GameScene(this.app);
    }

    public async initialize(): Promise<void> {
        await this.gameScene.initialize();

        this.app.stage.addChild(this.gameScene);

        this.app.ticker.add(() => {
            this.gameScene.update();
        });
    }
}
