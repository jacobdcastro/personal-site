import { Link, Text } from "@react-pdf/renderer";
import type { Style } from "@react-pdf/types";
import { noHyphenation, styles } from "../styles";
import type { TextPart } from "../types";

interface RichTextProps {
	parts: TextPart[];
	style?: Style;
}

export function RichText({ parts, style }: RichTextProps) {
	return (
		<Text style={style} hyphenationCallback={noHyphenation}>
			{parts.map((part) =>
				typeof part === "string" ? (
					part
				) : (
					<Link key={part.href} src={part.href} style={styles.link}>
						{part.text}
					</Link>
				),
			)}
		</Text>
	);
}
