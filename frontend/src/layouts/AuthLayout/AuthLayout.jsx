import { Outlet } from "react-router-dom";

import styles from "./AuthLayout.module.scss";

export default function AuthLayout() {

  return (
    <div className={styles.layout}>
      <Outlet />
    </div>
  );
}