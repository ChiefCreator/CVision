import Container from "@/components/utils/Container/Container";
import Header from "./components/Header/Header";

import "@/assets/styles/_base.scss";
import "@/assets/styles/_reset.scss";
import "@/assets/styles/_utils.scss";
import "@/assets/styles/_vars.scss";
import "react-loading-skeleton/dist/skeleton.css";

import Sidebar from "@/components/menu/Sidebar/Sidebar";
import { SidebarProvider } from "@/hooks/menu/useSidebar";
import styles from "./layout.module.scss";

export default function HomeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider performance="static">
      <div className={styles.layout}>
        <Container className={styles.container}>
          <Sidebar className={styles.sidebar} />
      
          <div className={styles.content}>
            <Header className={styles.header} />
  
            <div className={styles.page}>{children}</div>
          </div>
        </Container>
      </div>
    </SidebarProvider>
  );
}
