import styles from "./Sidebar.module.scss";

import { useAsideContext } from "../../context/AsideContext";

export default function MenuItem ({ data, level, openPath, setOpenPath, activeItemId, setActiveItemId }) {
  const { asideState } = useAsideContext();
  const isSubmenuPositionatedAbsolute = asideState.state === "partial";

  const isOpen = openPath.includes(data.id);
  const isActive = activeItemId === data.id;

  const { title, icon, onClickCallback } = data.menuItem;
  const isItemHasSubmenu = data.children;

  function handleClick() {
    toggleMenu();

    if (onClickCallback) onClickCallback();
  }

  function toggleMenu () {
    if (isItemHasSubmenu) {
      if (isOpen) {
        setOpenPath((prev) => prev.slice(0, prev.indexOf(data.id)));
      } else {
        setOpenPath((prev) => [...prev.slice(0, level), data.id]);
      }
    }

    if (!isItemHasSubmenu) setActiveItemId(data.id);
  };

  return (
    <div className={`${styles.menuItem} ${isOpen ? styles.menuItemOpen : ""} ${isActive && !isItemHasSubmenu ? styles.menuItemActive : ""}`}>
      <button className={`${styles.menuItemHead} ${isOpen ? styles.menuItemHeadOpen : ""}`} type="button" onClick={handleClick}>
        <div className={styles.menuItemIcon}>{icon}</div>
        <div className={styles.menuItemContent} data-hide={!isSubmenuPositionatedAbsolute || level === 0}>
          <span className={styles.menuItemTitle}>{title}</span>

          {isItemHasSubmenu && (
            <span className={`${styles.menuItemArrow}`}>
              <svg width={16} height={16} viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.431 7.257l1.352-1.474 5.893 5.48a1 1 0 0 1 0 1.474l-5.893 5.45-1.352-1.475L14.521 12 9.43 7.257z"></path>
              </svg>
            </span>
          )}
        </div>
      </button>

      {(isItemHasSubmenu && !isSubmenuPositionatedAbsolute) && (
        <div className={`${styles.menuItemDropdown} ${isOpen ? styles.menuItemDropdownOpen : ""}`}>
          <div className={styles.menuItemDropdownContainer}>
            {data.children.map((menuItemData) => (
              <MenuItem
                key={menuItemData.id}
                data={menuItemData}
                level={level + 1}
                openPath={openPath}
                setOpenPath={setOpenPath}
                activeItemId={activeItemId}
                setActiveItemId={setActiveItemId}
              />
            ))}
          </div>
        </div>
      )}
      {(isItemHasSubmenu && isSubmenuPositionatedAbsolute) && (
        <div className={`${styles.menuItemDropdownAbsolute} ${isOpen ? styles.menuItemDropdownAbsoluteOpen : ""}`}>
          {data.children.map((menuItemData) => (
            <MenuItem
              key={menuItemData.id}
              data={menuItemData}
              level={level + 1}
              openPath={openPath}
              setOpenPath={setOpenPath}
              activeItemId={activeItemId}
              setActiveItemId={setActiveItemId}
            />
          ))}
        </div>
      )}
    </div>
  );
};
