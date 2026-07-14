import { Container, Graphics, Sprite, Text } from "pixi.js";
import type { FederatedPointerEvent } from "pixi.js";
import { Font } from "../../core/Font.ts";

export class SettingRow extends Container {
    private readonly TOTAL_STEPS = 20;
    private icon: Sprite;
    private labelText: Text;
    private barContainer: Container;
    private barBg: Sprite;
    private barFill: Sprite;
    private barMask: Graphics;
    private currentStep: number;
    private onValueChange?: (value: number) => void;

    constructor(
        iconName: string,
        label: string,
        initialStep = 10,
        onValueChange?: (value: number) => void,
    ) {
        super();

        this.currentStep = initialStep;
        this.onValueChange = onValueChange;

        this.icon = Sprite.from(iconName);
        this.icon.scale.set(0.6);
        this.addChild(this.icon);

        this.labelText = new Text({
            text: label,
            style: { fontFamily: Font.Asap_Bold, fill: 0xffffff, fontSize: 24 },
        });
        this.labelText.position.set(this.icon.width + 10, 5);
        this.addChild(this.labelText);

        this.barContainer = new Container();
        this.barContainer.eventMode = "static";
        this.barContainer.cursor = "pointer";

        this.barBg = Sprite.from("sound_container");
        this.barBg.scale.set(0.6);
        this.barBg.position.set(this.labelText.x + this.labelText.width + 20, 0);

        this.barFill = Sprite.from("sound_bar");
        this.barFill.scale.set(0.6);
        this.barFill.position.set(this.barBg.x + 10, this.barBg.y + 13);

        this.barMask = new Graphics()
            .rect(0, 0, this.barFill.width, this.barFill.height)
            .fill({ color: 0xffffff });
        this.barMask.position.copyFrom(this.barFill.position);
        this.barFill.mask = this.barMask;

        this.barContainer.addChild(this.barBg, this.barFill, this.barMask);
        this.addChild(this.barContainer);

        this.barContainer.on("pointerdown", this.onBarClick.bind(this));

        this.updateProgress(this.currentStep);
    }

    private onBarClick(event: FederatedPointerEvent): void {
        const localClickPos = this.barFill.toLocal(event.global);
        const clickRatio = localClickPos.x / (this.barFill.width / this.barFill.scale.x);
        const targetedStep = Math.round(clickRatio * this.TOTAL_STEPS);
        this.updateProgress(targetedStep);
    }

    private updateProgress(step: number): void {
        this.currentStep = Math.max(0, Math.min(this.TOTAL_STEPS, step));
        const ratio = this.currentStep / this.TOTAL_STEPS;
        this.barMask.scale.x = ratio;

        if (this.onValueChange) {
            this.onValueChange(ratio);
        }
    }
}
