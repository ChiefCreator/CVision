import React, { useEffect, useRef, useState } from "react";

import type { BaseComponent } from "@/types/root";

import styles from "./Subsection.module.scss";
import clsx from "clsx";
import { ChevronDown, Ellipsis, Pencil, Trash2 } from "lucide-react";
import DropdownMenu, { DropdownMenuItemType } from "@/components/menu/DropdownMenu/DropdownMenu";
import { useDeleteSubsection } from "@/api/resumeSubsection/hooks";
import { useResumeId } from "@/hooks/resume/useResumeId";
import { ResumeListSectionName } from "@/types/resumeSection/sectionName";
import { useResume } from "@/hooks/resume/useResume";

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { changeIsAllUpdating } = useResume();

  const dropdownMenuRef = useRef<HTMLDivElement>(null);
  const dropdownMenuButtonRef = useRef<SVGSVGElement>(null);

  const { mutateAsync } = useDeleteSubsection(resumeId, sectionId, sectionName, subsectionName);

  const toggleDropdown = (isOpen?: boolean) => {
    if (isOpen !== undefined) {
      setIsDropdownOpen(isOpen);
      return;
    }

    setIsDropdownOpen(prev => !prev);
  };
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

  const dropdownMenuItems: DropdownMenuItemType[] = [
    {
      id: "1",
      label: "Изменить",
      Icon: Pencil,
      onClick: onClickChange,
    },
    {
      id: "2",
      label: "Удалить",
      Icon: Trash2,
      onClick: () => deleteSubsection(id),
    },
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (!dropdownMenuRef.current?.contains(target) && !dropdownMenuButtonRef.current?.contains(target)) {
        toggleDropdown(false);
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
            <Ellipsis className={styles.control} ref={dropdownMenuButtonRef} type="button" onClick={() => toggleDropdown()} />
          </div>

          <ChevronDown className={clsx(styles.control, { [styles.arrowOpen]: isOpen })} />
        </div>

        {isDropdownOpen && <DropdownMenu
          ref={dropdownMenuRef}
          items={dropdownMenuItems}
          positionProps={{ triggerRef: dropdownMenuButtonRef }}

          onClose={() => toggleDropdown(false)}
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