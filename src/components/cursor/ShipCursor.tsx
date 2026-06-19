import { useEffect, useRef, useState } from "react";
import { formatGalaxyAxis, formatGalaxyCoords } from "../galaxy/galaxy-math";
import {
	cursorPos,
	cursorVelocity,
	galaxyCoordsRef,
} from "../../lib/cursor-motion";
import {
	prefersTouchLayout,
} from "../../lib/input-device";
import { startPointerTracking } from "../../lib/pointer-tracker";
import { useNavStore } from "../../store/nav-store";

type CursorState = "scan" | "grip" | "acquire" | "lock" | "terminal";

const STATE_LABEL: Record<CursorState, string> = {
	scan: "SCAN",
	grip: "MANUAL",
	acquire: "ACQUIRE",
	lock: "TARGET LOCK",
	terminal: "TERMINAL",
};

const INNER = "#ffd4a8";
const OUTER = "#8ec8ff";
const TERMINAL_CHECK_MS = 100;
const TERMINAL_CHECK_PX = 20;

function resolveState(
	isTerminal: boolean,
	isDragging: boolean,
	focusedLinkId: string | null,
	hoveredId: string | null,
): CursorState {
	if (isTerminal) return "terminal";
	if (isDragging) return "grip";
	if (focusedLinkId) return "lock";
	if (hoveredId) return "acquire";
	return "scan";
}

