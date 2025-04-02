import { Link as RouterLink } from "react-router-dom";

import styles from "./Link.module.scss";

export default function Link({ to, children, className }) {
  return (
    <RouterLink className={`${styles.link} ${className}`} to={to}>{children}</RouterLink>
  );
}