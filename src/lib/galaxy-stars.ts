import { colorAtRadius, GALAXY } from "../components/galaxy/galaxy-math";

const GALAXY_SEED = 0x6a1a7890;

export interface GalaxyStarField {
	positions: Float32Array;
	colors: Float32Array;
	radii: Float32Array;
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

function seededGaussianRandom(random: () => number, power: number) {
	let v = 0;
	for (let i = 0; i < 3; i++) v += random() - 0.5;
	return Math.sign(v) * Math.abs(v / 1.5) ** power;
}

function seededSpiralPosition(
	random: () => number,
	radius: number,
	branchIndex: number,
): [number, number, number] {
	const spinAngle = radius * GALAXY.SPIN_FACTOR;
	const branchAngle = (branchIndex / GALAXY.BRANCHES) * Math.PI * 2;
	const scatterFactor = 0.4 + 0.6 * (radius / GALAXY.RADIUS);
	const rx =
		seededGaussianRandom(random, GALAXY.RANDOMNESS_POWER) *
		GALAXY.RANDOMNESS *
		scatterFactor;
	const ry =
		seededGaussianRandom(random, GALAXY.RANDOMNESS_POWER) *
		GALAXY.RANDOMNESS *
		0.65 *
		scatterFactor;
	const rz =
		seededGaussianRandom(random, GALAXY.RANDOMNESS_POWER) *
		GALAXY.RANDOMNESS *
		scatterFactor;

	return [
		Math.cos(branchAngle + spinAngle) * radius + rx,
		ry,
		Math.sin(branchAngle + spinAngle) * radius + rz,
	];
}

function generateGalaxyStars(): GalaxyStarField {
	const random = mulberry32(GALAXY_SEED);
	const positions = new Float32Array(GALAXY.STAR_COUNT * 3);
	const colors = new Float32Array(GALAXY.STAR_COUNT * 3);
	const radii = new Float32Array(GALAXY.STAR_COUNT);

	for (let i = 0; i < GALAXY.STAR_COUNT; i++) {
		const i3 = i * 3;
		let x: number;
		let y: number;
		let z: number;
		let radius: number;

		if (i < GALAXY.BULGE_COUNT) {
			radius = random() ** 2 * 0.9;
			const angle = random() * Math.PI * 2;
			const spread = seededGaussianRandom(random, 2) * 0.18 * radius;
			x = Math.cos(angle) * radius + spread;
			y = seededGaussianRandom(random, 2) * 0.12 * radius;
			z = Math.sin(angle) * radius + spread;
		} else if (i < GALAXY.BULGE_COUNT + GALAXY.DISK_COUNT) {
			radius = random() * GALAXY.RADIUS;
			const angle = random() * Math.PI * 2;
			const spread =
				seededGaussianRandom(random, GALAXY.RANDOMNESS_POWER) * 0.65;
			x = Math.cos(angle) * radius + spread;
			y =
				seededGaussianRandom(random, GALAXY.RANDOMNESS_POWER) *
				GALAXY.RANDOMNESS *
				0.25;
			z = Math.sin(angle) * radius + spread;
		} else {
			radius = random() * GALAXY.RADIUS;
			const branch = Math.floor(random() * GALAXY.BRANCHES);
			[x, y, z] = seededSpiralPosition(random, radius, branch);
		}

		positions[i3] = x;
		positions[i3 + 1] = y;
		positions[i3 + 2] = z;
		radii[i] = radius;

		const mixed = colorAtRadius(radius);
		colors[i3] = mixed.r;
		colors[i3 + 1] = mixed.g;
		colors[i3 + 2] = mixed.b;
	}

	return { positions, colors, radii };
}

let cachedStars: GalaxyStarField | null = null;

export function getGalaxyStars(): GalaxyStarField {
	if (!cachedStars) {
		cachedStars = generateGalaxyStars();
	}
	return cachedStars;
}
