import styles from "./PersonalDetailedSection.module.scss";

import EditableTitle from "../EditableTitle/EditableTitle";
import FormGroup from "../FormGroup/FormGroup";
import FormGroupCell from "../FormGroup/FormGroupCell";
import FormField from "../FormField/FormField";
import FormFieldImage from "../FormFieldImage/FormFieldImage";
import ButtonAdd from "../ButtonAdd/ButtonAdd";
import { useEffect, useRef, useState, useMemo } from "react";
import { useImageUploaderContext } from "../../context/ImageUploaderContext";
import { useResumeContext } from "../../context/ResumeContext";

export default function PersonalDetailedSection() {
  const { resumesDataState, dispatchOfResumesDataState } = useResumeContext();
  const isResumeDataLoaded = resumesDataState.loadingState === "loaded";
  const resumeData = isResumeDataLoaded && resumesDataState.resumes.find(resume => resume.id === "resume#1");
  const resumeSectionData = isResumeDataLoaded && resumeData.sections.find(section => section.id === "personalInformation");

  const { setIsOpen } = useImageUploaderContext();

  // обработчики
  function handleEditableTitleChange(value) {
    dispatchOfResumesDataState({ 
      type: "UPDATE_RESUME_SECTION_FIELD",
      resumeId: resumeData.id,
      sectionId: "personalInformation",
      key: "title",
      value: value,
    })
  }
  function handleFormFieldEditableTitleChange(key, value) {
    dispatchOfResumesDataState({ 
      type: "UPDATE_RESUME_SECTION_FIELD",
      resumeId: resumeData.id,
      sectionId: "personalInformation",
      key,
      value,
    })
  }
  function handleFormFieldInputChange(key, value) {
    dispatchOfResumesDataState({ 
      type: "UPDATE_RESUME_SECTION_FIELD",
      resumeId: resumeData.id,
      sectionId: "personalInformation",
      key,
      value,
    })
  }
  function handleFormConfigurableFieldChange(configurableObjectId, key, value) {
    dispatchOfResumesDataState({ 
      type: "UPDATE_RESUME_SECTION_CONFIGURABLE_FIELD",
      resumeId: resumeData.id,
      sectionId: "personalInformation",
      configurableObjectId,
      key,
      value,
    })
  }
  function handleFormFieldImageClick() {
    setIsOpen(true);
  }
  function handleButtonAddFormFieldClick(newConfigurableFieldObject) {
    dispatchOfResumesDataState({ 
      type: "ADD_RESUME_SECTION_CONFIGURABLE_FIELD",
      resumeId: resumeData.id,
      sectionId: "personalInformation",
      newConfigurableFieldObject,
    })
  }
  function handleFormConfigurableFieldDelete(configurableFieldId) {
    dispatchOfResumesDataState({ 
      type: "DELETE_RESUME_SECTION_CONFIGURABLE_FIELD",
      resumeId: resumeData.id,
      sectionId: "personalInformation",
      configurableFieldId,
    })
  }

  return (
    <div className={styles.section}>
      <header className={styles.sectionHeader}>
        <EditableTitle placeholder="Без названия" fontSize={22} onChangeCallback={(value) => handleEditableTitleChange(value)}>
          {isResumeDataLoaded && resumeSectionData.title}
        </EditableTitle>
      </header>
      <div className={styles.sectionBody}>
        <div className={styles.sectionFormGroups}>
          <FormGroup gridTemplateColumns="auto 1fr 1fr" gridTemplateRows="1fr 1fr">
            <FormGroupCell gridArea="1 / 1 / 3 / 2">
              <FormFieldImage label="Фото" onClickCallback={handleFormFieldImageClick} />
            </FormGroupCell>
            <FormGroupCell>
              <FormField 
                label="Имя"
                inputValue={isResumeDataLoaded && resumeSectionData.name ? resumeSectionData.name : ""}
                inputPlaceholder="Введите имя"
                onChangeInputCallback={(value) => handleFormFieldInputChange("name", value)} 
              />
            </FormGroupCell>
            <FormGroupCell>
              <FormField 
                label="Фамилия"
                inputValue={isResumeDataLoaded && resumeSectionData.surname ? resumeSectionData.surname : ""}
                onChangeInputCallback={(value) => handleFormFieldInputChange("surname", value)}
                inputPlaceholder="Введите фамилию"
              />
            </FormGroupCell>
            <FormGroupCell gridArea="2 / 2 / 3 / 4">
              <FormField 
                label="Профессия"
                inputValue={isResumeDataLoaded && resumeSectionData.jobTitle ? resumeSectionData.jobTitle : ""}
                onChangeInputCallback={(value) => handleFormFieldInputChange("jobTitle", value)}
                inputPlaceholder="Введите профессию"
              />
            </FormGroupCell>
          </FormGroup>
          <FormGroup gridTemplateColumns="1fr 1fr">
            <FormGroupCell gridArea="1 / 1 / 3 / 2">
              <FormField
                label="Эл. почта"
                inputValue={isResumeDataLoaded && resumeSectionData.email ? resumeSectionData.email : ""}
                inputPlaceholder="Введите эл. почту"
                onChangeInputCallback={(value) => handleFormFieldInputChange("email", value)} 
              />
            </FormGroupCell>
            <FormGroupCell>
              <FormField 
                label="Номер телефона"
                inputPlaceholder="Введите номер телефона"
                inputValue={isResumeDataLoaded && resumeSectionData.phoneNumber ? resumeSectionData.phoneNumber : ""}
                onChangeInputCallback={(value) => handleFormFieldInputChange("phoneNumber", value)} 
              />
            </FormGroupCell>
          </FormGroup>
          <FormGroup gridTemplateColumns="1fr 1fr">
            <FormGroupCell>
              <FormField
                label="Город"
                inputPlaceholder="Введите город"
                inputValue={isResumeDataLoaded && resumeSectionData.city ? resumeSectionData.city : ""}
                onChangeInputCallback={(value) => handleFormFieldInputChange("city", value)} 
              />
            </FormGroupCell>
            <FormGroupCell>
              <FormField 
                label="Почтовый код"
                inputPlaceholder="Введите почтовый код"
                inputValue={isResumeDataLoaded && resumeSectionData.postalCode ? resumeSectionData.postalCode : ""}
                onChangeInputCallback={(value) => handleFormFieldInputChange("postalCode", value)} 
              />
            </FormGroupCell>
            <FormGroupCell gridArea="auto / 1 / auto / 3">
              <FormField 
                label="Адрес"
                inputPlaceholder="Введите ваш адрес"
                inputValue={isResumeDataLoaded && resumeSectionData.adress ? resumeSectionData.adress : ""}
                onChangeInputCallback={(value) => handleFormFieldInputChange("adress", value)} 
              />
            </FormGroupCell>
          </FormGroup>
          <FormGroup gridTemplateColumns="1fr 1fr">
            <FormGroupCell gridArea="1 / 1 / 3 / 2">
              <FormField
                label="Пол"
                inputPlaceholder="Введите пол"
                inputValue={isResumeDataLoaded && resumeSectionData.gender ? resumeSectionData.gender : ""}
                onChangeInputCallback={(value) => handleFormFieldInputChange("gender", value)} 
              />
            </FormGroupCell>
            <FormGroupCell>
              <FormField 
                label="Национальность"
                inputPlaceholder="Введите национальность" 
                inputValue={isResumeDataLoaded && resumeSectionData.natiaonality ? resumeSectionData.natiaonality : ""}
                onChangeInputCallback={(value) => handleFormFieldInputChange("natiaonality", value)} 
              />
            </FormGroupCell>
          </FormGroup>
          {
            isResumeDataLoaded && resumeSectionData?.configurableFields?.length ? 
            <FormGroup gridTemplateColumns="1fr 1fr">
              {resumeSectionData.configurableFields.map(fieldData => {
                const { id, value, label } = fieldData;

                return (
                  <FormGroupCell key={id}>
                    <FormField
                      type="editable"
                      label="Чето"
                      inputValue={value}
                      inputLabelValue={label}
                      onChangeInputCallback={(value) => handleFormConfigurableFieldChange(id, "value", value)}
                      onChangeEditableTitleCallback={(value) => handleFormConfigurableFieldChange(id, "label", value)}
                      onClickButtonDeleteFieldCallback={() => handleFormConfigurableFieldDelete(id)}
                    />
                  </FormGroupCell>
                );
              })}
            </FormGroup> : null
          }
        </div>
        <div className={styles.sectionButtonAddWrapper}>
          <ButtonAdd callbackOnClick={() => handleButtonAddFormFieldClick({ id: "generated-id-new", label: "", value: "" })}>Настраиваемое поле</ButtonAdd>
        </div>
      </div>
    </div>
  );
}
