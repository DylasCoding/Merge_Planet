import { Application, Assets } from "pixi.js";
import { Game } from "./Game";
import { manifest } from "./core/manifest.ts";

async function main() {
    const app = new Application();

    await app.init({
        resizeTo: window,
        background: "#1b1b1b",
    });

    await Assets.init({ manifest });

    document.body.appendChild(app.canvas);

    const game = new Game(app);
    await game.initialize();
}

main();
