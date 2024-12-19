use chrono::NaiveDateTime;
use comrak::{markdown_to_html, ComrakOptions};
use html_parser::{Dom, Node};
use serde::Deserialize;
use serde::Serialize;
use std::error::Error;
use std::fs::{self, File};
use std::io::Write;
use std::path::{Path, PathBuf};
use tera::{Context, Tera};
use walkdir::WalkDir;

#[derive(Deserialize, Debug)]
struct FrontMatter {
    title: String,
    date: String,
    description: Option<String>,
    tags: Option<Vec<String>>,
    slug: String,
}

#[derive(Serialize)]
struct Post {
    title: String,
    date: NaiveDateTime,
    description: Option<String>,
    tags: Option<Vec<String>>,
    content: String,
    slug: String,
}

impl Post {
    fn get_meta_description(&self) -> String {
        self.description.clone().unwrap_or_else(|| {
            // fallback to first 160 chars of content with stripped HTML
            let text = html2text::from_read(self.content.as_bytes(), 160).unwrap_or_default();
            text.chars().take(160).collect::<String>()
        })
    }
}

fn main() {
    // create output directory
    if let Err(e) = fs::create_dir_all("dist") {
        eprintln!("failed to create dist directory: {}", e);
        return;
    }

    // copy static assets
    copy_static_files();

    // process all markdown files
    let posts = process_markdown_files();
    println!("Found {} posts", posts.len());

    // process home.md separately
    let home_path = Path::new("content/home.md");
    let home_content = match process_home_file(home_path) {
        Ok(content) => content,
        Err(e) => {
            eprintln!("error processing home.md: {}", e);
            String::from("<h1>Welcome</h1>")
        }
    };

    // create template context
    let mut context = tera::Context::new();
    context.insert("posts", &posts);
    context.insert("home_content", &home_content);

    // generate all HTML files
    generate_html_files(posts);
}

// TODO: rename to generate_posts
fn process_markdown_files() -> Vec<Post> {
    let mut posts: Vec<Post> = Vec::new();

    println!("searching for markdown files in content directory...");

    for entry in WalkDir::new("content")
        .into_iter()
        .filter_entry(|e| !is_hidden(e))
        .filter_map(|e| e.ok())
    {
        // skip home.md
        if entry.file_name() == "home.md" {
            continue;
        }

        if entry.path().extension().map_or(false, |ext| ext == "md") {
            println!("found markdown file: {}", entry.path().display());
            match process_markdown_file(entry.path()) {
                Ok(post) => {
                    println!("successfully processed post: {}", post.title);
                    posts.push(post);
                }
                Err(e) => eprintln!("error processing {}: {}", entry.path().display(), e),
            }
        }
    }

    println!("total posts found: {}", posts.len());
    posts.sort_by(|a, b| b.date.cmp(&a.date));
    posts
}

fn process_markdown_file(path: &Path) -> Result<Post, Box<dyn std::error::Error>> {
    println!("reading file: {}", path.display());
    let content = fs::read_to_string(path)?;

    // split front matter and content
    let parts: Vec<&str> = content.splitn(3, "---").collect();
    if parts.len() != 3 {
        return Err("invalid markdown format - missing front matter".into());
    }

    let front_matter: FrontMatter = serde_yaml::from_str(parts[1].trim())?;

    let html_content = markdown_to_html(parts[2].trim(), &ComrakOptions::default());

    // Use the slug from front matter instead of generating from path
    let slug = front_matter.slug.clone();

    println!("using slug from frontmatter: {}", slug);

    Ok(Post {
        title: front_matter.title,
        date: NaiveDateTime::parse_from_str(
            &(front_matter.date + " 00:00:00"),
            "%Y-%m-%d %H:%M:%S",
        )?,
        description: front_matter.description,
        tags: front_matter.tags,
        content: html_content,
        slug,
    })
}

fn prettify_html(html: &str) -> String {
    let dom = Dom::parse(html).unwrap();
    let mut result = String::new();
    prettify_node(&dom.children, 0, &mut result);
    result
}

