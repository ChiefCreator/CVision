import styles from "./NoDocuments.module.scss";

export default function NoDocuments({ illustrationSrc, title, description, Control }) {
  return (
    <div className={styles.noDocuments}>
      {illustrationSrc && <img className={styles.noDocumentsIllustration} src={illustrationSrc}></img>}

      <h4 className={styles.noDocumentsTitle}>{title}</h4>
      <p className={styles.noDocumentsDescription}>{description}</p>

      {Control && <div className={styles.noDocumentsButtonWrapper}>{Control}</div>}
    </div>
  );
}