import { describe, expect, it } from "vitest";
import { LINKS } from "../data/links";
import {
	galaxySim,
	getLinkLocalPosition,
	simLocalVec,
} from "./galaxy-simulation";

const idleInput = {
	isDragging: false,
	velocity: { x: 0, y: 0 },
	focusedLinkId: null as string | null,
	links: LINKS,
};

describe("getLinkLocalPosition", () => {
	it("returns stable positions across calls", () => {
		const link = LINKS[0];
		getLinkLocalPosition(link, simLocalVec);
		const x1 = simLocalVec.x;
		const y1 = simLocalVec.y;
		const z1 = simLocalVec.z;

		getLinkLocalPosition(link, simLocalVec);

		expect(simLocalVec.x).toBe(x1);
		expect(simLocalVec.y).toBe(y1);
		expect(simLocalVec.z).toBe(z1);
	});

	it("returns the output vector", () => {
		const link = LINKS[0];
		const pos = getLinkLocalPosition(link, simLocalVec);
		expect(pos).toBe(simLocalVec);
		expect(Number.isFinite(pos.x)).toBe(true);
	});
});

describe("galaxySim projection", () => {
	it("updates projection matrix while idle", () => {
		galaxySim.tick(0, { ...idleInput, width: 2560, height: 1440 });
		expect(galaxySim.camera.aspect).toBeCloseTo(2560 / 1440);
		const wideMatrix = galaxySim.camera.projectionMatrix.elements[0];

		galaxySim.tick(0, { ...idleInput, width: 1440, height: 1440 });
		expect(galaxySim.camera.aspect).toBeCloseTo(1);
		const squareMatrix = galaxySim.camera.projectionMatrix.elements[0];

		expect(wideMatrix).not.toBeCloseTo(squareMatrix);
	});
});
