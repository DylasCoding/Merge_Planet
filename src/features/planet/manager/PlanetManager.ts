import { Planet } from "../entities/Planet";

export class PlanetManager {
    private readonly planets: Planet[] = [];

    public add(planet: Planet): void {
        this.planets.push(planet);
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
}
