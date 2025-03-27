import { useState } from "react";

import styles from "./RegisterForm.module.scss";

import RegisterCredentialsForm from "./RegisterCredentialsForm/RegisterCredentialsForm";
import RegisterVerificationForm from "./RegisterVerificationForm/RegisterVerificationForm";

export default function RegisterForm({ className }) {
  const [step, setStep] = useState(1);

  return (
    <div className={`${styles.registerForm} ${className || ""}`}>
      {step === 1 && <RegisterCredentialsForm onSubmitCallback={() => setStep(2)} />}

      {step === 2 && <RegisterVerificationForm />}
    </div>
  );
}