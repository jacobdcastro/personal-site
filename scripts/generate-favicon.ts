import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { createCanvas } from "@napi-rs/canvas";
import sharp from "sharp";
import {
	buildSaturnGrid,
	SATURN_GLYPHS,
	SATURN_TILT,
	type SaturnConfig,
} from "./saturn-procedural.ts";

const root = join(import.meta.dirname, "..");
const publicDir = join(root, "public");

const MASTER_SIZE = 128;
const GRID = 32;
const BG = { r: 10, g: 10, b: 10, alpha: 1 as const };

const FAVICON_SATURN: SaturnConfig = {
	cols: GRID,
	rows: GRID,
	cellAspect: 1,
	cx: GRID / 2,
	cy: GRID / 2,
	tilt: SATURN_TILT,
	planetR: 7,
	ringRx: 14,
	ringRy: 3.2,
	stars: false,
	moons: false,
};

function glyphBrightness(ch: string) {
	const idx = SATURN_GLYPHS.indexOf(ch);
	if (idx <= 0) return 0;
	return Math.round(48 + (idx / (SATURN_GLYPHS.length - 1)) * 184);
}

/** equal padding on all sides — procedural cx/cy can leave asymmetric ring margins */
function centerGrid(grid: string[][]): string[][] {
	const rows = grid.length;
	const cols = grid[0]?.length ?? 0;
	let minR = rows;
	let maxR = -1;
	let minC = cols;
	let maxC = -1;

	for (let row = 0; row < rows; row++) {
		for (let col = 0; col < cols; col++) {
			if (grid[row][col] === " ") continue;
			minR = Math.min(minR, row);
			maxR = Math.max(maxR, row);
			minC = Math.min(minC, col);
			maxC = Math.max(maxC, col);
		}
	}

	if (maxR < 0) return grid;

	const contentH = maxR - minR + 1;
	const contentW = maxC - minC + 1;
	const offsetR = Math.floor((rows - contentH) / 2) - minR;
	const offsetC = Math.floor((cols - contentW) / 2) - minC;

	const centered: string[][] = Array.from({ length: rows }, () =>
		Array.from({ length: cols }, () => " "),
	);

	for (let row = minR; row <= maxR; row++) {
		for (let col = minC; col <= maxC; col++) {
			const nr = row + offsetR;
			const nc = col + offsetC;
			if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
				centered[nr][nc] = grid[row][col];
			}
		}
	}

	return centered;
}

/** square pixel cells — no font aspect distortion */
function gridToCanvas(grid: string[][], size: number): Buffer {
	const rows = grid.length;
	const cell = size / rows;

	const canvas = createCanvas(size, size);
	const ctx = canvas.getContext("2d");

	ctx.fillStyle = "#0a0a0a";
	ctx.fillRect(0, 0, size, size);

	for (let row = 0; row < rows; row++) {
		for (let col = 0; col < grid[row].length; col++) {
			const v = glyphBrightness(grid[row][col]);
			if (v === 0) continue;
			ctx.fillStyle = `rgb(${v},${v},${v})`;
			ctx.fillRect(col * cell, row * cell, cell, cell);
		}
	}

	return canvas.toBuffer("image/png");
}

/** scale centered content to fill the square with uniform margin */
async function scaleToSquare(png: Buffer, size: number, marginRatio = 0.06) {
	const margin = Math.round(size * marginRatio);
	const maxDim = size - margin * 2;
	const meta = await sharp(png).metadata();
	const width = meta.width ?? size;
	const height = meta.height ?? size;
	const scale = Math.min(maxDim / width, maxDim / height);
	const scaledW = Math.max(1, Math.round(width * scale));
	const scaledH = Math.max(1, Math.round(height * scale));
	const padTop = Math.floor((size - scaledH) / 2);
	const padLeft = Math.floor((size - scaledW) / 2);

	return sharp(png)
		.resize(scaledW, scaledH, { kernel: sharp.kernel.nearest })
		.extend({
			top: padTop,
			bottom: size - scaledH - padTop,
			left: padLeft,
			right: size - scaledW - padLeft,
			background: BG,
		})
		.png()
		.toBuffer();
}

interface IcoEntry {
	/** pixel dimension of the square image */
	size: number;
	png: Buffer;
}

const ICO_HEADER_SIZE = 6;
const ICO_ENTRY_SIZE = 16;

/**
 * Packs PNGs into a real ICO container. Writing raw PNG bytes to favicon.ico
 * mostly works, but it is not the declared format, and `nosniff` in production
 * means the browser is told image/vnd.microsoft.icon and handed PNG data.
 */
function encodeIco(entries: readonly IcoEntry[]): Buffer {
	const header = Buffer.alloc(ICO_HEADER_SIZE);
	header.writeUInt16LE(0, 0); // reserved
	header.writeUInt16LE(1, 2); // resource type: icon
	header.writeUInt16LE(entries.length, 4);

	let offset = ICO_HEADER_SIZE + ICO_ENTRY_SIZE * entries.length;
	const directory = entries.map((entry) => {
		const record = Buffer.alloc(ICO_ENTRY_SIZE);
		// 0 encodes 256 in the single-byte dimension fields
		const dimension = entry.size >= 256 ? 0 : entry.size;
		record.writeUInt8(dimension, 0);
		record.writeUInt8(dimension, 1);
		record.writeUInt8(0, 2); // palette entries (0 for truecolor)
		record.writeUInt8(0, 3); // reserved
		record.writeUInt16LE(1, 4); // color planes
		record.writeUInt16LE(32, 6); // bits per pixel
		record.writeUInt32LE(entry.png.length, 8);
		record.writeUInt32LE(offset, 12);
		offset += entry.png.length;
		return record;
	});

	return Buffer.concat([
		header,
		...directory,
		...entries.map((entry) => entry.png),
	]);
}

async function main() {
	const grid = centerGrid(buildSaturnGrid(FAVICON_SATURN));
	const raw = gridToCanvas(grid, MASTER_SIZE);
	const master = await scaleToSquare(raw, MASTER_SIZE);

	const png32 = await sharp(master)
		.resize(32, 32, { kernel: sharp.kernel.nearest })
		.png()
		.toBuffer();
	const png16 = await sharp(master)
		.resize(16, 16, { kernel: sharp.kernel.nearest })
		.png()
		.toBuffer();

	writeFileSync(join(publicDir, "favicon-32.png"), png32);
	writeFileSync(join(publicDir, "favicon-16.png"), png16);
	writeFileSync(
		join(publicDir, "favicon.ico"),
		encodeIco([
			{ size: 16, png: png16 },
			{ size: 32, png: png32 },
		]),
	);

	console.log(
		`generated favicon (${GRID}x${GRID} ascii → ${MASTER_SIZE}px master → 16/32px)`,
	);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
