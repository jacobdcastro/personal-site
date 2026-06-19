import { useMemo } from "react";
import { AdditiveBlending, BufferAttribute, BufferGeometry } from "three";
import { getGalaxyStars } from "../../lib/galaxy-stars";

export function GalaxyDust() {
	const geometry = useMemo(() => {
		const { positions, colors } = getGalaxyStars();

		const geo = new BufferGeometry();
		geo.setAttribute("position", new BufferAttribute(positions.slice(), 3));
		geo.setAttribute("color", new BufferAttribute(colors.slice(), 3));
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
