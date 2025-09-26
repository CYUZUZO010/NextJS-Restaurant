import { NextResponse } from "next/server";
import getPrisma from "@/lib/db";

// GET /api/auth/users - list users (debug/verification)
export async function GET() {
  try {
    const prisma = getPrisma();
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });
    return NextResponse.json(users);
  } catch (err) {
    console.error("GET /api/auth/users error", err);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
