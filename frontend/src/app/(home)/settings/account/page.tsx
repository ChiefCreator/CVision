import Container from "@/components/utils/Container/Container";
import DangerousZoneSection from "./components/DangerousZoneSection/DangerousZoneSection";
import OAuthProvidersSection from "./components/OAuthProvidersSection/OAuthProvidersSection";
import ProfileSection from "./components/ProfileSection/ProfileSection";
import UserSettingsSection from "./components/UserSettingsSection/UserSettingsSection";

import styles from "./page.module.scss";

export default function AccountPage() {
	return (
		<div className={styles.page}>
			<Container className={styles.container}>
				<div className={styles.content}>
					<h1 className={styles.title}>Настройки аккаунта</h1>

					<ul className={styles.sectionsList}>
						<ProfileSection />
						<UserSettingsSection />
						<OAuthProvidersSection />
						<DangerousZoneSection />
					</ul>
				</div>
			</Container>
		</div>
	)
}
