import { ParticleList } from "../ParticleList";
import { ExplodeParticle } from "../particleType/ExplodeParticle";

export class ExplodeEffects extends ParticleList {
    constructor(xCoord: number, yCoord: number, numberOfParticle: number, speed: number) {
        super(xCoord, yCoord);
        this.createEffect(numberOfParticle, speed);
        console.log("particle duoc tao ra");
    }
    createEffect(numberOfParticle: number, speed: number) {
        for (let i = 0; i < numberOfParticle; i++) {
            const angle = (Math.PI * 2 * i) / numberOfParticle;
            const Pariclespeed = speed + 0.5 * Math.random();
            const particle = new ExplodeParticle(
                Math.sin(angle),
                Math.cos(angle),

                angle,
                Pariclespeed,
            );
            this.listOfParticle.push(particle);
            this.addChild(particle.sprite);
        }
    }
}
