import { Euler, Matrix4, PerspectiveCamera, Quaternion, Vector3 } from "three";
import {
	DEFAULT_VIEW_TILT,
	hashOffset,
	spiralPosition,
} from "../components/galaxy/galaxy-math";
import type { GalaxyLink } from "../data/links";
import {
	prefersReducedMotion,
	prefersTouchLayout,
	zoomViewOffsetY,
} from "./input-device";
import {
	clearFocusedStarWorld,
	easeInOutCubic,
	focusedStarWorld,
	focusedStarWorldValid,
	ZOOM_DURATION_SEC,
	type ZoomPhase,
	zoomFocusState,
} from "./zoom-focus-state";

const ORIGIN = new Vector3(0, 0, 0);
const DEFAULT_POS = new Vector3(0, 0, 8.5);
const DEFAULT_FOV = 58;
const ZOOM_FOV = 38;
const ZOOM_DISTANCE = 1.65;
const SETTLE_EPS = 0.04;
const IDLE_SPEED = 0.04;
const INERTIA_DECAY = 0.92;
const X_ROTATION_CLAMP = Math.PI / 3;
const ORBIT_PITCH_CLAMP = Math.PI / 3;
const Y_AXIS = new Vector3(0, 1, 0);

export interface SimInput {
	isDragging: boolean;
	velocity: { x: number; y: number };
	focusedLinkId: string | null;
	links: GalaxyLink[];
	width: number;
	height: number;
}

interface ZoomAnchor {
	leaveFromPos: Vector3;
	leaveLookAt: Vector3;
	leaveFromFov: number;
}

const _euler = new Euler();
const _matrix = new Matrix4();
const _local = new Vector3();
const _world = new Vector3();
const _ndc = new Vector3();
const _viewPos = new Vector3();
const _starWorld = new Vector3();
const _desiredPos = new Vector3();
const _zoomEndPos = new Vector3();
const _offset = new Vector3();
const _lookTarget = new Vector3();
const _qYaw = new Quaternion();
const _qPitch = new Quaternion();
const _right = new Vector3();
const _baseOffset = new Vector3(0, 0, ZOOM_DISTANCE);
const linkLocalCache = new Map<string, [number, number, number]>();

function starLocalPosition(link: GalaxyLink, out: Vector3): Vector3 {
	let cached = linkLocalCache.get(link.id);
	if (!cached) {
		const [lx, ly, lz] = spiralPosition(link.radius, link.branch, {
			scatter: 0.6,
			offset: hashOffset(link.id),
		});
		cached = [lx, ly, lz];
		linkLocalCache.set(link.id, cached);
	}
	out.set(cached[0], cached[1], cached[2]);
	return out;
}

function orbitOffsetFromBase(
	baseOffset: Vector3,
	yaw: number,
	pitch: number,
	out: Vector3,
) {
	_qYaw.setFromAxisAngle(Y_AXIS, yaw);
	out.copy(baseOffset).applyQuaternion(_qYaw);
	_right.crossVectors(Y_AXIS, out).normalize();
	_qPitch.setFromAxisAngle(_right, pitch);
	out.copy(baseOffset).applyQuaternion(_qYaw).applyQuaternion(_qPitch);
}

function applyZoomViewOffset(
	cam: PerspectiveCamera,
	width: number,
	height: number,
	strength = 1,
) {
	if (!prefersTouchLayout() || strength <= 0) {
		if (cam.view) cam.clearViewOffset();
		return;
	}

	const shiftY = Math.round(zoomViewOffsetY(height) * strength);
	cam.setViewOffset(width, height, 0, shiftY, width, height);
}

function readStarWorld(starLocal: Vector3, groupMatrix: Matrix4, out: Vector3) {
	if (focusedStarWorldValid.current) {
		out.copy(focusedStarWorld);
		return;
	}
	out.copy(starLocal).applyMatrix4(groupMatrix);
}

class GalaxySimulation {
	rotation = { x: DEFAULT_VIEW_TILT, y: 0 };
	readonly camera = new PerspectiveCamera(DEFAULT_FOV, 1, 0.1, 100);
	readonly lookAt = new Vector3(0, 0, 0);

	private phase: ZoomPhase = "idle";
	private orbit = { yaw: 0, pitch: 0 };
	private starLocal = new Vector3();
	private anchor: ZoomAnchor | null = null;
	private animProgress = 0;
	private focusLocalPos: [number, number, number] | null = null;
	private lastFocusedLinkId: string | null = null;

	constructor() {
		this.camera.position.copy(DEFAULT_POS);
		this.camera.lookAt(ORIGIN);
	}

