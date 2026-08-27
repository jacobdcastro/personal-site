export type TextPart = string | { text: string; href: string };

export interface ContactLink {
	label: string;
	href: string;
}

export interface ResumeContact {
	location: string;
	links: ContactLink[];
}

export interface SkillCategory {
	label: string;
	items: string;
}

export interface ExperienceEntry {
	company: string;
	/** omitted when the placement adds no signal (e.g. every role was remote) */
	location?: string;
	role: string;
	dates: string;
	bullets: TextPart[][];
}

export interface ProjectEntry {
	name: string;
	href?: string;
	bullets: TextPart[][];
}

export interface ResumeData {
	name: string;
	contact: ResumeContact;
	summary: TextPart[];
	skills: SkillCategory[];
	experience: ExperienceEntry[];
	projects: ProjectEntry[];
	education: TextPart[];
}
