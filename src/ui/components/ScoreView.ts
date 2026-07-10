import { Container, Assets, Text, Sprite } from "pixi.js";

export class ScoreView extends Container {
    private readonly scoreText: Text;

    constructor() {
        super();

        const bg = Sprite.from("score_bg");
        const icon = Sprite.from("score_star");

        this.scoreText = new Text({
            text: "0",
            style: { fill: 0xffffff },
        });

        this.scoreText.position.set(10, 10);

        bg.scale.set(0.5);
        icon.scale.set(0.5);

        bg.anchor.set(0, 0);
        icon.anchor.set(-0.5, -0.5);
        this.scoreText.anchor.set(-2.5, -0.25);

        this.addChild(bg, this.scoreText, icon);
    }

    public setScoreText(score: number): void {
        this.scoreText.text = score.toString();
    }
}
