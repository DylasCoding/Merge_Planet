import { PlanetRandomizer } from "../PlanetRandomizer";
import { EventManager } from "../../../core/event/EventManager.ts";

export class PlanetSpawnQueue {
    private readonly queue: number[] = [];
    private readonly randomizer: PlanetRandomizer;
    private readonly queueSize: number;

    constructor(randomizer: PlanetRandomizer, queueSize = 3) {
        this.randomizer = randomizer;
        this.queueSize = queueSize;
        this.refillQueue();
    }

    public takeNextLevel(): number {
        const level = this.queue.shift();

        if (level === undefined) {
            throw new Error("Spawn queue is empty.");
        }

        // EventBus.instance.emit(GameEvent.NextPlanetLevelChanged, this.peekNextLevel());
        EventManager.nextPlanetLevelChanged(this.peekNextLevel());

        this.queue.push(this.randomizer.nextLevel());

        return level;
    }

    public peekNextLevel(): number {
        return this.queue[0];
    }

    public getQueue(): readonly number[] {
        return [...this.queue];
    }

    public reset(): void {
        this.queue.length = 0;
        this.refillQueue();
    }

    private refillQueue(): void {
        while (this.queue.length < this.queueSize) {
            this.queue.push(this.randomizer.nextLevel());
        }
    }
}
