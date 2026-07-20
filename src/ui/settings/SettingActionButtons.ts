import { Container, Sprite } from "pixi.js";
import { Button } from "../components/common/Button.ts";

export class SettingActionButtons extends Container {
    private restartBtn: Button;
    private continueBtn: Button;
    private returnBtn: Button;

    constructor(onRestart: () => void, onContinue: () => void, onReturn: () => void) {
        super();

        this.restartBtn = new Button("Restart", Sprite.from("button_purple"));
        this.continueBtn = new Button("Continue", Sprite.from("button_blue"));
        this.returnBtn = new Button("Return", Sprite.from("button_yellow"));

        this.restartBtn.eventMode = "static";
        this.continueBtn.eventMode = "static";
        this.returnBtn.eventMode = "static";

        this.restartBtn.onClick(onRestart);
        this.continueBtn.onClick(onContinue);
        this.returnBtn.onClick(onReturn);

        this.restartBtn.setButtonScale(1.5);
        this.continueBtn.setButtonScale(1.5);
        this.returnBtn.setButtonScale(1.5);

        const spacing = 20;

        this.restartBtn.position.set(0, 0);
        this.continueBtn.position.set(this.restartBtn.x + this.restartBtn.width + spacing, 0);
        this.returnBtn.position.set(this.continueBtn.x + this.continueBtn.width + spacing, 0);

        this.addChild(this.restartBtn, this.continueBtn, this.returnBtn);
    }
}
