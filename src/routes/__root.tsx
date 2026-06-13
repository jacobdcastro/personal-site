import { TanStackDevtools } from "@tanstack/react-devtools";
import {
	createRootRoute,
	HeadContent,
	Link,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

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
				<header className="border-b border-neutral-800">
					<nav className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4 font-sans text-sm">
						<Link to="/" className="font-bold tracking-tight">
							XIV Systems
						</Link>
						<div className="flex gap-6 text-neutral-400">
							<Link
								to="/"
								className="hover:text-neutral-100"
								activeProps={{ className: "text-neutral-100" }}
							>
								Home
							</Link>
							<Link
								to="/blog"
								className="hover:text-neutral-100"
								activeProps={{ className: "text-neutral-100" }}
							>
								Blog
							</Link>
							<a href="/resume.pdf" className="hover:text-neutral-100">
								Resumé
							</a>
						</div>
					</nav>
				</header>
				<main>{children}</main>
				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}
