import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Body = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  website?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const HITS = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const LIMIT = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (HITS.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  arr.push(now);
  HITS.set(ip, arr);
  return arr.length > LIMIT;
}

function clean(s: string): string {
  // Strip ASCII control characters (U+0000–U+001F and U+007F), then trim.
  // eslint-disable-next-line no-control-regex
  return s.replace(/[\x00-\x1F\x7F]/g, "").trim();
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, message: "Too many requests. Please try again in a minute." },
      { status: 429 }
    );
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid JSON." },
      { status: 400 }
    );
  }

  if (body.website && body.website.trim() !== "") {
    return NextResponse.json({
      ok: true,
      message: "Thanks — your message reached me.",
    });
  }

  const name = clean(body.name || "");
  const email = clean(body.email || "");
  const subject = clean(body.subject || "");
  const message = clean(body.message || "");

  if (!name || !email || !subject || !message) {
    return NextResponse.json(
      { ok: false, message: "All fields are required." },
      { status: 400 }
    );
  }
  if (name.length > 100 || subject.length > 150 || email.length > 150) {
    return NextResponse.json(
      { ok: false, message: "One or more fields exceed the maximum length." },
      { status: 400 }
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, message: "Please provide a valid email address." },
      { status: 400 }
    );
  }
  if (message.length < 10 || message.length > 5000) {
    return NextResponse.json(
      { ok: false, message: "Message must be 10–5000 characters." },
      { status: 400 }
    );
  }

  const to = process.env.CONTACT_TO_EMAIL || "psnbabu5@gmail.com";
  const apiKey = process.env.RESEND_API_KEY;
  const from =
    process.env.RESEND_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

  if (apiKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to,
          reply_to: email,
          subject: `[Portfolio] ${subject}`,
          text: `From: ${name} <${email}>\n\n${message}`,
        }),
      });
      if (!res.ok) {
        const text = await res.text();
        console.error("Resend error:", text);
        return NextResponse.json(
          { ok: false, message: "Email service rejected the message." },
          { status: 502 }
        );
      }
    } catch (err) {
      console.error("Resend request failed:", err);
      return NextResponse.json(
        { ok: false, message: "Could not reach email service." },
        { status: 502 }
      );
    }
  } else {
    console.log("[contact] no RESEND_API_KEY set — logging only:", {
      ip,
      name,
      email,
      subject,
      length: message.length,
    });
  }

  return NextResponse.json({
    ok: true,
    message: "Thanks — your message reached me. I'll reply within 24 hours.",
  });
}
