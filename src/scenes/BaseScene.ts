import { Container } from "pixi.js";

export abstract class BaseScene extends Container {
    public abstract initialize(): void;

    public update(delta: number): void {}
}
