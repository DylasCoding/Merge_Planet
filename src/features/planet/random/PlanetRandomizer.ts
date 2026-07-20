import { EventManager } from "../../../core/event/EventManager.ts";

export class PlanetRandomizer {
    private currentMaxRandomLevel = 1;
    private readonly maxRandomLevel: number;
    private defaultLevel: number = 1;

    constructor(maxRandomLevel = 6) {
        this.maxRandomLevel = maxRandomLevel;
    }

    public onPlanetAppeared(level: number): void {
        if (level > this.defaultLevel) {
            this.defaultLevel = level;
            // EventBus.instance.emit(GameEvent.LevelChanged, this.defaultLevel);
            EventManager.levelChanged(this.defaultLevel);
        }

        if (level % 2 !== 0) {
            return;
        }

        // stop increasing max random level at limit (6 > 6 # 6 >= 6)
        if (this.currentMaxRandomLevel >= this.maxRandomLevel) {
            return;
        }

        const unlockedLevel = level / 2 + 1;

        // Update the current maximum random level based on the unlocked level and the maximum allowed random level
        this.currentMaxRandomLevel = Math.max(
            this.currentMaxRandomLevel,
            Math.min(unlockedLevel, this.maxRandomLevel),
        );
    }

    public nextLevel(): number {
        return this.randomInt(1, this.currentMaxRandomLevel);
    }

    public reset(): void {
        this.currentMaxRandomLevel = 1;
    }

    public getCurrentMaxRandomLevel(): number {
        return this.currentMaxRandomLevel;
    }

    private randomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
