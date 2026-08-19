import { GALAXY } from "../components/galaxy/galaxy-math";
import type { GalaxyLink } from "../data/links";
import { useNavStore } from "../store/nav-store";
import {
	galaxySim,
	getLinkLocalPosition,
	simLocalVec,
} from "./galaxy-simulation";
import { getGalaxyStars } from "./galaxy-stars";
import { zoomFocusState } from "./zoom-focus-state";

export const ASCII_GLYPHS = " .:-=+*#%@";
export const LINK_GLYPH = "@";
const ASCII_FONT_SIZE = 10;
const ASCII_FONT =
	"ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
const DEFAULT_FOV = 58;
const LINK_GLYPH_INDEX = ASCII_GLYPHS.length - 1;

export interface AsciiGrid {
	cols: number;
	rows: number;
	charWidth: number;
	charHeight: number;
	offsetX: number;
	offsetY: number;
}

export interface ProjectedLink {
	id: string;
	screenX: number;
	screenY: number;
	worldZ: number;
	opacity: number;
}

const FACE_SCALE = 3;
const _depthBuf: number[] = [];
const _glyphBuf: number[] = [];
let measureCanvas: HTMLCanvasElement | null = null;

function getMeasureContext() {
	if (typeof document === "undefined") return null;
	if (!measureCanvas) {
		measureCanvas = document.createElement("canvas");
	}
	const ctx = measureCanvas.getContext("2d");
	if (!ctx) return null;
	ctx.font = `${ASCII_FONT_SIZE}px ${ASCII_FONT}`;
	return ctx;
}

export function measureAsciiGrid(width: number, height: number): AsciiGrid {
	const ctx = getMeasureContext();
	const charWidth = ctx?.measureText("M").width ?? ASCII_FONT_SIZE * 0.6;
	const charHeight = ASCII_FONT_SIZE;

	const cols = Math.max(1, Math.floor(width / charWidth));
	const rows = Math.max(1, Math.floor(height / charHeight));
	const gridWidth = cols * charWidth;
	const gridHeight = rows * charHeight;

	return {
		cols,
		rows,
		charWidth,
		charHeight,
		offsetX: (width - gridWidth) / 2,
		offsetY: (height - gridHeight) / 2,
	};
}

function faceOpacity(worldZ: number) {
	return Math.max(0, Math.min(1, (worldZ + 1) / FACE_SCALE));
}

// labels hold full opacity through mid-depth, then fade out fast
// (full at worldZ >= 0.1, gone by worldZ <= -0.7) — narrower than faceOpacity,
// which dust glyphs and marker sizing still use.
function labelOpacity(worldZ: number) {
	return Math.max(0, Math.min(1, (worldZ + 0.7) / 0.8));
}

function brightnessToGlyph(radius: number): number {
	const t = Math.min(1, radius / GALAXY.RADIUS);
	const innerBoost = 1 - t * 0.35;
	const idx = Math.floor(t * innerBoost * (ASCII_GLYPHS.length - 1));
	return Math.max(1, Math.min(ASCII_GLYPHS.length - 1, idx));
}

function dustGlyphFor(radius: number, worldZ: number): number {
	const face = faceOpacity(worldZ);
	const base = brightnessToGlyph(radius);
	const dimmed = Math.round(base * (0.22 + face * 0.78));
	return Math.max(1, Math.min(ASCII_GLYPHS.length - 1, dimmed));
}

function ensureBuffers(size: number) {
	while (_depthBuf.length < size) {
		_depthBuf.push(Number.NEGATIVE_INFINITY);
		_glyphBuf.push(0);
	}
}

export function linkRadiusCells(
	worldZ: number,
	isFocused: boolean,
	fov = galaxySim.camera.fov,
): number {
	const zoomFactor = DEFAULT_FOV / fov;
	const face = faceOpacity(worldZ);
	const facingBoost = 0.8 + face * 0.45;
	const focusBoost = isFocused ? 1.35 : 1;
	return facingBoost * zoomFactor * focusBoost;
}

function paintLinkBlob(
	projected: { x: number; y: number; worldZ: number; ndcZ: number },
	grid: AsciiGrid,
	radiusCells: number,
) {
	const centerCol = (projected.x - grid.offsetX) / grid.charWidth;
	const centerRow = (projected.y - grid.offsetY) / grid.charHeight;
	const depth = projected.worldZ + 10;
	const r = Math.ceil(radiusCells);

	for (let dr = -r; dr <= r; dr++) {
		for (let dc = -r; dc <= r; dc++) {
			if (Math.hypot(dc, dr) > radiusCells + 0.35) continue;

			const col = Math.floor(centerCol + dc);
			const row = Math.floor(centerRow + dr);
			if (col < 0 || col >= grid.cols || row < 0 || row >= grid.rows) continue;

			const cell = row * grid.cols + col;
			_depthBuf[cell] = depth;
			_glyphBuf[cell] = LINK_GLYPH_INDEX;
		}
	}
}

