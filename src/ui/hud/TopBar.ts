import * as PIXI from "pixi.js";
import { ScoreView } from "../components/ScoreView.ts";
import { GemView } from "../components/GemView.ts";
import { Container, Application } from "pixi.js";

export class TopBar extends PIXI.Container {
    private score: ScoreView;
    private gem: GemView;

    private readonly leftArea = new Container();
    private readonly rightArea = new Container();
    private readonly centerArea = new Container();

    constructor(app: Application) {
        super();

        this.gem = new GemView();
        this.gem.setGemText(5000);

        this.score = new ScoreView();
        this.score.setScoreText(12);

        this.leftArea.position.set(20, 20);

        this.centerArea.position.set(app.screen.width / 2, 20);

        this.rightArea.position.set(app.screen.width - 20, 20);

        this.leftArea.addChild(this.gem);
        // this.centerArea.addChild();
        this.centerArea.addChild(this.score);

        this.addChild(this.leftArea, this.centerArea, this.rightArea);
    }
}

export interface abc {}
