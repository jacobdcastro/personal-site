import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import {
	AdditiveBlending,
	type Mesh,
	type MeshBasicMaterial,
	Vector3,
} from "three";
import type { GalaxyLink } from "../../data/links";
import { getLinkLocalPosition } from "../../lib/galaxy-simulation";
import { prefersReducedMotion } from "../../lib/input-device";
import {
	canDismissZoomLock,
	focusedStarWorld,
	focusedStarWorldValid,
	zoomFocusState,
} from "../../lib/zoom-focus-state";
import { useNavStore } from "../../store/nav-store";
import { colorAtRadius } from "./galaxy-math";

const FACE_SCALE = 3;
const LABEL_DISTANCE_FACTOR = 10;
const LABEL_OPACITY_LERP = 0.09;

function isFocusLockedView() {
	const focusedId = useNavStore.getState().focusedLinkId;
	if (!focusedId) return false;
	const phase = zoomFocusState.phase;
	return phase === "entering" || phase === "active";
}

interface StarEntry {
	link: GalaxyLink;
	mesh: Mesh | null;
	label: HTMLDivElement | null;
	position: [number, number, number];
	starColor: string;
	labelOpacity: number;
	down: { x: number; y: number; t: number } | null;
	moved: number;
}

interface LinkStarProps {
	entry: StarEntry;
	onMeshRef: (mesh: Mesh | null) => void;
	onLabelRef: (label: HTMLDivElement | null) => void;
	isFocused: boolean;
}

function LinkStar({ entry, onMeshRef, onLabelRef, isFocused }: LinkStarProps) {
	const setHovered = useNavStore((s) => s.setHovered);
	const setFocusedLink = useNavStore((s) => s.setFocusedLink);

	function handlePointerDown(e: { nativeEvent: PointerEvent }) {
		entry.down = {
			x: e.nativeEvent.clientX,
			y: e.nativeEvent.clientY,
			t: performance.now(),
		};
		entry.moved = 0;
	}

	function handlePointerMove(e: { nativeEvent: PointerEvent }) {
		if (!entry.down) return;
		const dx = e.nativeEvent.clientX - entry.down.x;
		const dy = e.nativeEvent.clientY - entry.down.y;
		entry.moved = Math.sqrt(dx * dx + dy * dy);
	}

	function selectLink() {
		const current = useNavStore.getState().focusedLinkId;
		if (current === entry.link.id) {
			if (!canDismissZoomLock()) return;
			setFocusedLink(null);
			return;
		}
		setFocusedLink(entry.link.id);
	}

	function handlePointerUp(e: { nativeEvent: PointerEvent }) {
		if (!entry.down) return;
		const elapsed = performance.now() - entry.down.t;
		const moved = entry.moved;
		entry.down = null;

		if (moved < 5 && elapsed < 250) {
			selectLink();
		}
	}

	return (
		<mesh
			ref={onMeshRef}
			position={entry.position}
			onPointerDown={handlePointerDown}
			onPointerMove={handlePointerMove}
			onPointerUp={handlePointerUp}
			onPointerOver={() => setHovered(entry.link.id)}
			onPointerOut={() => setHovered(null)}
		>
			<sphereGeometry args={[0.018, 8, 8]} />
			<meshBasicMaterial
				color={entry.starColor}
				transparent
				opacity={0.85}
				blending={AdditiveBlending}
				depthWrite={false}
			/>

			<Html
				distanceFactor={LABEL_DISTANCE_FACTOR}
				center={false}
				style={{ pointerEvents: "none" }}
			>
				<div
					ref={onLabelRef}
					className="-translate-y-full"
					style={{
						marginLeft: "-0.5px",
						opacity: 0,
						pointerEvents: "none",
					}}
				>
					<button
						type="button"
						data-ship-cursor="star"
						className="group grid border-0 bg-transparent p-0 text-left"
						style={{
							gridTemplateColumns: "1px auto",
							gridTemplateRows: "auto 1.5rem",
						}}
						onPointerEnter={() => setHovered(entry.link.id)}
						onPointerLeave={() => setHovered(null)}
						onPointerDown={(e) => e.stopPropagation()}
						onClick={(e) => {
							e.stopPropagation();
							if (entry.moved > 5) return;
							selectLink();
						}}
					>
						<span
							aria-hidden
							className="col-start-1 row-span-2 row-start-1 w-px bg-white/50 transition-colors group-hover:bg-white/80"
						/>
						<span
							className={`col-start-2 row-start-1 pl-1.5 whitespace-nowrap font-mono text-[11px] leading-none tracking-wide text-white/70 group-hover:text-white${isFocused ? " outline outline-1 outline-offset-2 outline-white/80" : ""}`}
							style={{
								textShadow:
									"0 0 6px rgba(0,0,0,0.95), 0 0 12px rgba(0,0,0,0.7), 0 1px 2px rgba(0,0,0,0.9)",
							}}
						>
							{entry.link.label}
						</span>
					</button>
				</div>
			</Html>
		</mesh>
	);
}

