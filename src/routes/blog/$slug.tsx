import { createFileRoute, notFound } from "@tanstack/react-router";
import { getPostBySlug } from "../../lib/posts";

export const Route = createFileRoute("/blog/$slug")({
	loader: ({ params }) => {
		const post = getPostBySlug(params.slug);
		if (!post) throw notFound();
		return post.frontmatter;
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
			<h1 className="text-4xl font-bold">{frontmatter.title}</h1>
			<p className="mt-2 text-sm text-neutral-400">{frontmatter.date}</p>
			<div className="prose prose-invert mt-8 max-w-none">
				<Component />
			</div>
		</article>
	);
}
