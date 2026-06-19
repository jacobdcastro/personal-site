import { useNavStore } from "../../store/nav-store";

export function RenderToggle() {
	const renderStyle = useNavStore((s) => s.renderStyle);
	const setRenderStyle = useNavStore((s) => s.setRenderStyle);

	return (
		<button
			type="button"
			data-ship-cursor="terminal"
			onClick={() =>
				setRenderStyle(renderStyle === "webgl" ? "ascii" : "webgl")
			}
			className="fixed bottom-4 right-4 z-50 rounded-md border border-neutral-700 bg-black/80 px-3 py-1.5 font-sans text-xs text-neutral-400 backdrop-blur-sm transition-colors hover:border-neutral-500 hover:text-neutral-200"
			aria-label={
				renderStyle === "webgl"
					? "switch to ASCII galaxy view"
					: "switch to 3D galaxy view"
			}
		>
			{renderStyle === "webgl" ? "ASCII" : "3D"}
		</button>
	);
}
