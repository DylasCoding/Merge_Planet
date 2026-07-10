import { type Application, Container } from "pixi.js";

export abstract class BaseScene extends Container {
    protected readonly app: Application;

    constructor(app: Application) {
        super();
        this.app = app;
    }

    public abstract initialize(): void;

    public update(delta: number): void {}
}
