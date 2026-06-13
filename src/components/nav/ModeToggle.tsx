import { useNavStore } from "../../store/nav-store";

export function ModeToggle() {
	const mode = useNavStore((s) => s.mode);
	const setMode = useNavStore((s) => s.setMode);

	return (
		<button
			type="button"
			data-ship-cursor="terminal"
			onClick={() => setMode(mode === "3d" ? "list" : "3d")}
			className="fixed bottom-4 right-4 z-50 rounded-md border border-neutral-700 bg-black/80 px-3 py-1.5 font-sans text-xs text-neutral-400 backdrop-blur-sm transition-colors hover:border-neutral-500 hover:text-neutral-200"
			aria-label={
				mode === "3d" ? "switch to plain link list" : "switch to 3D galaxy view"
			}
		>
			{mode === "3d" ? "disable 3D" : "enable 3D"}
		</button>
	);
}
