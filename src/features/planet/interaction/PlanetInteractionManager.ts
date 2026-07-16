import { type PlanetDragController } from "./PlanetDragController";
import { type IMouseTracker } from "../../../core/input/IMouseTracker.ts";
import type { Planet } from "../entities/Planet.ts";
import type { ToolController } from "../../tool/ToolController.ts";

// auto end drag and clear active planet on mouse click
// Coordinate which planet is currently being dragged
export class PlanetInteractionManager {
    private draggedPlanet: PlanetDragController | null = null;
    private readonly mouseTracker: IMouseTracker;
    private readonly toolController: ToolController;
    public isLockedCheck?: () => boolean;

    constructor(mouseTracker: IMouseTracker, toolController: ToolController) {
        this.mouseTracker = mouseTracker;
        this.toolController = toolController;
        this.mouseTracker.onMouseClick(() => {
            if (this.isLockedCheck && this.isLockedCheck()) {
                return;
            }

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

    public onPlanetClicked(planet: Planet): void {
        console.log("Planet clicked");
        this.toolController.onPlanetClicked(planet);
    }

    public registerPlanet(planet: Planet): void {
        planet.eventMode = "static";

        planet.on("pointertap", () => {
            this.onPlanetClicked(planet);
        });
    }
}
