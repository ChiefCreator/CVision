import Container from "@/components/utils/Container/Container";
import Header from "./components/Header/Header";

import "react-loading-skeleton/dist/skeleton.css";
import "@/assets/styles/_vars.scss";
import "@/assets/styles/_utils.scss";
import "@/assets/styles/_reset.scss";
import "@/assets/styles/_base.scss";

import styles from "./layout.module.scss";

export default function HomeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={styles.layout}>
      <Container className={styles.container}>
        <aside className={styles.sidebar}>sidebar</aside>
    
        <div className={styles.content}>
          <Header className={styles.header} />

          <div className={styles.page}>{children}</div>
        </div>
      </Container>
    </div>
  );
}
