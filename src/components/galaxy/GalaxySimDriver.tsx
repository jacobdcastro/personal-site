import { useFrame, useThree } from "@react-three/fiber";
import type { RefObject } from "react";
import type { Group, PerspectiveCamera } from "three";
import type { GalaxyLink } from "../../data/links";
import { galaxySim } from "../../lib/galaxy-simulation";
import { useNavStore } from "../../store/nav-store";
import { GalaxyDust } from "./GalaxyDust";
import { LinkStars } from "./LinkStars";

interface GalaxySimDriverProps {
	galaxyGroupRef: RefObject<Group | null>;
	isDragging: React.MutableRefObject<boolean>;
	velocity: React.MutableRefObject<{ x: number; y: number }>;
	links: GalaxyLink[];
}

export function GalaxySimDriver({
	galaxyGroupRef,
	isDragging,
	velocity,
	links,
}: GalaxySimDriverProps) {
	const { camera, size } = useThree();
	const focusedLinkId = useNavStore((s) => s.focusedLinkId);

	useFrame((_, delta) => {
		galaxySim.tick(delta, {
			isDragging: isDragging.current,
			velocity: velocity.current,
			focusedLinkId,
			links,
			width: size.width,
			height: size.height,
		});

		const g = galaxyGroupRef.current;
		if (g) {
			g.rotation.x = galaxySim.rotation.x;
			g.rotation.y = galaxySim.rotation.y;
			g.updateWorldMatrix(true, false);
		}

		const cam = camera as PerspectiveCamera;
		cam.position.copy(galaxySim.camera.position);
		cam.fov = galaxySim.camera.fov;
		cam.aspect = galaxySim.camera.aspect;
		cam.near = galaxySim.camera.near;
		cam.far = galaxySim.camera.far;
		if (galaxySim.camera.view) {
			const v = galaxySim.camera.view;
			cam.setViewOffset(
				v.fullWidth,
				v.fullHeight,
				v.offsetX,
				v.offsetY,
				v.width,
				v.height,
			);
		} else {
			cam.clearViewOffset();
		}
		cam.updateProjectionMatrix();
		cam.lookAt(galaxySim.lookAt);
	}, -2);

	return null;
}

interface GalaxySceneProps {
	links: GalaxyLink[];
}

export function GalaxyScene({ links }: GalaxySceneProps) {
	return (
		<>
			<GalaxyDust />
			<LinkStars links={links} />
		</>
	);
}
