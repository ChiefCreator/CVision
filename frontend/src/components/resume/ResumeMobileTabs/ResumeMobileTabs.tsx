"use client"

import Tabs from "@/components/tabs/Tabs/Tabs"
import ResumeEditorForm from "../ResumeEditorForm/ResumeEditorForm"
import ResumePreview from "../ResumePreview/ResumePreview"

import { BaseComponent } from "@/types/root"

import BurgerMenu from "@/components/button/BurgerMenu/BurgerMenu"
import Sidebar from "@/components/menu/Sidebar/Sidebar"
import { useAbsoluteSidebarContext } from "@/hooks/menu/useAbsoluteSidebarContext"
import clsx from "clsx"
import styles from "./ResumeMobileTabs.module.scss"

export default function ResumeMobileTabs({ className }: BaseComponent) {
	const { isOpen, triggerRef, contentRef, toggle } = useAbsoluteSidebarContext();

	return (
		<>
			<Tabs
				className={clsx(styles.tabs, className)}
				variant="primary"
				defaultValue="editor"
			>
				<div className={styles.listWrapper}>
					<Tabs.List className={styles.list}>
						<Tabs.Trigger className={styles.trigger} value="editor">
							Изменить
						</Tabs.Trigger>

						<Tabs.Trigger className={styles.trigger} value="preview">
							Предварительный просмотр
						</Tabs.Trigger>
					</Tabs.List>

					<BurgerMenu
						className={styles.burgerMenu}
						isOpen={isOpen}
						ref={triggerRef}
						toggle={toggle}
					/>
				</div>

				<div className={styles.contentWrapper}>
					<Tabs.Content className={styles.content} value="editor">
						<ResumeEditorForm />
					</Tabs.Content>

					<Tabs.Content className={styles.content} value="preview">
						<ResumePreview />
					</Tabs.Content>
				</div>
			</Tabs>

			<Sidebar
				type="absolute"
				popoverClassName={styles.sidebarPopover}
				positioner={{
					triggerRef,
					contentRef,
					offsetY: 3,
					anchorOrigin: { horizontal: "right", vertical: "bottom" },
					transformOrigin: { horizontal: "right", vertical: "top" },
					isFixed: true,
				}}
			/>
		</>
	)
}
