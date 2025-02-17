import styles from "./FormGroup.module.scss";

export default function FormGroupCell({ gridArea, children }) {
  return (
    <div 
      className={styles.formGroupCell}
      style={{ gridArea }}
    >
      {children}
    </div>
  );
}
