import type { PointerEvent as ReactPointerEvent } from "react";
import { type RefObject, useEffect, useRef } from "react";
import { canDismissZoomLock } from "../lib/zoom-focus-state";
import { useNavStore } from "../store/nav-store";

const DRAG_SENSITIVITY = 0.004;
const WHEEL_SENSITIVITY = 0.004;

function isFocusLocked() {
	return !!useNavStore.getState().focusedLinkId;
}

function wheelDeltas(e: WheelEvent): { x: number; y: number } {
	const scale =
		e.deltaMode === WheelEvent.DOM_DELTA_LINE
			? 16
			: e.deltaMode === WheelEvent.DOM_DELTA_PAGE
				? window.innerHeight
				: 1;

	const dx = e.deltaX * scale;
	const dy = e.deltaY * scale;

	return {
		x: -dy * WHEEL_SENSITIVITY,
		y: -dx * WHEEL_SENSITIVITY,
	};
}

interface UseGalaxyInputOptions {
	isDragging: RefObject<boolean>;
	velocity: RefObject<{ x: number; y: number }>;
	resolveTapLink?: (x: number, y: number) => string | null;
}

export function useGalaxyInput({
	isDragging,
	velocity,
	resolveTapLink,
}: UseGalaxyInputOptions) {
	const containerRef = useRef<HTMLDivElement>(null);
	const lastPointer = useRef({ x: 0, y: 0 });
	const dragMoved = useRef(0);
	const pointerDownOnCanvas = useRef(false);
	const activePointerId = useRef<number | null>(null);
	const multiTouchPaused = useRef(false);
	const skipNextDelta = useRef(false);
	const pressedLinkId = useRef<string | null>(null);
	const setFocusedLink = useNavStore((s) => s.setFocusedLink);
	const setDragging = useNavStore((s) => s.setDragging);
	const focusedLinkId = useNavStore((s) => s.focusedLinkId);
	const resolveTapLinkRef = useRef(resolveTapLink);
	resolveTapLinkRef.current = resolveTapLink;

	useEffect(() => {
		if (!focusedLinkId) velocity.current = { x: 0, y: 0 };
	}, [focusedLinkId, velocity]);

	useEffect(() => {
		const el = containerRef.current;
		if (!el) return;

		function handleWheel(e: WheelEvent) {
			const { x, y } = wheelDeltas(e);
			if (Math.abs(x) < 0.002 && Math.abs(y) < 0.002) return;

			e.preventDefault();
			if (!isFocusLocked()) {
				setFocusedLink(null);
			}
			velocity.current.x = x;
			velocity.current.y = y;
		}

		function onPointerMoveCapture(e: PointerEvent) {
			if (e.pointerId !== activePointerId.current) return;
			if (multiTouchPaused.current) return;
			if (!isDragging.current) return;

			if (skipNextDelta.current) {
				skipNextDelta.current = false;
				lastPointer.current = { x: e.clientX, y: e.clientY };
				return;
			}

			const dx = e.clientX - lastPointer.current.x;
			const dy = e.clientY - lastPointer.current.y;
			dragMoved.current += Math.hypot(dx, dy);
			velocity.current.y = dx * DRAG_SENSITIVITY;
			velocity.current.x = dy * DRAG_SENSITIVITY;
			lastPointer.current = { x: e.clientX, y: e.clientY };
		}

		el.addEventListener("wheel", handleWheel, {
			passive: false,
			capture: true,
		});
		el.addEventListener("pointermove", onPointerMoveCapture, {
			capture: true,
		});
		return () => {
			el.removeEventListener("wheel", handleWheel, { capture: true });
			el.removeEventListener("pointermove", onPointerMoveCapture, {
				capture: true,
			});
		};
	}, [setFocusedLink, velocity]);

	function pauseForMultiTouch() {
		multiTouchPaused.current = true;
		velocity.current = { x: 0, y: 0 };
		isDragging.current = false;
		setDragging(false);
	}

	function resumeFromMultiTouchPause() {
		if (!multiTouchPaused.current || activePointerId.current === null) return;
		multiTouchPaused.current = false;
		skipNextDelta.current = true;
		isDragging.current = true;
		setDragging(true);
	}

	function selectLinkOnTap(clientX: number, clientY: number) {
		const linkId =
			pressedLinkId.current ??
			resolveTapLinkRef.current?.(clientX, clientY) ??
			null;
		if (!linkId) return;

		const current = useNavStore.getState().focusedLinkId;
		if (current === linkId) {
			if (canDismissZoomLock()) setFocusedLink(null);
		} else {
			setFocusedLink(linkId);
		}
	}

	function releasePointer(e: ReactPointerEvent<HTMLDivElement>) {
		if (!e.isPrimary) {
			resumeFromMultiTouchPause();
			return;
		}

		if (e.pointerId !== activePointerId.current) return;

		try {
			e.currentTarget.releasePointerCapture(e.pointerId);
		} catch {
			// pointer may already be released
		}

		const wasTap = dragMoved.current < 5;

		if (pointerDownOnCanvas.current && isFocusLocked() && wasTap && canDismissZoomLock()) {
			setFocusedLink(null);
			velocity.current = { x: 0, y: 0 };
		} else if (wasTap && !isFocusLocked()) {
			selectLinkOnTap(e.clientX, e.clientY);
		}

		activePointerId.current = null;
		multiTouchPaused.current = false;
		skipNextDelta.current = false;
		pressedLinkId.current = null;
		pointerDownOnCanvas.current = false;
		isDragging.current = false;
		setDragging(false);
	}

	function handlePointerDown(e: ReactPointerEvent<HTMLDivElement>) {
		if (!e.isPrimary) {
			if (activePointerId.current !== null) pauseForMultiTouch();
			return false;
		}

		if (activePointerId.current !== null) return false;

		activePointerId.current = e.pointerId;
		try {
			e.currentTarget.setPointerCapture(e.pointerId);
		} catch {
			// capture may fail on some synthetic events
		}

		pressedLinkId.current = useNavStore.getState().hoveredId;
		pointerDownOnCanvas.current = true;
		isDragging.current = true;
		setDragging(true);
		dragMoved.current = 0;
		lastPointer.current = { x: e.clientX, y: e.clientY };

		if (!isFocusLocked()) {
			setFocusedLink(null);
			velocity.current = { x: 0, y: 0 };
		}

		return true;
	}

	return {
		containerRef,
		dragMoved,
		handlers: {
			onPointerDown: handlePointerDown,
			onPointerUp: releasePointer,
			onPointerCancel: releasePointer,
		},
	};
}

export { DRAG_SENSITIVITY };
