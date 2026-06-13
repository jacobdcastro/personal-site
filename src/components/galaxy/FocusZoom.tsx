import { useFrame, useThree } from "@react-three/fiber";
import { type RefObject, useEffect, useMemo, useRef } from "react";
import type { Group, PerspectiveCamera } from "three";
import { Quaternion, Vector3 } from "three";
import type { GalaxyLink } from "../../data/links";
import {
	clearFocusedStarWorld,
	easeInOutCubic,
	focusedStarWorld,
	focusedStarWorldValid,
	ZOOM_DURATION_SEC,
	zoomFocusState,
} from "../../lib/zoom-focus-state";
import { useNavStore } from "../../store/nav-store";
import {
	hashOffset,
	rotationToFaceCamera,
	spiralPosition,
	starWorldAtRotation,
} from "./galaxy-math";

const ORIGIN = new Vector3(0, 0, 0);
const DEFAULT_POS = new Vector3(0, 0, 8.5);
const DEFAULT_FOV = 58;
const ZOOM_FOV = 38;
const ZOOM_DISTANCE = 1.65;
const SETTLE_EPS = 0.04;
const INERTIA_DECAY = 0.92;
const ORBIT_PITCH_CLAMP = Math.PI / 3;
const Y_AXIS = new Vector3(0, 1, 0);

type ZoomPhase = "idle" | "entering" | "active" | "leaving";

interface FocusZoomProps {
	galaxyGroupRef: RefObject<Group | null>;
	isDragging: RefObject<boolean>;
	velocity: RefObject<{ x: number; y: number }>;
	links: GalaxyLink[];
}

interface ZoomAnchor {
	rayDir: Vector3;
	leaveFromPos: Vector3;
	leaveLookAt: Vector3;
	leaveFromFov: number;
}

function starLocalPosition(link: GalaxyLink, out: Vector3) {
	const [lx, ly, lz] = spiralPosition(link.radius, link.branch, {
		scatter: 0.6,
		offset: hashOffset(link.id),
	});
	out.set(lx, ly, lz);
}

function readStarWorld(group: Group, starLocal: Vector3, out: Vector3) {
	if (focusedStarWorldValid.current) {
		out.copy(focusedStarWorld);
		return;
	}
	group.updateWorldMatrix(true, false);
	out.copy(starLocal).applyMatrix4(group.matrixWorld);
}

function orbitOffsetFromBase(
	baseOffset: Vector3,
	yaw: number,
	pitch: number,
	out: Vector3,
	qYaw: Quaternion,
	qPitch: Quaternion,
	right: Vector3,
) {
	qYaw.setFromAxisAngle(Y_AXIS, yaw);
	out.copy(baseOffset).applyQuaternion(qYaw);
	right.crossVectors(Y_AXIS, out).normalize();
	qPitch.setFromAxisAngle(right, pitch);
	out.copy(baseOffset).applyQuaternion(qYaw).applyQuaternion(qPitch);
}

