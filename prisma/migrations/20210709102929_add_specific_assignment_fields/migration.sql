/*
  Warnings:

  - Added the required column `deadline` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `points` to the `Assignment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Assignment" ADD COLUMN     "deadline" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "points" DOUBLE PRECISION NOT NULL;
