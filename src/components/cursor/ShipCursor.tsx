import { useEffect, useRef, useState } from "react";
import { formatGalaxyCoords } from "../galaxy/galaxy-math";
import {
	cursorPos,
	cursorVelocity,
	galaxyCoordsRef,
} from "../../lib/cursor-motion";
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
const TERMINAL_CHECK_MS = 80;
const TERMINAL_CHECK_PX = 16;

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
	const isDragging = useNavStore((s) => s.isDragging);
	const hoveredId = useNavStore((s) => s.hoveredId);
	const focusedLinkId = useNavStore((s) => s.focusedLinkId);

	const [visible, setVisible] = useState(false);
	const [isTerminal, setIsTerminal] = useState(false);
	const [reducedMotion, setReducedMotion] = useState(false);

	const cursorRef = useRef<HTMLDivElement>(null);
	const coordsHudRef = useRef<HTMLDivElement>(null);
	const lastPos = useRef({ x: 0, y: 0 });
	const lastDrag = useRef(isDragging);
	const wobbleRef = useRef(0);
	const visibleRef = useRef(false);
	const isTerminalRef = useRef(false);
	const reducedMotionRef = useRef(false);
	const lastTerminalCheck = useRef({ t: 0, x: 0, y: 0 });
	const lastHudCoords = useRef("");

	const state = resolveState(
		isTerminal,
		isDragging,
		focusedLinkId,
		hoveredId,
	);

	useEffect(() => {
		visibleRef.current = visible;
	}, [visible]);

	useEffect(() => {
		isTerminalRef.current = isTerminal;
	}, [isTerminal]);

	useEffect(() => {
		reducedMotionRef.current = reducedMotion;
	}, [reducedMotion]);

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
		if (mode !== "3d") return;

		document.body.classList.add("ship-cursor-active");
		return () => document.body.classList.remove("ship-cursor-active");
	}, [mode]);

	useEffect(() => {
		if (mode !== "3d") return;

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
			const terminal = !!target?.closest('[data-ship-cursor="terminal"]');
			if (terminal !== isTerminalRef.current) {
				isTerminalRef.current = terminal;
				setIsTerminal(terminal);
			}
		}

		function handleMove(e: PointerEvent) {
			const dx = e.clientX - lastPos.current.x;
			const dy = e.clientY - lastPos.current.y;
			cursorVelocity.x = dx;
			cursorVelocity.y = dy;
			lastPos.current = { x: e.clientX, y: e.clientY };

			cursorPos.x = e.clientX;
			cursorPos.y = e.clientY;
			cursorPos.active = true;

			if (!visibleRef.current) {
				visibleRef.current = true;
				setVisible(true);
			}

			maybeCheckTerminal(e.clientX, e.clientY);
		}

		function handleLeave() {
			cursorPos.active = false;
			visibleRef.current = false;
			setVisible(false);
		}

		window.addEventListener("pointermove", handleMove, { passive: true });
		document.documentElement.addEventListener("pointerleave", handleLeave);
		return () => {
			window.removeEventListener("pointermove", handleMove);
			document.documentElement.removeEventListener("pointerleave", handleLeave);
		};
	}, [mode]);

	// wobble when releasing a fast drag
	useEffect(() => {
		if (lastDrag.current && !isDragging) {
			const speed = Math.hypot(cursorVelocity.x, cursorVelocity.y);
			if (speed > 4 && !reducedMotionRef.current) {
				wobbleRef.current = speed * 0.4;
			}
		}
		lastDrag.current = isDragging;
	}, [isDragging]);

	// position + HUD coords via direct DOM — bypasses React on every move
	useEffect(() => {
		if (mode !== "3d") return;

		let frameId = 0;
		function tick() {
			const el = cursorRef.current;
			if (el && visibleRef.current) {
				const wobble = wobbleRef.current;
				el.style.transform = `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0) rotate(${wobble * 0.6}deg)`;
				if (wobble > 0.05) {
					wobbleRef.current = wobble * 0.82;
				} else {
					wobbleRef.current = 0;
				}
			}

			const hud = coordsHudRef.current;
			if (hud) {
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

	if (mode !== "3d" || !visible) return null;

	const chevronOpacity =
		state === "grip"
			? Math.min(1, Math.hypot(cursorVelocity.x, cursorVelocity.y) / 6)
			: 0;
	const ringSpin = state === "scan" && !reducedMotion;
	const bracketScale = state === "acquire" ? 1 : state === "lock" ? 1.08 : 0.72;
	const bracketOpacity =
		state === "acquire" ? 1 : state === "lock" ? 1 : 0;
	const coreScale =
		state === "terminal" ? 0.6 : state === "grip" ? 1.15 : state === "lock" ? 1.1 : 1;
	const ringOpacity = state === "terminal" ? 0.35 : state === "grip" ? 0.9 : 0.65;
	const pulse = state === "lock" && !reducedMotion;

	return (
		<div
			ref={cursorRef}
			className="ship-cursor pointer-events-none fixed top-0 left-0 z-[100]"
			style={{ willChange: "transform" }}
			aria-hidden
		>
			<div
				className="absolute -translate-x-1/2 -translate-y-1/2"
				style={{ width: 48, height: 48 }}
			>
				{/* sonar ping — scan only */}
				{state === "scan" && !reducedMotion && (
					<div className="ship-cursor-ping absolute inset-0 rounded-full border border-[#8ec8ff]/30" />
				)}

				{/* outer attitude ring */}
				<svg
					className={`absolute inset-0${ringSpin ? " ship-cursor-ring-spin" : ""}`}
					viewBox="0 0 48 48"
					fill="none"
					style={{
						opacity: ringOpacity,
						transition: "opacity 0.2s",
					}}
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

				{/* lock / acquire brackets */}
				<svg
					className="absolute inset-0"
					viewBox="0 0 48 48"
					fill="none"
					style={{
						opacity: bracketOpacity,
						transform: `scale(${bracketScale})`,
						transition: "opacity 0.15s, transform 0.2s ease-out",
					}}
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
							stroke={state === "lock" ? INNER : OUTER}
							strokeWidth="1.25"
							fill="none"
							className={pulse ? "ship-cursor-bracket-pulse" : undefined}
						/>
					))}
				</svg>

				{/* grip chevrons */}
				{state === "grip" && (
					<>
						<span
							className="absolute top-1/2 left-0 -translate-y-1/2 font-mono text-[8px] text-[#8ec8ff]"
							style={{ opacity: chevronOpacity * (cursorVelocity.x < -0.5 ? 1 : 0.2) }}
						>
							‹
						</span>
						<span
							className="absolute top-1/2 right-0 -translate-y-1/2 font-mono text-[8px] text-[#8ec8ff]"
							style={{ opacity: chevronOpacity * (cursorVelocity.x > 0.5 ? 1 : 0.2) }}
						>
							›
						</span>
						<span
							className="absolute top-0 left-1/2 -translate-x-1/2 font-mono text-[8px] text-[#8ec8ff]"
							style={{ opacity: chevronOpacity * (cursorVelocity.y < -0.5 ? 1 : 0.2) }}
						>
							˄
						</span>
						<span
							className="absolute bottom-0 left-1/2 -translate-x-1/2 font-mono text-[8px] text-[#8ec8ff]"
							style={{ opacity: chevronOpacity * (cursorVelocity.y > 0.5 ? 1 : 0.2) }}
						>
							˅
						</span>
					</>
				)}

				{/* center reticle */}
				<svg
					className="absolute inset-0"
					viewBox="0 0 48 48"
					fill="none"
					style={{
						transform: `scale(${coreScale})`,
						transition: "transform 0.15s ease-out",
					}}
				>
					{state === "terminal" ? (
						<>
							<rect
								x="22"
								y="14"
								width="4"
								height="20"
								fill={INNER}
								fillOpacity="0.9"
								className="ship-cursor-blink"
							/>
							<rect x="16" y="22" width="16" height="4" stroke={OUTER} strokeWidth="0.75" fill="none" />
						</>
					) : (
						<>
							<circle cx="24" cy="24" r="2.5" fill={INNER} className="ship-cursor-core-glow" />
							<line x1="24" y1="16" x2="24" y2="20" stroke={INNER} strokeWidth="1" strokeOpacity="0.8" />
							<line x1="24" y1="28" x2="24" y2="32" stroke={INNER} strokeWidth="1" strokeOpacity="0.8" />
							<line x1="16" y1="24" x2="20" y2="24" stroke={INNER} strokeWidth="1" strokeOpacity="0.8" />
							<line x1="28" y1="24" x2="32" y2="24" stroke={INNER} strokeWidth="1" strokeOpacity="0.8" />
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
						</>
					)}
				</svg>
			</div>

			{/* HUD readout */}
			<div
				className="absolute mt-3 ml-2 font-mono text-[9px] leading-tight tracking-wider whitespace-nowrap"
				style={{ color: "rgba(142, 200, 255, 0.75)" }}
			>
				<div className="text-[#ffd4a8]/90">{STATE_LABEL[state]}</div>
				{state !== "terminal" && (
					<div ref={coordsHudRef} className="mt-0.5 text-[#8ec8ff]/55">
						X --- · Y ---
					</div>
				)}
			</div>
		</div>
	);
}
