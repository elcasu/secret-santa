-- CreateTable
CREATE TABLE "Draw" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Draw_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Participant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "assignedTo" INTEGER,
    "chosenBy" INTEGER,
    "drawId" INTEGER NOT NULL,
    "uuid" TEXT NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Draw_slug_key" ON "Draw"("slug");

-- CreateIndex
CREATE INDEX "Participant_drawId_idx" ON "Participant"("drawId");

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_drawId_fkey" FOREIGN KEY ("drawId") REFERENCES "Draw"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
