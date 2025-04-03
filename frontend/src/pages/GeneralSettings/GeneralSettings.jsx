import { useNavigate } from "react-router-dom";

import styles from "./GeneralSettings.module.scss";

import SettingsSection from "../../components/SettingsSection/SettingsSection";
import AccountPanel from "./AccountPanel/AccountPanel";

export default function GeneralSettings() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.pageContainer}>
        <div className={styles.pageSections}>
          <SettingsSection
            title="Аккаунт"
          >
            <AccountPanel
              buttonEditConfig={{
                onClick: () => navigate("/settings/account")   
              }}
            />
          </SettingsSection>
        </div>
      </div>
    </div>
  );
}