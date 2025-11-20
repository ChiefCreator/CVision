import { BaseComponent } from "@/types/root";
import clsx from "clsx";
import styles from "./NoDocuments.module.scss";

interface NoDocumentsProps extends BaseComponent {
  illustrationSrc?: string;
  title: string;
  description: string;
  controlsContent?: React.ReactNode;
}

export default function NoDocuments({ className, illustrationSrc, title, description, controlsContent }: NoDocumentsProps) {
  return (
    <div className={clsx(styles.noDocuments, className)}>
      {illustrationSrc && <img className={styles.noDocumentsIllustration} src={illustrationSrc}></img>}

      <h4 className={styles.noDocumentsTitle}>{title}</h4>
      <p className={styles.noDocumentsDescription}>{description}</p>

      {controlsContent && (
        <div className={styles.noDocumentsControlsWrapper}>{controlsContent}</div>
      )}
    </div>
  );
}