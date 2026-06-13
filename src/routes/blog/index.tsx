import { createFileRoute, Link } from "@tanstack/react-router";
import { posts } from "../../lib/posts";

export const Route = createFileRoute("/blog/")({ component: BlogIndex });

function BlogIndex() {
	return (
		<div className="mx-auto max-w-3xl px-6 py-12">
			<h1 className="text-4xl font-bold">Blog</h1>
			<ul className="mt-8 space-y-6">
				{posts.map((post) => (
					<li key={post.frontmatter.slug}>
						<Link
							to="/blog/$slug"
							params={{ slug: post.frontmatter.slug }}
							className="block"
						>
							<h2 className="text-2xl font-bold underline-offset-4 hover:underline">
								{post.frontmatter.title}
							</h2>
							<p className="mt-1 text-sm text-neutral-400">
								{post.frontmatter.date}
							</p>
							<p className="mt-2 text-neutral-300">
								{post.frontmatter.description}
							</p>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
