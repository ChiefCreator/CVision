
import TitleEditorSkeleton from "@/components/input/TitleEditor/TitleEditorSkeleton";

import type { BaseComponent } from "@/types/root";

import FormFieldEditInputSkeleton from "@/components/form/FormField/FormFieldInput/FormFieldEditInputSkeleton/FormFieldEditInputSkeleton";
import FormGroup from "@/components/form/FormGroup/FormGroup";
import FormGroupCell from "@/components/form/FormGroup/FormGroupCell";
import clsx from "clsx";
import styles from "./Section.module.scss";

export default function SectionSkeleton({ className }: BaseComponent) {
  return (
    <div className={clsx(styles.section, className)}>
      <header className={styles.head}>
        <TitleEditorSkeleton />
      </header>

      <div className={clsx(styles.body, styles.bodyOpen)}>
        <div className={styles.bodyContainer}>
          <div className={styles.bodyContent}>
            <FormGroup className={styles.formGroup}>
              <FormGroupCell>
                <FormFieldEditInputSkeleton />
              </FormGroupCell>
              <FormGroupCell className={styles.formGroupCellPersonalDetailsFullName}>
                <FormFieldEditInputSkeleton />
              </FormGroupCell>
              <FormGroupCell>
                <FormFieldEditInputSkeleton />
              </FormGroupCell>
              <FormGroupCell>
                <FormFieldEditInputSkeleton />
              </FormGroupCell>
              <FormGroupCell className={styles.formGroupCellPersonalDetailsAddress}>
                <FormFieldEditInputSkeleton />
              </FormGroupCell>
              <FormGroupCell>
                <FormFieldEditInputSkeleton />
              </FormGroupCell>
              <FormGroupCell>
                <FormFieldEditInputSkeleton />
              </FormGroupCell>
              <FormGroupCell>
                <FormFieldEditInputSkeleton />
              </FormGroupCell>
              <FormGroupCell>
                <FormFieldEditInputSkeleton />
              </FormGroupCell>
              <FormGroupCell>
                <FormFieldEditInputSkeleton />
              </FormGroupCell>
              <FormGroupCell>
                <FormFieldEditInputSkeleton />
              </FormGroupCell>
              <FormGroupCell>
                <FormFieldEditInputSkeleton />
              </FormGroupCell>
            </FormGroup>
          </div>
        </div>
      </div>
    </div>
  );
}