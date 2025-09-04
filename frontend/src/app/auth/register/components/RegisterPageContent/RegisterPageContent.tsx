import { OAuthProviders } from "@/components/form/OAuthProviders/OAuthProviders";
import RegisterForm from "../RegisterForm/RegisterForm";
import styles from "./RegisterPageContent.module.scss";

export function RegisterPageContent() {
	return (
		<div className={styles.content}>
			<RegisterForm />

			<OAuthProviders className={styles.oAuthProviders} providers={["google", "yandex"]} />
		</div>
	)
}
