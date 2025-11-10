import { prisma } from "@/lib/prisma";
import { Draw } from "@prisma/client";

export async function getParticipants(draw: Draw) {
  return prisma.participant.findMany({
    where: {
      drawId: draw.id,
    },
  });
}
