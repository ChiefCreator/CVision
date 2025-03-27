import { useState } from "react";

import styles from "./CodeInput.module.scss";

export default function CodeInput({ fields = 6, onChangeCallback, onComplete }) {
  const [code, setCode] = useState(Array(fields).fill(""));

  function handleChange(event, index) {
    const value = event.target.value;

    if (/[^0-9]/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    onChangeCallback && onChangeCallback(newCode.join(""));

    if (newCode.every(char => char !== "") && onComplete) {
      onComplete(newCode.join(''));
    }
  }
  function handleKeyDown(event, index) {
    if (event.key === "Backspace" && code[index] === "" && index > 0) {
      document.getElementById(`input-${index - 1}`)?.focus();
    } else if (event.key !== "Backspace" && index < fields - 1) {
      document.getElementById(`input-${index + 1}`)?.focus();
    }
  }
  function handlePaste(event) {
    event.preventDefault();

    const pastedValue = event.clipboardData.getData("Text").slice(0, fields);

    setCode(pastedValue.split(""));

    onChangeCallback && onChangeCallback(pastedValue);
  }

  return (
    <div
      className={styles.codeInput}
      onPaste={handlePaste}
    >
      {code.map((value, index) => (
        <input
          className={styles.codeInputCell}
          key={index}
          id={`input-${index}`}
          type="text"
          value={value}
          maxLength={1}

          onChange={event => handleChange(event, index)}
          onKeyDown={event => setTimeout(() => handleKeyDown(event, index))}
        />
      ))}
    </div>
  );
}