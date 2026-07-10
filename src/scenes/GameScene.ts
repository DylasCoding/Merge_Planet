import { BaseScene } from "./BaseScene.ts";
import { type Application, Assets, Container } from "pixi.js";
import { HUD } from "../ui/hud/HUD.ts";
import { GameBox } from "../ui/components/GameBox.ts";

export class GameScene extends BaseScene {
    private readonly world = new Container();
    private hud!: HUD;
    private gameBox!: GameBox;

    constructor(app: Application) {
        super(app);
    }

    public async initialize(): Promise<void> {
        await Assets.loadBundle(["ui"]);

        this.gameBox = new GameBox();
        this.gameBox.position.set(this.app.screen.width / 2, this.app.screen.height / 1.65);
        this.world.addChild(this.gameBox);

        this.hud = new HUD(this.app);

        this.addChild(this.world);
        this.addChild(this.hud);
    }

    public update(): void {}
}
