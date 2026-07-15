import { MergePlanet } from "../features/Physics/MergePlanet";
import { Planet } from "../features/planet/entities/Planet";
import type { PlanetFactory } from "../features/planet/factory/PlanetFactory";
import type { PlanetManager } from "../features/planet/manager/PlanetManager";
import type { MergeRequest } from "../features/planet/types/MergeType";
import type { GameScene } from "../scenes/GameScene";

export class MergeManager {
    private MergePlanet: MergePlanet;
    private mergeQueue: MergeRequest[] = [];
    public planetManager: PlanetManager;
    public gameScene: GameScene;
    constructor(planetFactory: PlanetFactory, planetManager: PlanetManager, gameScene: GameScene) {
        this.MergePlanet = new MergePlanet(planetFactory);
        this.planetManager = planetManager;
        this.gameScene = gameScene;
    }
    public checkingPlanetType(planet1: Planet, planet2: Planet) {
        return planet1.data.level === planet2.data.level;
    }
    public pushMergeQueue(planet1: Planet, planet2: Planet) {
        if (planet1.isMerge || planet2.isMerge) return;

        planet1.isMerge = true;
        planet2.isMerge = true;

        this.mergeQueue.push({
            planet1,
            planet2,
        });
    }
    public update() {
        this.MergingProcess();
        this.removePlanetMerged();
    }
    public MergingProcess() {
        for (const request of this.mergeQueue) {
            const newMergePlanet = this.MergePlanet.mergePlanet(request.planet1, request.planet2);
            newMergePlanet.isDropPlanet = true;

            this.planetManager.add(newMergePlanet!);
            this.gameScene.addPlanet(newMergePlanet!);
            // this.forceImpulsePlanet(newMergePlanet);
            this.gameScene.removePlanet(request.planet1, request.planet2);
        }
        this.mergeQueue.length = 0;
    }
    public removePlanetMerged() {
        for (let i = this.planetManager.getAll().length - 1; i >= 0; i--) {
            if (this.planetManager.getAll()[i].isMerge) {
                this.gameScene.removeChild(this.planetManager.getAll()[i]);
                this.planetManager.remove(this.planetManager.getAll()[i]);
            }
        }
    }
    // public forceImpulsePlanet(mergePlanet: Planet) {
    //     for (const planet of this.planetManager.getAll()) {
    //         if (planet === mergePlanet) continue;
    //         if (planet.isMerge) continue;

    //         const dx = planet.planetRigidbody.position.x - mergePlanet.planetRigidbody.position.x;
    //         const dy = planet.planetRigidbody.position.y - mergePlanet.planetRigidbody.position.y;

    //         const distance = Math.sqrt(dx * dx + dy * dy);
    //         const explosionRadius = mergePlanet.data.radius * 2.5;
    //         if (distance > explosionRadius || distance < 0.0001) continue;
    //         const strength = (1 - distance / explosionRadius) * mergePlanet.data.radius * 12;
    //         const nx = dx / distance;
    //         const ny = dy / distance;

    //         planet.planetRigidbody.velocity.x += nx * strength;
    //         planet.planetRigidbody.velocity.y += ny * strength;
    //     }
    // }
}
