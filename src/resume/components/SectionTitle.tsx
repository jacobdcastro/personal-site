import { Text, View } from "@react-pdf/renderer";
import { styles } from "../styles";

interface SectionTitleProps {
	children: string;
}

export function SectionTitle({ children }: SectionTitleProps) {
	return (
		<View style={styles.sectionTitleRow}>
			<Text style={styles.sectionTitle}>{children.toUpperCase()}</Text>
			<View style={styles.sectionTitleRule} />
		</View>
	);
}
