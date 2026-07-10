import { Planet } from "../features/planet/entities/Planet";
import { planetBox } from "../features/planet/entities/planetBox";
export class collisionManager {
    public listOfPlanetObjects!: Array<Planet>;
    public planetBox!: planetBox;
    constructor() {}
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
            if (this.detectCollisionPlanetWithBox(this.listOfPlanetObjects[i], this.planetBox)) {
                const left = this.planetBox.x - this.planetBox.boxWidth / 2;
                const right = this.planetBox.x + this.planetBox.boxWidth / 2;
                const bottom = this.planetBox.y + this.planetBox.boxHeight / 2;
                const planetRadius = this.listOfPlanetObjects[i].data.radius;
                const planetPositionX = this.listOfPlanetObjects[i].planetRigidbody.position.x;
                const planetPositionY = this.listOfPlanetObjects[i].planetRigidbody.position.y;
                if (planetPositionX - planetRadius <= left) {
                    this.listOfPlanetObjects[i].planetRigidbody.position.x = left + planetRadius;
                }
                if (planetPositionX + planetRadius >= right) {
                    this.listOfPlanetObjects[i].planetRigidbody.position.x = right - planetRadius;
                }
                if (planetPositionY + planetRadius >= bottom) {
                    this.listOfPlanetObjects[i].planetRigidbody.position.y = bottom - planetRadius;
                    if (Math.abs(this.listOfPlanetObjects[i].planetRigidbody.velocity.y) < 0.2)
                        this.listOfPlanetObjects[i].planetRigidbody.velocity.y = 0;
                    else
                        this.listOfPlanetObjects[i].planetRigidbody.velocity.y *=
                            -this.listOfPlanetObjects[i].planetRigidbody.restitution;
                }
                this.listOfPlanetObjects[i].planetRigidbody.velocity.x *= 0.8;
            }
        }
    }
    //function: resolve the collision between plante and planet
    resolveCollisionPlanetWithPlanet() {
        for (let i = 0; i < this.listOfPlanetObjects.length; i++) {
            const planet1 = this.listOfPlanetObjects[i];
            for (let j = i + 1; j < this.listOfPlanetObjects.length; j++) {
                const planet2 = this.listOfPlanetObjects[j];
                if (this.detectCollisionPlanetWithPlanet(planet1, planet2)) {
                    const dx =
                        planet2.planetRigidbody.position.x - planet1.planetRigidbody.position.x;
                    const dy =
                        planet2.planetRigidbody.position.y - planet1.planetRigidbody.position.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance <= 0.0001) continue;

                    const radiusSum = planet1.data.radius + planet2.data.radius;
                    const nx = dx / distance;
                    const ny = dy / distance;
                    const InverseMass1 = 1 / planet1.data.mass;
                    const InverseMass2 = 1 / planet2.data.mass;

                    //feat: Collision Reponse with Impulse
                    const rvx =
                        planet2.planetRigidbody.velocity.x - planet1.planetRigidbody.velocity.x;
                    const rvy =
                        planet2.planetRigidbody.velocity.y - planet1.planetRigidbody.velocity.y;

                    const nvelocity = rvx * nx + rvy * ny;

                    if (nvelocity > 0) continue;
                    let eRestutition = Math.min(
                        planet2.planetRigidbody.restitution,
                        planet1.planetRigidbody.restitution,
                    );
                    if (Math.abs(nvelocity) < 1.0) {
                        eRestutition = 0.0;
                    }
                    const jIm = (-(1 + eRestutition) * nvelocity) / (InverseMass1 + InverseMass2);
                    const impulseX = jIm * nx;
                    const impulseY = jIm * ny;

                    this.listOfPlanetObjects[i].planetRigidbody.velocity.x -=
                        impulseX * InverseMass1;
                    this.listOfPlanetObjects[i].planetRigidbody.velocity.y -=
                        impulseY * InverseMass1;
                    this.listOfPlanetObjects[j].planetRigidbody.velocity.x +=
                        impulseX * InverseMass2;
                    this.listOfPlanetObjects[j].planetRigidbody.velocity.y +=
                        impulseY * InverseMass2;

                    //feat: Collision Response with friction
                    const tx = -ny;
                    const ty = nx;
                    const tVelocity = rvx * tx + rvy * ty;
                    let jt = -tVelocity / (InverseMass1 + InverseMass2);
                    const mu = 0.05;
                    const maxFriction = mu * jIm;
                    jt = Math.max(-maxFriction, Math.min(maxFriction, jt));
                    const frictionX = jt * tx;
                    const frictionY = jt * ty;

                    this.listOfPlanetObjects[i].planetRigidbody.velocity.x -=
                        frictionX * InverseMass1;
                    this.listOfPlanetObjects[i].planetRigidbody.velocity.y -=
                        frictionY * InverseMass1;
                    this.listOfPlanetObjects[j].planetRigidbody.velocity.x +=
                        frictionX * InverseMass2;
                    this.listOfPlanetObjects[j].planetRigidbody.velocity.y +=
                        frictionY * InverseMass2;

                    const k_slop = 0.1;
                    const k_percent = 0.8;
                    const overLap = radiusSum - distance;
                    const posCorrection =
                        (Math.max(overLap - k_slop, 0) / (InverseMass1 + InverseMass2)) * k_percent;

                    const cx = nx * posCorrection;
                    const cy = ny * posCorrection;

                    this.listOfPlanetObjects[i].planetRigidbody.position.x -= cx * InverseMass1;
                    this.listOfPlanetObjects[i].planetRigidbody.position.y -= cy * InverseMass2;
                    this.listOfPlanetObjects[j].planetRigidbody.position.x += cx * InverseMass1;
                    this.listOfPlanetObjects[j].planetRigidbody.position.y += cy * InverseMass2;
                }
            }
        }
    }

    setComponentForCollision(ListOfPlanetObjects: Array<Planet>, planetBox: planetBox) {
        this.listOfPlanetObjects = ListOfPlanetObjects;
        this.planetBox = planetBox;
    }
}
