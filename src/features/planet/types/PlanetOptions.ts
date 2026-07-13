import { Sprite } from "pixi.js";
import { Vector2 } from "../../../utils/math/Vector2";
import { type PlanetData } from "../data/PlanetData";

export interface PlanetOptions {
    data: PlanetData;

    sprite: Sprite;

    position?: Vector2;
    velocity?: Vector2;
}
