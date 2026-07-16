import { Planet } from "../features/planet/entities/Planet";

import { CollisionResolve } from "../features/physics/CollisionResolve";
import type { GameBox } from "../ui/components/GameBox";
import type { MergeManager } from "../core/MergeManager";
import { Collider } from "../features/physics/Collider";
import type { WarningLine } from "../ui/components/WarningLine";

export class CollisionManager {
    public listOfPlanetObjects!: Array<Planet>;
    public gameBox!: GameBox;
    public warningLine!: WarningLine;
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
        for (let i = 0; i < 15; i++) {
            this.resolveCollisionPlanetWithPlanet();
        }
        this.resolveCollisionPlanetWithBox();

        // this.DetectCollisionToGameOver();
        this.warningLine.isPlanetAbobeWarningLines = this.hasPlanetAboveWarningLine();
        this.warningLine.isWarning = this.WarningbeforeCollision();
    }

    DetectCollisionToGameOver() {
        for (const planet of this.listOfPlanetObjects) {
            if (
                this.Collider.WarningBeforeCollisionPlanetWithWarningLines(planet, this.warningLine)
            ) {
                this.warningLine.isWarning = true;
            } else {
                this.warningLine.isWarning = false;
            }
            if (
                this.Collider.detectCollisionPlanetWithWarningLines(planet, this.warningLine) &&
                planet.isDropPlanet
            ) {
                const top = this.warningLine.y + 100;
                console.log("top warning:" + top);
                const planetTop = planet.y - planet.data.radius;
                console.log("Planet top:" + planetTop);
                this.warningLine.isPlanetAbobeWarningLines = true;
                continue;
            }
            this.warningLine.isPlanetAbobeWarningLines = false;
        }
    }
    public hasPlanetAboveWarningLine(): boolean {
        for (const planet of this.listOfPlanetObjects) {
            if (
                planet.notUntilCount &&
                this.Collider.detectCollisionPlanetWithWarningLines(planet, this.warningLine)
            ) {
                return true;
            }
        }
        return false;
    }
    public WarningbeforeCollision(): boolean {
        for (const planet of this.listOfPlanetObjects) {
            if (
                planet.notUntilCount &&
                this.Collider.WarningBeforeCollisionPlanetWithWarningLines(planet, this.warningLine)
            ) {
                return true;
            }
        }
        return false;
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

    //function: resolve the collision between plant and planet
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
        warningLine: WarningLine,
    ) {
        this.listOfPlanetObjects = ListOfPlanetObjects;
        this.gameBox = gameBox;
        this.warningLine = warningLine;
        this.mergeManager = mergeManager;
    }
}
