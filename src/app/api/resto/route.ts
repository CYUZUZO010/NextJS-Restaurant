import { NextRequest, NextResponse } from "next/server";
import getPrisma from "@/lib/db";

// GET /api/resto - list items
export async function GET() {
  try {
    const prisma = getPrisma();
    const items = await prisma.resto.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(items);
  } catch (err) {
    console.error("GET /api/resto error", err);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

// POST /api/resto - create item
// body: { name: string; description?: string; priceCents?: number }
export async function POST(req: NextRequest) {
  try {
    const prisma = getPrisma();
    const body = await req.json();
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const description =
      typeof body?.description === "string" ? body.description : undefined;
    const priceCentsRaw = body?.priceCents;
    const priceCents =
      typeof priceCentsRaw === "number" && Number.isFinite(priceCentsRaw)
        ? Math.max(0, Math.floor(priceCentsRaw))
        : 0;

    if (!name) {
      return NextResponse.json(
        { error: "'name' is required" },
        { status: 400 }
      );
    }

    const created = await prisma.resto.create({
      data: { name, description, priceCents },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    console.error("POST /api/resto error", err);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}
