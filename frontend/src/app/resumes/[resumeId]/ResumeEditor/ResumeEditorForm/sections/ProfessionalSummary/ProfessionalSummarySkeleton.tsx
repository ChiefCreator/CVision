import React from "react";

import FormGroup from "@/components/form/FormGroup/FormGroup";
import FormGroupCell from "@/components/form/FormGroup/FormGroupCell";
import SectionSkeleton from "../../Section/SectionSkeleton";
import FormFieldTextEditorSkeleton from "@/components/form/FormField/FormFieldTextEditor/FormFieldTextEditorSkeleton";

import styles from "./ProfessionalSummary.module.scss";

export default function ProfessionalSummarySkeleton() {
  return (
    <SectionSkeleton>
      <FormGroup className={styles.formGroup} gridTemplateColumns="12fr">
        <FormGroupCell>
          <FormFieldTextEditorSkeleton className={styles.textEditor} />
        </FormGroupCell>
      </FormGroup>
    </SectionSkeleton>
  );
}