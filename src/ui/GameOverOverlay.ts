import { type Application, Container, Graphics, Sprite, Text, TextStyle } from "pixi.js";
import { Button } from "./components/common/Button.ts";
import { ScaleUtils } from "../utils/ScaleUtils.ts";
import { Font } from "../core/Font.ts";
import { gsap } from "gsap/gsap-core";
import { EventManager } from "../core/event/EventManager.ts";

export class GameOverOverlay extends Container {
    private app: Application;
    private backdrop: Graphics;
    private panel: Container;
    private scoreValueText: Text;
    private restartBtn: Button;

    private isAnimating = false;
    private animationTime = 0;

    // public onGameOver: () => void;

    constructor(app: Application) {
        super();

        this.app = app;

        this.backdrop = new Graphics()
            .rect(0, 0, this.app.screen.width, this.app.screen.height)
            .fill({ color: 0x000000, alpha: 0.8 });

        this.backdrop.eventMode = "static";
        this.backdrop.on("pointerdown", (e) => e.stopPropagation());
        this.backdrop.on("pointerup", (e) => e.stopPropagation());
        this.backdrop.on("pointerupoutside", (e) => e.stopPropagation());
        this.backdrop.on("pointertap", (e) => e.stopPropagation());

        this.panel = new Container();

        const panelBg = Sprite.from("game_over_bg");

        const panelScale = ScaleUtils.getScaleByTargetWidth(this.app, panelBg.width, 0.5);
        panelBg.scale.set(panelScale);

        const realWidth = panelBg.width * panelScale;
        const realHeight = panelBg.height * panelScale;

        this.panel.position.set(
            (this.app.screen.width - realWidth * 1.7) / 2,
            (this.app.screen.height - realHeight) / 2,
        );

        const titleStyle = new TextStyle({
            fontFamily: Font.Asap_Bold,
            fontSize: 48,
            fontWeight: "bold",
            fill: "#ffffff",
            stroke: { color: "#000000", width: 6 },
        });
        const titleText = new Text({ text: "GAME OVER", style: titleStyle });
        titleText.anchor.set(0);
        titleText.position.set(realWidth / 2.2, 0);

        const scoreTitleStyle = new TextStyle({
            fontFamily: Font.Asap_Bold,
            fontSize: 28,
            fill: "#ffcc00",
            stroke: { color: "#000000", width: 4 },
        });
        const scoreTitle = new Text({ text: "SCORE", style: scoreTitleStyle });
        scoreTitle.anchor.set(0.5);
        scoreTitle.position.set(titleText.x + titleText.width / 2, realHeight / 2);

        const scoreValueStyle = new TextStyle({
            fontFamily: Font.Asap_Bold,
            fontSize: 64,
            fontWeight: "bold",
            fill: "#ffffff",
            stroke: { color: "#000000", width: 5 },
        });
        this.scoreValueText = new Text({ text: "0", style: scoreValueStyle });
        this.scoreValueText.anchor.set(0.5);
        this.scoreValueText.position.set(
            titleText.x + titleText.width / 2,
            scoreTitle.y + scoreTitle.height * 1.5,
        );

        this.restartBtn = new Button("RESTART", Sprite.from("button_purple"));
        this.restartBtn.setButtonScale(
            ScaleUtils.getScaleByTargetWidth(this.app, this.restartBtn.width, 0.08),
        );

        this.restartBtn.position.set(
            this.scoreValueText.position.x,
            this.scoreValueText.y + this.restartBtn.height * 2,
        );

        this.onRestartClick();

        this.panel.addChild(panelBg, titleText, scoreTitle, this.scoreValueText, this.restartBtn);

        this.addChild(this.backdrop, this.panel);
        this.visible = false;
    }

    public setScore(score: number): void {
        this.scoreValueText.text = score.toString();
    }

    public onRestartClick(): void {
        this.restartBtn.onClick(() => {
            this.hide();
            // EventBus.instance.emit(GameEvent.GameStart);
            EventManager.gameStart();
        });
    }

    public show(): void {
        this.visible = true;
        this.eventMode = "static";

        this.backdrop.alpha = 0;
        this.panel.scale.set(0);

        this.animationTime = 0;
        this.isAnimating = true;

        gsap.to(this.backdrop, {
            alpha: 0.8,
            duration: 0.3,
        });

        gsap.to(this.panel.scale, {
            x: 1,
            y: 1,
            duration: 0.6,
            ease: "back.out(2)",
        });
    }

    public hide(): void {
        this.visible = false;
        this.eventMode = "none";
    }

    public update(deltaTime: number): void {
        if (!this.isAnimating) return;
        this.animationTime += deltaTime;
    }
}
