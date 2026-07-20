import { Sprite } from "pixi.js";
import { PLANET_CONFIG } from "./data/PlanetConfig.ts";
import { Planet } from "./entities";
import { type PlanetCreateOptions } from "./types/PlanetCreateOptions.ts";
import { SkinManager } from "./SkinManager.ts";
import { EventBus, GameEvent } from "./../../core/event/GameEvent.ts";

import type { PlanetSaveData } from "./data/PlanetSaveData.ts";
import { Vector2 } from "../../utils/math/Vector2.ts";

export class PlanetFactory {
    constructor() {
        EventBus.instance.on(GameEvent.CreatePlanet, (planet: PlanetSaveData) => {
            this.createSavePlanet(planet);
        });
    }
    public createSavePlanet = (data: PlanetSaveData) => {
        const planet = this.create({
            level: data.level,
            position: new Vector2(data.posisitonX, data.posisitonY),
            velocity: new Vector2(data.velocityX, data.velocityY),
        });
        planet.isDropPlanet = data.isDropPlanet;
        planet.notUntilCount = data.notUltilCount;

        console.log(planet.parent);
        EventBus.instance.emit(GameEvent.AddPLanet, planet);
        EventBus.instance.emit(GameEvent.AddInteraction, planet);
    };
    public create(options: PlanetCreateOptions): Planet {
        const data = PLANET_CONFIG[options.level];

        if (!data) {
            throw new Error(`Planet level ${options.level} not found.`);
        }

        const texture = SkinManager.getInstance().getPlanetTexture(data.textureKey);

        const sprite = new Sprite(texture);

        sprite.anchor.set(0.5);
        sprite.scale.set(0.02 * data.radius);

        return new Planet({
            data,
            sprite,
            position: options.position,
            velocity: options.velocity,
        });
    }
}
