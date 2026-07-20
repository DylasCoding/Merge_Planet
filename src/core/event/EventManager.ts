import { EventBus, GameEvent } from "./GameEvent.ts";

export class EventManager {
    public static removeAllListenerEvents(): void {
        EventBus.instance.removeAllListeners();
    }

    public static scoreChanged(score: number): void {
        EventBus.instance.emit(GameEvent.ScoreChanged, score);
    }

    public static onScoreChanged(callback: (score: number) => void): void {
        EventBus.instance.on(GameEvent.ScoreChanged, callback);
    }

    public static gemChanged(gem: number): void {
        EventBus.instance.emit(GameEvent.GemChanged, gem);
    }

    public static onGemChanged(callback: (gem: number) => void): void {
        EventBus.instance.on(GameEvent.GemChanged, callback);
    }

    public static highScoreChanged(highScore: number): void {
        EventBus.instance.emit(GameEvent.HighScoreChanged, highScore);
    }

    public static onHighScoreChanged(callback: (highScore: number) => void): void {
        EventBus.instance.on(GameEvent.HighScoreChanged, callback);
    }

    public static nextPlanetChanged(level: number): void {
        EventBus.instance.emit(GameEvent.NextPlanetChanged, level);
    }

    public static onNextPlanetChanged(callback: (level: number) => void): void {
        EventBus.instance.on(GameEvent.NextPlanetChanged, callback);
    }

    public static nextPlanetLevelChanged(level: number): void {
        EventBus.instance.emit(GameEvent.NextPlanetLevelChanged, level);
    }

    public static onNextPlanetLevelChanged(callback: (level: number) => void): void {
        EventBus.instance.on(GameEvent.NextPlanetLevelChanged, callback);
    }

    public static gameOver(finalScore: number): void {
        EventBus.instance.emit(GameEvent.GameOver, finalScore);
    }

    public static onGameOver(callback: (finalScore: number) => void): void {
        EventBus.instance.on(GameEvent.GameOver, callback);
    }

    public static gameStart(): void {
        EventBus.instance.emit(GameEvent.GameStart);
    }

    public static onGameStart(callback: () => void): void {
        EventBus.instance.on(GameEvent.GameStart, callback);
    }

    public static skinChanged() {
        EventBus.instance.emit(GameEvent.SkinChanged);
    }

    public static onSkinChanged(callback: () => void): void {
        EventBus.instance.on(GameEvent.SkinChanged, callback);
    }

    public static levelChanged(level: number): void {
        EventBus.instance.emit(GameEvent.LevelChanged, level);
    }

    public static onLevelChanged(callback: (level: number) => void): void {
        EventBus.instance.on(GameEvent.LevelChanged, callback);
    }

    public static soundVolumeChanged(volume: number): void {
        EventBus.instance.emit(GameEvent.SoundVolumeChanged, volume);
    }

    public static onSoundVolumeChanged(callback: (volume: number) => void): void {
        EventBus.instance.on(GameEvent.SoundVolumeChanged, callback);
    }

    public static musicVolumeChanged(volume: number): void {
        EventBus.instance.emit(GameEvent.MusicVolumeChanged, volume);
    }

    public static onMusicVolumeChanged(callback: (volume: number) => void): void {
        EventBus.instance.on(GameEvent.MusicVolumeChanged, callback);
    }

    public static planetMerged(): void {
        EventBus.instance.emit(GameEvent.PlanetMerged);
    }

    public static onPlanetMerged(callback: () => void): void {
        EventBus.instance.on(GameEvent.PlanetMerged, callback);
    }
}
