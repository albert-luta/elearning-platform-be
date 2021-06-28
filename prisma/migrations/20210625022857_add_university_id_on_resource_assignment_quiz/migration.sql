/*
  Warnings:

  - A unique constraint covering the columns `[activityId,universityId]` on the table `Assignment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[activityId,universityId]` on the table `Quiz` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[activityId,universityId]` on the table `Resource` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `universityId` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `universityId` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `universityId` to the `Resource` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Assignment" ADD COLUMN     "universityId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "universityId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Resource" ADD COLUMN     "universityId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Assignment.activityId_universityId_unique" ON "Assignment"("activityId", "universityId");

-- CreateIndex
CREATE UNIQUE INDEX "Quiz.activityId_universityId_unique" ON "Quiz"("activityId", "universityId");

-- CreateIndex
CREATE UNIQUE INDEX "Resource.activityId_universityId_unique" ON "Resource"("activityId", "universityId");

-- AddForeignKey
ALTER TABLE "Resource" ADD FOREIGN KEY ("universityId") REFERENCES "University"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD FOREIGN KEY ("universityId") REFERENCES "University"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quiz" ADD FOREIGN KEY ("universityId") REFERENCES "University"("id") ON DELETE CASCADE ON UPDATE CASCADE;
