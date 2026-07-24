import { Planet } from "./entities";
import { SkinManager } from "./SkinManager.ts";

import { EventBus, GameEvent } from "../../core/event/GameEvent.ts";
import { GameScene } from "../../scenes/GameScene.ts";
export class PlanetManager {
    public readonly planets: Array<Planet> = [];

    public gameScene: GameScene;
    constructor(Gamescene: GameScene) {
        this.gameScene = Gamescene;
        // EventBus.instance.on(GameEvent.GetAllPlanet,this.getAll());
        EventBus.instance.on(GameEvent.AddPLanet, (planet: Planet) => {
            this.add(planet);
        });
    }
    public update(deltaTime: number) {
        this.planets.forEach((planet) => planet.update(deltaTime));
    }
    public add(planet: Planet): void {
        this.planets.push(planet);
        EventBus.instance.emit(GameEvent.AddInteraction, planet);
        this.gameScene.addPlanet(planet);
    }
    public setDropPlanet(Planet: Planet): void {
        Planet.isDropPlanet = true;
        // this.add(Planet);
    }
    public remove(planet: Planet): void {
        const index = this.planets.indexOf(planet);

        if (index !== -1) {
            this.planets.splice(index, 1);
        }
    }

    public getAll(): readonly Planet[] {
        return [...this.planets];
    }

    public clear(): void {
        this.planets.length = 0;
    }

    public getCount(): number {
        return this.planets.length;
    }

    public refreshAllPlanetTextures(): void {
        this.planets.forEach((planet) => {
            const newTexture = SkinManager.getInstance().getPlanetTexture(planet.data.textureKey);
            if (newTexture) {
                planet.setTexture(newTexture);
            }
        });
    }
}
