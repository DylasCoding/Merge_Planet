import { type Application, Container, Graphics, Sprite } from "pixi.js";
import { Button } from "../components/common/Button.ts";
import { SkinContainer } from "./SkinContainer.ts";
import { ScaleUtils } from "../../utils/ScaleUtils.ts";
import type { PlanetManager } from "../../features/planet/manager/PlanetManager.ts";
import { SKIN_LIST } from "../../features/planet/data/SkinConfig.ts";

export class SkinShopOverlay extends Container {
    private app: Application;
    private backdrop: Graphics;
    private panel: Container;
    private closeBtn: Button;
    private skinContainer: SkinContainer;
    private planetManager: PlanetManager;

    public onClose?: () => void;

    constructor(app: Application, planetManager: PlanetManager) {
        super();

        this.app = app;
        this.planetManager = planetManager;

        this.backdrop = new Graphics()
            .rect(0, 0, this.app.screen.width, this.app.screen.height)
            .fill({ color: 0x000000, alpha: 0.3 });

        this.backdrop.eventMode = "static";
        this.backdrop.on("pointerdown", (e) => e.stopPropagation());

        this.panel = new Container();
        const panelBg = Sprite.from("setting_panel");
        panelBg.anchor.set(0);
        panelBg.position.set(this.app.screen.width / 6 + 70, 100);

        const panelScale = ScaleUtils.getScaleByTargetWidth(this.app, panelBg.width, 0.6);
        panelBg.scale.set(panelScale);

        this.closeBtn = new Button("", Sprite.from("setting_close"));
        this.closeBtn.scale.set(1);
        this.closeBtn.position.set(panelBg.x + panelBg.width - this.closeBtn.width, panelBg.y + 30);
        this.closeBtn.eventMode = "static";
        this.closeBtn.onClick(() => {
            this.hide();
        });

        this.panel.addChild(panelBg, this.closeBtn);

        this.skinContainer = new SkinContainer(
            this.app,
            Sprite.from("shop_bg"),
            Sprite.from("planet1"),
            "Skin Name",
            100,
            "planets",
        );

        const columns = 4;
        const paddingX = 70;

        const startX = panelBg.x + paddingX;
        const startY = panelBg.y + 100;

        const availableWidth = panelBg.width - paddingX * 2;

        const itemWidth = this.skinContainer.width;
        const itemHeight = this.skinContainer.height;

        const spacingX = (availableWidth - columns * itemWidth) / (columns - 1);
        const spacingY = 20;

        SKIN_LIST.forEach((skinInfo, i) => {
            const col = i % columns;
            const row = Math.floor(i / columns);
            const x = panelBg.x + paddingX + col * (itemWidth + spacingX);
            const y = startY + row * (itemHeight + spacingY);

            const skinContainer = this.createSkinContainer(
                x,
                y,
                skinInfo.id,
                skinInfo.name,
                skinInfo.icon,
                skinInfo.price,
            );

            this.panel.addChild(skinContainer);
        });

        this.addChild(this.backdrop, this.panel);

        this.visible = false;
    }

    public show(): void {
        this.visible = true;
    }

    public hide(): void {
        this.visible = false;
        if (this.onClose) this.onClose();
    }

    private createSkinContainer(
        x: number,
        y: number,
        bundleId: string,
        name: string,
        iconKey: string,
        price: number,
    ): SkinContainer {
        const skinContainer = new SkinContainer(
            this.app,
            Sprite.from("shop_bg"),
            Sprite.from(iconKey),
            name,
            price,
            bundleId,
        );
        skinContainer.position.set(x, y);
        return skinContainer;
    }
}
