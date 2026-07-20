import { Bodies, Engine, World } from "matter-js";
import type { Planet } from "../planet/entities/Planet";
import { EventBus, GameEvent } from "../../core/event/GameEvent";
import { Game } from "../../Game";

export class EnginePhysics {
    private Engine: Engine;

    constructor() {
        this.Engine = Engine.create({
            enableSleeping: true,
        });
        this.Engine.gravity.y = 9.8;

        EventBus.instance.on(GameEvent.CreatePlanetPhysicBody, this.createBody);
    }
    public update() {
        Engine.update(this.Engine, 16);
    }
    public getEngine() {
        return this.Engine;
    }

    public createBody = (planet: Planet) => {
        const planetBody = Bodies.circle(
            planet.planetRigidbody.position.x,
            planet.planetRigidbody.position.y,
            planet.data.radius,
        );
        planetBody.velocity.y = 50;
        planet.body = planetBody;
        World.add(this.Engine.world, planetBody);
        console.log("create planet body!");
    };
}
