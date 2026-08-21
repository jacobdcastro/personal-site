import type { ResumeData } from "./types";

export const RESUME_DATA: ResumeData = {
  name: "Jacob D. Castro",
  contact: {
    location: "Santa Maria, CA, USA (willing to relocate)",
    links: [
      { label: "me@jacobdcastro.com", href: "mailto:me@jacobdcastro.com" },
      { label: "jacobdcastro.com", href: "https://jacobdcastro.com" },
      {
        label: "github.com/jacobdcastro",
        href: "https://github.com/jacobdcastro",
      },
      {
        label: "linkedin.com/in/jacobdcastro1",
        href: "https://www.linkedin.com/in/jacobdcastro1",
      },
    ],
  },
  summary: [
    "Full stack engineer building web products since 2020, most recently in TypeScript, React, Node, and GraphQL. Founder and founding-engineer background, with a product engineer's habits: prototyping against real user feedback, carrying features from ambiguous idea to production, and keeping technical decisions tied to the business goal behind them.",
  ],
  skills: [
    {
      label: "Programming",
      items: "TypeScript, JavaScript, Python, Rust, SQL",
    },
    {
      label: "Frameworks",
      items:
        "React, Node.js, Effect, GraphQL, Next.js, TanStack Query, Zod, Tailwind, Vitest, Playwright, Storybook",
    },
    {
      label: "AI & Pipelines",
      items:
        "LLM workflows, agent tooling, prompt engineering, structured outputs, eval harnesses, event-driven jobs",
    },
    {
      label: "Infrastructure",
      items:
        "PostgreSQL, Docker, GCP, AWS, Vercel, Railway, CI/CD, OpenTelemetry, Grafana, Sentry, Git, Jujutsu",
    },
  ],
  experience: [
    {
      role: "Senior Full Stack Engineer",
      dates: "01/2025 - Present",
      company: "Phylax Systems",
      bullets: [
        [
          "Led the full stack TypeScript microservices platform: contract-first API design (130+ Zod-validated endpoints), cross-service compatibility testing, multi-tenant PostgreSQL with row-level security, React UI, and CI/CD.",
        ],
        [
          "Architected an LLM agent service from the first commit: Python workflows, agent tools, generate-critique-refine loops, and deterministic output verification with grounding and hallucination checks, powering four production AI features.",
        ],
        [
          "Owned core customer-facing features end to end, from ambiguous requirements through spec, implementation, and deployment, and reviewed all teammate PRs.",
        ],
        [
          "Designed and built the platform's event-driven data backbone: 40+ background workers, a GraphQL-backed event indexing layer, and a typed async job engine with retry policies and payload redaction, powering alerting, real-time event processing, and AI workflows.",
        ],
      ],
    },
    {
      role: "Co-Founder and CEO",
      dates: "05/2024 - 01/2025",
      company: "Monea",
      bullets: [
        [
          "Built Monea's core product: a Rust-based CLI and engine for deploying rollup and Ethereum infrastructure.",
        ],
        [
          "Ran the company as a technical founder while remaining its primary engineer: customer discovery, partnerships, and fundraising strategy.",
        ],
      ],
    },
    {
      role: "Lead Engineer",
      dates: "11/2022 - 07/2024",
      company: "Brink",
      bullets: [
        [
          "Designed, architected, built, and deployed five products, including an intents-based trading protocol and SDK, a swap interface, a block explorer, and an L2 chain.",
        ],
        [
          "Owned the developer-facing surface: SDK releases to NPM, documentation, and integration support for external teams, plus conference keynotes on the protocol.",
        ],
      ],
    },
    {
      role: "Founding Engineer",
      dates: "04/2022 - 08/2022",
      company: "Coinbooks (YC-backed)",
      bullets: [
        [
          "Led development of a full-stack invoicing app with native integration to the core accounting product.",
        ],
        [
          "Ran YC's 'write code and talk to users' playbook: met directly with paying customers, rapidly prototyped their requests, and folded their feedback into every release cycle.",
        ],
      ],
    },
    {
      role: "Freelance Engineer",
      dates: "01/2020 - 01/2025",
      company: "XIV Systems",
      bullets: [
        [
          "Occasional one-off client projects: full-stack feature work for Sudoswap (",
          { text: "sudoswap.xyz", href: "https://sudoswap.xyz/" },
          "), plus smart contracts, an NFT minting app, and the first e-commerce site for Highly Liquid (",
          { text: "highlyliquidny.com", href: "https://highlyliquidny.com/" },
          "), among other short-term contracts.",
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
          "ZuBerlin 2024 hackathon winner. Real-time Ethereum preconfirmation devnet dashboard.",
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
      name: "AI Agent Workflows",
      href: "https://github.com/jacobdcastro/workflows",
      bullets: [
        [
          "Custom CLI orchestrating automated implement, review, and ship loops with local agents.",
        ],
      ],
    },
    {
      name: "EVM Calltrace",
      href: "https://github.com/jacobdcastro/txn-calltrace",
      bullets: [
        [
          "Call trace explorer with an Effect-based fetch layer: schema-validated decoding and retry schedules.",
        ],
      ],
    },
    {
      name: "Personal Site",
      href: "https://github.com/jacobdcastro/personal-site",
      bullets: [
        [
          "TanStack Start portfolio with Three.js galaxy navigation and a programmatic PDF resume generator.",
        ],
      ],
    },
  ],
  education: [
    "Self-taught developer and engineer. Production experience across venture-backed startups in place of a formal CS degree, with continuous project-based study in fullstack engineering, systems programming, data pipelines, and applied AI.",
  ],
};
