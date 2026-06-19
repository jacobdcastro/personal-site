import { Component, type ReactNode } from "react";
import type { GalaxyLink } from "../../data/links";
import { PlainNav } from "../nav/PlainNav";

interface GalaxyErrorBoundaryProps {
	links: GalaxyLink[];
	onFallback: () => void;
	children: ReactNode;
}

interface GalaxyErrorBoundaryState {
	hasError: boolean;
}

export class GalaxyErrorBoundary extends Component<
	GalaxyErrorBoundaryProps,
	GalaxyErrorBoundaryState
> {
	state: GalaxyErrorBoundaryState = { hasError: false };

	static getDerivedStateFromError(): GalaxyErrorBoundaryState {
		return { hasError: true };
	}

	componentDidCatch() {
		this.props.onFallback();
	}

	render() {
		if (this.state.hasError) {
			return <PlainNav links={this.props.links} />;
		}
		return this.props.children;
	}
}
