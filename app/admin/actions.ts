"use server";
import { v4 as uuid } from "uuid";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Draw, Participant } from "@prisma/client";

export async function addParticipant(draw: Draw, name: string) {
  if (!name.trim()) return;
  await prisma.participant.create({
    data: {
      drawId: draw.id,
      name,
      uuid: uuid(),
    },
  });

  revalidatePath(`/admin/draws/${draw.slug}`);
}

export async function removeParticipant(participant: Participant) {
  const draw = await prisma.draw.findUnique({
    where: {
      id: participant.drawId,
    },
  });
  await prisma.participant.delete({
    where: {
      id: participant.id,
    },
  });

  revalidatePath(`/admin/draws/${draw!.slug}`);
}

export async function getParticipant(id: number) {
  const participant = await prisma.participant.findUnique({
    where: { id },
  });
  return participant;
}
