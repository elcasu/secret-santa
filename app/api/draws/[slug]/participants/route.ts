import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  const { name, email } = await req.json();
  if (!name)
    return NextResponse.json({ error: "missing name" }, { status: 400 });

  const draw = await prisma.draw.findUnique({ where: { slug } });
  if (!draw)
    return NextResponse.json({ error: "draw not found" }, { status: 404 });

  const participant = await prisma.participant.create({
    data: { name, email, drawId: draw.id },
  });
  return NextResponse.json(participant);
}

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = await params;
  const draw = await prisma.draw.findUnique({
    where: { slug },
    include: { participants: true },
  });
  if (!draw)
    return NextResponse.json({ error: "draw not found" }, { status: 404 });
  return NextResponse.json(draw.participants);
}