	onFocusChange(focusedLinkId: string | null, links: GalaxyLink[]) {
		if (focusedLinkId === this.lastFocusedLinkId) return;
		this.lastFocusedLinkId = focusedLinkId;

		if (!focusedLinkId) {
			this.focusLocalPos = null;
			return;
		}

		clearFocusedStarWorld();
		this.animProgress = 0;
		this.orbit = { yaw: 0, pitch: 0 };
		this.anchor = null;
		this.phase = "idle";

		const link = links.find((l) => l.id === focusedLinkId);
		if (!link) return;

		this.focusLocalPos = spiralPosition(link.radius, link.branch, {
			scatter: 0.6,
			offset: hashOffset(link.id),
		});
		starLocalPosition(link, this.starLocal);
	}

	getGroupMatrix(out = _matrix): Matrix4 {
		_euler.set(this.rotation.x, this.rotation.y, 0, "XYZ");
		return out.makeRotationFromEuler(_euler);
	}

	projectLocal(local: Vector3, out = _ndc): Vector3 {
		const groupMatrix = this.getGroupMatrix(_matrix);
		_world.copy(local).applyMatrix4(groupMatrix);
		out.copy(_world).project(this.camera);
		return out;
	}

	projectLocalToScreen(
		local: Vector3,
		width: number,
		height: number,
	): { x: number; y: number; ndcZ: number; worldZ: number } | null {
		this.projectLocal(local, _ndc);

		const groupMatrix = this.getGroupMatrix(_matrix);
		_world.copy(local).applyMatrix4(groupMatrix);
		const worldZ = _world.z;

		// reject only stars behind the camera, not the far side of the galaxy
		_viewPos.copy(_world).applyMatrix4(this.camera.matrixWorldInverse);
		if (_viewPos.z >= 0) return null;

		if (_ndc.z > 1.05) return null;

		return {
			x: ((_ndc.x + 1) / 2) * width,
			y: ((1 - _ndc.y) / 2) * height,
			ndcZ: _ndc.z,
			worldZ,
		};
	}

	private beginEnter(groupMatrix: Matrix4) {
		this.phase = "entering";
		this.animProgress = 0;
		this.orbit = { yaw: 0, pitch: 0 };

		readStarWorld(this.starLocal, groupMatrix, _starWorld);

		const rayDir = _lookTarget.subVectors(DEFAULT_POS, _starWorld);
		if (rayDir.lengthSq() < 1e-6) rayDir.set(0, 0, 1);
		rayDir.normalize();

		_baseOffset.copy(rayDir).multiplyScalar(ZOOM_DISTANCE);
		this.anchor = {
			leaveFromPos: new Vector3(),
			leaveLookAt: new Vector3(),
			leaveFromFov: DEFAULT_FOV,
		};
	}

	private beginLeave(cam: PerspectiveCamera, groupMatrix: Matrix4) {
		const a = this.anchor;
		if (!a) return;

		readStarWorld(this.starLocal, groupMatrix, _starWorld);

		this.phase = "leaving";
		this.animProgress = 0;
		a.leaveFromPos.copy(cam.position);
		a.leaveLookAt.copy(_starWorld);
		a.leaveFromFov = cam.fov;
	}

	private tickRotation(delta: number, input: SimInput) {
		const { focusedLinkId, isDragging, velocity } = input;

		if (focusedLinkId && this.focusLocalPos) {
			// keep whatever rotation the user had; zoom targets the star in world space
			return;
		}

		if (isDragging) {
			this.rotation.x += velocity.x;
			this.rotation.y += velocity.y;
		} else {
			velocity.x *= INERTIA_DECAY;
			velocity.y *= INERTIA_DECAY;
			this.rotation.x += velocity.x;
			this.rotation.y += velocity.y;
			this.rotation.y += IDLE_SPEED * delta;
		}

		this.rotation.x = Math.max(
			-X_ROTATION_CLAMP,
			Math.min(X_ROTATION_CLAMP, this.rotation.x),
		);
	}

