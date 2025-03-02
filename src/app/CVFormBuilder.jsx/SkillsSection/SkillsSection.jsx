import styles from "./SkillsSection.module.scss";

import FormGroup from "../../FormGroup/FormGroup";
import FormGroupCell from "../../FormGroup/FormGroupCell";
import FormField from "../../FormField/FormField";
import FormFieldParameterTracker from "../../FormFieldParameterTracker/FormFieldParameterTracker";

import { useResumeContext } from "../../../context/ResumeContext";

import skillsData from "../../../data/SkillsData";

export default function SkillsSection({ resumeId, isResumeDataLoaded, data }) {
  const { dispatchOfResumesDataState } = useResumeContext();
  const sectionId = "skills";

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
          <FormGroup gridTemplateColumns="1fr 1fr">
            <FormGroupCell>
              <FormField
                label="Навык"
                inputValue={isResumeDataLoaded && data.skill ? data.skill : ""}
                inputPlaceholder="Введите навык"
                onChangeInputCallback={(value) => handleFormFieldInputChange("skill", value)} 
              />
            </FormGroupCell>
            <FormGroupCell>
              <FormFieldParameterTracker
                label="Уровень"
                selectedParameterId={isResumeDataLoaded && data.parameterId ? data.parameterId : "expert"}
                parameters={skillsData}
                onSelectCallback={(value) => handleFormFieldInputChange("parameterId", value)} 
              />
            </FormGroupCell>
          </FormGroup>
        </div>
      </div>
    </div>
  );
}
