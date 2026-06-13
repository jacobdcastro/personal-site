import { Vector3 } from "three";

export type ZoomPhase = "idle" | "entering" | "active" | "leaving";

export const ZOOM_DURATION_SEC = 1.35;

export function easeInOutCubic(t: number) {
	const x = Math.max(0, Math.min(1, t));
	return x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2;
}

export const zoomFocusState = {
	phase: "idle" as ZoomPhase,
	progress: 0,
	eased: 0,
};

// updated each frame by the focused LinkStar mesh for a precise orbit pivot
export const focusedStarWorld = new Vector3();
export const focusedStarWorldValid = { current: false };

export function canDismissZoomLock() {
	return zoomFocusState.phase === "active";
}

export function clearFocusedStarWorld() {
	focusedStarWorldValid.current = false;
}
