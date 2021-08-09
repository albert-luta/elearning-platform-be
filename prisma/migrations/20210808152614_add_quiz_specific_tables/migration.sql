/*
  Warnings:

  - Added the required column `shuffleAnswers` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shuffleQuestions` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeClose` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeLimit` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeOpen` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `visible` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "shuffleAnswers" BOOLEAN NOT NULL,
ADD COLUMN     "shuffleQuestions" BOOLEAN NOT NULL,
ADD COLUMN     "timeClose" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "timeLimit" INTEGER NOT NULL,
ADD COLUMN     "timeOpen" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "visible" BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE "QuizQuestion" (
    "id" TEXT NOT NULL,
    "quizId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "maxGrade" DOUBLE PRECISION NOT NULL,
    "order" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "QuizQuestion.quizId_questionId_unique" ON "QuizQuestion"("quizId", "questionId");

-- AddForeignKey
ALTER TABLE "QuizQuestion" ADD FOREIGN KEY ("quizId") REFERENCES "Quiz"("activityId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizQuestion" ADD FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;
