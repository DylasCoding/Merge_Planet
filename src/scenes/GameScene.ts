import { BaseScene } from "./BaseScene.ts";
import { type Application, Assets, Container } from "pixi.js";
import { HUD } from "../ui/hud/HUD.ts";

export class GameScene extends BaseScene {
    private readonly world = new Container();
    private hud!: HUD;

    constructor(app: Application) {
        super(app);
    }

    public async initialize(): Promise<void> {
        await Assets.loadBundle(["ui", "backgrounds"]);

        this.hud = new HUD(this.app);

        this.addChild(this.world);
        this.addChild(this.hud);
    }

    public update(): void {}
}