export function projectLinks(
	links: GalaxyLink[],
	width: number,
	height: number,
): ProjectedLink[] {
	const projectedLinks: ProjectedLink[] = [];

	for (const link of links) {
		getLinkLocalPosition(link, simLocalVec);
		const projected = galaxySim.projectLocalToScreen(
			simLocalVec,
			width,
			height,
		);
		if (!projected) continue;

		projectedLinks.push({
			id: link.id,
			screenX: projected.x,
			screenY: projected.y,
			worldZ: projected.worldZ,
			opacity: labelOpacity(projected.worldZ),
		});
	}

	return projectedLinks;
}

export function projectToAscii(
	links: GalaxyLink[],
	width: number,
	height: number,
	grid: AsciiGrid,
): { text: string; projectedLinks: ProjectedLink[] } {
	const cellCount = grid.cols * grid.rows;
	ensureBuffers(cellCount);

	for (let i = 0; i < cellCount; i++) {
		_depthBuf[i] = Number.NEGATIVE_INFINITY;
		_glyphBuf[i] = 0;
	}

	const { positions, radii } = getGalaxyStars();

	for (let i = 0; i < radii.length; i++) {
		const i3 = i * 3;
		simLocalVec.set(positions[i3], positions[i3 + 1], positions[i3 + 2]);

		const projected = galaxySim.projectLocalToScreen(
			simLocalVec,
			width,
			height,
		);
		if (!projected) continue;

		const col = Math.floor((projected.x - grid.offsetX) / grid.charWidth);
		const row = Math.floor((projected.y - grid.offsetY) / grid.charHeight);
		if (col < 0 || col >= grid.cols || row < 0 || row >= grid.rows) continue;

		const cell = row * grid.cols + col;
		const depth = projected.worldZ + (1 - projected.ndcZ) * 0.001;
		if (depth <= _depthBuf[cell]) continue;

		_depthBuf[cell] = depth;
		_glyphBuf[cell] = dustGlyphFor(radii[i], projected.worldZ);
	}

	const focusedLinkId = useNavStore.getState().focusedLinkId;
	const zoomActive =
		zoomFocusState.phase === "entering" || zoomFocusState.phase === "active";

	for (const link of links) {
		getLinkLocalPosition(link, simLocalVec);
		const projected = galaxySim.projectLocalToScreen(
			simLocalVec,
			width,
			height,
		);
		if (!projected) continue;

		const isFocused = focusedLinkId === link.id;
		const face = faceOpacity(projected.worldZ);
		if (face < 0.02 && !(isFocused && zoomActive)) continue;

		paintLinkBlob(
			projected,
			grid,
			linkRadiusCells(projected.worldZ, isFocused),
		);
	}

	const rows: string[] = [];
	for (let row = 0; row < grid.rows; row++) {
		let line = "";
		for (let col = 0; col < grid.cols; col++) {
			const glyphIdx = _glyphBuf[row * grid.cols + col];
			line += ASCII_GLYPHS[glyphIdx] ?? " ";
		}
		rows.push(line);
	}

	return {
		text: rows.join("\n"),
		projectedLinks: projectLinks(links, width, height),
	};
}

export interface TestAsciiPoint {
	x: number;
	y: number;
	worldZ: number;
	ndcZ: number;
	radius: number;
	isLink?: boolean;
}

export function rasterizeTestPoints(
	points: TestAsciiPoint[],
	grid: AsciiGrid,
): string {
	const cellCount = grid.cols * grid.rows;
	ensureBuffers(cellCount);

	for (let i = 0; i < cellCount; i++) {
		_depthBuf[i] = Number.NEGATIVE_INFINITY;
		_glyphBuf[i] = 0;
	}

	for (const point of points) {
		const col = Math.floor((point.x - grid.offsetX) / grid.charWidth);
		const row = Math.floor((point.y - grid.offsetY) / grid.charHeight);
		if (col < 0 || col >= grid.cols || row < 0 || row >= grid.rows) continue;

		const cell = row * grid.cols + col;
		const depth = point.worldZ + (1 - point.ndcZ) * 0.001;

		if (depth <= _depthBuf[cell]) continue;

		_depthBuf[cell] = depth;
		_glyphBuf[cell] = dustGlyphFor(point.radius, point.worldZ);
	}

	const rows: string[] = [];
	for (let row = 0; row < grid.rows; row++) {
		let line = "";
		for (let col = 0; col < grid.cols; col++) {
			const glyphIdx = _glyphBuf[row * grid.cols + col];
			line += ASCII_GLYPHS[glyphIdx] ?? " ";
		}
		rows.push(line);
	}

	return rows.join("\n");
}

export { ASCII_FONT, ASCII_FONT_SIZE };
