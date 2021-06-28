-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('RESOURCE', 'ASSIGNMENT', 'QUIZ');

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "universityId" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,
    "type" "ActivityType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "files" TEXT[],

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resource" (
    "activityId" TEXT NOT NULL,

    PRIMARY KEY ("activityId")
);

-- CreateTable
CREATE TABLE "Assignment" (
    "activityId" TEXT NOT NULL,

    PRIMARY KEY ("activityId")
);

-- CreateTable
CREATE TABLE "Quiz" (
    "activityId" TEXT NOT NULL,

    PRIMARY KEY ("activityId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Activity.id_universityId_unique" ON "Activity"("id", "universityId");

-- AddForeignKey
ALTER TABLE "Activity" ADD FOREIGN KEY ("universityId") REFERENCES "University"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resource" ADD FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quiz" ADD FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;
