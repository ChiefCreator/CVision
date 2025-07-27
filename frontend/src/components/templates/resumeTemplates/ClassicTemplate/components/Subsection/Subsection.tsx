import styles from "./Subsection.module.scss";

import parse from "html-react-parser";

interface SubsectionProps {
  title?: string;
  description?: string;
  date?: string;
  meta?: string;
}

export default function Subsection({ title, description, date, meta }: SubsectionProps) {
  return (
    <div className={styles.subsection}>
      <time className={styles.date}>{date}</time>

      <div className={styles.content}>
        <header className={styles.head}>
          {title && <h3 className={styles.title}>{title}</h3>}

          {meta && <span className={styles.meta}>{meta}</span>}
        </header>

        {description && <p className={styles.description}>{parse(description)}</p>}
      </div>
    </div>
  );
}