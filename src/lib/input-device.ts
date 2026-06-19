let reducedMotionMq: MediaQueryList | null = null;

export function prefersReducedMotion() {
	if (typeof window === "undefined") return false;
	if (!reducedMotionMq) {
		reducedMotionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
	}
	return reducedMotionMq.matches;
}

export function isTouchPointerType(pointerType: string) {
	return pointerType === "touch";
}

// coarse-pointer devices (phones/tablets), not narrow desktop windows
export function prefersTouchLayout() {
	if (typeof window === "undefined") return false;
	return window.matchMedia("(hover: none) and (pointer: coarse)").matches;
}

// shift the camera projection so a zoomed star sits above the bottom detail panel
export function zoomViewOffsetY(viewportHeight: number) {
	return Math.round(viewportHeight * 0.24);
}
