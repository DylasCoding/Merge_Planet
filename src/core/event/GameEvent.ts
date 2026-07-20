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
    CreatePlanetPhysicBody: "CreateBody",
    CreatePlanet: "CreatePlanet",
    GetAllPlanet: "GetAllPlanet",
    AddPLanet: "AddPlanet",
    AddInteraction: "AddInteraction",
} as const;

export class EventBus {
    public static readonly instance: EventEmitter = new EventEmitter();
}
