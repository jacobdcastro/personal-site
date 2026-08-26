import { createFileRoute, Link } from "@tanstack/react-router";
import { JsonLd } from "../components/seo/JsonLd";
import { aboutPaper } from "../lib/about";
import { buildPageHead } from "../lib/seo";
import { absoluteUrl, SITE } from "../lib/site";

const { frontmatter, Body } = aboutPaper;

export const Route = createFileRoute("/about")({
	head: () =>
		buildPageHead({
			title: frontmatter.title,
			description: frontmatter.description,
			path: "/about",
			ogType: "article",
		}),
	component: AboutPage,
});

function AboutPage() {
	return (
		<article className="paper mx-auto max-w-[42rem] px-6 pt-20 pb-24 sm:pt-24">
			<JsonLd
				data={{
					"@context": "https://schema.org",
					"@type": "ProfilePage",
					name: frontmatter.title,
					url: absoluteUrl("/about"),
					description: frontmatter.description,
					keywords: frontmatter.keywords.join(", "),
					mainEntity: {
						"@type": "Person",
						name: SITE.author,
						email: SITE.email,
						url: SITE.url,
					},
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
					<p className="paper-author">{frontmatter.author}</p>
					<p className="paper-meta">{frontmatter.affiliation}</p>
					<p className="paper-meta">
						<a href={`mailto:${frontmatter.email}`}>{frontmatter.email}</a>
						<span aria-hidden="true"> · </span>
						{frontmatter.date}
					</p>
				</div>
			</header>

			<section className="paper-abstract" aria-labelledby="abstract-heading">
				<h2 id="abstract-heading" className="paper-abstract-title">
					Abstract
				</h2>
				<p>{frontmatter.abstract}</p>
				<p className="paper-keywords">
					<em>Keywords—</em>
					{frontmatter.keywords.join(", ")}
				</p>
			</section>

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
