import { Application, Container, Sprite, Text } from "pixi.js";
import { Button } from "../components/Button.ts";
import { Font } from "../../core/Font.ts";
import { ScaleUtils } from "../../utils/ScaleUtils.ts";
import { SkinManager } from "../../features/planet/skin/SkinManager.ts";

export class SkinContainer extends Container {
    private app: Application;
    private bg: Sprite;
    private skinIcon: Sprite;
    private skinName: Text;
    private buyButton: Button;
    private bundleId: string;

    constructor(
        app: Application,
        bg: Sprite,
        icon: Sprite,
        skinName: string,
        price: number,
        bundleId: string,
    ) {
        super();
        this.app = app;
        this.bundleId = bundleId;

        this.bg = bg;
        const bgScale = ScaleUtils.getScaleByTargetWidth(this.app, this.bg.width, 0.08);
        this.bg.scale.set(bgScale);

        this.skinIcon = icon;
        const iconscale = ScaleUtils.getScaleByTargetWidth(this.app, this.skinIcon.width, 0.08);
        this.skinIcon.scale.set(iconscale);

        this.skinName = new Text({
            text: skinName,
            style: {
                fontFamily: Font.Asap_Bold,
                fill: 0xc095f5,
                fontSize: 18,
            },
        });
        this.skinName.position.set(
            this.bg.width / 2 - this.skinName.width / 2 - 12,
            this.bg.height / 2 + this.skinIcon.height / 2 - 20,
        );
        const nameScale = ScaleUtils.getScaleByTargetWidth(this.app, this.skinName.width, 0.07);
        this.skinName.scale.set(nameScale);

        this.buyButton = new Button(
            price === 0 ? "Select" : price.toString(),
            price === 0 ? Sprite.from("button_purple") : Sprite.from("button_yellow"),
            price === 0 ? undefined : "gem_icon",
        );

        this.buyButton.eventMode = "static";
        this.buyButton.onClick(async () => {
            this.buyButton.eventMode = "none"; // block spam
            await SkinManager.getInstance().changeSkin(this.bundleId);

            this.buyButton.eventMode = "static";
        });

        this.buyButton.setTextColor(price === 0 ? 0xffffff : 0x80ffff);
        this.buyButton.setBorderColor(0x000000, 1.5);

        this.buyButton.setButtonScale(1.2);
        const buttonScale = ScaleUtils.getScaleByTargetWidth(this.app, this.skinName.width, 0.08);
        this.buyButton.scale.set(buttonScale);

        this.buyButton.position.set(
            this.bg.width / 2,
            this.bg.height / 2 + this.skinIcon.height / 2 + 25,
        );

        this.addChild(this.bg, this.skinIcon, this.skinName, this.buyButton);
    }
}
