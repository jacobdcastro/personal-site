import { Text, View } from "@react-pdf/renderer";
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

export function ExperienceSection() {
	const jobs = RESUME_DATA.experience;

	return (
		<View style={styles.section}>
			<SectionTitle>Experience</SectionTitle>
			{jobs.map((job) => (
				<View key={`${job.company}-${job.dates}`} style={styles.job}>
					<View style={styles.jobHeader}>
						<Text style={styles.jobRole}>{job.role}</Text>
						<Text style={styles.jobDates}>{job.dates}</Text>
					</View>
					<View style={styles.jobHeader}>
						<Text style={styles.jobCompany}>{job.company}</Text>
						<Text style={styles.jobLocation}>{job.location ?? ""}</Text>
					</View>
					<View style={styles.bulletList}>
						{job.bullets.map((bullet) => (
							<View
								key={`${job.company}-${bulletKey(bullet)}`}
								style={styles.bulletItem}
							>
								<Text style={styles.bulletMarker}>•</Text>
								<RichText parts={bullet} style={styles.bulletText} />
							</View>
						))}
					</View>
				</View>
			))}
		</View>
	);
}
