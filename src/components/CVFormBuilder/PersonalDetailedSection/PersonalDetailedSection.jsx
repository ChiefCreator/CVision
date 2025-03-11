import styles from "./PersonalDetailedSection.module.scss";

import EditableTitle from "../../EditableTitle/EditableTitle";
import FormGroup from "../../FormGroup/FormGroup";
import FormGroupCell from "../../FormGroup/FormGroupCell";
import FormField from "../../FormField/FormField";
import FormFieldImage from "../../FormFieldImage/FormFieldImage";
import ButtonAdd from "../../ButtonAdd/ButtonAdd";
import { useImageUploaderContext } from "../../../context/ImageUploaderContext";
import { useResumeContext } from "../../../context/ResumeContext";

import { generateUUID } from "../../../lib/mathUtils";

export default function PersonalDetailedSection({ resumeId, data, isResumeDataLoaded, changeField }) {
  const { dispatchOfResumesDataState } = useResumeContext();
  const sectionId = "personalInformation";
  const defaultTitle = "Персональная информация";

  const { setIsOpen } = useImageUploaderContext();

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
    setIsOpen(true);
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
              <FormFieldImage label="Фото" onClickCallback={handleFormFieldImageClick} />
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
