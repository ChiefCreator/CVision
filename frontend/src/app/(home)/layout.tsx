"use client"

import { AbsoluteSidebarProvider } from "@/hooks/menu/useAbsoluteSidebarContext";
import { StaticSidebarProvider } from "@/hooks/menu/useStaticSidebarContext";
import { useMediaQuery } from "react-responsive";

import Sidebar from "@/components/menu/Sidebar/Sidebar";
import Container from "@/components/utils/Container/Container";
import Header from "../../components/header/Header/Header";

import { breakpoints } from "@/constants/breakpoints/breakpoints";
import { maxWidth } from "@/utils/media/maxWidth";

import "@/assets/styles/_base.scss";
import "@/assets/styles/_reset.scss";
import "@/assets/styles/_utils.scss";
import "@/assets/styles/_vars.scss";
import "react-loading-skeleton/dist/skeleton.css";

import styles from "./layout.module.scss";

export default function HomeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const isMobile = useMediaQuery(maxWidth(breakpoints.tabletL));

  return (
    <StaticSidebarProvider>
      <AbsoluteSidebarProvider>
        <div className={styles.layout}>
          <Container className={styles.container}>
            <Sidebar
              type={isMobile ? "absolute" : "static"}
              className={styles.sidebar}
              positioner={{
			        	offsetY: 3,
			        	anchorOrigin: { horizontal: "right", vertical: "bottom" },
			        	transformOrigin: { horizontal: "right", vertical: "top" },
                isFixed: true,
			        }}
            />

            <div className={styles.content}>
              <Header className={styles.header} />
    
              <div className={styles.page}>{children}</div>
            </div>
          </Container>
        </div>
      </AbsoluteSidebarProvider>
    </StaticSidebarProvider>
  );
}
