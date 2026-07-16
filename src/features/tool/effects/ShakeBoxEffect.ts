import { Container } from "pixi.js";

export class ShakeBoxEffect {
    private readonly gameBox: Container;
    constructor(gameBox: Container) {
        this.gameBox = gameBox;
    }

    public async play(onUpdate?: (deltaX: number) => void): Promise<void> {
        const originX = this.gameBox.x;
        const duration = 1200; // ms
        const interval = 16; // ~60 FPS
        const maxOffset = 300;
        const start = performance.now();

        while (true) {
            const elapsed = performance.now() - start;

            if (elapsed >= duration) {
                break;
            }
            const t = elapsed / duration;
            const amplitude = (1 - t) * maxOffset;
            const damping = Math.exp(-2 * t);

            const offset = Math.sin(t * Math.PI * 5) * amplitude * damping;
            const newX = originX + offset;
            const deltaX = newX - this.gameBox.x;

            this.gameBox.x = newX;
            this.gameBox.update();

            onUpdate?.(deltaX);

            await this.wait(interval);
        }
    }

    private wait(ms: number) {
        return new Promise<void>((resolve) => {
            setTimeout(resolve, ms);
        });
    }
}
