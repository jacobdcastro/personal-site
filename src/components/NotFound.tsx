import { Link } from "@tanstack/react-router";

export function NotFound() {
	return (
		<div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-start justify-center px-6 py-12">
			<h1 className="text-4xl font-bold">Page not found</h1>
			<p className="mt-4 text-neutral-400">
				The page you are looking for does not exist or may have moved.
			</p>
			<Link
				to="/"
				className="mt-8 font-sans text-lg text-neutral-300 underline-offset-4 hover:text-neutral-100 hover:underline"
			>
				Back to home
			</Link>
		</div>
	);
}
