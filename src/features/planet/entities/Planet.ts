import { Container, Sprite, Texture } from "pixi.js";
import { type PlanetData } from "../data/PlanetData";
import { RigidBody } from "../../physics/Rigidbody";
import { type PlanetOptions } from "../types/PlanetOptions";
import { EventBus, GameEvent } from "../../../core/event/GameEvent";
import Matter from "matter-js";
import { CircleCollider } from "../../physics/CircleCollider";

export class Planet extends Container {
    public readonly data: PlanetData;
    public readonly sprite: Sprite;

    public planetRigidbody: RigidBody;
    public circleCollider: CircleCollider;
    public isDropPlanet: boolean;
    public isMerge: boolean;
    public notUntilCount: boolean;
    private baseScale!: number;
    private spawnScale: number = 0;
    private aliveTime: number = 0;

    public body!: Matter.Body;
    constructor(options: PlanetOptions) {
        super();
        const { data, sprite } = options;

        this.data = data;

        this.sprite = sprite;
        this.baseScale = this.sprite.scale.x;
        this.sprite.scale.set(0);
        this.isDropPlanet = false;
        this.isMerge = false;
        this.notUntilCount = false;
        this.planetRigidbody = new RigidBody(options.position!.x, options.position!.y);
        this.circleCollider = new CircleCollider(
            this.data.radius,
            this.planetRigidbody.position,
            this.planetRigidbody,
        );
        // Initialize the position of the Planet container to match the rigidBody's position
        this.position.set(this.planetRigidbody.position.x, this.planetRigidbody.position.y);

        this.addChild(this.sprite);

        EventBus.instance.emit(GameEvent.CreatePlanetPhysicBody, this);
    }
    update(deltaTime: number) {
        this.circleCollider.update();
        if (this.isDropPlanet) this.aliveTime += deltaTime;
        if (this.aliveTime >= 1.3) {
            this.notUntilCount = true;
        }
        this.spawnScale += deltaTime * 7;

        const t = Math.min(this.spawnScale, 1);

        this.sprite.scale.set(this.baseScale * t);
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
