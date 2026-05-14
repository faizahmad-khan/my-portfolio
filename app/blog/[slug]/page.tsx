import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import StarfieldBackground from "@/components/ui/StarfieldBackground";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not Found" };
  return { title: `${post.title} — Faiz Ahmad Khan` };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className="relative min-h-screen">
      <StarfieldBackground />
      <div className="relative z-10">
        <Navbar />
        <article className="max-w-3xl mx-auto px-4 pt-32 pb-24">
          <Link
            href="/blog"
            className="flex items-center gap-2 text-gray-500
              hover:text-cyan-400 text-sm font-mono mb-12
              transition-colors w-fit"
          >
            <ArrowLeft size={14} />
            Back to Blog
          </Link>

          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-mono text-gray-600">
                {post.date}
              </span>
              <span className="text-gray-700">·</span>
              <span className="text-xs font-mono text-gray-600">
                {post.readTime}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white
              leading-tight mb-6">
              {post.title}
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              {post.excerpt}
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: 11,
                    fontFamily: "monospace",
                    color: "#67e8f9",
                    background: "rgba(0,212,255,0.08)",
                    border: "1px solid rgba(0,212,255,0.15)",
                    borderRadius: 9999,
                    padding: "3px 10px",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div
            style={{
              height: 1,
              background: "rgba(255,255,255,0.06)",
              marginBottom: 48,
            }}
          />

          <div className="mdx-content">
            <MDXRemote source={post.content} />
          </div>
        </article>
        <Footer />
      </div>
    </main>
  );
}
