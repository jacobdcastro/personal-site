import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { AdditiveBlending, type Mesh, type MeshBasicMaterial, Vector3 } from "three";
import type { GalaxyLink } from "../../data/links";
import {
	canDismissZoomLock,
	focusedStarWorld,
	focusedStarWorldValid,
	zoomFocusState,
} from "../../lib/zoom-focus-state";
import { useNavStore } from "../../store/nav-store";
import { colorAtRadius, hashOffset, spiralPosition } from "./galaxy-math";

// stars facing the camera (world-Z > 0) get opacity 1; behind the galaxy fade to 0
const FACE_SCALE = 3;
// drei Html (default mode): higher distanceFactor = larger on screen
const LABEL_DISTANCE_FACTOR = 10;
const LABEL_OPACITY_LERP = 0.09;

function isFocusLockedView() {
	const focusedId = useNavStore.getState().focusedLinkId;
	if (!focusedId) return false;
	const phase = zoomFocusState.phase;
	return phase === "entering" || phase === "active";
}

interface LinkStarProps {
	link: GalaxyLink;
}

function LinkStar({ link }: LinkStarProps) {
	const meshRef = useRef<Mesh>(null);
	const labelRef = useRef<HTMLDivElement>(null);
	const setHovered = useNavStore((s) => s.setHovered);
	const setFocusedLink = useNavStore((s) => s.setFocusedLink);
	const isFocused = useNavStore((s) => s.focusedLinkId === link.id);

	const position = useMemo(
		() => spiralPosition(link.radius, link.branch, { scatter: 0.6, offset: hashOffset(link.id) }),
		[link.branch, link.id, link.radius],
	);

	const starColor = useMemo(() => colorAtRadius(link.radius), [link.radius]);

	// tap-vs-drag tracking — all refs, never state
	const downRef = useRef<{ x: number; y: number; t: number } | null>(null);
	const movedRef = useRef(0);

	const tmpVec = useRef(new Vector3());
	const labelOpacity = useRef(0);

	useFrame(() => {
		const mesh = meshRef.current;
		if (!mesh) return;

		mesh.getWorldPosition(tmpVec.current);
		const worldZ = tmpVec.current.z;
		const isFocused = useNavStore.getState().focusedLinkId === link.id;

		// opacity is a continuous function of the star's world-Z position
		const faceOpacity = Math.max(0, Math.min(1, (worldZ + 1) / FACE_SCALE));
		const opacity = isFocused ? 1 : faceOpacity;

		const mat = mesh.material as MeshBasicMaterial;
		// link stars are slightly brighter than dust, but same hue — not a different color family
		mat.opacity = 0.35 + opacity * 0.65;

		// subtle scale bump when facing the viewer
		const scale = 1 + opacity * 0.35;
		mesh.scale.setScalar(scale);

		if (labelRef.current) {
			const zoomLocked = isFocusLockedView();
			const targetOpacity = zoomLocked ? 0 : opacity;
			const snap = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

			if (snap) {
				labelOpacity.current = targetOpacity;
			} else {
				labelOpacity.current +=
					(targetOpacity - labelOpacity.current) * LABEL_OPACITY_LERP;
				if (Math.abs(labelOpacity.current - targetOpacity) < 0.008) {
					labelOpacity.current = targetOpacity;
				}
			}

			const shown = labelOpacity.current;
			labelRef.current.style.opacity = String(shown);
			labelRef.current.style.visibility = shown < 0.02 ? "hidden" : "visible";
			labelRef.current.style.pointerEvents =
				!zoomLocked && shown > 0.35 ? "auto" : "none";
		}

		if (isFocused) {
			mesh.getWorldPosition(focusedStarWorld);
			focusedStarWorldValid.current = true;
		}
	});

	function handlePointerDown(e: { nativeEvent: PointerEvent }) {
		downRef.current = {
			x: e.nativeEvent.clientX,
			y: e.nativeEvent.clientY,
			t: performance.now(),
		};
		movedRef.current = 0;
		e.nativeEvent.stopPropagation?.();
	}

	function handlePointerMove(e: { nativeEvent: PointerEvent }) {
		if (!downRef.current) return;
		const dx = e.nativeEvent.clientX - downRef.current.x;
		const dy = e.nativeEvent.clientY - downRef.current.y;
		movedRef.current = Math.sqrt(dx * dx + dy * dy);
	}

	function selectLink() {
		const current = useNavStore.getState().focusedLinkId;
		if (current === link.id) {
			if (!canDismissZoomLock()) return;
			setFocusedLink(null);
			return;
		}
		setFocusedLink(link.id);
	}

	function handlePointerUp(e: { nativeEvent: PointerEvent }) {
		if (!downRef.current) return;
		const elapsed = performance.now() - downRef.current.t;
		const moved = movedRef.current;
		downRef.current = null;

		// only treat as a tap if the pointer barely moved and was quick
		if (moved < 5 && elapsed < 250) {
			e.nativeEvent.stopPropagation?.();
			selectLink();
		}
	}

	return (
		<mesh
			ref={meshRef}
			position={position}
			onPointerDown={handlePointerDown}
			onPointerMove={handlePointerMove}
			onPointerUp={handlePointerUp}
			onPointerOver={() => setHovered(link.id)}
			onPointerOut={() => setHovered(null)}
		>
			<sphereGeometry args={[0.018, 8, 8]} />
			<meshBasicMaterial
				color={starColor}
				transparent
				opacity={0.85}
				blending={AdditiveBlending}
				depthWrite={false}
			/>

			<Html distanceFactor={LABEL_DISTANCE_FACTOR} center={false} style={{ pointerEvents: "none" }}>
				<div
					ref={labelRef}
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
						onPointerEnter={() => setHovered(link.id)}
						onPointerLeave={() => setHovered(null)}
						onPointerDown={(e) => e.stopPropagation()}
						onClick={(e) => {
							e.stopPropagation();
							if (movedRef.current > 5) return;
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
							{link.label}
						</span>
					</button>
				</div>
			</Html>
		</mesh>
	);
}

interface LinkStarsProps {
	links: GalaxyLink[];
}

export function LinkStars({ links }: LinkStarsProps) {
	return (
		<>
			{links.map((link) => (
				<LinkStar key={link.id} link={link} />
			))}
		</>
	);
}
