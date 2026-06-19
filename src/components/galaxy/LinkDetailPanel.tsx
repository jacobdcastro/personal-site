import { useEffect, useRef } from "react";
import type { GalaxyLink } from "../../data/links";
import { useNavStore } from "../../store/nav-store";

interface LinkDetailPanelProps {
	links: GalaxyLink[];
}

function linkTarget(href: string) {
	return href.startsWith("http") ? "_blank" : undefined;
}

function linkRel(href: string) {
	return href.startsWith("http") ? "noopener noreferrer" : undefined;
}

function getFocusableElements(container: HTMLElement) {
	return Array.from(
		container.querySelectorAll<HTMLElement>(
			'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
		),
	);
}

export function LinkDetailPanel({ links }: LinkDetailPanelProps) {
	const focusedLinkId = useNavStore((s) => s.focusedLinkId);
	const setFocusedLink = useNavStore((s) => s.setFocusedLink);
	const link = links.find((l) => l.id === focusedLinkId);
	const dialogRef = useRef<HTMLDivElement>(null);
	const closeRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (!focusedLinkId) return;

		closeRef.current?.focus();

		function handleKeyDown(e: KeyboardEvent) {
			if (e.key === "Escape") {
				setFocusedLink(null);
				return;
			}

			if (e.key !== "Tab" || !dialogRef.current) return;

			const focusable = getFocusableElements(dialogRef.current);
			if (focusable.length === 0) return;

			const first = focusable[0];
			const last = focusable[focusable.length - 1];
			const active = document.activeElement as HTMLElement | null;

			if (e.shiftKey && active === first) {
				e.preventDefault();
				last.focus();
			} else if (!e.shiftKey && active === last) {
				e.preventDefault();
				first.focus();
			}
		}

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [focusedLinkId, setFocusedLink]);

	if (!link) return null;

	const external = link.href.startsWith("http");

	return (
		<div className="pointer-events-none fixed inset-0 z-20 flex items-end justify-center px-6 pb-28">
			<div
				ref={dialogRef}
				data-ship-cursor="terminal"
				className="pointer-events-auto w-full max-w-lg border border-[#8ec8ff]/40 bg-black/75 px-6 py-5 shadow-[0_0_40px_rgba(142,200,255,0.08)] backdrop-blur-md transition-all duration-500 ease-out"
				role="dialog"
				aria-labelledby="link-detail-title"
				aria-modal="true"
			>
				<div className="mb-3 flex items-center justify-between gap-4">
					<span className="font-mono text-[9px] tracking-[0.2em] text-[#ffd4a8]/80 uppercase">
						target locked
					</span>
					<button
						ref={closeRef}
						type="button"
						onClick={() => setFocusedLink(null)}
						aria-label="Close link details"
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
					{external && <span className="sr-only"> (opens in new tab)</span>}
				</a>
			</div>
		</div>
	);
}
