import { BaseComponent } from "@/types/rootTypes";
import styles from "./FormGroup.module.scss";
import clsx from "clsx";

interface FormGroupCellProps extends BaseComponent {
  gridArea?: string;
  children: React.ReactNode;
}

export default function FormGroupCell({ className, gridArea, children }: FormGroupCellProps) {
  return (
    <div className={clsx(styles.formGroupCell, className)} style={{ gridArea }}>
      {children}
    </div>
  );
}
