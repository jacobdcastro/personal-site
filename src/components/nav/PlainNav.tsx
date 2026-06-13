import type { GalaxyLink } from "../../data/links";
import { useNavStore } from "../../store/nav-store";

interface PlainNavProps {
	links: GalaxyLink[];
	/** when true, renders visually hidden but still accessible to crawlers and screen readers */
	hidden?: boolean;
}

export function PlainNav({ links, hidden = false }: PlainNavProps) {
	const mode = useNavStore((s) => s.mode);
	const setFocusedLink = useNavStore((s) => s.setFocusedLink);

	function handleFocus(linkId: string) {
		if (hidden && mode === "3d") setFocusedLink(linkId);
	}

	function handleBlur() {
		if (hidden && mode === "3d") setFocusedLink(null);
	}

	return (
		<nav
			aria-label="site links"
			className={
				hidden
					? "sr-only"
					: "flex h-full w-full flex-col items-center justify-center gap-8 px-6 py-12"
			}
		>
			<ul
				className={
					hidden ? undefined : "flex flex-col gap-4 font-sans text-neutral-300"
				}
			>
				{links.map((link) => (
					<li key={link.id}>
						<a
							href={link.href}
							onFocus={() => handleFocus(link.id)}
							onBlur={handleBlur}
							target={
								link.href.startsWith("http") || link.href.startsWith("mailto")
									? "_blank"
									: undefined
							}
							rel={
								link.href.startsWith("http") ? "noopener noreferrer" : undefined
							}
							className={
								hidden
									? undefined
									: "text-2xl hover:text-neutral-100 transition-colors"
							}
						>
							{link.label}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
}
