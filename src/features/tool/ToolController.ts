import { Planet } from "../planet/entities/Planet";
import { ToolManager } from "./ToolManager";
import { ToolPrice, ToolType } from "./ToolType";
import { type PickaxeCursor } from "./effects/PickaxeCursor";
import { PickaxeEffect } from "./effects/PickaxeEffect";
import { type ShakeBoxEffect } from "./effects/ShakeBoxEffect";
import { PickaxeTool } from "./tools/PickaxeTool";
import { type ShuffleTool } from "./tools/ShuffleTool";
import { EventBus, GameEvent } from "../../core/event/GameEvent.ts";
import { StorageManager } from "../../core/manager/StorageManager.ts";

export class ToolController {
    private readonly toolManager: ToolManager;
    private readonly pickaxeTool: PickaxeTool;
    private readonly pickaxeEffect: PickaxeEffect;
    private readonly pickaxeCursor: PickaxeCursor;
    private readonly shuffleTool: ShuffleTool;
    private readonly shakeBoxEffect: ShakeBoxEffect;

    constructor(
        toolManager: ToolManager,
        pickaxeTool: PickaxeTool,
        pickaxeEffect: PickaxeEffect,
        pickaxeCursor: PickaxeCursor,
        shuffleTool: ShuffleTool,
        shakeBoxEffect: ShakeBoxEffect,
    ) {
        this.toolManager = toolManager;
        this.pickaxeTool = pickaxeTool;
        this.pickaxeEffect = pickaxeEffect;
        this.pickaxeCursor = pickaxeCursor;
        this.shuffleTool = shuffleTool;
        this.shakeBoxEffect = shakeBoxEffect;
    }

    public cancelTool(): void {
        this.pickaxeCursor.hide();
        this.toolManager.cancel();
    }

    private onToolFinished?: () => void;

    public setOnToolFinished(callback: () => void): void {
        this.onToolFinished = callback;
    }

    public async useShuffle(): Promise<void> {
        await this.shakeBoxEffect.play((deltaX) => {
            this.shuffleTool.update(deltaX);
        });
    }

    public async onPlanetClicked(planet: Planet): Promise<void> {
        if (!this.toolManager.isUsingTool()) {
            return;
        }

        if (StorageManager.gems < ToolPrice[ToolType.Pickaxe]) {
            return;
        }

        switch (this.toolManager.getCurrentTool()) {
            case ToolType.Pickaxe:
                this.pickaxeCursor.hide();
                await this.pickaxeEffect.play(planet);
                this.pickaxeTool.use(planet);
                StorageManager.updateGems(-ToolPrice[ToolType.Pickaxe]);
                EventBus.instance.emit(GameEvent.GemChanged, StorageManager.gems);
                break;

            case ToolType.None:
            default:
                return;
        }

        this.toolManager.cancel();
        this.pickaxeCursor.hide();

        this.onToolFinished?.();
    }

    public isUsingTool(): boolean {
        return this.toolManager.isUsingTool();
    }

    public toggleTool(tool: ToolType): void {
        console.log("Toggle:", tool);
        this.toolManager.toggle(tool);

        if (this.toolManager.isSelected(ToolType.Pickaxe)) {
            this.pickaxeCursor.show();
        } else {
            this.pickaxeCursor.hide();
        }
    }
}
