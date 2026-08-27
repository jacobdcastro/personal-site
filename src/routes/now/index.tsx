import { createFileRoute, Link } from "@tanstack/react-router";
import { NowProvider } from "../../components/now/NowEntry";
import { JsonLd } from "../../components/seo/JsonLd";
import { formatEntryDate, nowPage } from "../../lib/now";
import { buildPageHead } from "../../lib/seo";
import { absoluteUrl, SITE } from "../../lib/site";

const { frontmatter, Entries, latestDate } = nowPage;

export const Route = createFileRoute("/now/")({
	head: () =>
		buildPageHead({
			title: frontmatter.title,
			description: frontmatter.description,
			path: "/now",
		}),
	component: NowRoute,
});

function NowRoute() {
	return (
		<article className="paper mx-auto max-w-[42rem] px-6 pt-20 pb-24 sm:pt-24">
			<JsonLd
				data={{
					"@context": "https://schema.org",
					"@type": "WebPage",
					name: frontmatter.title,
					url: absoluteUrl("/now"),
					description: frontmatter.description,
					dateModified: latestDate,
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
				<div className="paper-byline">
					<p className="paper-author">{SITE.author}</p>
					<p className="paper-meta">
						Last updated{" "}
						<time dateTime={latestDate}>{formatEntryDate(latestDate)}</time>
					</p>
				</div>
				<p className="paper-note">
					Inspired by{" "}
					<a
						href="https://nownownow.com"
						target="_blank"
						rel="noopener noreferrer"
					>
						nownownow.com
					</a>
					<span className="sr-only"> (opens in new tab)</span>
				</p>
			</header>

			<div className="paper-body">
				<NowProvider mode="latest" latestDate={latestDate}>
					<Entries />
				</NowProvider>
			</div>

			<footer className="paper-footer">
				<Link to="/" data-ship-cursor="terminal">
					← Back to the galaxy
				</Link>
			</footer>
		</article>
	);
}
