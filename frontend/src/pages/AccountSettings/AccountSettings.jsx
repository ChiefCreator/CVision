import styles from "./AccountSettings.module.scss";

import FormAccountProfile from "./FormAccountProfile/FormAccountProfile";
import SettingsSection from "../../components/SettingsSection/SettingsSection";

export default function AccountSettings() {

  return (
    <div className={styles.page}>
      <div className={styles.pageContainer}>
        <header className={styles.pageHeader}>
          <h2 className={styles.pageTitle}>Настройки аккаунта</h2>
        </header>
  
        <div className={styles.pageSections}>
          <SettingsSection
            title="Аккаунт"
            stylesConfig={{
              section: styles.section,
              header: styles.sectionHeader,
              title: styles.sectionTitle,
              body: styles.sectionBody,
            }}
          >
            <FormAccountProfile />
          </SettingsSection>
        </div>
      </div>
    </div>
  );
}