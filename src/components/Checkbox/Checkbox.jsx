import styles from "./Checkbox.module.scss";

export default function Checkbox({ className, label, field, error }) {
  const { value, onChange } = field ?? { value: false, onChange: null };

  function handleChange() {
    onChange && onChange(!value);
  };

  return (
    <label className={`${styles.checkbox} ${value ? styles.checkboxChecked : ""} ${error ? styles.checkboxError : ""} ${className || ""}`}>
      <div className={styles.checkboxContent}>
        <div className={styles.customCheckbox}>
          {value && <svg className={styles.customCheckboxIcon} xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 511.985 511.985"><path d="M500.088 83.681c-15.841-15.862-41.564-15.852-57.426 0L184.205 342.148 69.332 227.276c-15.862-15.862-41.574-15.862-57.436 0-15.862 15.862-15.862 41.574 0 57.436l143.585 143.585c7.926 7.926 18.319 11.899 28.713 11.899 10.394 0 20.797-3.963 28.723-11.899l287.171-287.181c15.862-15.851 15.862-41.574 0-57.435z"></path></svg>}
        </div>
        
        {label && <label className={styles.checkboxLabel} onClick={handleChange}>{label}</label>}
      </div>

      <input
        className={styles.checkboxInput}
        type="checkbox"
        checked={value}
        onChange={handleChange}
      />
    </label>
  );
}