import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { type PointerEvent, useEffect, useRef } from "react";
import type { Group } from "three";
import type { GalaxyLink } from "../../data/links";
import { canDismissZoomLock, zoomFocusState } from "../../lib/zoom-focus-state";
import { useNavStore } from "../../store/nav-store";
import { GalaxyDust } from "./GalaxyDust";
import { FocusZoom } from "./FocusZoom";
import {
	type GalaxyPointer,
	GalaxyCursorTracker,
} from "./GalaxyCursorTracker";
import { LinkStars } from "./LinkStars";
import {
	DEFAULT_VIEW_TILT,
	hashOffset,
	rotationToFaceCamera,
	spiralPosition,
} from "./galaxy-math";

const IDLE_SPEED = 0.04;
const INERTIA_DECAY = 0.92;
const DRAG_SENSITIVITY = 0.004;
const WHEEL_SENSITIVITY = 0.004;
const X_ROTATION_CLAMP = Math.PI / 3;

interface SceneProps {
	galaxyGroupRef: React.RefObject<Group | null>;
	isDragging: React.MutableRefObject<boolean>;
	velocity: React.MutableRefObject<{ x: number; y: number }>;
	links: GalaxyLink[];
}

function isFocusLocked() {
	return !!useNavStore.getState().focusedLinkId;
}

function GalaxyScene({ galaxyGroupRef, isDragging, velocity, links }: SceneProps) {
	const focusedLinkId = useNavStore((s) => s.focusedLinkId);
	const focusRotFrom = useRef({ x: 0, y: 0 });
	const focusRotTo = useRef({ x: 0, y: 0 });
	const focusLocalPos = useRef<[number, number, number] | null>(null);

	useEffect(() => {
		if (!focusedLinkId) {
			focusLocalPos.current = null;
			return;
		}

		const link = links.find((l) => l.id === focusedLinkId);
		if (!link) return;

		const position = spiralPosition(link.radius, link.branch, {
			scatter: 0.6,
			offset: hashOffset(link.id),
		});
		const target = rotationToFaceCamera(position);
		const g = galaxyGroupRef.current;

		focusLocalPos.current = position;
		focusRotTo.current = { x: target.x, y: target.y };

		if (g) {
			focusRotFrom.current = { x: g.rotation.x, y: g.rotation.y };
		}
	}, [focusedLinkId, links, galaxyGroupRef]);

	useFrame((_, delta) => {
		const g = galaxyGroupRef.current;
		if (!g) return;

		if (focusedLinkId && focusLocalPos.current) {
			const eased = zoomFocusState.eased;
			const entering = zoomFocusState.phase === "entering";

			if (entering) {
				g.rotation.x =
					focusRotFrom.current.x +
					(focusRotTo.current.x - focusRotFrom.current.x) * eased;
				g.rotation.y =
					focusRotFrom.current.y +
					(focusRotTo.current.y - focusRotFrom.current.y) * eased;
			} else {
				g.rotation.x = focusRotTo.current.x;
				g.rotation.y = focusRotTo.current.y;
			}
			return;
		}

		if (zoomFocusState.phase === "leaving") {
			g.rotation.x = focusRotTo.current.x;
			g.rotation.y = focusRotTo.current.y;
			return;
		}

		if (isDragging.current) {
			g.rotation.x += velocity.current.x;
			g.rotation.y += velocity.current.y;
		} else {
			velocity.current.x *= INERTIA_DECAY;
			velocity.current.y *= INERTIA_DECAY;
			g.rotation.x += velocity.current.x;
			g.rotation.y += velocity.current.y;
			g.rotation.y += IDLE_SPEED * delta;
		}

		g.rotation.x = Math.max(
			-X_ROTATION_CLAMP,
			Math.min(X_ROTATION_CLAMP, g.rotation.x),
		);
	}, -1);

	return (
		<group ref={galaxyGroupRef} rotation={[DEFAULT_VIEW_TILT, 0, 0]}>
			<GalaxyDust />
			<LinkStars links={links} />
		</group>
	);
}

