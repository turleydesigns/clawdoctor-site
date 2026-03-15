import { NextRequest, NextResponse } from "next/server";
import fs from "fs";

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

  const licenses = loadLicenses();
  const record = licenses[key];

  if (!record || record.status !== "active") {
    return NextResponse.json({ valid: false });
  }

  return NextResponse.json({
    valid: true,
    plan: record.plan,
    features: PLAN_FEATURES[record.plan] ?? [],
    email: record.email,
    createdAt: record.createdAt,
  });
}
