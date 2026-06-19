import type { GalaxyLink } from "../../data/links";
import { useNavStore } from "../../store/nav-store";
import { GalaxyAscii } from "./GalaxyAscii";
import { GalaxyCanvas } from "./GalaxyCanvas";

interface GalaxyViewProps {
	links: GalaxyLink[];
}

export function GalaxyView({ links }: GalaxyViewProps) {
	const renderStyle = useNavStore((s) => s.renderStyle);
	const showWebgl = renderStyle === "webgl";

	return (
		<div className="relative h-full w-full">
			<div
				className={`absolute inset-0${showWebgl ? "" : " invisible pointer-events-none"}`}
				aria-hidden={!showWebgl}
			>
				<GalaxyCanvas links={links} active={showWebgl} />
			</div>
			<div
				className={`absolute inset-0${showWebgl ? " invisible pointer-events-none" : ""}`}
				aria-hidden={showWebgl}
			>
				<GalaxyAscii links={links} active={!showWebgl} />
			</div>
		</div>
	);
}
