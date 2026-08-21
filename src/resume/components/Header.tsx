import { Link, Text, View } from "@react-pdf/renderer";
import { Fragment } from "react";
import { RESUME_DATA } from "../data";
import { styles } from "../styles";
import { RichText } from "./RichText";

export function Header() {
	const { name, contact, summary } = RESUME_DATA;

	return (
		<View style={styles.header}>
			<View style={styles.nameRow}>
				<Text style={styles.name}>{name.toUpperCase()}</Text>
				<Text style={styles.headerLocation}>{contact.location}</Text>
			</View>
			<Text style={styles.contactRow}>
				{contact.links.map((link, index) => (
					<Fragment key={link.href}>
						{index > 0 ? " | " : null}
						<Link src={link.href} style={styles.link}>
							{link.label}
						</Link>
					</Fragment>
				))}
			</Text>
			<RichText parts={summary} style={styles.summary} />
		</View>
	);
}
