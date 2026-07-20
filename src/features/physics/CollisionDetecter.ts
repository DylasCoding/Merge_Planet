import type { GameBox } from "../../ui/components/GameBox";
import type { WarningLine } from "../../ui/components/WarningLine";
import type { Planet } from "../planet/entities/Planet";
import type { CircleCollider } from "./CircleCollider";

export class CollisionDetecter {
    public detectCollsionPlanetWithBox(collider1: CircleCollider, gameBox: GameBox) {
        return (
            collider1.position.y + collider1.radius >=
                gameBox.gameBoxBounds.y + gameBox.gameBoxBounds.height ||
            collider1.position.x - collider1.radius <= gameBox.gameBoxBounds.x ||
            collider1.position.x + collider1.radius >=
                gameBox.gameBoxBounds.x + gameBox.gameBoxBounds.width ||
            collider1.position.y - collider1.radius <= gameBox.gameBoxBounds.y
        );
    }
    public detectCollisionPlanetWithPlanet(collider1: CircleCollider, collider2: CircleCollider) {
        const dx = collider2.position.x - collider1.position.x;
        const dy = collider2.position.y - collider1.position.y;
        const distanceSquare = dx * dx + dy * dy;
        const radiusSum = collider1.radius + collider2.radius;
        return distanceSquare <= radiusSum * radiusSum;
    }
    public detectCollisionPlanetWithWarningLines(
        collider: CircleCollider,
        warningLines: WarningLine,
    ) {
        const top = warningLines.y;

        const planetTop = collider.position.y - collider.radius;
        return planetTop <= top;
    }

    public WarningBeforeCollisionPlanetWithWarningLines(Planet: Planet, warningLines: WarningLine) {
        const top = warningLines.y + 100;

        const planetTop = Planet.y - Planet.data.radius;
        return planetTop <= top;
    }
}
