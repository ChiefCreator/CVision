import React from "react";

import FormFieldTextEditor from "@/components/form/FormField/FormFieldTextEditor/FormFieldTextEditor";
import FormGroup from "@/components/form/FormGroup/FormGroup";
import FormGroupCell from "@/components/form/FormGroup/FormGroupCell";

import clsx from "clsx";
import { DomainSectionProps } from "../../compoundComponents/Section/Section";
import { SectionForm } from "../../compoundComponents/Section/SectionForm";
import styles from "./../../compoundComponents/Section/Section.module.scss";

export default React.memo(function ProfessionalSummary({ section }: DomainSectionProps<"resume", "professionalSummary">) {
  return (
    <SectionForm type="single" section={section}>
      {({ data, getDataFieldHandler }) => (
        <FormGroup className={clsx(styles.formGroup, styles.formGroupOneColumn)}>
          <FormGroupCell>
            <FormFieldTextEditor
              placeholder="Напишите краткое резюме о себе, своих навыках и опыте."

              onChange={getDataFieldHandler("summary")}
            >
              {data?.summary}
            </FormFieldTextEditor>
          </FormGroupCell>
        </FormGroup>
      )}
    </SectionForm>
  );
})