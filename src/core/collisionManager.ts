import { Planet } from "../features/planet/entities/Planet";

import { collisionResolve } from "../features/Physics/collisionResolve";
import type { GameBox } from "../ui/components/GameBox";
import type { mergeManager } from "./mergeManager";

export class collisionManager {
    public listOfPlanetObjects!: Array<Planet>;
    public gameBox!: GameBox;
    public cResolver: collisionResolve;

    public mergeManager!: mergeManager;
    constructor() {
        this.cResolver = new collisionResolve();
    }
    update() {
        for (const planet of this.listOfPlanetObjects) {
            planet.planetRigidbody.isGrounded = false;
        }
        for (let i = 0; i < 15; i++) {
            this.resolveCollisionPlanetWithPlanet();
        }
        this.resolveCollisionPlanetWithBox();
    }
    //function: check if planet collides with box and return boolean value
    detectCollisionPlanetWithBox(planet: Planet, gameBox: GameBox) {
        return (
            planet.planetRigidbody.position.y + planet.data.radius >=
                gameBox.gameBoxBounds.y + gameBox.gameBoxBounds.height ||
            planet.planetRigidbody.position.x - planet.data.radius <= gameBox.gameBoxBounds.x ||
            planet.planetRigidbody.position.x + planet.data.radius >=
                gameBox.gameBoxBounds.x + gameBox.gameBoxBounds.width
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
            if (!this.detectCollisionPlanetWithBox(this.listOfPlanetObjects[i], this.gameBox))
                continue;
            this.cResolver.resolvePlanetWithBox(this.listOfPlanetObjects[i], this.gameBox);
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
                if (this.mergeManager.checkingPlanetType(planet1, planet2)) {
                    console.log("MERGE DETECTED!");
                    this.mergeManager.pushMergeQueue(planet1, planet2);
                }
            }
        }
    }
    setComponentForCollision(
        ListOfPlanetObjects: Array<Planet>,
        gameBox: GameBox,
        mergeManager: mergeManager,
    ) {
        this.listOfPlanetObjects = ListOfPlanetObjects;
        this.gameBox = gameBox;
        this.mergeManager = mergeManager;
    }
}
