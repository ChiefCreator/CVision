import styles from "./Template_1.module.scss";
import photo from "./../../../../../src/assets/images/portrait.jpg";

import skillsData from "../../../../data/SkillsData";
import languageLevelsData from "../../../../data/languageLevelsData";

import { convertFromObjectStartDateAndEndDateToStringRangeFormat } from "../../../../lib/dateUtils";

function checkIsSubSectionEmpty(sectionData) {
  return (!sectionData?.subSections || sectionData?.subSections?.length === 0);
}

function Progress({ level, levelsCount = 5 }) {
  if (level === 0 || !level) return null;

  return (
    <div className={styles.progress}>
      {Array.from({ length: levelsCount }).map((_, index) => {
        index++;
        const isAchieved = level >= index;
  
        return (
          <div className={`${styles.progressBlock} ${isAchieved ? styles.progressBlockAchieved : ""}`} key={index}></div>
        );
      })}
    </div>
  );
}

function SectionSkills({ sectionData, ref }) {
  if (checkIsSubSectionEmpty(sectionData)) return null;
  else if (sectionData.subSections.filter(subSection => subSection.skill !== "").length === 0) return null;

  return (
    <section className={`${styles.asideSection} ${styles.skillsSection}`} id={sectionData.id} key={sectionData.id} ref={ref}>
      <h2 className={styles.asideSectionTitle} data-track>{sectionData.title}</h2>
      <div className={styles.asideSectionBody}>
        <div className={styles.asideSectionSubSections}>
          {sectionData?.subSections.map(subSectionData => {
            const achievedSkillLevel = skillsData.find(skill => skill.id === subSectionData.parameterId)?.level;
            if (subSectionData.skill) {
              return (
                <div className={styles.subSectionSkill} key={subSectionData.id} data-split={JSON.stringify({ type: "text", dataPath: { sectionId: sectionData.id, subSectionId: subSectionData.id, splitField: "skill" }, necessaryFields: { currentPage: ["parameterId", "order"], nextPage: ["parameterId", "order"], currentAndNextPages: ["order"] } })}>
                  <h6 className={styles.subSectionSkillTitle} >{subSectionData.skill}</h6>
                  
                  <Progress level={achievedSkillLevel} />
                </div>
              );
            }
          })}
        </div>
      </div>
    </section>
  );
}
function SectionLanguages({ sectionData, ref }) {
  if (checkIsSubSectionEmpty(sectionData)) return null;
  else if (sectionData?.subSections.filter(subSection => subSection.language !== "").length === 0) return null;

  return (
    <section className={`${styles.asideSection} ${styles.languagesSection}`} id={sectionData.id} key={sectionData.id} ref={ref}>
      <h2 className={styles.asideSectionTitle} data-track>{sectionData.title}</h2>
      <div className={styles.asideSectionBody}>
        <div className={styles.asideSectionSubSections}>
          {sectionData?.subSections.map(subSectionData => {
            const achievedLanguageLevel = languageLevelsData.find(languageData => languageData.value === subSectionData.languageLevel)?.level;

            if (subSectionData.language) {
              return (
                <div className={styles.subSectionLanguage} key={subSectionData.id} data-split={JSON.stringify({ type: "item", dataPath: { sectionId: sectionData.id, subSectionId: subSectionData.id }  })}>
                  <h6 className={styles.subSectionLanguageTitle}>{subSectionData.language}</h6>

                  <Progress level={achievedLanguageLevel} />
                </div>
              );
            }
          })}
        </div>
      </div>
    </section>
  );
}
function SectionProfessionalSummary({ sectionData, ref }) {
  if (!sectionData.description || sectionData.description === "<br>") return null;

  return (
    <section className={`${styles.mainSection} ${styles.professionalSummarySection}`} key={sectionData.id} ref={ref}>
      <h2 className={styles.mainSectionTitle} data-split={JSON.stringify({ type: "text", dataPath: { sectionId: sectionData.id, splitField: "title" }})}>{sectionData.title}</h2>
      <div className={styles.mainSectionBody}>
        <p className={styles.mainSectionDescription} dangerouslySetInnerHTML={{ __html: sectionData.description }} data-split={JSON.stringify({ type: "text", dataPath: { sectionId: sectionData.id, splitField: "description" }})}></p>
      </div>
    </section>
  );
}
function SectionEmploymentHistory({ sectionData, ref }) {
  if (checkIsSubSectionEmpty(sectionData)) return null;

  return (
    <section className={`${styles.mainSection} ${styles.professionalSummarySection}`} key={sectionData.id} ref={ref}>
      <h2 className={styles.mainSectionTitle} data-track>{sectionData.title}</h2>
      <div className={styles.mainSectionBody}>
        <div className={styles.mainSectionSubSections}>
          {sectionData.subSections.map(subSectionData => {
            return (
              <div className={styles.subSection} key={subSectionData.id}>
                <div className={styles.subSectionHeader}>
                  <h6 className={styles.subSectionTitle} data-track>
                    {subSectionData.profession && `${subSectionData.profession}`}
                    {subSectionData.employer && subSectionData.profession ? `, ${subSectionData.employer}` : subSectionData.employer ? subSectionData.employer : null}
                    {subSectionData.city && (subSectionData.employer || subSectionData.profession) ? `, ${subSectionData.city}` : subSectionData.city ? subSectionData.city : null}
                  </h6>
                  <span className={styles.subSectionDate} data-track>{convertFromObjectStartDateAndEndDateToStringRangeFormat(subSectionData.startDate, subSectionData.endDate)}</span>
                </div>
                {(subSectionData.description && subSectionData.description !== "<br>") && <p className={styles.subSectionDescription} dangerouslySetInnerHTML={{ __html: subSectionData.description }} data-split={JSON.stringify({ type: "text", dataPath: { sectionId: sectionData.id, subSectionId: subSectionData.id, splitField: "description" }})}></p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
function SectionHobbies({ sectionData, ref }) {
  if (!sectionData.description || sectionData.description === "<br>") return null;

  return (
    <section className={`${styles.asideSection} ${styles.sectionHobbies}`} id={sectionData.id} key={sectionData.id} ref={ref}>
      <h2 className={styles.asideSectionTitle} data-track>{sectionData.title}</h2>
      <p className={styles.asideSectionDescription} dangerouslySetInnerHTML={{ __html: sectionData.description }}  data-split={JSON.stringify({ type: "text", dataPath: { sectionId: sectionData.id, splitField: "description" }})}></p>
    </section>
  );
}
function SectionCourses({ sectionData, ref }) {
  if (checkIsSubSectionEmpty(sectionData)) return null;

  return (
    <section className={`${styles.mainSection} ${styles.courcesSection}`} key={sectionData.id} ref={ref}>
      <h2 className={styles.mainSectionTitle}>{sectionData.title}</h2>
      <div className={styles.mainSectionBody}>
        <div className={styles.mainSectionSubSections}>
          {sectionData.subSections.map(subSectionData => {
            return (
              <div className={styles.subSection} key={subSectionData.id}>
                <div className={styles.subSectionHeader}>
                  <h6 className={styles.subSectionTitle}>
                    {subSectionData?.cource}
                    {subSectionData?.cource && subSectionData?.institute ? `, ${subSectionData.institute}` : subSectionData?.institute ? subSectionData.institute : null}
                  </h6>
                  <span className={styles.subSectionDate}>{convertFromObjectStartDateAndEndDateToStringRangeFormat(subSectionData.startDate, subSectionData.endDate)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
function SectionExtraCurricular({ sectionData, ref }) {
  if (checkIsSubSectionEmpty(sectionData)) return null;

  return (
    <section className={`${styles.mainSection} ${styles.exstraCurricularSection}`} key={sectionData.id} ref={ref}>
      <h2 className={styles.mainSectionTitle}>{sectionData.title}</h2>
      <div className={styles.mainSectionBody}>
        <div className={styles.mainSectionSubSections}>
          {sectionData.subSections.map(subSectionData => {
            return (
              <div className={styles.subSection} key={subSectionData.id}>
                <div className={styles.subSectionHeader}>
                  <h6 className={styles.subSectionTitle}>
                    {subSectionData?.activity}
                    {subSectionData?.activity && subSectionData?.employer ? `, ${subSectionData.employer}` : subSectionData?.employer}
                    {subSectionData?.city && (subSectionData.employer || subSectionData.activity) ? `, ${subSectionData.city}` : subSectionData?.city}
                  </h6>
                  <span className={styles.subSectionDate}>{convertFromObjectStartDateAndEndDateToStringRangeFormat(subSectionData.startDate, subSectionData.endDate)}</span>
                </div>
                <p className={styles.subSectionDescription} dangerouslySetInnerHTML={{ __html: subSectionData.description }}></p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
function AsideSection({ id, title, value, ref }) {
  if (!value) return null;

  return (
    <section className={styles.asideSection} key={id} ref={ref}>
      <h2 className={styles.asideSectionTitle}>{title}</h2>
      <span className={styles.asideSectionValue}>{value}</span>
    </section>
  );
}

export default function Template_1({ resumeData, isHeader, asideSections, mainSections, asideSectionsRefs, mainSectionsRefs, blocksOverSectionsRefs, isHiden }) {
  const personalInformation = resumeData?.sections && resumeData.sections.find(section => section.id === "personalInformation");
  const lineSpacing = resumeData?.lineSpacing ?? 100;

  return (
      <article className={`${styles.template} ${isHiden ? styles.templateHidden : ""}`} style={{ lineHeight: lineSpacing + "%" }}>
        <div className={styles.templateContainer}>
          <div className={styles.templateContent}>
            {isHeader && 
              <header className={styles.templateHeader} ref={blocksOverSectionsRefs ? (el) => (blocksOverSectionsRefs.current.header = el) : null}>
                <div className={styles.personalInformation} style={{ backgroundColor: "orange" }}>
                  <div className={styles.personalInformationPhotoWrapper}>
                    {personalInformation?.photo && <img className={styles.personalInformationPhoto} src={personalInformation.photo}></img>}
                  </div>
                  <div className={styles.personalInformationContent}>
                    <div className={styles.personalInformationTitleBlock}>
                      <h2 className={styles.personalInformationName}>{personalInformation?.name && `${personalInformation.name} `}{personalInformation?.surname}</h2>
                      <span className={styles.personalInformationJobTitle}>{personalInformation?.jobTitle}</span>
                    </div>
                    <div className={styles.personalInformationOtherBlock}>
                      <span className={styles.personalInformationLocation}>
                        {personalInformation?.adress}
                        {personalInformation?.city && personalInformation?.adress ? `, ${personalInformation.city}` : personalInformation?.city ? personalInformation.city : null}
                        {personalInformation?.postalCode && personalInformation?.city ? `, ${personalInformation.postalCode}` : personalInformation?.postalCode ? personalInformation.postalCode : null}
                      </span>
                      <span className={styles.personalInformationContact}>
                        {personalInformation?.email}
                        {personalInformation?.phoneNumber && personalInformation?.email ? `, ${personalInformation.phoneNumber}` : personalInformation?.phoneNumber ? personalInformation.phoneNumber : null}
                      </span>
                    </div>
                  </div>
                </div>
              </header>} 
          
            <div className={styles.templateBody}>
              <div className={styles.templateAside}>
                <div className={styles.templateAsideSections}>  
                  {asideSections?.map(sectionData => {
                    switch (sectionData.id) {
                      case "skills":
                        return <SectionSkills sectionData={sectionData} key={sectionData.id} ref={asideSectionsRefs ? (el) => (asideSectionsRefs.current[sectionData.id] = el) : null} />
                      case "languages":
                        return <SectionLanguages sectionData={sectionData} key={sectionData.id} ref={asideSectionsRefs ? (el) => (asideSectionsRefs.current[sectionData.id] = el) : null} />
                      case "hobbies":
                        return <SectionHobbies sectionData={sectionData} key={sectionData.id} ref={asideSectionsRefs ? (el) => (asideSectionsRefs.current[sectionData.id] = el) : null} />
                      case "nationality":
                        return <AsideSection id="nationality" title="Национальность" value={sectionData.nationality} ref={asideSectionsRefs ? (el) => (asideSectionsRefs.current["nationality"] = el) : null} />
                      case "gender":
                        return <AsideSection id="gender" title="Пол" value={sectionData.gender} ref={asideSectionsRefs ? (el) => (asideSectionsRefs.current[sectionData.id] = el) : null} />
                      case "configurableFields":
                        return sectionData?.configurableFields?.map(sectionData => {
                          return sectionData.value ? <AsideSection id={sectionData.id} title={sectionData.label} value={sectionData.value} key={sectionData.id} ref={asideSectionsRefs ? (el) => (asideSectionsRefs.current[sectionData.id] = el) : null} /> : null;
                        })
                      default:
                        return null;
                    }
                  })}
                </div>
              </div>
              <div className={styles.templateMainContent}>
                <div className={styles.templateMainSections}>
                  {mainSections?.map(sectionData => {
                    switch (sectionData.id) {
                      case "professionalSummary":
                        return <SectionProfessionalSummary sectionData={sectionData} key={sectionData.id} ref={mainSectionsRefs ? (el) => (mainSectionsRefs.current[sectionData.id] = el) : null} />
                      case "employmentHistory":
                        return <SectionEmploymentHistory sectionData={sectionData} key={sectionData.id} ref={mainSectionsRefs ? (el) => (mainSectionsRefs.current[sectionData.id] = el) : null} />
                      case "courses": 
                        return <SectionCourses sectionData={sectionData} key={sectionData.id} ref={mainSectionsRefs ? (el) => (mainSectionsRefs.current[sectionData.id] = el) : null} />
                      case "exstraCurricular":
                        return <SectionExtraCurricular sectionData={sectionData} key={sectionData.id} ref={mainSectionsRefs ? (el) => (mainSectionsRefs.current[sectionData.id] = el) : null} />
                      default:
                        return null;
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
  );
}