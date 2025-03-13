import styles from "./Sidebar.module.scss";

import { useHeaderContext } from "../../context/HeaderContext";
import { useAsideContext } from "../../context/AsideContext";
import { useEffect, useRef, useState } from "react";

import Menu from "./Menu";

export default function Sidebar({ defaultActiveItemId, isModal = false, isModalOpen = false, isHeaderRendered }) {
  const { asideState, dispatchOfAsideState } = useAsideContext();
  const { state, rect } = asideState;
  const [buttonTriggerPosY, setButtonTriggerPosY] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const sidebarRef = useRef();
  const sidebarRectRef = useRef();
  const triggerButtonRef = useRef();
  const triggerButtonHeightRef = useRef();

  function toggle() {
    dispatchOfAsideState({ type: "SET_STATE", state: state === "full" ? "partial" : "full" });
  }

  function handleMousemove(event) {
    let posY = event.pageY - sidebarRectRef.current.top - triggerButtonHeightRef.current / 2;
    posY = posY < 0 ? 0 : posY > sidebarRectRef.current.height ? sidebarRectRef.current.height : posY;

    setButtonTriggerPosY(posY);
  }
  function handleMouseenter() {
    setIsHovered(true);
  }
  function handleMouseleave() {
    setIsHovered(false);
  }

  useEffect(() => {
    if (!isHeaderRendered) return;

    sidebarRectRef.current = sidebarRef.current.getBoundingClientRect();
    if (!isModal) triggerButtonHeightRef.current = triggerButtonRef.current.offsetHeight;

    dispatchOfAsideState({ 
      type: "SET_RECT",
      rect: sidebarRef.current.getBoundingClientRect(),
    });
    dispatchOfAsideState({ 
      type: "SET_IS_MODAL",
      isModal,
    });
  }, [isHeaderRendered]);
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
      onMouseMove={isModal ? null : isHeaderRendered ? handleMousemove : null}
      onMouseEnter={isModal ? null : isHeaderRendered ? handleMouseenter : null}
      onMouseLeave={isModal ? null : isHeaderRendered ? handleMouseleave : null}
    >
      <div className={styles.sidebarContainer}>
        <div className={styles.sidebarContent}>
          <div className={styles.account}>
            <div className={styles.accountImgWrapper}>
              <svg className={styles.accountImg} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 32 32"><g clip-rule="evenodd" fill-rule="evenodd"><path d="m0 0h32v32h-32z" fill="#eff2f9"/><path d="m9 23c0 .6.5 1 1 1h12c.5 0 1-.4 1-1v-1a1 1 0 0 0 -.7-1l-3.7-1.4a.6.6 0 0 1 -.3-.5v-.6c0-.2 0-.3.2-.4.6-.7 1.1-1.9 1.2-2.2l.1-.1c.2-.1.4-.4.5-1s0-1-.2-1.1l-.2-.3v-2.6a3 3 0 0 0 -2-2.5c-1-.4-2.8-.4-3.8 0a3 3 0 0 0 -2 2.5v2.6l-.2.3c-.1.1-.4.5-.2 1 0 .7.3 1 .4 1l.2.2c0 .4.5 1.4 1.2 2.2l.2.4v.6c0 .2-.2.4-.4.6l-3.6 1.3a1 1 0 0 0 -.6 1v.9z" fill="#bec4d5"/></g></svg>
            </div>
            <div className={styles.accountInfo} data-hide>
              <span className={styles.accountName}>Kirill Pekarski</span>
              <span className={styles.accountMail}>kipe122006@gmail.com</span>
            </div>
          </div>

          <nav className={styles.sidebarNavigation}>
            <Menu defaultActiveItemId={defaultActiveItemId} />
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







































// import styles from "./Sidebar.module.scss";

// import { useAsideContext } from "../../context/AsideContext";
// import { useEffect, useRef, useState } from "react";

// import Menu from "./Menu";

// const sidebarItemsData = [
//   // {
//   //   id: 1,
//   //   type: "link",
//   //   title: "Доска",
//   //   href: "/",
//   //   icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="path-1-inside-1_530_38572" fill="white"><rect x="4.18359" y="4.17969" width="5.01923" height="5.01923" rx="0.836538"></rect></mask><rect x="4.18359" y="4.17969" width="5.01923" height="5.01923" rx="0.836538" fill="#1A91F0" stroke="#1A91F0" stroke-width="2.8" mask="url(#path-1-inside-1_530_38572)"></rect><mask id="path-2-inside-2_530_38572" fill="white"><rect x="4.18359" y="10.875" width="5.01923" height="5.01923" rx="0.836538"></rect></mask><rect x="4.18359" y="10.875" width="5.01923" height="5.01923" rx="0.836538" fill="#1A91F0" stroke="#1A91F0" stroke-width="2.8" mask="url(#path-2-inside-2_530_38572)"></rect><mask id="path-3-inside-3_530_38572" fill="white"><rect x="10.875" y="4.17969" width="5.01923" height="5.01923" rx="0.836538"></rect></mask><rect x="10.875" y="4.17969" width="5.01923" height="5.01923" rx="0.836538" fill="#1A91F0" stroke="#1A91F0" stroke-width="2.8" mask="url(#path-3-inside-3_530_38572)"></rect><mask id="path-4-inside-4_530_38572" fill="white"><rect x="10.875" y="10.875" width="5.01923" height="5.01923" rx="0.836538"></rect></mask><rect x="10.875" y="10.875" width="5.01923" height="5.01923" rx="0.836538" fill="#1A91F0" stroke="#1A91F0" stroke-width="2.8" mask="url(#path-4-inside-4_530_38572)"></rect></svg>
//   // },
//   {
//     id: 2,
//     type: "button",
//     title: "Документы",
//     icon: <svg width="20" height="20" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.9987 3.33594H6.2487C6.01858 3.33594 5.83203 3.52249 5.83203 3.7526V10.8359V16.2526C5.83203 16.4827 6.01858 16.6693 6.2487 16.6693H13.7487C13.9788 16.6693 14.1654 16.4827 14.1654 16.2526V7.5026M9.9987 3.33594L14.1654 7.5026M9.9987 3.33594V7.08594C9.9987 7.31606 10.1852 7.5026 10.4154 7.5026H14.1654" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" fill="none"></path></svg></svg>,
//     links: [
//       {
//         id: 1,
//         type: "link",
//         title: "Резюме",
//         href: "resumes",
//         icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="path-1-inside-1_530_38572" fill="white"><rect x="4.18359" y="4.17969" width="5.01923" height="5.01923" rx="0.836538"></rect></mask><rect x="4.18359" y="4.17969" width="5.01923" height="5.01923" rx="0.836538" stroke-width="2.8" mask="url(#path-1-inside-1_530_38572)"></rect><mask id="path-2-inside-2_530_38572" fill="white"><rect x="4.18359" y="10.875" width="5.01923" height="5.01923" rx="0.836538"></rect></mask><rect x="4.18359" y="10.875" width="5.01923" height="5.01923" rx="0.836538" stroke-width="2.8" mask="url(#path-2-inside-2_530_38572)"></rect><mask id="path-3-inside-3_530_38572" fill="white"><rect x="10.875" y="4.17969" width="5.01923" height="5.01923" rx="0.836538"></rect></mask><rect x="10.875" y="4.17969" width="5.01923" height="5.01923" rx="0.836538" stroke-width="2.8" mask="url(#path-3-inside-3_530_38572)"></rect><mask id="path-4-inside-4_530_38572" fill="white"><rect x="10.875" y="10.875" width="5.01923" height="5.01923" rx="0.836538"></rect></mask><rect x="10.875" y="10.875" width="5.01923" height="5.01923" rx="0.836538" stroke-width="2.8" mask="url(#path-4-inside-4_530_38572)"></rect></svg>
//       },
//       {
//         id: 2,
//         type: "link",
//         title: "Сопроводительные письма",
//         href: "dashboard",
//         icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="path-1-inside-1_530_38572" fill="white"><rect x="4.18359" y="4.17969" width="5.01923" height="5.01923" rx="0.836538"></rect></mask><rect x="4.18359" y="4.17969" width="5.01923" height="5.01923" rx="0.836538" stroke-width="2.8" mask="url(#path-1-inside-1_530_38572)"></rect><mask id="path-2-inside-2_530_38572" fill="white"><rect x="4.18359" y="10.875" width="5.01923" height="5.01923" rx="0.836538"></rect></mask><rect x="4.18359" y="10.875" width="5.01923" height="5.01923" rx="0.836538" stroke-width="2.8" mask="url(#path-2-inside-2_530_38572)"></rect><mask id="path-3-inside-3_530_38572" fill="white"><rect x="10.875" y="4.17969" width="5.01923" height="5.01923" rx="0.836538"></rect></mask><rect x="10.875" y="4.17969" width="5.01923" height="5.01923" rx="0.836538" stroke-width="2.8" mask="url(#path-3-inside-3_530_38572)"></rect><mask id="path-4-inside-4_530_38572" fill="white"><rect x="10.875" y="10.875" width="5.01923" height="5.01923" rx="0.836538"></rect></mask><rect x="10.875" y="10.875" width="5.01923" height="5.01923" rx="0.836538" stroke-width="2.8" mask="url(#path-4-inside-4_530_38572)"></rect></svg>
//       },
//     ],
//   },
//   // {
//   //   id: 3,
//   //   type: "link",
//   //   title: "Настройки",
//   //   href: "dashboard",
//   //   icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="path-1-inside-1_530_38572" fill="white"><rect x="4.18359" y="4.17969" width="5.01923" height="5.01923" rx="0.836538"></rect></mask><rect x="4.18359" y="4.17969" width="5.01923" height="5.01923" rx="0.836538" stroke-width="2.8" mask="url(#path-1-inside-1_530_38572)"></rect><mask id="path-2-inside-2_530_38572" fill="white"><rect x="4.18359" y="10.875" width="5.01923" height="5.01923" rx="0.836538"></rect></mask><rect x="4.18359" y="10.875" width="5.01923" height="5.01923" rx="0.836538" stroke-width="2.8" mask="url(#path-2-inside-2_530_38572)"></rect><mask id="path-3-inside-3_530_38572" fill="white"><rect x="10.875" y="4.17969" width="5.01923" height="5.01923" rx="0.836538"></rect></mask><rect x="10.875" y="4.17969" width="5.01923" height="5.01923" rx="0.836538" stroke-width="2.8" mask="url(#path-3-inside-3_530_38572)"></rect><mask id="path-4-inside-4_530_38572" fill="white"><rect x="10.875" y="10.875" width="5.01923" height="5.01923" rx="0.836538"></rect></mask><rect x="10.875" y="10.875" width="5.01923" height="5.01923" rx="0.836538" stroke-width="2.8" mask="url(#path-4-inside-4_530_38572)"></rect></svg>
//   // },
// ];

// export default function Sidebar() {
//   const asideRef = useRef();
//   const { asideState, dispatchOfAsideState } = useAsideContext();
//   const { state, rect } = asideState;
//   // console.log(state)

//   function toggle() {
//     dispatchOfAsideState({ type: "SET_STATE", state: state === "full" ? "partial" : "full" });
//   }

//   useEffect(() => {
//     dispatchOfAsideState({ 
//       type: "SET_RECT",
//       rect: asideRef.current.getBoundingClientRect(),
//     })
//   }, []);
//   useEffect(() => {
//     if (state === "partial") {
//       asideRef.current.querySelectorAll("[data-hide]").forEach(item => item.style.display = "none");
//     } else {
//       asideRef.current.querySelectorAll("[data-hide]").forEach(item => item.style.display = "flex");
//     }

//     dispatchOfAsideState({ 
//       type: "SET_RECT",
//       rect: asideRef.current.getBoundingClientRect(),
//     })
//   }, [state]);

//   return (
//     <aside className={styles.sidebar} ref={asideRef}>
//       <div className={styles.sidebarContainer}>
//         <div className={styles.account}>
//           <div className={styles.accountImgWrapper}>
//             <svg className={styles.accountImg} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 32 32"><g clip-rule="evenodd" fill-rule="evenodd"><path d="m0 0h32v32h-32z" fill="#eff2f9"/><path d="m9 23c0 .6.5 1 1 1h12c.5 0 1-.4 1-1v-1a1 1 0 0 0 -.7-1l-3.7-1.4a.6.6 0 0 1 -.3-.5v-.6c0-.2 0-.3.2-.4.6-.7 1.1-1.9 1.2-2.2l.1-.1c.2-.1.4-.4.5-1s0-1-.2-1.1l-.2-.3v-2.6a3 3 0 0 0 -2-2.5c-1-.4-2.8-.4-3.8 0a3 3 0 0 0 -2 2.5v2.6l-.2.3c-.1.1-.4.5-.2 1 0 .7.3 1 .4 1l.2.2c0 .4.5 1.4 1.2 2.2l.2.4v.6c0 .2-.2.4-.4.6l-3.6 1.3a1 1 0 0 0 -.6 1v.9z" fill="#bec4d5"/></g></svg>
//           </div>
//           <div className={styles.accountInfo} data-hide>
//             <span className={styles.accountName}>Kirill Pekarski</span>
//             <span className={styles.accountMail}>kipe122006@gmail.com</span>
//           </div>
//         </div>

//         <nav className={styles.sidebarNavigation}>
//           <Menu data={sidebarItemsData} main={true} />
//         </nav>

//         <div className={styles.sidebarControls}>
//           <button className={styles.sidebarToggleButton} onClick={toggle}>
//             <svg className={styles.sidebarToggleButtonIcon} viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
//               <path d="M9.431 7.257l1.352-1.474 5.893 5.48a1 1 0 0 1 0 1.474l-5.893 5.45-1.352-1.475L14.521 12 9.43 7.257z"></path>
//             </svg>
//           </button>
//         </div>
//       </div>
//       <span className={styles.triggerLine}>
//         <span className={styles.triggerLineItem}></span>
//       </span>
//     </aside>
//   );
// }