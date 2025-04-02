import styles from "./CoverLetterFormBuilder.module.scss";

import PersonalDetailsSection from "../sections/PersonalDetailsSection/PersonalDetailsSection";
import EmployerDetailsSection from "../sections/EmployerDetailsSection/EmployerDetailsSection";
import LetterDetailsSection from "../sections/LetterDetailsSection/LetterDetailsSection";

export default function CoverLetterFormBuilder({ coverLetterData, isCoverLettersDataLoaded, changeSectionField }) {
  const sectionsData = coverLetterData?.sections;
  const personalDetailsData = sectionsData?.find(item => item.id === "personalDetails");
  const employerDetailsData = sectionsData?.find(item => item.id === "employerDetails");
  const letterDetailsData = sectionsData?.find(item => item.id === "letterDetails");

  return (
    <form className={styles.form}>
      <div className={styles.formSections}>
        <PersonalDetailsSection data={personalDetailsData} changeField={changeSectionField} />
        <EmployerDetailsSection data={employerDetailsData} changeField={changeSectionField} />
        <LetterDetailsSection data={letterDetailsData} isDataLoaded={isCoverLettersDataLoaded} changeField={changeSectionField} />
      </div>
    </form>
  );
}
