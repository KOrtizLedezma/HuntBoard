"use client";
import Header from "../components/globals/Header";
import AuthForm from "../components/login-register/AuthForm";

import { useRouter } from "next/navigation";

export default function Home() {
  
  return (
    <>
      <Header />
      <main style={{ paddingTop: "4rem" }}>
        <AuthForm />
      </main>
    </>
  );
}
