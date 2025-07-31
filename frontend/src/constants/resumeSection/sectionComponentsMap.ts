import Courses from "../../components/resume/ResumeEditorForm/sections/Courses/Courses";
import Education from "../../components/resume/ResumeEditorForm/sections/Education/Education";
import EmploymentHistory from "../../components/resume/ResumeEditorForm/sections/EmploymentHistory/EmploymentHistory";
import ExtraCurricularActivities from "../../components/resume/ResumeEditorForm/sections/ExtraCurricularActivities/ExtraCurricularActivities";
import Hobbies from "../../components/resume/ResumeEditorForm/sections/Hobbies/Hobbies";
import Internships from "../../components/resume/ResumeEditorForm/sections/Internships/Internships";
import Languages from "../../components/resume/ResumeEditorForm/sections/Languages/Languages";
import Links from "../../components/resume/ResumeEditorForm/sections/Links/Links";
import PersonalDetails from "../../components/resume/ResumeEditorForm/sections/PersonalDetails/PersonalDetails";
import ProfessionalSummary from "../../components/resume/ResumeEditorForm/sections/ProfessionalSummary/ProfessionalSummary";
import References from "../../components/resume/ResumeEditorForm/sections/References/References";
import Skills from "../../components/resume/ResumeEditorForm/sections/Skills/Skills";
import CustomSection from "../../components/resume/ResumeEditorForm/sections/CustomSection/CustomSection";

import type { SectionComponentMap } from "@/types/resumeSection/section";

export const SECTION_COMPONENTS_MAP: SectionComponentMap = {
  personalDetails: PersonalDetails,
  professionalSummary: ProfessionalSummary,
  employmentHistory: EmploymentHistory,
  education: Education,
  links: Links,
  courses: Courses,
  skills: Skills,
  internships: Internships,
  languages: Languages,
  extraCurricularActivities: ExtraCurricularActivities,
  hobbies: Hobbies,
  references: References,
  customSections: CustomSection
};
