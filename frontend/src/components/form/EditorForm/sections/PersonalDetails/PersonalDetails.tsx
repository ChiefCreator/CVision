import React from "react";

import FormFieldEditInput from "@/components/form/FormField/FormFieldInput/FormFieldInput";
import FormGroup from "@/components/form/FormGroup/FormGroup";
import FormGroupCell from "@/components/form/FormGroup/FormGroupCell";

import { DomainSectionProps } from "../../compoundComponents/Section/Section";
import { SectionForm } from "../../compoundComponents/Section/SectionForm";
import styles from "./../../compoundComponents/Section/Section.module.scss";

export default React.memo(function PersonalDetails({ section }: DomainSectionProps<"resume", "personalDetails">) {
  return (
    <SectionForm type="single" section={section}>
      {({ data, getDataFieldHandler }) => (
        <FormGroup className={styles.formGroup}>
          <FormGroupCell>
            "Аватар"
          </FormGroupCell>
          <FormGroupCell>
            <FormFieldEditInput
              label="Профессия"

              value={data?.jobTitle}
              placeholder={"Введите название профессии"}
              onChange={getDataFieldHandler("jobTitle")}
            />
          </FormGroupCell>
          <FormGroupCell className={styles.formGroupCellPersonalDetailsFullName}>
            <FormFieldEditInput
              label="Полное имя"

              value={data?.fullName}
              placeholder={"Введите полное имя"}
              onChange={getDataFieldHandler("fullName")}
            />
          </FormGroupCell>
          <FormGroupCell>
            <FormFieldEditInput
              label="Электронная почта"

              value={data?.email}
              placeholder={"Введите эл. почту"}
              onChange={getDataFieldHandler("email")}
            />
          </FormGroupCell>
          <FormGroupCell>
            <FormFieldEditInput
              label="Номер телефона"

              value={data?.phone}
              placeholder={"Введите номер телефона"}
              onChange={getDataFieldHandler("phone")}
            />
          </FormGroupCell>
          <FormGroupCell className={styles.formGroupCellPersonalDetailsAddress}>
            <FormFieldEditInput
              label="Адрес"

              value={data?.address}
              placeholder={"Введите адрес"}
              onChange={getDataFieldHandler("address")}
            />
          </FormGroupCell>
          <FormGroupCell>
            <FormFieldEditInput
              label="Город"

              value={data?.city}
              placeholder={"Введите город"}
              onChange={getDataFieldHandler("city")}
            />
          </FormGroupCell>
          <FormGroupCell>
            <FormFieldEditInput
              label="Страна"

              value={data?.country}
              placeholder={"Введите название страны"}
              onChange={getDataFieldHandler("country")}
            />
          </FormGroupCell>
          <FormGroupCell>
            <FormFieldEditInput
              label="Почтовый код"

              value={data?.postalCode}
              placeholder={"Введите почтовый код"}
              onChange={getDataFieldHandler("postalCode")}
            />
          </FormGroupCell>
          <FormGroupCell>
            <FormFieldEditInput
              label="Водительские права"

              value={data?.drivingLicense}
              placeholder={"Введите тип водительских прав"}
              onChange={getDataFieldHandler("drivingLicense")}
            />
          </FormGroupCell>
          <FormGroupCell>
            <FormFieldEditInput
              label="Место рождения"

              value={data?.birthPlace}
              placeholder={"Введите место рождения"}
              onChange={getDataFieldHandler("birthPlace")}
            />
          </FormGroupCell>
          <FormGroupCell>
            <FormFieldEditInput
              label="Дата рождения"

              value={data?.birthDate}
              placeholder={"Введите дату рождения"}
              onChange={getDataFieldHandler("birthDate")}
            />
          </FormGroupCell>
          <FormGroupCell>
            <FormFieldEditInput
              label="Национальность"

              value={data?.nationality}
              placeholder={"Введите национальность"}
              onChange={getDataFieldHandler("nationality")}
            />
          </FormGroupCell>
        </FormGroup>
      )}
    </SectionForm>
  );
})