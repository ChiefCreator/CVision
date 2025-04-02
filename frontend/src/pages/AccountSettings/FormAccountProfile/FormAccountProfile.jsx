import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAuth } from "../../../context/AuthContext";
import { useUser } from "../../../context/UserContext";

import validationSchema from "./validationSchema";
import styles from "./FormAccountProfile.module.scss";

import FormGroup from "../../../components/FormGroup/FormGroup";
import FormGroupCell from "../../../components/FormGroup/FormGroupCell";
import FormField from "../../../components/FormField/FormField";
import Input from "../../../components/Input/Input";
import ButtonSend from "../../../components/ButtonSend/ButtonSend";
import VerificationForm from "../../../components/VerificationForm/VerificationForm";
import Popup from "../../../components/Popup/Popup";

export default function FormAccountProfile() {
  const { userAuth, updateProfile, sendVerificationCode, verifyEmailCode, updateUserAuthEmail } = useAuth(); 
  const { userData, saveUserData } = useUser(); 

  const { control, handleSubmit, getValues, formState: { errors } } = useForm({
    defaultValues: {
      name: userData?.name,
      email: userData?.email,
    },
    resolver: yupResolver(validationSchema),
  });

  const [sendStatus, setSendStatus] = useState("idle");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [code, setCode] = useState(null);
  const [sendVerificationStatus, setSendVerificationStatus] = useState("idle");

  async function submit(data) {
    if (!sendStatus) return;

    const isEmailChanged = userData.email !== data.email;
    const isNameChanged = userData.name !== data.name;

    if (isNameChanged && isEmailChanged) {
      setSendStatus("loading");

      setTimeout(async () => {
        await updateProfile({ displayName: data.name });
        await saveUserData({ ...userData, name: data.name });

        const response = await sendVerificationCode(data.email);

        if (!response.success) {
          setSendStatus("error");
          setTimeout(() => {
            setSendStatus("idle");
          }, 1000);
          return;
        }
  
        setSendStatus("success");
  
        setTimeout(() => {
          setSendStatus("idle");
          setIsPopupOpen(true);
        }, 1000);
      }, 1000);    
    } else if (isNameChanged) {
      setSendStatus("loading");

      setTimeout(async () => {
        await updateProfile({ displayName: data.name });
        await saveUserData({ ...userData, name: data.name });
  
        setSendStatus("success");
  
        setTimeout(() => setSendStatus("idle"), 1000);
      }, 1000);
    } else if (isEmailChanged) {
      setSendStatus("loading");

      setTimeout(async () => {
        const response = await sendVerificationCode(data.email);

        if (!response.success) {
          setSendStatus("error");
          setTimeout(() => {
            setSendStatus("idle");
          }, 1000);
          return;
        }

        setSendStatus("success");
  
        setTimeout(() => {
          setSendStatus("idle");
          setIsPopupOpen(true);
        }, 1000);
      }, 1000);
    }
  }
  async function submitVerificationForm(event) {
    event.preventDefault();
    if (!sendStatus) return;

    setSendVerificationStatus("loading");

    setTimeout(async () => {
      const response = await verifyEmailCode(getValues("email"), code.join(""));

      if (!response.success) {
        setSendVerificationStatus("error");
        setTimeout(() => setSendVerificationStatus("idle"), 1000);
        return;
      }

      setSendVerificationStatus("success");
        
      setTimeout(async () => {
        await updateUserAuthEmail(userAuth.uid, getValues("email"));

        setSendVerificationStatus("idle");
        setIsPopupOpen(false);
      }, 1000)
    }, 1000)
  }

  function onClosePopup() {
    setCode(null);
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(submit)}>
        <FormGroup gridTemplateColumns="1fr 1fr">
          <FormGroupCell>
            <FormField
              className={styles.formField}
              label="Имя"
              error={errors?.name}
              Component={() =>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => 
                    <Input
                      value={field.value}
                      placeholder="Введите имя"
                      onChangeCallback={field.onChange}
                    />
                  }
                />
              }
            />
          </FormGroupCell>
          <FormGroupCell>
            <FormField 
              className={styles.formField}
              label="Email"
              error={errors?.email}
              Component={() =>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => 
                    <Input
                      value={field.value}
                      placeholder="Введите email"
                      onChangeCallback={field.onChange}
                    />
                  }
                />
              }
            />
          </FormGroupCell>
        </FormGroup>
  
        <ButtonSend className={styles.buttonSend} status={sendStatus}>Сохранить</ButtonSend>
      </form>

      <Popup isOpen={isPopupOpen} setIsOpen={setIsPopupOpen} onClose={onClosePopup}>
        <VerificationForm email={getValues("email")} onSubmit={submitVerificationForm} sendStatus={sendVerificationStatus} code={code} setCode={setCode} />
      </Popup>
    </>
  );
}