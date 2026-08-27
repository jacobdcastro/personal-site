import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

// run from project root via `bun scripts/generate-seo-files.ts`
const root = join(import.meta.dirname, "..");
const publicDir = join(root, "public");
const postsDir = join(root, "src/content/posts");

// keep in sync with src/lib/site.ts — duplicated here so the script stays standalone
const SITE_URL = "https://jacobdcastro.com";
const SITE_TITLE = "Jacob D. Castro | Fullstack Software Engineer";
const SITE_DESCRIPTION =
	"Fullstack software engineer building Ethereum systems and developer tools. Writing, experiments, and open source.";
const SITE_EMAIL = "me@jacobdcastro.com";

interface PostFrontmatter {
	title: string;
	date: string;
	description: string;
	slug: string;
}

function loadPosts(): PostFrontmatter[] {
	const files = readdirSync(postsDir).filter((file) => file.endsWith(".mdx"));
	return files
		.map((file) => {
			const raw = readFileSync(join(postsDir, file), "utf8");
			const { data } = matter(raw);
			return data as PostFrontmatter;
		})
		.sort((a, b) => (a.date < b.date ? 1 : -1));
}

function xmlEscape(value: string) {
	return value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&apos;");
}

function buildSitemap(posts: PostFrontmatter[]) {
	const urls = [
		{ loc: `${SITE_URL}/`, changefreq: "monthly", priority: "1.0" },
		{ loc: `${SITE_URL}/about`, changefreq: "monthly", priority: "0.9" },
		{ loc: `${SITE_URL}/now`, changefreq: "weekly", priority: "0.8" },
		{ loc: `${SITE_URL}/blog`, changefreq: "weekly", priority: "0.8" },
		...posts.map((post) => ({
			loc: `${SITE_URL}/blog/${post.slug}`,
			changefreq: "monthly",
			priority: "0.7",
			lastmod: post.date,
		})),
	];

	const body = urls
		.map((entry) => {
			const lastmod = "lastmod" in entry ? `\n    <lastmod>${entry.lastmod}</lastmod>` : "";
			return `  <url>
    <loc>${entry.loc}</loc>${lastmod}
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`;
		})
		.join("\n");

	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}

function buildRss(posts: PostFrontmatter[]) {
	const items = posts
		.map(
			(post) => `    <item>
      <title>${xmlEscape(post.title)}</title>
      <link>${SITE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${post.slug}</guid>
      <pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>
      <description>${xmlEscape(post.description)}</description>
    </item>`,
		)
		.join("\n");

	return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xmlEscape(SITE_TITLE)}</title>
    <link>${SITE_URL}/blog</link>
    <description>${xmlEscape(SITE_DESCRIPTION)}</description>
    <language>en-us</language>
    <managingEditor>${SITE_EMAIL} (${SITE_TITLE})</managingEditor>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;
}

const posts = loadPosts();
writeFileSync(join(publicDir, "sitemap.xml"), buildSitemap(posts));
writeFileSync(join(publicDir, "feed.xml"), buildRss(posts));
console.log("generated public/sitemap.xml and public/feed.xml");
