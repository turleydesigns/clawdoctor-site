import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Docs - ClawDoctor",
  description: "ClawDoctor documentation: installation, quick start, watchers, license activation, and troubleshooting.",
};

function ShieldIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
    </svg>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-[#111113] overflow-hidden my-4">
      <pre className="p-4 font-mono text-sm text-gray-300 overflow-x-auto leading-relaxed">{children}</pre>
    </div>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-12">
      <h2 className="text-2xl font-bold mb-4 text-white">{title}</h2>
      <div className="space-y-4 text-gray-400 leading-relaxed">{children}</div>
    </section>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-3 text-gray-200">{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

const tocItems = [
  { id: "installation", label: "Installation" },
  { id: "quickstart", label: "Quick Start" },
  { id: "watchers", label: "What Each Watcher Monitors" },
  { id: "license", label: "Activating a License" },
  { id: "non-interactive", label: "Non-Interactive Setup" },
  { id: "troubleshooting", label: "Troubleshooting" },
];

export default function DocsPage() {
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
          <Link href="/#monitors" className="hover:text-white transition">Monitors</Link>
          <Link href="/#pricing" className="hover:text-white transition">Pricing</Link>
          <a href="https://github.com/turleydesigns/clawdoctor" className="hover:text-white transition">GitHub</a>
        </div>
      </nav>

      <div className="relative max-w-5xl mx-auto px-6 pb-24 pt-8">
        <div className="flex gap-12">
          {/* Sidebar TOC */}
          <aside className="hidden lg:block w-52 shrink-0">
            <div className="sticky top-8">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">On this page</p>
              <nav className="space-y-1">
                {tocItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block text-sm text-gray-500 hover:text-gray-200 py-1 transition"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">
            <div className="mb-10">
              <h1 className="text-4xl font-bold mb-3">Documentation</h1>
              <p className="text-gray-400 text-lg">Everything you need to get ClawDoctor running and monitoring your OpenClaw setup.</p>
            </div>

            <Section id="installation" title="Installation">
              <p>ClawDoctor is distributed as an npm package. Requires Node.js 18 or newer.</p>
              <CodeBlock>{`npm install -g clawdoctor`}</CodeBlock>
              <p>After installing, verify it works:</p>
              <CodeBlock>{`clawdoctor --version`}</CodeBlock>
              <p>ClawDoctor stores its config and event database in <code className="text-green-400/80 bg-green-400/5 px-1.5 py-0.5 rounded font-mono text-sm">~/.clawdoctor/</code>.</p>
            </Section>

            <Section id="quickstart" title="Quick Start">
              <p>Run the interactive setup wizard to configure OpenClaw detection and Telegram alerts:</p>
              <CodeBlock>{`clawdoctor init`}</CodeBlock>
              <p>The wizard will:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-400 ml-2">
                <li>Detect your OpenClaw installation path</li>
                <li>Configure Telegram alerts (optional)</li>
                <li>Let you choose which watchers to enable</li>
                <li>Ask whether to enable auto-fix (gateway restart)</li>
              </ul>
              <p>Once configured, start the monitoring daemon:</p>
              <CodeBlock>{`clawdoctor start`}</CodeBlock>
              <p>Check current health status at any time:</p>
              <CodeBlock>{`clawdoctor status`}</CodeBlock>
              <p>View recent events:</p>
              <CodeBlock>{`clawdoctor log
clawdoctor log -n 100 -w GatewayWatcher
clawdoctor log -s error`}</CodeBlock>
              <p>Stop the daemon:</p>
              <CodeBlock>{`clawdoctor stop`}</CodeBlock>

              <SubSection title="Install as a systemd service">
                <p>To run ClawDoctor automatically on login:</p>
                <CodeBlock>{`clawdoctor install-service
systemctl --user daemon-reload
systemctl --user enable clawdoctor
systemctl --user start clawdoctor`}</CodeBlock>
              </SubSection>
            </Section>

            <Section id="watchers" title="What Each Watcher Monitors">
              <div className="space-y-6">
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <h3 className="font-semibold text-green-400 mb-2">GatewayWatcher (every 30s)</h3>
                  <p>Checks whether your OpenClaw gateway process is running. Uses three fallback methods in order: <code className="text-green-400/80 bg-green-400/5 px-1 rounded font-mono text-sm">openclaw gateway status</code>, systemctl, and pgrep. If the gateway is down and auto-fix is enabled, it attempts a restart and alerts you on Telegram.</p>
                </div>
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <h3 className="font-semibold text-blue-400 mb-2">CronWatcher (every 60s)</h3>
                  <p>Reads <code className="text-green-400/80 bg-green-400/5 px-1 rounded font-mono text-sm">~/.openclaw/cron/jobs.json</code> and checks each cron job for consecutive errors (3 or more triggers an alert), failed delivery, and overdue runs (30+ minutes past scheduled time).</p>
                </div>
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <h3 className="font-semibold text-amber-400 mb-2">SessionWatcher (every 60s)</h3>
                  <p>Scans agent session files under <code className="text-green-400/80 bg-green-400/5 px-1 rounded font-mono text-sm">~/.openclaw/agents/*/sessions/*.jsonl</code>. Detects sessions with errors, aborted sessions, and stuck sessions that have been running for over an hour.</p>
                </div>
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <h3 className="font-semibold text-purple-400 mb-2">AuthWatcher (every 60s)</h3>
                  <p>Searches system journals and log files for auth failure patterns: 401/403 responses, expired tokens, and auth-related error strings. Catches problems before they cascade across your agents.</p>
                </div>
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <h3 className="font-semibold text-red-400 mb-2">CostWatcher (every 5 min)</h3>
                  <p>Reads session cost data from OpenClaw session files. Calculates a rolling baseline from the last 20 historical sessions. Flags any session that spends 3x more than your baseline, catching runaway spend before it gets expensive.</p>
                </div>
              </div>
            </Section>

            <Section id="license" title="Activating a License">
              <p>After purchasing a Diagnose or Heal plan, you will receive a license key. Activate it with:</p>
              <CodeBlock>{`clawdoctor activate <your-license-key>`}</CodeBlock>
              <p>This validates the key against the ClawDoctor API and stores it in <code className="text-green-400/80 bg-green-400/5 px-1.5 py-0.5 rounded font-mono text-sm">~/.clawdoctor/license.json</code>. On success, it shows your plan name and the features it unlocks.</p>

              <SubSection title="Using an environment variable">
                <p>You can set the license key via environment variable. When <code className="text-green-400/80 bg-green-400/5 px-1.5 py-0.5 rounded font-mono text-sm">CLAWDOCTOR_KEY</code> is set, it takes precedence over <code className="text-green-400/80 bg-green-400/5 px-1.5 py-0.5 rounded font-mono text-sm">~/.clawdoctor/license.json</code>:</p>
                <CodeBlock>{`export CLAWDOCTOR_KEY=your-license-key
clawdoctor start`}</CodeBlock>
                <p>If neither the environment variable nor <code className="text-green-400/80 bg-green-400/5 px-1.5 py-0.5 rounded font-mono text-sm">~/.clawdoctor/license.json</code> is present, ClawDoctor runs on the free plan.</p>
              </SubSection>

              <SubSection title="Check your current plan">
                <CodeBlock>{`clawdoctor plan`}</CodeBlock>
                <p>This shows your current tier (free/diagnose/heal), active features, and key status.</p>
              </SubSection>

              <SubSection title="Plan limits">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border border-white/10 rounded-lg overflow-hidden">
                    <thead>
                      <tr className="bg-white/[0.04] text-gray-300">
                        <th className="text-left px-4 py-3 font-semibold">Feature</th>
                        <th className="text-left px-4 py-3 font-semibold">Watch (Free)</th>
                        <th className="text-left px-4 py-3 font-semibold">Diagnose ($9)</th>
                        <th className="text-left px-4 py-3 font-semibold">Heal ($19)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.06]">
                      <tr className="text-gray-400">
                        <td className="px-4 py-3">Max monitors</td>
                        <td className="px-4 py-3">5</td>
                        <td className="px-4 py-3">20</td>
                        <td className="px-4 py-3">Unlimited</td>
                      </tr>
                      <tr className="text-gray-400">
                        <td className="px-4 py-3">All watchers</td>
                        <td className="px-4 py-3">No</td>
                        <td className="px-4 py-3">Yes</td>
                        <td className="px-4 py-3">Yes</td>
                      </tr>
                      <tr className="text-gray-400">
                        <td className="px-4 py-3">Auto-fix</td>
                        <td className="px-4 py-3">No</td>
                        <td className="px-4 py-3">No</td>
                        <td className="px-4 py-3">Yes</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </SubSection>
            </Section>

            <Section id="non-interactive" title="Non-Interactive Setup">
              <p>For automated environments and CI/CD pipelines, use flags to skip prompts:</p>
              <CodeBlock>{`clawdoctor init \\
  --openclaw-path /home/user/.openclaw \\
  --telegram-token 123456:ABCdef \\
  --telegram-chat -1001234567890 \\
  --auto-fix \\
  --no-prompt`}</CodeBlock>
              <p>All flags are optional. If you omit a flag, its default value is used. The <code className="text-green-400/80 bg-green-400/5 px-1.5 py-0.5 rounded font-mono text-sm">--no-prompt</code> flag suppresses all interactive questions and accepts defaults for anything not specified.</p>

              <SubSection title="Available flags">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border border-white/10 rounded-lg overflow-hidden">
                    <thead>
                      <tr className="bg-white/[0.04] text-gray-300">
                        <th className="text-left px-4 py-3 font-semibold">Flag</th>
                        <th className="text-left px-4 py-3 font-semibold">Description</th>
                        <th className="text-left px-4 py-3 font-semibold">Default</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.06] text-gray-400">
                      <tr><td className="px-4 py-3 font-mono text-green-400/80">--openclaw-path</td><td className="px-4 py-3">Path to OpenClaw data directory</td><td className="px-4 py-3">~/.openclaw</td></tr>
                      <tr><td className="px-4 py-3 font-mono text-green-400/80">--telegram-token</td><td className="px-4 py-3">Telegram bot token</td><td className="px-4 py-3">(none)</td></tr>
                      <tr><td className="px-4 py-3 font-mono text-green-400/80">--telegram-chat</td><td className="px-4 py-3">Telegram chat ID</td><td className="px-4 py-3">(none)</td></tr>
                      <tr><td className="px-4 py-3 font-mono text-green-400/80">--auto-fix</td><td className="px-4 py-3">Enable gateway auto-restart</td><td className="px-4 py-3">false</td></tr>
                      <tr><td className="px-4 py-3 font-mono text-green-400/80">--no-prompt</td><td className="px-4 py-3">Skip all interactive prompts</td><td className="px-4 py-3">false</td></tr>
                    </tbody>
                  </table>
                </div>
              </SubSection>
            </Section>

            <Section id="troubleshooting" title="Troubleshooting">
              <SubSection title="Config not found error">
                <p>If you see <code className="text-green-400/80 bg-green-400/5 px-1.5 py-0.5 rounded font-mono text-sm">Config not found</code>, run <code className="text-green-400/80 bg-green-400/5 px-1.5 py-0.5 rounded font-mono text-sm">clawdoctor init</code> first to create the config file.</p>
              </SubSection>

              <SubSection title="Gateway watcher always shows down">
                <p>Make sure <code className="text-green-400/80 bg-green-400/5 px-1.5 py-0.5 rounded font-mono text-sm">openclaw</code> is in your PATH. Run <code className="text-green-400/80 bg-green-400/5 px-1.5 py-0.5 rounded font-mono text-sm">which openclaw</code> to check. If you installed OpenClaw in a non-standard location, update <code className="text-green-400/80 bg-green-400/5 px-1.5 py-0.5 rounded font-mono text-sm">openclawPath</code> in <code className="text-green-400/80 bg-green-400/5 px-1.5 py-0.5 rounded font-mono text-sm">~/.clawdoctor/config.json</code>.</p>
              </SubSection>

              <SubSection title="Telegram alerts not arriving">
                <p>Verify your bot token and chat ID by running <code className="text-green-400/80 bg-green-400/5 px-1.5 py-0.5 rounded font-mono text-sm">clawdoctor status</code>. The Telegram field will show enabled or disabled. Re-run <code className="text-green-400/80 bg-green-400/5 px-1.5 py-0.5 rounded font-mono text-sm">clawdoctor init</code> to reconfigure. Make sure your bot has been started (send <code className="text-green-400/80 bg-green-400/5 px-1.5 py-0.5 rounded font-mono text-sm">/start</code> to it first).</p>
              </SubSection>

              <SubSection title="Daemon exits immediately">
                <p>Check for port conflicts or permission issues with:</p>
                <CodeBlock>{`clawdoctor start 2>&1 | head -20`}</CodeBlock>
                <p>Also check if a stale PID file exists:</p>
                <CodeBlock>{`cat ~/.clawdoctor/clawdoctor.pid
rm ~/.clawdoctor/clawdoctor.pid  # if daemon is not running`}</CodeBlock>
              </SubSection>

              <SubSection title="License key not recognized">
                <p>Make sure you are connected to the internet and <code className="text-green-400/80 bg-green-400/5 px-1.5 py-0.5 rounded font-mono text-sm">clawdoctor.dev</code> is reachable. Run:</p>
                <CodeBlock>{`clawdoctor activate <key> 2>&1`}</CodeBlock>
                <p>If the error persists, contact support via GitHub issues.</p>
              </SubSection>

              <SubSection title="Config file location">
                <p>All ClawDoctor files live in <code className="text-green-400/80 bg-green-400/5 px-1.5 py-0.5 rounded font-mono text-sm">~/.clawdoctor/</code>:</p>
                <CodeBlock>{`~/.clawdoctor/
  config.json      # Main config
  events.db        # SQLite event history
  clawdoctor.pid   # Daemon PID (when running)
  license.json     # License key (after activation)`}</CodeBlock>
              </SubSection>
            </Section>
          </main>
        </div>
      </div>

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
