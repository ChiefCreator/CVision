import styles from "./CVFormBuilder.module.scss"

import PersonalDetailedSection from "./PersonalDetailedSection";
import ProfessionalSummarySection from "./ProfessionalSummarySection";
import EmploymentHistorySection from "./EmploymentHistorySection";
import SectionOfSubSections from "./SectionOfSubSections";
import SkillsSection from "./SkillsSection/SkillsSection";
import HobbiesSection from "./HobbiesSection/HobbiesSection";
import LanguagesSection from "./LanguagesSection/LanguagesSection";
import CoursesSection from "./CoursesSection/CoursesSection";

import { useResumeContext } from "../../context/ResumeContext";

export default function CVFormBuilder({ resumeId }) {
  const { resumesDataState, dispatchOfResumesDataState } = useResumeContext();
  const isResumeDataLoaded = resumesDataState.loadingState === "loaded";
  const resumeData = isResumeDataLoaded && resumesDataState.resumes.find(resume => resume.id === resumeId);

  const employmentHistorySectionData = isResumeDataLoaded && resumeData.sections.find(section => section.id === "employmentHistory");
  const skillsSectionData = isResumeDataLoaded && resumeData.sections.find(section => section.id === "skills");
  const hobbiesData = isResumeDataLoaded && resumeData.sections.find(section => section.id === "hobbies");
  const coursesData = isResumeDataLoaded && resumeData.sections.find(section => section.id === "courses");
  const languagesData = isResumeDataLoaded && resumeData.sections.find(section => section.id === "languages");

  // dispatch-функции
  function handleSectionFieldChange(sectionId, key, value) {
    dispatchOfResumesDataState({
      type: "UPDATE_RESUME_SECTION_FIELD",
      resumeId: resumeId,
      sectionId,
      key,
      value,
    });
  }

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
            title: `{profession} ?employer?в компании?employer? ?employer?"?employer?{employer}?employer?"?employer?`,
            subTitle: `{startDate.month}?startDate.month?.?startDate.month?{startDate.year} ?endDate?-?endDate? {endDate.month}?endDate.year?.?endDate.year?{endDate.year}`,
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
            title: `{skill}`,
            subTitle: `{parameterId}`,
          }}
        >
        </SectionOfSubSections>
        <SectionOfSubSections
          title="Курсы"
          description={null}
          SubSectionComponent={CoursesSection}
          resumeId={resumeId}
          sectionId="courses"
          isResumeDataLoaded={isResumeDataLoaded}
          subSectionsData={isResumeDataLoaded && coursesData?.subSections ? coursesData.subSections : []}
          subSectionTitleAndSubTitlePattern={{
            title: `{cource}?institute?,?institute? {institute}`,
          }}
        >
        </SectionOfSubSections>
        <SectionOfSubSections
          title="Языки"
          description={null}
          SubSectionComponent={LanguagesSection}
          resumeId={resumeId}
          sectionId="languages"
          isResumeDataLoaded={isResumeDataLoaded}
          subSectionsData={isResumeDataLoaded && languagesData?.subSections ? languagesData.subSections : []}
          subSectionTitleAndSubTitlePattern={{
            title: "{language}",
            subTitle: "{languageLevel}"
          }}
        ></SectionOfSubSections>
        <HobbiesSection data={hobbiesData} isResumeDataLoaded={isResumeDataLoaded} handleSectionFieldChange={handleSectionFieldChange} />
      </div>
    </form>
  );
}