fn prettify_node(nodes: &[Node], indent: usize, result: &mut String) {
    for node in nodes {
        match node {
            Node::Element(element) => {
                result.push_str(&"  ".repeat(indent));
                result.push('<');
                result.push_str(&element.name);

                for (key, value) in &element.attributes {
                    result.push(' ');
                    result.push_str(key);
                    if let Some(val) = value {
                        result.push_str("=\"");
                        result.push_str(val);
                        result.push('"');
                    }
                }

                if element.children.is_empty() && !needs_closing_tag(&element.name) {
                    result.push_str("/>\n");
                } else {
                    result.push('>');
                    if !element.children.is_empty() {
                        result.push('\n');
                        prettify_node(&element.children, indent + 1, result);
                        result.push_str(&"  ".repeat(indent));
                    }
                    result.push_str("</");
                    result.push_str(&element.name);
                    result.push_str(">\n");
                }
            }
            Node::Text(text) => {
                let trimmed = text.trim();
                if !trimmed.is_empty() {
                    result.push_str(&"  ".repeat(indent));
                    result.push_str(trimmed);
                    result.push('\n');
                }
            }
            _ => {}
        }
    }
}

fn needs_closing_tag(tag: &str) -> bool {
    !["img", "br", "hr", "meta", "link", "input"].contains(&tag)
}

fn generate_html_files(posts: Vec<Post>) {
    let mut tera = match Tera::new("templates/**/*.html") {
        Ok(t) => t,
        Err(e) => {
            println!("Error parsing templates: {}", e);
            return;
        }
    };

    // add custom date filter
    tera.register_filter(
        "date",
        |value: &tera::Value, args: &std::collections::HashMap<String, tera::Value>| {
            if let Some(date) = value.as_str() {
                if let Some(format) = args.get("format").and_then(|f| f.as_str()) {
                    if let Ok(parsed_date) =
                        NaiveDateTime::parse_from_str(date, "%Y-%m-%d %H:%M:%S")
                    {
                        return Ok(parsed_date.format(format).to_string().into());
                    }
                }
            }
            Ok(value.clone())
        },
    );

    // add split filter
    tera.register_filter(
        "split",
        |value: &tera::Value, args: &std::collections::HashMap<String, tera::Value>| {
            if let Some(s) = value.as_str() {
                if let Some(pat) = args.get("pat").and_then(|p| p.as_str()) {
                    let parts: Vec<tera::Value> = s.split(pat).map(|p| p.into()).collect();
                    return Ok(tera::Value::Array(parts));
                }
            }
            Ok(value.clone())
        },
    );

    // Create base posts directory
    fs::create_dir_all("dist/posts").unwrap();

    // generate individual post pages
    for post in &posts {
        let mut context = Context::new();
        context.insert("post", post);
        context.insert("meta_description", &post.get_meta_description());

        let html = tera.render("post.html", &context).unwrap();
        let prettified_html = prettify_html(&html);

        // construct output path using the slug from frontmatter
        let output_path = format!("dist/posts/{}.html", post.slug);

        // ensure the parent directories exist
        if let Some(parent) = Path::new(&output_path).parent() {
            fs::create_dir_all(parent).unwrap();
        }

        let mut file = File::create(output_path).unwrap();
        file.write_all(prettified_html.as_bytes()).unwrap();
    }

    // process home.md and generate index page
    let home_path = Path::new("content/home.md");
    let home_content = match process_home_file(home_path) {
        Ok(content) => content,
        Err(e) => {
            eprintln!("error processing home.md: {}", e);
            String::from("<h1>Welcome</h1>")
        }
    };

    let mut context = Context::new();
    context.insert("posts", &posts);
    context.insert("home_content", &home_content);

    let html = tera.render("index.html", &context).unwrap();
    let prettified_html = prettify_html(&html);
    let mut file = File::create("dist/index.html").unwrap();
    file.write_all(prettified_html.as_bytes()).unwrap();
}

fn copy_static_files() {
    for entry in WalkDir::new("static").into_iter().filter_map(|e| e.ok()) {
        if entry.file_type().is_file() {
            let path = entry.path();
            let relative = path.strip_prefix("static").unwrap();
            let dest = Path::new("dist").join(relative);

            if let Some(parent) = dest.parent() {
                fs::create_dir_all(parent).unwrap();
            }

            fs::copy(path, dest).unwrap();
        }
    }
}

fn is_hidden(entry: &walkdir::DirEntry) -> bool {
    entry
        .file_name()
        .to_str()
        .map(|s| s.starts_with("."))
        .unwrap_or(false)
}

fn process_home_file(path: &Path) -> Result<String, Box<dyn Error>> {
    let content = fs::read_to_string(path)?;

    // split front matter and content
    let parts: Vec<&str> = content.splitn(3, "---").collect();
    if parts.len() != 3 {
        return Err("Invalid markdown format - missing front matter".into());
    }

    // parse front matter to validate date format
    let front_matter: FrontMatter = serde_yaml::from_str(parts[1].trim())?;

    // convert markdown to html
    let html_content = markdown_to_html(parts[2].trim(), &ComrakOptions::default());

    Ok(html_content)
}
