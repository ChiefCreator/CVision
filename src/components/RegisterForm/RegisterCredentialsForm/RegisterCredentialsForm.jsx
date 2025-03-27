import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useState } from "react";

import { Link } from "react-router-dom";

import styles from "./RegisterCredentialsForm.module.scss";
import validationSchema from "./validationSchema";

import { useAuth } from "../../../context/AuthContext";
import { registerUser, sendVerificationCode } from "../../../api/authentication";

import FormGroup from "../../FormGroup/FormGroup";
import FormGroupCell from "../../FormGroup/FormGroupCell";
import FormField from "../../FormField/FormField";
import AuthInput from "../../AuthInput/AuthInput";
import Checkbox from "../../Checkbox/Checkbox";
import ButtonSend from "../../ButtonSend/ButtonSend";

export default function RegisterCredentialsForm({ onSubmitCallback }) {
  const { register, control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      terms: false,
      newsletter: false,
    },
    resolver: yupResolver(validationSchema),
  });
  const [sendStatus, setSendStatus] = useState("idle");
  const { dispatchOfUserProfileState } = useAuth();

  async function submit(data) {
    if (!sendStatus) return;
    
    const { email, password, name, terms, newsletter } = data;

    setSendStatus("loading");

    setTimeout(async () => {
      const registerUseResponse = await registerUser(email, password, name);

      setSendStatus(registerUseResponse.status);

      if (registerUseResponse.status === "success") {
        dispatchOfUserProfileState({ type: "SET_USER", user: { email, name, emailVerified: false, createdAt: new Date() } });
        const sendVerificationCodeResponse = await sendVerificationCode(email);

        if (sendVerificationCodeResponse.status === "success") {
          setTimeout(() => {
            onSubmitCallback && onSubmitCallback();
            setSendStatus("idle");
          }, 1000);
        }
      } else {
        setTimeout(() => {
          setSendStatus("idle");
        }, 1000);
      }
    }, 1000);
  }

  return (
    <form className={`${styles.form}`} onSubmit={handleSubmit(submit)}>
      <header className={styles.formHeader}>
        <h2 className={styles.formTitle}>Создать аккаунт</h2>
        <span className={styles.formSubTitle}>Уже есть аккаунт? Войдите, чтобы продолжить! <Link className={styles.formSignIn} to="/auth/login">Войти</Link>.</span>
      </header>

      <div className={styles.formGroup}>
        <FormGroup gridTemplateColumns="1fr">
          <FormGroupCell>
            <FormField 
              className={styles.formField}
              label="Ваше имя"
              error={errors?.name}
              Component={() => <AuthInput type="text" id="name" placeholder="Введите имя" error={errors?.name} {...register("name")} />}
            />
          </FormGroupCell>
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

      <div className={styles.alternativeMethods}>
        <header className={styles.alternativeMethodsHead}>
          <div className={styles.alternativeMethodsLine}></div>
          <span className={styles.alternativeMethodsOr}>Или</span>
          <div className={styles.alternativeMethodsLine}></div>
        </header>

        <a className={styles.alternativeMethod}>
          <svg className={styles.alternativeMethodIcon} viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_13183_10121)"><path d="M20.3081 10.2303C20.3081 9.55056 20.253 8.86711 20.1354 8.19836H10.7031V12.0492H16.1046C15.8804 13.2911 15.1602 14.3898 14.1057 15.0879V17.5866H17.3282C19.2205 15.8449 20.3081 13.2728 20.3081 10.2303Z" fill="#3F83F8"></path><path d="M10.7019 20.0006C13.3989 20.0006 15.6734 19.1151 17.3306 17.5865L14.1081 15.0879C13.2115 15.6979 12.0541 16.0433 10.7056 16.0433C8.09669 16.0433 5.88468 14.2832 5.091 11.9169H1.76562V14.4927C3.46322 17.8695 6.92087 20.0006 10.7019 20.0006V20.0006Z" fill="#34A853"></path><path d="M5.08857 11.9169C4.66969 10.6749 4.66969 9.33008 5.08857 8.08811V5.51233H1.76688C0.348541 8.33798 0.348541 11.667 1.76688 14.4927L5.08857 11.9169V11.9169Z" fill="#FBBC04"></path><path d="M10.7019 3.95805C12.1276 3.936 13.5055 4.47247 14.538 5.45722L17.393 2.60218C15.5852 0.904587 13.1858 -0.0287217 10.7019 0.000673888C6.92087 0.000673888 3.46322 2.13185 1.76562 5.51234L5.08732 8.08813C5.87733 5.71811 8.09302 3.95805 10.7019 3.95805V3.95805Z" fill="#EA4335"></path></g><defs><clipPath id="clip0_13183_10121"><rect width="20" height="20" fill="white" transform="translate(0.5)"></rect></clipPath></defs></svg>                            
          Зарегистрироваться с помощью Google
        </a>
      </div>

      <div className={styles.formCheckboxes}>
        <Controller
          name="terms"
          control={control}
          rules={{ required: true }}
          render={({ field }) => 
            <Checkbox
              label={<span>Регистрируясь, вы создаете учетную запись CVision и соглашаетесь с <span>Условиями использования</span> и <span>Политикой конфиденциальности</span> CVision.</span>}
              field={field}
              error={errors?.terms}
            />}
        />

        <Controller
          name="newsletter"
          control={control}
          rules={{ required: true }}
          render={({ field }) => 
            <Checkbox
              label="Сообщайте мне по электронной почте об обновлениях продукта и ресурсах."
              field={field}
              error={errors?.newsletter}
            />}
        />
      </div>

      <ButtonSend className={styles.formSend} status={sendStatus}>Создать аккаунт</ButtonSend>
    </form>
  );
}
