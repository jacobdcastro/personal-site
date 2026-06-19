import {
	createRootRoute,
	HeadContent,
	Link,
	Scripts,
} from "@tanstack/react-router";

import { NotFound } from "../components/NotFound";
import { SITE } from "../lib/site";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
			{ name: "theme-color", content: SITE.themeColor },
		],
		links: [
			{ rel: "stylesheet", href: appCss },
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap",
			},
			{ rel: "icon", href: "/favicon.ico", sizes: "any" },
			{ rel: "icon", href: "/favicon-32.png", sizes: "32x32", type: "image/png" },
			{ rel: "icon", href: "/favicon-16.png", sizes: "16x16", type: "image/png" },
			{ rel: "manifest", href: "/manifest.json" },
			{
				rel: "alternate",
				type: "application/rss+xml",
				title: SITE.title,
				href: "/feed.xml",
			},
		],
	}),
	notFoundComponent: NotFound,
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin=""
				/>
				<HeadContent />
			</head>
			<body>
				<a
					href="#main-content"
					className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-1/2 focus:z-[200] focus:-translate-x-1/2 focus:rounded-md focus:border focus:border-neutral-600 focus:bg-black focus:px-4 focus:py-2 focus:font-sans focus:text-sm focus:text-neutral-100"
				>
					Skip to main content
				</a>
				<Link
					to="/"
					data-ship-cursor="terminal"
					className="fixed top-4 left-4 z-50 font-serif text-sm tracking-tight text-neutral-300 transition-colors hover:text-neutral-100"
				>
					Jacob D. Castro
				</Link>
				<main id="main-content">{children}</main>
				<Scripts />
			</body>
		</html>
	);
}
