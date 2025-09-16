"use client"



import type { BaseComponent } from "@/types/root";

import clsx from "clsx";
import styles from "./Header.module.scss";

interface HeaderProps extends BaseComponent {};

export default function Header({ className }: HeaderProps) {
  return (
    <header className={clsx(styles.header, className)}>
    </header>
  );
}