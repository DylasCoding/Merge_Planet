import { ParticleList } from "../ParticleList";

import { ZoomOutParticle } from "../particleType/ZoomOutParticle";

export class ZoomOutEffects extends ParticleList {
    constructor(xCoord: number, yCoord: number, Radius: number) {
        super(xCoord, yCoord);
        this.createEffect(Radius);
    }
    createEffect(Radius: number) {
        const particle = new ZoomOutParticle(0, 0, Radius);
        this.listOfParticle.push(particle);
        this.addChild(particle.sprite);
    }
}
