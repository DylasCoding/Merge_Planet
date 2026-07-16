import { Application, Assets, Sprite } from "pixi.js";
import { Game } from "./Game";
import { Manifest } from "./core/Manifest.ts";
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

    await Assets.init({ manifest: Manifest });
    await Assets.loadBundle(["backgrounds", "fonts", "sounds"]);
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
