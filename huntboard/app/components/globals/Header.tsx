import React from "react";
import ThemeToggle from "./ThemeToggle";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.spacer}></div>
      <ThemeToggle />
    </header>
  );
}
