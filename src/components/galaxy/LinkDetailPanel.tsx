import { useEffect } from "react";
import type { GalaxyLink } from "../../data/links";
import { useNavStore } from "../../store/nav-store";

interface LinkDetailPanelProps {
	links: GalaxyLink[];
}

function linkTarget(href: string) {
	return href.startsWith("http") || href.startsWith("mailto") ? "_blank" : undefined;
}

function linkRel(href: string) {
	return href.startsWith("http") ? "noopener noreferrer" : undefined;
}

export function LinkDetailPanel({ links }: LinkDetailPanelProps) {
	const focusedLinkId = useNavStore((s) => s.focusedLinkId);
	const setFocusedLink = useNavStore((s) => s.setFocusedLink);
	const link = links.find((l) => l.id === focusedLinkId);

	useEffect(() => {
		if (!focusedLinkId) return;

		function handleKeyDown(e: KeyboardEvent) {
			if (e.key === "Escape") setFocusedLink(null);
		}

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [focusedLinkId, setFocusedLink]);

	if (!link) return null;

	return (
		<div className="pointer-events-none fixed inset-0 z-20 flex items-end justify-center px-6 pb-28">
			<div
				data-ship-cursor="terminal"
				className="pointer-events-auto w-full max-w-lg border border-[#8ec8ff]/40 bg-black/75 px-6 py-5 shadow-[0_0_40px_rgba(142,200,255,0.08)] backdrop-blur-md transition-all duration-500 ease-out"
				role="dialog"
				aria-labelledby="link-detail-title"
				aria-modal
			>
				<div className="mb-3 flex items-center justify-between gap-4">
					<span className="font-mono text-[9px] tracking-[0.2em] text-[#ffd4a8]/80 uppercase">
						target locked
					</span>
					<button
						type="button"
						onClick={() => setFocusedLink(null)}
						className="font-mono text-[10px] tracking-wide text-[#8ec8ff]/70 transition-colors hover:text-[#8ec8ff]"
					>
						unlock ↵ esc
					</button>
				</div>
				<h2 id="link-detail-title" className="font-serif text-lg text-white">
					{link.label}
				</h2>
				<p className="mt-2 font-sans text-sm leading-relaxed text-white/70">
					{link.description}
				</p>
				<a
					href={link.href}
					target={linkTarget(link.href)}
					rel={linkRel(link.href)}
					className="mt-4 inline-block font-mono text-xs tracking-wide text-white/90 underline decoration-white/40 underline-offset-4 transition-colors hover:text-white hover:decoration-white/70"
				>
					{link.href.replace(/^mailto:/, "")}
				</a>
			</div>
		</div>
	);
}
