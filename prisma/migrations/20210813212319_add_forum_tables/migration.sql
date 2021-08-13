-- AlterEnum
ALTER TYPE "ActivityType" ADD VALUE 'FORUM';

-- CreateTable
CREATE TABLE "Forum" (
    "activityId" TEXT NOT NULL,
    "universityId" TEXT NOT NULL,
    "universityUserId" TEXT NOT NULL,

    PRIMARY KEY ("activityId")
);

-- CreateTable
CREATE TABLE "ForumComment" (
    "id" TEXT NOT NULL,
    "forumId" TEXT NOT NULL,
    "universityUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "text" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Forum.activityId_universityId_unique" ON "Forum"("activityId", "universityId");

-- AddForeignKey
ALTER TABLE "Forum" ADD FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Forum" ADD FOREIGN KEY ("universityId") REFERENCES "University"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Forum" ADD FOREIGN KEY ("universityUserId") REFERENCES "UniversityUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForumComment" ADD FOREIGN KEY ("forumId") REFERENCES "Forum"("activityId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForumComment" ADD FOREIGN KEY ("universityUserId") REFERENCES "UniversityUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
