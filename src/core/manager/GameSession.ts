import { EventBus, GameEvent } from "../event/GameEvent.ts";

interface GameSessionData {
    score: number;
}

export class GameSession {
    private static instance: GameSession;

    private sesionData: GameSessionData = {
        score: 0,
    };

    public static get Instance(): GameSession {
        if (!this.instance) {
            this.instance = new GameSession();
        }
        return this.instance;
    }

    private constructor() {}

    public get score(): number {
        return this.sesionData.score;
    }

    public set score(score: number) {
        this.sesionData.score += score;
        EventBus.instance.emit(GameEvent.ScoreChanged, this.sesionData.score);
    }

    public reset(): void {
        this.sesionData.score = 0;
    }
}
