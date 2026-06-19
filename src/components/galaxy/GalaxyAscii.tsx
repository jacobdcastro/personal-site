import { useEffect, useRef } from "react";
import type { GalaxyLink } from "../../data/links";
import { useGalaxyInput } from "../../hooks/useGalaxyInput";
import {
	ASCII_FONT,
	ASCII_FONT_SIZE,
	measureAsciiGrid,
	type ProjectedLink,
	projectLinks,
	projectToAscii,
} from "../../lib/ascii-projector";
import { cursorPos, galaxyCoordsRef } from "../../lib/cursor-motion";
import { galaxySim } from "../../lib/galaxy-simulation";
import { canDismissZoomLock } from "../../lib/zoom-focus-state";
import { useNavStore } from "../../store/nav-store";
import { findNearestLinkAt, GalaxyLinkLabels } from "./GalaxyLinkLabels";
import { pointerToGalaxyPlaneFromMatrix } from "./galaxy-math";

const IDLE_ASCII_MS = 48;

interface GalaxyAsciiProps {
	links: GalaxyLink[];
	active: boolean;
}

export function GalaxyAscii({ links, active }: GalaxyAsciiProps) {
	const isDragging = useRef(false);
	const velocity = useRef({ x: 0, y: 0 });
	const preRef = useRef<HTMLPreElement>(null);
	const projectedRef = useRef<ProjectedLink[]>([]);
	const tapDownRef = useRef<{ x: number; y: number; t: number } | null>(null);
	const tapMovedRef = useRef(0);
	const lastCoordsRef = useRef<{ x: number; y: number } | null>(null);
	const gridOffsetRef = useRef({ offsetX: 0, offsetY: 0 });
	const lastAsciiRender = useRef(0);
	const cachedGridRef = useRef<ReturnType<typeof measureAsciiGrid> | null>(
		null,
	);
	const cachedGridSize = useRef({ width: 0, height: 0 });

	const setFocusedLink = useNavStore((s) => s.setFocusedLink);

	const { containerRef, handlers, dragMoved } = useGalaxyInput({
		isDragging,
		velocity,
	});

	useEffect(() => {
		if (!active) return;

		const el = containerRef.current;
		if (!el) return;

		let raf = 0;
		let lastTime = performance.now();

		function frame(now: number) {
			const delta = Math.min(0.05, (now - lastTime) / 1000);
			lastTime = now;

			const width = el.clientWidth;
			const height = el.clientHeight;
			if (width > 0 && height > 0) {
				const focusedLinkId = useNavStore.getState().focusedLinkId;
				const dragging = isDragging.current;
				const vel = velocity.current;
				const hasVelocity =
					Math.abs(vel.x) > 1e-4 || Math.abs(vel.y) > 1e-4;
				const interacting =
					dragging || hasVelocity || !!focusedLinkId;

				galaxySim.tick(delta, {
					isDragging: dragging,
					velocity: vel,
					focusedLinkId,
					links,
					width,
					height,
				});

				const shouldRasterize =
					interacting || now - lastAsciiRender.current >= IDLE_ASCII_MS;

				if (shouldRasterize) {
					lastAsciiRender.current = now;

					if (
						!cachedGridRef.current ||
						cachedGridSize.current.width !== width ||
						cachedGridSize.current.height !== height
					) {
						cachedGridRef.current = measureAsciiGrid(width, height);
						cachedGridSize.current = { width, height };
					}

					const grid = cachedGridRef.current;
					const { text, projectedLinks: projected } = projectToAscii(
						links,
						width,
						height,
						grid,
					);

					projectedRef.current = projected;
					gridOffsetRef.current = {
						offsetX: grid.offsetX,
						offsetY: grid.offsetY,
					};

					if (preRef.current && preRef.current.textContent !== text) {
						preRef.current.textContent = text;
					}
					if (preRef.current) {
						preRef.current.style.left = `${grid.offsetX}px`;
						preRef.current.style.top = `${grid.offsetY}px`;
					}
				}

				if (cursorPos.active) {
					const groupMatrix = galaxySim.getGroupMatrix();
					const coords = pointerToGalaxyPlaneFromMatrix(
						cursorPos.x,
						cursorPos.y,
						el,
						galaxySim.camera,
						groupMatrix,
					);

					if (!coords) {
						if (lastCoordsRef.current !== null) {
							lastCoordsRef.current = null;
							galaxyCoordsRef.current = null;
						}
					} else {
						const prev = lastCoordsRef.current;
						if (
							!prev ||
							Math.abs(prev.x - coords.x) > 0.001 ||
							Math.abs(prev.y - coords.y) > 0.001
						) {
							lastCoordsRef.current = coords;
							galaxyCoordsRef.current = coords;
						}
					}
				} else if (lastCoordsRef.current !== null) {
					lastCoordsRef.current = null;
					galaxyCoordsRef.current = null;
				}
			}

			raf = requestAnimationFrame(frame);
		}

		raf = requestAnimationFrame(frame);
		return () => {
			cancelAnimationFrame(raf);
			galaxyCoordsRef.current = null;
		};
	}, [active, links, containerRef]);

	function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
		if (!handlers.onPointerDown(e)) return;
		tapDownRef.current = { x: e.clientX, y: e.clientY, t: performance.now() };
		tapMovedRef.current = 0;
	}

	function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
		if (!tapDownRef.current) return;
		const dx = e.clientX - tapDownRef.current.x;
		const dy = e.clientY - tapDownRef.current.y;
		tapMovedRef.current = Math.hypot(dx, dy);
	}

	function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
		const hadTap = !!tapDownRef.current;
		const tapStart = tapDownRef.current;
		handlers.onPointerUp(e);

		if (!hadTap || !tapStart) return;
		const elapsed = performance.now() - tapStart.t;
		const moved = tapMovedRef.current;
		tapDownRef.current = null;

		if (moved >= 5 || elapsed >= 250 || dragMoved.current >= 5) return;

		const el = containerRef.current;
		if (!el) return;

		const projected =
			projectedRef.current.length > 0
				? projectedRef.current
				: projectLinks(links, el.clientWidth, el.clientHeight);

		const nearest = findNearestLinkAt(projected, e.clientX, e.clientY);
		if (!nearest) return;

		const current = useNavStore.getState().focusedLinkId;
		if (current === nearest) {
			if (canDismissZoomLock()) setFocusedLink(null);
		} else {
			setFocusedLink(nearest);
		}
	}

	return (
		<div
			ref={containerRef}
			className="relative h-full w-full touch-none overflow-hidden bg-black"
			onPointerDown={handlePointerDown}
			onPointerMove={handlePointerMove}
			onPointerUp={handlePointerUp}
			onPointerCancel={handlers.onPointerCancel}
		>
			<pre
				ref={preRef}
				className="absolute select-none whitespace-pre font-mono text-white/80"
				style={{
					fontFamily: ASCII_FONT,
					fontSize: ASCII_FONT_SIZE,
					lineHeight: 1,
					left: 0,
					top: 0,
				}}
				aria-hidden
			>
				{" "}
			</pre>
			<GalaxyLinkLabels links={links} projectedRef={projectedRef} active={active} />
		</div>
	);
}
