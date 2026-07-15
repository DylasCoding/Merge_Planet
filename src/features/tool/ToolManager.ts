import { ToolType } from "./ToolType";

export class ToolManager {
    private currentTool: ToolType = ToolType.None;

    public select(tool: ToolType): void {
        this.currentTool = tool;
    }

    public cancel(): void {
        this.currentTool = ToolType.None;
    }

    public getCurrentTool(): ToolType {
        return this.currentTool;
    }

    public isUsingTool(): boolean {
        return this.currentTool !== ToolType.None;
    }

    public isSelected(tool: ToolType): boolean {
        return this.currentTool === tool;
    }

    public toggle(tool: ToolType): void {
        // if (this.currentTool === tool) {
        //     this.cancel();
        //     return;
        // }

        // this.select(tool);
        console.log("Before:", this.currentTool);

        if (this.currentTool === tool) {
            this.cancel();
        } else {
            this.select(tool);
        }

        console.log("After:", this.currentTool);
    }
}
