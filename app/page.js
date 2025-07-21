"use client";

import React from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const Dashboard = () => {
    router.push("/dashboard");
  }

  return (
    <>
      <section className={styles.home}>
        <main className={ styles.cont }>
          <h1>Welcome to NestBot</h1>
          <br />
          <p>Automate, Manage, and Grow Your Discord Server with Ease.</p>
        </main>
        <button onClick={Dashboard} className={ styles.btn }>Get Started</button>
      </section>
    </>
  );
}
