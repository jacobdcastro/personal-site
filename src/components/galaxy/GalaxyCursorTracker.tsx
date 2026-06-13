import { useFrame, useThree } from "@react-three/fiber";
import { type RefObject, useEffect, useRef } from "react";
import type { Group } from "three";
import { galaxyCoordsRef } from "../../lib/cursor-motion";
import { pointerToGalaxyPlane } from "./galaxy-math";

export interface GalaxyPointer {
	clientX: number;
	clientY: number;
	active: boolean;
}

interface GalaxyCursorTrackerProps {
	groupRef: RefObject<Group | null>;
	pointerRef: RefObject<GalaxyPointer>;
}

export function GalaxyCursorTracker({
	groupRef,
	pointerRef,
}: GalaxyCursorTrackerProps) {
	const { camera, gl } = useThree();
	const lastCoords = useRef<{ x: number; y: number } | null>(null);

	useEffect(() => {
		return () => {
			galaxyCoordsRef.current = null;
		};
	}, []);

	useFrame(() => {
		const pointer = pointerRef.current;
		const group = groupRef.current;

		if (!pointer?.active || !group) {
			if (lastCoords.current !== null) {
				lastCoords.current = null;
				galaxyCoordsRef.current = null;
			}
			return;
		}

		const coords = pointerToGalaxyPlane(
			pointer.clientX,
			pointer.clientY,
			gl.domElement,
			camera,
			group,
		);

		if (!coords) {
			if (lastCoords.current !== null) {
				lastCoords.current = null;
				galaxyCoordsRef.current = null;
			}
			return;
		}

		const prev = lastCoords.current;
		if (
			!prev ||
			Math.abs(prev.x - coords.x) > 0.001 ||
			Math.abs(prev.y - coords.y) > 0.001
		) {
			lastCoords.current = coords;
			galaxyCoordsRef.current = coords;
		}
	});

	return null;
}
