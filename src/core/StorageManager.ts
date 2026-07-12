export interface GameSaveData {
    highScore: number;
    gems: number;
}

export class StorageManager {
    private static readonly SAVE_KEY = "pixi_space_game_save_v1";
    private static data: GameSaveData;

    private static readonly DEFAULT_DATA: GameSaveData = {
        highScore: 0,
        gems: 0,
    };

    public static load(): void {
        try {
            const savedData = localStorage.getItem(this.SAVE_KEY);
            if (savedData) {
                const decodedString = atob(savedData);
                const parsedData = JSON.parse(decodedString);

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

            const encodedString = btoa(jsonString);
            localStorage.setItem(this.SAVE_KEY, encodedString);
        } catch (error) {
            console.error("Save data error:", error);
        }
    }

    public static get gems(): number {
        return this.data.gems;
    }

    public static addGems(amount: number): void {
        this.data.gems += amount;
        this.save();
    }

    public static get highScore(): number {
        return this.data.highScore;
    }

    public static updateHighScore(score: number): void {
        if (score > this.data.highScore) {
            this.data.highScore = score;
            this.save();
        }
    }
}
