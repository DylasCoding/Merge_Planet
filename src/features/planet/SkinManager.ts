import { Assets, Texture } from "pixi.js";
import { SKIN_LIST } from "../data/SkinConfig.ts";
import { EventBus, GameEvent } from "../../../core/event/GameEvent.ts";

export class SkinManager {
    private static instance: SkinManager;

    private currentSkinBundle: string = SKIN_LIST[0]?.id || "planets";
    private currentPrefix: string = SKIN_LIST[0]?.prefix;

    public onSkinChanged?: () => void;

    public static getInstance(): SkinManager {
        if (!SkinManager.instance) SkinManager.instance = new SkinManager();
        return SkinManager.instance;
    }

    public async changeSkin(bundleName: string): Promise<void> {
        if (this.currentSkinBundle === bundleName) return;
        try {
            await Assets.loadBundle(bundleName);
            this.currentSkinBundle = bundleName;

            const skinInfo = SKIN_LIST.find((skin) => skin.id === bundleName);
            this.currentPrefix = skinInfo ? skinInfo.prefix : "";

            if (this.onSkinChanged) this.onSkinChanged();

            EventBus.instance.emit(GameEvent.SkinChanged);
        } catch (error) {
            console.error(error);
        }
    }

    public getPlanetTexture(originalKey: string): Texture {
        const activeKey = `${this.currentPrefix}${originalKey}`;
        return Assets.get(activeKey);
    }
}
