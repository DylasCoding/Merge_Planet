import { Container, Rectangle, Assets, TilingSprite, Graphics } from "pixi.js";

export class ToolOverlayWithPickaxe extends Container {
    private readonly darkLayerTop = new Graphics();
    private readonly darkLayerLeft = new Graphics();
    private readonly darkLayerRight = new Graphics();
    private readonly darkLayerBottom = new Graphics();

    private readonly top = new TilingSprite({
        texture: Assets.get("overlay"),
        width: 1,
        height: 1,
    });

    private readonly left = new TilingSprite({
        texture: Assets.get("overlay"),
        width: 1,
        height: 1,
    });

    private readonly right = new TilingSprite({
        texture: Assets.get("overlay"),
        width: 1,
        height: 1,
    });

    private readonly bottom = new TilingSprite({
        texture: Assets.get("overlay"),
        width: 1,
        height: 1,
    });

    constructor() {
        super();

        const tileScale = 0.8;

        this.top.tileScale.set(tileScale);
        this.left.tileScale.set(tileScale);
        this.right.tileScale.set(tileScale);
        this.bottom.tileScale.set(tileScale);

        this.addChild(this.top, this.left, this.right, this.bottom);
        this.addChild(
            this.darkLayerTop,
            this.darkLayerLeft,
            this.darkLayerRight,
            this.darkLayerBottom,
        );

        this.visible = false;
        this.eventMode = "none";
    }

    public show(): void {
        this.visible = true;
    }

    public hide(): void {
        this.visible = false;
    }

    public redraw(screen: Rectangle, hole: Bounds): void {
        // Top
        this.top.position.set(0, 0);
        this.top.width = screen.width;
        this.top.height = hole.y - 10;

        // Left
        this.left.position.set(0, hole.y - 10);
        this.left.width = hole.x - 10;
        this.left.height = hole.height + 25;

        // Right
        const right = hole.x - 10 + hole.width + 25;

        this.right.position.set(right, hole.y - 10);
        this.right.width = screen.width - right;
        this.right.height = hole.height + 25;

        // Bottom
        const bottom = hole.y - 10 + hole.height + 25;

        this.bottom.position.set(0, bottom);
        this.bottom.width = screen.width;
        this.bottom.height = screen.height - bottom;

        // Dark layers
        this.darkLayerTop.clear();
        this.darkLayerTop
            .rect(0, 0, screen.width, hole.y - 15)
            .fill({ color: 0x000000, alpha: 0.6 });

        this.darkLayerLeft.clear();
        this.darkLayerLeft
            .rect(0, hole.y - 15, hole.x - 10, hole.height + 25)
            .fill({ color: 0x000000, alpha: 0.6 });

        this.darkLayerRight.clear();
        this.darkLayerRight
            .rect(
                hole.x - 10 + hole.width + 20,
                hole.y - 15,
                screen.width - (hole.x - 10 + hole.width + 20),
                hole.height + 25,
            )
            .fill({ color: 0x000000, alpha: 0.6 });

        this.darkLayerBottom.clear();
        this.darkLayerBottom
            .rect(
                0,
                hole.y - 10 + hole.height + 20,
                screen.width,
                screen.height - (hole.y - 10 + hole.height + 20),
            )
            .fill({ color: 0x000000, alpha: 0.6 });
    }

    private time = 0;
    private offsetX = 0;
    private offsetY = 0;

    public update(deltaTime: number): void {
        this.time += deltaTime;

        const speed = 150 + Math.sin(this.time * 0.005) * 0.04;
        this.offsetX += speed * deltaTime;

        this.offsetY = Math.sin(this.time * 0.008) * 4;

        this.top.tilePosition.set(this.offsetX, this.offsetY);
        this.left.tilePosition.set(this.offsetX - this.left.x, this.offsetY - this.left.y);
        this.right.tilePosition.set(this.offsetX - this.right.x, this.offsetY - this.right.y);
        this.bottom.tilePosition.set(this.offsetX - this.bottom.x, this.offsetY - this.bottom.y);

        const alpha = 0.85 + Math.sin(this.time * 0.01) * 0.03;
        this.alpha = alpha;
    }
}

export interface Bounds {
    x: number;
    y: number;
    width: number;
    height: number;
}
