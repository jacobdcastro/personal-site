import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect } from "react";
import { ShipCursor } from "../components/cursor/ShipCursor";
import { GalaxyErrorBoundary } from "../components/galaxy/GalaxyErrorBoundary";
import { LinkDetailPanel } from "../components/galaxy/LinkDetailPanel";
import { ModeToggle } from "../components/nav/ModeToggle";
import { PlainNav } from "../components/nav/PlainNav";
import { RenderToggle } from "../components/nav/RenderToggle";
import { JsonLd } from "../components/seo/JsonLd";
import { LINKS } from "../data/links";
import { buildPageHead, personJsonLd, websiteJsonLd } from "../lib/seo";
import { SITE } from "../lib/site";
import { useNavStore } from "../store/nav-store";

const GalaxyCanvas = lazy(() =>
	import("../components/galaxy/GalaxyCanvas").then((mod) => ({
		default: mod.GalaxyCanvas,
	})),
);

const GalaxyAscii = lazy(() =>
	import("../components/galaxy/GalaxyAscii").then((mod) => ({
		default: mod.GalaxyAscii,
	})),
);

export const Route = createFileRoute("/")({
	head: () =>
		buildPageHead({
			title: SITE.title,
			description: SITE.description,
			path: "/",
		}),
	component: Home,
});

function canUseWebGL() {
	try {
		const canvas = document.createElement("canvas");
		return !!(
			canvas.getContext("webgl") ?? canvas.getContext("experimental-webgl")
		);
	} catch {
		return false;
	}
}

function Home() {
	const mode = useNavStore((s) => s.mode);
	const renderStyle = useNavStore((s) => s.renderStyle);
	const setMode = useNavStore((s) => s.setMode);
	const setFocusedLink = useNavStore((s) => s.setFocusedLink);

	useEffect(() => {
		const persisted = localStorage.getItem("galaxy-nav");
		if (persisted) return;

		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		if (mq.matches || !canUseWebGL()) {
			setMode("list");
		}
	}, [setMode]);

	useEffect(() => {
		if (mode !== "3d") setFocusedLink(null);
	}, [mode, setFocusedLink]);

	return (
		<div className="relative h-screen h-dvh w-full overflow-hidden bg-black">
			<JsonLd data={[websiteJsonLd(), personJsonLd()]} />

			{mode === "3d" ? (
				<GalaxyErrorBoundary links={LINKS} onFallback={() => setMode("list")}>
					<Suspense fallback={<PlainNav links={LINKS} />}>
						{renderStyle === "webgl" ? (
							<GalaxyCanvas links={LINKS} />
						) : (
							<GalaxyAscii links={LINKS} />
						)}
					</Suspense>
				</GalaxyErrorBoundary>
			) : (
				<PlainNav links={LINKS} />
			)}

			{mode === "3d" && (
				<>
					<ShipCursor />
					<LinkDetailPanel links={LINKS} />
					<RenderToggle />
				</>
			)}

			{mode === "3d" && <PlainNav links={LINKS} hidden />}

			<ModeToggle />
		</div>
	);
}
