import { createFileRoute, Link } from "@tanstack/react-router";
import { JsonLd } from "../components/seo/JsonLd";
import { buildPageHead } from "../lib/seo";
import { absoluteUrl, SITE } from "../lib/site";
import { usesPage } from "../lib/uses";

const { frontmatter, Body } = usesPage;

export const Route = createFileRoute("/uses")({
	head: () =>
		buildPageHead({
			title: frontmatter.title,
			description: frontmatter.description,
			path: "/uses",
		}),
	component: UsesRoute,
});

function UsesRoute() {
	return (
		<article className="paper mx-auto max-w-[42rem] px-6 pt-20 pb-24 sm:pt-24">
			<JsonLd
				data={{
					"@context": "https://schema.org",
					"@type": "WebPage",
					name: frontmatter.title,
					url: absoluteUrl("/uses"),
					description: frontmatter.description,
					author: { "@type": "Person", name: SITE.author, url: SITE.url },
				}}
			/>

			<nav className="paper-nav" aria-label="Back">
				<Link to="/" data-ship-cursor="terminal">
					← Back to the galaxy
				</Link>
			</nav>

			<header className="paper-head">
				<h1 className="paper-title">{frontmatter.title}</h1>
				<p className="paper-subtitle">{frontmatter.subtitle}</p>
				<div className="paper-byline">
					<p className="paper-author">{SITE.author}</p>
					<p className="paper-meta">Last updated {frontmatter.updated}</p>
				</div>
				<p className="paper-note">
					One of many at{" "}
					<a href="https://uses.tech" target="_blank" rel="noopener noreferrer">
						uses.tech
					</a>
					<span className="sr-only"> (opens in new tab)</span>
				</p>
			</header>

			<div className="paper-body">
				<Body />
			</div>

			<footer className="paper-footer">
				<Link to="/" data-ship-cursor="terminal">
					← Back to the galaxy
				</Link>
			</footer>
		</article>
	);
}
