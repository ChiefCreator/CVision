
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
  onHeadClick,
  changeField,
}: SingleSectionProps) {
  // const deleteControlObj = useDelete({ sectionName , sectionId: id});

  // const controls = useMemo(() => [...deleteControlObj], [deleteControlObj]);

  return (
    <div className={clsx(styles.section, className)}>
      <header className={styles.head} onClick={onHeadClick}>
        <div className={styles.titleWrapper} data-skip>
          <TitleEditor
            className={styles.titleEditor}
            controlClassName={styles.titleEditorControl}
            value={title}
            defaultValue={template?.title}
            // controls={!isDefaultResumeSection(sectionName) ? controls : undefined}

            onChange={(v) => changeField(`title`, v)}
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