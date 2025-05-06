"use client";

import React, { useState } from "react";
import Input from "./Input";
import Button from "@/app/components/globals/Button"
import styles from "./AuthForm.module.css";

import { useRouter } from "next/navigation";


export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const handleLogin = () => {
    router.push("/dashboard");
  }

  const handleRegister = () => {
    router.push("/dashboard");
  }

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${isLogin ? styles.active : ""}`}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          className={`${styles.tab} ${!isLogin ? styles.active : ""}`}
          onClick={() => setIsLogin(false)}
        >
          Register
        </button>
      </div>

      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <Input label="Email" type="email" name="email" required />
        <Input label="Password" type="password" name="password" required />

        {!isLogin && (
          <Input label="Confirm Password" type="password" name="confirm" required />
        )}

        <Button type="submit" onClick={isLogin ? handleLogin : handleRegister}>{isLogin ? "Login" : "Register"}</Button>
      </form>
    </div>
  );
}
