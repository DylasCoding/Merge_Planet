import * as PIXI from "pixi.js";
import { ScoreView } from "../components/ScoreView.ts";
import { GemView } from "../components/GemView.ts";
import { Container, Application, Sprite } from "pixi.js";
import { NextPlanetView } from "../components/NextPlanetView.ts";
import { Button } from "../components/Button.ts";

export class TopBar extends PIXI.Container {
    private score: ScoreView;
    private gem: GemView;
    private nextPlanet: NextPlanetView;
    private skinButton: Button;

    private readonly leftArea = new Container();
    private readonly rightArea = new Container();
    private readonly centerArea = new Container();

    constructor(app: Application) {
        super();

        this.gem = new GemView();
        this.gem.setGemText(5000);

        this.score = new ScoreView();
        this.score.setScoreText(120);

        this.nextPlanet = new NextPlanetView();
        this.nextPlanet.setPlanetIcon(Sprite.from("planet2"));

        this.skinButton = new Button("SKIN", Sprite.from("button_yellow"));
        this.skinButton.onClick(() => {
            console.log("abc");
        });

        this.leftArea.position.set(20, 20);
        this.centerArea.position.set(app.screen.width / 2, 20);
        this.rightArea.position.set(app.screen.width - 100, 20);

        this.nextPlanet.position.set(0, 0);
        this.skinButton.position.set(0, 130);

        this.leftArea.addChild(this.gem);
        this.centerArea.addChild(this.score);
        this.rightArea.addChild(this.nextPlanet, this.skinButton);

        this.addChild(this.leftArea, this.centerArea, this.rightArea);
    }
}

export interface abc {}
