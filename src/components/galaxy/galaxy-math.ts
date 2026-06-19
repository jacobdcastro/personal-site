import {
	type Camera,
	Color,
	type Group,
	Matrix4,
	Raycaster,
	Vector2,
	Vector3,
} from "three";

export const DEFAULT_VIEW_TILT = Math.PI / 9; // 20° off the galactic plane

export const GALAXY = {
	STAR_COUNT: 20_000,
	BULGE_COUNT: 2_500,
	DISK_COUNT: 4_500,
	BRANCHES: 5,
	SPIN_FACTOR: 1.2,
	RANDOMNESS: 0.68,
	RANDOMNESS_POWER: 1.4,
	INNER_COLOR: "#ff6030",
	OUTER_COLOR: "#1b3984",
	RADIUS: 4,
} as const;

const innerColor = new Color(GALAXY.INNER_COLOR);
const outerColor = new Color(GALAXY.OUTER_COLOR);

export function gaussianRandom(power: number) {
	let v = 0;
	for (let i = 0; i < 3; i++) v += Math.random() - 0.5;
	return Math.sign(v) * Math.abs(v / 1.5) ** power;
}

export function colorAtRadius(radius: number): Color {
	return innerColor.clone().lerp(outerColor, radius / GALAXY.RADIUS);
}

export function spiralPosition(
	radius: number,
	branchIndex: number,
	options?: {
		scatter?: number;
		offset?: [number, number, number];
	},
): [number, number, number] {
	const scatter = options?.scatter ?? 1;
	const spinAngle = radius * GALAXY.SPIN_FACTOR;
	const branchAngle = (branchIndex / GALAXY.BRANCHES) * Math.PI * 2;

	// floor keeps inner arms from collapsing to hairlines; outer arms still widen further
	const scatterFactor = (0.4 + 0.6 * (radius / GALAXY.RADIUS)) * scatter;
	const rx =
		gaussianRandom(GALAXY.RANDOMNESS_POWER) * GALAXY.RANDOMNESS * scatterFactor;
	const ry =
		gaussianRandom(GALAXY.RANDOMNESS_POWER) *
		GALAXY.RANDOMNESS *
		0.65 *
		scatterFactor;
	const rz =
		gaussianRandom(GALAXY.RANDOMNESS_POWER) * GALAXY.RANDOMNESS * scatterFactor;

	const offset = options?.offset ?? [0, 0, 0];

	return [
		Math.cos(branchAngle + spinAngle) * radius + rx + offset[0],
		ry + offset[1],
		Math.sin(branchAngle + spinAngle) * radius + rz + offset[2],
	];
}

const _starEuler = { x: 0, y: 0, z: 0 };
const _starMatrix = new Matrix4();
const _starVec = new Vector3();

// world position of a local star after applying galaxy euler rotation (x, y, z)
export function starWorldAtRotation(
	localPos: [number, number, number],
	rotX: number,
	rotY: number,
	out = _starVec,
) {
	_starEuler.x = rotX;
	_starEuler.y = rotY;
	_starEuler.z = 0;
	_starMatrix.makeRotationFromEuler(_starEuler);
	out.set(localPos[0], localPos[1], localPos[2]);
	out.applyMatrix4(_starMatrix);
	return out;
}

// galaxy rotation that brings a local-space star position to face the camera
export function rotationToFaceCamera(position: [number, number, number]) {
	const [px, py, pz] = position;
	const horizDist = Math.sqrt(px * px + pz * pz);
	return {
		y: -Math.atan2(px, pz),
		x: DEFAULT_VIEW_TILT - Math.atan2(py, horizDist || 1e-6),
	};
}

// stable per-link jitter so positions don't shift between renders
const _ndc = new Vector2();
const _inv = new Matrix4();
const _origin = new Vector3();
const _direction = new Vector3();
const _raycaster = new Raycaster();

// cast a screen point onto the galaxy disk (local y = 0); HUD Y maps to local z
export function pointerToGalaxyPlaneFromMatrix(
	clientX: number,
	clientY: number,
	canvas: HTMLElement,
	camera: Camera,
	groupMatrix: Matrix4,
): { x: number; y: number } | null {
	const rect = canvas.getBoundingClientRect();
	if (
		clientX < rect.left ||
		clientX > rect.right ||
		clientY < rect.top ||
		clientY > rect.bottom
	) {
		return null;
	}

	_ndc.set(
		((clientX - rect.left) / rect.width) * 2 - 1,
		-((clientY - rect.top) / rect.height) * 2 + 1,
	);

	_raycaster.setFromCamera(_ndc, camera);

	_inv.copy(groupMatrix).invert();

	_origin.copy(_raycaster.ray.origin).applyMatrix4(_inv);
	_direction
		.copy(_raycaster.ray.direction)
		.transformDirection(_inv)
		.normalize();

	if (Math.abs(_direction.y) < 1e-8) return null;

	const t = -_origin.y / _direction.y;
	if (t < 0) return null;

	return {
		x: _origin.x + t * _direction.x,
		y: _origin.z + t * _direction.z,
	};
}

export function pointerToGalaxyPlane(
	clientX: number,
	clientY: number,
	canvas: HTMLElement,
	camera: Camera,
	galaxyGroup: Group,
): { x: number; y: number } | null {
	galaxyGroup.updateWorldMatrix(true, false);
	return pointerToGalaxyPlaneFromMatrix(
		clientX,
		clientY,
		canvas,
		camera,
		galaxyGroup.matrixWorld,
	);
}

export function formatGalaxyCoords(x: number, y: number) {
	const fmt = (n: number) => {
		const sign = n >= 0 ? "+" : "−";
		return `${sign}${Math.abs(n).toFixed(2)}`;
	};
	return `X ${fmt(x)} · Y ${fmt(y)}`;
}

export function formatGalaxyAxis(axis: "X" | "Y", value: number | null) {
	if (value === null) return `${axis} ---`;
	const sign = value >= 0 ? "+" : "−";
	return `${axis} ${sign}${Math.abs(value).toFixed(2)}`;
}

export function hashOffset(id: string): [number, number, number] {
	let h = 0;
	for (const c of id) h = (h * 31 + c.charCodeAt(0)) | 0;
	return [
		((h & 0xff) / 255 - 0.5) * 0.12,
		(((h >> 8) & 0xff) / 255 - 0.5) * 0.06,
		(((h >> 16) & 0xff) / 255 - 0.5) * 0.12,
	];
}
