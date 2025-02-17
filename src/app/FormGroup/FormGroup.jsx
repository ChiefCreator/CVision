import { useState, useEffect, useRef } from "react";
import styles from "./FormGroup.module.scss"
import React from "react";

export default function FormGroup({ gridTemplateColumns, gridTemplateRows, children }) {
  return (
    <fieldset className={styles.formGroup} style={{ gridTemplateRows, gridTemplateColumns }}>
      {children}
    </fieldset>
  );
};