interface LinkStarsProps {
	links: GalaxyLink[];
	active?: boolean;
}

function hideLabels(entries: StarEntry[]) {
	for (const entry of entries) {
		if (!entry.label) continue;
		entry.label.style.visibility = "hidden";
		entry.label.style.pointerEvents = "none";
		entry.label.style.opacity = "0";
	}
}

export function LinkStars({ links, active = true }: LinkStarsProps) {
	const entriesRef = useRef<StarEntry[]>([]);
	const tmpVec = useRef(new Vector3());
	const focusedLinkId = useNavStore((s) => s.focusedLinkId);

	const entries = useMemo(() => {
		const next = links.map((link) => {
			const local = getLinkLocalPosition(link);
			return {
				link,
				mesh: null as Mesh | null,
				label: null as HTMLDivElement | null,
				position: [local.x, local.y, local.z] as [number, number, number],
				starColor: colorAtRadius(link.radius).getStyle(),
				labelOpacity: 0,
				down: null as { x: number; y: number; t: number } | null,
				moved: 0,
			};
		});
		entriesRef.current = next;
		return next;
	}, [links]);

	useEffect(() => {
		if (!active) hideLabels(entriesRef.current);
	}, [active]);

	useFrame(() => {
		if (!active) {
			hideLabels(entriesRef.current);
			return;
		}

		const snap = prefersReducedMotion();
		const zoomLocked = isFocusLockedView();
		const focusedId = useNavStore.getState().focusedLinkId;

		for (const entry of entriesRef.current) {
			const mesh = entry.mesh;
			if (!mesh) continue;

			mesh.getWorldPosition(tmpVec.current);
			const worldZ = tmpVec.current.z;
			const isFocused = focusedId === entry.link.id;

			const faceOpacity = Math.max(0, Math.min(1, (worldZ + 1) / FACE_SCALE));
			const opacity = isFocused ? 1 : faceOpacity;

			const mat = mesh.material as MeshBasicMaterial;
			mat.opacity = 0.35 + opacity * 0.65;

			const scale = 1 + opacity * 0.35;
			mesh.scale.setScalar(scale);

			if (entry.label) {
				const targetOpacity = zoomLocked ? 0 : opacity;

				if (snap) {
					entry.labelOpacity = targetOpacity;
				} else {
					entry.labelOpacity +=
						(targetOpacity - entry.labelOpacity) * LABEL_OPACITY_LERP;
					if (Math.abs(entry.labelOpacity - targetOpacity) < 0.008) {
						entry.labelOpacity = targetOpacity;
					}
				}

				const shown = entry.labelOpacity;
				entry.label.style.opacity = String(shown);
				entry.label.style.visibility = shown < 0.02 ? "hidden" : "visible";
				entry.label.style.pointerEvents =
					!zoomLocked && shown > 0.35 ? "auto" : "none";
			}

			if (isFocused) {
				mesh.getWorldPosition(focusedStarWorld);
				focusedStarWorldValid.current = true;
			}
		}
	});

	return (
		<>
			{entries.map((entry, i) => (
				<LinkStar
					key={entry.link.id}
					entry={entriesRef.current[i] ?? entry}
					isFocused={focusedLinkId === entry.link.id}
					onMeshRef={(mesh) => {
						const target = entriesRef.current[i];
						if (target) target.mesh = mesh;
					}}
					onLabelRef={(label) => {
						const target = entriesRef.current[i];
						if (target) target.label = label;
					}}
				/>
			))}
		</>
	);
}
