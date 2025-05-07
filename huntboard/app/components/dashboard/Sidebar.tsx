"use client";

import { useEffect, useState } from "react";
import styles from "./Sidebar.module.css";

type SidebarProps = {
  selected: string;
  onSelect: (item: string) => void;
};

export default function Sidebar({selected, onSelect}: SidebarProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const openListener = () => setIsOpen(true);
    window.addEventListener("sidebarOpen", openListener);
    return () => window.removeEventListener("sidebarOpen", openListener);
  }, []);

  if (isMobile && !isOpen) return null;

  return (
    <>
      {isMobile && (
        <div className={styles.backdrop} onClick={() => {setIsOpen(false); window.dispatchEvent(new Event("sidebarClose"));}} />
      )}
      <aside className={`${styles.sidebar} ${isMobile ? styles.mobile : ""}`}>
        {isMobile && (
          <button className={styles.closeButton} onClick={() => {setIsOpen(false); window.dispatchEvent(new Event("sidebarClose"));}}>
            ×
          </button>
        )}
        <h2>Dashboard</h2>
        <ul>
          {["Job Applications", "Analytics", "Resume", "Logout"].map((item) => (
          <li key={item}>
            <a
              href="#"
              className={selected === item ? styles.activeLink : ""}
              onClick={() => {
                onSelect(item);
                if (isMobile) 
                  setIsOpen(false);
                  window.dispatchEvent(new Event("sidebarClose"));
                }
              }
            >
              {item}
            </a>
          </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
