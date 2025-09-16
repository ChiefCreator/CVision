import { OAuthProviders } from "@/components/form/OAuthProviders/OAuthProviders";
import LoginForm from "../LoginForm/LoginForm";
import styles from "./LoginPageContent.module.scss";

export function LoginPageContent() {
	return (
		<div className={styles.content}>
			<LoginForm />

			<OAuthProviders className={styles.oAuthProviders} providers={["google", "yandex"]} />
		</div>
	)
}
