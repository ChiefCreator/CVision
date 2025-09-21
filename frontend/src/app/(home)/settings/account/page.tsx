"use client"

import ScrollSpyMenu from "@/components/menu/ScrollSpyMenu/ScrollSpyMenu";
import { sectionComponentsMap } from "@/constants/menu/scrollSpyMenuSectionComponentsMap";
import { sections } from "@/constants/menu/scrollSpyMenuSections";
import { useScrollSpyMenu } from "@/hooks/menu/useScrollSpyMenu";
import { SectionId } from "@/types/menu/scrollSpyMenu";
import styles from "./page.module.scss";

export default function AccountPage() {
	const { activeId, handleClick } = useScrollSpyMenu(sections);

	const getSection = (id: SectionId, label: string) => {
		return sectionComponentsMap[id]?.({ id, label });
	}

	return (
		<div className={styles.page}>
			<div className={styles.container}>
				<div className={styles.content}>
					<h1 className={styles.title}>Настройки аккаунта</h1>

					<ul className={styles.sectionsList}>
						{sections.map(({ id, label }) => <li key={id}>{getSection(id, label)}</li>)}
					</ul>
				</div>

				<aside className={styles.aside}>
					<ScrollSpyMenu className={styles.menu} sections={sections} activeId={activeId} onItemClick={handleClick} />
				</aside>
			</div>
		</div>
	)
}
