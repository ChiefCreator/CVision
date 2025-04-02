import styles from "./LogIn.module.scss";

import Container from "../../components/Container/Container";
import Logo from "../../components/Logo/Logo";
import LogInForm from "../../components/LogInForm/LogInForm";

export default function LogIn() {
  return (
    <div className={styles.logIn}>
      <Container>
        <div className={styles.logInContainer}>
          <div className={styles.logInFormWrapper}>
            <Logo className={styles.logInLogo} />
            <LogInForm className={styles.logInForm} />
          </div>
          <div className={styles.logInDescriptionBlock}>
            <h2 className={styles.logInTitle}>С возвращением! Ваше идеальное резюме ждет вас</h2>
            <p className={styles.logInDescription}>Продолжите работу над своим резюме и сопроводительным письмом. Настройте дизайн, добавьте опыт работы и получайте советы от наших экспертов. Давайте вместе сделаем вашу карьеру успешной!</p>
          </div>
        </div>
      </Container>
    </div>
  );
}