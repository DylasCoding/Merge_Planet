import { EventBus, GameEvent } from "../../../core/event/GameEvent";
import { GameSession } from "../../../core/manager/GameSession";
import { StorageManager } from "../../../core/manager/StorageManager";
import type { PlanetManager } from "../manager/PlanetManager";
import { Timer } from "../spawn/TimerSpawner";
import type { PlanetSaveData } from "./PlanetSaveData";

export class PlanetSaveSerialize {
    public planetDataInterface: PlanetSaveData[] = [];
    public planetManager: PlanetManager;
    public timer: Timer = new Timer();
    constructor(plantnetManager: PlanetManager) {
        this.planetManager = plantnetManager;
        this.timer.setTimer(2);
        this.timer.turnTimer();
    }
    public createPlanetData() {
        for (let i = 0; i < this.planetDataInterface.length; i++) {
            console.log(this.planetDataInterface[i]);
            EventBus.instance.emit(GameEvent.CreatePlanet, this.planetDataInterface[i]);
        }
        GameSession.Instance.score = StorageManager.currentScore;
    }
    public updateDataPertime(deltaTime: number) {
        this.timer.update(deltaTime);
        if (this.timer.timeUp()) {
            StorageManager.savePlanetData();
            console.log("save data");
        }
    }
    public getData(): PlanetSaveData[] {
        return this.planetManager
            .getAll()
            .filter((planet) => planet.isDropPlanet)
            .filter((planet) => !planet.isMerge)
            .map((planet) => ({
                level: planet.data.level,
                posisitonX: planet.planetRigidbody.position.x,
                posisitonY: planet.planetRigidbody.position.y,

                velocityX: planet.planetRigidbody.velocity.x,
                velocityY: planet.planetRigidbody.velocity.y,

                rotation: planet.planetRigidbody.rotation,
                angularVelocity: planet.planetRigidbody.angularVelocity,

                isDropPlanet: planet.isDropPlanet,
                notUltilCount: planet.notUntilCount,
            }));
    }
}
