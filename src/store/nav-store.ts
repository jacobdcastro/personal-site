import { create } from "zustand";
import { persist } from "zustand/middleware";

type Mode = "3d" | "list";

interface NavState {
	// persisted: survives page reload
	mode: Mode;
	setMode: (m: Mode) => void;

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

			hoveredId: null,
			setHovered: (id) => set({ hoveredId: id }),

			focusedLinkId: null,
			setFocusedLink: (id) => set({ focusedLinkId: id }),

			isDragging: false,
			setDragging: (v) => set({ isDragging: v }),
		}),
		{
			name: "galaxy-nav",
			// only persist the user's mode preference
			partialize: (s) => ({ mode: s.mode }),
		},
	),
);
