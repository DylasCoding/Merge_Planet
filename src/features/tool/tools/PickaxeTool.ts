import { Planet } from "../../planet/entities/Planet";
import { PlanetManager } from "../../planet/PlanetManager";
import { type Tool } from "../Tool";
import { ToolType } from "../ToolType";

export class PickaxeTool implements Tool {
    public readonly type = ToolType.Pickaxe;
    private readonly planetManager: PlanetManager;

    constructor(planetManager: PlanetManager) {
        this.planetManager = planetManager;
    }

    public use(target: Planet): void {
        console.log("Destroy planet");

        this.planetManager.remove(target);
        target.parent?.removeChild(target);
        target.destroy();
    }
}
