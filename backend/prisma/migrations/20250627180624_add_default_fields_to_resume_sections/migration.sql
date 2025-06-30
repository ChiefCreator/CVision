/*
  Warnings:

  - The required column `id` was added to the `ProfessionalSummary` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "CourseSection" ADD COLUMN     "defaultTitle" TEXT,
ADD COLUMN     "title" TEXT;

-- AlterTable
ALTER TABLE "CustomSection" ADD COLUMN     "defaultTitle" TEXT,
ADD COLUMN     "title" TEXT;

-- AlterTable
ALTER TABLE "EducationSection" ADD COLUMN     "defaultTitle" TEXT,
ADD COLUMN     "title" TEXT;

-- AlterTable
ALTER TABLE "EmploymentHistorySection" ADD COLUMN     "defaultTitle" TEXT,
ADD COLUMN     "title" TEXT;

-- AlterTable
ALTER TABLE "LanguageSection" ADD COLUMN     "defaultTitle" TEXT,
ADD COLUMN     "title" TEXT;

-- AlterTable
ALTER TABLE "LinkSection" ADD COLUMN     "defaultTitle" TEXT,
ADD COLUMN     "title" TEXT;

-- AlterTable
ALTER TABLE "PersonalDetails" ADD COLUMN     "defaultTitle" TEXT,
ADD COLUMN     "title" TEXT;

-- AlterTable
ALTER TABLE "ProfessionalSummary" ADD COLUMN     "defaultTitle" TEXT,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "title" TEXT,
ADD CONSTRAINT "ProfessionalSummary_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "SkillSection" ADD COLUMN     "defaultTitle" TEXT,
ADD COLUMN     "title" TEXT;
