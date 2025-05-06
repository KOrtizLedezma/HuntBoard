"use client";

import Header from "./components/globals/Header";
import Title from "./components/welcome_page/Title";
import Slogan from "./components/welcome_page/Slogan";
import Button from "./components/globals/Button";

import { useRouter } from "next/navigation";

export default function Home() {
  
  const router = useRouter();

  const handleClick = () => {
    router.push("/login-register");
  }
  
  return (
    <>
      <Header />
      <main>
        <Title>Hunt Board</Title>
        <Slogan>Track your path. Land the job</Slogan>
        <Button onClick={handleClick}>Let's Start</Button>
      </main>
    </>
  );
}
