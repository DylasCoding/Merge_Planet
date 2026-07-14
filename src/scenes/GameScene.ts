import { BaseScene } from "./BaseScene.ts";
import { type Application, Assets, Container } from "pixi.js";
import { HUD } from "../ui/hud/HUD.ts";
import { GameBox } from "../ui/components/GameBox.ts";
import { SettingsOverlay } from "../ui/settings/SettingsOverlay.ts";
import { SkinShopOverlay } from "../ui/shop/SkinShopOverlay.ts";

export class GameScene extends BaseScene {
    private readonly world = new Container();
    private hud!: HUD;
    private gameBox!: GameBox;
    private settingsOverlay!: SettingsOverlay;
    private skinShopOverlay!: SkinShopOverlay;

    constructor(app: Application) {
        super(app);
    }

    public async initialize(): Promise<void> {
        await Assets.loadBundle(["ui"]);

        this.gameBox = new GameBox();
        this.gameBox.position.set(this.app.screen.width / 2, this.app.screen.height / 1.65);
        this.world.addChild(this.gameBox);

        this.hud = new HUD(this.app, this.openSettings.bind(this), this.openSkinShop.bind(this));
        this.settingsOverlay = new SettingsOverlay(this.app);
        this.skinShopOverlay = new SkinShopOverlay(this.app);
        // this.settingsOverlay.show();
        this.skinShopOverlay.show();

        this.addChild(this.world);
        this.addChild(this.hud);
        this.addChild(this.settingsOverlay);
        this.addChild(this.skinShopOverlay);
    }

    private openSettings(): void {
        this.settingsOverlay.show();
    }

    private openSkinShop(): void {
        this.skinShopOverlay.show();
    }

    public update(): void {}
}
