const monitors = [
  { icon: "🖥️", title: "Gateway Health", desc: "Checks if your OpenClaw gateway process is running. Auto-restarts if it goes down." },
  { icon: "⏰", title: "Cron Execution", desc: "Did your cron run? Did it succeed? Was the output actually delivered?" },
  { icon: "📋", title: "Session Errors", desc: "Catches aborted sessions, stuck loops, and sessions that ran way too long." },
  { icon: "🔑", title: "Auth Failures", desc: "Detects 401/403 patterns and expired tokens before they cascade." },
  { icon: "💰", title: "Cost Anomalies", desc: "Flags when a session burns 3x more than your baseline. Catches runaway spend." },
];

const terminal = `AgentWatch Status
─────────────────
Daemon:     🟢 running
Telegram:   ✅ enabled

Running quick check...

✅ [GatewayWatcher] Gateway running
🟡 [CronWatcher] Cron 'writer-content-drafts' last delivery failed
✅ [CronWatcher] 12 cron job(s) healthy
✅ [SessionWatcher] 23 recent session(s) healthy
✅ [AuthWatcher] No auth failures detected
✅ [CostWatcher] Cost baseline normal`;

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16">
        <div className="inline-block px-3 py-1 mb-6 text-xs font-mono bg-green-900/30 text-green-400 rounded-full border border-green-800/50">
          Open Source + Free Tier
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
          Your OpenClaw setup breaks at 3am.
          <br />
          <span className="text-green-400">AgentWatch fixes it before you wake up.</span>
        </h1>
        <p className="text-lg text-gray-400 mb-8 max-w-2xl">
          Self-healing monitor for OpenClaw. Watches your gateway, crons, and sessions.
          Alerts you on Telegram. Auto-fixes what it can.
        </p>
        <div className="flex gap-4 flex-wrap">
          <a href="#install" className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-medium rounded-lg transition">
            Install Free
          </a>
          <a href="#pricing" className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-200 font-medium rounded-lg border border-gray-700 transition">
            See Pricing
          </a>
        </div>
      </section>

      {/* Live Demo */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 bg-gray-900 border-b border-gray-800">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            <span className="ml-2 text-xs text-gray-500 font-mono">agentwatch status</span>
          </div>
          <pre className="p-6 text-sm font-mono text-gray-300 overflow-x-auto whitespace-pre leading-relaxed">
            {terminal}
          </pre>
        </div>
        <p className="text-center text-sm text-gray-500 mt-3">
          Real output from our own OpenClaw setup. It caught 4 cron delivery failures on first run.
        </p>
      </section>

      {/* What It Monitors */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold mb-8">What It Monitors</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {monitors.map((m) => (
            <div key={m.title} className="p-5 bg-gray-900/50 rounded-xl border border-gray-800">
              <div className="text-2xl mb-3">{m.icon}</div>
              <h3 className="font-semibold mb-2">{m.title}</h3>
              <p className="text-sm text-gray-400">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What It Fixes */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold mb-8">What It Fixes</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-5 bg-gray-900/50 rounded-xl border border-gray-800">
            <span className="text-green-400 text-xl mt-0.5">✅</span>
            <div>
              <h3 className="font-semibold mb-1">Gateway goes down</h3>
              <p className="text-sm text-gray-400">Auto-restarts via <code className="text-green-400">openclaw gateway restart</code>, verifies it&apos;s back, sends you a Telegram alert. You never knew it happened.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-5 bg-gray-900/50 rounded-xl border border-gray-800">
            <span className="text-yellow-400 text-xl mt-0.5">🟡</span>
            <div>
              <h3 className="font-semibold mb-1">Cron job fails</h3>
              <p className="text-sm text-gray-400">Logs the failure, includes the exact rerun command in the alert. No more guessing which cron broke or when.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-5 bg-gray-900/50 rounded-xl border border-gray-800">
            <span className="text-blue-400 text-xl mt-0.5">🔮</span>
            <div>
              <h3 className="font-semibold mb-1">Coming in v2: token refresh, config repair, approval flows</h3>
              <p className="text-sm text-gray-400">OAuth token expired? AgentWatch refreshes it. Config drift? Snapshots and repairs. Risky fix? Asks you on Telegram first.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Install */}
      <section id="install" className="max-w-4xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold mb-8">Install in 60 Seconds</h2>
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <pre className="font-mono text-sm space-y-2">
            <code className="block"><span className="text-gray-500">$</span> <span className="text-green-400">npm install -g agentwatch</span></code>
            <code className="block"><span className="text-gray-500">$</span> <span className="text-green-400">agentwatch init</span>    <span className="text-gray-600"># detects OpenClaw, configures Telegram alerts</span></code>
            <code className="block"><span className="text-gray-500">$</span> <span className="text-green-400">agentwatch start</span>   <span className="text-gray-600"># starts monitoring everything</span></code>
          </pre>
        </div>
        <p className="text-sm text-gray-500 mt-3">Works on Linux. macOS coming soon. Requires Node.js 18+.</p>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-4xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold mb-2">Pricing</h2>
        <p className="text-gray-500 mb-8">Intro pricing for first 100 customers. Locked in for 12 months.</p>
        <div className="grid md:grid-cols-3 gap-4">
          {/* Watch - Free */}
          <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-800">
            <h3 className="text-lg font-bold mb-1">Watch</h3>
            <div className="text-3xl font-bold mb-1">Free</div>
            <p className="text-sm text-gray-500 mb-6">Open source, forever</p>
            <ul className="space-y-2 text-sm text-gray-400 mb-6">
              <li>✓ 5 monitors</li>
              <li>✓ Local-only alerts</li>
              <li>✓ 7-day event history</li>
              <li>✓ CLI dashboard</li>
            </ul>
            <a href="#install" className="block text-center px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium transition">
              Install Free
            </a>
          </div>

          {/* Diagnose */}
          <div className="p-6 bg-gray-900/50 rounded-xl border border-green-800/50 ring-1 ring-green-800/30">
            <h3 className="text-lg font-bold mb-1">Diagnose</h3>
            <div className="text-3xl font-bold mb-1">$9<span className="text-lg font-normal text-gray-500">/mo</span></div>
            <p className="text-sm text-gray-500 mb-6">Intro price (normally $15)</p>
            <ul className="space-y-2 text-sm text-gray-400 mb-6">
              <li>✓ 20 monitors</li>
              <li>✓ 30-day history</li>
              <li>✓ Smart alerts with root cause</li>
              <li>✓ Known-issue pattern matching</li>
              <li>✓ Telegram + Slack + Discord</li>
            </ul>
            <a href="https://buy.stripe.com/7sY14g2fsex33F08U51ck01" className="block text-center px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg text-sm font-medium transition">
              Get Diagnose
            </a>
          </div>

          {/* Heal */}
          <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-800">
            <h3 className="text-lg font-bold mb-1">Heal</h3>
            <div className="text-3xl font-bold mb-1">$19<span className="text-lg font-normal text-gray-500">/mo</span></div>
            <p className="text-sm text-gray-500 mb-6">Intro price (normally $39)</p>
            <ul className="space-y-2 text-sm text-gray-400 mb-6">
              <li>✓ Unlimited monitors</li>
              <li>✓ 90-day history</li>
              <li>✓ Auto-fix (gateway restart, cron retry)</li>
              <li>✓ Approval flow for risky fixes</li>
              <li>✓ Full audit trail + rollback</li>
              <li>✓ Everything in Diagnose</li>
            </ul>
            <a href="https://buy.stripe.com/eVq28k2fsdsZ7Vg6LX1ck02" className="block text-center px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium transition">
              Get Heal
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto px-6 py-12 border-t border-gray-800">
        <p className="text-sm text-gray-500 mb-4">
          Built by people who run 20+ OpenClaw agents in production and got tired of 3am failures.
        </p>
        <div className="flex gap-6 text-sm text-gray-500">
          <a href="https://github.com/turleydesigns/agentwatch" className="hover:text-gray-300 transition">GitHub</a>
          <a href="mailto:matt@uxcontinuum.com" className="hover:text-gray-300 transition">Contact</a>
        </div>
      </footer>
    </div>
  );
}
