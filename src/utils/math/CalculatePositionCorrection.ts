import type { Planet } from "../../features/planet/entities/Planet";

export class PositionCorrectionResolve {
    public calculatePositionCorrection(
        planet1: Planet,
        planet2: Planet,
        distance: number,
        nx: number,
        ny: number,
    ) {
        const InverseMass1 = 1 / planet1.data.mass;
        const InverseMass2 = 1 / planet2.data.mass;
        const k_slop = 0.1;
        const k_percent = 0.3;
        const overLap = planet1.data.radius + planet2.data.radius - distance;
        const posCorrection =
            (Math.max(overLap - k_slop, 0) / (InverseMass1 + InverseMass2)) * k_percent;

        const cx = nx * posCorrection;
        const cy = ny * posCorrection;
        return {
            cx,
            cy,
        };
    }
}
