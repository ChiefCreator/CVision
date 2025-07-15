

import { Plus } from "lucide-react";

import { BaseComponent } from "@/types/rootTypes";

import styles from "./AddSubsectionButton.module.scss";
import clsx from "clsx";

interface AddSubsectionButtonProps extends BaseComponent {
  onClick: () => void;
};

export default function AddSubsectionButton({ className, onClick }: AddSubsectionButtonProps) {
  return (
    <button className={clsx(styles.button, className)} type="button" onClick={onClick}>
      <Plus className={styles.buttonIcon} />
      Добавить подраздел
    </button>
  );
}