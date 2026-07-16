import { EventEmitter } from "pixi.js";

export const GameEvent = {
    GemChanged: "GemChanged",
    HighScoreChanged: "HighScoreChanged",
    ScoreChanged: "ScoreChanged",
    NextPlanetChanged: "NextPlanetChanged",
    NextPlanetLevelChanged: "NextPlanetLevelChanged",
    GameOver: "GameOver",
    GameStart: "GameStart",
    SkinChanged: "SkinChanged",
    LevelChanged: "LevelChanged",
    SoundVolumeChanged: "SoundVolumeChanged",
    MusicVolumeChanged: "MusicVolumeChanged",
    PlanetMerged: "PlanetMerged",
} as const;

export class EventBus {
    public static readonly instance: EventEmitter = new EventEmitter();
}
