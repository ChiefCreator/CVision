import { BaseComponent } from "@/types/root";
import styles from "./Head.module.scss";

interface HeaderProps extends BaseComponent {

}

export default function Header({ className }: HeaderProps) {
  return (
    <header className={className}>
      header
    </header>
  );
}