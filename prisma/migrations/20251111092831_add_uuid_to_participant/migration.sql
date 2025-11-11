/*
  Warnings:

  - Added the required column `uuid` to the `Participant` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Participant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "assignedTo" INTEGER,
    "chosenBy" INTEGER,
    "drawId" INTEGER NOT NULL,
    "uuid" TEXT NOT NULL,
    CONSTRAINT "Participant_drawId_fkey" FOREIGN KEY ("drawId") REFERENCES "Draw" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Participant" ("assignedTo", "chosenBy", "drawId", "email", "id", "name") SELECT "assignedTo", "chosenBy", "drawId", "email", "id", "name" FROM "Participant";
DROP TABLE "Participant";
ALTER TABLE "new_Participant" RENAME TO "Participant";
CREATE INDEX "Participant_drawId_idx" ON "Participant"("drawId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
