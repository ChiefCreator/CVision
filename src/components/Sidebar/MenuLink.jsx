import { NavLink } from "react-router-dom";

import styles from "./Sidebar.module.scss";

export default function MenuLink({ children, icon, href, isAcive }) {

  return (
    <NavLink className={styles.menuLink} to={href}>
      <div className={styles.menuLinkIcon}>{icon}</div>
      <div className={styles.menuLinkContent} data-hide>
        <span className={styles.menuLinkTitle}>{children}</span>
      </div>
    </NavLink>
  );
}