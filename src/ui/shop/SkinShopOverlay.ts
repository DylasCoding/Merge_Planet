import { type Application, Container, Graphics, Sprite } from "pixi.js";
import { Button } from "../components/Button.ts";

export class SkinShopOverlay extends Container {
    private app: Application;
    private backdrop: Graphics;
    private panel: Container;
    private closeBtn: Button;

    constructor(app: Application) {
        super();

        this.app = app;

        this.backdrop = new Graphics()
            .rect(0, 0, this.app.screen.width, this.app.screen.height)
            .fill({ color: 0x000000, alpha: 0.3 });

        this.backdrop.eventMode = "static";
        this.backdrop.on("pointerdown", (e) => e.stopPropagation());

        this.panel = new Container();
        const panelBg = Sprite.from("setting_panel");
        panelBg.anchor.set(0);
        panelBg.position.set(this.app.screen.width / 6 + 50, 100);
        panelBg.scale.set(0.6, 0.6);

        this.closeBtn = new Button("", Sprite.from("setting_close"));
        this.closeBtn.scale.set(1);
        this.closeBtn.position.set(panelBg.x + panelBg.width - this.closeBtn.width, panelBg.y + 30);
        this.closeBtn.eventMode = "static";
        this.closeBtn.onClick(() => {
            this.hide();
        });

        this.panel.addChild(panelBg, this.closeBtn);
        this.addChild(this.backdrop, this.panel);

        this.visible = false;
    }

    public show(): void {
        this.visible = true;
    }

    public hide(): void {
        this.visible = false;
    }
}
