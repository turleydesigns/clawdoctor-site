import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ClawDoctor - Self-healing monitor for OpenClaw",
  description: "Watches your gateway, crons, and sessions. Alerts on Telegram. Auto-fixes what it can.",
};

function ShieldIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
    </svg>
  );
}

function ServerIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 17.25v-.228a4.5 4.5 0 0 0-.12-1.03l-2.268-9.64a3.375 3.375 0 0 0-3.285-2.602H7.923a3.375 3.375 0 0 0-3.285 2.602l-2.268 9.64a4.5 4.5 0 0 0-.12 1.03v.228m19.5 0a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3m19.5 0a3 3 0 0 0-3-3H5.25a3 3 0 0 0-3 3m16.5 0h.008v.008h-.008v-.008Zm-3 0h.008v.008h-.008v-.008Z" />
    </svg>
  );
}

function KeyIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
    </svg>
  );
}

function CurrencyIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
  );
}

function WrenchIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
    </svg>
  );
}

const monitors = [
  { icon: <ServerIcon />, title: "Gateway Health", desc: "Checks if your OpenClaw gateway process is running. Auto-restarts if it goes down.", color: "text-green-400" },
  { icon: <ClockIcon />, title: "Cron Execution", desc: "Did your cron run? Did it succeed? Was the output actually delivered?", color: "text-blue-400" },
  { icon: <BoltIcon />, title: "Session Errors", desc: "Catches aborted sessions, stuck loops, and sessions that ran way too long.", color: "text-amber-400" },
  { icon: <KeyIcon />, title: "Auth Failures", desc: "Detects 401/403 patterns and expired tokens before they cascade.", color: "text-purple-400" },
  { icon: <CurrencyIcon />, title: "Cost Anomalies", desc: "Flags when a session burns 3x more than your baseline. Catches runaway spend.", color: "text-red-400" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#09090b] text-gray-100 antialiased">
      {/* Gradient background accent */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-green-500/5 rounded-full blur-[120px]" />
      </div>

      {/* Nav */}
      <nav className="relative max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldIcon />
          <span className="font-bold text-lg tracking-tight">ClawDoctor</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-gray-400">
          <a href="#monitors" className="hover:text-white transition">Monitors</a>
          <a href="#pricing" className="hover:text-white transition">Pricing</a>
          <a href="https://github.com/turleydesigns/clawdoctor" className="hover:text-white transition">GitHub</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative max-w-5xl mx-auto px-6 pt-16 pb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-8 text-xs font-medium bg-green-500/10 text-green-400 rounded-full border border-green-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Open Source &middot; Free Tier Available
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
          Your OpenClaw setup
          <br />
          breaks at 3am.
          <br />
          <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            ClawDoctor fixes it
          </span>
          <br />
          <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            before you wake up.
          </span>
        </h1>
        <p className="text-lg text-gray-400 mb-10 max-w-xl leading-relaxed">
          Self-healing monitor for OpenClaw. Watches your gateway, crons, and
          sessions. Alerts you on Telegram. Auto-fixes what it can.
        </p>
        <div className="flex gap-4 flex-wrap">
          <a
            href="#install"
            className="group px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-medium rounded-lg transition shadow-lg shadow-green-600/20 hover:shadow-green-500/30"
          >
            Install Free
            <span className="inline-block ml-1 group-hover:translate-x-0.5 transition-transform">&rarr;</span>
          </a>
          <a
            href="#pricing"
            className="px-6 py-3 bg-white/5 hover:bg-white/10 text-gray-300 font-medium rounded-lg border border-white/10 hover:border-white/20 transition"
          >
            See Pricing
          </a>
        </div>
      </section>

      {/* Terminal Demo */}
      <section className="relative max-w-5xl mx-auto px-6 pb-24">
        <div className="rounded-2xl border border-white/10 bg-[#111113] overflow-hidden shadow-2xl shadow-black/50">
          <div className="flex items-center gap-2 px-5 py-3.5 bg-[#111113] border-b border-white/5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 text-xs text-gray-500 font-mono">~ clawdoctor status</span>
          </div>
          <div className="p-6 md:p-8">
            <pre className="text-[13px] md:text-sm font-mono leading-relaxed text-gray-300">
{`ClawDoctor Status
─────────────────
Daemon:     `}<span className="text-green-400">●</span>{` running
Telegram:   `}<span className="text-green-400">✓</span>{` enabled

Running quick check...

`}<span className="text-green-400">✓</span>{` [GatewayWatcher]  Gateway running
`}<span className="text-amber-400">!</span>{` [CronWatcher]     Cron 'writer-content-drafts' last delivery failed
`}<span className="text-green-400">✓</span>{` [CronWatcher]     12 cron job(s) healthy
`}<span className="text-green-400">✓</span>{` [SessionWatcher]  23 recent session(s) healthy
`}<span className="text-green-400">✓</span>{` [AuthWatcher]     No auth failures detected
`}<span className="text-green-400">✓</span>{` [CostWatcher]     Cost baseline normal`}
            </pre>
          </div>
        </div>
        <p className="text-center text-sm text-gray-500 mt-4">
          Real output from our own OpenClaw setup. It caught 4 cron delivery failures on first run.
        </p>
      </section>

      {/* What It Monitors */}
      <section id="monitors" className="relative max-w-5xl mx-auto px-6 pb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">What It Monitors</h2>
          <p className="text-gray-400">Five watchers running on intervals, reading directly from OpenClaw&apos;s state files.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {monitors.map((m) => (
            <div
              key={m.title}
              className="group p-6 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-300"
            >
              <div className={`${m.color} mb-4 opacity-80 group-hover:opacity-100 transition`}>
                {m.icon}
              </div>
              <h3 className="font-semibold mb-2 text-[15px]">{m.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What It Fixes */}
      <section className="relative max-w-5xl mx-auto px-6 pb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">What It Fixes</h2>
          <p className="text-gray-400">Not just alerts. ClawDoctor takes action.</p>
        </div>
        <div className="space-y-4 max-w-2xl mx-auto">
          <div className="flex gap-5 p-6 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <div className="shrink-0 w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400">
              <ServerIcon />
            </div>
            <div>
              <h3 className="font-semibold mb-1.5 text-[15px]">Gateway goes down</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Auto-restarts via <code className="text-green-400/80 bg-green-400/5 px-1.5 py-0.5 rounded text-xs font-mono">openclaw gateway restart</code>, verifies it&apos;s back, sends you a Telegram alert. You never knew it happened.
              </p>
            </div>
          </div>
          <div className="flex gap-5 p-6 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <div className="shrink-0 w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
              <ClockIcon />
            </div>
            <div>
              <h3 className="font-semibold mb-1.5 text-[15px]">Cron job fails</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Logs the failure, includes the exact rerun command in the alert. No more SSHing in to figure out which cron broke or when.
              </p>
            </div>
          </div>
          <div className="flex gap-5 p-6 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <div className="shrink-0 w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
              <WrenchIcon />
            </div>
            <div>
              <h3 className="font-semibold mb-1.5 text-[15px]">Coming in v2: token refresh, config repair, approval flows</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                OAuth token expired? ClawDoctor refreshes it. Config drift? Snapshots and repairs. Risky fix? Asks you on Telegram first.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Install */}
      <section id="install" className="relative max-w-5xl mx-auto px-6 pb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Install in 60 Seconds</h2>
        </div>
        <div className="max-w-xl mx-auto rounded-2xl border border-white/10 bg-[#111113] overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="p-6 font-mono text-sm space-y-3">
            <div>
              <span className="text-gray-500 select-none">$ </span>
              <span className="text-green-400">npm install -g clawdoctor</span>
            </div>
            <div>
              <span className="text-gray-500 select-none">$ </span>
              <span className="text-green-400">clawdoctor init</span>
              <span className="text-gray-600 ml-3"># detects OpenClaw, configures alerts</span>
            </div>
            <div>
              <span className="text-gray-500 select-none">$ </span>
              <span className="text-green-400">clawdoctor start</span>
              <span className="text-gray-600 ml-3"># monitors everything</span>
            </div>
          </div>
        </div>
        <p className="text-center text-sm text-gray-500 mt-4">Works on Linux. macOS coming soon. Requires Node.js 18+.</p>
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative max-w-5xl mx-auto px-6 pb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Simple Pricing</h2>
          <p className="text-gray-400">Intro pricing for first 100 customers. Locked in for 12 months.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {/* Watch - Free */}
          <div className="p-7 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
            <h3 className="text-lg font-bold mb-1">Watch</h3>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-4xl font-bold">Free</span>
            </div>
            <p className="text-sm text-gray-500 mb-8">Open source, forever</p>
            <ul className="space-y-3 text-sm text-gray-400 mb-8">
              {["5 monitors", "Local-only alerts", "7-day event history", "CLI dashboard"].map((f) => (
                <li key={f} className="flex items-center gap-2.5"><CheckIcon /> {f}</li>
              ))}
            </ul>
            <a
              href="#install"
              className="block text-center px-4 py-2.5 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium border border-white/10 transition"
            >
              Install Free
            </a>
          </div>

          {/* Diagnose - Popular */}
          <div className="relative p-7 rounded-2xl bg-white/[0.03] border border-green-500/30 shadow-lg shadow-green-500/5">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-green-600 text-xs font-medium rounded-full">
              Most Popular
            </div>
            <h3 className="text-lg font-bold mb-1">Diagnose</h3>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-4xl font-bold">$9</span>
              <span className="text-gray-500">/mo</span>
            </div>
            <p className="text-sm text-gray-500 mb-8">Intro price <span className="line-through">$15</span></p>
            <ul className="space-y-3 text-sm text-gray-400 mb-8">
              {[
                "20 monitors",
                "30-day history",
                "Smart alerts with root cause",
                "Known-issue pattern matching",
                "Telegram + Slack + Discord",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2.5"><CheckIcon /> {f}</li>
              ))}
            </ul>
            <a
              href="https://buy.stripe.com/7sY14g2fsex33F08U51ck01"
              className="block text-center px-4 py-2.5 bg-green-600 hover:bg-green-500 rounded-lg text-sm font-medium transition shadow-lg shadow-green-600/20"
            >
              Get Diagnose
            </a>
          </div>

          {/* Heal */}
          <div className="p-7 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
            <h3 className="text-lg font-bold mb-1">Heal</h3>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-4xl font-bold">$19</span>
              <span className="text-gray-500">/mo</span>
            </div>
            <p className="text-sm text-gray-500 mb-8">Intro price <span className="line-through">$39</span></p>
            <ul className="space-y-3 text-sm text-gray-400 mb-8">
              {[
                "Unlimited monitors",
                "90-day history",
                "Auto-fix (restart, retry)",
                "Approval flow for risky fixes",
                "Full audit trail + rollback",
                "Everything in Diagnose",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2.5"><CheckIcon /> {f}</li>
              ))}
            </ul>
            <a
              href="https://buy.stripe.com/eVq28k2fsdsZ7Vg6LX1ck02"
              className="block text-center px-4 py-2.5 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium border border-white/10 transition"
            >
              Get Heal
            </a>
          </div>
        </div>
      </section>

      {/* Social Proof / Pain Point */}
      <section className="relative max-w-5xl mx-auto px-6 pb-24">
        <div className="max-w-2xl mx-auto text-center">
          <blockquote className="text-xl md:text-2xl font-medium text-gray-300 mb-4 leading-relaxed">
            &ldquo;Sentry monitors your cron jobs. Langfuse monitors your LLM calls.
            Nobody monitors whether your OpenClaw setup is actually working.&rdquo;
          </blockquote>
          <p className="text-sm text-gray-500">
            Built by people who run 20+ OpenClaw agents in production.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative max-w-5xl mx-auto px-6 py-12 border-t border-white/[0.06]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2 text-gray-500">
            <ShieldIcon />
            <span className="text-sm">ClawDoctor</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="https://github.com/turleydesigns/clawdoctor" className="hover:text-gray-300 transition">GitHub</a>
            <a href="mailto:matt@uxcontinuum.com" className="hover:text-gray-300 transition">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
