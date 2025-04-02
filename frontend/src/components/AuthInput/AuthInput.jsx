import { useRef, useState } from "react";

import styles from "./AuthInput.module.scss";

export default function AuthInput({ type, id, placeholder, isPassword, error, ...register }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  function handleFocus() {
    setIsFocused(true);
  }
  function handleBlur() {
    setIsFocused(false);
  }
  
  return (
    <div className={`${styles.input} ${isFocused ? styles.inputFocused : ""} ${error ? styles.inputError : ""}`}>
      <div className={styles.inputContainer}>
        <div className={styles.inputItemWrapper}>
          <input
            className={styles.inputItem}
            type={isPassword ? (showPassword ? "text" : "password") : type}
            id={id}
            placeholder={placeholder}
            {...register}

            onFocus={handleFocus}
            onBlur={handleBlur}
          ></input>
          <span className={`${styles.inputErrorWarning} ${error ? styles.inputErrorWarningActive : ""}`}>
            <svg className={styles.inputErrorWarningIcon} xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0zm-7 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1-9a1 1 0 0 0-1 1v4a1 1 0 1 0 2 0V6a1 1 0 0 0-1-1z" clip-rule="evenodd"></path></svg>
          </span>
        </div>

        {isPassword &&
          <div className={styles.inputControls}>
            <button
              className={styles.button}
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <svg className={styles.buttonIcon} stroke="currentColor" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"></path><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"></path><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"></path><path d="m2 2 20 20"></path></svg> : <svg className={styles.buttonIcon} viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path><circle cx="12" cy="12" r="3"></circle></svg>}
            </button>
          </div>}
      </div>
    </div>
  );
}