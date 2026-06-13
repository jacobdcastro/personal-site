# XIV Systems | Jacob D. Castro

Personal site, v6. Rewritten from a custom Rust SSG to a TanStack Start app.

## Stack

- [TanStack Start](https://tanstack.com/start) (file-based routing, SSR)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) + [drei](https://github.com/pmndrs/drei) (Three.js)
- [@react-spring/three](https://www.react-spring.dev/) for 3D animation
- [Zustand](https://zustand-demo.pmnd.rs/) for client state
- MDX for blog content (`src/content/posts`)
- [Bun](https://bun.sh/) as package manager/runtime
- Deployed to [Netlify](https://www.netlify.com/)

## Getting started

```bash
bun install
bun run dev
```

Note: use `bun run dev` (not `bun --bun run dev`) — running Vite under Bun's
runtime currently breaks the Netlify dev plugin's CJS interop.

## Build

```bash
bun run build
```

## Adding a blog post

Drop an `.mdx` file in `src/content/posts/` with frontmatter:

```mdx
---
title: My Post
date: 2025-01-01
description: A short description
slug: my-post
---

Content goes here.
```

It will automatically appear at `/blog` and `/blog/<slug>`.
