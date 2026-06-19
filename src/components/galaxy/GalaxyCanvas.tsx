import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useRef } from "react";
import type { Group } from "three";
import type { GalaxyLink } from "../../data/links";
import { useGalaxyInput } from "../../hooks/useGalaxyInput";
import { GalaxyCursorTracker } from "./GalaxyCursorTracker";
import { GalaxyScene, GalaxySimDriver } from "./GalaxySimDriver";

interface GalaxyCanvasProps {
	links: GalaxyLink[];
	active: boolean;
}

export function GalaxyCanvas({ links, active }: GalaxyCanvasProps) {
	const galaxyGroupRef = useRef<Group>(null);
	const isDragging = useRef(false);
	const velocity = useRef({ x: 0, y: 0 });

	const { containerRef, handlers } = useGalaxyInput({
		isDragging,
		velocity,
	});

	return (
		<div ref={containerRef} className="h-full w-full touch-none" {...handlers}>
			<Canvas
				camera={{ position: [0, 0, 8.5], fov: 58 }}
				dpr={[1, 1.5]}
				gl={{ antialias: false }}
				frameloop="always"
			>
				<group ref={galaxyGroupRef}>
					<GalaxyScene links={links} active={active} />
				</group>
				<GalaxySimDriver
					galaxyGroupRef={galaxyGroupRef}
					isDragging={isDragging}
					velocity={velocity}
					links={links}
					active={active}
				/>
				<GalaxyCursorTracker groupRef={galaxyGroupRef} active={active} />
				<EffectComposer multisampling={0}>
					<Bloom
						luminanceThreshold={0.2}
						intensity={0.85}
						mipmapBlur
						radius={0.4}
					/>
				</EffectComposer>
			</Canvas>
		</div>
	);
}
