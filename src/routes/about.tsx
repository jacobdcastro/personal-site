import { createFileRoute } from "@tanstack/react-router";
import { JsonLd } from "../components/seo/JsonLd";
import { ABOUT_PAGE } from "../content/about";
import { buildPageHead } from "../lib/seo";
import { SITE } from "../lib/site";

export const Route = createFileRoute("/about")({
	head: () =>
		buildPageHead({
			title: ABOUT_PAGE.title,
			description:
				"About Jacob D. Castro — fullstack software engineer, founder, and product-minded builder.",
			path: "/about",
		}),
	component: AboutPage,
});

function AboutPage() {
	return (
		<article className="mx-auto max-w-3xl px-6 py-12">
			<JsonLd
				data={{
					"@context": "https://schema.org",
					"@type": "ProfilePage",
					name: ABOUT_PAGE.title,
					url: `${SITE.url}/about`,
					mainEntity: {
						"@type": "Person",
						name: SITE.author,
						url: SITE.url,
					},
				}}
			/>
			<h1 className="text-4xl font-bold">{ABOUT_PAGE.title}</h1>
			<div className="prose prose-invert mt-8 max-w-none">
				{ABOUT_PAGE.paragraphs.map((paragraph) => (
					<p key={paragraph}>{paragraph}</p>
				))}
			</div>
		</article>
	);
}
