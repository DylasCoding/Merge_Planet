import { Vector2 } from "../../../utils/math/Vector2";
import { type Planet } from "../entities/Planet";
import { type IPlanetDraggable } from "./IPlanetDraggable";
import { type IMouseTracker } from "../../../core/input/IMouseTracker.ts";

// Manages the drag-and-drop behavior for a planet entity
// the link between the player's mouse (mouseTracker) and the planet entity (planet)
export class PlanetDragController implements IPlanetDraggable {
    private dragging: boolean = false;
    private position: Vector2;
    private readonly planet: Planet;
    private readonly mouseTracker: IMouseTracker;
    private readonly boundingBox: { x: number; y: number; width: number; height: number };

    constructor(
        planet: Planet,
        mouseTracker: IMouseTracker,
        boundingBox: { x: number; y: number; width: number; height: number },
    ) {
        this.position = new Vector2(planet.position.x as number, planet.position.y as number);
        this.planet = planet;
        this.mouseTracker = mouseTracker;
        this.boundingBox = boundingBox;
    }

    public isDragging(): boolean {
        return this.dragging;
    }

    public startDrag(): void {
        this.dragging = true;
    }

    public endDrag(): void {
        this.dragging = false;
    }

    public setPosition(position: Vector2): void {
        this.position.copyFrom(position);
        this.clampPosition();

        this.planet.planetRigidbody.position.x = this.position.x;
        this.planet.planetRigidbody.position.y = this.position.y;
    }

    public getPosition(): Vector2 {
        return new Vector2(this.position.x, this.position.y);
    }

    public update(): void {
        if (this.dragging) {
            const mousePos = this.mouseTracker.getMousePosition();
            this.setPosition(mousePos);
        }
    }

    private clampPosition(): void {
        const radius = this.planet.sprite.width / 2;
        const minX = this.boundingBox.x + radius;
        const maxX = this.boundingBox.x + this.boundingBox.width - radius;
        const minY = this.boundingBox.y + radius;
        const maxY = this.boundingBox.y + this.boundingBox.height - radius;

        this.position.x = Math.max(minX, Math.min(this.position.x, maxX));
        this.position.y = Math.max(minY, Math.min(this.position.y, maxY));
    }
}
