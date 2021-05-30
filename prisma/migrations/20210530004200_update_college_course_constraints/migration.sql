/*
  Warnings:

  - A unique constraint covering the columns `[id,universityId]` on the table `College` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,universityId]` on the table `Course` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "College.id_universityId_unique" ON "College"("id", "universityId");

-- CreateIndex
CREATE UNIQUE INDEX "Course.id_universityId_unique" ON "Course"("id", "universityId");
