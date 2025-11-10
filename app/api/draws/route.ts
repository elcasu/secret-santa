import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const { slug, name } = body;
  if (!slug || !name)
    return NextResponse.json({ error: "missing" }, { status: 400 });

  const existing = await prisma.draw.findUnique({ where: { slug } });
  if (existing)
    return NextResponse.json({ error: "slug exists" }, { status: 400 });

  const draw = await prisma.draw.create({ data: { slug, name } });
  return NextResponse.json(draw);
}
