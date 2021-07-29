-- CreateTable
CREATE TABLE "UserAssignment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "assignmentId" TEXT NOT NULL,
    "grade" DOUBLE PRECISION,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "files" TEXT[],

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAssignment.userId_assignmentId_unique" ON "UserAssignment"("userId", "assignmentId");

-- AddForeignKey
ALTER TABLE "UserAssignment" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAssignment" ADD FOREIGN KEY ("assignmentId") REFERENCES "Assignment"("activityId") ON DELETE CASCADE ON UPDATE CASCADE;
