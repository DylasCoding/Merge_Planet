import { Container, Sprite, Text } from "pixi.js";
import { Font } from "../../core/Font.ts";
import { EventBus, GameEvent } from "../../core/event/GameEvent.ts";
import { PLANET_CONFIG } from "../../features/planet/data/PlanetConfig.ts";
import { SkinManager } from "../../features/planet/SkinManager.ts";

export class NextPlanetView extends Container {
    private icon: Sprite;
    private currentLevel: number = 0;

    constructor() {
        super();

        const text = new Text({
            text: "NEXT PLANET",
            style: {
                fontFamily: Font.Asap_Bold,
                fill: 0xffffb3,
                fontSize: 16,
            },
        });

        const bg = Sprite.from("nextPlanet_bg");
        this.icon = Sprite.from("planet1");

        bg.scale.x = 0.45;
        bg.scale.y = 0.5;
        this.icon.scale.set(0.5);

        text.anchor.set(0.5, 1);
        bg.anchor.set(0.5, 0);
        this.icon.anchor.set(0.5);

        bg.position.set(0, 30);
        this.icon.position.set(bg.x, bg.y + bg.height * 0.5);
        text.position.set(bg.x, bg.y - 8);

        this.addChild(bg, this.icon, text);

        EventBus.instance.on(GameEvent.NextPlanetLevelChanged, (nextLevel: number) => {
            this.currentLevel = nextLevel;
            this.updatePlanetIcon(nextLevel);
        });

        EventBus.instance.on(GameEvent.SkinChanged, () => {
            this.updatePlanetIcon(this.currentLevel);
        });
    }

    private updatePlanetIcon(level: number): void {
        const data = PLANET_CONFIG[level];
        if (data) {
            this.icon.texture = SkinManager.getInstance().getPlanetTexture(data.textureKey);
            this.icon.scale.set(1 - (10 - level) / 10);
        }
    }
}
