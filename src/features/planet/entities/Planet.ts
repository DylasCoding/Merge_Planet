import { Container, Sprite, Texture } from "pixi.js";
import { Vector2 } from "../../../utils/math/Vector2";
import { type PlanetData } from "../data/PlanetData";
import { type PlanetOptions } from "../types/PlanetOptions";

export class Planet extends Container {
    public readonly data: PlanetData;
    public readonly sprite: Sprite;

    public velocity: Vector2;

    constructor(options: PlanetOptions) {
        super();
        const { data, sprite, position = new Vector2(), velocity = new Vector2() } = options;
        this.data = data;
        this.sprite = sprite;

        this.position = position;
        this.velocity = velocity;
        this.addChild(this.sprite);
    }

    public setTexture(texture: Texture): void {
        this.sprite.texture = texture;
    }

    public setVelocity(vx: number, vy: number): void {
        this.velocity.x = vx;
        this.velocity.y = vy;
    }

    public destroy(): void {
        this.sprite.destroy({
            children: true,
        });
        this.removeChild(this.sprite);
    }
}
