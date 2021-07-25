/*
  Warnings:

  - The primary key for the `UniversityUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[universityId,userId]` on the table `UniversityUser` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `UniversityUser` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "UniversityUser" DROP CONSTRAINT "UniversityUser_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "CollegeUser" (
    "id" TEXT NOT NULL,
    "universityUserId" TEXT NOT NULL,
    "collegeId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseUser" (
    "id" TEXT NOT NULL,
    "collegeUserId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CollegeUser.universityUserId_collegeId_unique" ON "CollegeUser"("universityUserId", "collegeId");

-- CreateIndex
CREATE UNIQUE INDEX "CourseUser.collegeUserId_courseId_unique" ON "CourseUser"("collegeUserId", "courseId");

-- CreateIndex
CREATE UNIQUE INDEX "UniversityUser.universityId_userId_unique" ON "UniversityUser"("universityId", "userId");

-- AddForeignKey
ALTER TABLE "CollegeUser" ADD FOREIGN KEY ("universityUserId") REFERENCES "UniversityUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollegeUser" ADD FOREIGN KEY ("collegeId") REFERENCES "College"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseUser" ADD FOREIGN KEY ("collegeUserId") REFERENCES "CollegeUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseUser" ADD FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
