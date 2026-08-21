import { View } from "@react-pdf/renderer";
import { RESUME_DATA } from "../data";
import { styles } from "../styles";
import { RichText } from "./RichText";
import { SectionTitle } from "./SectionTitle";

export function EducationSection() {
	return (
		<View style={styles.section}>
			<SectionTitle>Education</SectionTitle>
			<RichText parts={RESUME_DATA.education} style={styles.skillItems} />
		</View>
	);
}
