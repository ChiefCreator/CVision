import styles from "./CoursesSection.module.scss";

import FormGroup from "../../FormGroup/FormGroup";
import FormGroupCell from "../../FormGroup/FormGroupCell";
import FormField from "../../FormField/FormField";
import MonthRangeFormField from "../../MonthRangeFormField/MonthRangeFormField";

import { useResumeContext } from "../../../context/ResumeContext";

export default function CoursesSection({ resumeId, isResumeDataLoaded, data }) {
  const { dispatchOfResumesDataState } = useResumeContext();
  const sectionId = "courses";

  function handleFormFieldInputChange(key, value) {
    dispatchOfResumesDataState({
      type: "UPDATE_RESUME_SUB_SECTION_FIELD",
      resumeId: resumeId,
      sectionId: sectionId,
      subSectionId: data.id,
      key,
      value,
    });
  }
  function handleFormFieldDateInputChange(key, value) {
    dispatchOfResumesDataState({
      type: "UPDATE_RESUME_SUB_SECTION_DATE_FIELD",
      resumeId: resumeId,
      sectionId: sectionId,
      subSectionId: data.id,
      key,
      value,
    });
  }

  return (
    <div className={styles.section}>
      <div className={styles.sectionBody}>
        <div className={styles.sectionFormGroups}>
          <FormGroup gridTemplateColumns="1fr 1fr" gridTemplateRows="1fr 1fr">
            <FormGroupCell>
              <FormField label="Курс" inputValue={isResumeDataLoaded && data.cource ? data.cource : ""} inputPlaceholder="Введите курс" onChangeInputCallback={(value) => handleFormFieldInputChange("cource", value)} />
            </FormGroupCell>
            <FormGroupCell>
              <FormField label="Институт" inputValue={isResumeDataLoaded && data.institute ? data.institute : ""} inputPlaceholder="Введите институт" onChangeInputCallback={(value) => handleFormFieldInputChange("institute", value)} />
            </FormGroupCell>
            <FormGroupCell gridArea="2 / 1 / 2 / 3">
              <MonthRangeFormField label="Начальная & Конечная Даты" startDate={{ value: isResumeDataLoaded && data.startDate ? data.startDate : "" }} endDate={{ value: isResumeDataLoaded && data.endDate ? data.endDate : "" }} onChangeStartInputCallback={(value) => handleFormFieldDateInputChange("startDate", value)} onChangeEndInputCallback={(value) => handleFormFieldDateInputChange("endDate", value)} />
            </FormGroupCell>
          </FormGroup>
        </div>
      </div>
    </div>
  );
}
