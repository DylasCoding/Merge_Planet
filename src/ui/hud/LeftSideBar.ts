import { Container, Graphics, Sprite } from "pixi.js";
import type { Application } from "pixi.js";

export class LeftSideBar extends Container {
    private arrowIcon: Sprite;
    private planets: Sprite[] = [];
    private bg: Sprite;

    constructor(app: Application) {
        super();

        this.x = 0;
        this.y = 0;

        const leftPadding = 20;

        this.bg = Sprite.from("sidebar_bg");
        this.bg.anchor.set(0, 0.5);
        this.bg.scale.x = 1;
        this.bg.scale.y = 0.75;
        this.bg.x = leftPadding;
        this.bg.y = app.screen.height / 1.75;

        this.addChild(this.bg);

        const planetsContainer = new Container();
        const planetSpacing = 60;
        const planetStartY = -(10 * planetSpacing) / 2 + planetSpacing / 2;

        for (let i = 1; i <= 10; i++) {
            const planet = Sprite.from(`planet${i}`);
            planet.anchor.set(0.5);

            const displayIndex = 10 - i; // 9 -> 0

            planet.x = 0;
            planet.y = planetStartY + displayIndex * planetSpacing;

            planet.scale.set(0.5 - 0.015 * displayIndex);

            planetsContainer.addChild(planet);
            this.planets.push(planet);
        }

        planetsContainer.x = this.bg.x + this.bg.width / 2;
        planetsContainer.y = this.bg.y;

        this.addChild(planetsContainer);

        this.arrowIcon = Sprite.from("arrow_icon");
        this.arrowIcon.anchor.set(1, 0.5);
        this.arrowIcon.scale.set(0.5);

        planetsContainer.addChild(this.arrowIcon);
        this.pointToPlanet(1);
    }

    public pointToPlanet(planetNumber: number) {
        if (planetNumber < 1 || planetNumber > this.planets.length) {
            return;
        }

        const targetPlanet = this.planets[planetNumber - 1];
        this.arrowIcon.x = this.bg.width / 2 + 40;
        this.arrowIcon.y = targetPlanet.y;
    }
}
