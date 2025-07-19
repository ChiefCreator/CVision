import { LucideProps } from "lucide-react";
import styles from "./AddSectionItem.module.scss";
import clsx from "clsx";

interface AddSectionItemProps {
  Icon: React.ComponentType<LucideProps & React.RefAttributes<SVGSVGElement>>;
  title?: string;
  isDisabled?: boolean;

  onClick: () => void;
}

export default function AddSectionItem({ Icon, title, isDisabled = false, onClick }: AddSectionItemProps) {
  return (
    <button className={clsx(styles.button)} type="button" disabled={isDisabled} onClick={onClick}>
      <Icon className={styles.buttonIcon} />
      {title}
    </button>
  );
}