import { Container, Sprite } from "pixi.js";
import type { Application } from "pixi.js";
import { ToolButton } from "../components/ToolButton.ts";

export class RightSideBar extends Container {
    constructor(app: Application) {
        super();

        this.x = app.screen.width;
        this.y = 0;

        const bg = new Sprite();
        bg.anchor.set(1, 0);
        bg.height = app.screen.height;

        const toolsContainer = new Container();

        const tool1 = new ToolButton("tool1_icon", 100, () => {});
        const tool2 = new ToolButton("tool2_icon", 350, () => {});

        const toolSpacing = 100;
        tool1.y = 0;
        tool2.y = tool1.y + toolSpacing;

        toolsContainer.addChild(tool1, tool2);
        toolsContainer.x = -bg.width / 2 - 50;
        toolsContainer.y = app.screen.height - toolsContainer.height;

        this.addChild(bg, toolsContainer);
    }
}
