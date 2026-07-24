import { Container, Text, Sprite } from "pixi.js";
import { Font } from "../../core/Font.ts";
import { StorageManager } from "../../core/manager/StorageManager.ts";
import { EventManager } from "../../core/event/EventManager.ts";

export class ScoreView extends Container {
    private readonly scoreText: Text;
    private readonly highScoreText: Text;

    constructor() {
        super();

        const highScoreBg = Sprite.from("score_bg");
        const highScoreIcon = Sprite.from("highscore_icon");

        this.highScoreText = new Text({
            text: StorageManager.highScore.toString(),
            style: {
                fontFamily: Font.Righteous_Regular,
                fill: 0xffa500,
                fontSize: 32,
                fontWeight: "bold",
            },
        });

        highScoreBg.scale.set(0.2, 0.3);
        highScoreIcon.scale.set(0.65);

        highScoreBg.anchor.set(0.5, 0);
        highScoreIcon.anchor.set(0.5);
        this.highScoreText.anchor.set(0, 0.5);

        highScoreBg.position.set(0, 0);
        highScoreIcon.position.set(-55, highScoreBg.height * 0.5);
        this.highScoreText.position.set(-30, highScoreBg.height * 0.55);

        const bg = Sprite.from("score_bg");
        const icon = Sprite.from("score_star");

        this.scoreText = new Text({
            text: StorageManager.currentScore.toString(),
            style: {
                fontFamily: Font.Righteous_Regular,
                fill: 0xffffb3,
                fontSize: 24,
            },
        });

        bg.scale.set(0.45, 0.5);
        icon.scale.set(0.5);

        bg.anchor.set(0.5, 0);
        icon.anchor.set(0.5);
        this.scoreText.anchor.set(0, 0.5);

        const scoreY = highScoreBg.height - 5;

        bg.position.set(0, scoreY);
        icon.position.set(-45, scoreY + bg.height * 0.5);
        this.scoreText.position.set(-25, scoreY + bg.height * 0.5);

        this.addChild(highScoreIcon, this.highScoreText, icon, this.scoreText);

        EventManager.onScoreChanged((score) => {
            this.setScoreText(score);
        });

        EventManager.onHighScoreChanged((score) => {
            this.setHighScoreText(score);
        });
    }

    public setScoreText(score: number): void {
        this.scoreText.text = score.toString();
    }

    public setHighScoreText(highScore: number): void {
        this.highScoreText.text = highScore.toString();
    }
}
