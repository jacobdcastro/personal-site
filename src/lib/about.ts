import type { ComponentType } from "react";

export interface AboutFrontmatter {
	readonly title: string;
	readonly subtitle: string;
	readonly author: string;
	readonly affiliation: string;
	readonly email: string;
	readonly date: string;
	readonly description: string;
	readonly keywords: readonly string[];
	readonly abstract: string;
}

interface AboutModule {
	frontmatter: AboutFrontmatter;
	default: ComponentType;
}

export interface AboutPaper {
	readonly frontmatter: AboutFrontmatter;
	readonly Body: ComponentType;
}

const modules = import.meta.glob<AboutModule>("../content/about.mdx", {
	eager: true,
});

const [aboutModule] = Object.values(modules);

if (!aboutModule) {
	throw new Error("src/content/about.mdx is missing");
}

export const aboutPaper: AboutPaper = {
	frontmatter: aboutModule.frontmatter,
	Body: aboutModule.default,
};
