import type { AssetsManifest } from "pixi.js";

import background1 from "../assets/Background_Images/large/background-1-large.png";

import button_blue from "../assets/Button_Images/Source_Image_Sprites/medium/medium-blue-medium.png";
import button_pink from "../assets/Button_Images/Source_Image_Sprites/medium/medium-pink-medium.png";
import button_yellow from "../assets/Button_Images/Source_Image_Sprites/medium/medium-yellow-medium.png";
import button_purple from "../assets/Button_Images/Source_Image_Sprites/medium/medium-purple-medium.png";

import score_star from "../assets/Icons/star-64.png";
import score_bg from "../assets/Containers/Small/pause-container-small.png";

import gem_bg from "../assets/Button_Images/Pressed_Sprites/Medium/medium-yellow-pressed-medium.png";
import gem_icon from "../assets/Shop_Assets/gems-tier-1-medium.png";

import Asap_Bold from "../assets/Fonts/Asap-Bold.ttf";
import Righteous_Regular from "../assets/Fonts/Righteous-Regular.ttf";

import planet1 from "../assets/Icons/earth-128.png";
import planet2 from "../assets/Icons/full-moon-128.png";
import planet3 from "../assets/Icons/jupiter-128.png";

import nextPlanet_bg from "../assets/Grid_Components/Large/inventory-highlight-large 1.png";

import box from "../assets/Grid_Components/Extra Large/level-highlight-extra-large.png";

// import sidebar_bg from "../assets/Settings_Menu_Components/Large/vertical-scroll-bar-handle-large.png";
import sidebar_bg from "../assets/leftsidebar.png";
import arrow_icon from "../assets/Icons/arrowicon.png";

import tool_bg from "../assets/Button_Images/Highlighted_Sprite/medium/square-purple-highlight-medium.png";

import tool1_icon from "../assets/Icons/pickaxe-64.png";
import tool2_icon from "../assets/Icons/solar-system-1-64.png";

import highscore_icon from "../assets/Icons/crown-gold-64.png";

import add_icon from "../assets/Picto_Icons/Dark_Purple/add-32.png";

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

                nextPlanet_bg: nextPlanet_bg,

                box: box,

                sidebar_bg: sidebar_bg,
                arrow_icon: arrow_icon,

                tool_bg: tool_bg,
                tool1_icon: tool1_icon,
                tool2_icon: tool2_icon,
                highscore_icon: highscore_icon,
                add_icon: add_icon,
            },
        },
        {
            name: "planets",
            assets: {
                planet1: planet1,
                planet2: planet2,
                planet3: planet3,
                planet4: planet3,
                planet5: planet3,
                planet6: planet3,
                planet7: planet3,
                planet8: planet3,
                planet9: planet3,
                planet10: planet3,
            },
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
