import { sound } from "@pixi/sound";
import { StorageManager } from "./manager/StorageManager.ts";
import { EventManager } from "./event/EventManager.ts";

export class SoundManager {
    private static isBackgroundMusicPlaying: boolean = false;

    public static initialize(): void {
        this.applyMusicVolume(StorageManager.musicVolume);
        this.applySoundVolume(StorageManager.soundVolume);

        this.unlockAudioOnFirstInteraction();
    }

    private static unlockAudioOnFirstInteraction(): void {
        const unlock = () => {
            this.playBackgroundMusic();
            console.log("Audio unlocked and background music started.");

            window.removeEventListener("pointerdown", unlock);
            window.removeEventListener("keydown", unlock);
        };

        window.addEventListener("pointerdown", unlock);
        window.addEventListener("keydown", unlock);
    }

    public static registerEvents(): void {
        // EventBus.instance.on(GameEvent.MusicVolumeChanged, this.applyMusicVolume, this);
        // EventBus.instance.on(GameEvent.SoundVolumeChanged, this.applySoundVolume, this);
        // EventBus.instance.on(GameEvent.PlanetMerged, this.playMergeSound, this);
        // EventBus.instance.on(GameEvent.GameOver, this.playGameOverMusic, this);
        EventManager.onMusicVolumeChanged((volume) => {
            this.applyMusicVolume(volume);
        });
        EventManager.onSoundVolumeChanged((volume) => {
            this.applySoundVolume(volume);
        });
        EventManager.onPlanetMerged(() => {
            this.playMergeSound();
        });
        EventManager.onGameOver(() => {
            this.playGameOverMusic();
        });
    }

    private static applyMusicVolume(volume: number): void {
        if (sound.exists("background_sound")) {
            sound.volume("background_sound", volume);
        }
    }

    private static applySoundVolume(volume: number): void {
        if (sound.exists("merge_sound")) {
            sound.volume("merge_sound", volume);
        }
    }

    private static playMergeSound(): void {
        if (sound.exists("merge_sound")) {
            sound.play("merge_sound");
        }
    }

    private static playBackgroundMusic(): void {
        if (!SoundManager.isBackgroundMusicPlaying && sound.exists("background_sound")) {
            sound.play("background_sound", { loop: true });
            SoundManager.isBackgroundMusicPlaying = true;
        }
    }

    private static playGameOverMusic(): void {
        if (sound.exists("game_over_sound")) {
            sound.play("game_over_sound");
        }
    }
}
