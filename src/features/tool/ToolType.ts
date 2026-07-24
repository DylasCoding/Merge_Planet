export const ToolType = {
    None: "None",
    Pickaxe: "Pickaxe",
    Shuffle: "Shuffle",
} as const;

export type ToolType = (typeof ToolType)[keyof typeof ToolType];

export const ToolPrice = {
    [ToolType.Pickaxe]: 100,
    [ToolType.Shuffle]: 350,
    [ToolType.None]: 0,
};
