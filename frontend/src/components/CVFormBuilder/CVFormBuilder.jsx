import styles from "./CVFormBuilder.module.scss"

import PersonalDetailedSection from "./PersonalDetailedSection/PersonalDetailedSection";
import ProfessionalSummarySection from "./ProfessionalSummarySection/ProfessionalSummarySection";
import SectionOfSubSections from "./SectionOfSubSections/SectionOfSubSections";

import sectionsConfig from "../../data/sectionsConfig";

import { useResumeContext } from "../../context/ResumeContext";

export default function CVFormBuilder({ resumeId }) {
  const { resumesDataState, dispatchOfResumesDataState } = useResumeContext();
  
  const isResumeDataLoaded = resumesDataState.loadingState === "loaded";
  const resumeData = isResumeDataLoaded && resumesDataState.resumes.find(resume => resume.id === resumeId);
  const sectionsData = resumeData?.sections;

  const personalInformationSectionData = sectionsData && sectionsData.find(section => section.id === "personalInformation");
  const professionalSummarySectionData = sectionsData && sectionsData.find(section => section.id === "professionalSummary");
  const optionalSectionsData = sectionsData && sectionsData?.filter(data => data.id !== "personalInformation" && data.id !== "professionalSummary").sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity));

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
        {optionalSectionsData?.map(data => {
          const sectionConfig = sectionsConfig[data.id];
          const isSectionOfSubSections = sectionConfig.SubSectionComponent;

          if (isSectionOfSubSections) {
            return (
              <SectionOfSubSections
                key={data.id}
                {...sectionConfig}
                title={data.title}
                subSectionsData={data.subSections}
                resumeId={resumeId}
                isResumeDataLoaded={isResumeDataLoaded}
              >
              </SectionOfSubSections>
            );
          }

          const SectionComponent = sectionConfig?.Component;

          if (SectionComponent) {
            return (
              <SectionComponent
                key={data.id}
                data={data}
                isResumeDataLoaded={isResumeDataLoaded}
                handleSectionFieldChange={handleSectionFieldChange}
              >
              </SectionComponent>
            );
          }
        })}
      </div>
    </form>
  );
}