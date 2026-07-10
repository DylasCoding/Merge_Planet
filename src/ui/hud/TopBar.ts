import * as PIXI from "pixi.js";
import { ScoreView } from "../components/ScoreView.ts";

export class TopBar extends PIXI.Container {
    private score: ScoreView;

    constructor() {
        super();

        this.score = new ScoreView();
        this.score.setScoreText(12);
        this.addChild(this.score);
    }
}
