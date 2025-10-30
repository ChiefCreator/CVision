import React from "react";

import FormFieldTextEditor from "@/components/form/FormField/FormFieldTextEditor/FormFieldTextEditor";
import FormGroup from "@/components/form/FormGroup/FormGroup";
import FormGroupCell from "@/components/form/FormGroup/FormGroupCell";

import clsx from "clsx";
import { DomainSectionProps } from "../../compoundComponents/Section/Section";
import { SectionForm } from "../../compoundComponents/Section/SectionForm";
import styles from "./../../compoundComponents/Section/Section.module.scss";

export default React.memo(function Hobbies({ section }: DomainSectionProps<"resume", "hobbies">) {
  return (
    <SectionForm type="single" section={section}>
      {({ data, getDataFieldHandler }) => (
        <FormGroup className={clsx(styles.formGroup, styles.formGroupOneColumn)}>
          <FormGroupCell>
            <FormFieldTextEditor
              label="Хобби"

              placeholder="Например занятие спортом, чтение книг..."

              onChange={getDataFieldHandler("hobbyDescription")}
            >
              {data?.hobbyDescription}
            </FormFieldTextEditor>
          </FormGroupCell>
        </FormGroup>
      )}
    </SectionForm>
  );
})