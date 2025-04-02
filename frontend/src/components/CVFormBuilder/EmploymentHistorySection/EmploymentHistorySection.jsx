import styles from "./EmploymentHistorySection.module.scss";

import FormGroup from "../../FormGroup/FormGroup";
import FormGroupCell from "../../FormGroup/FormGroupCell";
import FormField from "../../FormField/FormField";
import FormFieldText from "../../FormFieldText/FormFieldText";
import MonthRangeFormField from "../../MonthRangeFormField/MonthRangeFormField";

import { useResumeContext } from "../../../context/ResumeContext";

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
  function handleFormFieldDateInputChange(key, value) {
    dispatchOfResumesDataState({ 
      type: "UPDATE_RESUME_SUB_SECTION_DATE_FIELD",
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
          <FormGroup gridTemplateColumns="1fr 1fr" gridTemplateRows="1fr 1fr 1fr">
            <FormGroupCell>
              <FormField
                label="Профессия"
                inputValue={data?.profession}
                inputPlaceholder="Введите профессию"
                onChangeInputCallback={(value) => handleFormFieldInputChange("profession", value)} 
              />
            </FormGroupCell>
            <FormGroupCell>
              <FormField
                label="Работодатель"
                inputValue={data?.employer}
                inputPlaceholder="Введите работодателя"
                onChangeInputCallback={(value) => handleFormFieldInputChange("employer", value)} 
              />
            </FormGroupCell>
            <FormGroupCell gridArea="2 / 1 / 2 / 3">
              <MonthRangeFormField
                label="Начальная & Конечная Даты"
                startDate={{ value: data?.startDate }}
                endDate={{ value: data?.endDate }}
                onChangeStartInputCallback={(value) => handleFormFieldDateInputChange("startDate", value)} 
                onChangeEndInputCallback={(value) => handleFormFieldDateInputChange("endDate", value)} 
              />
            </FormGroupCell>
            <FormGroupCell>
              <FormField
                label="Город"
                inputValue={data?.city}
                inputPlaceholder="Введите город"
                onChangeInputCallback={(value) => handleFormFieldInputChange("city", value)} 
              />
            </FormGroupCell>
          </FormGroup>
        </div>
        <div className={styles.sectionDescriptionWrapper}>
          <FormFieldText
            label="Описание"
            placeholder="Опишите ваши обязанности и достижения"
            isContentLoaded={isResumeDataLoaded}
            onChangeCallback={(value) => handleFormFieldInputChange("description", value)}
            value={data?.description}
          ></FormFieldText>
        </div> 
      </div>
    </div>
  );
}
