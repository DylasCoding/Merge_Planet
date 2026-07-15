import { Container, Sprite, Text } from "pixi.js";
import { Font } from "../../core/Font.ts";
import { StorageManager } from "../../core/manager/StorageManager.ts";
import { EventBus, GameEvent } from "../../core/event/GameEvent.ts";

export class GemView extends Container {
    private readonly gemText: Text;

    constructor() {
        super();

        const bg = Sprite.from("gem_bg");
        const icon = Sprite.from("gem_icon");
        const addIcon = Sprite.from("add_icon");

        this.gemText = new Text({
            text: StorageManager.gems.toString(),
            style: {
                fontFamily: Font.Righteous_Regular,
                fill: 0x80ffff,
                fontSize: 24,
                stroke: {
                    color: 0x000000,
                    width: 1.5,
                },
            },
        });

        bg.scale.x = 1;
        bg.scale.y = 0.7;

        icon.scale.set(0.45);

        bg.anchor.set(0, 0);
        icon.anchor.set(0.5);
        addIcon.anchor.set(0.5);
        this.gemText.anchor.set(0.5);

        bg.position.set(0, 0);

        icon.position.set(25, bg.height / 2);

        addIcon.position.set(bg.width - 20, bg.height / 2);

        addIcon.eventMode = "static";
        addIcon.cursor = "pointer";

        addIcon.on("pointertap", () => {
            this.onAddGemClick();
        });

        this.gemText.position.set(bg.width * 0.5, bg.height / 2);

        this.addChild(bg, icon, addIcon, this.gemText);

        EventBus.instance.on(GameEvent.GemChanged, (gems: number) => {
            this.setGemText(gems);
        });
    }

    private onAddGemClick(): void {
        const addGemCount = 100;
        StorageManager.updateGems(addGemCount);
    }

    public setGemText(gem: number): void {
        this.gemText.text = gem.toString();
    }
}
