import type { GameScene } from "../../scenes/GameScene";
import { ExplodeEffects } from "./effects/ExplodeEffect";
import { ZoomOutEffects } from "./effects/ZoomOutEffect";
import type { ParticleList } from "./ParticleList";

export class ParticleSpawner {
    public listOfEffects: ParticleList[];
    public gameScene: GameScene;
    constructor(listOfEffects: ParticleList[], gameScene: GameScene) {
        this.listOfEffects = listOfEffects;
        this.gameScene = gameScene;
    }
    public spawnEplodeEffect(
        xCoord: number,
        yCoord: number,
        numberOfParticle: number,
        speed: number,
    ) {
        const explode = new ExplodeEffects(xCoord, yCoord, numberOfParticle, speed);
        this.listOfEffects.push(explode);
        this.gameScene.addChild(explode);
    }
    public spawnZoomEffects(xCoord: number, yCoord: number, Radius: number) {
        const zoomout = new ZoomOutEffects(xCoord, yCoord, Radius);
        this.listOfEffects.push(zoomout);
        this.gameScene.addChild(zoomout);
    }
}
