import { useFieldChange } from "@/api/resume/hooks";
import React from "react";

import FormFieldEditInput from "@/components/form/FormField/FormFieldInput/FormFieldInput";
import FormGroup from "@/components/form/FormGroup/FormGroup";
import FormGroupCell from "@/components/form/FormGroup/FormGroupCell";
import Section from "../../Section/Section";

import type { ChangeResumeField, ResumeSectionChangeObj } from "@/types/resume/resumeUpdateFunctions";
import type { PersonalDetails } from "@/types/resumeSection/sections";

import styles from "./../../Section/Section.module.scss";

interface PersonalDetailsProps {
  sectionData: PersonalDetails;
  isOpen: (sectionId: string, subsectionId?: string) => boolean;

  onToggle: (id: string) => void;
  onChange: ChangeResumeField;
}

const sectionName = "personalDetails";

export default React.memo(function PersonalDetails({ sectionData, isOpen, onToggle, onChange }: PersonalDetailsProps) {
  const changeObj: ResumeSectionChangeObj<PersonalDetails, "description"> = {
    title: useFieldChange(onChange, `${sectionName}.title`),
    avatarUrl: useFieldChange(onChange, `${sectionName}.avatarUrl`),
    jobTitle: useFieldChange(onChange, `${sectionName}.jobTitle`),
    fullName: useFieldChange(onChange, `${sectionName}.fullName`),
    email: useFieldChange(onChange, `${sectionName}.email`),
    phone: useFieldChange(onChange, `${sectionName}.phone`),
    address: useFieldChange(onChange, `${sectionName}.address`),
    city: useFieldChange(onChange, `${sectionName}.city`),
    country: useFieldChange(onChange, `${sectionName}.country`),
    postalCode: useFieldChange(onChange, `${sectionName}.postalCode`),
    birthPlace: useFieldChange(onChange, `${sectionName}.birthPlace`),
    birthDate: useFieldChange(onChange, `${sectionName}.birthDate`),
    nationality: useFieldChange(onChange, `${sectionName}.nationality`),
    drivingLicense: useFieldChange(onChange, `${sectionName}.drivingLicense`),
  }

  return (
    <Section
      id={sectionData.id}
      sectionName={sectionName}
      title={sectionData.title}
      defaultTitle={sectionData.defaultTitle}
      description={sectionData.description}
      
      checkIsOpen={isOpen}
      onToggle={onToggle}
      onChange={changeObj.title}
    >
      <FormGroup className={styles.formGroup}>
        <FormGroupCell>
          "Аватар"
        </FormGroupCell>
        <FormGroupCell>
          <FormFieldEditInput
            label="Профессия"
            
            value={sectionData?.jobTitle}
            placeholder={"Введите название профессии"}
            onChange={changeObj.jobTitle}
          />
        </FormGroupCell>
        <FormGroupCell className={styles.formGroupCellPersonalDetailsFullName}>
          <FormFieldEditInput
            label="Полное имя"
            
            value={sectionData?.fullName}
            placeholder={"Введите полное имя"}
            onChange={changeObj.fullName}
          />
        </FormGroupCell>
        <FormGroupCell>
          <FormFieldEditInput
            label="Электронная почта"
            
            value={sectionData?.email}
            placeholder={"Введите эл. почту"}
            onChange={changeObj.email}
          />
        </FormGroupCell>
        <FormGroupCell>
          <FormFieldEditInput
            label="Номер телефона"
            
            value={sectionData?.phone}
            placeholder={"Введите номер телефона"}
            onChange={changeObj.phone}
          />
        </FormGroupCell>
        <FormGroupCell className={styles.formGroupCellPersonalDetailsAddress}>
          <FormFieldEditInput
            label="Адрес"
            
            value={sectionData?.address}
            placeholder={"Введите адрес"}
            onChange={changeObj.address}
          />
        </FormGroupCell>
        <FormGroupCell>
          <FormFieldEditInput
            label="Город"
            
            value={sectionData?.city}
            placeholder={"Введите город"}
            onChange={changeObj.city}
          />
        </FormGroupCell>
        <FormGroupCell>
          <FormFieldEditInput
            label="Страна"
            
            value={sectionData?.country}
            placeholder={"Введите название страны"}
            onChange={changeObj.country}
          />
        </FormGroupCell>
        <FormGroupCell>
          <FormFieldEditInput
            label="Почтовый код"
            
            value={sectionData?.postalCode}
            placeholder={"Введите почтовый код"}
            onChange={changeObj.postalCode}
          />
        </FormGroupCell>
        <FormGroupCell>
          <FormFieldEditInput
            label="Водительские права"
            
            value={sectionData?.drivingLicense}
            placeholder={"Введите тип водительских прав"}
            onChange={changeObj.drivingLicense}
          />
        </FormGroupCell>
        <FormGroupCell>
          <FormFieldEditInput
            label="Место рождения"
            
            value={sectionData?.birthPlace}
            placeholder={"Введите место рождения"}
            onChange={changeObj.birthPlace}
          />
        </FormGroupCell>
        <FormGroupCell>
          <FormFieldEditInput
            label="Дата рождения"
            
            value={sectionData?.birthDate}
            placeholder={"Введите дату рождения"}
            onChange={changeObj.birthDate}
          />
        </FormGroupCell>
        <FormGroupCell>
          <FormFieldEditInput
            label="Национальность"
            
            value={sectionData?.nationality}
            placeholder={"Введите национальность"}
            onChange={changeObj.nationality}
          />
        </FormGroupCell>
      </FormGroup>
    </Section>
  );
})