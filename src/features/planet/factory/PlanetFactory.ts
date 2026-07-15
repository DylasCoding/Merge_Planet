import { Assets, Sprite } from "pixi.js";
import { PLANET_CONFIG } from "../data/PlanetConfig";
import { Planet } from "../entities/Planet";
import { type PlanetCreateOptions } from "../types/PlanetCreateOptions";
import { SkinManager } from "../skin/SkinManager.ts";

export class PlanetFactory {
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
