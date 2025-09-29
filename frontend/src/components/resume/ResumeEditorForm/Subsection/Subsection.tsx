import React, { useEffect } from "react";

import type { BaseComponent } from "@/types/root";

import { useDeleteSubsection } from "@/api/resumeSubsection/hooks";
import DropdownMenu from "@/components/menu/PopoverMenu/PopoverMenu";
import { usePopover } from "@/hooks/position/usePopover";
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
  const { isOpen: isDropdownOpen, triggerRef: dropdownMenuButtonRef, contentRef: dropdownMenuRef, id: dropdownMenuId, toggle, close } = usePopover();

  const { mutateAsync } = useDeleteSubsection(resumeId, sectionId, sectionName, subsectionName);

  const deleteSubsection = async (id: string) => {
    changeIsAllUpdating(true);
    await mutateAsync(id);

    changeIsAllUpdating(false);
  }

  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    if (target.closest(`.${styles.tools}`) || dropdownMenuRef.current?.contains(target)) return;

    onToggle(sectionId, id);
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

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (!dropdownMenuRef.current?.contains(target) && !dropdownMenuButtonRef.current?.contains(target)) {
        close();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className={clsx(styles.subsection, className)} id={id}>
      <header className={styles.head} onClick={handleClick}>
        <div className={styles.titleWrapper}>
          <h3 className={styles.title}>{title || defaultTitle}</h3>

          {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
        </div>

        <div className={styles.controls}>
          <div className={styles.tools}>
            <Ellipsis className={styles.control} ref={dropdownMenuButtonRef as any} type="button" onClick={() => toggle()} />
          </div>

          <ChevronDown className={clsx(styles.control, { [styles.arrowOpen]: isOpen })} />
        </div>

        {isDropdownOpen && <DropdownMenu
          id={dropdownMenuId}
          data={dropdownMenuItems}
          positioner={{ triggerRef: dropdownMenuButtonRef, contentRef: dropdownMenuRef }}
        />}
      </header>

      <div className={clsx(styles.body, { [styles.bodyOpen]: isOpen })}>
        <div className={styles.bodyContainer}>
          <div className={styles.bodyContent}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}