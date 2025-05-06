"use client";

import { useEffect, useState } from "react";
import styles from "./ThemeToggle.module.css";
import { HiMoon, HiSun } from "react-icons/hi";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const isDarkSaved = saved === "dark";
    if (isDarkSaved) document.documentElement.classList.add("dark");
    setIsDark(isDarkSaved);
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    const newDark = !isDark;

    if (newDark) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }

    setIsDark(newDark);
  };

  return (
    <button className={styles.toggleButton} onClick={toggleTheme}>
      {isDark ? <HiSun size={24} /> : <HiMoon size={24} />}
    </button>
  );
}
