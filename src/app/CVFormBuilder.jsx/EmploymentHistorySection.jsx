import styles from "./EmploymentHistorySection.module.scss";

import FormGroup from "../FormGroup/FormGroup";
import FormGroupCell from "../FormGroup/FormGroupCell";
import FormField from "../FormField/FormField";
import EditableText from "../EditableText/EditableText";
import MonthRangeFormField from "../MonthRangeFormField/MonthRangeFormField";

import { useResumeContext } from "../../context/ResumeContext";

export default function EmploymentHistorySection({ resumeId, isResumeDataLoaded, data }) {
  const { dispatchOfResumesDataState } = useResumeContext();
  const sectionId = "employmentHistory";

  function handleFormFieldInputChange(key, value) {
    dispatchOfResumesDataState({ 
      type: "UPDATE_RESUME_SUB_SECTION_FIELD",
      resumeId: resumeId,
      sectionId: sectionId,
      subSectionId: data.id,
      key,
      value
    })
  }
  
  return (
    <div className={styles.section}>
      <div className={styles.sectionBody}>
        <div className={styles.sectionFormGroups}>
          <FormGroup gridTemplateColumns="1fr 1fr" gridTemplateRows="1fr 1fr">
            <FormGroupCell>
              <FormField
                label="Профессия"
                inputValue={isResumeDataLoaded && data.profession ? data.profession : ""}
                inputPlaceholder="Введите профессию"
                onChangeInputCallback={(value) => handleFormFieldInputChange("profession", value)} 
              />
            </FormGroupCell>
            <FormGroupCell>
              <FormField
                label="Работодатель"
                inputValue={isResumeDataLoaded && data.employer ? data.employer : ""}
                inputPlaceholder="Введите работодателя"
                onChangeInputCallback={(value) => handleFormFieldInputChange("employer", value)} 
              />
            </FormGroupCell>
            {/* <FormGroupCell>
              <MonthRangeFormField
                label="Начальная & Конечная Даты"
                startInputData={{ value: "", placeholder:"ММ / ГГГГ" }}
                endInputData={{ value: "", placeholder:"ММ / ГГГГ" }}
              />
            </FormGroupCell> */}
            <FormGroupCell>
              <FormField
                label="Город"
                inputValue={isResumeDataLoaded && data.city ? data.city : ""}
                inputPlaceholder="Введите город"
                onChangeInputCallback={(value) => handleFormFieldInputChange("city", value)} 
              />
            </FormGroupCell>
          </FormGroup>
        </div>
        <div className={styles.sectionDescriptionWrapper}>
          <EditableText
            placeholder="Введите описание"
            onChangeCallback={(value) => handleFormFieldInputChange("description", value)} 
            isContentLoaded={isResumeDataLoaded}
          >
            {data.description ? data.description : ""}
          </EditableText>
        </div> 
      </div>
    </div>
  );
}
