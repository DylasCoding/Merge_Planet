import type { GameBox } from "../../ui/components/GameBox";
import type { WarningLine } from "../../ui/components/WarningLine";
import type { Planet } from "../planet/entities/Planet";

export class Collider {
    public detectCollsionPlanetWithBox(planet: Planet, gameBox: GameBox) {
        return (
            planet.planetRigidbody.position.y + planet.data.radius >=
                gameBox.gameBoxBounds.y + gameBox.gameBoxBounds.height ||
            planet.planetRigidbody.position.x - planet.data.radius <= gameBox.gameBoxBounds.x ||
            planet.planetRigidbody.position.x + planet.data.radius >=
                gameBox.gameBoxBounds.x + gameBox.gameBoxBounds.width ||
            planet.planetRigidbody.position.y - planet.data.radius <= gameBox.gameBoxBounds.y
        );
    }
    public detectCollisionPlanetWithPlanet(planet1: Planet, planet2: Planet) {
        const dx = planet2.planetRigidbody.position.x - planet1.planetRigidbody.position.x;
        const dy = planet2.planetRigidbody.position.y - planet1.planetRigidbody.position.y;
        const distanceSquare = dx * dx + dy * dy;
        const radiusSum = planet1.data.radius + planet2.data.radius;
        return distanceSquare <= radiusSum * radiusSum;
    }
    public detectCollisionPlanetWithWarningLines(Planet: Planet, warningLines: WarningLine) {
        const top = warningLines.y;

        const planetTop = Planet.y - Planet.data.radius;
        return planetTop <= top;
    }
    public crossTheWarningLines(Planet: Planet, warningLines: WarningLine) {
        const top = warningLines.y + 50;

        const planetTop = Planet.y - Planet.data.radius;
        return planetTop <= top;
    }
    public WarningBeforeCollisionPlanetWithWarningLines(Planet: Planet, warningLines: WarningLine) {
        const top = warningLines.y + 200;

        const planetTop = Planet.y - Planet.data.radius;
        return planetTop <= top;
    }
}
