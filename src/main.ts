import { Application, Assets, Sprite } from "pixi.js";
import { Game } from "./Game";
import { manifest } from "./core/manifest.ts";
import { StorageManager } from "./core/manager/StorageManager.ts";
import "./style.css";

async function main() {
    const app = new Application();

    await app.init({
        resizeTo: window,
        background: "#fdfdfd",
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
    });

    StorageManager.load();

    await Assets.init({ manifest });
    await Assets.loadBundle(["backgrounds", "fonts"]);
    const background = Sprite.from("background_sky");

    function resizeBackground() {
        background.width = app.screen.width;
        background.height = app.screen.height;
    }

    resizeBackground();

    app.renderer.on("resize", resizeBackground);

    app.stage.addChild(background);

    document.body.appendChild(app.canvas);

    const game = new Game(app);
    await game.initialize();
}

main();
