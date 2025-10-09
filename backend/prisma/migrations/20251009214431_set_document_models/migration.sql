/*
  Warnings:

  - You are about to drop the `CourseSubsection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Courses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CustomSections` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CustomSubsection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Education` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EducationSubsection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EmploymentHistory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EmploymentHistorySubsection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ExtraCurricularActivities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ExtraCurricularActivitySubsection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GeneralSection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Hobbies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InternshipSubsection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Internships` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LanguageSubsection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Languages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LinkSubsection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Links` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PersonalDetails` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProfessionalSummary` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReferenceSubsection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `References` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Resume` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SkillSubsection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Skills` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."DocumentName" AS ENUM ('resume', 'coverLetter');

-- DropForeignKey
ALTER TABLE "public"."CourseSubsection" DROP CONSTRAINT "CourseSubsection_section_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Courses" DROP CONSTRAINT "Courses_general_section_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Courses" DROP CONSTRAINT "Courses_resume_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."CustomSections" DROP CONSTRAINT "CustomSections_general_section_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."CustomSections" DROP CONSTRAINT "CustomSections_resume_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."CustomSubsection" DROP CONSTRAINT "CustomSubsection_section_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Education" DROP CONSTRAINT "Education_general_section_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Education" DROP CONSTRAINT "Education_resume_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."EducationSubsection" DROP CONSTRAINT "EducationSubsection_section_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."EmploymentHistory" DROP CONSTRAINT "EmploymentHistory_general_section_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."EmploymentHistory" DROP CONSTRAINT "EmploymentHistory_resume_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."EmploymentHistorySubsection" DROP CONSTRAINT "EmploymentHistorySubsection_section_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."ExtraCurricularActivities" DROP CONSTRAINT "ExtraCurricularActivities_general_section_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."ExtraCurricularActivities" DROP CONSTRAINT "ExtraCurricularActivities_resume_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."ExtraCurricularActivitySubsection" DROP CONSTRAINT "ExtraCurricularActivitySubsection_section_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Hobbies" DROP CONSTRAINT "Hobbies_general_section_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Hobbies" DROP CONSTRAINT "Hobbies_resume_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."InternshipSubsection" DROP CONSTRAINT "InternshipSubsection_section_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Internships" DROP CONSTRAINT "Internships_general_section_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Internships" DROP CONSTRAINT "Internships_resume_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."LanguageSubsection" DROP CONSTRAINT "LanguageSubsection_section_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Languages" DROP CONSTRAINT "Languages_general_section_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Languages" DROP CONSTRAINT "Languages_resume_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."LinkSubsection" DROP CONSTRAINT "LinkSubsection_section_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Links" DROP CONSTRAINT "Links_general_section_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Links" DROP CONSTRAINT "Links_resume_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."PersonalDetails" DROP CONSTRAINT "PersonalDetails_general_section_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."PersonalDetails" DROP CONSTRAINT "PersonalDetails_resume_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."ProfessionalSummary" DROP CONSTRAINT "ProfessionalSummary_general_section_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."ProfessionalSummary" DROP CONSTRAINT "ProfessionalSummary_resume_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."ReferenceSubsection" DROP CONSTRAINT "ReferenceSubsection_section_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."References" DROP CONSTRAINT "References_general_section_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."References" DROP CONSTRAINT "References_resume_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Resume" DROP CONSTRAINT "Resume_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."SkillSubsection" DROP CONSTRAINT "SkillSubsection_section_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Skills" DROP CONSTRAINT "Skills_general_section_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Skills" DROP CONSTRAINT "Skills_resume_id_fkey";

-- DropTable
DROP TABLE "public"."CourseSubsection";

-- DropTable
DROP TABLE "public"."Courses";

-- DropTable
DROP TABLE "public"."CustomSections";

-- DropTable
DROP TABLE "public"."CustomSubsection";

-- DropTable
DROP TABLE "public"."Education";

-- DropTable
DROP TABLE "public"."EducationSubsection";

-- DropTable
DROP TABLE "public"."EmploymentHistory";

-- DropTable
DROP TABLE "public"."EmploymentHistorySubsection";

-- DropTable
DROP TABLE "public"."ExtraCurricularActivities";

-- DropTable
DROP TABLE "public"."ExtraCurricularActivitySubsection";

-- DropTable
DROP TABLE "public"."GeneralSection";

-- DropTable
DROP TABLE "public"."Hobbies";

-- DropTable
DROP TABLE "public"."InternshipSubsection";

-- DropTable
DROP TABLE "public"."Internships";

-- DropTable
DROP TABLE "public"."LanguageSubsection";

-- DropTable
DROP TABLE "public"."Languages";

-- DropTable
DROP TABLE "public"."LinkSubsection";

-- DropTable
DROP TABLE "public"."Links";

-- DropTable
DROP TABLE "public"."PersonalDetails";

-- DropTable
DROP TABLE "public"."ProfessionalSummary";

-- DropTable
DROP TABLE "public"."ReferenceSubsection";

-- DropTable
DROP TABLE "public"."References";

-- DropTable
DROP TABLE "public"."Resume";

-- DropTable
DROP TABLE "public"."SkillSubsection";

-- DropTable
DROP TABLE "public"."Skills";

-- DropEnum
DROP TYPE "public"."LanguageLevel";

-- DropEnum
DROP TYPE "public"."ResumeTemplate";

-- DropEnum
DROP TYPE "public"."SectionTypes";

-- DropEnum
DROP TYPE "public"."SkillLevel";

-- CreateTable
CREATE TABLE "public"."DocumentType" (
    "id" TEXT NOT NULL,
    "name" "public"."DocumentName" NOT NULL,

    CONSTRAINT "DocumentType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DocumentTemplate" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "preview_url" TEXT,
    "document_type_id" TEXT NOT NULL,

    CONSTRAINT "DocumentTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Document" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type_id" TEXT NOT NULL,
    "template_id" TEXT,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SectionTemplate" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "allowed_children" TEXT[],
    "schema" JSONB NOT NULL,
    "document_type_id" TEXT NOT NULL,

    CONSTRAINT "SectionTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Section" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "title" TEXT,
    "data" JSONB,
    "order" INTEGER NOT NULL,
    "document_id" TEXT NOT NULL,
    "parent_id" TEXT,
    "template_id" TEXT,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DocumentType_name_key" ON "public"."DocumentType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "DocumentTemplate_document_type_id_key_key" ON "public"."DocumentTemplate"("document_type_id", "key");

-- CreateIndex
CREATE UNIQUE INDEX "SectionTemplate_document_type_id_key_key" ON "public"."SectionTemplate"("document_type_id", "key");

-- AddForeignKey
ALTER TABLE "public"."DocumentTemplate" ADD CONSTRAINT "DocumentTemplate_document_type_id_fkey" FOREIGN KEY ("document_type_id") REFERENCES "public"."DocumentType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Document" ADD CONSTRAINT "Document_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Document" ADD CONSTRAINT "Document_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "public"."DocumentType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Document" ADD CONSTRAINT "Document_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "public"."DocumentTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SectionTemplate" ADD CONSTRAINT "SectionTemplate_document_type_id_fkey" FOREIGN KEY ("document_type_id") REFERENCES "public"."DocumentType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Section" ADD CONSTRAINT "Section_document_id_fkey" FOREIGN KEY ("document_id") REFERENCES "public"."Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Section" ADD CONSTRAINT "Section_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "public"."Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Section" ADD CONSTRAINT "Section_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "public"."SectionTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;
