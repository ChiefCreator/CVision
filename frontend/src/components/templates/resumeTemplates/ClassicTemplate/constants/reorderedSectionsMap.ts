import Hobbies from "../components/Section/sections/Hobbies";
import Courses from "../components/Section/sections/Courses";
import Education from "../components/Section/sections/Education";
import EmploymentHistory from "../components/Section/sections/EmploymentHistory";
import ExtraCurricularActivities from "../components/Section/sections/ExtraCurricularActivities";
import Internships from "../components/Section/sections/Internships";
import ProfessionalSummary from "../components/Section/sections/ProfessionalSummary";
import Skills from "../components/Section/sections/Skills";
import Languages from "../components/Section/sections/Languages";
import References from "../components/Section/sections/References";
import CustomSection from "../components/Section/sections/CustomSection";

import type { ReorderedSectionComponentMap } from "../types/reorderedSection";

export const reorderedSectionsMap: ReorderedSectionComponentMap = {
  professionalSummary: ProfessionalSummary,
  employmentHistory: EmploymentHistory,
  education: Education,
  courses: Courses,
  skills: Skills,
  internships: Internships,
  languages: Languages,
  extraCurricularActivities: ExtraCurricularActivities,
  hobbies: Hobbies,
  references: References,
  customSections: CustomSection
}