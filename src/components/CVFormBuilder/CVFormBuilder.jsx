import styles from "./CVFormBuilder.module.scss"

import PersonalDetailedSection from "./PersonalDetailedSection/PersonalDetailedSection";
import ProfessionalSummarySection from "./ProfessionalSummarySection/ProfessionalSummarySection";
import EmploymentHistorySection from "./EmploymentHistorySection/EmploymentHistorySection";
import SectionOfSubSections from "./SectionOfSubSections/SectionOfSubSections";
import SkillsSection from "./SkillsSection/SkillsSection";
import HobbiesSection from "./HobbiesSection/HobbiesSection";
import LanguagesSection from "./LanguagesSection/LanguagesSection";
import CoursesSection from "./CoursesSection/CoursesSection";

import { useResumeContext } from "../../context/ResumeContext";

export default function CVFormBuilder({ resumeId }) {
  const { resumesDataState, dispatchOfResumesDataState } = useResumeContext();
  
  const isResumeDataLoaded = resumesDataState.loadingState === "loaded";
  const resumeData = isResumeDataLoaded && resumesDataState.resumes.find(resume => resume.id === resumeId);
  const sectionsData = resumeData?.sections;

  const personalInformationSectionData = sectionsData && sectionsData.find(section => section.id === "personalInformation");
  const professionalSummarySectionData = sectionsData && sectionsData.find(section => section.id === "professionalSummary");
  const employmentHistorySectionData = sectionsData && sectionsData.find(section => section.id === "employmentHistory");
  const skillsSectionData = sectionsData && sectionsData.find(section => section.id === "skills");
  const coursesData = sectionsData && sectionsData.find(section => section.id === "courses");
  const hobbiesData = sectionsData && sectionsData.find(section => section.id === "hobbies");
  const languagesData = sectionsData && sectionsData.find(section => section.id === "languages");

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
        <PersonalDetailedSection resumeId={resumeId} isResumeDataLoaded={isResumeDataLoaded} data={personalInformationSectionData} changeField={handleSectionFieldChange} />
        <ProfessionalSummarySection resumeId={resumeId} isResumeDataLoaded={isResumeDataLoaded} data={professionalSummarySectionData} changeField={handleSectionFieldChange} />
      </div>
      <div className={styles.formSections}>
        <SectionOfSubSections
          title={employmentHistorySectionData?.title}
          defaultTitle="Трудовой стаж"
          description="Покажите свой соответствующий опыт (за последние 10 лет). Отмечайте свои достижения пунктами, по возможности - цифрами /фактами (достиг X, измерил по Y, выполнил Z)."
          SubSectionComponent={EmploymentHistorySection}
          sectionId="employmentHistory"
          resumeId={resumeId}
          isResumeDataLoaded={isResumeDataLoaded}
          subSectionsData={employmentHistorySectionData?.subSections}
          subSectionTitleAndSubTitlePattern={{
            title: `{profession} ?employer?в компании?employer? ?employer?"?employer?{employer}?employer?"?employer?`,
            subTitle: `{startDate.month}?startDate.month?.?startDate.month?{startDate.year} ?endDate?-?endDate? {endDate.month}?endDate.year?.?endDate.year?{endDate.year}`,
          }}
        >
        </SectionOfSubSections>
        <SectionOfSubSections
          title={skillsSectionData?.title}
          defaultTitle="Навыки"
          description="Выберите 5 важных навыков, которые показывают, что вы подходите на эту должность. Убедитесь, что они соответствуют ключевым навыкам, указанным в списке вакансий (особенно при подаче заявления через онлайн-систему)."
          SubSectionComponent={SkillsSection}
          resumeId={resumeId}
          sectionId="skills"
          isResumeDataLoaded={isResumeDataLoaded}
          subSectionsData={skillsSectionData?.subSections}
          subSectionTitleAndSubTitlePattern={{
            title: `{skill}`,
            subTitle: `{parameterId}`,
          }}
        >
        </SectionOfSubSections>
        <SectionOfSubSections
          title={coursesData?.title}
          defaultTitle="Курсы"
          description={null}
          SubSectionComponent={CoursesSection}
          resumeId={resumeId}
          sectionId="courses"
          isResumeDataLoaded={isResumeDataLoaded}
          subSectionsData={coursesData?.subSections}
          subSectionTitleAndSubTitlePattern={{
            title: `{cource}?institute?,?institute? {institute}`,
          }}
        >
        </SectionOfSubSections>
        <SectionOfSubSections
          title={languagesData?.title}
          defaultTitle="Языки"
          description={null}
          SubSectionComponent={LanguagesSection}
          resumeId={resumeId}
          sectionId="languages"
          isResumeDataLoaded={isResumeDataLoaded}
          subSectionsData={languagesData?.subSections}
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