import { Sprite, Application } from "pixi.js";

export class ScaleUtils {
    public static getScaleByTargetWidth(
        app: Application,
        objectWidth: number,
        ratio: number,
    ): number {
        const targetWidth = app.screen.width * ratio;
        return targetWidth / objectWidth;
    }
}
