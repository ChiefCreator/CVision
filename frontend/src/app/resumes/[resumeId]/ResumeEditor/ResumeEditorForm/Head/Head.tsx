import TitleEditor from "@/components/input/TitleEditor/TitleEditor";

import styles from "./Head.module.scss";

interface HeadProps {
  title?: string;

  changeField: (path: string, value: string) => void;
}

export default function Head({ title, changeField }: HeadProps) {
  return (
    <header className={styles.head}>
      <TitleEditor
        className={styles.headTitle}
        controlClassName={styles.headTitleControl}
        value={title}  
        isControlsShow={true}

        onChange={(val) => changeField("title", val)}
      />
    </header>
  );
}