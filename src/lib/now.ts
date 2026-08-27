import type { ReactNode } from "react";
import { collectEntryDates } from "../components/now/NowEntry";
import type { ISODate } from "./now-date";

export { formatEntryDate, type ISODate } from "./now-date";

export interface NowFrontmatter {
	readonly title: string;
	readonly description: string;
}

/** MDX compiles to a component taking no props of its own */
type MdxComponent = (props: Record<string, never>) => ReactNode;

interface NowModule {
	frontmatter: NowFrontmatter;
	default: MdxComponent;
}

export interface NowPage {
	readonly frontmatter: NowFrontmatter;
	readonly Entries: MdxComponent;
	/** newest entry date in the file — what /now renders and stamps as last updated */
	readonly latestDate: ISODate;
	/** every entry date, newest first */
	readonly entryDates: readonly ISODate[];
}

const modules = import.meta.glob<NowModule>("../content/now.mdx", {
	eager: true,
});

const [nowModule] = Object.values(modules);

if (!nowModule) {
	throw new Error("src/content/now.mdx is missing");
}

const Entries = nowModule.default;
const entryDates = collectEntryDates(Entries({}));
const [latestDate = ""] = entryDates;

export const nowPage: NowPage = {
	frontmatter: nowModule.frontmatter,
	Entries,
	latestDate,
	entryDates,
};
