import { Vector2 } from "../../../utils/math/Vector2";

export interface IPlanetDraggable {
    isDragging(): boolean;
    startDrag(): void;
    endDrag(): void;
    setPosition(position: Vector2): void;
    getPosition(): Vector2;
}
