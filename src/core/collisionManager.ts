import { Planet } from "../features/planet/entities/Planet";
import { planetBox } from "../features/planet/entities/planetBox";
import { collisionResolve } from "../features/Physics/collisionResolve";

export class collisionManager {
    public listOfPlanetObjects!: Array<Planet>;
    public planetBox!: planetBox;
    public cResolver: collisionResolve;
    constructor() {
        this.cResolver = new collisionResolve();
    }
    update() {
        for (let i = 0; i < 8; i++) {
            this.resolveCollisionPlanetWithPlanet();
        }
        this.resolveCollisionPlanetWithBox();
    }
    //function: check if planet collides with box and return boolean value
    detectCollisionPlanetWithBox(planet: Planet, planetBox: planetBox) {
        return (
            planet.planetRigidbody.position.y + planet.data.radius >=
                planetBox.y + planetBox.boxHeight / 2 ||
            planet.planetRigidbody.position.x - planet.data.radius <=
                planetBox.x - planetBox.boxWidth / 2 ||
            planet.planetRigidbody.position.x + planet.data.radius >=
                planetBox.x + planetBox.boxWidth / 2
        );
    }

    //function: check if planet collides with other planet and return boolean value
    detectCollisionPlanetWithPlanet(planet1: Planet, planet2: Planet) {
        const dx = planet2.planetRigidbody.position.x - planet1.planetRigidbody.position.x;
        const dy = planet2.planetRigidbody.position.y - planet1.planetRigidbody.position.y;
        const distanceSquare = dx * dx + dy * dy;
        const radiusSum = planet1.data.radius + planet2.data.radius;
        return distanceSquare <= radiusSum * radiusSum;
    }

    //function: resolve the collision between planet and box
    resolveCollisionPlanetWithBox() {
        for (let i = 0; i < this.listOfPlanetObjects.length; i++) {
            if (!this.detectCollisionPlanetWithBox(this.listOfPlanetObjects[i], this.planetBox))
                continue;
            this.cResolver.resolvePlanetWithBox(this.listOfPlanetObjects[i], this.planetBox);
        }
    }

    //function: resolve the collision between plante and planet
    resolveCollisionPlanetWithPlanet() {
        for (let i = 0; i < this.listOfPlanetObjects.length; i++) {
            const planet1 = this.listOfPlanetObjects[i];

            for (let j = i + 1; j < this.listOfPlanetObjects.length; j++) {
                const planet2 = this.listOfPlanetObjects[j];
                if (!this.detectCollisionPlanetWithPlanet(planet1, planet2)) continue;
                this.cResolver.resolvePlanetWithPlanet(planet1, planet2);
            }
        }
    }
    setComponentForCollision(ListOfPlanetObjects: Array<Planet>, planetBox: planetBox) {
        this.listOfPlanetObjects = ListOfPlanetObjects;
        this.planetBox = planetBox;
    }
}
