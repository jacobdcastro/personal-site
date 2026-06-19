// update these values before launch — placeholders marked with TODO
export const SITE = {
	name: "XIV Systems",
	title: "XIV Systems | Jacob D. Castro",
	description: "Thoughts and doings of a crypto software engineer",
	/** TODO: confirm production URL */
	url: "https://xiv.systems",
	author: "Jacob D. Castro",
	/** TODO: confirm contact email */
	email: "jacob@xiv.systems",
	/** TODO: confirm handle */
	twitterHandle: "@jacobdcastro",
	/** TODO: add public/og.png and update this path */
	ogImagePath: "/og.png",
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
