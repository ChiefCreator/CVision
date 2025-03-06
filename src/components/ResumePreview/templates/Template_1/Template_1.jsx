const asideSectionsIds = ["skills", "hobbies"];
const mainSectionsIds = ["professionalSummary", "employmentHistory"];

import styles from "./Template_1.module.scss";
import photo from "./../../../../../src/assets/images/portrait.jpg";

import skillsData from "../../../../data/SkillsData";

function SectionSkills({ sectionData }) {
  if (sectionData.subSections?.length === 0) return null;
  else if (sectionData.subSections.filter(subSection => subSection.skill !== "").length === 0) return null;

  return (
    <section className={`${styles.asideSection} ${styles.skillsSection}`} key={sectionData.id}>
      <h2 className={styles.asideSectionTitle}>{sectionData.title}</h2>
      <div className={styles.asideSectionBody}>
        <div className={styles.asideSectionSubSections}>
          {sectionData.subSections.map(subSectionData => {
            const achievedSkillIndex = skillsData.map(skill => skill.id).indexOf(subSectionData.parameterId);
            if (subSectionData.skill) {
              return (
                <div className={styles.subSectionSkill} key={subSectionData.id}>
                  <h6 className={styles.subSectionSkillTitle}>{subSectionData.skill}</h6>
                  <div className={styles.subSectionSkillProgress}>
                    {skillsData.map((skillData, skillIndex) => {
                      const isAchieved = achievedSkillIndex >= skillIndex;

                      return (
                        <div className={`${styles.subSectionSkillProgressBlock} ${isAchieved ? styles.subSectionSkillProgressBlockAchieved : ""}`} key={skillData.id}></div>
                      );
                    })}
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </section>
  );
}
function SectionProfessionalSummary({ sectionData }) {
  if (!sectionData.description || sectionData.description === "<br>") return null;

  return (
    <section className={`${styles.mainSection} ${styles.professionalSummarySection}`} key={sectionData.id}>
      <h2 className={styles.mainSectionTitle}>{sectionData.title}</h2>
      <div className={styles.mainSectionBody}>
        <p className={styles.mainSectionDescription} dangerouslySetInnerHTML={{ __html: sectionData.description }}></p>
      </div>
    </section>
  );
}
function SectionEmploymentHistory({ sectionData }) {
  if (sectionData.subSections?.length === 0) return null;
  // else if (sectionData.subSections.filter(subSection => subSection.skill !== "").length === 0) return null;

  return (
    <section className={`${styles.mainSection} ${styles.professionalSummarySection}`} key={sectionData.id}>
      <h2 className={styles.mainSectionTitle}>{sectionData.title}</h2>
      <div className={styles.mainSectionBody}>
        <div className={styles.mainSectionSubSections}>
          {sectionData.subSections.map(subSectionData => {
            return (
              <div className={styles.subSection} key={subSectionData.id}>
                <h6 className={styles.subSectionTitle}>
                  {subSectionData.profession && `${subSectionData.profession}`}
                  {subSectionData.employer && subSectionData.profession ? `, ${subSectionData.employer}` : subSectionData.employer ? subSectionData.employer : null}
                  {subSectionData.city && (subSectionData.employer || subSectionData.profession) ? `, ${subSectionData.city}` : subSectionData.city ? subSectionData.city : null}
                </h6>
                <p className={styles.subSectionDescription}>{subSectionData.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
function SectionHobbies({ sectionData }) {
  if (!sectionData.description || sectionData.description === "<br>") return null;

  return (
    <section className={`${styles.asideSection} ${styles.sectionHobbies}`} key={sectionData.id}>
      <h2 className={styles.asideSectionTitle}>{sectionData.title}</h2>
      <p className={styles.asideSectionDescription} dangerouslySetInnerHTML={{ __html: sectionData.description }}></p>
    </section>
  );
}
function AsideSection({ id, title, value }) {
  return (
    <section className={styles.asideSection} key={id}>
      <h2 className={styles.asideSectionTitle}>{title}</h2>
      <span className={styles.asideSectionValue}>{value}</span>
    </section>
  );
}

export default function Template_1({ resumeData, mainColor, lineHeight }) {
  const personalInformation = resumeData?.sections && resumeData.sections.find(section => section.id === "personalInformation");
  const asideSections = resumeData?.sections && resumeData.sections.filter(section => asideSectionsIds.includes(section.id)).sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity));
  const mainSections = resumeData?.sections && resumeData.sections.filter(section => mainSectionsIds.includes(section.id)).sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity));

  return (
    <article className={styles.template}>
      <header className={styles.templateHeader} style={{ backgroundColor: "orange" }}>
        <div className={styles.personalInformation}>
          <div className={styles.personalInformationPhotoWrapper}>
            <img className={styles.personalInformationPhoto} src={photo}></img>
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
              <span className={styles.personalInformation}>
                {personalInformation?.email}
                {personalInformation?.phoneNumber && personalInformation?.email ? `, ${personalInformation.phoneNumber}` : personalInformation?.phoneNumber ? personalInformation.phoneNumber : null}
              </span>
            </div>
          </div>
        </div>
      </header>    

      <div className={styles.templateBody}>
        <div className={styles.templateAside}>
          <div className={styles.templateAsideSections}>
            {personalInformation?.gender ? <AsideSection id="gender" title="Пол" value={personalInformation.gender} /> : null }
            {personalInformation?.nationality ? <AsideSection id="nationality" title="Национальность" value={personalInformation.nationality} /> : null }

            {personalInformation?.configurableFields?.map(sectionData => {
              return sectionData.value ? <AsideSection id={sectionData.id} title={sectionData.label} value={sectionData.value} key={sectionData.id} /> : null;
            })}

            {asideSections?.map(sectionData => {
              switch (sectionData.id) {
                case "skills":
                  return <SectionSkills sectionData={sectionData} key={sectionData.id} />
                case "hobbies":
                  return <SectionHobbies sectionData={sectionData} key={sectionData.id} />
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
                  return <SectionProfessionalSummary sectionData={sectionData} key={sectionData.id} />
                case "employmentHistory":
                  return <SectionEmploymentHistory sectionData={sectionData} key={sectionData.id} />
                default:
                  return null;
              }
            })}
          </div>
        </div>
      </div>
    </article>
  );
}