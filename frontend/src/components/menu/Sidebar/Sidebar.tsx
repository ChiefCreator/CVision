"use client"

import AnimateHeightPresence from "@/components/utils/AnimatePresence/components/AnimateHeightPresence";
import { Files, LayoutDashboard } from "lucide-react";

import type { MenuItemData } from "@/types/menu/menu";
import type { BaseComponent } from "@/types/root";

import Logo from "@/components/Logo/Logo";
import { ArrowNavigationProvider } from "@/hooks/root/useArrowNavigation";
import clsx from "clsx";
import { useRef } from "react";
import { useSidebar } from "../../../hooks/menu/useSidebar";
import ButtonToggle from "./ButtonToggle/ButtonToggle";
import styles from "./Sidebar.module.scss";
import SidebarMenu from "./SidebarMenu/SidebarMenu";

interface SidebarProps extends BaseComponent {};

const menuData: MenuItemData = [
  {
    id: "dashboard",
    type: "link",
    pathname: "/dashboard",
    isIndexPathname: true,
    title: "Дашборд",
    Icon: LayoutDashboard,
  },
  {
    id: "documents",
    type: "button",
    title: "Документы",
    Icon: Files,
    children: [
      {
        id: "resumes",
        type: "link",
        pathname: "/resumes",
        title: "Резюме",
      },
      {
        id: "coverLetters",
        type: "link",
        pathname: "/cover-letters",
        title: "Сопроводительные письма",
      },
    ],
  },
]

export default function Sidebar({ className }: SidebarProps) {
  const { isOpen, toggle, stopAnimating } = useSidebar();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleTransitionEnd = () => {
    clearTimeout(timeoutRef.current ?? undefined);
    timeoutRef.current = setTimeout(() => stopAnimating(), 1000);
  }

  return (
    <aside className={clsx(styles.sidebar, isOpen && styles.sidebarOpen, className)} onTransitionEnd={handleTransitionEnd}>
      <div className={styles.sidebarContainer}>
        <div className={styles.sidebarContent}>
          <header className={styles.head}>
            <AnimateHeightPresence isVisible={isOpen} className={styles.logoWrapper}>
              <Logo className={styles.logo} href="/" />
            </AnimateHeightPresence>

            <ButtonToggle className={styles.toggle} isOpen={isOpen} onToggle={toggle} />
          </header>

          <nav className={styles.nav}>
            <div className={styles.navBlock}>
              <AnimateHeightPresence isVisible={isOpen}>
                <label className={styles.navBlockLabel}>Основное</label>
              </AnimateHeightPresence>
              
              <ArrowNavigationProvider>
                <SidebarMenu data={menuData} /> 
              </ArrowNavigationProvider>
            </div>  
          </nav>
        </div>
      </div>
    </aside>
  );
}