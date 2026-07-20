import type { PlanetSaveData } from "../../features/planet/data/PlanetSaveData.ts";
import type { PlanetSaveSerialize } from "../../features/planet/data/PlanetSaveSerialize.ts";
import type { Planet } from "../../features/planet/entities/Planet.ts";
import { EventBus, GameEvent } from "../event/GameEvent.ts";

export interface IGameSaveData {
    highScore: number;
    currentScore: number;
    gems: number;
    soundVolume: number;
    musicVolume: number;

    planets: PlanetSaveData[];
}

export class StorageManager {
    private static readonly SAVE_KEY = "merge_planet_game_save_v1.0.0";
    private static data: IGameSaveData;
    private static planetData: PlanetSaveData;
    public static planetSaveSerialize: PlanetSaveSerialize;
    private static readonly DEFAULT_DATA: IGameSaveData = {
        highScore: 0,
        currentScore: 0,
        gems: 0,
        soundVolume: 0.5,
        musicVolume: 0.5,

        planets: [],
    };

    public static load(): void {
        try {
            const savedData = localStorage.getItem(this.SAVE_KEY);

            if (savedData) {
                const parsedData = JSON.parse(savedData);
                this.data = { ...this.DEFAULT_DATA, ...parsedData };
                console.log(this.data.planets);
            } else {
                this.data = { ...this.DEFAULT_DATA };
            }
        } catch (error) {
            console.warn("Load data error:", error);
            this.data = { ...this.DEFAULT_DATA };
        }
    }

    public static savePlanetData(): void {
        try {
            this.data.planets = this.planetSaveSerialize.getData();
            this.save();
        } catch (error) {
            console.error("Save data error:", error);
        }
    }

    public static resetData(): void {
        this.data.planets = [];
        this.data.currentScore = 0;
        this.save();
    }
    public static save(): void {
        try {
            const jsonString = JSON.stringify(this.data);
            localStorage.setItem(this.SAVE_KEY, jsonString);
        } catch (error) {
            console.error("Save data error:", error);
        }
    }
    public static get planets(): PlanetSaveData[] {
        return this.data.planets;
    }
    public static get gems(): number {
        return this.data.gems;
    }
    public static get currentScore(): number {
        return this.data.currentScore;
    }
    public static setCurrentScore(score: number) {
        this.data.currentScore = score;
    }
    public static updatePlanet(planet: Planet | null): void {
        if (!planet) return;
        this.planetData = {
            level: planet.data.level,
            posisitonX: planet.planetRigidbody.position.x,
            posisitonY: planet.planetRigidbody.position.y,
            velocityX: planet.planetRigidbody.velocity.x,
            velocityY: planet.planetRigidbody.velocity.y,
            rotation: planet.planetRigidbody.rotation,
            angularVelocity: planet.planetRigidbody.angularVelocity,
            isDropPlanet: planet.isDropPlanet,
            notUltilCount: planet.notUntilCount,
        };
        if (this.planetData.isDropPlanet) this.data.planets.push(this.planetData);
        this.savePlanetData();
        console.log(this.data.planets);
    }

    public static updateGems(amount: number): void {
        this.data.gems += amount;
        this.save();
        this.savePlanetData();
        EventBus.instance.emit(GameEvent.GemChanged, this.data.gems);
    }

    public static get highScore(): number {
        return this.data.highScore;
    }

    public static updateHighScore(score: number): void {
        if (score > this.data.highScore) {
            this.data.highScore = score;
            this.save();
            this.savePlanetData();
            EventBus.instance.emit(GameEvent.HighScoreChanged, this.data.highScore);
        }
    }

    public static get soundVolume(): number {
        return this.data.soundVolume;
    }

    public static updateSoundVolume(volume: number): void {
        this.data.soundVolume = volume;
        this.save();
        EventBus.instance.emit(GameEvent.SoundVolumeChanged, volume);
    }

    public static get musicVolume(): number {
        return this.data.musicVolume;
    }

    public static updateMusicVolume(volume: number): void {
        this.data.musicVolume = volume;
        this.save();
        EventBus.instance.emit(GameEvent.MusicVolumeChanged, volume);
    }
}
