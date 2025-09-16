import { ContentAuthWrapperProps } from "../AuthWrapper"
import styles from "./ContentAuthWrapper.module.scss"

export function ContentAuthWrapper({ pageContent, content }: ContentAuthWrapperProps) {
	return (
		<div className={styles.layout}>
			<div className={styles.page}>{pageContent}</div>

			<div className={styles.content}>{content}</div>
		</div>
	)
}
