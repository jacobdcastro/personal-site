import { describe, expect, it } from "vitest";
import type { GalaxyLink } from "../data/links";
import {
	ASCII_GLYPHS,
	linkRadiusCells,
	measureAsciiGrid,
	projectToAscii,
	rasterizeTestPoints,
} from "./ascii-projector";

describe("measureAsciiGrid", () => {
	it("computes grid dimensions from viewport size", () => {
		const grid = measureAsciiGrid(800, 600);
		expect(grid.cols).toBeGreaterThan(10);
		expect(grid.rows).toBeGreaterThan(10);
		expect(grid.offsetX).toBeGreaterThanOrEqual(0);
		expect(grid.offsetY).toBeGreaterThanOrEqual(0);
	});
});

describe("rasterizeTestPoints", () => {
	it("keeps the nearer star in a shared cell", () => {
		const grid = measureAsciiGrid(800, 600);
		const col = 10;
		const row = 10;
		const x = grid.offsetX + (col + 0.5) * grid.charWidth;
		const y = grid.offsetY + (row + 0.5) * grid.charHeight;

		const farOnly = rasterizeTestPoints(
			[{ x, y, worldZ: 0.2, ndcZ: 0.5, radius: 0.5, isLink: false }],
			grid,
		);
		const combined = rasterizeTestPoints(
			[
				{ x, y, worldZ: 0.2, ndcZ: 0.5, radius: 0.5, isLink: false },
				{ x, y, worldZ: 1.5, ndcZ: 0.1, radius: 3.5, isLink: false },
			],
			grid,
		);
		const nearOnly = rasterizeTestPoints(
			[{ x, y, worldZ: 1.5, ndcZ: 0.1, radius: 3.5, isLink: false }],
			grid,
		);

		const combinedGlyph = combined.split("\n")[row]?.[col] ?? " ";
		const nearGlyph = nearOnly.split("\n")[row]?.[col] ?? " ";
		const farGlyph = farOnly.split("\n")[row]?.[col] ?? " ";

		expect(combinedGlyph).toBe(nearGlyph);
		expect(ASCII_GLYPHS.indexOf(combinedGlyph)).toBeGreaterThan(
			ASCII_GLYPHS.indexOf(farGlyph),
		);
	});

	it("renders back-facing stars dimmer than front-facing stars", () => {
		const grid = measureAsciiGrid(800, 600);
		const col = 20;
		const row = 15;
		const x = grid.offsetX + (col + 0.5) * grid.charWidth;
		const y = grid.offsetY + (row + 0.5) * grid.charHeight;

		const back = rasterizeTestPoints(
			[{ x, y, worldZ: -0.7, ndcZ: 0.5, radius: 3, isLink: false }],
			grid,
		);
		const front = rasterizeTestPoints(
			[{ x, y, worldZ: 1.5, ndcZ: 0.1, radius: 3, isLink: false }],
			grid,
		);

		const backGlyph = back.split("\n")[row]?.[col] ?? " ";
		const frontGlyph = front.split("\n")[row]?.[col] ?? " ";

		expect(backGlyph).not.toBe(" ");
		expect(ASCII_GLYPHS.indexOf(frontGlyph)).toBeGreaterThan(
			ASCII_GLYPHS.indexOf(backGlyph),
		);
	});
});

describe("linkRadiusCells", () => {
	it("grows with zoom (lower fov)", () => {
		const idle = linkRadiusCells(1, false, 58);
		const zoomed = linkRadiusCells(1, false, 38);
		expect(zoomed).toBeGreaterThan(idle);
	});

	it("focused links are larger than unfocused at same zoom", () => {
		const normal = linkRadiusCells(1, false, 58);
		const focused = linkRadiusCells(1, true, 58);
		expect(focused).toBeGreaterThan(normal);
	});
});

describe("projectToAscii", () => {
	it("renders a non-empty galaxy field", () => {
		const grid = measureAsciiGrid(640, 480);
		const links: GalaxyLink[] = [];
		const { text } = projectToAscii(links, 640, 480, grid);
		const lines = text.split("\n");

		expect(lines.length).toBe(grid.rows);
		expect(lines.some((line) => /[^ ]/.test(line))).toBe(true);
	});
});
