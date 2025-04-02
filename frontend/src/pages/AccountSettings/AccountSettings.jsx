import styles from "./AccountSettings.module.scss";

import FormAccountProfile from "./FormAccountProfile/FormAccountProfile";

export default function AccountSettings() {

  return (
    <div className={styles.page}>
      <div className={styles.pageContainer}>
        <header className={styles.pageHeader}>
          <h2 className={styles.pageTitle}>Настройки аккаунта</h2>
        </header>
  
        <div className={styles.pageSections}>
          <section className={styles.section}>
            <header className={styles.sectionHeader}>
              <h4 className={styles.sectionTitle}>Аккаунт</h4>
            </header>
  
            <div className={styles.sectionBody}>
              <FormAccountProfile />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}