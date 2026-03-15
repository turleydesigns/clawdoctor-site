import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import fs from "fs";

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
    // ignore
  }
  return {};
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  const sessionId = req.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  // First check local license store (indexed by sessionId)
  const licenses = loadLicenses();
  const localRecord = licenses[`session:${sessionId}`];
  if (localRecord) {
    return NextResponse.json({ key: localRecord.key, plan: localRecord.plan });
  }

  // Fallback: verify the session is paid via Stripe, then search by sessionId in all records
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: "Payment not completed" }, { status: 402 });
    }

    // Look through all records for a matching sessionId
    const allRecords = Object.values(licenses) as LicenseRecord[];
    const match = allRecords.find((r) => r.sessionId === sessionId && r.key && !r.key.startsWith("session:"));
    if (match) {
      return NextResponse.json({ key: match.key, plan: match.plan });
    }

    // Webhook may not have fired yet; return a pending response
    return NextResponse.json({ error: "License not yet generated. Please wait a moment and refresh." }, { status: 202 });
  } catch (err) {
    return NextResponse.json({ error: `Failed to verify session: ${String(err)}` }, { status: 500 });
  }
}
