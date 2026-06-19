import { cursorPos, cursorVelocity } from "./cursor-motion";

let listening = false;
const lastPos = { x: 0, y: 0 };

export function startPointerTracking() {
	if (listening || typeof window === "undefined") return;
	listening = true;

	function updatePointer(e: PointerEvent) {
		const dx = e.clientX - lastPos.x;
		const dy = e.clientY - lastPos.y;
		cursorVelocity.x = dx;
		cursorVelocity.y = dy;
		lastPos.x = e.clientX;
		lastPos.y = e.clientY;

		cursorPos.pointerType = e.pointerType;
		cursorPos.x = e.clientX;
		cursorPos.y = e.clientY;
		cursorPos.active = true;
	}

	function handleLeave() {
		cursorPos.active = false;
	}

	window.addEventListener("pointermove", updatePointer, { passive: true });
	window.addEventListener("pointerdown", updatePointer, { passive: true });
	document.documentElement.addEventListener("pointerleave", handleLeave);
}
