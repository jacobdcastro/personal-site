import { createFileRoute } from "@tanstack/react-router";
import { NowProvider } from "../../components/now/NowEntry";
import { formatEntryDate, nowPage } from "../../lib/now";
import { buildPageHead } from "../../lib/seo";
import { SITE } from "../../lib/site";

const { frontmatter, Entries, latestDate } = nowPage;

// deliberately unlinked from the rest of the site and kept out of the sitemap —
// reachable by URL, but not something to stumble onto.
export const Route = createFileRoute("/now/archive")({
	head: () =>
		buildPageHead({
			title: `${frontmatter.title} — Archive`,
			description: frontmatter.description,
			path: "/now/archive",
			noIndex: true,
		}),
	component: NowArchiveRoute,
});

function NowArchiveRoute() {
	return (
		<article className="paper mx-auto max-w-[42rem] px-6 pt-20 pb-24 sm:pt-24">
			<header className="paper-head">
				<h1 className="paper-title">Archive</h1>
				<div className="paper-byline">
					<p className="paper-author">{SITE.author}</p>
					<p className="paper-meta">
						Every entry, newest first · last updated{" "}
						<time dateTime={latestDate}>{formatEntryDate(latestDate)}</time>
					</p>
				</div>
			</header>

			<div className="paper-body">
				<NowProvider mode="all" latestDate={latestDate}>
					<Entries />
				</NowProvider>
			</div>
		</article>
	);
}
