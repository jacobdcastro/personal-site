import type { GalaxyLink } from "../data/links";

export function isPageLink(link: GalaxyLink) {
	return link.page === true;
}
