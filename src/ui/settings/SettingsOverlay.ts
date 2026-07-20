import { Graphics, Container, Sprite } from "pixi.js";
import { type Application } from "pixi.js";
import { Button } from "../components/common/Button.ts";
import { SettingRow } from "./SettingRow.ts";
import { SettingActionButtons } from "./SettingActionButtons.ts";
// import { EventBus, GameEvent } from "../../core/GameEvent.ts";
import { StorageManager } from "../../core/manager/StorageManager.ts";
import { ScaleUtils } from "../../utils/ScaleUtils.ts";
import { EventManager } from "../../core/event/EventManager.ts";

export class SettingsOverlay extends Container {
    private backdrop: Graphics;
    private panel: Container;
    private closeBtn: Button;
    private actionButtons: SettingActionButtons;
    private app: Application;

    public onClose?: () => void;

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
        const targetWidth = this.app.screen.width * 0.6;
        const scale = targetWidth / panelBg.width;

        panelBg.scale.set(scale);
        this.closeBtn = new Button("", Sprite.from("setting_close"));
        this.closeBtn.scale.set(1);
        this.closeBtn.position.set(panelBg.x + panelBg.width - this.closeBtn.width, panelBg.y + 30);
        this.closeBtn.eventMode = "static";
        this.closeBtn.onClick(() => {
            this.hide();
        });

        const initialSoundStep = Math.round(StorageManager.soundVolume * 20);
        const initialMusicStep = Math.round(StorageManager.musicVolume * 20);

        const soundRow = new SettingRow(this.app, "sound_icon", "Sound", initialSoundStep, (v) =>
            this.onSoundChange(v),
        );
        const musicRow = new SettingRow(this.app, "music_icon", "Music", initialMusicStep, (v) =>
            this.onMusicChange(v),
        );

        soundRow.position.set(panelBg.x + 120, panelBg.y + 100);
        musicRow.position.set(panelBg.x + 120, panelBg.y + 150);

        const soundLine = Sprite.from("panel_line");
        soundLine.position.set(musicRow.x - 20, musicRow.y + 60);
        const linescale = ScaleUtils.getScaleByTargetWidth(this.app, soundLine.width, 0.47);
        soundLine.scale.set(linescale, linescale);

        this.actionButtons = new SettingActionButtons(
            () => this.handleRestart(),
            () => this.handleContinue(),
            () => this.handleReturn(),
        );

        const centerX = panelBg.x + (panelBg.width - this.actionButtons.width) / 2 + 80;
        this.actionButtons.position.set(centerX, soundLine.y + soundLine.height * 20);

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

    private onSoundChange(value: number): void {
        StorageManager.updateSoundVolume(value);
    }

    private onMusicChange(value: number): void {
        StorageManager.updateMusicVolume(value);
    }

    private handleRestart(): void {
        // EventBus.instance.emit(GameEvent.GameStart);
        EventManager.gameStart();
    }

    private handleContinue(): void {
        this.hide();
    }

    private handleReturn(): void {
        this.hide();
    }

    public show(): void {
        this.visible = true;
    }

    public hide(): void {
        this.visible = false;
        if (this.onClose) this.onClose();
    }
}
