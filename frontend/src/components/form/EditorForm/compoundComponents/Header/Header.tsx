import TitleEditor from "@/components/input/TitleEditor/TitleEditor";

import { useDocumentTitle } from "@/api/document/hooks/useGetDocument";
import { useDocument } from "@/components/document/DocumentEditor/hooks/useDocument";
import { useDocumentEditorContext } from "@/components/document/DocumentEditor/hooks/useDocumentEditorContext";
import { BaseComponent } from "@/types/root";
import React from "react";

import clsx from "clsx";
import styles from "./Header.module.scss";

interface HeaderProps extends BaseComponent {
}

export default React.memo(function Header({ className }: HeaderProps) {
	const { id } = useDocumentEditorContext();
	const { getHandler } = useDocument(id);
	const title = useDocumentTitle(id);

	return (
		<header className={clsx(styles.head, className)}>
			<TitleEditor
				className={styles.headTitle}
				controlClassName={styles.headTitleControl}
				value={title}  
				isControlsShow="alwaysShow"

				onChange={getHandler("title")}
			/>
		</header>
	);
})