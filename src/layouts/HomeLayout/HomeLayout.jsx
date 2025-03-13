import { Outlet } from "react-router-dom";

import { useHeaderContext } from "../../context/HeaderContext";
import Container from "../../components/Container/Container";
import Sidebar from "./../../components/Sidebar/Sidebar";
import Header from "./../../components/Header/Header";

import styles from "./HomeLayout.module.scss";

export default function HomeLayout() {
  const { headerState } = useHeaderContext();

  return (
    <div className={styles.layout}>
      <Header />

      <Container>
        <div className={styles.layoutMainContent}>
          <Sidebar defaultActiveItemId="item-1" isHeaderRendered={headerState.isRendered} />
    
            <div className={styles.layoutContent}>
              <Outlet />
            </div>
        </div>
      </Container>
    </div>
  );
}