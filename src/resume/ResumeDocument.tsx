import { Document, Page } from "@react-pdf/renderer";
import { EducationSection } from "./components/EducationSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { Header } from "./components/Header";
import { ProjectsSection } from "./components/ProjectsSection";
import { SkillsSection } from "./components/SkillsSection";
import "./fonts";
import { styles } from "./styles";

export function ResumeDocument() {
	return (
		<Document title="Jacob D. Castro - Resume" author="Jacob D. Castro">
			<Page size="LETTER" style={styles.page}>
				<Header />
				<SkillsSection />
				<ExperienceSection />
				<ProjectsSection />
				<EducationSection />
			</Page>
		</Document>
	);
}
