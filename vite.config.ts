import mdx from "@mdx-js/rollup";
import netlify from "@netlify/vite-plugin-tanstack-start";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { defineConfig } from "vite";

const config = defineConfig({
	resolve: { tsconfigPaths: true },
	plugins: [
		netlify(),
		tailwindcss(),
		{
			enforce: "pre",
			...mdx({
				remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
			}),
		},
		tanstackStart(),
		viteReact({ include: [/\.(jsx|js|mdx|md|tsx|ts)$/] }),
	],
});

export default config;
