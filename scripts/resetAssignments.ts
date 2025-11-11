import { prisma } from "@/lib/prisma";

async function main() {
  const slug = process.argv[2];
  if (!slug) {
    console.error(
      "⚠️ You must provide a draw slug, e.g. `npm run reset-assignments my-draw`"
    );
    process.exit(1);
  }
  console.log(`🔄 Resetting assignments for draw '${slug}'...`);

  const draw = await prisma.draw.findUnique({ where: { slug } });
  if (!draw) {
    console.error(`❌ Draw '${slug}' not found.`);
    process.exit(1);
  }

  const result = await prisma.participant.updateMany({
    where: { drawId: draw.id },
    data: {
      assignedTo: null,
      chosenBy: null,
    },
  });
  console.log(
    `✅ Assignments reset successfully (${result.count} participants updated).`
  );
}

main()
  .catch((err) => {
    console.error("❌ Error resetting assignments:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
