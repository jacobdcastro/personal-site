import { describe, expect, it } from "vitest";
import { LINKS } from "../data/links";
import { getLinkLocalPosition, simLocalVec } from "./galaxy-simulation";

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
});
