import { useEffect, useRef, type RefObject } from "react";
import type { GalaxyLink } from "../../data/links";
import {
	linkRadiusCells,
	type ProjectedLink,
	projectLinks,
} from "../../lib/ascii-projector";
import { prefersReducedMotion } from "../../lib/input-device";
import { canDismissZoomLock, zoomFocusState } from "../../lib/zoom-focus-state";
import { useNavStore } from "../../store/nav-store";

const OPACITY_LERP = 0.09;

function isFocusLockedView() {
	const focusedId = useNavStore.getState().focusedLinkId;
	if (!focusedId) return false;
	const phase = zoomFocusState.phase;
	return phase === "entering" || phase === "active";
}

interface SmoothedLink {
	opacity: number;
}

interface GalaxyLinkLabelsProps {
	links: GalaxyLink[];
	projectedRef?: RefObject<ProjectedLink[]>;
	active?: boolean;
}

export function GalaxyLinkLabels({
	links,
	projectedRef,
	active = true,
}: GalaxyLinkLabelsProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const markerRefs = useRef(new Map<string, HTMLDivElement>());
	const smoothRef = useRef(new Map<string, SmoothedLink>());
	const setHovered = useNavStore((s) => s.setHovered);
	const setFocusedLink = useNavStore((s) => s.setFocusedLink);

	useEffect(() => {
		if (!active) {
			for (const el of markerRefs.current.values()) {
				el.style.visibility = "hidden";
				el.style.pointerEvents = "none";
				el.style.opacity = "0";
			}
			return;
		}

		const container = containerRef.current;
		if (!container) return;

		let raf = 0;

		function frame() {
			const width = container.clientWidth;
			const height = container.clientHeight;
			if (width <= 0 || height <= 0) {
				raf = requestAnimationFrame(frame);
				return;
			}

			const focusedLinkId = useNavStore.getState().focusedLinkId;
			const zoomLocked = isFocusLockedView();
			const snap = prefersReducedMotion();

			const projected =
				projectedRef?.current && projectedRef.current.length > 0
					? projectedRef.current
					: projectLinks(links, width, height);
			const projectedIds = new Set(projected.map((p) => p.id));

			for (const link of links) {
				const el = markerRefs.current.get(link.id);
				if (!el) continue;

				const match = projected.find((p) => p.id === link.id);
				if (!match) {
					el.style.visibility = "hidden";
					el.style.pointerEvents = "none";
					continue;
				}

				const isFocused = focusedLinkId === link.id;
				const targetOpacity = zoomLocked ? 0 : isFocused ? 1 : match.opacity;

				let smooth = smoothRef.current.get(link.id);
				if (!smooth) {
					smooth = { opacity: targetOpacity };
					smoothRef.current.set(link.id, smooth);
				}

				if (snap) {
					smooth.opacity = targetOpacity;
				} else {
					smooth.opacity += (targetOpacity - smooth.opacity) * OPACITY_LERP;
					if (Math.abs(smooth.opacity - targetOpacity) < 0.008) {
						smooth.opacity = targetOpacity;
					}
				}

				const shown = smooth.opacity;
				el.style.visibility = shown < 0.02 ? "hidden" : "visible";
				el.style.opacity = String(shown);
				el.style.pointerEvents = !zoomLocked && shown > 0.35 ? "auto" : "none";
				el.style.transform = `translate(${match.screenX}px, ${match.screenY}px)`;

				const marker = el.querySelector<HTMLElement>("[data-link-marker]");
				if (marker) {
					const size =
						8 *
						linkRadiusCells(match.worldZ, isFocused) *
						(0.55 + shown * 0.12);
					marker.style.width = `${size}px`;
					marker.style.height = `${size}px`;
				}
			}

			for (const id of smoothRef.current.keys()) {
				if (!projectedIds.has(id)) {
					const el = markerRefs.current.get(id);
					if (el) {
						el.style.visibility = "hidden";
						el.style.pointerEvents = "none";
					}
				}
			}

			raf = requestAnimationFrame(frame);
		}

		raf = requestAnimationFrame(frame);
		return () => cancelAnimationFrame(raf);
	}, [active, links, projectedRef]);

	function selectLink(link: GalaxyLink) {
		const current = useNavStore.getState().focusedLinkId;
		if (current === link.id) {
			if (!canDismissZoomLock()) return;
			setFocusedLink(null);
			return;
		}
		setFocusedLink(link.id);
	}

	return (
		<div
			ref={containerRef}
			className="pointer-events-none absolute inset-0 overflow-hidden"
		>
			{links.map((link) => (
				<div
					key={link.id}
					ref={(el) => {
						if (el) markerRefs.current.set(link.id, el);
						else markerRefs.current.delete(link.id);
					}}
					className="absolute top-0 left-0 will-change-transform"
					style={{ visibility: "hidden", opacity: 0 }}
				>
					<button
						type="button"
						data-ship-cursor="star"
						className="group flex items-start gap-1.5 border-0 bg-transparent p-0 text-left"
						onPointerEnter={() => setHovered(link.id)}
						onPointerLeave={() => setHovered(null)}
						onClick={(e) => {
							e.stopPropagation();
							selectLink(link);
						}}
					>
						<span
							data-link-marker
							aria-hidden
							className="mt-0.5 inline-block shrink-0 rounded-full border border-white/80 bg-white/90 shadow-[0_0_8px_rgba(255,255,255,0.65)]"
							style={{ width: 8, height: 8 }}
						/>
						<span
							className="rounded-sm border border-white/25 bg-black/90 px-1.5 py-0.5 font-mono text-[11px] leading-tight tracking-wide whitespace-nowrap text-white group-hover:border-white/50"
							style={{
								textShadow: "0 0 8px rgba(0,0,0,0.95)",
							}}
						>
							{link.label}
						</span>
					</button>
				</div>
			))}
		</div>
	);
}

export function findNearestLinkAt(
	projectedLinks: ProjectedLink[],
	x: number,
	y: number,
	threshold = 32,
): string | null {
	let best: { id: string; dist: number } | null = null;

	for (const p of projectedLinks) {
		if (p.opacity < 0.25) continue;
		const dist = Math.hypot(p.screenX - x, p.screenY - y);
		if (dist > threshold) continue;
		if (!best || dist < best.dist) best = { id: p.id, dist };
	}

	return best?.id ?? null;
}
