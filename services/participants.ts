import { prisma } from "@/lib/prisma";
import { Draw, Participant } from "@prisma/client";

export async function getParticipants(draw: Draw) {
  return prisma.participant.findMany({
    where: {
      drawId: draw.id,
    },
  });
}

export async function removeParticipant(participant: Participant) {
  return prisma.participant.delete({
    where: {
      id: participant.id,
    },
  });
}
