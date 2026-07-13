import { type PlanetDragController } from "./PlanetDragController";
import { type IMouseTracker } from "../../../core/input/IMouseTracker.ts";

// auto end drag and clear active planet on mouse click
// Coordinate which planet is currently being dragged
export class PlanetInteractionManager {
    private draggedPlanet: PlanetDragController | null = null;
    private readonly mouseTracker: IMouseTracker;

    constructor(mouseTracker: IMouseTracker) {
        this.mouseTracker = mouseTracker;
        this.mouseTracker.onMouseClick(() => {
            if (this.draggedPlanet) {
                this.draggedPlanet.endDrag();
                this.draggedPlanet = null;
            }
        });
    }

    public setDraggedPlanet(dragController: PlanetDragController): void {
        this.draggedPlanet = dragController;
        this.draggedPlanet.startDrag();
    }

    public updateDrag(): void {
        if (this.draggedPlanet) {
            this.draggedPlanet.update();
        }
    }

    public hasDraggingPlanet(): boolean {
        return this.draggedPlanet !== null;
    }
}
