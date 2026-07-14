import { Container, Sprite } from "pixi.js";
import type { Application } from "pixi.js";
import { ToolButton } from "../components/ToolButton.ts";
import { Button } from "../components/Button.ts";

export class RightSideBar extends Container {
    public pickaxeButton: ToolButton;
    constructor(app: Application, onPickaxeClick: () => void,) {
        super();

        this.x = app.screen.width;
        this.y = 0;

        const bg = new Sprite();
        bg.anchor.set(1, 0);
        bg.height = app.screen.height;

        const toolsContainer = new Container();

        this.pickaxeButton = new ToolButton("tool1_icon", 100, onPickaxeClick);
        const tool2 = new ToolButton("tool2_icon", 350, () => {});

        const toolSpacing = 100;
        this.pickaxeButton.y = 0;
        tool2.y = this.pickaxeButton.y + toolSpacing;

        toolsContainer.addChild(this.pickaxeButton, tool2);
        toolsContainer.x = -bg.width / 2 - 50;
        toolsContainer.y = app.screen.height - toolsContainer.height;

        this.addChild(bg, toolsContainer);
        
        this.pickaxeButton.on("pointertap", () => {
            this.emit("Pickaxe");
        });
    }
}
