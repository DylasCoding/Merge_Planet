import { type Application } from "pixi.js";
import { Vector2 } from "../../utils/math/Vector2.ts";
import { type IMouseTracker } from "./IMouseTracker.ts";

export class MouseInputManager implements IMouseTracker {
    private mousePosition: Vector2 = new Vector2(0, 0);
    private moveCallbacks: Array<(position: Vector2) => void> = [];
    private clickCallbacks: Array<(position: Vector2) => void> = [];
    private readonly canvas: HTMLCanvasElement | null;
    private readonly bounds: { x: number; y: number; width: number; height: number };

    constructor(app: Application, bounds: { x: number; y: number; width: number; height: number }) {
        this.canvas = app.view;
        this.bounds = bounds;
        this.setupListeners();
    }

    private isInsideBounds(position: Vector2): boolean {
        return (
            position.x >= this.bounds.x &&
            position.x <= this.bounds.x + this.bounds.width &&
            position.y >= this.bounds.y &&
            position.y <= this.bounds.y + this.bounds.height
        );
    }

    private setupListeners(): void {
        if (!this.canvas) return;

        this.canvas.addEventListener("pointermove", (event: PointerEvent) => {
            const rect = this.canvas!.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            this.mousePosition.set(x, y);

            const position = new Vector2(x, y);
            if (!this.isInsideBounds(position)) return;

            for (const callback of this.moveCallbacks) {
                callback(position);
            }
        });

        this.canvas.addEventListener("pointerdown", (event: PointerEvent) => {
            const rect = this.canvas!.getBoundingClientRect();
            const position = new Vector2(event.clientX - rect.left, event.clientY - rect.top);

            this.mousePosition.set(position.x, position.y);
            if (!this.isInsideBounds(position)) return;

            for (const callback of this.clickCallbacks) {
                callback(position);
            }
        });
    }

    public getMousePosition(): Vector2 {
        return new Vector2(this.mousePosition.x, this.mousePosition.y);
    }

    public onMouseMove(callback: (position: Vector2) => void): void {
        this.moveCallbacks.push(callback);
    }

    public onMouseClick(callback: (position: Vector2) => void): void {
        this.clickCallbacks.push(callback);
    }
}
