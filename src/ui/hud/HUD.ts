import { Container } from "pixi.js";
import { TopBar } from "./TopBar";
import { BottomProgress } from "./BottomProgress";
import { Application } from "pixi.js";
import { LeftSideBar } from "./LeftSideBar.ts";
import { RightSideBar } from "./RightSideBar.ts";

export class HUD extends Container {
    private topBar: TopBar;
    private bottomProgress: BottomProgress;
    private leftSideBar: LeftSideBar;
    public rightSideBar: RightSideBar;

    constructor(app: Application, onOpenSettings: () => void, onOpenSkinShop: () => void, onPickaxeClick: () => void) {
        super();
        this.topBar = new TopBar(app);
        this.bottomProgress = new BottomProgress();
        this.leftSideBar = new LeftSideBar(app);
        this.rightSideBar = new RightSideBar(app, onPickaxeClick);

        this.leftSideBar.pointToPlanet(2);
        this.topBar.settingsButton.onClick(onOpenSettings);
        this.topBar.skinButton.onClick(onOpenSkinShop);

        this.addChild(this.topBar);
        this.addChild(this.bottomProgress);
        this.addChild(this.leftSideBar);
        this.addChild(this.rightSideBar);
    }
}
