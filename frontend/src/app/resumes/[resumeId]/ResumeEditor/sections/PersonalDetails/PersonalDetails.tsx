import React from "react";
import { useFieldChange } from "@/api/resume/hooks";

import Section from "../../Section/Section";
import FormGroup from "@/components/form/FormGroup/FormGroup";
import FormGroupCell from "@/components/form/FormGroup/FormGroupCell";
import FormFieldEditInput from "@/components/form/FormField/FormFieldInput/FormFieldInput";

import type { Resume, PersonalDetails, ResumeSectionName } from "@/types/resumeTypes"
import type { ChangeResumeField } from "@/types/resumeTypes";

import styles from "./PersonalDetails.module.scss";

interface PersonalDetailsProps {
  sectionData?: Resume["personalDetails"];
  isOpen: boolean;

  onToggle: (id: ResumeSectionName) => void;
  onChange: ChangeResumeField;
}
type PersonalDetailsChangeObj = {
  [key in keyof Required<Omit<PersonalDetails, "id" | "defaultTitle" | "order">>]: (val: string) => void
};

const id = "personalDetails";

export default React.memo(function PersonalDetails({ sectionData, isOpen, onToggle, onChange }: PersonalDetailsProps) {
  const changeObj: PersonalDetailsChangeObj= {
    title: useFieldChange(onChange, `${id}.title`),
    avatarUrl: useFieldChange(onChange, `${id}.avatarUrl`),
    jobTitle: useFieldChange(onChange, `${id}.jobTitle`),
    fullName: useFieldChange(onChange, `${id}.fullName`),
    email: useFieldChange(onChange, `${id}.email`),
    phone: useFieldChange(onChange, `${id}.phone`),
    address: useFieldChange(onChange, `${id}.address`),
    city: useFieldChange(onChange, `${id}.city`),
    country: useFieldChange(onChange, `${id}.country`),
    postalCode: useFieldChange(onChange, `${id}.postalCode`),
    birthPlace: useFieldChange(onChange, `${id}.birthPlace`),
    birthDate: useFieldChange(onChange, `${id}.birthDate`),
    nationality: useFieldChange(onChange, `${id}.nationality`),
    drivingLicense: useFieldChange(onChange, `${id}.drivingLicense`),
  }

  return (
    <Section
      title={sectionData?.title}
      defaultTitle={sectionData?.defaultTitle}
      isOpen={isOpen}
      onToggle={() => onToggle(id)}
      onChange={changeObj.title}
    >
      <FormGroup className={styles.formGroup} gridTemplateColumns="6fr 6fr">
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
        <FormGroupCell gridArea="2 / 1 / 2 / 3">
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
        <FormGroupCell gridArea="4 / 1 / 5 / 3">
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