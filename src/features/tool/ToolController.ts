import { Planet } from "../planet/entities/Planet";
import { ToolManager } from "./ToolManager";
import { ToolType } from "./ToolType";
import { PickaxeTool } from "./tools/PickaxeTool";

export class ToolController {
    private readonly toolManager: ToolManager;
    private readonly pickaxeTool: PickaxeTool;

    constructor(toolManager: ToolManager, pickaxeTool: PickaxeTool) {
        this.toolManager = toolManager;
        this.pickaxeTool = pickaxeTool;
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

    public onPlanetClicked(planet: Planet): void {
        if (!this.toolManager.isUsingTool()) {
            return;
        }

        switch (this.toolManager.getCurrentTool()) {
            case ToolType.Pickaxe:
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
