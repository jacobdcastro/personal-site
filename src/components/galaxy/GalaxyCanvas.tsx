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
}

export function GalaxyCanvas({ links }: GalaxyCanvasProps) {
	const galaxyGroupRef = useRef<Group>(null);
	const isDragging = useRef(false);
	const velocity = useRef({ x: 0, y: 0 });

	const { containerRef, handlers } = useGalaxyInput({
		isDragging,
		velocity,
	});

	return (
		<div ref={containerRef} className="h-full w-full" {...handlers}>
			<Canvas
				camera={{ position: [0, 0, 8.5], fov: 58 }}
				dpr={[1, 1.5]}
				gl={{ antialias: false }}
			>
				<group ref={galaxyGroupRef}>
					<GalaxyScene links={links} />
				</group>
				<GalaxySimDriver
					galaxyGroupRef={galaxyGroupRef}
					isDragging={isDragging}
					velocity={velocity}
					links={links}
				/>
				<GalaxyCursorTracker groupRef={galaxyGroupRef} />
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
