import React, { RefObject } from "react";

import type { BaseComponent } from "@/types/root";

import ResponsiveDropdownMenu from "@/components/menu/ResponsiveDropdownMenu/ResponsiveDropdownMenu";
import { useMenuState } from "@/hooks/menu/useMenuState";
import { DocumentTypeName } from "@/types/document/documentType/documentTypeName";
import { Subsection as SubsectionT } from "@/types/document/section/section";
import { SectionTemplateKey } from "@/types/document/sectionTemplate/sectionTemplateKey";
import { MenuItemData } from "@/types/menu/menu";
import clsx from "clsx";
import { ChevronDown, Ellipsis, Pencil, Trash2 } from "lucide-react";
import styles from "./Subsection.module.scss";

export interface DomainSubsectionProps<
  T extends DocumentTypeName = DocumentTypeName,
  K extends SectionTemplateKey<T> = SectionTemplateKey<T>
> {
  subsection: SubsectionT<T, K>;
  isShowLevel?: boolean;
}

export interface SubsectionProps extends BaseComponent {
  id: string;
  title?: string;
  subtitle?: string; 
  defaultTitle?: string;
  children: React.ReactNode;
  isOpen: boolean;
  dropdownMenuProps: {
    id: string;
    isOpen: boolean;
    triggerRef: RefObject<HTMLButtonElement | null>;
    contentRef: RefObject<HTMLDivElement | null>;
    toggle: () => void;
    close: () => void;
    open: () => void;
    isDrawer: boolean;
  }
  deleteSubsection: () => void;
  handleClickHeader: () => void;
  handleControlClick: (e: React.MouseEvent) => void;
  onClickChange: () => void;
}

export default function Subsection({
  className,
  id,
  title,
  subtitle,
  defaultTitle = "Ничего не указано",
  children,
  isOpen,
  dropdownMenuProps,
  onClickChange,
  deleteSubsection,
  handleClickHeader,
  handleControlClick
}: SubsectionProps) {
  const menuActions = useMenuState();

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
      onClick: deleteSubsection,
    },
  ];

  return (
    <>
      <div className={clsx(styles.subsection, className)} id={id}>
        <header className={styles.head} onClick={handleClickHeader}>
          <div className={styles.titleWrapper}>
            <h3 className={styles.title}>{title || defaultTitle}</h3>

            {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
          </div>

          <div className={styles.controls}>
            <div className={styles.tools}>
              <Ellipsis
                className={styles.control}
                ref={dropdownMenuProps.triggerRef as any}
                type="button"
                onClick={handleControlClick}
              />
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
        isOpen={dropdownMenuProps.isOpen}
        id={dropdownMenuProps.id}

        positioner={{
          triggerRef: dropdownMenuProps.triggerRef,
          contentRef: dropdownMenuProps.contentRef,
          offsetY: 3,
          anchorOrigin: { vertical: "bottom", horizontal: "right" },
          transformOrigin: { vertical: "top", horizontal: "right" },
        }}

        title="Действия"
        onClose={dropdownMenuProps.close}
      />
    </>
  );
}