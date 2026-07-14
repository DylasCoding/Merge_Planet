import { Graphics, Container, Sprite } from "pixi.js";
import { type Application } from "pixi.js";
import { Button } from "../components/Button.ts";
import { SettingRow } from "./SettingRow.ts";
import { SettingActionButtons } from "./SettingActionButtons.ts";

export class SettingsOverlay extends Container {
    private backdrop: Graphics;
    private panel: Container;
    private closeBtn: Button;
    private actionButtons: SettingActionButtons;
    private app: Application;

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

        const soundRow = new SettingRow("sound_icon", "Sound", 15, (v) => this.onSoundChange(v));
        const musicRow = new SettingRow("music_icon", "Music", 10, (v) => this.onMusicChange(v));

        soundRow.position.set(panelBg.x + 120, panelBg.y + 100);
        musicRow.position.set(panelBg.x + 120, panelBg.y + 150);

        const soundLine = Sprite.from("panel_line");
        soundLine.position.set(musicRow.x - 20, musicRow.y + 60);
        soundLine.scale.set(1.2, 1.2);

        this.actionButtons = new SettingActionButtons(
            () => this.handleRestart(),
            () => this.handleContinue(),
            () => this.handleReturn(),
        );

        const centerX = panelBg.x + (panelBg.width - this.actionButtons.width) / 2 + 80;
        this.actionButtons.position.set(centerX, soundLine.y + soundLine.height + 50);

        this.panel.addChild(
            panelBg,
            this.closeBtn,
            soundRow,
            musicRow,
            soundLine,
            this.actionButtons,
        );
        this.addChild(this.backdrop, this.panel);

        this.visible = false;
    }

    private onSoundChange(value: number): void {}

    private onMusicChange(value: number): void {}

    private handleRestart(): void {
        console.log("Restart game");
    }

    private handleContinue(): void {
        console.log("Continue game");
        // this.hide();
    }

    private handleReturn(): void {
        console.log("Return to Main Menu");
    }

    public show(): void {
        this.visible = true;
    }

    public hide(): void {
        this.visible = false;
    }
}
