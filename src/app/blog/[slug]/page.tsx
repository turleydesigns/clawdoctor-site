import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, posts } from "../data";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} - ClawDoctor`,
    description: post.description,
  };
}

function ShieldIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
    </svg>
  );
}

function renderContent(content: string) {
  return content.split("\n\n").map((block, i) => {
    if (block.startsWith("**") && block.endsWith("**")) {
      return (
        <h2 key={i} className="text-xl font-bold text-white mt-10 mb-4">
          {block.slice(2, -2)}
        </h2>
      );
    }
    const parts = block.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
    return (
      <p key={i} className="text-gray-400 leading-relaxed mb-4">
        {parts.map((part, j) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return <strong key={j} className="text-gray-200 font-semibold">{part.slice(2, -2)}</strong>;
          }
          if (part.startsWith("`") && part.endsWith("`")) {
            return (
              <code key={j} className="text-green-400/80 bg-green-400/5 px-1.5 py-0.5 rounded text-sm font-mono">
                {part.slice(1, -1)}
              </code>
            );
          }
          return part;
        })}
      </p>
    );
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-[#09090b] text-gray-100 antialiased">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-green-500/5 rounded-full blur-[120px]" />
      </div>

      <nav className="relative max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <ShieldIcon />
          <span className="font-bold text-lg tracking-tight">ClawDoctor</span>
        </Link>
        <div className="flex items-center gap-6 text-sm text-gray-400">
          <Link href="/#monitors" className="hover:text-white transition">Monitors</Link>
          <Link href="/#pricing" className="hover:text-white transition">Pricing</Link>
          <Link href="/blog" className="hover:text-white transition">Blog</Link>
          <Link href="/docs" className="hover:text-white transition">Docs</Link>
        </div>
      </nav>

      <main className="relative max-w-2xl mx-auto px-6 pt-10 pb-24">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-300 transition mb-10"
        >
          ← All posts
        </Link>

        <div className="flex items-center gap-3 text-xs text-gray-500 mb-5">
          <time dateTime={post.date}>{post.date}</time>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-10 text-white">
          {post.title}
        </h1>

        <article className="prose-custom">{renderContent(post.content)}</article>

        <div className="mt-16 pt-8 border-t border-white/[0.06]">
          <p className="text-sm text-gray-500 mb-5">
            ClawDoctor watches your OpenClaw setup so you don&apos;t have to.
          </p>
          <a
            href="/#install"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-500 text-white font-medium text-sm rounded-lg transition shadow-lg shadow-green-600/20"
          >
            Install Free →
          </a>
        </div>
      </main>

      <footer className="relative max-w-5xl mx-auto px-6 py-12 border-t border-white/[0.06]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2 text-gray-500">
            <ShieldIcon />
            <span className="text-sm">ClawDoctor</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="https://github.com/turleydesigns/clawdoctor" className="hover:text-gray-300 transition">GitHub</a>
            <Link href="/docs" className="hover:text-gray-300 transition">Docs</Link>
            <Link href="/blog" className="hover:text-gray-300 transition">Blog</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
