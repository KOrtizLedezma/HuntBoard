"use client";

import React, { useState } from "react";
import Input from "./Input";
import Button from "@/app/components/globals/Button";
import styles from "./AuthForm.module.css";
import { useRouter } from "next/navigation";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleAuth = async () => {
    const endpoint = isLogin
      ? "http://127.0.0.1:8000/api/login/"
      : "http://127.0.0.1:8000/api/register/";

    const payload = {
      username: email,
      password: password,
    };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Something went wrong.");
        return;
      }

      if (isLogin) {
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);
        router.push("/dashboard");
      } else {
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);
        router.push("/dashboard");
      }
    } catch (err) {
      setError("Network error.");
    }
  };

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

      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          handleAuth();
        }}
      >
        <Input
          label="Email"
          type="email"
          name="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        {!isLogin && (
          <Input
            label="Confirm Password"
            type="password"
            name="confirm"
            required
            onChange={(e) => setConfirm(e.target.value)}
          />
        )}

        {error && <p style={{ color: "red" }}>{error}</p>}

        <Button type="submit">
          {isLogin ? "Login" : "Register"}
        </Button>
      </form>
    </div>
  );
}
