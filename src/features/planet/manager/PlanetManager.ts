import { Planet } from "../entities/Planet";
import { SkinManager } from "../skin/SkinManager.ts";

export class PlanetManager {
    public readonly planets: Array<Planet> = [];

    public update(deltaTime: number) {
        this.planets.forEach((planet) => planet.update(deltaTime));
    }
    public add(planet: Planet): void {
        this.planets.push(planet);
    }
    public setDropPlanet(Planet: Planet): void {
        Planet.isDropPlanet = true;
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