export function ShipCursor() {
	const mode = useNavStore((s) => s.mode);

	const [touchHud, setTouchHud] = useState(false);
	const [reducedMotion, setReducedMotion] = useState(false);

	const cursorRef = useRef<HTMLDivElement>(null);
	const stateLabelRef = useRef<HTMLDivElement>(null);
	const coordsHudRef = useRef<HTMLDivElement>(null);
	const touchCoordsXRef = useRef<HTMLSpanElement>(null);
	const touchCoordsYRef = useRef<HTMLSpanElement>(null);
	const chevronRefs = useRef<{
		left: HTMLSpanElement | null;
		right: HTMLSpanElement | null;
		up: HTMLSpanElement | null;
		down: HTMLSpanElement | null;
	}>({ left: null, right: null, up: null, down: null });

	const visibleRef = useRef(false);
	const touchHudRef = useRef(false);
	const reducedMotionRef = useRef(false);
	const lastDrag = useRef(false);
	const wobbleRef = useRef(0);
	const lastTerminalCheck = useRef({ t: 0, x: 0, y: 0 });
	const lastHudCoords = useRef("");
	const lastTouchHudCoords = useRef({ x: "", y: "" });
	const lastState = useRef<CursorState>("scan");
	const lastStateLabel = useRef("");
	const isTerminalRef = useRef(false);

	useEffect(() => {
		touchHudRef.current = touchHud;
	}, [touchHud]);

	useEffect(() => {
		reducedMotionRef.current = reducedMotion;
	}, [reducedMotion]);

	useEffect(() => {
		const mq = window.matchMedia("(hover: none) and (pointer: coarse)");
		setTouchHud(mq.matches);
		function handleChange() {
			setTouchHud(prefersTouchLayout());
		}
		mq.addEventListener("change", handleChange);
		return () => mq.removeEventListener("change", handleChange);
	}, []);

	useEffect(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		setReducedMotion(mq.matches);
		function handleChange() {
			setReducedMotion(mq.matches);
		}
		mq.addEventListener("change", handleChange);
		return () => mq.removeEventListener("change", handleChange);
	}, []);

	useEffect(() => {
		if (mode !== "3d" || touchHud || reducedMotion) return;

		document.body.classList.add("ship-cursor-active");
		return () => document.body.classList.remove("ship-cursor-active");
	}, [mode, touchHud, reducedMotion]);

	useEffect(() => {
		if (mode !== "3d") return;
		startPointerTracking();
	}, [mode]);

	useEffect(() => {
		if (mode !== "3d") return;

		let frameId = 0;

		function maybeCheckTerminal(x: number, y: number) {
			const now = performance.now();
			const last = lastTerminalCheck.current;
			if (
				now - last.t < TERMINAL_CHECK_MS &&
				Math.hypot(x - last.x, y - last.y) < TERMINAL_CHECK_PX
			) {
				return;
			}
			lastTerminalCheck.current = { t: now, x, y };

			const target = document.elementFromPoint(x, y);
			isTerminalRef.current = !!target?.closest('[data-ship-cursor="terminal"]');
		}

		function applyState(state: CursorState) {
			if (state === lastState.current) return;
			lastState.current = state;

			const el = cursorRef.current;
			if (el) {
				el.dataset.state = state;
				el.style.display =
					visibleRef.current && !touchHudRef.current ? "" : "none";
			}

			const label = STATE_LABEL[state];
			if (label !== lastStateLabel.current) {
				lastStateLabel.current = label;
				if (stateLabelRef.current) {
					stateLabelRef.current.textContent = label;
				}
			}

			if (coordsHudRef.current) {
				coordsHudRef.current.style.display =
					state === "terminal" ? "none" : "";
			}
		}

		function tick() {
			const nav = useNavStore.getState();
			const dragging = nav.isDragging;

			if (lastDrag.current && !dragging) {
				const speed = Math.hypot(cursorVelocity.x, cursorVelocity.y);
				if (speed > 4 && !reducedMotionRef.current) {
					wobbleRef.current = speed * 0.4;
				}
			}
			lastDrag.current = dragging;

			if (cursorPos.active) {
				if (!touchHudRef.current && !visibleRef.current) {
					visibleRef.current = true;
					if (cursorRef.current) {
						cursorRef.current.style.display = "";
					}
				}
				maybeCheckTerminal(cursorPos.x, cursorPos.y);
			} else if (visibleRef.current) {
				visibleRef.current = false;
				if (cursorRef.current) {
					cursorRef.current.style.display = "none";
				}
			}

			const el = cursorRef.current;
			if (el && visibleRef.current && !touchHudRef.current) {
				const wobble = wobbleRef.current;
				el.style.transform = `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0) rotate(${wobble * 0.6}deg)`;
				if (wobble > 0.05) {
					wobbleRef.current = wobble * 0.82;
				} else {
					wobbleRef.current = 0;
				}
			}

			const state = resolveState(
				isTerminalRef.current,
				dragging,
				nav.focusedLinkId,
				nav.hoveredId,
			);
			applyState(state);

			if (state === "grip") {
				const chevrons = chevronRefs.current;
				const speed = Math.hypot(cursorVelocity.x, cursorVelocity.y);
				const chevronOpacity = Math.min(1, speed / 6);
				if (chevrons.left) {
					chevrons.left.style.opacity = String(
						chevronOpacity * (cursorVelocity.x < -0.5 ? 1 : 0.2),
					);
				}
				if (chevrons.right) {
					chevrons.right.style.opacity = String(
						chevronOpacity * (cursorVelocity.x > 0.5 ? 1 : 0.2),
					);
				}
				if (chevrons.up) {
					chevrons.up.style.opacity = String(
						chevronOpacity * (cursorVelocity.y < -0.5 ? 1 : 0.2),
					);
				}
				if (chevrons.down) {
					chevrons.down.style.opacity = String(
						chevronOpacity * (cursorVelocity.y > 0.5 ? 1 : 0.2),
					);
				}
			}

			const hud = coordsHudRef.current;
			if (touchHudRef.current) {
				const xEl = touchCoordsXRef.current;
				const yEl = touchCoordsYRef.current;
				if (xEl && yEl) {
					const coords = galaxyCoordsRef.current;
					const xText = coords ? formatGalaxyAxis("X", coords.x) : "X ---";
					const yText = coords ? formatGalaxyAxis("Y", coords.y) : "Y ---";

					if (xText !== lastTouchHudCoords.current.x) {
						lastTouchHudCoords.current.x = xText;
						xEl.textContent = xText;
					}
					if (yText !== lastTouchHudCoords.current.y) {
						lastTouchHudCoords.current.y = yText;
						yEl.textContent = yText;
					}
				}
			} else if (hud) {
				const coords = galaxyCoordsRef.current;
				const text = coords
					? formatGalaxyCoords(coords.x, coords.y)
					: "X --- · Y ---";
				if (text !== lastHudCoords.current) {
					lastHudCoords.current = text;
					hud.textContent = text;
				}
			}

			frameId = requestAnimationFrame(tick);
		}

		frameId = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(frameId);
	}, [mode]);

	if (mode !== "3d") return null;

	if (touchHud) {
		return (
			<div
				className="pointer-events-none fixed top-3 right-4 z-[100] w-[11.5rem] max-w-[calc(100vw-5rem)]"
				aria-hidden
			>
				<div className="border border-[#8ec8ff]/40 bg-black/75 px-3 py-2 text-right shadow-[0_0_24px_rgba(142,200,255,0.06)] backdrop-blur-md">
					<div className="flex items-baseline justify-end gap-2">
						<span className="font-mono text-[8px] tracking-[0.2em] text-[#8ec8ff]/50 uppercase">
							state
						</span>
						<span
							ref={stateLabelRef}
							className="min-w-[5.5rem] font-mono text-[10px] tracking-wider text-[#ffd4a8]/90"
						>
							SCAN
						</span>
					</div>
					<div className="mt-1 font-mono text-[8px] tracking-[0.2em] text-[#8ec8ff]/50 uppercase">
						coords
					</div>
					<div className="mt-0.5 flex items-baseline justify-end gap-2 font-mono text-[10px] tracking-wider tabular-nums">
						<span
							ref={touchCoordsXRef}
							className="w-[5rem] text-right text-[#8ec8ff]/70"
						>
							X ---
						</span>
						<span className="text-[#8ec8ff]/35">·</span>
						<span
							ref={touchCoordsYRef}
							className="w-[5rem] text-right text-[#8ec8ff]/70"
						>
							Y ---
						</span>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div
			ref={cursorRef}
			className="ship-cursor pointer-events-none fixed top-0 left-0 z-[100]"
			data-state="scan"
			data-reduced-motion={reducedMotion ? "true" : "false"}
			style={{ willChange: "transform", display: "none" }}
			aria-hidden
		>
			<div
				className="absolute -translate-x-1/2 -translate-y-1/2"
				style={{ width: 48, height: 48 }}
			>
				<div className="ship-cursor-ping absolute inset-0 rounded-full border border-[#8ec8ff]/30" />

				<svg
					className="ship-cursor-ring absolute inset-0"
					viewBox="0 0 48 48"
					fill="none"
				>
					<circle
						cx="24"
						cy="24"
						r="20"
						stroke={OUTER}
						strokeWidth="0.75"
						strokeOpacity="0.7"
					/>
					{[0, 90, 180, 270].map((deg) => (
						<line
							key={deg}
							x1="24"
							y1="4"
							x2="24"
							y2="8"
							stroke={OUTER}
							strokeWidth="1"
							strokeOpacity="0.5"
							transform={`rotate(${deg} 24 24)`}
						/>
					))}
				</svg>

				<svg
					className="ship-cursor-brackets absolute inset-0"
					viewBox="0 0 48 48"
					fill="none"
				>
					{(
						[
							[6, 6, 14, 6, 14, 10, 10, 10, 10, 14, 6, 14],
							[42, 6, 34, 6, 34, 10, 38, 10, 38, 14, 42, 14],
							[6, 42, 6, 34, 10, 34, 10, 38, 14, 38, 14, 42],
							[42, 42, 42, 34, 38, 34, 38, 38, 34, 38, 34, 42],
						] as const
					).map((points, i) => (
						<polyline
							key={i}
							points={points.join(" ")}
							stroke={OUTER}
							strokeWidth="1.25"
							fill="none"
							className="ship-cursor-bracket-pulse"
						/>
					))}
				</svg>

				<div className="ship-cursor-chevrons">
					<span
						ref={(el) => {
							chevronRefs.current.left = el;
						}}
						className="absolute top-1/2 left-0 -translate-y-1/2 font-mono text-[8px] text-[#8ec8ff]"
					>
						‹
					</span>
					<span
						ref={(el) => {
							chevronRefs.current.right = el;
						}}
						className="absolute top-1/2 right-0 -translate-y-1/2 font-mono text-[8px] text-[#8ec8ff]"
					>
						›
					</span>
					<span
						ref={(el) => {
							chevronRefs.current.up = el;
						}}
						className="absolute top-0 left-1/2 -translate-x-1/2 font-mono text-[8px] text-[#8ec8ff]"
					>
						˄
					</span>
					<span
						ref={(el) => {
							chevronRefs.current.down = el;
						}}
						className="absolute bottom-0 left-1/2 -translate-x-1/2 font-mono text-[8px] text-[#8ec8ff]"
					>
						˅
					</span>
				</div>

				<svg
					className="ship-cursor-core absolute inset-0"
					viewBox="0 0 48 48"
					fill="none"
				>
					<g className="ship-cursor-terminal-only" style={{ display: "none" }}>
						<rect
							x="22"
							y="14"
							width="4"
							height="20"
							fill={INNER}
							fillOpacity="0.9"
							className="ship-cursor-blink"
						/>
						<rect
							x="16"
							y="22"
							width="16"
							height="4"
							stroke={OUTER}
							strokeWidth="0.75"
							fill="none"
						/>
					</g>
					<g className="ship-cursor-default-only">
						<circle
							cx="24"
							cy="24"
							r="2.5"
							fill={INNER}
							className="ship-cursor-core-glow"
						/>
						<line
							x1="24"
							y1="16"
							x2="24"
							y2="20"
							stroke={INNER}
							strokeWidth="1"
							strokeOpacity="0.8"
						/>
						<line
							x1="24"
							y1="28"
							x2="24"
							y2="32"
							stroke={INNER}
							strokeWidth="1"
							strokeOpacity="0.8"
						/>
						<line
							x1="16"
							y1="24"
							x2="20"
							y2="24"
							stroke={INNER}
							strokeWidth="1"
							strokeOpacity="0.8"
						/>
						<line
							x1="28"
							y1="24"
							x2="32"
							y2="24"
							stroke={INNER}
							strokeWidth="1"
							strokeOpacity="0.8"
						/>
						<polygon
							points="24,18 26,22 22,22"
							stroke={OUTER}
							strokeWidth="0.75"
							fill="none"
							strokeOpacity="0.6"
						/>
						<polygon
							points="24,30 26,26 22,26"
							stroke={OUTER}
							strokeWidth="0.75"
							fill="none"
							strokeOpacity="0.6"
						/>
					</g>
				</svg>
			</div>

			<div
				className="absolute mt-3 ml-2 font-mono text-[9px] leading-tight tracking-wider whitespace-nowrap"
				style={{ color: "rgba(142, 200, 255, 0.75)" }}
			>
				<div ref={stateLabelRef} className="text-[#ffd4a8]/90">
					SCAN
				</div>
				<div ref={coordsHudRef} className="mt-0.5 text-[#8ec8ff]/55">
					X --- · Y ---
				</div>
			</div>
		</div>
	);
}
