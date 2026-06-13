import { useMemo } from "react";
import {
	AdditiveBlending,
	BufferAttribute,
	BufferGeometry,
} from "three";
import { GALAXY, colorAtRadius, gaussianRandom, spiralPosition } from "./galaxy-math";

export function GalaxyDust() {
	const geometry = useMemo(() => {
		const pos = new Float32Array(GALAXY.STAR_COUNT * 3);
		const col = new Float32Array(GALAXY.STAR_COUNT * 3);

		for (let i = 0; i < GALAXY.STAR_COUNT; i++) {
			const i3 = i * 3;
			let x: number;
			let y: number;
			let z: number;
			let radius: number;

			if (i < GALAXY.BULGE_COUNT) {
				// dense warm core
				radius = Math.random() ** 2 * 0.9;
				const angle = Math.random() * Math.PI * 2;
				const spread = gaussianRandom(2) * 0.18 * radius;
				x = Math.cos(angle) * radius + spread;
				y = gaussianRandom(2) * 0.12 * radius;
				z = Math.sin(angle) * radius + spread;
			} else if (i < GALAXY.BULGE_COUNT + GALAXY.DISK_COUNT) {
				// faint disk haze between arms
				radius = Math.random() * GALAXY.RADIUS;
				const angle = Math.random() * Math.PI * 2;
				const spread = gaussianRandom(GALAXY.RANDOMNESS_POWER) * 0.65;
				x = Math.cos(angle) * radius + spread;
				y = gaussianRandom(GALAXY.RANDOMNESS_POWER) * GALAXY.RANDOMNESS * 0.25;
				z = Math.sin(angle) * radius + spread;
			} else {
				// spiral arms — random branch assignment, not index-modulo
				radius = Math.random() * GALAXY.RADIUS;
				const branch = Math.floor(Math.random() * GALAXY.BRANCHES);
				[x, y, z] = spiralPosition(radius, branch);
			}

			pos[i3] = x;
			pos[i3 + 1] = y;
			pos[i3 + 2] = z;

			const mixed = colorAtRadius(radius);
			col[i3] = mixed.r;
			col[i3 + 1] = mixed.g;
			col[i3 + 2] = mixed.b;
		}

		const geo = new BufferGeometry();
		geo.setAttribute("position", new BufferAttribute(pos, 3));
		geo.setAttribute("color", new BufferAttribute(col, 3));
		return geo;
	}, []);

	return (
		<points geometry={geometry}>
			<pointsMaterial
				size={0.02}
				sizeAttenuation
				depthWrite={false}
				blending={AdditiveBlending}
				vertexColors
				transparent
				opacity={0.78}
			/>
		</points>
	);
}
