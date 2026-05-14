import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  tags: string[];
  featured: boolean;
  excerpt: string;
  content: string;
}

export function getAllPosts(): BlogPost[] {
  const files = fs.readdirSync(BLOG_DIR);
  return files
    .filter((f) => f.endsWith(".mdx"))
    .map((filename) => {
      const slug = filename.replace(".mdx", "");
      const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf-8");
      const { data, content } = matter(raw);
      return {
        slug,
        title: data.title,
        date: data.date,
        readTime: data.readTime,
        tags: data.tags,
        featured: data.featured,
        excerpt: data.excerpt,
        content,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const raw = fs.readFileSync(
      path.join(BLOG_DIR, `${slug}.mdx`),
      "utf-8"
    );
    const { data, content } = matter(raw);
    return {
      slug,
      title: data.title,
      date: data.date,
      readTime: data.readTime,
      tags: data.tags,
      featured: data.featured,
      excerpt: data.excerpt,
      content,
    };
  } catch {
    return null;
  }
}
