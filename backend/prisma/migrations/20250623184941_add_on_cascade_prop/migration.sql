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
ALTER TABLE "PersonalDetails" DROP CONSTRAINT "PersonalDetails_resume_id_fkey";

-- DropForeignKey
ALTER TABLE "ProfessionalSummary" DROP CONSTRAINT "ProfessionalSummary_resume_id_fkey";

-- DropForeignKey
ALTER TABLE "Resume" DROP CONSTRAINT "Resume_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Skill" DROP CONSTRAINT "Skill_section_id_fkey";

-- DropForeignKey
ALTER TABLE "SkillSection" DROP CONSTRAINT "SkillSection_resume_id_fkey";

-- AddForeignKey
ALTER TABLE "Resume" ADD CONSTRAINT "Resume_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalDetails" ADD CONSTRAINT "PersonalDetails_resume_id_fkey" FOREIGN KEY ("resume_id") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessionalSummary" ADD CONSTRAINT "ProfessionalSummary_resume_id_fkey" FOREIGN KEY ("resume_id") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmploymentHistorySection" ADD CONSTRAINT "EmploymentHistorySection_resume_id_fkey" FOREIGN KEY ("resume_id") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmploymentHistory" ADD CONSTRAINT "EmploymentHistory_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "EmploymentHistorySection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EducationSection" ADD CONSTRAINT "EducationSection_resume_id_fkey" FOREIGN KEY ("resume_id") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "EducationSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LinkSection" ADD CONSTRAINT "LinkSection_resume_id_fkey" FOREIGN KEY ("resume_id") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "LinkSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillSection" ADD CONSTRAINT "SkillSection_resume_id_fkey" FOREIGN KEY ("resume_id") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "SkillSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LanguageSection" ADD CONSTRAINT "LanguageSection_resume_id_fkey" FOREIGN KEY ("resume_id") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Language" ADD CONSTRAINT "Language_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "LanguageSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseSection" ADD CONSTRAINT "CourseSection_resume_id_fkey" FOREIGN KEY ("resume_id") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "CourseSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomSection" ADD CONSTRAINT "CustomSection_resume_id_fkey" FOREIGN KEY ("resume_id") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomData" ADD CONSTRAINT "CustomData_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "CustomSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
