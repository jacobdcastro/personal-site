import type { ComponentType } from "react";

export interface PostFrontmatter {
	title: string;
	date: string;
	description: string;
	tags?: string[];
	slug: string;
}

interface PostModule {
	frontmatter: PostFrontmatter;
	default: ComponentType;
}

const modules = import.meta.glob<PostModule>("../content/posts/*.mdx", {
	eager: true,
});

export interface Post {
	frontmatter: PostFrontmatter;
	Component: ComponentType;
}

export const posts: Post[] = Object.values(modules)
	.map((mod) => ({ frontmatter: mod.frontmatter, Component: mod.default }))
	.sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));

export function getPostBySlug(slug: string): Post | undefined {
	return posts.find((post) => post.frontmatter.slug === slug);
}
