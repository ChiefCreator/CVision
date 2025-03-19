import styles from "./EmployerDetailsSection.module.scss";

import FormGroup from "../../../FormGroup/FormGroup";
import FormGroupCell from "../../../FormGroup/FormGroupCell";
import FormField from "../../../FormField/FormField";

export default function EmployerDetailsSection({ data, changeField }) {
  const sectionId = "employerDetails";

  return (
    <div className={styles.section}>
      <header className={styles.sectionHeader}>
        <h4 className={styles.sectionTitle}>Данные работодателя</h4>
      </header>
      <div className={styles.sectionBody}>
        <div className={styles.sectionFormGroups}>
          <FormGroup gridTemplateColumns="1fr 1fr">
            <FormGroupCell>
              <FormField label="Название компании" inputValue={data?.companyName} inputPlaceholder="Введите название компании" onChangeInputCallback={(value) => changeField(sectionId, "companyName", value)} />
            </FormGroupCell>
            <FormGroupCell>
              <FormField label="Имя менеджера по найму" inputValue={data?.hiringManagerName} onChangeInputCallback={(value) => changeField(sectionId, "hiringManagerName", value)} inputPlaceholder="Введите имя" />
            </FormGroupCell>
          </FormGroup>
        </div>
      </div>
    </div>
  );
}
