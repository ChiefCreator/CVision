import React from "react";

import FormGroup from "@/components/form/FormGroup/FormGroup";
import FormGroupCell from "@/components/form/FormGroup/FormGroupCell";
import FormFieldEditInputSkeleton from "@/components/form/FormField/FormFieldInput/FormFieldEditInputSkeleton/FormFieldEditInputSkeleton";
import SectionSkeleton from "../../Section/SectionSkeleton";

import styles from "./PersonalDetails.module.scss";

export default function PersonalDetailsSkeleton() {
  return (
    <SectionSkeleton>
      <FormGroup className={styles.formGroup} gridTemplateColumns="6fr 6fr">
        {Array.from({ length: 13 }).map((_, i) => (
          <FormGroupCell key={i} gridArea={i === 2 ? "2 / 1 / 2 / 3" : i === 5 ? "4 / 1 / 5 / 3" : undefined}>
            <FormFieldEditInputSkeleton />
          </FormGroupCell>
        ))}
      </FormGroup>
    </SectionSkeleton>
  );
}