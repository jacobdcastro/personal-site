import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect } from "react";
import { ShipCursor } from "../components/cursor/ShipCursor";
import { LinkDetailPanel } from "../components/galaxy/LinkDetailPanel";
import { ModeToggle } from "../components/nav/ModeToggle";
import { PlainNav } from "../components/nav/PlainNav";
import { LINKS } from "../data/links";
import { useNavStore } from "../store/nav-store";

// client-only — Canvas cannot run on the server
const GalaxyCanvas = lazy(() =>
	import("../components/galaxy/GalaxyCanvas").then((mod) => ({
		default: mod.GalaxyCanvas,
	})),
);

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	const mode = useNavStore((s) => s.mode);
	const setMode = useNavStore((s) => s.setMode);
	const setFocusedLink = useNavStore((s) => s.setFocusedLink);

	// default to list mode when the user prefers reduced motion (only on first visit)
	useEffect(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		if (mq.matches) {
			const persisted = localStorage.getItem("galaxy-nav");
			if (!persisted) setMode("list");
		}
	}, [setMode]);

	useEffect(() => {
		if (mode !== "3d") setFocusedLink(null);
	}, [mode, setFocusedLink]);

	return (
		<div className="relative h-screen w-full overflow-hidden bg-black">
			{mode === "3d" ? (
				<Suspense fallback={null}>
					<GalaxyCanvas links={LINKS} />
				</Suspense>
			) : (
				<PlainNav links={LINKS} />
			)}

			{mode === "3d" && (
				<>
					<ShipCursor />
					<LinkDetailPanel links={LINKS} />
				</>
			)}

			{/* always in the DOM for screen readers + crawlers, visually hidden */}
			<PlainNav links={LINKS} hidden />

			<ModeToggle />
		</div>
	);
}
