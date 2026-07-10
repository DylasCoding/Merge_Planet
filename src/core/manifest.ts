import type { AssetsManifest } from "pixi.js";

import background1 from "../assets/Background_Images/large/background-1-large.png";

import button_blue from "../assets/Button_Images/Source_Image_Sprites/medium/medium-blue-medium.png";
import button_pink from "../assets/Button_Images/Source_Image_Sprites/medium/medium-pink-medium.png";
import button_yellow from "../assets/Button_Images/Source_Image_Sprites/medium/medium-yellow-medium.png";
import button_purple from "../assets/Button_Images/Source_Image_Sprites/medium/medium-purple-medium.png";

import score_star from "../assets/Icons/star-64.png";
import score_bg from "../assets/Containers/Small/pause-container-small.png";

import gem_bg from "../assets/Rank_System_Components/Medium/ranking-highlight-medium.png";
import gem_icon from "../assets/Icons/gem-1-64.png";

import Asap_Bold from "../assets/Fonts/Asap-Bold.ttf";
import Righteous_Regular from "../assets/Fonts/Righteous-Regular.ttf";

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

                score_star: score_star,
                score_bg: score_bg,

                gem_bg: gem_bg,
                gem_icon: gem_icon,
            },
        },
        {
            name: "planets",
            assets: {},
        },
        {
            name: "fonts",
            assets: {
                Asap_Bold: Asap_Bold,
                Righteous_Regular: Righteous_Regular,
            },
        },
    ],
};
