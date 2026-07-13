import { MergePlanet } from "../features/Physics/MergePlanet";
import { Planet } from "../features/planet/entities/Planet";
import type { PlanetFactory } from "../features/planet/factory/PlanetFactory";
import type { PlanetManager } from "../features/planet/manager/PlanetManager";
import type { MergeRequest } from "../features/planet/types/mergeType";
import type { GameScene } from "../scenes/GameScene";

export class mergeManager {
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
        if (planet1.data.level == planet2.data.level) return true;
        return false;
    }
    public pushMergeQueue(planet1: Planet, planet2: Planet) {
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
            this.planetManager.add(newMergePlanet!);
            this.gameScene.addChild(newMergePlanet!);
        }
        this.mergeQueue.length = 0;
    }
    public removePlanetMerged() {
        for (let i = this.planetManager.getAll().length - 1; i >= 0; i--) {
            if (this.planetManager.getAll()[i].isMerge) {
                this.gameScene.removeChild(this.planetManager.getAll()[i]);
                this.planetManager.getAll().slice(i, 1);
            }
        }
    }
}
