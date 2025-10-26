
import FormFieldTextEditorSkeleton from "@/components/form/FormField/FormFieldTextEditor/FormFieldTextEditorSkeleton";
import FormGroup from "@/components/form/FormGroup/FormGroup";
import FormGroupCell from "@/components/form/FormGroup/FormGroupCell";
import SectionSkeleton from "../../Section/SectionSkeleton";

import styles from "./../../compoundComponents/Section/Section.module.scss";

export default function ProfessionalSummarySkeleton() {
  return (
    <SectionSkeleton>
      <FormGroup className={styles.formGroup}>
        <FormGroupCell>
          <FormFieldTextEditorSkeleton className={styles.textEditor} />
        </FormGroupCell>
      </FormGroup>
    </SectionSkeleton>
  );
}