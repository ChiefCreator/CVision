import styles from "./SettingsSection.module.scss";

export default function SettingsSection({ title, children, stylesConfig }) {
  return (
    <section className={`${styles.section} ${stylesConfig?.section ?? ""}`}>
      <header className={`${styles.sectionHeader} ${stylesConfig?.header ?? ""}`}>
        <h4 className={`${styles.sectionTitle} ${stylesConfig?.title ?? ""}`}>{title}</h4>
      </header>

      <div className={`${styles.sectionBody} ${stylesConfig?.body ?? ""}`}>
        {children}
      </div>
    </section>
  );
}