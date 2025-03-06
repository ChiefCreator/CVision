import { Outlet } from "react-router-dom";

import Container from "../../components/Container/Container";
import Sidebar from "./../../components/Sidebar/Sidebar";
import Header from "./../../components/Header/Header";

import styles from "./HomeLayout.module.scss";

export default function HomeLayout() {
  return (
    <div className={styles.layout}>
      <Header />

      <Container>
        <div className={styles.layoutMainContent}>
          <Sidebar />
    
            <div className={styles.layoutContent}>
              <Outlet />
            </div>
        </div>
      </Container>
    </div>
  );
}