import styles from "./CVFormBuilder.module.scss"

import PersonalDetailedSection from "./PersonalDetailedSection";
import ProfessionalSummarySection from "./ProfessionalSummarySection";
import EmploymentHistorySection from "./EmploymentHistorySection";
import SectionOfSubSections from "./SectionOfSubSections";
import SkillsSection from "./SkillsSection/SkillsSection";

import { useResumeContext } from "../../context/ResumeContext";

export default function CVFormBuilder({ resumeId }) {
  const { resumesDataState, dispatchOfResumesDataState } = useResumeContext();
  const isResumeDataLoaded = resumesDataState.loadingState === "loaded";
  const resumeData = isResumeDataLoaded && resumesDataState.resumes.find(resume => resume.id === resumeId);

  const employmentHistorySectionData = isResumeDataLoaded && resumeData.sections.find(section => section.id === "employmentHistory");
  const skillsSectionData = isResumeDataLoaded && resumeData.sections.find(section => section.id === "skills");

  return (
    <form className={styles.form}>
      <div className={styles.formNecessarySections}>
        <PersonalDetailedSection />
        <ProfessionalSummarySection />
      </div>
      <div className={styles.formSections}>
        <SectionOfSubSections
          title="Трудовой стаж"
          description="Покажите свой соответствующий опыт (за последние 10 лет). Отмечайте свои достижения пунктами, по возможности - цифрами /фактами (достиг X, измерил по Y, выполнил Z)."
          SubSectionComponent={EmploymentHistorySection}
          sectionId="employmentHistory"
          resumeId={resumeId}
          isResumeDataLoaded={isResumeDataLoaded}
          subSectionsData={isResumeDataLoaded ? employmentHistorySectionData.subSections : []}
          subSectionTitleAndSubTitlePattern={{
            title: `[profession] ?employer?в компании?employer? ?employer?"?employer?[employer]?employer?"?employer?`,
            subTitle: `[startDate] ?endDate?-?endDate? [endDate]`,
          }}
        >
        </SectionOfSubSections>
        <SectionOfSubSections
          title="Навыки"
          description="Выберите 5 важных навыков, которые показывают, что вы подходите на эту должность. Убедитесь, что они соответствуют ключевым навыкам, указанным в списке вакансий (особенно при подаче заявления через онлайн-систему)."
          SubSectionComponent={SkillsSection}
          resumeId={resumeId}
          sectionId="skills"
          isResumeDataLoaded={isResumeDataLoaded}
          subSectionsData={isResumeDataLoaded && skillsSectionData?.subSections ? skillsSectionData.subSections : []}
          subSectionTitleAndSubTitlePattern={{
            title: `[skill]`,
            subTitle: `[parameterId]`,
          }}
        >
        </SectionOfSubSections>
      </div>
    </form>
  );
}