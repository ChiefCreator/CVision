import styles from "./SectionAccordion.module.scss";

import { useRef } from "react";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP);

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function SectionAccordionItem({ title, id, index, subTitle, children, isOpen, isDragging, onClickCallback, onClickButtonDeleteCallback }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });
  const style = {
    transform: `translate(${transform ? transform.x : 0}px, ${transform ? transform.y : 0}px)`,
    transition,
  };
  const buttonDeleteRef = useRef(null);
  const buttonDragHandleRef = useRef(null);
  const timelineOfButtonDeleteAppearance = useRef();
  const timelineOfButtonHandleDragAppearance = useRef();

  // инициализация анимаций
  const { contextSafe } = useGSAP(() => {
    timelineOfButtonDeleteAppearance.current = gsap.timeline({ paused: true })
      .to(buttonDeleteRef.current.querySelector(`.${styles.buttonDeleteIcon}`), {
        transform: "scale(1)",
        ease: "power3.inOut",
        duration: .75,
      })
      
    timelineOfButtonHandleDragAppearance.current = gsap.timeline({ paused: true })
      .to(buttonDragHandleRef.current.querySelector(`.${styles.dragHandleIcon}`), {
        transform: "scale(1)",
        ease: "power3.inOut",
        duration: .75,
      })
  });

  // методы
  const animateButtonOnShow = contextSafe(() => timelineOfButtonDeleteAppearance.current.restart());
  const animateButtonOnHide = contextSafe(() => timelineOfButtonDeleteAppearance.current.reverse());
  const animateButtonDragHandleOnShow = contextSafe(() => timelineOfButtonHandleDragAppearance.current.restart());
  const animateButtonDragHandleOnHide = contextSafe(() => timelineOfButtonHandleDragAppearance.current.reverse());

  // обработчики событий
  function handleClick(event) {
    if (event.target.closest(`.${styles.dragHandle}`)) return;

    if (onClickCallback) onClickCallback();
  }
  function handleHeaderMouseenter() {
    animateButtonOnShow();
    animateButtonDragHandleOnShow();
  }
  function handleHeaderMouseleave() {
    animateButtonOnHide();
    animateButtonDragHandleOnHide();
  }

  return (
    <div
      className={`${styles.accordionItem} ${isOpen ? styles.accordionItemActive : null} ${isDragging ? styles.accordionItemDragging : null}`}
      data-is-open={isOpen}
      data-index={index}
      id={id}
      ref={setNodeRef}
      style={style}
      {...attributes}
    >
      <header className={styles.accordionItemHeader} type="button" onClick={handleClick} onMouseEnter={handleHeaderMouseenter} onMouseLeave={handleHeaderMouseleave}>
        <div className={styles.dragHandle} {...listeners} ref={buttonDragHandleRef}>
          <svg className={styles.dragHandleIcon} width="20" height="20" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M8.5 4c0 .82843-.67157 1.5-1.5 1.5S5.5 4.82843 5.5 4 6.17157 2.5 7 2.5s1.5.67157 1.5 1.5zM7 11.5c.82843 0 1.5-.6716 1.5-1.5 0-.82843-.67157-1.5-1.5-1.5s-1.5.67157-1.5 1.5c0 .8284.67157 1.5 1.5 1.5zm0 6c.82843 0 1.5-.6716 1.5-1.5s-.67157-1.5-1.5-1.5-1.5.6716-1.5 1.5.67157 1.5 1.5 1.5zm6 0c.8284 0 1.5-.6716 1.5-1.5s-.6716-1.5-1.5-1.5-1.5.6716-1.5 1.5.6716 1.5 1.5 1.5zm1.5-7.5c0 .8284-.6716 1.5-1.5 1.5s-1.5-.6716-1.5-1.5c0-.82843.6716-1.5 1.5-1.5s1.5.67157 1.5 1.5zM13 5.5c.8284 0 1.5-.67157 1.5-1.5s-.6716-1.5-1.5-1.5-1.5.67157-1.5 1.5.6716 1.5 1.5 1.5z"></path></svg>
        </div>
        <div className={styles.accordionItemHeaderContent}>
          <span className={styles.accordionItemTitle}>{title}</span>
          <span className={styles.accordionItemSubTitle}>{subTitle}</span>
        </div>
        <div className={styles.accordionItemControls}>
          <button className={styles.buttonToggle} type="button" onClick={onClickCallback}>
            <svg className={styles.buttonToggleIcon} viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.431 7.257l1.352-1.474 5.893 5.48a1 1 0 0 1 0 1.474l-5.893 5.45-1.352-1.475L14.521 12 9.43 7.257z"></path>
            </svg>
          </button>
        </div>
        <div className={styles.accordionItemOutsideControls}>
          <button className={styles.buttonDelete} type="button" onClick={onClickButtonDeleteCallback} ref={buttonDeleteRef}>
            <svg className={styles.buttonDeleteIcon} width="20" height="20" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M14 6h3v2H3V6h3V3c0-.55228.44772-1 1-1h6c.5523 0 1 .44772 1 1v3zm-9 4h10v8H5v-8zm2 6h6v-4H7v4zm5-10V4H8v2h4z"></path></svg>
          </button>
        </div>
      </header>
      <div className={styles.accordionItemBody}>
        <div className={styles.accordionItemBodyContainer}>
          <div className={styles.accordionItemBodyContent}>{children}</div>
        </div>
      </div>
    </div>
  );
}
