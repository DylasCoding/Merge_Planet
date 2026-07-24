import { Vector2 } from "../../utils/math/Vector2.ts";

export interface IMouseTracker {
    getMousePosition(): Vector2;
    onMouseMove(callback: (position: Vector2) => void): void;
    onMouseClick(callback: (position: Vector2) => void): void;
}
