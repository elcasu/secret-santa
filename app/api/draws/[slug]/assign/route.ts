import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// body: { participantId }
export async function POST(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = await params;
  const { participantId } = await req.json();
  if (!participantId)
    return NextResponse.json(
      { error: "missing participantId" },
      { status: 400 }
    );

  const draw = await prisma.draw.findUnique({
    where: { slug },
    include: { participants: true },
  });
  if (!draw)
    return NextResponse.json({ error: "draw not found" }, { status: 404 });

  // refresh participants from DB to avoid race conditions
  const participants = draw.participants;

  // get list of available participants (not chosen yet) and not self
  // const available = participants.filter(
  //   (p) => p.chosenBy == null && p.id !== participantId
  // );
  const available = participants;

  //if (available.length === 0) {
  //  return NextResponse.json(
  //    { error: "no available participants" },
  //    { status: 400 }
  //  );
  //}

  // pick random
  const chosen = available[Math.floor(Math.random() * available.length)];

  // persist assignment inside a transaction
  await prisma.$transaction([
    prisma.participant.update({
      where: { id: chosen.id },
      data: { chosenBy: participantId },
    }),
    prisma.participant.update({
      where: { id: participantId },
      data: { assignedTo: chosen.id },
    }),
  ]);

  return NextResponse.json({ assignedTo: chosen });
}
