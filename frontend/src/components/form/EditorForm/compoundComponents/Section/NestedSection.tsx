import TitleEditor from "@/components/input/TitleEditor/TitleEditor";
import { ChevronDown } from "lucide-react";
import AddSubsectionButton from "./AddSubsectionButton/AddSubsectionButton";

import type { NestedSectionProps } from "./Section";

import clsx from "clsx";
import { memo } from "react";
import styles from "./Section.module.scss";

export default memo(function NestedSection({
  className,
  id,
  children,
  title,
  template,
  isOpen,
  onAddSubsection,
  onHeadClick,
  onChangeTitle,
}: NestedSectionProps) {
  // const deleteControlObj = useDelete({ sectionName , sectionId: id});
  // const controls = useMemo(() => [...deleteControlObj], [deleteControlObj]);

  return (
    <div className={clsx(styles.section, className)}>
      <header className={styles.head} onClick={onHeadClick}>
        <TitleEditor
          className={styles.titleEditor}
          controlClassName={styles.titleEditorControl}
          value={title}
          defaultValue={template?.title}
          // controls={!isDefaultResumeSection(sectionName) ? controls : undefined}
  
          onChange={onChangeTitle}
        />

        <ChevronDown className={clsx(styles.arrow, { [styles.arrowOpen]: isOpen })} />
      </header>

      <div className={clsx(styles.body, { [styles.bodyOpen]: isOpen })}>
        <div className={styles.bodyContainer}>
          <div className={styles.bodyContent}>
            {/* {description && <p className={styles.description}>{description}</p>}
            {additionalContent && <div className={styles.additionalContent}>{additionalContent}</div>} */}

            <div className={styles.subsectionList}>{children}</div>

            <AddSubsectionButton className={styles.addSubsectionButton} onClick={onAddSubsection} />
          </div>
        </div>
      </div>
    </div>
  );
})