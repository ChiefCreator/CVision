import React, { createContext, useContext, useState } from "react";

// Context
type ItemRef = React.RefObject<HTMLButtonElement | HTMLAnchorElement | null>;

interface NavigationLevel {
  refs: ItemRef[];
  focusedIndex: number;
  parent?: number;
  triggerRef?: ItemRef; 
}

interface ArrowNavigationType {
  register: (level: number, ref: ItemRef) => number;
  focusNext: (level: number) => void;
  focusPrev: (level: number) => void;
  focusSubmenu: (level: number) => void;
  focusParent: (level: number) => void;
  setFocus: (level: number, index: number) => void;
  getFocusedIndex: (level: number) => number;
  setSubmenuTrigger: (level: number, triggerRef: ItemRef, parent: number) => void;
}

const ArrowNavigationContext = createContext<ArrowNavigationType | null>(null);


// Provider
interface ArrowNavigationProviderProps {
  children: React.ReactNode;
}

export function ArrowNavigationProvider({ children }: ArrowNavigationProviderProps) {
  const [levels, setLevels] = useState<Record<number, NavigationLevel>>({});

  const register = (level: number, ref: ItemRef) => {
    setLevels(prev => {
      const current = prev[level] || { refs: [], focusedIndex: -1 };

      if (!current.refs.includes(ref)) {
        current.refs = [...current.refs, ref].filter(item => item.current);
      }

      return { ...prev, [level]: current };
    });

    return levels[level]?.refs.length - 1;
  };
  const setSubmenuTrigger = (level: number, triggerRef: ItemRef, parent: number) => {
    setLevels(prev => ({
      ...prev,
      [level]: {
        ...prev[level],
        parent,
        triggerRef,
      },
    }));
  };
  const setFocus = (level: number, index: number) => {
    const levelData = levels[level];
    if (!levelData) return;

    const el = levelData.refs[index]?.current;
    if (el) {
      el.focus();

      setLevels(prev => ({
        ...prev,
        [level]: { ...prev[level], focusedIndex: index },
      }));
    }
  };
  const getFocusedIndex = (level: number) => levels[level]?.focusedIndex ?? -1;

  const focusNext = (level: number) => {
    const { refs, focusedIndex } = levels[level] || { refs: [], focusedIndex: -1 };

    const nextIndex = (focusedIndex + 1) % refs.length;
    setFocus(level, nextIndex);
  };
  const focusPrev = (level: number) => {
    const { refs, focusedIndex } = levels[level] || { refs: [], focusedIndex: -1 };

    const prevIndex = (focusedIndex - 1 + refs.length) % refs.length;
    setFocus(level, prevIndex);
  };
  const focusSubmenu = (level: number) => {
    const subLevel = level + 1;
    const sub = levels[subLevel];

    if (sub && sub.refs.length > 0) {
      setFocus(subLevel, 0);
    }
  };
  const focusParent = (level: number) => {
    const parentLevel = level - 1;
    const parent = levels[parentLevel];

    if (parent && parent.focusedIndex !== -1) {
      setFocus(parentLevel, parent.focusedIndex);
    }
  };

  return (
    <ArrowNavigationContext.Provider value={{
      register,
      focusNext,
      focusPrev,
      focusSubmenu,
      focusParent,
      setFocus,
      getFocusedIndex,
      setSubmenuTrigger, 
    }}>
      {children}
    </ArrowNavigationContext.Provider>
  );
};


// Hook
export const useArrowNavigation = () => {
  const context = useContext(ArrowNavigationContext);

  if (!context) throw new Error("ArrowNavigationContext not found");
  
  return context;
};