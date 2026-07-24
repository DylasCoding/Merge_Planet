import { Planet } from "../../features/planet/entities/Planet";
import { ToolType } from "./ToolType";

export interface Tool {
    readonly type: ToolType;

    use(target: Planet): void;
}
