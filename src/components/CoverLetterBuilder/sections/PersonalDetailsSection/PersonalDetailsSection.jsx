import { useEffect } from "react";

import styles from "./PersonalDetailsSection.module.scss";

import FormGroup from "../../../FormGroup/FormGroup";
import FormGroupCell from "../../../FormGroup/FormGroupCell";
import FormField from "../../../FormField/FormField";

export default function PersonalDetailsSection({ data, changeField }) {
  const sectionId = "personalDetails";

  // обработчики

  return (
    <div className={styles.section}>
      <header className={styles.sectionHeader}>
        <h4 className={styles.sectionTitle}>Личные данные</h4>
      </header>
      <div className={styles.sectionBody}>
        <div className={styles.sectionFormGroups}>
          <FormGroup gridTemplateColumns="1fr 1fr">
            <FormGroupCell>
              <FormField label="Полное имя" inputValue={data?.fullName} inputPlaceholder="Введите полное имя" onChangeInputCallback={(value) => changeField(sectionId, "fullName", value)} />
            </FormGroupCell>
            <FormGroupCell>
              <FormField label="Профессия" inputValue={data?.job} onChangeInputCallback={(value) => changeField(sectionId, "job", value)} inputPlaceholder="Введите профессию" />
            </FormGroupCell>
            <FormGroupCell>
              <FormField label="Адрес" inputValue={data?.adress} onChangeInputCallback={(value) => changeField(sectionId, "adress", value)} inputPlaceholder="Введите адрес" />
            </FormGroupCell>
            <FormGroupCell>
              <FormField label="Электронная почта" inputValue={data?.email} onChangeInputCallback={(value) => changeField(sectionId, "email", value)} inputPlaceholder="Введите эл. почту" />
            </FormGroupCell>
            <FormGroupCell>
              <FormField label="Номер телефона" inputValue={data?.phoneNumber} onChangeInputCallback={(value) => changeField(sectionId, "phoneNumber", value)} inputPlaceholder="Введите телефон" />
            </FormGroupCell>
          </FormGroup>
        </div>
      </div>
    </div>
  );
}
