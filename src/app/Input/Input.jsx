import styles from "./Input.module.scss"

import { useEffect, useState } from "react";
import { useRef } from 'react';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP);

export default function Input({ value, placeholder, onChangeCallback }) {
  const $input = useRef();
  const $line = useRef();
  const timelineOfFirstLine = useRef();
  const timelineOfSecondLine = useRef();

  function handleInputChange(event) {
    onChangeCallback(event.target.value);
  }
  function handleFocus() {
    contextSafe(() => timelineOfFirstLine.current.restart())();
  }
  function handleBlur() {
    contextSafe(() => timelineOfFirstLine.current.reverse())();
  }
  function handleMouseenter() {
    contextSafe(() => timelineOfSecondLine.current.restart())();
  }
  function handleMouseleave() {
    contextSafe(() => timelineOfSecondLine.current.reverse())();
  }

  const { contextSafe } = useGSAP(() => {
    timelineOfFirstLine.current = gsap.timeline({ paused: true })
      .to($line.current.firstElementChild, {
        transform: "scale(1)",
        ease: "power3.inOut",
        duration: .75,
      })

    timelineOfSecondLine.current = gsap.timeline({ paused: true })
      .to($line.current.lastElementChild, {
        transform: "scale(1)",
        ease: "power3.inOut",
        duration: .75,
      })
  });

  return (
    <div 
      className={styles.input}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseenter}
      onMouseLeave={handleMouseleave}
    >
      <div className={styles.inputContainer}>
        <input
          className={styles.inputItem}
          ref={$input}
          value={value}
          placeholder={placeholder}
          onChange={handleInputChange}
        ></input>
      </div>
      <div className={styles.inputLine} ref={$line}>
        <span className={`${styles.inputSubLine} ${styles.inputSubLineFirst}`}></span>
        <span className={`${styles.inputSubLine} ${styles.inputSubLineSecond}`}></span>
      </div>
    </div>
  );
}