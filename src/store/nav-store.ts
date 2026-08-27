import { useSyncExternalStore } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Mode = "3d" | "list";
type RenderStyle = "webgl" | "ascii";

interface NavState {
	// persisted: survives page reload
	mode: Mode;
	setMode: (m: Mode) => void;
	// ephemeral: resets to webgl each session
	renderStyle: RenderStyle;
	setRenderStyle: (s: RenderStyle) => void;

	// ephemeral: reset on each session
	hoveredId: string | null;
	setHovered: (id: string | null) => void;
	focusedLinkId: string | null;
	setFocusedLink: (id: string | null) => void;
	isDragging: boolean;
	setDragging: (v: boolean) => void;
}

export const useNavStore = create<NavState>()(
	persist(
		(set) => ({
			mode: "3d",
			setMode: (mode) => set({ mode }),
			renderStyle: "webgl",
			setRenderStyle: (renderStyle) => set({ renderStyle }),

			hoveredId: null,
			setHovered: (id) =>
				set((s) => (s.hoveredId === id ? s : { hoveredId: id })),

			focusedLinkId: null,
			setFocusedLink: (id) => set({ focusedLinkId: id }),

			isDragging: false,
			setDragging: (v) => set({ isDragging: v }),
		}),
		{
			name: "galaxy-nav",
			version: 1,
			migrate: (persisted) => {
				const state = persisted as { mode?: Mode };
				return { mode: state.mode ?? "3d" };
			},
			// only persist the user's galaxy/list mode preference
			partialize: (s) => ({ mode: s.mode }),
		},
	),
);

export function useNavStoreHydrated() {
	return useSyncExternalStore(
		(onStoreChange) => useNavStore.persist.onFinishHydration(onStoreChange),
		() => useNavStore.persist.hasHydrated(),
		() => false,
	);
}
