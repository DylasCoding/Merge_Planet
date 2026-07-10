import * as PIXI from "pixi.js";
import { TopBar } from "./TopBar";
import { BottomProgress } from "./BottomProgress";
import type { Application } from "pixi.js";

export class HUD extends PIXI.Container {
    private topBar: TopBar;
    private bottomProgress: BottomProgress;

    constructor(app: Application) {
        super();
        this.topBar = new TopBar(app);
        this.bottomProgress = new BottomProgress();

        this.addChild(this.topBar);
        this.addChild(this.bottomProgress);
    }
}
