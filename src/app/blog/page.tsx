import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "./data";

export const metadata: Metadata = {
  title: "Blog - ClawDoctor",
  description: "Thoughts on running AI agents in production, monitoring local gateways, and building ClawDoctor.",
};

function ShieldIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
    </svg>
  );
}

export default function BlogPage() {
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
          <Link href="/blog" className="text-white transition">Blog</Link>
          <Link href="/docs" className="hover:text-white transition">Docs</Link>
        </div>
      </nav>

      <main className="relative max-w-3xl mx-auto px-6 pt-12 pb-24">
        <h1 className="text-3xl font-bold mb-2">Blog</h1>
        <p className="text-gray-400 mb-12 text-sm">
          Running AI agents in production. What breaks. How we fixed it.
        </p>

        <div className="space-y-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block p-6 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.14] hover:bg-white/[0.04] transition-all duration-200"
            >
              <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                <time dateTime={post.date}>{post.date}</time>
                <span>·</span>
                <span>{post.readingTime}</span>
              </div>
              <h2 className="text-lg font-semibold mb-2 group-hover:text-green-400 transition-colors leading-snug">
                {post.title}
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed">{post.description}</p>
              <span className="inline-block mt-4 text-xs text-green-400 opacity-0 group-hover:opacity-100 transition-opacity">
                Read post →
              </span>
            </Link>
          ))}
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
