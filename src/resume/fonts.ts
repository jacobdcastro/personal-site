import { join } from "node:path";
import { Font } from "@react-pdf/renderer";

const fontsDir = join(import.meta.dirname, "../../public/fonts");

// matches LaTeX CMR / CMBX / CMTI / CMBXI hierarchy (see arXiv pdfs)
Font.register({
	family: "Computer Modern",
	fonts: [
		{ src: join(fontsDir, "cmunrm.ttf") },
		{ src: join(fontsDir, "cmunbx.ttf"), fontWeight: "bold" },
		{ src: join(fontsDir, "cmunti.ttf"), fontStyle: "italic" },
		{
			src: join(fontsDir, "cmunbi.ttf"),
			fontWeight: "bold",
			fontStyle: "italic",
		},
	],
});

export const FONT_FAMILY = "Computer Modern";
