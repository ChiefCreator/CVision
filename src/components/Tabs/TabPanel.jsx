import styles from "./Tabs.module.scss";

export default function TabPanel({ children }) {
  return (
    <div className={styles.tabPanel}>
      {children}
    </div>
  );
}