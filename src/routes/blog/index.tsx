import { createFileRoute, Link } from "@tanstack/react-router";
import { JsonLd } from "../../components/seo/JsonLd";
import { posts } from "../../lib/posts";
import { buildPageHead } from "../../lib/seo";
import { SITE } from "../../lib/site";

export const Route = createFileRoute("/blog/")({
	head: () =>
		buildPageHead({
			title: "Blog",
			description: "Writing on engineering, design, and technology.",
			path: "/blog",
		}),
	component: BlogIndex,
});

function BlogIndex() {
	return (
		<div className="mx-auto max-w-3xl px-6 py-12">
			<JsonLd
				data={{
					"@context": "https://schema.org",
					"@type": "Blog",
					name: `${SITE.name} Blog`,
					url: `${SITE.url}/blog`,
					description: "Writing on engineering, design, and technology.",
				}}
			/>
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
							<time
								dateTime={post.frontmatter.date}
								className="mt-1 block text-sm text-neutral-400"
							>
								{post.frontmatter.date}
							</time>
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
