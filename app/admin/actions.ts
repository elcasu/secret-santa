"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Draw } from "@prisma/client";

export async function addParticipant(draw: Draw, name: string) {
  if (!name.trim()) return;
  await prisma.participant.create({
    data: { drawId: draw.id, name },
  });

  revalidatePath(`/admin/draws/${draw.slug}`);
}
