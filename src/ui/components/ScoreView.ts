import { Container, Text, Sprite } from "pixi.js";

export class ScoreView extends Container {
    private readonly scoreText: Text;

    constructor() {
        super();

        const bg = Sprite.from("score_bg");
        const icon = Sprite.from("score_star");

        this.scoreText = new Text({
            text: "0",
            style: {
                fill: 0xffffff,
            },
        });

        bg.scale.x = 0.45;
        bg.scale.y = 0.5;
        icon.scale.set(0.5);

        bg.anchor.set(0.5, 0);
        icon.anchor.set(0.5);

        this.scoreText.anchor.set(0, 0.5);

        bg.position.set(0, 0);
        icon.position.set(-45, bg.height * 0.5);
        this.scoreText.position.set(-25, bg.height * 0.5);

        this.addChild(icon, this.scoreText);
    }

    public setScoreText(score: number): void {
        this.scoreText.text = score.toString();
    }
}
