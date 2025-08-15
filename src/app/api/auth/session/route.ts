import { auth } from "@/server/lucia/lucia";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { user, session } = await auth();
    return NextResponse.json({ user, session });
  } catch {
    return NextResponse.json({ user: null, session: null }, { status: 401 });
  }
}
