/** calendar date, YYYY-MM-DD */
export type ISODate = string;

export function formatEntryDate(date: ISODate): string {
	return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
		timeZone: "UTC",
	});
}
