export class Vector2 {
    public x: number;
    public y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    public set(x: number, y: number): this {
        this.x = x;
        this.y = y;
        return this;
    }

    public copyFrom(other: Vector2): this {
        this.x = other.x;
        this.y = other.y;
        return this;
    }
}
