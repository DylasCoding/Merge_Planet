import { Planet } from "../planet/entities/Planet";
import { ToolManager } from "./ToolManager";
import { ToolType } from "./ToolType";
import { PickaxeEffect } from "./effects/PickaxeEffect";
import { PickaxeTool } from "./tools/PickaxeTool";

export class ToolController {
    private readonly toolManager: ToolManager;
    private readonly pickaxeTool: PickaxeTool;
    private readonly pickaxeEffect: PickaxeEffect;

    constructor(toolManager: ToolManager, pickaxeTool: PickaxeTool, pickaxeEffect: PickaxeEffect) {
        this.toolManager = toolManager;
        this.pickaxeTool = pickaxeTool;
        this.pickaxeEffect = pickaxeEffect;
    }

    public selectTool(tool: ToolType): void {
        this.toolManager.toggle(tool);
    }

    public cancelTool(): void {
        this.toolManager.cancel();
    }

    private onToolFinished?: () => void;

    public setOnToolFinished(callback: () => void): void {
        this.onToolFinished = callback;
    }

    public async onPlanetClicked(planet: Planet): Promise<void> {
        if (!this.toolManager.isUsingTool()) {
            return;
        }

        switch (this.toolManager.getCurrentTool()) {
            case ToolType.Pickaxe:
                await this.pickaxeEffect.play(planet);
                this.pickaxeTool.use(planet);
                break;

            case ToolType.None:
            default:
                return;
        }

        this.toolManager.cancel();

        this.onToolFinished?.();
    }

    public isUsingTool(): boolean {
        return this.toolManager.isUsingTool();
    }

    public toggleTool(tool: ToolType): void {
        console.log("Toggle:", tool);
        this.toolManager.toggle(tool);
    }
}
