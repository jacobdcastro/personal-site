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
	const lastCoordsRef = useRef<{ x: number; y: number } | null>(null);
	const gridOffsetRef = useRef({ offsetX: 0, offsetY: 0 });
	const lastAsciiRender = useRef(0);
	const cachedGridRef = useRef<ReturnType<typeof measureAsciiGrid> | null>(
		null,
	);
	const cachedGridSize = useRef({ width: 0, height: 0 });

	const { containerRef, handlers } = useGalaxyInput({
		isDragging,
		velocity,
		resolveTapLink: (x, y) => {
			const el = containerRef.current;
			if (!el) return null;
			const projected =
				projectedRef.current.length > 0
					? projectedRef.current
					: projectLinks(links, el.clientWidth, el.clientHeight);
			return findNearestLinkAt(projected, x, y);
		},
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
		handlers.onPointerDown(e);
	}

	function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
		handlers.onPointerUp(e);
	}

	return (
		<div
			ref={containerRef}
			className="relative h-full w-full touch-none overflow-hidden bg-black"
			onPointerDown={handlePointerDown}
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