	private tickCamera(delta: number, input: SimInput) {
		const cam = this.camera;
		const { focusedLinkId, isDragging, velocity, width, height } = input;
		const groupMatrix = this.getGroupMatrix(_matrix);
		const wantsZoom = !!focusedLinkId;
		const snap = prefersReducedMotion();

		cam.aspect = width / height || 1;

		if (!wantsZoom) {
			if (this.phase === "entering" || this.phase === "active") {
				this.beginLeave(cam, groupMatrix);
			}

			if (this.phase === "leaving" && this.anchor) {
				const a = this.anchor;
				const eased = snap ? 1 : easeInOutCubic(this.animProgress);

				cam.position.lerpVectors(a.leaveFromPos, DEFAULT_POS, eased);
				cam.fov = a.leaveFromFov + (DEFAULT_FOV - a.leaveFromFov) * eased;
				this.lookAt.lerpVectors(a.leaveLookAt, ORIGIN, eased);
				cam.lookAt(this.lookAt);
				applyZoomViewOffset(cam, width, height, 1 - eased);
				cam.updateProjectionMatrix();

				zoomFocusState.progress = this.animProgress;
				zoomFocusState.eased = eased;

				if (this.animProgress >= 1) {
					this.phase = "idle";
					this.anchor = null;
					clearFocusedStarWorld();
				} else if (!snap) {
					this.animProgress = Math.min(
						1,
						this.animProgress + delta / ZOOM_DURATION_SEC,
					);
				} else {
					this.animProgress = 1;
				}
			} else if (this.phase === "leaving") {
				this.phase = "idle";
				clearFocusedStarWorld();
			}

			zoomFocusState.phase = this.phase;
			return;
		}

		readStarWorld(this.starLocal, groupMatrix, _starWorld);

		if (!this.anchor) {
			this.beginEnter(groupMatrix);
		}

		const a = this.anchor;
		if (!a) return;

		if (this.phase === "entering") {
			const eased = snap ? 1 : easeInOutCubic(this.animProgress);

			_zoomEndPos.copy(_starWorld).add(_baseOffset);
			cam.position.lerpVectors(DEFAULT_POS, _zoomEndPos, eased);
			cam.fov = DEFAULT_FOV + (ZOOM_FOV - DEFAULT_FOV) * eased;
			this.lookAt.lerpVectors(ORIGIN, _starWorld, eased);
			cam.lookAt(this.lookAt);
			applyZoomViewOffset(cam, width, height, eased);
			cam.updateProjectionMatrix();

			zoomFocusState.progress = this.animProgress;
			zoomFocusState.eased = eased;

			if (this.animProgress >= 1) {
				this.phase = "active";
			} else if (!snap) {
				this.animProgress = Math.min(
					1,
					this.animProgress + delta / ZOOM_DURATION_SEC,
				);
			} else {
				this.animProgress = 1;
			}

			zoomFocusState.phase = this.phase;
			return;
		}

		const hasVelocity =
			Math.abs(velocity.x) > 1e-5 || Math.abs(velocity.y) > 1e-5;
		const interacting = isDragging || hasVelocity;

		if (interacting) {
			// camera orbit inverts screen motion vs rotating the galaxy group
			if (isDragging) {
				this.orbit.pitch -= velocity.x;
				this.orbit.yaw -= velocity.y;
			} else {
				velocity.x *= INERTIA_DECAY;
				velocity.y *= INERTIA_DECAY;
				this.orbit.pitch -= velocity.x;
				this.orbit.yaw -= velocity.y;
			}

			this.orbit.pitch = Math.max(
				-ORBIT_PITCH_CLAMP,
				Math.min(ORBIT_PITCH_CLAMP, this.orbit.pitch),
			);
		}

		orbitOffsetFromBase(_baseOffset, this.orbit.yaw, this.orbit.pitch, _offset);
		_desiredPos.copy(_starWorld).add(_offset);

		if (snap) {
			cam.position.copy(_desiredPos);
		} else if (interacting) {
			cam.position.lerp(_desiredPos, 0.22);
		} else {
			const settle = cam.position.distanceTo(_desiredPos);
			if (settle > SETTLE_EPS) {
				cam.position.lerp(_desiredPos, 0.14);
			} else {
				cam.position.copy(_desiredPos);
			}
		}

		cam.lookAt(_starWorld);
		this.lookAt.copy(_starWorld);
		applyZoomViewOffset(cam, width, height);
		cam.fov = ZOOM_FOV;
		cam.updateProjectionMatrix();

		zoomFocusState.phase = this.phase;
		zoomFocusState.progress = 1;
		zoomFocusState.eased = 1;
	}

	tick(delta: number, input: SimInput) {
		this.onFocusChange(input.focusedLinkId, input.links);
		// camera first so zoomFocusState is updated before rotation reads eased
		this.tickCamera(delta, input);
		this.tickRotation(delta, input);
		// keep projection/view in sync for ASCII projection (WebGL updates via R3F each frame)
		this.camera.updateMatrixWorld();
		this.camera.updateProjectionMatrix();
	}
}

export const galaxySim = new GalaxySimulation();

export function getLinkLocalPosition(link: GalaxyLink, out = _local): Vector3 {
	return starLocalPosition(link, out);
}

export { _world as simWorldVec, _local as simLocalVec };
