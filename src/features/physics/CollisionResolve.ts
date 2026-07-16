import type { GameBox } from "../../ui/components/GameBox";
import { FrictionResolve } from "../../utils/math/CalculateFriction";
import { ImpulseResolve } from "../../utils/math/CalculateImpulse";
import { PositionCorrectionResolve } from "../../utils/math/CalculatePositionCorrection";
import type { Planet } from "../planet/entities/Planet";

export class CollisionResolve {
    public impulse: ImpulseResolve;
    public friction: FrictionResolve;
    public position: PositionCorrectionResolve;
    constructor() {
        this.impulse = new ImpulseResolve();
        this.friction = new FrictionResolve();
        this.position = new PositionCorrectionResolve();
    }
    resolvePlanetWithBox(planet: Planet, gameBox: GameBox) {
        const left = gameBox.gameBoxBounds.x;
        const right = gameBox.gameBoxBounds.x + gameBox.gameBoxBounds.width;
        const bottom = gameBox.gameBoxBounds.y + gameBox.gameBoxBounds.height;
        const top = gameBox.gameBoxBounds.y - 15;
        const planetRadius = planet.data.radius;
        const planetPositionX = planet.planetRigidbody.position.x;
        const planetPositionY = planet.planetRigidbody.position.y;
        const planetRG = planet.planetRigidbody;
        const EPS_V = 0.2;
        const EPS_ROLL = 0.3;
        if (planetPositionX - planetRadius <= left) {
            planetRG.position.x = left + planetRadius;
            planetRG.velocity.x *= -planet.planetRigidbody.restitution;
            if (Math.abs(planetRG.velocity.x) > EPS_ROLL) {
                planetRG.angularVelocity += planetRG.velocity.y * 0.02;
            } else if (Math.abs(planetRG.velocity.y) < EPS_V) {
                planetRG.angularVelocity = 0;
            }
        }
        if (planetPositionX + planetRadius >= right) {
            planetRG.position.x = right - planetRadius;
            planetRG.velocity.x *= -planetRG.restitution;
            if (Math.abs(planetRG.velocity.x) > EPS_ROLL) {
                planetRG.angularVelocity -= planetRG.velocity.y * 0.02;
            } else if (Math.abs(planetRG.velocity.y) < EPS_V) {
                planetRG.angularVelocity = 0;
            }
        }
        if (planetPositionY - planetRadius <= top) {
            planet.planetRigidbody.position.y = top + planetRadius;

            if (planet.planetRigidbody.velocity.y < 0) {
                // nảy nhẹ
                planet.planetRigidbody.velocity.y *= 0;
            }
            planet.planetRigidbody.velocity.x *= 0.98;
        }
        if (planetPositionY + planetRadius >= bottom) {
            planetRG.isGrounded = true;
            planet.notUntilCount = true;

            planetRG.position.y = bottom - planetRadius;

            if (Math.abs(planetRG.velocity.y) < EPS_V) {
                planetRG.velocity.y = 0;
            } else {
                if (Math.abs(planet.planetRigidbody.velocity.x) < 3) {
                    planetRG.velocity.x = 0;
                    planetRG.angularVelocity = 0;
                }
                planetRG.angularVelocity = planetRG.velocity.x / planet.data.radius;
                planetRG.velocity.y *= -planetRG.restitution;
            }

            planetRG.velocity.x *= 0.99;

            if (Math.abs(planetRG.velocity.x) < 0.05 && Math.abs(planetRG.velocity.y) < 0.05) {
                planetRG.sleepTimer++;
            } else {
                planetRG.sleepTimer = 0;
            }

            if (planetRG.sleepTimer > 20) {
                planetRG.isSleeping = true;

                planetRG.velocity.x = 0;
                planetRG.velocity.y = 0;

                planetRG.angularVelocity = 0;
            }
        }
    }
    resolvePlanetWithPlanet(planet1: Planet, planet2: Planet) {
        const normal = this.calculateNormal(planet1, planet2);

        if (!normal) return;
        this.applyPositionCorrection(planet1, planet2, normal);

        const j = this.applyImpulse(planet1, planet2, normal);

        if (j === null) return;

        this.applyFriction(planet1, planet2, normal, j);
    }
    applyPositionCorrection(
        planet1: Planet,
        planet2: Planet,
        normal: { nx: number; ny: number; distance: number },
    ) {
        const InverseMass1 = 1 / planet1.data.mass;
        const InverseMass2 = 1 / planet2.data.mass;
        const positionValues = this.position.calculatePositionCorrection(
            planet1,
            planet2,
            normal.distance,
            normal.nx,
            normal.ny,
        );
        planet1.planetRigidbody.position.x -= positionValues.cx * InverseMass1;
        planet1.planetRigidbody.position.y -= positionValues.cy * InverseMass1;
        planet2.planetRigidbody.position.x += positionValues.cx * InverseMass2;
        planet2.planetRigidbody.position.y += positionValues.cy * InverseMass2;
    }
    applyFriction(
        planet1: Planet,
        planet2: Planet,
        normal: { nx: number; ny: number; distance: number },
        j: number,
    ) {
        planet1.planetRigidbody.isSleeping = false;
        planet2.planetRigidbody.isSleeping = false;

        planet1.planetRigidbody.sleepTimer = 0;
        planet2.planetRigidbody.sleepTimer = 0;

        const InverseMass1 = 1 / planet1.data.mass;
        const InverseMass2 = 1 / planet2.data.mass;
        const frictionValues = this.friction.calculateFriction(
            planet1,
            planet2,
            normal.nx,
            normal.ny,
            j,
        );
        planet1.planetRigidbody.velocity.x -= frictionValues.frictionX * InverseMass1;
        planet1.planetRigidbody.velocity.y -= frictionValues.frictionY * InverseMass1;
        planet2.planetRigidbody.velocity.x += frictionValues.frictionX * InverseMass2;
        planet2.planetRigidbody.velocity.y += frictionValues.frictionY * InverseMass2;
    }
    private applyImpulse(
        planet1: Planet,
        planet2: Planet,
        normal: { nx: number; ny: number },
    ): number | null {
        const inverseMass1 = 1 / planet1.data.mass;
        const inverseMass2 = 1 / planet2.data.mass;

        const result = this.impulse.calculateImpulse(planet1, planet2, normal.nx, normal.ny);
        if (!result) return null;

        planet1.planetRigidbody.velocity.x -= result.impulseX * inverseMass1;
        planet1.planetRigidbody.velocity.y -= result.impulseY * inverseMass1;

        planet2.planetRigidbody.velocity.x += result.impulseX * inverseMass2;
        planet2.planetRigidbody.velocity.y += result.impulseY * inverseMass2;
        if (Math.abs(result.j) > 5) {
            const spin = Math.abs(result.j) * 0.0000000001;
            // console.log(spin);
            planet1.planetRigidbody.angularVelocity -= spin;
            planet2.planetRigidbody.angularVelocity += spin;
        }

        return result.j;
    }
    private calculateNormal(planet1: Planet, planet2: Planet) {
        const dx = planet2.planetRigidbody.position.x - planet1.planetRigidbody.position.x;
        const dy = planet2.planetRigidbody.position.y - planet1.planetRigidbody.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance <= 0.00001) return null;
        return {
            nx: dx / distance,
            ny: dy / distance,
            distance,
        };
    }
    // public calculateImpulse(
    //     planet1: Planet,
    //     planet2: Planet,
    //     nx: number,
    //     ny: number,
    //     InverseMass1: number,
    //     InverseMass2: number,
    // ) {
    //     const rvx = planet2.planetRigidbody.velocity.x - planet1.planetRigidbody.velocity.x;
    //     const rvy = planet2.planetRigidbody.velocity.y - planet1.planetRigidbody.velocity.y;

    //     const nvelocity = rvx * nx + rvy * ny;

    //     if (nvelocity > 0) return null;
    //     let eRestutition = Math.min(
    //         planet2.planetRigidbody.restitution,
    //         planet1.planetRigidbody.restitution,
    //     );
    //     if (Math.abs(nvelocity) < 1.0) {
    //         eRestutition = 0.0;
    //     }
    //     const j = (-(1 + eRestutition) * nvelocity) / (InverseMass1 + InverseMass2);
    //     const impulseX = j * nx;
    //     const impulseY = j * ny;

    //     return {
    //         impulseX,
    //         impulseY,
    //         j,
    //     };
    // }
    // public calculateFriction(
    //     planet1: Planet,
    //     planet2: Planet,
    //     nx: number,
    //     ny: number,
    //     InverseMass1: number,
    //     InverseMass2: number,
    //     j: number,
    // ) {
    //     const rvx = planet2.planetRigidbody.velocity.x - planet1.planetRigidbody.velocity.x;
    //     const rvy = planet2.planetRigidbody.velocity.y - planet1.planetRigidbody.velocity.y;
    //     const tx = -ny;
    //     const ty = nx;
    //     const tVelocity = rvx * tx + rvy * ty;
    //     let jt = -tVelocity / (InverseMass1 + InverseMass2);
    //     const mu = 0.05;
    //     const maxFriction = mu * j;
    //     jt = Math.max(-maxFriction, Math.min(maxFriction, jt));
    //     const frictionX = jt * tx;
    //     const frictionY = jt * ty;
    //     return {
    //         frictionX,
    //         frictionY,
    //     };
    // }
    // public caculatePositionalCorrection(
    //     planet1: Planet,
    //     planet2: Planet,
    //     distance: number,
    //     InverseMass1: number,
    //     InverseMass2: number,
    //     nx: number,
    //     ny: number,
    // ) {
    //     const k_slop = 0.1;
    //     const k_percent = 0.8;
    //     const overLap = planet1.data.radius + planet2.data.radius - distance;
    //     const posCorrection =
    //         (Math.max(overLap - k_slop, 0) / (InverseMass1 + InverseMass2)) * k_percent;

    //     const cx = nx * posCorrection;
    //     const cy = ny * posCorrection;
    //     return {
    //         cx,
    //         cy,
    //     };
    // }
}
