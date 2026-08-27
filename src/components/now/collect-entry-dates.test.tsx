import { describe, expect, it } from "vitest";
import { collectEntryDates, NowEntry } from "./NowEntry";

describe("collectEntryDates", () => {
	it("returns entry dates newest first regardless of file order", () => {
		const tree = (
			<>
				<NowEntry date="2026-06-14">June</NowEntry>
				<NowEntry date="2026-08-26">August</NowEntry>
				<NowEntry date="2025-12-01">December</NowEntry>
			</>
		);

		expect(collectEntryDates(tree)).toEqual([
			"2026-08-26",
			"2026-06-14",
			"2025-12-01",
		]);
	});

	it("finds entries nested inside other elements", () => {
		const tree = (
			<>
				<div>
					<NowEntry date="2026-01-02">January</NowEntry>
				</div>
				<NowEntry date="2026-03-04">March</NowEntry>
			</>
		);

		expect(collectEntryDates(tree)).toEqual(["2026-03-04", "2026-01-02"]);
	});

	it("returns nothing when the tree has no entries", () => {
		expect(collectEntryDates(<p>hi</p>)).toEqual([]);
	});
});
