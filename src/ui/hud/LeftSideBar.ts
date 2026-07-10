import { Container, Graphics, Sprite } from "pixi.js";
import type { Application } from "pixi.js";

export class LeftSideBar extends Container {
    constructor(app: Application) {
        super();

        this.x = 0;
        this.y = 0;

        const leftPadding = 20;
        const bg = Sprite.from("sidebar_bg");
        bg.anchor.set(0, 0.5);
        bg.scale.x = 1;
        bg.scale.y = 0.8;
        bg.x = leftPadding;
        bg.y = app.screen.height / 1.75;

        this.addChild(bg);

        const planetsContainer = new Container();
        const planetSpacing = 60;
        const planetStartY = -(10 * planetSpacing) / 2 + planetSpacing / 2;

        for (let i = 1; i <= 10; i++) {
            const planet = Sprite.from(`planet${i}`);
            planet.anchor.set(0.5);

            planet.x = 0;
            planet.y = planetStartY + (i - 1) * planetSpacing;
            planet.scale.set(0.5);

            planetsContainer.addChild(planet);
        }

        planetsContainer.x = bg.x + bg.width / 2;
        planetsContainer.y = bg.y;

        this.addChild(planetsContainer);
    }
}
