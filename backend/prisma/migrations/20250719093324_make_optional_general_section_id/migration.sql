/*
  Warnings:

  - A unique constraint covering the columns `[type]` on the table `GeneralSection` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Courses_general_section_id_key";

-- DropIndex
DROP INDEX "CustomSections_general_section_id_key";

-- DropIndex
DROP INDEX "Education_general_section_id_key";

-- DropIndex
DROP INDEX "EmploymentHistory_general_section_id_key";

-- DropIndex
DROP INDEX "ExtraCurricularActivities_general_section_id_key";

-- DropIndex
DROP INDEX "Hobbies_general_section_id_key";

-- DropIndex
DROP INDEX "Internships_general_section_id_key";

-- DropIndex
DROP INDEX "Languages_general_section_id_key";

-- DropIndex
DROP INDEX "Links_general_section_id_key";

-- DropIndex
DROP INDEX "PersonalDetails_general_section_id_key";

-- DropIndex
DROP INDEX "ProfessionalSummary_general_section_id_key";

-- DropIndex
DROP INDEX "References_general_section_id_key";

-- DropIndex
DROP INDEX "Skills_general_section_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "GeneralSection_type_key" ON "GeneralSection"("type");
