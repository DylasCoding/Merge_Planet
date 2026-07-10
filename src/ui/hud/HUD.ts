import * as PIXI from "pixi.js";
import { TopBar } from "./TopBar";
import { BottomProgress } from "./BottomProgress";
import { Application } from "pixi.js";
import { LeftSideBar } from "./LeftSideBar.ts";

export class HUD extends PIXI.Container {
    private topBar: TopBar;
    private bottomProgress: BottomProgress;
    private leftSideBar: LeftSideBar;

    constructor(app: Application) {
        super();
        this.topBar = new TopBar(app);
        this.bottomProgress = new BottomProgress();
        this.leftSideBar = new LeftSideBar(app);

        this.addChild(this.topBar);
        this.addChild(this.bottomProgress);
        this.addChild(this.leftSideBar);
    }
}
