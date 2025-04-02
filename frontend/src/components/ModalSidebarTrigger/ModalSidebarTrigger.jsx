import { useRef  } from "react";

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP);

import styles from "./ModalSidebarTrigger.module.scss";

const pointsAnimationData = [
  {
    id: 1,
    to: {
      transform: `translate(-100%, -100%)`,
      opacity: 0,
    }
  },
  {
    id: 2,
    to: {
      transform: `translate(0, -100%)`,
      opacity: 0,
    }
  },
  {
    id: 3,
    to: {
      transform: `translate(100%, -100%)`,
      opacity: 0,
    }
  },
  {
    id: 4,
    to: {
      transform: `translate(-100%, 0)`,
      opacity: 0,
    }
  },
  {
    id: 5,
    to: {
      opacity: 0,
    }
  },
  {
    id: 6,
    to: {
      transform: `translate(100%, 0)`,
      opacity: 0,
    }
  },
  {
    id: 7,
    to: {
      transform: `translate(-100%, 100%)`,
      opacity: 0,
    }
  },
  {
    id: 8,
    to: {
      transform: `translate(0, 100%)`,
      opacity: 0,
    }
  },
  {
    id: 9,
    to: {
      transform: `translate(100%, 100%)`,
      opacity: 0,
    }
  },
];

export default function ModalSidebarTrigger({ isSidebarModalOpen, setIsSidebarModalOpen }) {
  const pointsRef = useRef([]);
  const crossRef = useRef();
  const timelineRef = useRef();

  // инициализация анимаций
  const { contextSafe } = useGSAP(() => {
    timelineRef.current = gsap.timeline({ paused: true });

    pointsAnimationData.forEach((pointAnimationData, index) => {
      timelineRef.current.to(pointsRef.current[index], {
        ...pointAnimationData.to,
        ease: "power3.inOut",
        duration: 0.5,
      }, "<");
    });

    timelineRef.current
      .to(crossRef.current.firstElementChild, {
        width: "80%",
        ease: "power3.inOut",
        duration: 0.5,
      }, 0)
      .to(crossRef.current.lastElementChild, {
        width: "80%",
        ease: "power3.inOut",
        duration: 0.5,
      }, "<")
  });
  const startAnimation = contextSafe(() => timelineRef.current.restart());
  const reverseAnimation = contextSafe(() => timelineRef.current.reverse());

  // методы
  function toggle() {
    setIsSidebarModalOpen && setIsSidebarModalOpen(prev => !prev);

    isSidebarModalOpen ? reverseAnimation() : startAnimation();
  }

  return (
    <button className={styles.trigger} type="button" onClick={toggle}>
      <div className={styles.triggerContainer}>
        {pointsAnimationData.map((pointAnimationData, index) => {
          return (
            <span className={styles.triggerPoint} key={pointAnimationData.id} ref={(el) => (pointsRef.current[index] = el)}></span>
          );
        })}

        <div className={styles.triggerCross} ref={crossRef}>
          <span className={styles.triggerCrossLine}></span>
          <span className={styles.triggerCrossLine}></span>
        </div>
      </div>
    </button>
  );
}