import styles from "./PersonalDetailedSection.module.scss";

import EditableTitle from "../../EditableTitle/EditableTitle";
import FormGroup from "../../FormGroup/FormGroup";
import FormGroupCell from "../../FormGroup/FormGroupCell";
import FormField from "../../FormField/FormField";
import FormFieldImage from "../../FormFieldImage/FormFieldImage";
import ButtonAdd from "../../ButtonAdd/ButtonAdd";
import { useImageManagerContext } from "../../../context/ImageManagerContext";
import { useResumeContext } from "../../../context/ResumeContext";

import { generateUUID } from "../../../lib/mathUtils";
import { useEffect } from "react";

export default function PersonalDetailedSection({ resumeId, data, isResumeDataLoaded, changeField }) {
  const { dispatchOfResumesDataState } = useResumeContext();
  const sectionId = "personalInformation";
  const defaultTitle = "Персональная информация";

  const { imageManagerState, dispatchOfImageManagerState } = useImageManagerContext();
  const { loadingStageOfCroppedImage } = imageManagerState;

  const imageFieldControlsData = [
    { 
      id: "control-1",
      title: "Удалить изображение",
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M292.309-140.001q-29.923 0-51.115-21.193-21.193-21.192-21.193-51.115V-720h-10q-12.769 0-21.384-8.615t-8.616-21.384 8.616-21.384q8.615-8.616 21.384-8.616H360q0-14.692 10.346-25.038t25.038-10.346h169.232q14.692 0 25.038 10.346T600-779.999h149.999q12.769 0 21.384 8.616t8.616 21.384-8.616 21.384Q762.768-720 749.999-720h-10v507.691q0 29.923-21.193 51.115-21.192 21.193-51.115 21.193zM680-720H280v507.691q0 5.385 3.462 8.847t8.847 3.462h375.382q5.385 0 8.847-3.462t3.462-8.847zM376.155-280h59.999v-360h-59.999zm147.691 0h59.999v-360h-59.999zM280-720v520z"></path></svg>,
      onClick: deleteImage,
    }
  ];

  useEffect(() => {
    if (data?.photo) dispatchOfImageManagerState({ type: "SET_LOADING_STAGE_OF_CROPPED_IMAGE", loadingStage: "loaded" });
  }, [isResumeDataLoaded])

  // обработчики
  function handleFormConfigurableFieldChange(configurableObjectId, key, value) {
    dispatchOfResumesDataState({ 
      type: "UPDATE_RESUME_SECTION_CONFIGURABLE_FIELD",
      resumeId,
      sectionId,
      configurableObjectId,
      key,
      value,
    })
  }
  function handleButtonAddFormFieldClick(newConfigurableFieldObject) {
    dispatchOfResumesDataState({ 
      type: "ADD_RESUME_SECTION_CONFIGURABLE_FIELD",
      resumeId,
      sectionId,
      newConfigurableFieldObject,
    })
  }
  function handleFormConfigurableFieldDelete(configurableFieldId) {
    dispatchOfResumesDataState({ 
      type: "DELETE_RESUME_SECTION_CONFIGURABLE_FIELD",
      resumeId,
      sectionId,
      configurableFieldId,
    })
  }
  function handleFormFieldImageClick() {
    dispatchOfImageManagerState({ type: "SET_IS_OPEN", isOpen: true });
  }

  function deleteImage() {
    dispatchOfResumesDataState({
      type: "DELETE_RESUME_SECTION_FIELD",
      resumeId,
      sectionId,
      key: "photo",
    });

    dispatchOfImageManagerState({
      type: "SET_LOADING_STAGE_OF_CROPPED_IMAGE",
      loadingStage: "none",
    });
  }

  return (
    <div className={styles.section}>
      <header className={styles.sectionHeader}>
        <EditableTitle placeholder={defaultTitle} fontSize={22} onChangeCallback={(value) => changeField(sectionId, "title", value)}>
          {data?.title ?? defaultTitle}
        </EditableTitle>
      </header>
      <div className={styles.sectionBody}>
        <div className={styles.sectionFormGroups}>
          <FormGroup gridTemplateColumns="auto 1fr 1fr" gridTemplateRows="1fr 1fr">
            <FormGroupCell gridArea="1 / 1 / 3 / 2">
              <FormFieldImage imgSrc={data?.photo} label="Фото" imgLoadingStage={loadingStageOfCroppedImage} controlsData={imageFieldControlsData} onClickCallback={handleFormFieldImageClick} />
            </FormGroupCell>
            <FormGroupCell>
              <FormField 
                label="Имя"
                inputValue={data?.name}
                inputPlaceholder="Введите имя"
                onChangeInputCallback={(value) => changeField(sectionId, "name", value)} 
              />
            </FormGroupCell>
            <FormGroupCell>
              <FormField 
                label="Фамилия"
                inputValue={data?.surname}
                onChangeInputCallback={(value) => changeField(sectionId, "surname", value)}
                inputPlaceholder="Введите фамилию"
              />
            </FormGroupCell>
            <FormGroupCell gridArea="2 / 2 / 3 / 4">
              <FormField 
                label="Профессия"
                inputValue={data?.jobTitle}
                onChangeInputCallback={(value) => changeField(sectionId, "jobTitle", value)}
                inputPlaceholder="Введите профессию"
              />
            </FormGroupCell>
          </FormGroup>
          <FormGroup gridTemplateColumns="1fr 1fr">
            <FormGroupCell gridArea="1 / 1 / 3 / 2">
              <FormField
                label="Эл. почта"
                inputValue={data?.email}
                inputPlaceholder="Введите эл. почту"
                onChangeInputCallback={(value) => changeField(sectionId, "email", value)} 
              />
            </FormGroupCell>
            <FormGroupCell>
              <FormField 
                label="Номер телефона"
                inputPlaceholder="Введите номер телефона"
                inputValue={data?.phoneNumber}
                onChangeInputCallback={(value) => changeField(sectionId, "phoneNumber", value)} 
              />
            </FormGroupCell>
          </FormGroup>
          <FormGroup gridTemplateColumns="1fr 1fr">
            <FormGroupCell>
              <FormField
                label="Город"
                inputPlaceholder="Введите город"
                inputValue={data?.city}
                onChangeInputCallback={(value) => changeField(sectionId, "city", value)} 
              />
            </FormGroupCell>
            <FormGroupCell>
              <FormField 
                label="Почтовый код"
                inputPlaceholder="Введите почтовый код"
                inputValue={data?.postalCode}
                onChangeInputCallback={(value) => changeField(sectionId, "postalCode", value)} 
              />
            </FormGroupCell>
            <FormGroupCell gridArea="auto / 1 / auto / 3">
              <FormField 
                label="Адрес"
                inputPlaceholder="Введите ваш адрес"
                inputValue={data?.adress}
                onChangeInputCallback={(value) => changeField(sectionId, "adress", value)} 
              />
            </FormGroupCell>
          </FormGroup>
          <FormGroup gridTemplateColumns="1fr 1fr">
            <FormGroupCell gridArea="1 / 1 / 2 / 2">
              <FormField
                label="Пол"
                inputPlaceholder="Введите пол"
                inputValue={data?.gender}
                onChangeInputCallback={(value) => changeField(sectionId, "gender", value)} 
              />
            </FormGroupCell>
            <FormGroupCell>
              <FormField 
                label="Национальность"
                inputPlaceholder="Введите национальность" 
                inputValue={data?.nationality}
                onChangeInputCallback={(value) => changeField(sectionId, "nationality", value)} 
              />
            </FormGroupCell>
          </FormGroup>
          {
            isResumeDataLoaded && data?.configurableFields?.length ? 
            <FormGroup gridTemplateColumns="1fr 1fr">
              {data.configurableFields.map(fieldData => {
                const { id, value, label } = fieldData;

                return (
                  <FormGroupCell key={id}>
                    <FormField
                      type="editable"
                      label={null}
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
          <ButtonAdd callbackOnClick={() => handleButtonAddFormFieldClick({ id: generateUUID(), label: "", value: "" })}>Настраиваемое поле</ButtonAdd>
        </div>
      </div>
    </div>
  );
}
