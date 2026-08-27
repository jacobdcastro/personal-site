import { ClientOnly, createFileRoute } from "@tanstack/react-router";
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
import { useNavStore, useNavStoreHydrated } from "../store/nav-store";

const GalaxyView = lazy(() =>
	import("../components/galaxy/GalaxyView").then((mod) => ({
		default: mod.GalaxyView,
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
	const navHydrated = useNavStoreHydrated();
	const mode = useNavStore((s) => s.mode);
	const setMode = useNavStore((s) => s.setMode);
	const setFocusedLink = useNavStore((s) => s.setFocusedLink);

	useEffect(() => {
		if (!navHydrated) return;

		const persisted = localStorage.getItem("galaxy-nav");
		if (persisted) return;

		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		if (mq.matches || !canUseWebGL()) {
			setMode("list");
		}
	}, [navHydrated, setMode]);

	useEffect(() => {
		if (mode !== "3d") setFocusedLink(null);
	}, [mode, setFocusedLink]);

	useEffect(() => {
		document.documentElement.classList.add("viewport-locked");

		return () => {
			document.documentElement.classList.remove("viewport-locked");
		};
	}, []);

	return (
		<div className="fixed inset-0 h-dvh w-full overflow-hidden bg-black">
			<JsonLd data={[websiteJsonLd(), personJsonLd()]} />

			{!navHydrated ? null : mode === "3d" ? (
				<ClientOnly fallback={null}>
					<GalaxyErrorBoundary links={LINKS}>
						<Suspense fallback={null}>
							<GalaxyView links={LINKS} />
						</Suspense>
					</GalaxyErrorBoundary>
				</ClientOnly>
			) : (
				<PlainNav links={LINKS} />
			)}

			{navHydrated && mode === "3d" && (
				<>
					<ShipCursor />
					<LinkDetailPanel links={LINKS} />
					<RenderToggle />
				</>
			)}

			{navHydrated && mode === "3d" && <PlainNav links={LINKS} hidden />}

			{navHydrated && <ModeToggle />}
		</div>
	);
}
