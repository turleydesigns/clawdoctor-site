import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const RESEND_API_KEY =
  process.env.RESEND_API_KEY ?? "re_9ycJYScu_6wKcdfNmqpP6qxqhS4ZYCnad";

const FROM_ADDRESS =
  process.env.ONBOARDING_FROM ?? "Matt from ClawDoctor <matt@clawdoctor.dev>";

function buildEmailHtml(email: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ClawDoctor is running</title>
</head>
<body style="margin:0;padding:0;background:#0d1117;font-family:'Courier New',Courier,monospace;color:#e6edf3;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0d1117;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="background:#161b22;border:1px solid #30363d;border-radius:8px;">
          <tr>
            <td style="padding:32px 40px 24px;">
              <!-- Header -->
              <p style="margin:0 0 24px;font-size:13px;color:#7ee787;">
                <strong>●</strong>&nbsp;clawdoctor daemon started
              </p>
              <h1 style="margin:0 0 20px;font-size:22px;font-weight:700;color:#e6edf3;line-height:1.3;">
                ClawDoctor is running
              </h1>
              <p style="margin:0 0 20px;font-size:15px;color:#8b949e;line-height:1.6;">
                Hey ${email} —
              </p>
              <p style="margin:0 0 20px;font-size:15px;color:#c9d1d9;line-height:1.6;">
                ClawDoctor installed. Your OpenClaw setup is now being watched.
              </p>

              <!-- What it's watching -->
              <div style="background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:20px 24px;margin:0 0 24px;">
                <p style="margin:0 0 12px;font-size:12px;color:#7ee787;text-transform:uppercase;letter-spacing:0.08em;">
                  Active watchers
                </p>
                <p style="margin:0 0 8px;font-size:13px;color:#c9d1d9;">
                  <span style="color:#7ee787;">✓</span>&nbsp; <strong>GatewayWatcher</strong> — checks every 30s
                </p>
                <p style="margin:0 0 8px;font-size:13px;color:#c9d1d9;">
                  <span style="color:#7ee787;">✓</span>&nbsp; <strong>CronWatcher</strong> — checks every 60s
                </p>
                <p style="margin:0 0 8px;font-size:13px;color:#c9d1d9;">
                  <span style="color:#7ee787;">✓</span>&nbsp; <strong>SessionWatcher</strong> — checks every 60s
                </p>
                <p style="margin:0 0 8px;font-size:13px;color:#c9d1d9;">
                  <span style="color:#7ee787;">✓</span>&nbsp; <strong>AuthWatcher</strong> — checks every 60s
                </p>
                <p style="margin:0 0 0;font-size:13px;color:#c9d1d9;">
                  <span style="color:#7ee787;">✓</span>&nbsp; <strong>CostWatcher</strong> — checks every 5m
                </p>
              </div>

              <!-- Next steps -->
              <p style="margin:0 0 12px;font-size:14px;color:#c9d1d9;line-height:1.6;">
                <strong>Three things to do now:</strong>
              </p>
              <p style="margin:0 0 10px;font-size:14px;color:#c9d1d9;line-height:1.6;">
                <span style="color:#58a6ff;">1.</span>&nbsp; Run <code style="background:#0d1117;border:1px solid #30363d;padding:2px 6px;border-radius:4px;font-size:12px;color:#79c0ff;">clawdoctor status</code> to confirm your config and run a one-shot check.
              </p>
              <p style="margin:0 0 10px;font-size:14px;color:#c9d1d9;line-height:1.6;">
                <span style="color:#58a6ff;">2.</span>&nbsp; Set up Telegram alerts if you haven't: <code style="background:#0d1117;border:1px solid #30363d;padding:2px 6px;border-radius:4px;font-size:12px;color:#79c0ff;">clawdoctor init</code> and fill in your bot token + chat ID.
              </p>
              <p style="margin:0 0 24px;font-size:14px;color:#c9d1d9;line-height:1.6;">
                <span style="color:#58a6ff;">3.</span>&nbsp; To keep it running across reboots: <code style="background:#0d1117;border:1px solid #30363d;padding:2px 6px;border-radius:4px;font-size:12px;color:#79c0ff;">clawdoctor install-service</code>
              </p>

              <!-- CTA -->
              <table cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;">
                <tr>
                  <td style="background:#238636;border-radius:6px;padding:12px 24px;">
                    <a href="https://clawdoctor.dev/docs" style="color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;">
                      Read the docs →
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Footer -->
              <hr style="border:none;border-top:1px solid #30363d;margin:0 0 20px;">
              <p style="margin:0;font-size:12px;color:#6e7681;line-height:1.6;">
                — Matt<br>
                <a href="https://clawdoctor.dev" style="color:#58a6ff;text-decoration:none;">clawdoctor.dev</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildEmailText(email: string): string {
  return `ClawDoctor is running

Hey ${email} —

ClawDoctor installed. Your OpenClaw setup is now being watched.

Active watchers:
  ✓ GatewayWatcher  — every 30s
  ✓ CronWatcher     — every 60s
  ✓ SessionWatcher  — every 60s
  ✓ AuthWatcher     — every 60s
  ✓ CostWatcher     — every 5m

Three things to do now:

1. Run: clawdoctor status
   Confirms your config and runs a one-shot check.

2. Set up Telegram alerts: clawdoctor init
   Fill in your bot token and chat ID to get alerted when things break.

3. Keep it running across reboots: clawdoctor install-service

Docs: https://clawdoctor.dev/docs

— Matt
https://clawdoctor.dev
`;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!email) {
    return NextResponse.json({ error: "email is required" }, { status: 400 });
  }

  const resend = new Resend(RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: email,
      subject: "ClawDoctor is running",
      html: buildEmailHtml(email),
      text: buildEmailText(email),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[install-hook] Failed to send email:", err);
    return NextResponse.json(
      { error: `Failed to send email: ${String(err)}` },
      { status: 500 }
    );
  }
}
