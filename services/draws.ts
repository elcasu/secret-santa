import { prisma } from "@/lib/prisma";

export async function getDraws() {
  return prisma.draw.findMany();
}

export async function getDrawBySlug(slug: string) {
  return prisma.draw.findUnique({
    where: { slug },
  });
}
