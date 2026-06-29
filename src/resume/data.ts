import type { ResumeData } from "./types";

export const RESUME_DATA: ResumeData = {
	name: "Jacob D. Castro",
	contact: {
		location: "Santa Maria, CA",
		links: [
			{ label: "me@jacobdcastro.com", href: "mailto:me@jacobdcastro.com" },
			{ label: "jacobdcastro.com", href: "https://jacobdcastro.com" },
			{ label: "github.com/jacobdcastro", href: "https://github.com/jacobdcastro" },
			{ label: "x.com/jacobdcastro", href: "https://x.com/jacobdcastro" },
		],
	},
	skills: [
		{
			label: "Programming",
			items:
				"JavaScript, TypeScript, Rust, Node.js, CSS, PostgreSQL, MongoDB",
		},
		{
			label: "Frameworks",
			items: "React, Next.js, Express, Redux",
		},
		{
			label: "Infrastructure",
			items: "Docker, GCP, AWS, DevOps, CI/CD, Linux, Grafana, OTLP",
		},
	],
	experience: [
		{
			role: "Senior Fullstack Engineer",
			dates: "01/2025 - Present",
			company: "Phylax Systems",
			location: "Remote",
			bullets: [],
		},
		{
			role: "Freelancer",
			dates: "11/2018 - Present",
			company: "XIV Systems",
			location: "Remote",
			bullets: [
				[
					"Contributed full-stack improvement features for Sudoswap (",
					{ text: "sudoswap.xyz", href: "https://sudoswap.xyz/" },
					")",
				],
				[
					"Developed and deployed smart contracts, NFT minting app, and website for Highly Liquid (",
					{ text: "highlyliquidny.com", href: "https://highlyliquidny.com/" },
					")",
				],
				[
					"Contributed to design and development of staking smart contracts for Thalon (",
					{ text: "thalon.io", href: "https://www.thalon.io/" },
					")",
				],
			],
		},
		{
			role: "Co-Founder and CEO",
			dates: "05/2024 - 01/2025",
			company: "Monea",
			location: "Remote",
			bullets: [
				[
					"Built Monea's core product: a Rust-based CLI and engine for deploying rollup and Ethereum infrastructure.",
				],
				[
					"Led business development, including networking, partnerships, and fundraising strategy.",
				],
				["Stack: Rust, Starlark, Docker"],
			],
		},
		{
			role: "Lead Engineer",
			dates: "11/2022 - 07/2024",
			company: "Brink",
			location: "Remote",
			bullets: [
				[
					"Developed ",
					{ text: "Brink V2 Intents Protocol", href: "https://brink.trade/" },
					", ",
					{ text: "CroutonSwap", href: "https://croutonswap.com/" },
					", ",
					{ text: "Brinkscan", href: "https://www.brinkscan.com/" },
					", ",
					{ text: "Nomial", href: "https://nomial.io/" },
					", and Brink L2 chain.",
				],
				[
					"Delivered keynote talks on intent-centric infrastructure at ETHGlobal NYC and Devconnect Istanbul.",
				],
				[
					"Managed developer relations, documentation; launched NPM package; coordinated JS-to-TS conversion.",
				],
				[
					"Tech stack: JavaScript, TypeScript, Next.js, React, Redux, wagmi/ethers.js, Node.js, Solidity",
				],
			],
		},
		{
			role: "Founding Engineer",
			dates: "04/2022 - 08/2022",
			company: "Coinbooks (YC-backed)",
			location: "Remote",
			bullets: [
				[
					"Led development of a full-stack crypto invoicing app with native integration to core accounting product.",
				],
				[
					"Tech Stack: SPA React, TypeScript, Next.js, Ethers.js, Solidity, Express, MongoDB, AWS",
				],
			],
		},
		{
			role: "Full-stack Developer",
			dates: "06/2021 - 04/2022",
			company: "cocoNFT (Acquired)",
			location: "Remote",
			bullets: [
				[
					"Worked on an NFT minting and sales platform for creators, developing pixel-perfect UI based on designer's Figma files. (",
					{ text: "coconft.com", href: "https://coconft.com/" },
					")",
				],
			],
		},
	],
	projects: [
		{
			name: "Preconf Devnet Dashboard",
			href: "https://github.com/jacobdcastro/preconf-devnet-dashboard",
			bullets: [
				[
					"ZuBerlin 2024 hackathon winner — real-time dashboard for Ethereum preconfirmation devnets with live block and validator metrics.",
				],
			],
		},
		{
			name: "CHIP-8 CPU Emulator",
			href: "https://github.com/jacobdcastro/chip8-cpu-emulator",
			bullets: [
				[
					"From-scratch CHIP-8 interpreter and emulator written in Rust with a minimal graphics frontend.",
				],
			],
		},
		{
			name: "EVM Calltrace",
			href: "https://github.com/jacobdcastro/txn-calltrace",
			bullets: [
				[
					"Minimal web app to search and inspect nested calltrace data for any Ethereum transaction hash.",
				],
			],
		},
		{
			name: "Personal Site",
			href: "https://github.com/jacobdcastro/personal-site",
			bullets: [
				[
					"Interactive portfolio built with TanStack Start, Three.js galaxy navigation, and a programmatic PDF resume generator.",
				],
			],
		},
	],
};
