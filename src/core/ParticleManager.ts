import type { ParticleList } from "../features/particleEffects/ParticleList";
import { ParticleSpawner } from "../features/particleEffects/ParticleSpawner";
import { GameScene } from "../scenes/GameScene";

export class particleManager {
    public gameScene: GameScene;
    public particleSpawner: ParticleSpawner;
    public listOfEffects: ParticleList[] = [];
    constructor(gameScene: GameScene) {
        this.gameScene = gameScene;
        this.particleSpawner = new ParticleSpawner(this.listOfEffects, gameScene);
    }
    public update(deltaTime: number) {
        this.listOfEffects.forEach((particleList) => particleList.update(deltaTime));
    }
    public spawnWhenMerge(
        xCoord: number,
        yCoord: number,
        numberOfParticle: number,
        speed: number,
        radius: number,
    ) {
        this.particleSpawner.spawnZoomEffects(xCoord, yCoord, radius);
        this.particleSpawner.spawnEplodeEffect(xCoord, yCoord, numberOfParticle, speed);
    }
}
