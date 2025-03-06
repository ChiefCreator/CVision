import styles from "./LanguagesSection.module.scss";

import FormGroup from "../../FormGroup/FormGroup";
import FormGroupCell from "../../FormGroup/FormGroupCell";
import FormField from "../../FormField/FormField";
import Select from "../../Select/Select";

import languageLevelsData from "./../../../data/languageLevelsData";

import { useResumeContext } from "../../../context/ResumeContext";

export default function LanguagesSection({ resumeId, isResumeDataLoaded, data }) {
  const { dispatchOfResumesDataState } = useResumeContext();
  const sectionId = "languages";

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

  return (
    <div className={styles.section}>
      <div className={styles.sectionBody}>
        <div className={styles.sectionFormGroups}>
          <FormGroup gridTemplateColumns="1fr 1fr" gridTemplateRows="1fr">
            <FormGroupCell>
              <FormField label="Язык" inputValue={data?.language} inputPlaceholder="Введите язык" onChangeInputCallback={(value) => handleFormFieldInputChange("language", value)} />
            </FormGroupCell>
            <FormGroupCell>
              <FormField
                Component={Select}
                data={languageLevelsData}
                label="Уровень английского"
                inputValue={data?.languageLevel}
                onChangeInputCallback={(value) => handleFormFieldInputChange("languageLevel", value)} />
            </FormGroupCell>
          </FormGroup>
        </div>
      </div>
    </div>
  );
}
