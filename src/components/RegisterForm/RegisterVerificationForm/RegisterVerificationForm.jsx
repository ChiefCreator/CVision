import { useState } from "react";

import { useNavigate } from "react-router-dom";

import styles from "./RegisterVerificationForm.module.scss";

import { useAuth } from "../../../context/AuthContext";
import { useUser } from "../../../context/UserContext";
import { verifyCode, updateUserProfile, setNewUser } from "../../../api/authentication";

import CodeInput from "../../CodeInput/CodeInput";
import ButtonSend from "../../ButtonSend/ButtonSend";

export default function RegisterVerificationForm() {
  const navigate = useNavigate();
  const { userProfileState, dispatchOfUserProfileState } = useAuth();
  const { dispatchOfUserDataState, getUserFromDatabase } = useUser();
  const [code, setCode] = useState(null);
  const [sendStatus, setSendStatus] = useState("idle");

  const { user } = userProfileState;

  async function submit(event) {
    event.preventDefault();

    if (!sendStatus) return;

    setSendStatus("loading");

    setTimeout(async () => {
      const response = await verifyCode(user.email, code);

      if (response.success) {
        const userData = { email: user.email, name: user.name, emailVerified: true, lastLoginAt: new Date() };

        dispatchOfUserProfileState({ type: "SET_USER", user: { ...user, ...userData } });
        dispatchOfUserDataState({ type: "SET_USER", user: userData });
  
        if (!response.success) {
          setSendStatus("error");
        } else {
          setSendStatus("success");

          setTimeout(() => navigate("/"), 1000);
        }
      } else {
        setSendStatus("error");
      }

      setTimeout(() => setSendStatus("idle"), 1000);
    }, 1000)
  }

  return (
    <form className={styles.form} onSubmit={submit}>
      <header className={styles.formHeader}>
        <h2 className={styles.formTitle}>Верификация email</h2>
        <span className={styles.formDescription}>Пожалуйста введите 6-значный верификационный код, отправленный на <span className={styles.formDescriptionEmail}>{user?.email}</span></span>
      </header>

      <div className={styles.formCodeInputWrapper}>
        <CodeInput onChangeCallback={setCode} />
      </div>

      <ButtonSend className={styles.formButtonSend} status={sendStatus}>Подтвердить</ButtonSend>

      <span className={styles.codeNotReceived}>Не получили код? <span className={styles.codeNotReceivedResend}>Отправить повторно</span></span>
    </form>
  );
}