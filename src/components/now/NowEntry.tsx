import {
	Children,
	createContext,
	isValidElement,
	type ReactNode,
	useContext,
} from "react";
import { formatEntryDate, type ISODate } from "../../lib/now-date";

/** "latest" renders only the newest entry, "all" renders every entry in the file */
export type NowMode = "latest" | "all";

interface NowContextValue {
	readonly mode: NowMode;
	readonly latestDate: ISODate;
}

const NowContext = createContext<NowContextValue>({
	mode: "all",
	latestDate: "",
});

interface NowProviderProps {
	readonly mode: NowMode;
	readonly latestDate: ISODate;
	readonly children: ReactNode;
}

export function NowProvider({
	mode,
	latestDate,
	children,
}: NowProviderProps): ReactNode {
	return (
		<NowContext.Provider value={{ mode, latestDate }}>
			{children}
		</NowContext.Provider>
	);
}

interface NowEntryProps {
	readonly date: ISODate;
	readonly children: ReactNode;
}

/**
 * One dated snapshot inside src/content/now.mdx. /now renders whichever entry
 * carries the newest date; /now/archive renders them all.
 */
export function NowEntry({ date, children }: NowEntryProps): ReactNode {
	const { mode, latestDate } = useContext(NowContext);

	if (mode === "latest" && date !== latestDate) return null;

	return (
		<section className="now-entry" aria-label={formatEntryDate(date)}>
			<h2 className="now-entry-date">
				<time dateTime={date}>{formatEntryDate(date)}</time>
			</h2>
			{children}
		</section>
	);
}

/**
 * Walks a rendered MDX tree and pulls the date off every <NowEntry>, so the
 * file's own entries are the source of truth — no frontmatter to keep in sync.
 */
export function collectEntryDates(node: ReactNode): readonly ISODate[] {
	const dates: ISODate[] = [];

	function visit(current: ReactNode): void {
		Children.forEach(current, (child) => {
			if (!isValidElement<{ date?: unknown; children?: ReactNode }>(child)) {
				return;
			}

			if (child.type === NowEntry) {
				const { date } = child.props;
				if (typeof date === "string") dates.push(date);
				return;
			}

			visit(child.props.children);
		});
	}

	visit(node);
	// ISO dates sort lexicographically, so this ends up newest first
	return dates.sort().reverse();
}
