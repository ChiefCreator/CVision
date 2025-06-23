-- CreateEnum
CREATE TYPE "SkillLevel" AS ENUM ('novice', 'beginner', 'skillful', 'experienced', 'expert');

-- CreateEnum
CREATE TYPE "LanguageLevel" AS ENUM ('nativeSpeaker', 'highlyProficient', 'goodWorkingKnowledge', 'workingKnowledge', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resume" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "title" TEXT,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Resume_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonalDetails" (
    "id" TEXT NOT NULL,
    "avatar_url" TEXT,
    "job_title" TEXT,
    "full_name" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "city" TEXT,
    "country" TEXT,
    "postal_code" TEXT,
    "driving_license" TEXT,
    "birth_place" TEXT,
    "birth_date" TIMESTAMP(3),
    "nationality" TEXT,
    "resume_id" TEXT NOT NULL,

    CONSTRAINT "PersonalDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfessionalSummary" (
    "summary" TEXT,
    "resume_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "EmploymentHistorySection" (
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "resume_id" TEXT NOT NULL,

    CONSTRAINT "EmploymentHistorySection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmploymentHistory" (
    "job_title" TEXT,
    "employer" TEXT,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "city" TEXT,
    "description" TEXT,
    "section_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "EducationSection" (
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "resume_id" TEXT NOT NULL,

    CONSTRAINT "EducationSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Education" (
    "school" TEXT,
    "degree" TEXT,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "city" TEXT,
    "description" TEXT,
    "section_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "LinkSection" (
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "resume_id" TEXT NOT NULL,

    CONSTRAINT "LinkSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Link" (
    "label" TEXT,
    "url" TEXT,
    "section_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "SkillSection" (
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "isShowLevel" BOOLEAN NOT NULL DEFAULT true,
    "resume_id" TEXT NOT NULL,

    CONSTRAINT "SkillSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "title" TEXT,
    "level" "SkillLevel" NOT NULL,
    "section_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "LanguageSection" (
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "resume_id" TEXT NOT NULL,

    CONSTRAINT "LanguageSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Language" (
    "title" TEXT,
    "level" "LanguageLevel",
    "section_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "CourseSection" (
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "resume_id" TEXT NOT NULL,

    CONSTRAINT "CourseSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "title" TEXT,
    "institution" TEXT,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "section_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "CustomSection" (
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "resume_id" TEXT NOT NULL,

    CONSTRAINT "CustomSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomData" (
    "title" TEXT,
    "city" TEXT,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "description" TEXT,
    "section_id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PersonalDetails_resume_id_key" ON "PersonalDetails"("resume_id");

-- CreateIndex
CREATE UNIQUE INDEX "ProfessionalSummary_resume_id_key" ON "ProfessionalSummary"("resume_id");

-- CreateIndex
CREATE UNIQUE INDEX "EmploymentHistorySection_resume_id_key" ON "EmploymentHistorySection"("resume_id");

-- CreateIndex
CREATE UNIQUE INDEX "EmploymentHistory_section_id_key" ON "EmploymentHistory"("section_id");

-- CreateIndex
CREATE UNIQUE INDEX "EducationSection_resume_id_key" ON "EducationSection"("resume_id");

-- CreateIndex
CREATE UNIQUE INDEX "Education_section_id_key" ON "Education"("section_id");

-- CreateIndex
CREATE UNIQUE INDEX "LinkSection_resume_id_key" ON "LinkSection"("resume_id");

-- CreateIndex
CREATE UNIQUE INDEX "Link_section_id_key" ON "Link"("section_id");

-- CreateIndex
CREATE UNIQUE INDEX "SkillSection_resume_id_key" ON "SkillSection"("resume_id");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_section_id_key" ON "Skill"("section_id");

-- CreateIndex
CREATE UNIQUE INDEX "LanguageSection_resume_id_key" ON "LanguageSection"("resume_id");

-- CreateIndex
CREATE UNIQUE INDEX "Language_section_id_key" ON "Language"("section_id");

-- CreateIndex
CREATE UNIQUE INDEX "CourseSection_resume_id_key" ON "CourseSection"("resume_id");

-- CreateIndex
CREATE UNIQUE INDEX "Course_section_id_key" ON "Course"("section_id");

-- CreateIndex
CREATE UNIQUE INDEX "CustomSection_resume_id_key" ON "CustomSection"("resume_id");

-- CreateIndex
CREATE UNIQUE INDEX "CustomData_section_id_key" ON "CustomData"("section_id");

-- AddForeignKey
ALTER TABLE "Resume" ADD CONSTRAINT "Resume_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalDetails" ADD CONSTRAINT "PersonalDetails_resume_id_fkey" FOREIGN KEY ("resume_id") REFERENCES "Resume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessionalSummary" ADD CONSTRAINT "ProfessionalSummary_resume_id_fkey" FOREIGN KEY ("resume_id") REFERENCES "Resume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmploymentHistorySection" ADD CONSTRAINT "EmploymentHistorySection_resume_id_fkey" FOREIGN KEY ("resume_id") REFERENCES "Resume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmploymentHistory" ADD CONSTRAINT "EmploymentHistory_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "EmploymentHistorySection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EducationSection" ADD CONSTRAINT "EducationSection_resume_id_fkey" FOREIGN KEY ("resume_id") REFERENCES "Resume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "EducationSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LinkSection" ADD CONSTRAINT "LinkSection_resume_id_fkey" FOREIGN KEY ("resume_id") REFERENCES "Resume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "LinkSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillSection" ADD CONSTRAINT "SkillSection_resume_id_fkey" FOREIGN KEY ("resume_id") REFERENCES "Resume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "SkillSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LanguageSection" ADD CONSTRAINT "LanguageSection_resume_id_fkey" FOREIGN KEY ("resume_id") REFERENCES "Resume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Language" ADD CONSTRAINT "Language_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "LanguageSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseSection" ADD CONSTRAINT "CourseSection_resume_id_fkey" FOREIGN KEY ("resume_id") REFERENCES "Resume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "CourseSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomSection" ADD CONSTRAINT "CustomSection_resume_id_fkey" FOREIGN KEY ("resume_id") REFERENCES "Resume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomData" ADD CONSTRAINT "CustomData_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "CustomSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
