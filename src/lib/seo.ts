import { absoluteUrl, ogImageUrl, SITE } from "./site";

export interface PageSeo {
	title: string;
	description: string;
	path: string;
	/** TODO: override per page when you have custom share images */
	ogImage?: string;
	ogType?: "website" | "article";
	noIndex?: boolean;
}

export function pageTitle(title: string) {
	return title === SITE.title ? title : `${title} | ${SITE.name}`;
}

export function buildPageHead({
	title,
	description,
	path,
	ogImage = ogImageUrl(),
	ogType = "website",
	noIndex = false,
}: PageSeo) {
	const canonical = absoluteUrl(path);
	const fullTitle = pageTitle(title);

	return {
		meta: [
			{ title: fullTitle },
			{ name: "description", content: description },
			{ name: "theme-color", content: SITE.themeColor },
			{ property: "og:site_name", content: SITE.name },
			{ property: "og:title", content: fullTitle },
			{ property: "og:description", content: description },
			{ property: "og:type", content: ogType },
			{ property: "og:url", content: canonical },
			{ property: "og:image", content: ogImage },
			{ property: "og:locale", content: SITE.locale },
			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:site", content: SITE.twitterHandle },
			{ name: "twitter:creator", content: SITE.twitterHandle },
			{ name: "twitter:title", content: fullTitle },
			{ name: "twitter:description", content: description },
			{ name: "twitter:image", content: ogImage },
			...(noIndex ? [{ name: "robots", content: "noindex" }] : []),
		],
		links: [{ rel: "canonical", href: canonical }],
	};
}

export function websiteJsonLd() {
	return {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: SITE.name,
		url: SITE.url,
		description: SITE.description,
		author: {
			"@type": "Person",
			name: SITE.author,
		},
	};
}

export function personJsonLd() {
	return {
		"@context": "https://schema.org",
		"@type": "Person",
		name: SITE.author,
		url: SITE.url,
		email: SITE.email,
		// TODO: add sameAs links when social URLs are final
		sameAs: [] as string[],
	};
}

export function blogPostingJsonLd(input: {
	title: string;
	description: string;
	path: string;
	date: string;
}) {
	return {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: input.title,
		description: input.description,
		datePublished: input.date,
		dateModified: input.date,
		url: absoluteUrl(input.path),
		author: {
			"@type": "Person",
			name: SITE.author,
		},
		publisher: {
			"@type": "Organization",
			name: SITE.name,
			url: SITE.url,
		},
		mainEntityOfPage: absoluteUrl(input.path),
		image: ogImageUrl(),
	};
}
