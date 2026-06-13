import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const HeroScene = lazy(() =>
	import("../components/three/hero-scene").then((mod) => ({
		default: mod.HeroScene,
	})),
);

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	return (
		<div className="mx-auto max-w-3xl px-6 py-12">
			<div className="mb-8 h-72 w-full overflow-hidden rounded-lg bg-neutral-900">
				<Suspense fallback={null}>
					<HeroScene />
				</Suspense>
			</div>

			<h1 className="text-4xl font-bold">XIV Systems | Jacob D. Castro</h1>
			<p className="mt-4 text-lg text-neutral-300">
				I'm Jacob D. Castro, a crypto software engineer. I like Rust, Solidity,
				and fullstack TypeScript.
			</p>

			<h2 className="mt-10 text-2xl font-bold">What I Do</h2>
			<ul className="mt-4 list-disc space-y-1 pl-6 text-neutral-300">
				<li>Fullstack Development (JavaScript/TypeScript, React, Node.js)</li>
				<li>Smart Contract Development (Solidity, EVM)</li>
				<li>Systems Programming (Rust, Golang)</li>
				<li>DevOps &amp; Infrastructure (CI/CD, Docker, AWS/GCP)</li>
			</ul>

			<h2 className="mt-10 text-2xl font-bold">Recent Work</h2>
			<p className="mt-4 text-neutral-300">
				Check out some of my notable projects:
			</p>
			<ul className="mt-4 list-disc space-y-1 pl-6 text-neutral-300">
				<li>
					<a
						className="underline hover:text-neutral-100"
						href="https://github.com/jacobdcastro/preconf-devnet-dashboard"
					>
						ZuBerlin 2024 Hackathon Winner
					</a>
				</li>
				<li>
					<a
						className="underline hover:text-neutral-100"
						href="https://github.com/jacobdcastro/chip8-cpu-emulator"
					>
						CHIP-8 CPU Emulator
					</a>
				</li>
				<li>
					<a
						className="underline hover:text-neutral-100"
						href="https://github.com/jacobdcastro/personal-site"
					>
						This site (TanStack Start + R3F)
					</a>
				</li>
			</ul>

			<h2 className="mt-10 text-2xl font-bold">Links</h2>
			<ul className="mt-4 list-disc space-y-1 pl-6 text-neutral-300">
				<li>
					<a
						className="underline hover:text-neutral-100"
						href="mailto:jacob@xiv.systems"
					>
						Email
					</a>
				</li>
				<li>
					<a
						className="underline hover:text-neutral-100"
						href="https://x.com/jacobdcastro"
					>
						Twitter
					</a>
				</li>
				<li>
					<a
						className="underline hover:text-neutral-100"
						href="https://github.com/jacobdcastro"
					>
						GitHub
					</a>
				</li>
				<li>
					<Link className="underline hover:text-neutral-100" to="/blog">
						Blog
					</Link>
				</li>
				<li>
					<a className="underline hover:text-neutral-100" href="/resume.pdf">
						Resumé
					</a>
				</li>
			</ul>
		</div>
	);
}
