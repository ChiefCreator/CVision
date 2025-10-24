import Head from "../components/Head";
import Courses from "../components/sections/Courses";
import CustomSection from "../components/sections/CustomSection";
import Education from "../components/sections/Education";
import EmploymentHistory from "../components/sections/EmploymentHistory";
import ExtraCurricularActivities from "../components/sections/ExtraCurricularActivities";
import Hobbies from "../components/sections/Hobbies";
import Internships from "../components/sections/Internships";
import Languages from "../components/sections/Languages";
import Links from "../components/sections/Links";
import PersonalInformation from "../components/sections/PersonalInformation";
import ProfessionalSummary from "../components/sections/ProfessionalSummary";
import References from "../components/sections/References";
import Skills from "../components/sections/Skills";

export const templateSectionsMap = {
	head: Head,
	personalInformation: PersonalInformation,
	professionalSummary: ProfessionalSummary,
	employmentHistory: EmploymentHistory,
	education: Education,
	skills: Skills,
	languages: Languages,
	links: Links,
	courses: Courses,
	internships: Internships,
	hobbies: Hobbies,
	extracurricularActivities: ExtraCurricularActivities,
	references: References,
	customSections: CustomSection,
}