import styles from "./Header.module.scss";

import Container from "../Container/Container";
import Logo from "../Logo/Logo";
import ButtonAnimated from "../ButtonAnimated/ButtonAnimated";
import { useEffect, useRef } from "react";
import { useState } from "react";

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP);

import { useHeaderContext } from "../../context/HeaderContext";
import { useAsideContext } from "../../context/AsideContext";

export default function Header() {
  const { dispatchOfHeaderState } = useHeaderContext();
  const { asideState } = useAsideContext();
  const [headerStyle, setHeaderStyle] = useState("basic"); // basic, fullTransformed, partialTransformed

  const headerRef = useRef();
  const headerContainerRef = useRef();

  const animationDuration = .4;
  const startTransform = 20;

  function animateHeader() {
    switch(headerStyle) {
      case "fullTransformed": {
        return gsap.timeline()
          .to(headerRef.current, {
            top: 20,
            transform: `translateX(${asideState.rect.width}px)`,
            width: `calc(100% - ${asideState.rect.width}px)`,
            ease: "power3.inOut",
            duration: animationDuration,
          })
          .to(headerContainerRef.current, {
            padding: "15px 15px",
            backgroundColor: "rgba(176, 191, 228, 0.3)",
            ease: "power3.inOut",
            duration: animationDuration,
          }, "<")
      }
      case "basic": {
        return gsap.timeline()
          .to(headerRef.current, {
            top: 0,
            transform: `translateX(0)`,
            width: "100%",
            ease: "power3.inOut",
            duration: animationDuration,
          })
          .to(headerContainerRef.current, {
            padding: "15px 0",
            backgroundColor: "transparent",
            ease: "power3.inOut",
            duration: animationDuration,
          }, "<")
      }
    }
  }

  useEffect(() => {
    setTimeout(() => dispatchOfHeaderState({
      type: "SET_IS_RENDERED",
      isRendered: true,
    }), animationDuration * 1500);

    function handleScroll() {
      if (window.scrollY > startTransform) {
        if (asideState.state === "full") {
          setHeaderStyle("fullTransformed");
        } else if (asideState.state === "partial") {
          setHeaderStyle("partialTransformed");
        }
      } else {
        setHeaderStyle("basic")
      }
    }

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
      dispatchOfHeaderState({
        type: "SET_IS_RENDERED",
        isRendered: false,
      })
    }
  }, []);
  useEffect(() => {
    animateHeader();
  }, [headerStyle, asideState])

  return (
    <header className={`${styles.header}`} ref={headerRef}>
      <Container>
        <div className={styles.headerContainer} ref={headerContainerRef}>
          <Logo className={styles.headerLogo} />

          <div className={styles.controls}>
            <ButtonAnimated>Перейти на премиум</ButtonAnimated>
          </div>
        </div>
      </Container>
    </header>
  );
}