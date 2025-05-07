"use client";

import { useEffect, useState } from "react";
import styles from "./Header.module.css";
import { HiMenu } from "react-icons/hi";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const update = () => {
      const isSmall = window.innerWidth <= 768;
      setIsMobile(isSmall);
      if (!isSmall) setIsSidebarOpen(false);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const openSidebar = () => {
    setIsSidebarOpen(true);
    const event = new Event("sidebarOpen");
    window.dispatchEvent(event);
  };

  useEffect(() => {
    const closeListener = () => setIsSidebarOpen(false);
    window.addEventListener("sidebarClose", closeListener);
    return () => window.removeEventListener("sidebarClose", closeListener);
  }, []);

  return (
    <header className={styles.header}>
      {isMobile && !isSidebarOpen && (
        <button className={styles.menuButton} onClick={openSidebar}>
          <HiMenu size={24} />
        </button>
      )}
      <div className={styles.spacer} />
      <ThemeToggle />
    </header>
  );
}
