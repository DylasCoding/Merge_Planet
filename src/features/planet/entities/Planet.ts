import { Container, Graphics, Sprite, Texture } from "pixi.js";
import { type PlanetData } from "../data/PlanetData";
import { rigidBody } from "../../Physics/Rigidbody";

export class Planet extends Container {
    public readonly data: PlanetData;
    public readonly sprite: Sprite;

    public planetRigidbody: rigidBody;

    constructor(data: PlanetData, sprite: Sprite, xCoord: number, yCoord: number) {
        super();
        this.data = data;
        this.sprite = sprite;

        this.planetRigidbody = new rigidBody(xCoord, yCoord);

        //temporary body for checking hitbox
        const planetBody = new Graphics().circle(0, 0, this.data.radius).fill("green");

        this.addChild(sprite);
        this.addChild(planetBody);
       
    }
    update(deltaTime: number) {
        this.planetRigidbody.update(deltaTime);

        this.position.set(this.planetRigidbody.position.x, this.planetRigidbody.position.y);
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
