/*
  Warnings:

  - You are about to drop the column `city` on the `Education` table. All the data in the column will be lost.
  - You are about to drop the column `degree` on the `Education` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Education` table. All the data in the column will be lost.
  - You are about to drop the column `end_date` on the `Education` table. All the data in the column will be lost.
  - You are about to drop the column `school` on the `Education` table. All the data in the column will be lost.
  - You are about to drop the column `section_id` on the `Education` table. All the data in the column will be lost.
  - You are about to drop the column `start_date` on the `Education` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `EmploymentHistory` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `EmploymentHistory` table. All the data in the column will be lost.
  - You are about to drop the column `employer` on the `EmploymentHistory` table. All the data in the column will be lost.
  - You are about to drop the column `end_date` on the `EmploymentHistory` table. All the data in the column will be lost.
  - You are about to drop the column `job_title` on the `EmploymentHistory` table. All the data in the column will be lost.
  - You are about to drop the column `section_id` on the `EmploymentHistory` table. All the data in the column will be lost.
  - You are about to drop the column `start_date` on the `EmploymentHistory` table. All the data in the column will be lost.
  - You are about to drop the `Course` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CourseSection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CustomData` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CustomSection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EducationSection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EmploymentHistorySection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Language` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LanguageSection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Link` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LinkSection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Skill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SkillSection` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[resume_id]` on the table `Education` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[resume_id]` on the table `EmploymentHistory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `order` to the `Education` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resume_id` to the `Education` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `EmploymentHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resume_id` to the `EmploymentHistory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_section_id_fkey";

-- DropForeignKey
ALTER TABLE "CourseSection" DROP CONSTRAINT "CourseSection_resume_id_fkey";

-- DropForeignKey
ALTER TABLE "CustomData" DROP CONSTRAINT "CustomData_section_id_fkey";

-- DropForeignKey
ALTER TABLE "CustomSection" DROP CONSTRAINT "CustomSection_resume_id_fkey";

-- DropForeignKey
ALTER TABLE "Education" DROP CONSTRAINT "Education_section_id_fkey";

-- DropForeignKey
ALTER TABLE "EducationSection" DROP CONSTRAINT "EducationSection_resume_id_fkey";

-- DropForeignKey
ALTER TABLE "EmploymentHistory" DROP CONSTRAINT "EmploymentHistory_section_id_fkey";

-- DropForeignKey
ALTER TABLE "EmploymentHistorySection" DROP CONSTRAINT "EmploymentHistorySection_resume_id_fkey";

-- DropForeignKey
ALTER TABLE "Language" DROP CONSTRAINT "Language_section_id_fkey";

-- DropForeignKey
ALTER TABLE "LanguageSection" DROP CONSTRAINT "LanguageSection_resume_id_fkey";

-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_section_id_fkey";

-- DropForeignKey
ALTER TABLE "LinkSection" DROP CONSTRAINT "LinkSection_resume_id_fkey";

-- DropForeignKey
ALTER TABLE "Skill" DROP CONSTRAINT "Skill_section_id_fkey";

-- DropForeignKey
ALTER TABLE "SkillSection" DROP CONSTRAINT "SkillSection_resume_id_fkey";

-- DropIndex
DROP INDEX "Education_section_id_key";

-- DropIndex
DROP INDEX "EmploymentHistory_section_id_key";

-- AlterTable
ALTER TABLE "Education" DROP COLUMN "city",
DROP COLUMN "degree",
DROP COLUMN "description",
DROP COLUMN "end_date",
DROP COLUMN "school",
DROP COLUMN "section_id",
DROP COLUMN "start_date",
ADD COLUMN     "defaultTitle" TEXT,
ADD COLUMN     "order" INTEGER NOT NULL,
ADD COLUMN     "resume_id" TEXT NOT NULL,
ADD COLUMN     "title" TEXT;

-- AlterTable
ALTER TABLE "EmploymentHistory" DROP COLUMN "city",
DROP COLUMN "description",
DROP COLUMN "employer",
DROP COLUMN "end_date",
DROP COLUMN "job_title",
DROP COLUMN "section_id",
DROP COLUMN "start_date",
ADD COLUMN     "defaultTitle" TEXT,
ADD COLUMN     "order" INTEGER NOT NULL,
ADD COLUMN     "resume_id" TEXT NOT NULL,
ADD COLUMN     "title" TEXT;

-- DropTable
DROP TABLE "Course";

-- DropTable
DROP TABLE "CourseSection";

-- DropTable
DROP TABLE "CustomData";

-- DropTable
DROP TABLE "CustomSection";

-- DropTable
DROP TABLE "EducationSection";

-- DropTable
DROP TABLE "EmploymentHistorySection";

-- DropTable
DROP TABLE "Language";

-- DropTable
DROP TABLE "LanguageSection";

-- DropTable
DROP TABLE "Link";

-- DropTable
DROP TABLE "LinkSection";

-- DropTable
DROP TABLE "Skill";

-- DropTable
DROP TABLE "SkillSection";

-- CreateTable
CREATE TABLE "EmploymentHistorySubsection" (
    "id" TEXT NOT NULL,
    "job_title" TEXT,
    "employer" TEXT,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "city" TEXT,
    "description" TEXT,
    "section_id" TEXT NOT NULL,

    CONSTRAINT "EmploymentHistorySubsection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EducationSubsection" (
    "id" TEXT NOT NULL,
    "school" TEXT,
    "degree" TEXT,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "city" TEXT,
    "description" TEXT,
    "section_id" TEXT NOT NULL,

    CONSTRAINT "EducationSubsection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Links" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "defaultTitle" TEXT,
    "order" INTEGER NOT NULL,
    "resume_id" TEXT NOT NULL,

    CONSTRAINT "Links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LinkSubsection" (
    "id" TEXT NOT NULL,
    "label" TEXT,
    "url" TEXT,
    "section_id" TEXT NOT NULL,

    CONSTRAINT "LinkSubsection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skills" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "defaultTitle" TEXT,
    "order" INTEGER NOT NULL,
    "isShowLevel" BOOLEAN NOT NULL DEFAULT true,
    "resume_id" TEXT NOT NULL,

    CONSTRAINT "Skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkillSubsection" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "level" "SkillLevel" NOT NULL,
    "section_id" TEXT NOT NULL,

    CONSTRAINT "SkillSubsection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Languages" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "defaultTitle" TEXT,
    "order" INTEGER NOT NULL,
    "resume_id" TEXT NOT NULL,

    CONSTRAINT "Languages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LanguageSubsection" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "level" "LanguageLevel",
    "section_id" TEXT NOT NULL,

    CONSTRAINT "LanguageSubsection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Courses" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "defaultTitle" TEXT,
    "order" INTEGER NOT NULL,
    "resume_id" TEXT NOT NULL,

    CONSTRAINT "Courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseSubsection" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "institution" TEXT,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "section_id" TEXT NOT NULL,

    CONSTRAINT "CourseSubsection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomSections" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "defaultTitle" TEXT,
    "order" INTEGER NOT NULL,
    "resume_id" TEXT NOT NULL,

    CONSTRAINT "CustomSections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomSubsection" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "city" TEXT,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "description" TEXT,
    "section_id" TEXT NOT NULL,

    CONSTRAINT "CustomSubsection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmploymentHistorySubsection_section_id_key" ON "EmploymentHistorySubsection"("section_id");

-- CreateIndex
CREATE UNIQUE INDEX "EducationSubsection_section_id_key" ON "EducationSubsection"("section_id");

-- CreateIndex
CREATE UNIQUE INDEX "Links_resume_id_key" ON "Links"("resume_id");

-- CreateIndex
CREATE UNIQUE INDEX "LinkSubsection_section_id_key" ON "LinkSubsection"("section_id");

-- CreateIndex
CREATE UNIQUE INDEX "Skills_resume_id_key" ON "Skills"("resume_id");

-- CreateIndex
CREATE UNIQUE INDEX "SkillSubsection_section_id_key" ON "SkillSubsection"("section_id");

-- CreateIndex
CREATE UNIQUE INDEX "Languages_resume_id_key" ON "Languages"("resume_id");

-- CreateIndex
CREATE UNIQUE INDEX "LanguageSubsection_section_id_key" ON "LanguageSubsection"("section_id");

-- CreateIndex
CREATE UNIQUE INDEX "Courses_resume_id_key" ON "Courses"("resume_id");

-- CreateIndex
CREATE UNIQUE INDEX "CourseSubsection_section_id_key" ON "CourseSubsection"("section_id");

-- CreateIndex
CREATE UNIQUE INDEX "CustomSections_resume_id_key" ON "CustomSections"("resume_id");

-- CreateIndex
CREATE UNIQUE INDEX "CustomSubsection_section_id_key" ON "CustomSubsection"("section_id");

-- CreateIndex
CREATE UNIQUE INDEX "Education_resume_id_key" ON "Education"("resume_id");

-- CreateIndex
CREATE UNIQUE INDEX "EmploymentHistory_resume_id_key" ON "EmploymentHistory"("resume_id");

-- AddForeignKey
ALTER TABLE "EmploymentHistory" ADD CONSTRAINT "EmploymentHistory_resume_id_fkey" FOREIGN KEY ("resume_id") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmploymentHistorySubsection" ADD CONSTRAINT "EmploymentHistorySubsection_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "EmploymentHistory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_resume_id_fkey" FOREIGN KEY ("resume_id") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EducationSubsection" ADD CONSTRAINT "EducationSubsection_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "Education"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Links" ADD CONSTRAINT "Links_resume_id_fkey" FOREIGN KEY ("resume_id") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LinkSubsection" ADD CONSTRAINT "LinkSubsection_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "Links"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skills" ADD CONSTRAINT "Skills_resume_id_fkey" FOREIGN KEY ("resume_id") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillSubsection" ADD CONSTRAINT "SkillSubsection_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "Skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Languages" ADD CONSTRAINT "Languages_resume_id_fkey" FOREIGN KEY ("resume_id") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LanguageSubsection" ADD CONSTRAINT "LanguageSubsection_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "Languages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Courses" ADD CONSTRAINT "Courses_resume_id_fkey" FOREIGN KEY ("resume_id") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseSubsection" ADD CONSTRAINT "CourseSubsection_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "Courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomSections" ADD CONSTRAINT "CustomSections_resume_id_fkey" FOREIGN KEY ("resume_id") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomSubsection" ADD CONSTRAINT "CustomSubsection_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "CustomSections"("id") ON DELETE CASCADE ON UPDATE CASCADE;
