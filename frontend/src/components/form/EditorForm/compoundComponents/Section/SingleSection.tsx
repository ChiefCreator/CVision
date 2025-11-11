import TitleEditor from "@/components/input/TitleEditor/TitleEditor";
import { ChevronDown } from "lucide-react";

import type { SingleSectionProps } from "./Section";

import clsx from "clsx";
import styles from "./Section.module.scss";

export default function SingleSection({
  className,
  children,
  title,
  template,
  isOpen,
  deleteControls,
  onHeadClick,
  onChangeTitle,
}: SingleSectionProps) {
  return (
    <div className={clsx(styles.section, className)}>
      <header className={styles.head} onClick={onHeadClick}>
        <div className={styles.titleWrapper} data-skip>
          <TitleEditor
            className={styles.titleEditor}
            controlClassName={styles.titleEditorControl}
            value={title}
            defaultValue={template?.title}
            controls={template.isRequired ? undefined : deleteControls}

            onChange={onChangeTitle}
          />
        </div>

        <ChevronDown className={clsx(styles.arrow, { [styles.arrowOpen]: isOpen })} />
      </header>

      <div className={clsx(styles.body, { [styles.bodyOpen]: isOpen })}>
        <div className={styles.bodyContainer}>
          <div className={styles.bodyContent}>
            {/* {description && <p className={styles.description}>{description}</p>}
            {additionalContent && <div className={styles.additionalContent}>{additionalContent}</div>} */}

            {children}
          </div>
        </div>
      </div>
    </div>
  );
}