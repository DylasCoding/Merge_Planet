import { Planet } from "../features/planet/entities/Planet";

import { CollisionResolve } from "../features/physics/CollisionResolve";
import type { GameBox } from "../ui/components/GameBox";
import type { MergeManager } from "../core/MergeManager";
import { Collider } from "../features/physics/Collider";

export class CollisionManager {
    public listOfPlanetObjects!: Array<Planet>;
    public gameBox!: GameBox;
    public mergeManager!: MergeManager;

    public cResolver: CollisionResolve;
    public Collider: Collider;

    constructor() {
        this.cResolver = new CollisionResolve();
        this.Collider = new Collider();
    }
    update() {
        for (const planet of this.listOfPlanetObjects) {
            planet.planetRigidbody.isGrounded = false;
        }
        for (let i = 0; i < 3; i++) {
            this.resolveCollisionPlanetWithPlanet();
        }
        this.resolveCollisionPlanetWithBox();
    }

    //function: resolve the collision between planet and box
    resolveCollisionPlanetWithBox() {
        for (let i = 0; i < this.listOfPlanetObjects.length; i++) {
            if (
                !this.Collider.detectCollsionPlanetWithBox(
                    this.listOfPlanetObjects[i],
                    this.gameBox,
                )
            )
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
                if (!this.Collider.detectCollisionPlanetWithPlanet(planet1, planet2)) continue;
                this.cResolver.resolvePlanetWithPlanet(planet1, planet2);
                if (this.mergeManager.checkingPlanetType(planet1, planet2)) {
                    this.mergeManager.pushMergeQueue(planet1, planet2);
                }
            }
        }
    }
    setComponentForCollision(
        ListOfPlanetObjects: Array<Planet>,
        gameBox: GameBox,
        mergeManager: MergeManager,
    ) {
        this.listOfPlanetObjects = ListOfPlanetObjects;
        this.gameBox = gameBox;
        this.mergeManager = mergeManager;
    }
}
