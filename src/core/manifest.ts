import type { AssetsManifest } from "pixi.js";

import background1 from "../assets/Background_Images/large/background-1-large.png";

import button_blue from "../assets/Button_Images/Source_Image_Sprites/medium/medium-blue-medium.png";
import button_pink from "../assets/Button_Images/Source_Image_Sprites/medium/medium-pink-medium.png";
import button_yellow from "../assets/Button_Images/Source_Image_Sprites/medium/medium-yellow-medium.png";
import button_purple from "../assets/Button_Images/Source_Image_Sprites/medium/medium-purple-medium.png";

export const manifest: AssetsManifest = {
    bundles: [
        {
            name: "backgrounds",
            assets: {
                background_sky: background1,
            },
        },
        {
            name: "ui",
            assets: {
                button_blue: button_blue,
                button_pink: button_pink,
                button_yellow: button_yellow,
                button_purple: button_purple,
            },
        },
        {
            name: "planets",
            assets: {},
        },
    ],
};
