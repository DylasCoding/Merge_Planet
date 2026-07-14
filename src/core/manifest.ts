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

import planet1 from "../assets/Icons/mercury-128.png";
import planet2 from "../assets/Icons/venus-128.png";
import planet3 from "../assets/Icons/earth-128.png";
import planet4 from "../assets/Icons/mars-128.png";
import planet5 from "../assets/Icons/jupiter-128.png";
import planet6 from "../assets/Icons/saturn-128.png";
import planet7 from "../assets/Icons/uranus-128.png";
import planet8 from "../assets/Icons/neptune-128.png";
import planet9 from "../assets/Icons/sun-128.png";
import planet10 from "../assets/Icons/full-moon-128.png";

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
import setting_icon from "../assets/Picto_Icons/White/settings-64.png";
import setting_close from "../assets/Picto_Icons/White/cross-64.png";
import setting_panel from "../assets/Containers/Large/setting-container-large.png";
import sound_icon from "../assets/Picto_Icons/White/sound-64.png";
import music_icon from "../assets/Picto_Icons/White/music-64.png";
import sound_bar from "../assets/Settings_Menu_Components/Large/sound-bar-full-large.png";
import sound_container from "../assets/Settings_Menu_Components/Large/sound-bar-container-large.png";
import panel_line from "../assets/Settings_Menu_Components/Medium/settings-divider-medium.png";

import shop_bg from "../assets/Grid_Components/Medium/item-shop-container-medium.png";
import skin1 from "../assets/Icons/astronaut-128.png";

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
                setting_icon: setting_icon,
                setting_close: setting_close,
                setting_panel: setting_panel,
                sound_icon: sound_icon,
                music_icon: music_icon,
                sound_bar: sound_bar,
                sound_container: sound_container,
                panel_line: panel_line,

                shop_bg: shop_bg,
            },
        },
        {
            name: "planets",
            assets: {
                planet1: planet1,
                planet2: planet2,
                planet3: planet3,
                planet4: planet4,
                planet5: planet5,
                planet6: planet6,
                planet7: planet7,
                planet8: planet8,
                planet9: planet9,
                planet10: planet10,
            },
        },
        {
            name: "skin1",
            assets: {
                skin1: skin1,
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
