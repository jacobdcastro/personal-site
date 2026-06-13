export interface GalaxyLink {
	id: string;
	label: string;
	href: string;
	description: string;
	/** spiral arm index (0 … branches-1) */
	branch: number;
	/** distance from galactic center */
	radius: number;
}

// single source of truth for all site navigation links.
// each link sits on a spiral arm at a given radius — positions are derived at render time.
export const LINKS: GalaxyLink[] = [
	{
		id: "twitter",
		label: "Twitter",
		href: "https://x.com/jacobdcastro",
		description: "Thoughts on systems, Ethereum, and whatever I'm building.",
		branch: 0,
		radius: 2.6,
	},
	{
		id: "github",
		label: "GitHub",
		href: "https://github.com/jacobdcastro",
		description: "Open-source projects, experiments, and work-in-progress code.",
		branch: 2,
		radius: 2.2,
	},
	{
		id: "resume",
		label: "Resumé",
		href: "/resume.pdf",
		description: "A PDF overview of experience, skills, and past roles.",
		branch: 1,
		radius: 1.4,
	},
	{
		id: "blog",
		label: "Blog",
		href: "/blog",
		description: "Longer-form writing on engineering, design, and technology.",
		branch: 3,
		radius: 2.8,
	},
	{
		id: "email",
		label: "Email",
		href: "mailto:jacob@xiv.systems",
		description: "Reach out directly — always happy to chat about ideas or work.",
		branch: 4,
		radius: 2.0,
	},
	{
		id: "hackathon",
		label: "ZuBerlin 2024",
		href: "https://github.com/jacobdcastro/preconf-devnet-dashboard",
		description:
			"A real-time dashboard for Ethereum preconfirmation devnets, built at ZuBerlin 2024.",
		branch: 1,
		radius: 3.2,
	},
	{
		id: "chip8",
		label: "CHIP-8 Emulator",
		href: "https://github.com/jacobdcastro/chip8-cpu-emulator",
		description:
			"A from-scratch CHIP-8 interpreter and emulator written in Rust.",
		branch: 3,
		radius: 1.8,
	},
];
