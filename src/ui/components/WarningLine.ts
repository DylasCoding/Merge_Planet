import { Assets, Container, Sprite } from "pixi.js";
import { Timer } from "../../features/planet/spawn/TimerSpawner";
import { EventBus, GameEvent } from "../../core/event/GameEvent.ts";
import { GameSession } from "../../core/manager/GameSession.ts";

export class WarningLine extends Container {
    public sprite: Sprite;
    public isWarning: boolean = false;
    public isPlanetAbobeWarningLines: boolean = false;
    public timer: Timer;
    private flashTime: number = 0;
    constructor(xCoord: number, yCoord: number) {
        super();
        this.timer = new Timer();
        this.timer.setTimer(3);
        const texture = Assets.get("warningLines");

        this.sprite = new Sprite(texture);
        this.sprite.scale.set(1.44, 0.7);
        this.sprite.alpha = 0.3;
        this.position.set(xCoord, yCoord);

        this.addChild(this.sprite);
        // this.addChild(testGrahics);
    }
    update(deltaTime: number) {
        if (this.isWarning) {
            this.flashTime += deltaTime * 1.8;
            this.sprite.alpha = 0.5 + Math.sin(this.flashTime) * 0.3;
        } else {
            this.flashTime = 0;
            this.sprite.alpha = 0.3;
        }
        // console.log(this.sprite.alpha);
        if (this.isPlanetAbobeWarningLines) {
            this.timer.onOffTimer(true);
        } else {
            this.timer.onOffTimer(false);
            this.timer.resetTimer();
        }

        this.timer.update(deltaTime);
        if (this.timer.timeUp()) {
            // console.log("Game Over");
            EventBus.instance.emit(GameEvent.GameOver, GameSession.Instance.score);
        }
    }
}
