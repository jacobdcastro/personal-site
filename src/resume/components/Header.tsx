import { Link, Text, View } from "@react-pdf/renderer";
import { Fragment } from "react";
import { RESUME_DATA } from "../data";
import { styles } from "../styles";

export function Header() {
	const { name, contact } = RESUME_DATA;

	return (
		<View style={styles.header}>
			<Text style={styles.name}>{name.toUpperCase()}</Text>
			<Text style={styles.contactRow}>
				{contact.location}
				{contact.links.map((link) => (
					<Fragment key={link.href}>
						{" | "}
						<Link src={link.href} style={styles.link}>
							{link.label}
						</Link>
					</Fragment>
				))}
			</Text>
		</View>
	);
}
