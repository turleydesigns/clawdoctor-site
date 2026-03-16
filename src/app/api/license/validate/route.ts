import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const PLAN_FEATURES: Record<string, string[]> = {
  diagnose: [
    "Up to 20 monitors",
    "30-day event history",
    "Smart alerts with root cause",
    "Known-issue pattern matching",
    "Telegram, Slack, and Discord alerts",
  ],
  heal: [
    "Unlimited monitors",
    "90-day event history",
    "Auto-fix (restart, retry)",
    "Approval flow for risky fixes",
    "Full audit trail and rollback",
    "Everything in Diagnose",
  ],
};

export async function POST(req: NextRequest): Promise<NextResponse> {
  let body: { key?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ valid: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const { key } = body;
  if (!key || typeof key !== "string") {
    return NextResponse.json({ valid: false, error: "Missing key" }, { status: 400 });
  }

  const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!UUID_RE.test(key)) {
    return NextResponse.json({ valid: false });
  }

  try {
    const results = await stripe.subscriptions.search({
      query: `metadata['license_key']:'${key}'`,
      limit: 1,
    });

    if (results.data.length === 0) {
      return NextResponse.json({ valid: false });
    }

    const sub = results.data[0];
    if (sub.status !== "active") {
      return NextResponse.json({ valid: false });
    }

    const plan = (sub.metadata.plan as "diagnose" | "heal") ?? "diagnose";
    return NextResponse.json({
      valid: true,
      plan,
      features: PLAN_FEATURES[plan] ?? [],
    });
  } catch {
    return NextResponse.json({ valid: false, error: "Validation failed" }, { status: 500 });
  }
}
