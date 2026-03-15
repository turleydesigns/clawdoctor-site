"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function ShieldIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-green-400 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
    </svg>
  );
}

function WelcomeContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [licenseKey, setLicenseKey] = useState<string | null>(null);
  const [plan, setPlan] = useState<string>("diagnose");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      setError("No session ID found. If you just purchased, please check your email for your license key.");
      return;
    }

    fetch(`/api/license/from-session?session_id=${encodeURIComponent(sessionId)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.key) {
          setLicenseKey(data.key);
          setPlan(data.plan ?? "diagnose");
        } else {
          setError(data.error ?? "Could not retrieve license key. Please contact support.");
        }
      })
      .catch(() => {
        setError("Network error while fetching your license key. Please try refreshing.");
      })
      .finally(() => setLoading(false));
  }, [sessionId]);

  const copyKey = () => {
    if (!licenseKey) return;
    navigator.clipboard.writeText(licenseKey).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const planLabel = plan === "heal" ? "Heal" : "Diagnose";

  return (
    <div className="min-h-screen bg-[#09090b] text-gray-100 antialiased">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-green-500/5 rounded-full blur-[120px]" />
      </div>

      {/* Nav */}
      <nav className="relative max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
          <ShieldIcon />
          <span className="font-bold text-lg tracking-tight">ClawDoctor</span>
        </Link>
        <div className="flex items-center gap-6 text-sm text-gray-400">
          <Link href="/docs" className="hover:text-white transition">Docs</Link>
          <a href="https://github.com/turleydesigns/clawdoctor" className="hover:text-white transition">GitHub</a>
        </div>
      </nav>

      <main className="relative max-w-2xl mx-auto px-6 pt-12 pb-24">
        {/* Success header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
            <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-3">
            Welcome to ClawDoctor {planLabel}
          </h1>
          <p className="text-gray-400">
            Your purchase was successful. Here&apos;s everything you need to get started.
          </p>
        </div>

        {/* License key card */}
        <div className="mb-8 p-6 rounded-2xl bg-white/[0.03] border border-green-500/20">
          <p className="text-sm font-medium text-gray-400 mb-3">Your license key</p>

          {loading && (
            <div className="flex items-center gap-3 py-2">
              <div className="w-4 h-4 border-2 border-green-400/30 border-t-green-400 rounded-full animate-spin" />
              <span className="text-gray-400 text-sm">Fetching your license key...</span>
            </div>
          )}

          {error && !loading && (
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          {licenseKey && !loading && (
            <>
              <div className="flex items-center gap-3">
                <code className="flex-1 font-mono text-green-400 text-sm bg-[#111113] px-4 py-3 rounded-lg border border-white/10 break-all select-all">
                  {licenseKey}
                </code>
                <button
                  onClick={copyKey}
                  className="shrink-0 flex items-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 text-sm font-medium transition"
                  title="Copy to clipboard"
                >
                  <CopyIcon />
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                Save this key. It&apos;s also been emailed to you. You&apos;ll need it to activate ClawDoctor on each machine.
              </p>
            </>
          )}
        </div>

        {/* Get started steps */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-5">Get started in 60 seconds</h2>
          <div className="space-y-4">
            <div className="flex gap-4 p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="shrink-0 w-7 h-7 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 text-sm font-bold">1</div>
              <div>
                <p className="font-medium mb-2">Install ClawDoctor</p>
                <div className="rounded-lg border border-white/10 bg-[#111113] px-4 py-2.5">
                  <code className="font-mono text-sm text-green-400">npm install -g clawdoctor</code>
                </div>
              </div>
            </div>

            <div className="flex gap-4 p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="shrink-0 w-7 h-7 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 text-sm font-bold">2</div>
              <div className="flex-1">
                <p className="font-medium mb-2">Activate your license</p>
                <div className="rounded-lg border border-white/10 bg-[#111113] px-4 py-2.5">
                  <code className="font-mono text-sm text-green-400">
                    clawdoctor activate {licenseKey ? <span className="text-gray-400">{licenseKey}</span> : "<your-key>"}
                  </code>
                </div>
              </div>
            </div>

            <div className="flex gap-4 p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="shrink-0 w-7 h-7 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 text-sm font-bold">3</div>
              <div>
                <p className="font-medium mb-2">Run setup and start monitoring</p>
                <div className="rounded-lg border border-white/10 bg-[#111113] px-4 py-2.5 space-y-1">
                  <div><code className="font-mono text-sm text-green-400">clawdoctor init</code></div>
                  <div><code className="font-mono text-sm text-green-400">clawdoctor start</code></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What you unlocked */}
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] mb-8">
          <h2 className="text-lg font-bold mb-4">What you unlocked</h2>
          <ul className="space-y-3">
            {plan === "heal" ? (
              <>
                <li className="flex items-start gap-3 text-sm text-gray-400"><CheckIcon /> Unlimited monitors across all watchers</li>
                <li className="flex items-start gap-3 text-sm text-gray-400"><CheckIcon /> 90-day event history</li>
                <li className="flex items-start gap-3 text-sm text-gray-400"><CheckIcon /> Auto-fix: gateway restart, cron retry</li>
                <li className="flex items-start gap-3 text-sm text-gray-400"><CheckIcon /> Approval flow for risky fixes via Telegram</li>
                <li className="flex items-start gap-3 text-sm text-gray-400"><CheckIcon /> Full audit trail and rollback</li>
                <li className="flex items-start gap-3 text-sm text-gray-400"><CheckIcon /> Smart alerts with root cause analysis</li>
              </>
            ) : (
              <>
                <li className="flex items-start gap-3 text-sm text-gray-400"><CheckIcon /> Up to 20 monitors</li>
                <li className="flex items-start gap-3 text-sm text-gray-400"><CheckIcon /> 30-day event history</li>
                <li className="flex items-start gap-3 text-sm text-gray-400"><CheckIcon /> Smart alerts with root cause analysis</li>
                <li className="flex items-start gap-3 text-sm text-gray-400"><CheckIcon /> Known-issue pattern matching</li>
                <li className="flex items-start gap-3 text-sm text-gray-400"><CheckIcon /> Telegram alerts</li>
              </>
            )}
          </ul>
        </div>

        <div className="text-center">
          <Link href="/docs" className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-medium rounded-lg transition shadow-lg shadow-green-600/20">
            Read the docs
            <span>&rarr;</span>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative max-w-5xl mx-auto px-6 py-12 border-t border-white/[0.06]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2 text-gray-500">
            <ShieldIcon />
            <span className="text-sm">ClawDoctor</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="https://github.com/turleydesigns/clawdoctor" className="hover:text-gray-300 transition">GitHub</a>
            <Link href="/docs" className="hover:text-gray-300 transition">Docs</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function WelcomePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-green-400/30 border-t-green-400 rounded-full animate-spin" />
      </div>
    }>
      <WelcomeContent />
    </Suspense>
  );
}