export function FocusZoom({
	galaxyGroupRef,
	isDragging,
	velocity,
	links,
}: FocusZoomProps) {
	const { camera } = useThree();
	const focusedLinkId = useNavStore((s) => s.focusedLinkId);
	const phase = useRef<ZoomPhase>("idle");
	const orbit = useRef({ yaw: 0, pitch: 0 });
	const starLocal = useRef(new Vector3());
	const baseOffset = useRef(new Vector3(0, 0, ZOOM_DISTANCE));
	const anchor = useRef<ZoomAnchor | null>(null);
	const animProgress = useRef(0);

	const starWorld = useMemo(() => new Vector3(), []);
	const desiredPos = useMemo(() => new Vector3(), []);
	const zoomEndPos = useMemo(() => new Vector3(), []);
	const offset = useMemo(() => new Vector3(), []);
	const lookTarget = useMemo(() => new Vector3(), []);
	const finalStar = useMemo(() => new Vector3(), []);
	const qYaw = useMemo(() => new Quaternion(), []);
	const qPitch = useMemo(() => new Quaternion(), []);
	const right = useMemo(() => new Vector3(), []);

	function beginEnter(group: Group) {
		phase.current = "entering";
		animProgress.current = 0;
		orbit.current = { yaw: 0, pitch: 0 };

		readStarWorld(group, starLocal.current, starWorld);

		const link = links.find((l) => l.id === focusedLinkId);
		if (link) {
			const local = spiralPosition(link.radius, link.branch, {
				scatter: 0.6,
				offset: hashOffset(link.id),
			});
			const target = rotationToFaceCamera(local);
			starWorldAtRotation(local, target.x, target.y, finalStar);
		} else {
			finalStar.copy(starWorld);
		}

		const rayDir = lookTarget.subVectors(DEFAULT_POS, finalStar);
		if (rayDir.lengthSq() < 1e-6) rayDir.set(0, 0, 1);
		rayDir.normalize();

		baseOffset.current.copy(rayDir).multiplyScalar(ZOOM_DISTANCE);
		anchor.current = {
			rayDir: rayDir.clone(),
			leaveFromPos: new Vector3(),
			leaveLookAt: new Vector3(),
			leaveFromFov: DEFAULT_FOV,
		};
	}

	function beginLeave(cam: PerspectiveCamera, group: Group | null) {
		const a = anchor.current;
		if (!a) return;

		if (group) readStarWorld(group, starLocal.current, starWorld);

		phase.current = "leaving";
		animProgress.current = 0;
		a.leaveFromPos.copy(cam.position);
		a.leaveLookAt.copy(starWorld);
		a.leaveFromFov = cam.fov;
	}

	useEffect(() => {
		if (!focusedLinkId) return;

		clearFocusedStarWorld();
		animProgress.current = 0;
		orbit.current = { yaw: 0, pitch: 0 };
		anchor.current = null;
		phase.current = "idle";

		const link = links.find((l) => l.id === focusedLinkId);
		if (link) starLocalPosition(link, starLocal.current);
	}, [focusedLinkId, links]);

	useFrame((_, delta) => {
		const cam = camera as PerspectiveCamera;
		const group = galaxyGroupRef.current;
		const wantsZoom = !!focusedLinkId && !!group;
		const snap = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		if (!wantsZoom) {
			if (phase.current === "entering" || phase.current === "active") {
				beginLeave(cam, group);
			}

			if (phase.current === "leaving" && anchor.current) {
				const a = anchor.current;
				const eased = snap ? 1 : easeInOutCubic(animProgress.current);

				cam.position.lerpVectors(a.leaveFromPos, DEFAULT_POS, eased);
				cam.fov = a.leaveFromFov + (DEFAULT_FOV - a.leaveFromFov) * eased;
				lookTarget.lerpVectors(a.leaveLookAt, ORIGIN, eased);
				cam.lookAt(lookTarget);
				cam.updateProjectionMatrix();

				zoomFocusState.progress = animProgress.current;
				zoomFocusState.eased = eased;

				if (animProgress.current >= 1) {
					phase.current = "idle";
					anchor.current = null;
					clearFocusedStarWorld();
				} else if (!snap) {
					animProgress.current = Math.min(
						1,
						animProgress.current + delta / ZOOM_DURATION_SEC,
					);
				} else {
					animProgress.current = 1;
				}
			} else if (phase.current === "leaving") {
				phase.current = "idle";
				clearFocusedStarWorld();
			}

			zoomFocusState.phase = phase.current;
			return;
		}

		readStarWorld(group, starLocal.current, starWorld);

		if (!anchor.current) {
			beginEnter(group);
		}

		const a = anchor.current;
		if (!a) return;

		if (phase.current === "entering") {
			const eased = snap ? 1 : easeInOutCubic(animProgress.current);

			zoomEndPos.copy(starWorld).add(baseOffset.current);
			cam.position.lerpVectors(DEFAULT_POS, zoomEndPos, eased);
			cam.fov = DEFAULT_FOV + (ZOOM_FOV - DEFAULT_FOV) * eased;
			lookTarget.lerpVectors(ORIGIN, starWorld, eased);
			cam.lookAt(lookTarget);
			cam.updateProjectionMatrix();

			zoomFocusState.progress = animProgress.current;
			zoomFocusState.eased = eased;

			if (animProgress.current >= 1) {
				phase.current = "active";
			} else if (!snap) {
				animProgress.current = Math.min(
					1,
					animProgress.current + delta / ZOOM_DURATION_SEC,
				);
			} else {
				animProgress.current = 1;
			}

			zoomFocusState.phase = phase.current;
			return;
		}

		const hasVelocity =
			Math.abs(velocity.current.x) > 1e-5 ||
			Math.abs(velocity.current.y) > 1e-5;
		const interacting = isDragging.current || hasVelocity;

		if (interacting) {
			if (isDragging.current) {
				orbit.current.pitch += velocity.current.x;
				orbit.current.yaw += velocity.current.y;
			} else {
				velocity.current.x *= INERTIA_DECAY;
				velocity.current.y *= INERTIA_DECAY;
				orbit.current.pitch += velocity.current.x;
				orbit.current.yaw += velocity.current.y;
			}

			orbit.current.pitch = Math.max(
				-ORBIT_PITCH_CLAMP,
				Math.min(ORBIT_PITCH_CLAMP, orbit.current.pitch),
			);
		}

		orbitOffsetFromBase(
			baseOffset.current,
			orbit.current.yaw,
			orbit.current.pitch,
			offset,
			qYaw,
			qPitch,
			right,
		);
		desiredPos.copy(starWorld).add(offset);

		if (snap) {
			cam.position.copy(desiredPos);
		} else if (interacting) {
			cam.position.lerp(desiredPos, 0.22);
		} else {
			const settle = cam.position.distanceTo(desiredPos);
			if (settle > SETTLE_EPS) {
				cam.position.lerp(desiredPos, 0.14);
			} else {
				cam.position.copy(desiredPos);
			}
		}

		cam.lookAt(starWorld);
		cam.fov = ZOOM_FOV;
		cam.updateProjectionMatrix();

		zoomFocusState.phase = phase.current;
		zoomFocusState.progress = 1;
		zoomFocusState.eased = 1;
	}, -2);

	return null;
}
