import { BaseComponent } from "@/types/root";
import { useTabTrigger } from "../../hooks/useTabTrigger";

import clsx from "clsx";
import { useTabsVariant } from "../../hooks/useTabsVariant";
import { TabsVariant } from "../../types/tabsVariant";
import styles from "./TabsTrigger.module.scss";

interface TabsTriggerProps extends BaseComponent {
  value: string;
  variant?: TabsVariant;
  children: React.ReactNode;
};

export default function TabsTrigger({ value, variant: variantProp, children, className }: TabsTriggerProps) {
  const { isActive, ref, onClick } = useTabTrigger(value);
  const variant = useTabsVariant(variantProp);

  return (
    <button
      className={clsx(styles.tab, isActive && styles.tabActive, className)}
      id={`trigger-${value}`}
      data-variant={variant}
      type="button"
      ref={ref}

      role="tab"
      aria-selected={isActive}
      aria-controls={`tab-${value}`}

      onClick={onClick}
    >
      {children}
    </button>
  );
};
