import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import styles from "./LogInForm.module.scss";
import validationSchema from "./validationSchema";

import { useAuth } from "../../context/AuthContext";

import Link from "../Link/Link";
import FormGroup from "../FormGroup/FormGroup";
import FormGroupCell from "../FormGroup/FormGroupCell";
import FormField from "../FormField/FormField";
import AuthInput from "../AuthInput/AuthInput";
import ButtonSend from "../ButtonSend/ButtonSend";

export default function LogInForm() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(validationSchema),
  });
  const { login, loginWithGoogle } = useAuth();
  const [sendStatus, setSendStatus] = useState("idle");

  async function submit(data) {
    if (!sendStatus) return;
    
    const { email, password } = data;

    setSendStatus("loading");

    setTimeout(async () => {
      try {
        await login(email, password);

        setSendStatus("success");

        setTimeout(() => {
          setSendStatus("idle");
          navigate("/");
        }, 1000);
      } catch (error) {
        console.error(error);
        
        setSendStatus("error");
        setTimeout(() => setSendStatus("idle"), 1000);
      }
    }, 1000);
  }
  async function handleRegisterWithGoogle() {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form className={`${styles.form}`} onSubmit={handleSubmit(submit)}>
      <header className={styles.formHeader}>
        <h2 className={styles.formTitle}>Войти в аккаунт</h2>
        <span className={styles.formSubTitle}>Еще нет аккаунта? Создайте его прямо сейчас и откройте для себя все возможности! <Link className={styles.formSignUp} to="/auth/register">Зарегистрироваться</Link>.</span>
      </header>

    <div className={styles.formGroup}>
      <FormGroup gridTemplateColumns="1fr">
        <FormGroupCell>
          <FormField 
            className={styles.formField}
            label="Email-адрес"
            error={errors?.email}
            Component={() => <AuthInput type="email" id="email" placeholder="Введите email" error={errors?.email} {...register("email")} />}
          />
        </FormGroupCell>
        <FormGroupCell>
          <FormField 
            className={styles.formField}
            label="Пароль"
            error={errors?.password}
            Component={() => 
              <AuthInput
                type="password"
                id="password"
                placeholder="Введите пароль"
                isPassword={true}
                error={errors?.password}
                {...register("password")}
              />
            }
          />
        </FormGroupCell>
      </FormGroup>
    </div>

    <ButtonSend className={styles.formSend} status={sendStatus}>Войти в аккаунт</ButtonSend>

    <div className={styles.alternativeMethods}>
      <header className={styles.alternativeMethodsHead}>
        <div className={styles.alternativeMethodsLine}></div>
        <span className={styles.alternativeMethodsOr}>Или</span>
        <div className={styles.alternativeMethodsLine}></div>
      </header>

      <button className={styles.alternativeMethod} type="button" onClick={handleRegisterWithGoogle}>
        <svg className={styles.alternativeMethodIcon} viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_13183_10121)"><path d="M20.3081 10.2303C20.3081 9.55056 20.253 8.86711 20.1354 8.19836H10.7031V12.0492H16.1046C15.8804 13.2911 15.1602 14.3898 14.1057 15.0879V17.5866H17.3282C19.2205 15.8449 20.3081 13.2728 20.3081 10.2303Z" fill="#3F83F8"></path><path d="M10.7019 20.0006C13.3989 20.0006 15.6734 19.1151 17.3306 17.5865L14.1081 15.0879C13.2115 15.6979 12.0541 16.0433 10.7056 16.0433C8.09669 16.0433 5.88468 14.2832 5.091 11.9169H1.76562V14.4927C3.46322 17.8695 6.92087 20.0006 10.7019 20.0006V20.0006Z" fill="#34A853"></path><path d="M5.08857 11.9169C4.66969 10.6749 4.66969 9.33008 5.08857 8.08811V5.51233H1.76688C0.348541 8.33798 0.348541 11.667 1.76688 14.4927L5.08857 11.9169V11.9169Z" fill="#FBBC04"></path><path d="M10.7019 3.95805C12.1276 3.936 13.5055 4.47247 14.538 5.45722L17.393 2.60218C15.5852 0.904587 13.1858 -0.0287217 10.7019 0.000673888C6.92087 0.000673888 3.46322 2.13185 1.76562 5.51234L5.08732 8.08813C5.87733 5.71811 8.09302 3.95805 10.7019 3.95805V3.95805Z" fill="#EA4335"></path></g><defs><clipPath id="clip0_13183_10121"><rect width="20" height="20" fill="white" transform="translate(0.5)"></rect></clipPath></defs></svg>                            
        Войти с помощью Google
      </button>
    </div>
  </form>
  );
}