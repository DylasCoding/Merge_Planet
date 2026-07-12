import * as PIXI from "pixi.js";
import { TopBar } from "./TopBar";
import { BottomProgress } from "./BottomProgress";
import { Application } from "pixi.js";
import { LeftSideBar } from "./LeftSideBar.ts";
import { RightSideBar } from "./RightSideBar.ts";

export class HUD extends PIXI.Container {
    private topBar: TopBar;
    private bottomProgress: BottomProgress;
    private leftSideBar: LeftSideBar;
    private rightSideBar: RightSideBar;

    constructor(app: Application) {
        super();
        this.topBar = new TopBar(app);
        this.bottomProgress = new BottomProgress();
        this.leftSideBar = new LeftSideBar(app);
        this.rightSideBar = new RightSideBar(app);

        this.leftSideBar.pointToPlanet(2);

        this.addChild(this.topBar);
        this.addChild(this.bottomProgress);
        this.addChild(this.leftSideBar);
        this.addChild(this.rightSideBar);
    }
}
