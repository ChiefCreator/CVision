import VerificationEmailForm from "../VerificationEmailForm/VerificationEmailForm";
import styles from "./VerificationEmailPageContent.module.scss";

export function VerificationEmailPageContent() {
	return (
		<div className={styles.content}>
			<VerificationEmailForm />
		</div>
	)
}
