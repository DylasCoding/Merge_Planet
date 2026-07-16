import { EventEmitter } from "pixi.js";

export const GameEvent = {
    GemChanged: "GemChanged",
    HighScoreChanged: "HighScoreChanged",
    ScoreChanged: "ScoreChanged",
    NextPlanetChanged: "NextPlanetChanged",
    NextPlanetLevelChanged: "NextPlanetLevelChanged",
    GameOver: "GameOver",
    GameStart: "GameStart",
    GamePause: "GamePause",
    GameResume: "GameResume",
    SkinChanged: "SkinChanged",
} as const;

export class EventBus {
    public static readonly instance: EventEmitter = new EventEmitter();
}
