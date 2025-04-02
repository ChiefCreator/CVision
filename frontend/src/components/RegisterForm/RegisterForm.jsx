import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./RegisterForm.module.scss";

import RegisterCredentialsForm from "./RegisterCredentialsForm/RegisterCredentialsForm";
import VerificationForm from "../VerificationForm/VerificationForm";

import { useAuth } from "../../context/AuthContext";
import { useUser } from "./../../context/UserContext";

export default function RegisterForm({ className }) {
  const [step, setStep] = useState(1);
  const { userData } = useUser();

  const navigate = useNavigate();
  const { verifyUser } = useAuth();
  const [code, setCode] = useState(null);
  const [sendStatus, setSendStatus] = useState("idle");

  async function submitVerificationForm(event) {
    event.preventDefault();
    if (!sendStatus) return;

    setSendStatus("loading");

    setTimeout(async () => {
      const response = await verifyUser(userData?.email, code.join(""));

      if (!response.success) {
        setSendStatus("error");
        setTimeout(() => setSendStatus("idle"), 1000);
        return;
      }

      setSendStatus("success");
        
      setTimeout(() => {
        setSendStatus("idle");
        navigate("/");
      }, 1000)
    }, 1000)
  }

  return (
    <div className={`${styles.registerForm} ${className || ""}`}>
      {step === 1 && <RegisterCredentialsForm onSubmitCallback={() => setStep(2)} />}

      {step === 2 && <VerificationForm email={userData?.email} onSubmit={submitVerificationForm} sendStatus={sendStatus} code={code} setCode={setCode} />}
    </div>
  );
}