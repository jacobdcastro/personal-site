import {
	createRootRoute,
	HeadContent,
	Link,
	Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "XIV Systems | Jacob D. Castro",
			},
			{
				name: "description",
				content: "Thoughts and doings of a crypto software engineer",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap",
			},
		],
	}),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				<Link
					to="/"
					data-ship-cursor="terminal"
					className="fixed top-4 left-4 z-50 font-serif text-sm tracking-tight text-neutral-300 transition-colors hover:text-neutral-100"
				>
					Jacob D. Castro
				</Link>
				<main>{children}</main>
				<Scripts />
			</body>
		</html>
	);
}
