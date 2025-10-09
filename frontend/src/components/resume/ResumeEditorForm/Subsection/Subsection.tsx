import React from "react";

import type { BaseComponent } from "@/types/root";

import { useDeleteSubsection } from "@/api/resumeSubsection/hooks";
import ResponsiveDropdownMenu from "@/components/menu/ResponsiveDropdownMenu/ResponsiveDropdownMenu";
import { useMenuState } from "@/hooks/menu/useMenuState";
import { useAdaptivePopover } from "@/hooks/position/useAdaptivePopover";
import { useResume } from "@/hooks/resume/useResume";
import { useResumeId } from "@/hooks/resume/useResumeId";
import { MenuItemData } from "@/types/menu/menu";
import { ResumeListSectionName } from "@/types/resumeSection/sectionName";
import clsx from "clsx";
import { ChevronDown, Ellipsis, Pencil, Trash2 } from "lucide-react";
import styles from "./Subsection.module.scss";

export interface SubsectionProps extends BaseComponent {
  id: string;
  sectionId: string;
  sectionName: ResumeListSectionName;
  subsectionName: string;
  title?: string;
  subtitle?: string; 
  defaultTitle?: string;
  children: React.ReactNode;

  checkIsOpen: (sectionId: string, subsectionId: string) => boolean;
  onToggle: (sectionId: string, subsectionId: string, open?: boolean) => void;
  onClickChange: () => void;
}

export default function Subsection({ className, id, subsectionName, sectionId, sectionName, title, subtitle, defaultTitle = "Ничего не указано", children, checkIsOpen, onToggle, onClickChange }: SubsectionProps) {
  const isOpen = checkIsOpen(sectionId, id);
  const resumeId = useResumeId();
  const { changeIsAllUpdating } = useResume();
  const {
    isOpen: isDropdownOpen,
    triggerRef: dropdownMenuButtonRef,
    contentRef: dropdownMenuRef,
    id: dropdownMenuId,
    toggle,
    close
  } = useAdaptivePopover();
  const menuActions = useMenuState();

  const { mutateAsync } = useDeleteSubsection(resumeId, sectionId, sectionName, subsectionName);

  const deleteSubsection = async (id: string) => {
    changeIsAllUpdating(true);
    await mutateAsync(id);

    changeIsAllUpdating(false);
  }

  const handleClick = () => {
    onToggle(sectionId, id);
  }

  const handleControlClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    toggle();
  }

  const dropdownMenuItems: MenuItemData = [
    {
      type: "control",
      id: "1",
      title: "Изменить",
      Icon: Pencil,
      onClick: onClickChange,
    },
    {
      type: "control",
      id: "2",
      title: "Удалить",
      Icon: Trash2,
      onClick: () => deleteSubsection(id),
    },
  ];

  return (
    <>
      <div className={clsx(styles.subsection, className)} id={id}>
        <header className={styles.head} onClick={handleClick}>
          <div className={styles.titleWrapper}>
            <h3 className={styles.title}>{title || defaultTitle}</h3>

            {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
          </div>

          <div className={styles.controls}>
            <div className={styles.tools}>
              <Ellipsis className={styles.control} ref={dropdownMenuButtonRef as any} type="button" onClick={handleControlClick} />
            </div>

            <ChevronDown className={clsx(styles.control, { [styles.arrowOpen]: isOpen })} />
          </div>
        </header>

        <div className={clsx(styles.body, { [styles.bodyOpen]: isOpen })}>
          <div className={styles.bodyContainer}>
            <div className={styles.bodyContent}>
              {children}
            </div>
          </div>
        </div>
      </div>

      <ResponsiveDropdownMenu
        data={dropdownMenuItems}
        {...menuActions}

        className={styles.dropdownMenu}
        isOpen={isDropdownOpen}
        id={dropdownMenuId}

        positioner={{
          triggerRef: dropdownMenuButtonRef,
          contentRef: dropdownMenuRef,
          offsetY: 3,
          anchorOrigin: { vertical: "bottom", horizontal: "right" },
          transformOrigin: { vertical: "top", horizontal: "right" },
        }}

        title="Действия"
        onClose={close}
      />
    </>
  );
}