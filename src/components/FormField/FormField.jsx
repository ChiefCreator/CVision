import styles from "./FormField.module.scss"

import { useRef } from "react";

import Input from "../Input/Input";
import EditableTitle from "../EditableTitle/EditableTitle";
import DropdownControlMenu from "../DropdownControlMenu/DropdownControlMenu";

import { generateUUID } from "../../lib/mathUtils";

export default function FormField({ type = "general", Component, data, className = "", label, inputPlaceholder, inputValue, onChangeInputCallback, onChangeEditableTitleCallback, inputLabelValue, onClickButtonDeleteFieldCallback }) {
  const editableTitleInputRef = useRef(null);
  const isGeneral = type === "general";
  const controlsData = [
    { 
      id: "control-1",
      title: "Переименовать поле",
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M556.153-117.847q-17.264 17.23-42.785 17.23t-42.752-17.23l-352-352q-8.692-8.692-13.653-20.01-4.962-11.317-4.962-24.143v-286q0-24.538 17.731-42.268 17.73-17.731 42.268-17.731h286q12.384 0 23.725 4.834t19.659 13.012l352 352.616q17.615 17.615 17.807 43.037t-17.038 42.653zM513.212-160l286.173-286-353.213-354H160v286zM259.955-650.001q20.814 0 35.429-14.57t14.615-35.384-14.57-35.429-35.384-14.615-35.429 14.57-14.615 35.384 14.57 35.429 35.384 14.615M160-800"></path></svg>, 
      onClick: handleEditableTitleInputFocus
    },
    { 
      id: "control-2",
      title: "Удалить поле",
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M292.309-140.001q-29.923 0-51.115-21.193-21.193-21.192-21.193-51.115V-720h-10q-12.769 0-21.384-8.615t-8.616-21.384 8.616-21.384q8.615-8.616 21.384-8.616H360q0-14.692 10.346-25.038t25.038-10.346h169.232q14.692 0 25.038 10.346T600-779.999h149.999q12.769 0 21.384 8.616t8.616 21.384-8.616 21.384Q762.768-720 749.999-720h-10v507.691q0 29.923-21.193 51.115-21.192 21.193-51.115 21.193zM680-720H280v507.691q0 5.385 3.462 8.847t8.847 3.462h375.382q5.385 0 8.847-3.462t3.462-8.847zM376.155-280h59.999v-360h-59.999zm147.691 0h59.999v-360h-59.999zM280-720v520z"></path></svg>,
      onClick: onClickButtonDeleteFieldCallback
    }
  ];

  // обработчики
  function handleEditableTitleInputFocus() {
    if (editableTitleInputRef.current) {
      editableTitleInputRef.current.focus();
    }
  };

  function renderComponent() {
    switch(Component?.type) {
      case "select": {
        return <Component key={generateUUID} selectedValue={inputValue} onChangeCallback={onChangeInputCallback} data={data} />
      }
      default: {
        return <Input value={inputValue} placeholder={inputPlaceholder} onChangeCallback={onChangeInputCallback} />
      }
    }
  }

  return (
    <div className={`${styles.formField} ${className}`}>
      <header className={styles.formFieldHeader}>
        <div className={styles.formFieldLabelWrapper}>
          {isGeneral ? <label className={styles.formFieldLabel}>{label}</label> : <EditableTitle isInputFocused={true} placeholder="Без названия" onChangeCallback={onChangeEditableTitleCallback} ref={editableTitleInputRef}>{inputLabelValue}</EditableTitle>}
        </div>
        <div className={styles.formFieldControlsWrapper}>
          {!isGeneral && <DropdownControlMenu controls={controlsData} />}
        </div>
      </header>
      <div className={styles.formFieldBody}>
        {renderComponent()}
      </div>
    </div>
  );
}