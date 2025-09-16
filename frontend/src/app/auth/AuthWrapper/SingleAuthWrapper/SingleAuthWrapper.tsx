import { SingleAuthWrapperProps } from "../AuthWrapper"
import styles from "./SingleAuthWrapper.module.scss"

export function SingleAuthWrapper({ pageContent }: SingleAuthWrapperProps) {
	return (
		<div className={styles.layout}>
			<div className={styles.page}>{pageContent}</div>
		</div>
	)
}