interface GalaxyCanvasProps {
	links: GalaxyLink[];
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

export function GalaxyCanvas({ links }: GalaxyCanvasProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const galaxyGroupRef = useRef<Group>(null);
	const pointerRef = useRef<GalaxyPointer>({
		clientX: 0,
		clientY: 0,
		active: false,
	});
	const isDragging = useRef(false);
	const lastPointer = useRef({ x: 0, y: 0 });
	const dragMoved = useRef(0);
	const pointerDownOnCanvas = useRef(false);
	const velocity = useRef({ x: 0, y: 0 });
	const setFocusedLink = useNavStore((s) => s.setFocusedLink);
	const setDragging = useNavStore((s) => s.setDragging);
	const focusedLinkId = useNavStore((s) => s.focusedLinkId);

	useEffect(() => {
		if (!focusedLinkId) velocity.current = { x: 0, y: 0 };
	}, [focusedLinkId]);

	useEffect(() => {
		function handleMove(e: PointerEvent) {
			pointerRef.current = {
				clientX: e.clientX,
				clientY: e.clientY,
				active: true,
			};
		}

		function handleLeave() {
			pointerRef.current.active = false;
		}

		window.addEventListener("pointermove", handleMove);
		document.documentElement.addEventListener("pointerleave", handleLeave);
		return () => {
			window.removeEventListener("pointermove", handleMove);
			document.documentElement.removeEventListener("pointerleave", handleLeave);
		};
	}, []);

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

		el.addEventListener("wheel", handleWheel, { passive: false, capture: true });
		return () =>
			el.removeEventListener("wheel", handleWheel, { capture: true });
	}, [setFocusedLink]);

	function handlePointerDown(e: PointerEvent<HTMLDivElement>) {
		pointerDownOnCanvas.current = true;
		isDragging.current = true;
		setDragging(true);
		dragMoved.current = 0;
		lastPointer.current = { x: e.clientX, y: e.clientY };

		if (!isFocusLocked()) {
			setFocusedLink(null);
			velocity.current = { x: 0, y: 0 };
		}
	}

	function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
		if (!isDragging.current) return;
		const dx = e.clientX - lastPointer.current.x;
		const dy = e.clientY - lastPointer.current.y;
		dragMoved.current += Math.hypot(dx, dy);
		velocity.current.y = dx * DRAG_SENSITIVITY;
		velocity.current.x = dy * DRAG_SENSITIVITY;
		lastPointer.current = { x: e.clientX, y: e.clientY };
	}

	function handlePointerUp() {
		if (
			pointerDownOnCanvas.current &&
			isFocusLocked() &&
			dragMoved.current < 5 &&
			canDismissZoomLock()
		) {
			setFocusedLink(null);
			velocity.current = { x: 0, y: 0 };
		}
		pointerDownOnCanvas.current = false;
		isDragging.current = false;
		setDragging(false);
	}

	return (
		<div
			ref={containerRef}
			className="h-full w-full"
			onPointerDown={handlePointerDown}
			onPointerMove={handlePointerMove}
			onPointerUp={handlePointerUp}
			onPointerLeave={handlePointerUp}
		>
			<Canvas
				camera={{ position: [0, 0, 8.5], fov: 58 }}
				dpr={[1, 2]}
				gl={{ antialias: false }}
			>
				<GalaxyScene
					galaxyGroupRef={galaxyGroupRef}
					isDragging={isDragging}
					velocity={velocity}
					links={links}
				/>
				<FocusZoom
					galaxyGroupRef={galaxyGroupRef}
					isDragging={isDragging}
					velocity={velocity}
					links={links}
				/>
				<GalaxyCursorTracker
					groupRef={galaxyGroupRef}
					pointerRef={pointerRef}
				/>
				<EffectComposer>
					<Bloom luminanceThreshold={0.15} intensity={1.2} mipmapBlur />
				</EffectComposer>
			</Canvas>
		</div>
	);
}
