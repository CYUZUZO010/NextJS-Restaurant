import { NextRequest, NextResponse } from "next/server";
import getPrisma from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const prisma = getPrisma();
    const body = await req.json();

    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body?.password === "string" ? body.password : "";
    const roleRaw = typeof body?.role === "string" ? body.role : "client";

    if (!name || !email || !password) {
      return NextResponse.json({ error: "name, email and password are required" }, { status: 400 });
    }

    const role = roleRaw === "admin" || roleRaw === "waiter" ? roleRaw : "client";

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const created = await prisma.user.create({
      data: { name, email, passwordHash, role },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    console.error("POST /api/auth/signup error", err);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}
