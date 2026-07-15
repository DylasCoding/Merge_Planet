import { Container } from "pixi.js";
import type { Particle } from "./Particle";

export class ParticleList extends Container {
    public listOfParticle: Particle[] = [];
    constructor(xCoord: number, yCoord: number) {
        super();
        this.position.set(xCoord, yCoord);
    }
    public update(deltaTime: number) {
        for (const Particle of this.listOfParticle) {
            Particle.update(deltaTime);
        }
        this.destroyParticles();
    }
    public destroyParticles() {
        for (let i = this.listOfParticle.length - 1; i >= 0; i--) {
            if (this.listOfParticle[i].isRunOutOfLife) {
                this.listOfParticle[i].sprite.parent?.removeChild(this.listOfParticle[i].sprite);
                this.listOfParticle.splice(i, 1);
            }
        }
    }
}
