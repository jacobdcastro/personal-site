import { StyleSheet } from "@react-pdf/renderer";
import { FONT_FAMILY } from "./fonts";

// LaTeX article 10pt scale (CMR10 body, CMBX10 headings)
const BODY_SIZE = 10;
const NAME_SIZE = 18;
const SECTION_TITLE_SIZE = 10;

export const styles = StyleSheet.create({
	page: {
		fontFamily: FONT_FAMILY,
		fontSize: BODY_SIZE,
		lineHeight: 1.2,
		color: "#000000",
		backgroundColor: "#ffffff",
		paddingTop: 32,
		paddingBottom: 28,
		paddingHorizontal: 44,
	},
	header: {
		marginBottom: 14,
	},
	name: {
		fontSize: NAME_SIZE,
		fontWeight: "bold",
		lineHeight: 1.1,
		marginBottom: 6,
	},
	contactRow: {
		fontSize: BODY_SIZE,
		lineHeight: 1.2,
	},
	section: {
		marginBottom: 12,
	},
	sectionTitleRow: {
		flexDirection: "row",
		alignItems: "flex-end",
		marginBottom: 6,
	},
	sectionTitle: {
		fontSize: SECTION_TITLE_SIZE,
		fontWeight: "bold",
		textDecoration: "underline",
		marginRight: 8,
	},
	sectionTitleRule: {
		flex: 1,
		borderBottomWidth: 0.75,
		borderBottomColor: "#000000",
		marginBottom: 2,
	},
	skillRow: {
		flexDirection: "row",
		marginBottom: 3,
	},
	skillLabel: {
		fontWeight: "bold",
		fontSize: BODY_SIZE,
		width: 96,
	},
	skillItems: {
		flex: 1,
		fontSize: BODY_SIZE,
		lineHeight: 1.2,
	},
	job: {
		marginBottom: 8,
	},
	jobHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 1,
	},
	jobRole: {
		fontWeight: "bold",
		fontSize: BODY_SIZE,
	},
	jobDates: {
		fontSize: BODY_SIZE,
	},
	jobCompany: {
		fontWeight: "bold",
		fontSize: BODY_SIZE,
	},
	jobLocation: {
		fontSize: BODY_SIZE,
	},
	bulletList: {
		paddingLeft: 10,
		marginTop: 2,
	},
	bulletItem: {
		flexDirection: "row",
		marginBottom: 2,
	},
	bulletMarker: {
		width: 10,
		fontSize: BODY_SIZE,
	},
	bulletText: {
		flex: 1,
		fontSize: BODY_SIZE,
		lineHeight: 1.2,
	},
	projectName: {
		fontWeight: "bold",
		fontSize: BODY_SIZE,
	},
	link: {
		color: "#000000",
		textDecoration: "underline",
	},
});

export const noHyphenation = (word: string) => [word];
