import styles from "./Register.module.scss";

import Container from "../../components/Container/Container";
import Logo from "../../components/Logo/Logo";
import RegisterForm from "../../components/RegisterForm/RegisterForm";

export default function Register() {
  return (
    <div className={styles.register}>
      <Container>
        <div className={styles.registerContainer}>
          <div className={styles.registerFormWrapper}>
            <Logo className={styles.registerLogo} />
            <RegisterForm className={styles.registerForm} />
          </div>
          <div className={styles.registerDescriptionBlock}>
            <h2 className={styles.registerTitle}>Добро пожаловать в CVision – создайте резюме мечты!</h2>
            <p className={styles.registerDescription}>Присоединяйтесь к CVision и начните создавать профессиональные резюме и сопроводительные письма за считанные минуты. Интуитивный конструктор, готовые шаблоны и экспертные рекомендации помогут вам выделиться среди кандидатов.</p>
          </div>
        </div>
      </Container>
    </div>
  );
}