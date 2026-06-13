import { create } from "zustand";

interface SceneState {
	hoveredId: string | null;
	setHovered: (id: string | null) => void;
	reducedMotion: boolean;
	setReducedMotion: (value: boolean) => void;
}

export const useSceneStore = create<SceneState>((set) => ({
	hoveredId: null,
	setHovered: (id) => set({ hoveredId: id }),
	reducedMotion: false,
	setReducedMotion: (value) => set({ reducedMotion: value }),
}));
