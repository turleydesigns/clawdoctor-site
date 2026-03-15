import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import fs from "fs";
import crypto from "crypto";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const LICENSES_FILE = "/tmp/clawdoctor-licenses.json";

interface LicenseRecord {
  key: string;
  customerId: string;
  email: string;
  plan: "diagnose" | "heal";
  status: "active" | "cancelled";
  sessionId: string;
  createdAt: string;
}

function loadLicenses(): Record<string, LicenseRecord> {
  try {
    if (fs.existsSync(LICENSES_FILE)) {
      return JSON.parse(fs.readFileSync(LICENSES_FILE, "utf-8"));
    }
  } catch {
    // ignore parse errors
  }
  return {};
}

function saveLicenses(licenses: Record<string, LicenseRecord>): void {
  fs.writeFileSync(LICENSES_FILE, JSON.stringify(licenses, null, 2), "utf-8");
}

function generateLicenseKey(): string {
  return crypto.randomUUID();
}

function planFromPriceId(priceId: string): "diagnose" | "heal" {
  if (priceId === "price_1TB1Vj2sVp9zfTN09jxcLO7H") return "heal";
  return "diagnose";
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    return NextResponse.json({ error: `Webhook signature verification failed: ${String(err)}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const customerId = typeof session.customer === "string" ? session.customer : session.customer?.id ?? "";
    const email = session.customer_details?.email ?? session.customer_email ?? "";

    // Determine plan from line items
    let priceId = "price_1TB1Vi2sVp9zfTN0IcwDkQNp"; // default: diagnose
    try {
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 1 });
      if (lineItems.data[0]?.price?.id) {
        priceId = lineItems.data[0].price.id;
      }
    } catch {
      // fallback to default
    }

    const plan = planFromPriceId(priceId);
    const key = generateLicenseKey();

    const record: LicenseRecord = {
      key,
      customerId,
      email,
      plan,
      status: "active",
      sessionId: session.id,
      createdAt: new Date().toISOString(),
    };

    const licenses = loadLicenses();
    licenses[key] = record;
    // Also index by sessionId for fast lookup
    licenses[`session:${session.id}`] = record;
    saveLicenses(licenses);

    console.log(`[webhook] License created: ${key} (${plan}) for ${email}`);
  }

  return NextResponse.json({ received: true });
}
