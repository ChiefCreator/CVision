import TitleEditor from "@/components/input/TitleEditor/TitleEditor";

import { BaseComponent } from "@/types/root";
import clsx from "clsx";
import { useEditorFormContext } from "../../hooks/useEditorFormContext";
import styles from "./Header.module.scss";

interface HeaderProps extends BaseComponent {
}

export default function Header({ className }: HeaderProps) {
	const { document, changeField } = useEditorFormContext();

	return (
		<header className={clsx(styles.head, className)}>
			<TitleEditor
				className={styles.headTitle}
				controlClassName={styles.headTitleControl}
				value={document?.title}  
				isControlsShow="alwaysShow"

				onChange={(val) => changeField("title", val)}
			/>
		</header>
	);
}