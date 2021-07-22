-- DropForeignKey
ALTER TABLE "UniversityUser" DROP CONSTRAINT "UniversityUser_roleId_fkey";

-- AddForeignKey
ALTER TABLE "UniversityUser" ADD FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
