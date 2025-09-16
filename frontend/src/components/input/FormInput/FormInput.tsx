import React, { useState } from "react";

import clsx from "clsx";
import { Eye, EyeOff } from "lucide-react";
import styles from "./FormInput.module.scss";

export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  componentType?: "base" | "password";
  ref?: React.Ref<HTMLInputElement>;
}

const getInputType = (componentType: string, isShowPassword: boolean) => {
  const isPasswordType = componentType === "password";

  if (isPasswordType && !isShowPassword) return "password"

  return "string";
}

export default function FormInput({ componentType = "base", className, name, value = "", placeholder, ref, onChange }: FormInputProps) {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const isPasswordType = componentType === "password";

  const inputType = getInputType(componentType, isShowPassword);

  const togglePassword = () => setIsShowPassword(prev => !prev);

  return (
    <div className={clsx(styles.input, className)}>
      <input
        className={styles.item}
        name={name}
        value={value}
		  	ref={ref}
        placeholder={placeholder}
        type={inputType}
  
        onChange={onChange}
      ></input>

      {isPasswordType && (
        <button className={styles.button} type="button" onClick={togglePassword}>
          {isShowPassword ? <Eye className={styles.buttonIcon} /> : <EyeOff className={styles.buttonIcon} />}
        </button>
      )}
    </div>
  );
}