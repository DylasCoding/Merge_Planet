import * as PIXI from "pixi.js";
import { TopBar } from "./TopBar";
import { BottomProgress } from "./BottomProgress";

export class HUD extends PIXI.Container {
    private topBar: TopBar;
    private bottomProgress: BottomProgress;

    constructor() {
        super();
        this.topBar = new TopBar();
        this.bottomProgress = new BottomProgress();

        this.addChild(this.topBar);
        this.addChild(this.bottomProgress);
    }
}
