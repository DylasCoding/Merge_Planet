export interface ISkinInfo {
    id: string;
    name: string;
    icon: string;
    price: number;
    prefix: string;
}

export const SKIN_LIST: ISkinInfo[] = [
    { id: "planets", name: "Default Skin", icon: "planet10", price: 0, prefix: "" },
    { id: "spaces", name: "Space Skin", icon: "s_planet3", price: 100, prefix: "s_" },
];
