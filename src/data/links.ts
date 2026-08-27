export interface GalaxyLink {
	id: string;
	label: string;
	href: string;
	description: string;
	/** internal route — the detail panel links to it client-side instead of opening an external URL */
	page?: boolean;
	/** spiral arm index (0 … branches-1) */
	branch: number;
	/** distance from galactic center */
	radius: number;
}

// single source of truth for all site navigation links.
// each link sits on a spiral arm at a given radius — positions are derived at render time,
// so array order only controls the list view and the reading order for assistive tech.
export const LINKS: GalaxyLink[] = [
	{
		id: "github",
		label: "GitHub",
		href: "https://github.com/jacobdcastro",
		description: "My code... obviously.",
		branch: 2,
		radius: 2.7,
	},
	{
		id: "about",
		label: "About me",
		href: "/about",
		description: "Some deeper layers to me, if you must know.",
		page: true,
		branch: 3,
		radius: 2.15,
	},
	{
		id: "now",
		label: "Now",
		href: "/now",
		description:
			"What I'm working on, reading, and training for lately, among other side quests.",
		page: true,
		branch: 3,
		radius: 3.5,
	},
	{
		id: "resume",
		label: "Resumé",
		href: "/resume.pdf",
		description: "The ole PDF. Summary of my skills and experience.",
		branch: 1,
		radius: 3.2,
	},
	{
		id: "email",
		label: "Email",
		href: "mailto:me@jacobdcastro.com",
		description:
			"Live in your inbox? Reach out here! Always happy to chat about ideas or work.",
		branch: 4,
		radius: 2.4,
	},
	{
		id: "twitter",
		label: "X (fka Twitter)",
		href: "https://x.com/jacobdcastro",
		description: "Random thoughts about tech, AI, and sometimes sports.",
		branch: 0,
		radius: 3.1,
	},
	{
		id: "workflows",
		label: "AI Agent Workflows",
		href: "https://xiv.sh",
		description:
			"My own agent-driven engineering workflows, wrapped in a CLI to implement, review, and ship good code.",
		branch: 2,
		radius: 3.3,
	},
	{
		id: "neovim",
		label: "Neovim Config",
		href: "https://github.com/jacobdcastro/nvim-config",
		description: "I use neovim btw.",
		branch: 0,
		radius: 2.5,
	},
	{
		id: "chip8",
		label: "CHIP-8 Emulator",
		href: "https://github.com/jacobdcastro/chip8-cpu-emulator",
		description:
			"I built a CHIP-8 CPU interpreter and emulator from scratch in Rust. T'was a joy!",
		branch: 4,
		radius: 3.0,
	},
	{
		id: "calltrace",
		label: "EVM Calltrace",
		href: "https://github.com/jacobdcastro/txn-calltrace",
		description:
			"A minimal app to search and view calltrace data for an Ethereum transaction.",
		branch: 3,
		radius: 2.85,
	},
	{
		id: "hackathon",
		label: "ZuBerlin Hackathon Project",
		href: "https://github.com/jacobdcastro/preconf-devnet-dashboard",
		description:
			"A first-place-winning real-time dashboard for Ethereum preconfirmations, built at ZuBerlin 2024.",
		branch: 1,
		radius: 2.6,
	},
];
