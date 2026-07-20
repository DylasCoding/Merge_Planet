import { Planet } from "../features/planet";
import type { PlanetFactory } from "../features/planet";
import type { PlanetManager } from "../features/planet";
import type { MergeRequest } from "../features/planet/types/MergeType";
import type { GameScene } from "../scenes/GameScene";
import type { particleManager } from "./ParticleManager";
import type { PlanetRandomizer } from "../features/planet";
import type { PlanetInteractionManager } from "../features/planet/interaction/PlanetInteractionManager.ts";
import { StorageManager } from "./manager/StorageManager.ts";
import { GameSession } from "./manager/GameSession.ts";
import { Vector2 } from "../utils/math/Vector2.ts";
import { EventManager } from "./event/EventManager.ts";

export class MergeManager {
    private mergeQueue: MergeRequest[] = [];
    private planetManager: PlanetManager;
    private particleManager: particleManager;
    private gameScene: GameScene;
    private planetFactory: PlanetFactory;
    private readonly planetRandomizer: PlanetRandomizer;
    private readonly planetInteractionManager: PlanetInteractionManager;
    constructor(
        planetFactory: PlanetFactory,
        planetManager: PlanetManager,
        gameScene: GameScene,
        planetRandomizer: PlanetRandomizer,
        particleManager: particleManager,
        planetInteractionManager: PlanetInteractionManager,
    ) {
        this.planetFactory = planetFactory;
        this.planetManager = planetManager;
        this.gameScene = gameScene;
        this.particleManager = particleManager;
        this.planetRandomizer = planetRandomizer;
        this.planetInteractionManager = planetInteractionManager;
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
    private MergingProcess() {
        for (const request of this.mergeQueue) {
            const newMergePlanet = this.mergePlanet(request.planet1, request.planet2);

            // random level for new planet
            this.planetRandomizer.onPlanetAppeared(newMergePlanet.data.level);

            newMergePlanet.isDropPlanet = true;
            this.planetInteractionManager.registerPlanet(newMergePlanet!);

            this.gameScene.removePlanet(request.planet1, request.planet2);
            this.planetManager.add(newMergePlanet!);
            this.gameScene.addPlanet(newMergePlanet!);
            this.otherEventWithParticle(newMergePlanet!);
            StorageManager.savePlanetData();
        }
        this.mergeQueue.length = 0;
    }
    private removePlanetMerged() {
        for (let i = this.planetManager.getAll().length - 1; i >= 0; i--) {
            if (this.planetManager.getAll()[i].isMerge) {
                this.gameScene.removeChild(this.planetManager.getAll()[i]);
                this.planetManager.remove(this.planetManager.getAll()[i]);
            }
        }
    }
    private otherEventWithParticle(planet: Planet) {
        this.particleManager.spawnWhenMerge(
            planet.planetRigidbody.position.x,
            planet.planetRigidbody.position.y,
            10,
            200,
            planet.data.radius,
        );
    }
    private mergePlanet(planet1: Planet, planet2: Planet) {
        const x = (planet1.planetRigidbody.position.x + planet2.planetRigidbody.position.x) / 2;
        const y =
            (planet1.planetRigidbody.position.y + planet2.planetRigidbody.position.y) / 2 -
            planet1.data.radius * 0.8;

        // EventBus.instance.emit(GameEvent.PlanetMerged);
        EventManager.planetMerged();

        GameSession.Instance.score = (planet1.data.level + planet2.data.level) * 10;
        console.log(StorageManager.currentScore);
        this.updateHighScore(GameSession.Instance.score);

        const MergePlanetPosition = new Vector2(x, y);
        const newLevel = planet1.data.level + 1;
        return this.planetFactory.create({
            level: newLevel,
            position: MergePlanetPosition,
        });
    }

    private updateHighScore(score: number): void {
        StorageManager.setCurrentScore(score);
        if (score > StorageManager.highScore) {
            StorageManager.updateHighScore(score);
        }
    }
}
