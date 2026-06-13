import { a, useSpring } from "@react-spring/three";
import { Environment, Float } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import type { Mesh } from "three";
import { useSceneStore } from "../../store/scene-store";

function Knot() {
	const meshRef = useRef<Mesh>(null);
	const [hovered, setHovered] = useState(false);
	const setHoveredId = useSceneStore((s) => s.setHovered);

	const { scale } = useSpring({
		scale: hovered ? 1.15 : 1,
		config: { mass: 1, tension: 280, friction: 20 },
	});

	useFrame((_, delta) => {
		if (!meshRef.current) return;
		meshRef.current.rotation.x += delta * 0.15;
		meshRef.current.rotation.y += delta * 0.2;
	});

	return (
		<Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
			<a.mesh
				ref={meshRef}
				scale={scale}
				onPointerOver={() => {
					setHovered(true);
					setHoveredId("hero-knot");
				}}
				onPointerOut={() => {
					setHovered(false);
					setHoveredId(null);
				}}
			>
				<torusKnotGeometry args={[1, 0.3, 200, 32]} />
				<meshStandardMaterial
					color={hovered ? "#f5f5f5" : "#737373"}
					roughness={0.3}
					metalness={0.6}
				/>
			</a.mesh>
		</Float>
	);
}

export function HeroScene() {
	return (
		<Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
			<ambientLight intensity={0.4} />
			<directionalLight position={[3, 3, 3]} intensity={1.2} />
			<Knot />
			<Environment preset="city" />
		</Canvas>
	);
}
