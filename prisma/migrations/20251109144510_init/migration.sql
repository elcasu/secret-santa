-- CreateTable
CREATE TABLE "Draw" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Participant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "assignedTo" INTEGER,
    "chosenBy" INTEGER,
    "drawId" INTEGER NOT NULL,
    CONSTRAINT "Participant_drawId_fkey" FOREIGN KEY ("drawId") REFERENCES "Draw" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Draw_slug_key" ON "Draw"("slug");

-- CreateIndex
CREATE INDEX "Participant_drawId_idx" ON "Participant"("drawId");
