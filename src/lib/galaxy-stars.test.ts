import { describe, expect, it } from "vitest";
import { getGalaxyStars } from "./galaxy-stars";

describe("getGalaxyStars", () => {
	it("returns identical positions on repeated calls", () => {
		const a = getGalaxyStars();
		const b = getGalaxyStars();

		expect(a.positions).toBe(b.positions);
		expect(a.radii[0]).toBe(b.radii[0]);
		expect(a.positions[0]).toBe(b.positions[0]);
		expect(a.positions[1]).toBe(b.positions[1]);
		expect(a.positions[2]).toBe(b.positions[2]);
	});

	it("generates the expected number of stars", () => {
		const { positions, radii } = getGalaxyStars();
		expect(radii.length).toBe(20_000);
		expect(positions.length).toBe(20_000 * 3);
	});
});
