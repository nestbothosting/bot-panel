"use client";

import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AdminPanelData } from "@/apis/status";

export default function Home() {
  const router = useRouter();
  const [ip, setIP] = useState()
  const [panel, setPanel] = useState({ bots: 999, onlineboys: 999, users: 999 })

  useEffect(() => {
    (async () => {
      const response = await AdminPanelData()
      if (!response.status) return;
      setPanel({ bots: response.results.bots, onlineboys: response.results.onlinebots, users: response.results.users })
    })();
    (async function GetIP() {
      fetch('https://api.ipify.org?format=json')
        .then(res => res.json())
        .then(ip => {
          setIP(ip.ip)
        })
        .catch(err => setIP(null))
    })()
  }, [])

  const Dashboard = () => {
    const user = localStorage.getItem('user')
    if (!user) {
      const url = `https://account.nestbot.xyz/auth/login?ip=${ip}&redirect=nocodedcpanel`
      window.location.href = url
      return
    }
    router.push("/dashboard");
  }

  return (
    <section>
      <div className={styles.home}>
        <main className={styles.cont}>
          <h1>Create your own Discord bot – no <span style={{ color: "#11e909" }}>coding</span> required</h1>
          <br />
          <p>Create your own Discord bot with Nestbot’s drag-and-drop builder. Automate your server, manage your community, and launch multiple bots in minutes – all with low ping and zero coding required.</p>
          <button style={{marginTop:"20px" }} onClick={Dashboard} className={styles.btn}>Get Started</button>
        </main>
      </div>
      <div className={styles.statuscontainer}>
        <div className={styles.status}>
          <h3>{panel.users}+</h3>
          <span>Users</span>
        </div>
        <div className={styles.status}>
          <h3>{panel.bots}+</h3>
          <span>Bots Created</span>
        </div>
        <div className={styles.status}>
          <h3>{panel.onlineboys}+</h3>
          <span>Online Now</span>
        </div>
      </div>

      <div className={styles.aboutcontainer}>
        <h2>Why Choose Nestbot?</h2>

        <div className={styles.features}>
          <div className={styles.text}>
            <h3 style={{ color: "rgba(240, 78, 57, 1)" }}>Create Multiple Bots</h3>
            <p>With Nestbot, you’re not limited to just one bot.
              Build and manage <b>multiple Discord bots</b> under a single account.
              Whether you need moderation, music, or utility bots, you can launch them all from our dashboard — no coding required.</p>
          </div>
          <div className={styles.img}>
            <Image src={'/image/discordpng.png'} width={160} alt="img" height={150} className={styles.image} />
          </div>
        </div>

        <div className={styles.features}>
          <div className={styles.img} >
            <Image src={'/image/pingpng.png'} width={160} alt="img" height={150} className={styles.image} />
          </div>
          <div className={styles.text}>
            <h3 style={{ color: "rgba(57, 240, 66, 1)" }}>Low Ping & Fast</h3>
            <p>We host bots on <b>high-performance servers</b> optimized for speed and uptime.
              This ensures your commands are executed instantly with <b>ultra-low latency</b>.
              Say goodbye to lag and keep your server running smoothly 24/7.</p>
          </div>
        </div>

        <div className={styles.features}>
          <div className={styles.text}>
            <h3 style={{ color: "rgba(57, 182, 240, 1)" }}>Easy Dashboard</h3>
            <p>Our drag & drop dashboard makes it simple to design custom bot workflows.
              Manage commands, permissions, and automations visually, without writing a single line of code.
              <b>Beginner-friendly</b> but powerful enough for advanced server owners.</p>
          </div>
          <div className={styles.img}>
            <Image src={'/image/dashpng.png'} width={160} alt="img" height={150} className={styles.image} />
          </div>
        </div>

        <div className={styles.getstart}>
          <span>Start building your custom Discord bot today</span>
          <br />
          <div>
            <button onClick={Dashboard} className={styles.btn}>Get Started</button>
          </div>
        </div>

      </div>
    </section>
  );
}
