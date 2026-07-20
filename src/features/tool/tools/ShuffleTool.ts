import { PlanetManager } from "../../planet/PlanetManager";

export class ShuffleTool {
    private readonly planetManager: PlanetManager;
    private readonly inertiaStrength = 3;

    constructor(planetManager: PlanetManager) {
        this.planetManager = planetManager;
    }

    public update(deltaX: number): void {
        for (const planet of this.planetManager.planets) {
            planet.planetRigidbody.addExternalVelocity(-deltaX * this.inertiaStrength);
        }
    }
}
