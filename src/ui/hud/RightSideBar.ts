import { Container, Sprite } from "pixi.js";
import type { Application } from "pixi.js";
import { ToolButton } from "../components/common/ToolButton.ts";

export class RightSideBar extends Container {
    public pickaxeButton: ToolButton;
    public shuffleButton: ToolButton;
    constructor(app: Application, onPickaxeClick: () => void, onShuffleClick: () => void) {
        super();

        this.x = app.screen.width;
        this.y = 0;

        const bg = new Sprite();
        bg.anchor.set(1, 0);
        bg.height = app.screen.height;

        const toolsContainer = new Container();

        this.pickaxeButton = new ToolButton("tool1_icon", 100, onPickaxeClick);
        this.shuffleButton = new ToolButton("tool2_icon", 350, onShuffleClick);

        const toolSpacing = 100;
        this.pickaxeButton.y = 0;
        this.shuffleButton.y = this.pickaxeButton.y + toolSpacing;

        toolsContainer.addChild(this.pickaxeButton, this.shuffleButton);
        toolsContainer.x = -bg.width / 2 - 50;
        toolsContainer.y = app.screen.height - toolsContainer.height;

        this.addChild(bg, toolsContainer);

        this.pickaxeButton.on("pointertap", () => {
            this.emit("Pickaxe");
        });

        this.shuffleButton.on("pointertap", () => {
            this.emit("Shuffle");
        });
    }
}
