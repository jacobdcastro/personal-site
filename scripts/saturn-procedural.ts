export const SATURN_GLYPHS = " .:-=+*#%@";
export const SATURN_TILT = (-26.73 * Math.PI) / 180;

export interface SaturnConfig {
	cols: number;
	rows: number;
	cellAspect: number;
	cx: number;
	cy: number;
	tilt: number;
	planetR: number;
	ringRx: number;
	ringRy: number;
	ringInner?: number;
	ringOuter?: number;
	cassiniR?: number;
	stars?: boolean;
	moons?: boolean;
	starDensity?: number;
}

function mulberry32(seed: number) {
	return () => {
		seed |= 0;
		seed = (seed + 0x6d2b79f5) | 0;
		let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

function glyphAt(t: number) {
	const idx = Math.floor(Math.min(1, Math.max(0, t)) * (SATURN_GLYPHS.length - 1));
	return SATURN_GLYPHS[Math.max(0, Math.min(SATURN_GLYPHS.length - 1, idx))];
}

function toLocal(
	col: number,
	row: number,
	cx: number,
	cy: number,
	cellAspect: number,
) {
	const dx = col - cx;
	const dy = (row - cy) * cellAspect;
	return { dx, dy };
}

function rotateLocal(dx: number, dy: number, angle: number) {
	const c = Math.cos(angle);
	const s = Math.sin(angle);
	return { dx: dx * c - dy * s, dy: dx * s + dy * c };
}

/** procedural saturn — planet, rings, optional star field and moons */
export function buildSaturnGrid(config: SaturnConfig): string[][] {
	const {
		cols,
		rows,
		cellAspect,
		cx,
		cy,
		tilt,
		planetR,
		ringRx,
		ringRy,
		ringInner = 0.58,
		ringOuter = 1.06,
		cassiniR = 0.86,
		stars = false,
		moons = false,
		starDensity = 0.018,
	} = config;

	const grid: string[][] = Array.from({ length: rows }, () =>
		Array.from({ length: cols }, () => " "),
	);

	if (stars) {
		const rand = mulberry32(0x53415455);
		for (let row = 0; row < rows; row++) {
			for (let col = 0; col < cols; col++) {
				if (rand() > starDensity) continue;
				grid[row][col] = rand() < 0.12 ? "*" : rand() < 0.45 ? "+" : ".";
			}
		}
	}

	const showCassini = ringRx >= 20;

	const ringRadius = (col: number, row: number) => {
		const { dx, dy } = toLocal(col, row, cx, cy, cellAspect);
		const { dx: lx, dy: ly } = rotateLocal(dx, dy, -tilt);
		return Math.hypot(lx / ringRx, ly / ringRy);
	};

	const ringDepth = (col: number, row: number) => {
		const { dx, dy } = toLocal(col, row, cx, cy, cellAspect);
		return rotateLocal(dx, dy, -tilt).dy;
	};

	const inPlanet = (col: number, row: number) => {
		const { dx, dy } = toLocal(col, row, cx, cy, cellAspect);
		return dx * dx + dy * dy <= planetR * planetR;
	};

	const ringGlyph = (r: number) => {
		if (showCassini && Math.abs(r - cassiniR) < 0.022) return "-";
		const t = (r - ringInner) / (ringOuter - ringInner);
		return glyphAt(0.35 + t * 0.55);
	};

	const planetGlyph = (col: number, row: number) => {
		const { dx, dy } = toLocal(col, row, cx, cy, cellAspect);
		const dist = Math.hypot(dx, dy) / planetR;
		const light = 0.62 + (1 - dist) * 0.28 - (dy / planetR) * 0.14;
		return glyphAt(light);
	};

	const paintRing = (front: boolean) => {
		for (let row = 0; row < rows; row++) {
			for (let col = 0; col < cols; col++) {
				const depth = ringDepth(col, row);
				if (front ? depth <= 0 : depth >= 0) continue;

				const r = ringRadius(col, row);
				if (r < ringInner || r > ringOuter) continue;
				if (inPlanet(col, row)) continue;

				grid[row][col] = ringGlyph(r);
			}
		}
	};

	paintRing(false);

	for (let row = 0; row < rows; row++) {
		for (let col = 0; col < cols; col++) {
			if (inPlanet(col, row)) {
				grid[row][col] = planetGlyph(col, row);
			}
		}
	}

	paintRing(true);

	if (moons) {
		const moonLocal = [
			{ dx: ringRx + 14, dy: -8, glyph: "@" },
			{ dx: ringRx + 20, dy: 10, glyph: "o" },
			{ dx: -ringRx - 12, dy: 8, glyph: "o" },
			{ dx: 22, dy: -planetR - 10, glyph: "*" },
			{ dx: -24, dy: planetR + 12, glyph: "." },
		];

		for (const moon of moonLocal) {
			const { dx, dy } = rotateLocal(moon.dx, moon.dy, tilt);
			const col = Math.round(cx + dx);
			const row = Math.round(cy + dy / cellAspect);
			if (
				row >= 0 &&
				row < rows &&
				col >= 0 &&
				col < cols &&
				grid[row][col] === " "
			) {
				grid[row][col] = moon.glyph;
			}
		}
	}

	return grid;
}

export function buildSaturnLines(config: SaturnConfig): string[] {
	return buildSaturnGrid(config).map((row) => row.join(""));
}
