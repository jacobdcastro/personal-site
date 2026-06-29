import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { renderToBuffer } from "@react-pdf/renderer";
import { ResumeDocument } from "../src/resume/ResumeDocument.tsx";

const root = join(import.meta.dirname, "..");
const filename = process.argv[2] ?? "resume.pdf";
const out = join(root, "public", filename);

const buffer = await renderToBuffer(<ResumeDocument />);
writeFileSync(out, buffer);
console.log(`generated public/${filename}`);
