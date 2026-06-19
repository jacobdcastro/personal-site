import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { createCanvas, GlobalFonts } from "@napi-rs/canvas";
import sharp from "sharp";
import {
	buildSaturnLines,
	SATURN_TILT,
	type SaturnConfig,
} from "./saturn-procedural.ts";

const OUT_WIDTH = 1200;
const OUT_HEIGHT = 630;
const ASCII_FONT_SIZE = 8;
const ASCII_LINE_HEIGHT = 9;
const CHAR_WIDTH = ASCII_FONT_SIZE * 0.602;
const COLS = Math.floor(OUT_WIDTH / CHAR_WIDTH);
const ROWS = Math.floor(OUT_HEIGHT / ASCII_LINE_HEIGHT);
const CELL_ASPECT = ASCII_LINE_HEIGHT / CHAR_WIDTH;

const CM_FAMILY = "Computer Modern";
const root = join(import.meta.dirname, "..");
const fontsDir = join(root, "public", "fonts");
const publicDir = join(root, "public");

function registerFonts() {
	GlobalFonts.registerFromPath(join(fontsDir, "cmunrm.ttf"), CM_FAMILY);
	GlobalFonts.registerFromPath(join(fontsDir, "cmunti.ttf"), CM_FAMILY);
}

function xmlEscape(value: string) {
	return value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;");
}

function ogSaturnConfig(): SaturnConfig {
	return {
		cols: COLS,
		rows: ROWS,
		cellAspect: CELL_ASPECT,
		cx: COLS * 0.44,
		cy: ROWS * 0.5,
		tilt: SATURN_TILT,
		planetR: 34,
		ringRx: 98,
		ringRy: 16.5,
		stars: true,
		moons: true,
	};
}

function buildAsciiSvg(lines: string[]) {
	const tspans = lines
		.map(
			(line, row) =>
				`<tspan x="0" dy="${row === 0 ? ASCII_LINE_HEIGHT : ASCII_LINE_HEIGHT}">${xmlEscape(line)}</tspan>`,
		)
		.join("");

	return `<svg xmlns="http://www.w3.org/2000/svg" width="${OUT_WIDTH}" height="${OUT_HEIGHT}">
  <rect width="100%" height="100%" fill="#0a0a0a"/>
  <text
    font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
    font-size="${ASCII_FONT_SIZE}"
    fill="#e8e8e8"
    xml:space="preserve"
  >${tspans}</text>
</svg>`;
}

function buildTextOverlay() {
	const paddingX = 28;
	const panelH = 116;
	const marginRight = 56;
	const panelY = OUT_HEIGHT - 152;

	const canvas = createCanvas(OUT_WIDTH, OUT_HEIGHT);
	const ctx = canvas.getContext("2d");

	ctx.font = `36px "${CM_FAMILY}"`;
	const titleW = ctx.measureText("Jacob D. Castro").width;
	ctx.font = `italic 22px "${CM_FAMILY}"`;
	const subtitleW = ctx.measureText("Fullstack Software Engineer").width;

	const panelW = Math.ceil(Math.max(titleW, subtitleW) + paddingX * 2);
	const panelX = OUT_WIDTH - panelW - marginRight;

	ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
	ctx.fillRect(panelX, panelY, panelW, panelH);
	ctx.strokeStyle = "rgba(142, 200, 255, 0.4)";
	ctx.lineWidth = 1;
	ctx.strokeRect(panelX + 0.5, panelY + 0.5, panelW - 1, panelH - 1);

	ctx.fillStyle = "#ffffff";
	ctx.font = `36px "${CM_FAMILY}"`;
	ctx.fillText("Jacob D. Castro", panelX + paddingX, panelY + 48);

	ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
	ctx.font = `italic 22px "${CM_FAMILY}"`;
	ctx.fillText(
		"Fullstack Software Engineer",
		panelX + paddingX,
		panelY + 88,
	);

	return canvas.toBuffer("image/png");
}

async function main() {
	registerFonts();

	const lines = buildSaturnLines(ogSaturnConfig());
	const asciiSvg = buildAsciiSvg(lines);
	const asciiPng = await sharp(Buffer.from(asciiSvg)).png().toBuffer();
	const textPng = buildTextOverlay();

	const png = await sharp(asciiPng)
		.composite([{ input: textPng, top: 0, left: 0 }])
		.png()
		.toBuffer();

	const outPath = join(publicDir, "og.png");
	writeFileSync(outPath, png);
	console.log(`generated ${outPath} (Saturn, ${COLS}x${ROWS} grid)`);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
