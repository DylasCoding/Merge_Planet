import * as PIXI from "pixi.js";
import { TopBar } from "./TopBar";

export class HUD extends PIXI.Container {
    private topBar: TopBar;

    constructor() {
        super();
        this.topBar = new TopBar();
        this.addChild(this.topBar);
    }
}
