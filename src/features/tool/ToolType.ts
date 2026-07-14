export const ToolType = {
    None: "None",
    Pickaxe: "Pickaxe",
} as const;

export type ToolType = (typeof ToolType)[keyof typeof ToolType];
