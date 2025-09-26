import { NextRequest, NextResponse } from "next/server";
import getPrisma from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const prisma = getPrisma();
    const body = await req.json();

    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body?.password === "string" ? body.password : "";
    const role = typeof body?.role === "string" ? body.role : "client";

    if (!email || !password) {
      return NextResponse.json({ error: "email and password are required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    if (role && user.role !== role) {
      return NextResponse.json({ error: "Invalid role" }, { status: 401 });
    }

    const payload = { id: user.id, name: user.name, email: user.email, role: user.role, createdAt: user.createdAt };
    return NextResponse.json(payload, { status: 200 });
  } catch (err) {
    console.error("POST /api/auth/signin error", err);
    return NextResponse.json({ error: "Failed to sign in" }, { status: 500 });
  }
}
