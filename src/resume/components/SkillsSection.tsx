import { Text, View } from "@react-pdf/renderer";
import { RESUME_DATA } from "../data";
import { styles } from "../styles";
import { SectionTitle } from "./SectionTitle";

export function SkillsSection() {
	return (
		<View style={styles.section}>
			<SectionTitle>Skills</SectionTitle>
			{RESUME_DATA.skills.map((category) => (
				<View key={category.label} style={styles.skillRow}>
					<Text style={styles.skillLabel}>{category.label}</Text>
					<Text style={styles.skillItems}>{category.items}</Text>
				</View>
			))}
		</View>
	);
}
