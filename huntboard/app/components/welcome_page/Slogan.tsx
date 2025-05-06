import React from "react";
import styles from "./Slogan.module.css";

interface SloganProps {
  children: React.ReactNode;
}

export default function Slogan({ children }: SloganProps) {
  return <p className={styles.slogan}>{children}</p>;
}
