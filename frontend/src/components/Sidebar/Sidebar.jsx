import styles from "./Sidebar.module.scss";
import { Link } from "react-router-dom";

import { useUser } from "../../context/UserContext";
import { useAsideContext } from "../../context/AsideContext";
import { useEffect, useRef, useState } from "react";

import Menu from "./Menu";

export default function Sidebar({ defaultActiveItemId, isModal = false, isModalOpen = false }) {
  const { asideState, dispatchOfAsideState } = useAsideContext();
  const { state } = asideState;
  const { userData } = useUser();

  const [openMenuPath, setOpenMenuPath] = useState([]);
  const [buttonTriggerPosY, setButtonTriggerPosY] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const sidebarRef = useRef();
  const triggerButtonRef = useRef();
  const triggerButtonHeightRef = useRef();

  function toggle() {
    dispatchOfAsideState({ type: "SET_STATE", state: state === "full" ? "partial" : "full" });

    state === "full" && setOpenMenuPath([]);
  }

  function handleMousemove(event) {
    if (!sidebarRef.current) return;

    const sidebarRect = sidebarRef.current.getBoundingClientRect();

    let posY = event.pageY - sidebarRect.top - window.scrollY - triggerButtonHeightRef.current / 2;
    posY = posY < 0 ? 0 : posY > sidebarRect.height ? sidebarRect.height : posY;

    setButtonTriggerPosY(posY);
  }
  function handleMouseenter() {
    setIsHovered(true);
  }
  function handleMouseleave() {
    setIsHovered(false);
  }

  useEffect(() => {
    if (!isModal) triggerButtonHeightRef.current = triggerButtonRef.current.offsetHeight;

    dispatchOfAsideState({ 
      type: "SET_RECT",
      rect: sidebarRef.current.getBoundingClientRect(),
    });
    dispatchOfAsideState({ 
      type: "SET_IS_MODAL",
      isModal,
    });
  }, []);
  useEffect(() => {
    if (state === "partial" && !isModal) {
      sidebarRef.current.querySelectorAll("[data-hide='true']").forEach(item => item.style.display = "none");
    } else {
      sidebarRef.current.querySelectorAll("[data-hide='true']").forEach(item => item.style.display = "flex");
    }

    dispatchOfAsideState({ 
      type: "SET_RECT",
      rect: sidebarRef.current.getBoundingClientRect(),
    })
  }, [state]);

  return (
    <aside
      className={`${styles.sidebar} ${isHovered ? styles.sidebarHovered : ""} ${isModal ? styles.sidebarModal : ""} ${isModalOpen ? styles.sidebarModalOpen : ""}`}
      ref={sidebarRef}
      onMouseMove={!isModal ? handleMousemove : null}
      onMouseEnter={!isModal ? handleMouseenter : null}
      onMouseLeave={!isModal ? handleMouseleave : null}
    >
      <div className={styles.sidebarContainer}>
        <div className={styles.sidebarContent}>
          <Link className={styles.account} to="/settings/account">
            <div className={styles.accountImgWrapper}>
              <svg className={styles.accountImg} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 32 32"><g clip-rule="evenodd" fill-rule="evenodd"><path d="m0 0h32v32h-32z" fill="#eff2f9"/><path d="m9 23c0 .6.5 1 1 1h12c.5 0 1-.4 1-1v-1a1 1 0 0 0 -.7-1l-3.7-1.4a.6.6 0 0 1 -.3-.5v-.6c0-.2 0-.3.2-.4.6-.7 1.1-1.9 1.2-2.2l.1-.1c.2-.1.4-.4.5-1s0-1-.2-1.1l-.2-.3v-2.6a3 3 0 0 0 -2-2.5c-1-.4-2.8-.4-3.8 0a3 3 0 0 0 -2 2.5v2.6l-.2.3c-.1.1-.4.5-.2 1 0 .7.3 1 .4 1l.2.2c0 .4.5 1.4 1.2 2.2l.2.4v.6c0 .2-.2.4-.4.6l-3.6 1.3a1 1 0 0 0 -.6 1v.9z" fill="#bec4d5"/></g></svg>
            </div>
            <div className={styles.accountInfo} data-hide>
              <span className={styles.accountName}>{userData?.name}</span>
              <span className={styles.accountMail}>{userData?.email}</span>
            </div>
          </Link>

          <nav className={styles.sidebarNavigation}>
            <Menu defaultActiveItemId={defaultActiveItemId} openPath={openMenuPath} setOpenPath={setOpenMenuPath} />
          </nav>
        </div>
        {!isModal && 
          <div className={styles.sidebarTriggerButtonWrapper}>
            <span className={styles.sidebarLine}></span>
            <button className={`${styles.triggerButton} ${state === "partial" ? styles.triggerButtonAsidePartial : ""}`} ref={triggerButtonRef} style={{ transform: `translateY(${buttonTriggerPosY}px)` }} onClick={toggle}>
              <svg className={styles.triggerButtonIcon} width={16} height={16} viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.431 7.257l1.352-1.474 5.893 5.48a1 1 0 0 1 0 1.474l-5.893 5.45-1.352-1.475L14.521 12 9.43 7.257z"></path>
              </svg>
            </button>
          </div>}
      </div>
    </aside>
  );
}