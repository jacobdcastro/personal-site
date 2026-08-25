import { Link, Text, View } from "@react-pdf/renderer";
import { RESUME_DATA } from "../data";
import { styles } from "../styles";
import type { TextPart } from "../types";
import { RichText } from "./RichText";
import { SectionTitle } from "./SectionTitle";

function bulletKey(parts: TextPart[]) {
	return parts
		.map((part) => (typeof part === "string" ? part : part.text))
		.join("");
}

export function ProjectsSection() {
	return (
		<View style={styles.section}>
			<SectionTitle>Projects</SectionTitle>
			<View style={styles.bulletList}>
				{RESUME_DATA.projects.map((project) => (
					<View key={project.name} style={styles.bulletItem}>
						<Text style={styles.bulletMarker}>•</Text>
						<Text style={styles.bulletText}>
							{project.href ? (
								<Link src={project.href} style={styles.link}>
									{project.name}
								</Link>
							) : (
								project.name
							)}
							{project.bullets.map((bullet) => (
								<RichText
									key={`${project.name}-${bulletKey(bullet)}`}
									parts={[": ", ...bullet]}
									style={styles.bulletText}
								/>
							))}
						</Text>
					</View>
				))}
			</View>
		</View>
	);
}
