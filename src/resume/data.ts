import type { ResumeData } from "./types";

export const RESUME_DATA: ResumeData = {
  name: "Jacob D. Castro",
  contact: {
    location: "Santa Maria, CA, USA",
    links: [
      { label: "me@jacobdcastro.com", href: "mailto:me@jacobdcastro.com" },
      { label: "jacobdcastro.com", href: "https://jacobdcastro.com" },
      {
        label: "github.com/jacobdcastro",
        href: "https://github.com/jacobdcastro",
      },
      { label: "x.com/jacobdcastro", href: "https://x.com/jacobdcastro" },
    ],
  },
  skills: [
    {
      label: "Programming",
      items: "TypeScript, JavaScript, Python, Rust, SQL, Node.js",
    },
    {
      label: "Frameworks",
      items:
        "React, Next.js, GraphQL, TanStack Query, Zod, Tailwind, Vitest, Playwright, Storybook",
    },
    {
      label: "AI & Pipelines",
      items:
        "LLM workflows, agent tooling, prompt engineering, structured outputs, event-driven jobs",
    },
    {
      label: "Infrastructure",
      items:
        "Docker, PostgreSQL, GCP, AWS, Vercel, Railway, CI/CD, OpenTelemetry, Grafana, Sentry",
    },
  ],
  experience: [
    {
      role: "Senior Fullstack Engineer",
      dates: "01/2025 - Present",
      company: "Phylax Systems",
      location: "Remote",
      bullets: [
        [
          "Led the fullstack TypeScript-based microservices platform: contract-first API design (130+ Zod-validated RESTful endpoints) with cross-service contract and version compatibility testing, multi-tenant PostgreSQL with row-level security, React UI, data pipelines, and CI/CD. Reviewed all teammate PRs and owned core features from ambiguous requirements through spec, implementation, and deployment.",
        ],
        [
          "Architected an LLM agent service from the first commit, designing Python workflows, custom agent tools, generate-critique-refine quality loops, and deterministic verification of model output to power four AI features shipped to production.",
        ],
        [
          "Designed and built the platform's event-driven data backbone: 40+ background workers, a GraphQL chain indexing layer, and a typed async job engine with retry policies and payload redaction, powering alerting, on-chain events, and AI workflows.",
        ],
        ["Stack: TypeScript, Node.js, React, PostgreSQL, GraphQL, Zod, Docker"],
      ],
    },
    {
      role: "Freelancer",
      dates: "11/2018 - 01/2025",
      company: "XIV Systems",
      location: "Remote",
      bullets: [
        [
          "Contributed full-stack improvement features for Sudoswap (",
          { text: "sudoswap.xyz", href: "https://sudoswap.xyz/" },
          ")",
        ],
        [
          "Developed and deployed smart contracts, NFT minting app, and first e-commerce website for Highly Liquid (",
          { text: "highlyliquidny.com", href: "https://highlyliquidny.com/" },
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
          "Managed developer relations, documentation, and NPM releases; keynoted at ETHGlobal NYC and Devconnect Istanbul.",
        ],
        [
          "Stack: JavaScript, TypeScript, Next.js, React, Redux, wagmi/ethers.js, Node.js, Solidity",
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
          "Ran YC's 'write code and talk to users' playbook — met directly with paying customers, rapidly prototyped their requests, and folded their feedback into every release cycle.",
        ],
        [
          "Stack: SPA React, TypeScript, Next.js, Ethers.js, Solidity, Express, MongoDB, AWS",
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
      name: "xiv — AI Agent Workflows",
      href: "https://github.com/jacobdcastro/workflows",
      bullets: [
        [
          "Custom CLI orchestrating AI agent engineering workflows — automated implement, review, and ship loops with local review agents and overnight stacked-branch feature builds.",
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
