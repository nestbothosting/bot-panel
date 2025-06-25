// import styles from "./page.module.css";
"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/dashboard");
  },[])
  return (
    <>

    </>
  );
}
