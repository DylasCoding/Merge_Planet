import { EventManager } from "../event/EventManager.ts";

export interface IGameSaveData {
    highScore: number;
    gems: number;
    soundVolume: number;
    musicVolume: number;
}

export class StorageManager {
    private static readonly SAVE_KEY = "merge_planet_game_save_v1.0.0";
    private static data: IGameSaveData;

    private static readonly DEFAULT_DATA: IGameSaveData = {
        highScore: 0,
        gems: 0,
        soundVolume: 0.5,
        musicVolume: 0.5,
    };

    public static load(): void {
        try {
            const savedData = localStorage.getItem(this.SAVE_KEY);

            if (savedData) {
                const parsedData = JSON.parse(savedData);
                this.data = { ...this.DEFAULT_DATA, ...parsedData };
            } else {
                this.data = { ...this.DEFAULT_DATA };
            }
        } catch (error) {
            console.warn("Load data error:", error);
            this.data = { ...this.DEFAULT_DATA };
        }
    }

    public static save(): void {
        try {
            const jsonString = JSON.stringify(this.data);
            localStorage.setItem(this.SAVE_KEY, jsonString);
        } catch (error) {
            console.error("Save data error:", error);
        }
    }

    public static get gems(): number {
        return this.data.gems;
    }

    public static updateGems(amount: number): void {
        this.data.gems += amount;
        this.save();
        EventManager.gemChanged(this.data.gems);
    }

    public static get highScore(): number {
        return this.data.highScore;
    }

    public static updateHighScore(score: number): void {
        if (score > this.data.highScore) {
            this.data.highScore = score;
            this.save();
            EventManager.highScoreChanged(this.data.highScore);
        }
    }

    public static get soundVolume(): number {
        return this.data.soundVolume;
    }

    public static updateSoundVolume(volume: number): void {
        this.data.soundVolume = volume;
        this.save();
        EventManager.soundVolumeChanged(this.data.soundVolume);
    }

    public static get musicVolume(): number {
        return this.data.musicVolume;
    }

    public static updateMusicVolume(volume: number): void {
        this.data.musicVolume = volume;
        this.save();
        EventManager.musicVolumeChanged(this.data.musicVolume);
    }
}
