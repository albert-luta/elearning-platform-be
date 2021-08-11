-- CreateTable
CREATE TABLE "UserQuiz" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "quizId" TEXT NOT NULL,
    "timeStart" TIMESTAMP(3) NOT NULL,
    "timeFinish" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserQuizQuestion" (
    "id" TEXT NOT NULL,
    "userQuizId" TEXT NOT NULL,
    "quizQuestionId" TEXT NOT NULL,
    "grade" DOUBLE PRECISION,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserQuestionAnswer" (
    "id" TEXT NOT NULL,
    "userQuizQuestionId" TEXT NOT NULL,
    "questionAnswerId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserQuiz.userId_quizId_unique" ON "UserQuiz"("userId", "quizId");

-- CreateIndex
CREATE UNIQUE INDEX "UserQuizQuestion.userQuizId_quizQuestionId_unique" ON "UserQuizQuestion"("userQuizId", "quizQuestionId");

-- CreateIndex
CREATE UNIQUE INDEX "UserQuestionAnswer.userQuizQuestionId_questionAnswerId_unique" ON "UserQuestionAnswer"("userQuizQuestionId", "questionAnswerId");

-- AddForeignKey
ALTER TABLE "UserQuiz" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserQuiz" ADD FOREIGN KEY ("quizId") REFERENCES "Quiz"("activityId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserQuizQuestion" ADD FOREIGN KEY ("userQuizId") REFERENCES "UserQuiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserQuizQuestion" ADD FOREIGN KEY ("quizQuestionId") REFERENCES "QuizQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserQuestionAnswer" ADD FOREIGN KEY ("userQuizQuestionId") REFERENCES "UserQuizQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserQuestionAnswer" ADD FOREIGN KEY ("questionAnswerId") REFERENCES "QuestionAnswer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
