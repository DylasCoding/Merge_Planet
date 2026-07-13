import { Container, Graphics, Sprite, Texture } from "pixi.js";
import { type PlanetData } from "../data/PlanetData";
import { rigidBody } from "../../Physics/Rigidbody";
import type { PlanetOptions } from "../types/PlanetOptions";

export class Planet extends Container {
    public readonly data: PlanetData;
    public readonly sprite: Sprite;

    public planetRigidbody: rigidBody;
    public isDropPlanet: boolean;
    constructor(options: PlanetOptions) {
        super();
        const { data, sprite } = options;

        this.data = data;
        this.sprite = sprite;
        this.isDropPlanet = false;
        this.planetRigidbody = new rigidBody(0, 0);

        //temporary body for checking hitbox
        // const planetBody = new Graphics().circle(0, 0, this.data.radius).fill("green");

        this.addChild(this.sprite);
        // this.addChild(planetBody);
    }
    update(deltaTime: number) {
        if (this.isDropPlanet) {
            this.planetRigidbody.update(deltaTime);
        }

        this.position.set(this.planetRigidbody.position!.x, this.planetRigidbody.position!.y);
        this.rotation = this.planetRigidbody.rotation;
    }
    public setTexture(texture: Texture): void {
        this.sprite.texture = texture;
    }
    public destroy(): void {
        this.sprite.destroy({
            texture: false,
            textureSource: false,
        });
    }
}
