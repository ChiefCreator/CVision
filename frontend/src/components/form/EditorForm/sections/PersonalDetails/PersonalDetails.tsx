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
      {({ data, changeField }) => (
        <FormGroup className={styles.formGroup}>
          <FormGroupCell>
            "Аватар"
          </FormGroupCell>
          <FormGroupCell>
            <FormFieldEditInput
              label="Профессия"

              value={data?.jobTitle}
              placeholder={"Введите название профессии"}
              onChange={(v) => changeField("jobTitle", v)}
            />
          </FormGroupCell>
          <FormGroupCell className={styles.formGroupCellPersonalDetailsFullName}>
            <FormFieldEditInput
              label="Полное имя"

              value={data?.fullName}
              placeholder={"Введите полное имя"}
              onChange={(v) => changeField("fullName", v)}
            />
          </FormGroupCell>
          <FormGroupCell>
            <FormFieldEditInput
              label="Электронная почта"

              value={data?.email}
              placeholder={"Введите эл. почту"}
              onChange={(v) => changeField("email", v)}
            />
          </FormGroupCell>
          <FormGroupCell>
            <FormFieldEditInput
              label="Номер телефона"

              value={data?.phone}
              placeholder={"Введите номер телефона"}
              onChange={(v) => changeField("phone", v)}
            />
          </FormGroupCell>
          <FormGroupCell className={styles.formGroupCellPersonalDetailsAddress}>
            <FormFieldEditInput
              label="Адрес"

              value={data?.address}
              placeholder={"Введите адрес"}
              onChange={(v) => changeField("address", v)}
            />
          </FormGroupCell>
          <FormGroupCell>
            <FormFieldEditInput
              label="Город"

              value={data?.city}
              placeholder={"Введите город"}
              onChange={(v) => changeField("city", v)}
            />
          </FormGroupCell>
          <FormGroupCell>
            <FormFieldEditInput
              label="Страна"

              value={data?.country}
              placeholder={"Введите название страны"}
              onChange={(v) => changeField("country", v)}
            />
          </FormGroupCell>
          <FormGroupCell>
            <FormFieldEditInput
              label="Почтовый код"

              value={data?.postalCode}
              placeholder={"Введите почтовый код"}
              onChange={(v) => changeField("postalCode", v)}
            />
          </FormGroupCell>
          <FormGroupCell>
            <FormFieldEditInput
              label="Водительские права"

              value={data?.drivingLicense}
              placeholder={"Введите тип водительских прав"}
              onChange={(v) => changeField("drivingLicense", v)}
            />
          </FormGroupCell>
          <FormGroupCell>
            <FormFieldEditInput
              label="Место рождения"

              value={data?.birthPlace}
              placeholder={"Введите место рождения"}
              onChange={(v) => changeField("birthPlace", v)}
            />
          </FormGroupCell>
          <FormGroupCell>
            <FormFieldEditInput
              label="Дата рождения"

              value={data?.birthDate}
              placeholder={"Введите дату рождения"}
              onChange={(v) => changeField("birthDate", v)}
            />
          </FormGroupCell>
          <FormGroupCell>
            <FormFieldEditInput
              label="Национальность"

              value={data?.nationality}
              placeholder={"Введите национальность"}
              onChange={(v) => changeField("nationality", v)}
            />
          </FormGroupCell>
        </FormGroup>
      )}
    </SectionForm>
  );
})