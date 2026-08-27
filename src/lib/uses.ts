import type { ComponentType } from "react";

export interface UsesFrontmatter {
	readonly title: string;
	readonly subtitle: string;
	readonly description: string;
	readonly updated: string;
}

interface UsesModule {
	frontmatter: UsesFrontmatter;
	default: ComponentType;
}

export interface UsesPage {
	readonly frontmatter: UsesFrontmatter;
	readonly Body: ComponentType;
}

const modules = import.meta.glob<UsesModule>("../content/uses.mdx", {
	eager: true,
});

const [usesModule] = Object.values(modules);

if (!usesModule) {
	throw new Error("src/content/uses.mdx is missing");
}

export const usesPage: UsesPage = {
	frontmatter: usesModule.frontmatter,
	Body: usesModule.default,
};
