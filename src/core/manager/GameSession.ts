import { EventBus, GameEvent } from "../event/GameEvent.ts";

interface GameSessionData {
    score: number;
    nextPlanetId: string | null;
    state: GameState;
}

export const GameState = {
    Waiting: "Waiting",
    Playing: "Playing",
    Paused: "Paused",
    GameOver: "GameOver",
} as const;

export type GameState = (typeof GameState)[keyof typeof GameState];

export class GameSession {
    private static instance: GameSession;

    private sesionData: GameSessionData = {
        score: 0,
        nextPlanetId: null,
        state: GameState.Waiting,
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
}
