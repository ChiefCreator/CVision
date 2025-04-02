import { useState, useRef, useEffect } from "react";

import styles from "./Tabs.module.scss";

import TabButton from "./TabButton";

export default function Tabs({ children, controlsPanel }) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [trackerActiveTabRect, setTrackerActiveTabRect] = useState({ width: 0, left: 0 });
  const tabButtonRefs = useRef([]);

  function handleTabButtonClick(index) {
    setActiveTabIndex(index);
  }

  useEffect(() => {
    setTrackerActiveTabRect(recalcTrackerActiveTab(activeTabIndex));
  }, [activeTabIndex])

  function recalcTrackerActiveTab(activeTabButtonIndex) {
    const tabButtonActive = tabButtonRefs.current[activeTabButtonIndex];
    const tabButtonRect = tabButtonActive.getBoundingClientRect();
    const tabButtonOffsetLeft = tabButtonActive.offsetLeft;

    return {
      width: tabButtonRect.width,
      left: tabButtonOffsetLeft,
    };
  }

  return (
    <div className={styles.tabs}>
      <header className={styles.tabsHeader}>
        <div className={styles.tabsHeaderContainer}>
          <div className={styles.tabsButtonsList}>
            {children.map((child, index) => {
              const { id, title } = child.props;
  
              return (
                <TabButton
                  key={id}
                  isActive={activeTabIndex === index}
                  onClickCallback={() => handleTabButtonClick(index)}
                  ref={(el) => (tabButtonRefs.current[index] = el)}
                >
                  {title}
                </TabButton>
              );
            })}
          </div>
          <div className={styles.tabsControlsPanel}>
            {controlsPanel.components.map(component => {
              return component;
            })}
          </div>
        </div>
        <div className={styles.tabsLine}>
          <span className={styles.tabsTrackerActiveTab} style={{ ...trackerActiveTabRect }}></span>
        </div>
      </header>
      <div className={styles.tabsBody}>
        {children[activeTabIndex]}
      </div>
    </div>
  );
}