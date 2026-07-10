import * as PIXI from "pixi.js";
import { ScoreView } from "../components/ScoreView.ts";
import { GemView } from "../components/GemView.ts";
import { Container, Application } from "pixi.js";
import { NextPlanetView } from "../components/NextPlanetView.ts";

export class TopBar extends PIXI.Container {
    private score: ScoreView;
    private gem: GemView;
    private nextPlanet: NextPlanetView;

    private readonly leftArea = new Container();
    private readonly rightArea = new Container();
    private readonly centerArea = new Container();

    constructor(app: Application) {
        super();

        this.gem = new GemView();
        this.gem.setGemText(5000);

        this.score = new ScoreView();
        this.score.setScoreText(12);

        this.nextPlanet = new NextPlanetView();

        this.leftArea.position.set(20, 20);

        this.centerArea.position.set(app.screen.width / 2, 20);

        this.rightArea.position.set(app.screen.width - 100, 20);

        this.leftArea.addChild(this.gem);
        this.centerArea.addChild(this.score);
        this.rightArea.addChild(this.nextPlanet);

        this.addChild(this.leftArea, this.centerArea, this.rightArea);
    }
}

export interface abc {}
