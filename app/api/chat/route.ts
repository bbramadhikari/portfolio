import { NextResponse } from "next/server";
import { answer, chatbotMeta } from "@/lib/chatbot";

export const runtime = "edge";

const MAX_LEN = 500;

export async function GET() {
  return NextResponse.json(chatbotMeta());
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { message?: unknown };
    const raw = body?.message;
    if (typeof raw !== "string" || raw.trim() === "") {
      return NextResponse.json(
        { error: "Missing 'message' field." },
        { status: 400 }
      );
    }
    if (raw.length > MAX_LEN) {
      return NextResponse.json(
        { error: `Message too long (max ${MAX_LEN} characters).` },
        { status: 413 }
      );
    }
    const reply = answer(raw);
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
