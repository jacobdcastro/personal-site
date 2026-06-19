import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { JsonLd } from "../../components/seo/JsonLd";
import { getPostBySlug } from "../../lib/posts";
import { blogPostingJsonLd, buildPageHead } from "../../lib/seo";

export const Route = createFileRoute("/blog/$slug")({
	loader: ({ params }) => {
		const post = getPostBySlug(params.slug);
		if (!post) throw notFound();
		return post.frontmatter;
	},
	head: ({ loaderData }) => {
		if (!loaderData) return {};
		return buildPageHead({
			title: loaderData.title,
			description: loaderData.description,
			path: `/blog/${loaderData.slug}`,
			ogType: "article",
		});
	},
	component: BlogPost,
});

function BlogPost() {
	const frontmatter = Route.useLoaderData();
	const { slug } = Route.useParams();
	const post = getPostBySlug(slug);
	if (!post) return null;
	const { Component } = post;

	return (
		<article className="mx-auto max-w-3xl px-6 py-12">
			<JsonLd
				data={blogPostingJsonLd({
					title: frontmatter.title,
					description: frontmatter.description,
					path: `/blog/${frontmatter.slug}`,
					date: frontmatter.date,
				})}
			/>
			<nav aria-label="Blog">
				<Link
					to="/blog"
					className="font-sans text-sm text-neutral-400 underline-offset-4 hover:text-neutral-200 hover:underline"
				>
					← Back to blog
				</Link>
			</nav>
			<h1 className="mt-6 text-4xl font-bold">{frontmatter.title}</h1>
			<time
				dateTime={frontmatter.date}
				className="mt-2 block text-sm text-neutral-400"
			>
				{frontmatter.date}
			</time>
			<div className="prose prose-invert mt-8 max-w-none">
				<Component />
			</div>
		</article>
	);
}
