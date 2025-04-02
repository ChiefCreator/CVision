import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP);

import styles from "./Header.module.scss";

import Container from "../Container/Container";
import Logo from "../Logo/Logo";
import ButtonAnimated from "../ButtonAnimated/ButtonAnimated";
import DropdownMenu from "../DropdownMenu/DropdownMenu";

import { useAuth } from "../../context/AuthContext";
import { useUser } from "../../context/UserContext";
import { useHeaderContext } from "../../context/HeaderContext";
import { useAsideContext } from "../../context/AsideContext";

export default function Header() {
  const navigate = useNavigate();
  const { dispatchOfHeaderState } = useHeaderContext();
  const { asideState } = useAsideContext();
  const { logout } = useAuth();
  const { userData } = useUser();

  const [headerStyle, setHeaderStyle] = useState("basic"); // basic, fullTransformed, partialTransformed
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);

  const headerRef = useRef();
  const headerContainerRef = useRef();
  const buttonAccountRef = useRef(null);

  const animationDuration = .4;
  const startTransform = 20;

  const accountControlsData = [
    { 
      id: "control-1",
      title: "Настройки аккаунта",
      icon: <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.92822 8.38119L11.9282 4.91708L17.9282 8.38119V15.3094L11.9282 18.7735L5.92822 15.3094V8.38119ZM11.3509 2.94102C11.7081 2.73475 12.1483 2.73475 12.5056 2.94102L19.3509 6.89315C19.7081 7.09942 19.9282 7.48062 19.9282 7.89315V15.7974C19.9282 16.21 19.7081 16.5912 19.3509 16.7974L12.5056 20.7496C12.1483 20.9558 11.7081 20.9558 11.3509 20.7496L4.50557 16.7974C4.14831 16.5912 3.92822 16.21 3.92822 15.7974V7.89315C3.92822 7.48062 4.14831 7.09942 4.50557 6.89315L11.3509 2.94102ZM13.3923 11.8453C13.3923 12.6539 12.7368 13.3094 11.9282 13.3094C11.1196 13.3094 10.4641 12.6539 10.4641 11.8453C10.4641 11.0367 11.1196 10.3812 11.9282 10.3812C12.7368 10.3812 13.3923 11.0367 13.3923 11.8453ZM15.3923 11.8453C15.3923 13.7585 13.8414 15.3094 11.9282 15.3094C10.0151 15.3094 8.46412 13.7585 8.46412 11.8453C8.46412 9.93212 10.0151 8.38119 11.9282 8.38119C13.8414 8.38119 15.3923 9.93212 15.3923 11.8453Z"></path></svg>,
      onClick: () => {
        navigate("/settings/account");
      },
    },
    { 
      id: "control-2",
      title: "Выйти",
      icon: <svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" class="sc-iaNHCR ddJcUh"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M13 18H6L6 6L13 6V4H5C4.44772 4 4 4.44772 4 5V19C4 19.5523 4.44772 20 5 20H13V18ZM14.7474 8.49999L16.8359 11H10L10 13H16.8359L14.7474 15.5L16.2526 16.817L19.7526 12.6585C20.0825 12.2815 20.0825 11.7185 19.7526 11.3415L16.2526 7.18298L14.7474 8.49999Z"></path></svg></svg>,
      onClick: async () => {
        const response = await logout();

        if (!response.success) return;

        navigate("/auth/login");
      },
    }
  ];

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
            backgroundColor: "rgba(255, 255, 255, 0.3)",
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

          <div className={styles.headerControls}>
            <ButtonAnimated>Перейти на премиум</ButtonAnimated>

            <button className={styles.buttonAccount} ref={buttonAccountRef} type="button" onClick={() => setIsAccountDropdownOpen(prev => !prev)}>
              <svg className={styles.buttonAccountIcon} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.56099 11.7007L15.9986 7.40661L23.4362 11.7007V20.2889L15.9986 24.583L8.56099 20.2889V11.7007ZM15.4986 5.61682C15.808 5.43819 16.1892 5.43819 16.4986 5.61682L24.7362 10.3728C25.0456 10.5514 25.2362 10.8816 25.2362 11.2388V20.7508C25.2362 21.1081 25.0456 21.4382 24.7362 21.6168L16.4986 26.3728C16.1892 26.5514 15.808 26.5514 15.4986 26.3728L7.26099 21.6168C6.95159 21.4382 6.76099 21.1081 6.76099 20.7508V11.2388C6.76099 10.8816 6.95159 10.5514 7.26099 10.3728L15.4986 5.61682ZM13.7892 14.6037L15.8986 13.3859C15.9605 13.3502 16.0367 13.3502 16.0986 13.3859L18.208 14.6037C18.2699 14.6395 18.308 14.7055 18.308 14.777V17.2127C18.308 17.2841 18.2699 17.3502 18.208 17.3859L16.0986 18.6037C16.0367 18.6395 15.9605 18.6395 15.8986 18.6037L13.7892 17.3859C13.7273 17.3502 13.6892 17.2841 13.6892 17.2127V14.777C13.6892 14.7055 13.7273 14.6395 13.7892 14.6037Z" fill="currentColor"></path></svg>
            </button>

            {createPortal(
              <DropdownMenu
                className={styles.accountDropdownMenu}
                isOpen={isAccountDropdownOpen}
                setIsOpen={setIsAccountDropdownOpen}
                triggerRef={buttonAccountRef}

                header={
                  <header className={styles.accountDropdownMenuHeader}>
                    <h2 className={styles.accountDropdownMenuTitle}>{userData?.name}</h2>
                    <span className={styles.accountDropdownMenuSubtitle}>{userData?.email}</span>
                  </header>
                }
                controls={accountControlsData}
  
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              />,
              document.body
            )}
          </div>
        </div>
      </Container>
    </header>
  );
}