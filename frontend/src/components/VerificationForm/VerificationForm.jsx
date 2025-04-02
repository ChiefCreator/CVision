import styles from "./VerificationForm.module.scss";

import CodeInput from "../CodeInput/CodeInput";
import ButtonSend from "../ButtonSend/ButtonSend";

export default function VerificationForm({ email, sendStatus, code, setCode, onSubmit }) {

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <header className={styles.formHeader}>
        <h2 className={styles.formTitle}>Верификация email</h2>
        <span className={styles.formDescription}>Пожалуйста введите 6-значный верификационный код, отправленный на <span className={styles.formDescriptionEmail}>{email}</span></span>
      </header>

      <div className={styles.formCodeInputWrapper}>
        <CodeInput code={code} setCode={setCode} />
      </div>

      <ButtonSend className={styles.formButtonSend} status={sendStatus}>Подтвердить</ButtonSend>

      <span className={styles.codeNotReceived}>Не получили код? <span className={styles.codeNotReceivedResend}>Отправить повторно</span></span>
    </form>
  );
}