import { BaseScene } from "./BaseScene.ts";
import { Assets, Container } from "pixi.js";
import { HUD } from "../ui/hud/HUD.ts";

export class GameScene extends BaseScene {
    private readonly world = new Container();
    private readonly hud = new HUD();

    public async initialize(): Promise<void> {
        await Assets.loadBundle(["ui", "backgrounds"]);

        this.addChild(this.world);
        this.addChild(this.hud);
    }

    public update(): void {}
}
