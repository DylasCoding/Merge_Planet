import { Sprite, Texture } from "pixi.js";
import { Vector2 } from "../../../utils/math/Vector2";
import { type PlanetData } from "../data/PlanetData";
import { type PlanetOptions } from "../types/PlanetOptions";

export class Planet {
    public readonly data: PlanetData;
    public readonly sprite: Sprite;

    public position: Vector2;
    public velocity: Vector2;

    constructor(options: PlanetOptions) {
        const { data, sprite, position = new Vector2(), velocity = new Vector2() } = options;
        this.data = data;
        this.sprite = sprite;

        this.position = position;
        this.velocity = velocity;

        this.syncSpritePosition();
    }

    private syncSpritePosition(): void {
        this.sprite.position.set(this.position.x, this.position.y);
    }

    public setTexture(texture: Texture): void {
        this.sprite.texture = texture;
    }

    public setPosition(x: number, y: number): void {
        this.position.x = x;
        this.position.y = y;

        this.syncSpritePosition();
    }

    public setVelocity(vx: number, vy: number): void {
        this.velocity.x = vx;
        this.velocity.y = vy;
    }

    public destroy(): void {
        this.sprite.destroy({
            texture: false,
            textureSource: false,
        });
    }
}
