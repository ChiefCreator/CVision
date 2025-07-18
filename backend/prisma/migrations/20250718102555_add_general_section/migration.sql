/*
  Warnings:

  - You are about to drop the column `defaultTitle` on the `Courses` table. All the data in the column will be lost.
  - You are about to drop the column `defaultTitle` on the `CustomSections` table. All the data in the column will be lost.
  - You are about to drop the column `defaultTitle` on the `Education` table. All the data in the column will be lost.
  - You are about to drop the column `defaultTitle` on the `EmploymentHistory` table. All the data in the column will be lost.
  - You are about to drop the column `defaultTitle` on the `ExtraCurricularActivities` table. All the data in the column will be lost.
  - You are about to drop the column `defaultTitle` on the `Hobbies` table. All the data in the column will be lost.
  - You are about to drop the column `defaultTitle` on the `Internships` table. All the data in the column will be lost.
  - You are about to drop the column `defaultTitle` on the `Languages` table. All the data in the column will be lost.
  - You are about to drop the column `defaultTitle` on the `Links` table. All the data in the column will be lost.
  - You are about to drop the column `defaultTitle` on the `PersonalDetails` table. All the data in the column will be lost.
  - You are about to drop the column `defaultTitle` on the `ProfessionalSummary` table. All the data in the column will be lost.
  - You are about to drop the column `defaultTitle` on the `References` table. All the data in the column will be lost.
  - You are about to drop the column `defaultTitle` on the `Skills` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[general_section_id]` on the table `Courses` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[general_section_id]` on the table `CustomSections` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[resume_id]` on the table `CustomSections` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[general_section_id]` on the table `Education` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[general_section_id]` on the table `EmploymentHistory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[general_section_id]` on the table `ExtraCurricularActivities` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[general_section_id]` on the table `Hobbies` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[general_section_id]` on the table `Internships` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[general_section_id]` on the table `Languages` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[general_section_id]` on the table `Links` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[general_section_id]` on the table `PersonalDetails` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[general_section_id]` on the table `ProfessionalSummary` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[general_section_id]` on the table `References` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[general_section_id]` on the table `Skills` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `general_section_id` to the `Courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `general_section_id` to the `CustomSections` table without a default value. This is not possible if the table is not empty.
  - Added the required column `general_section_id` to the `Education` table without a default value. This is not possible if the table is not empty.
  - Added the required column `general_section_id` to the `EmploymentHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `general_section_id` to the `ExtraCurricularActivities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `general_section_id` to the `Hobbies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `general_section_id` to the `Internships` table without a default value. This is not possible if the table is not empty.
  - Added the required column `general_section_id` to the `Languages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `general_section_id` to the `Links` table without a default value. This is not possible if the table is not empty.
  - Added the required column `general_section_id` to the `PersonalDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `general_section_id` to the `ProfessionalSummary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `general_section_id` to the `References` table without a default value. This is not possible if the table is not empty.
  - Added the required column `general_section_id` to the `Skills` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SectionTypes" AS ENUM ('personalDetails', 'professionalSummary', 'employmentHistory', 'education', 'links', 'skills', 'languages', 'courses', 'internships', 'hobbies', 'extraCurricularActivities', 'references', 'customSections');

-- AlterTable
ALTER TABLE "Courses" DROP COLUMN "defaultTitle",
ADD COLUMN     "general_section_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "CustomSections" DROP COLUMN "defaultTitle",
ADD COLUMN     "general_section_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Education" DROP COLUMN "defaultTitle",
ADD COLUMN     "general_section_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "EmploymentHistory" DROP COLUMN "defaultTitle",
ADD COLUMN     "general_section_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ExtraCurricularActivities" DROP COLUMN "defaultTitle",
ADD COLUMN     "general_section_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Hobbies" DROP COLUMN "defaultTitle",
ADD COLUMN     "general_section_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Internships" DROP COLUMN "defaultTitle",
ADD COLUMN     "general_section_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Languages" DROP COLUMN "defaultTitle",
ADD COLUMN     "general_section_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Links" DROP COLUMN "defaultTitle",
ADD COLUMN     "general_section_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PersonalDetails" DROP COLUMN "defaultTitle",
ADD COLUMN     "general_section_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProfessionalSummary" DROP COLUMN "defaultTitle",
ADD COLUMN     "general_section_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "References" DROP COLUMN "defaultTitle",
ADD COLUMN     "general_section_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Skills" DROP COLUMN "defaultTitle",
ADD COLUMN     "general_section_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "GeneralSection" (
    "id" TEXT NOT NULL,
    "type" "SectionTypes" NOT NULL,
    "defaultTitle" TEXT NOT NULL,
    "icon" TEXT,
    "description" TEXT,

    CONSTRAINT "GeneralSection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Courses_general_section_id_key" ON "Courses"("general_section_id");

-- CreateIndex
CREATE UNIQUE INDEX "CustomSections_general_section_id_key" ON "CustomSections"("general_section_id");

-- CreateIndex
CREATE UNIQUE INDEX "CustomSections_resume_id_key" ON "CustomSections"("resume_id");

-- CreateIndex
CREATE UNIQUE INDEX "Education_general_section_id_key" ON "Education"("general_section_id");

-- CreateIndex
CREATE UNIQUE INDEX "EmploymentHistory_general_section_id_key" ON "EmploymentHistory"("general_section_id");

-- CreateIndex
CREATE UNIQUE INDEX "ExtraCurricularActivities_general_section_id_key" ON "ExtraCurricularActivities"("general_section_id");

-- CreateIndex
CREATE UNIQUE INDEX "Hobbies_general_section_id_key" ON "Hobbies"("general_section_id");

-- CreateIndex
CREATE UNIQUE INDEX "Internships_general_section_id_key" ON "Internships"("general_section_id");

-- CreateIndex
CREATE UNIQUE INDEX "Languages_general_section_id_key" ON "Languages"("general_section_id");

-- CreateIndex
CREATE UNIQUE INDEX "Links_general_section_id_key" ON "Links"("general_section_id");

-- CreateIndex
CREATE UNIQUE INDEX "PersonalDetails_general_section_id_key" ON "PersonalDetails"("general_section_id");

-- CreateIndex
CREATE UNIQUE INDEX "ProfessionalSummary_general_section_id_key" ON "ProfessionalSummary"("general_section_id");

-- CreateIndex
CREATE UNIQUE INDEX "References_general_section_id_key" ON "References"("general_section_id");

-- CreateIndex
CREATE UNIQUE INDEX "Skills_general_section_id_key" ON "Skills"("general_section_id");

-- AddForeignKey
ALTER TABLE "PersonalDetails" ADD CONSTRAINT "PersonalDetails_general_section_id_fkey" FOREIGN KEY ("general_section_id") REFERENCES "GeneralSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessionalSummary" ADD CONSTRAINT "ProfessionalSummary_general_section_id_fkey" FOREIGN KEY ("general_section_id") REFERENCES "GeneralSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmploymentHistory" ADD CONSTRAINT "EmploymentHistory_general_section_id_fkey" FOREIGN KEY ("general_section_id") REFERENCES "GeneralSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_general_section_id_fkey" FOREIGN KEY ("general_section_id") REFERENCES "GeneralSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Links" ADD CONSTRAINT "Links_general_section_id_fkey" FOREIGN KEY ("general_section_id") REFERENCES "GeneralSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skills" ADD CONSTRAINT "Skills_general_section_id_fkey" FOREIGN KEY ("general_section_id") REFERENCES "GeneralSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Languages" ADD CONSTRAINT "Languages_general_section_id_fkey" FOREIGN KEY ("general_section_id") REFERENCES "GeneralSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Courses" ADD CONSTRAINT "Courses_general_section_id_fkey" FOREIGN KEY ("general_section_id") REFERENCES "GeneralSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Internships" ADD CONSTRAINT "Internships_general_section_id_fkey" FOREIGN KEY ("general_section_id") REFERENCES "GeneralSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hobbies" ADD CONSTRAINT "Hobbies_general_section_id_fkey" FOREIGN KEY ("general_section_id") REFERENCES "GeneralSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExtraCurricularActivities" ADD CONSTRAINT "ExtraCurricularActivities_general_section_id_fkey" FOREIGN KEY ("general_section_id") REFERENCES "GeneralSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "References" ADD CONSTRAINT "References_general_section_id_fkey" FOREIGN KEY ("general_section_id") REFERENCES "GeneralSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomSections" ADD CONSTRAINT "CustomSections_general_section_id_fkey" FOREIGN KEY ("general_section_id") REFERENCES "GeneralSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
