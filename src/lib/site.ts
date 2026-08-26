export const SITE = {
	name: "Jacob D. Castro",
	title: "Jacob D. Castro | Fullstack Software Engineer",
	description:
		"Fullstack software engineer building Ethereum systems and developer tools. Writing, experiments, and open source.",
	url: "https://jacobdcastro.com",
	author: "Jacob D. Castro",
	email: "me@jacobdcastro.com",
	twitterHandle: "@jacobdcastro",
	ogImagePath: "/og.png",
	ogImageAlt: "ASCII art of Saturn and its rings",
	locale: "en_US",
	themeColor: "#0a0a0a",
} as const;

export function absoluteUrl(path: string) {
	const base = SITE.url.replace(/\/$/, "");
	const normalized = path.startsWith("/") ? path : `/${path}`;
	return `${base}${normalized}`;
}

export function ogImageUrl() {
	return absoluteUrl(SITE.ogImagePath);
}
