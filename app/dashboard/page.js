"use client";

import React, { useEffect, useContext, useState } from 'react';
import { useSearchParams } from "next/navigation";
import UserContext from '@/context/usercontext';
import Cmenu from '@/components/Cmenu/Cmenu';
import style from './dashboard.module.css'
import { RQ_Login } from '@/utilise/index'
import { FaClock, FaUser, FaRobot, FaYoutube } from "react-icons/fa"
import { TbBrandMinecraft } from "react-icons/tb";
import Link from "next/link"
import AddBotMessage from '@/components/AddBotMessage/AddBotMessage'
import { GetUserCookies, SetUserCookies } from '@/utilise/cookies';
import BotMenuCotext from "@/context/botmenu";
import Script from "next/script";
import { CheckVCode } from '@/apis/status';
import { toast } from 'react-toastify';


const features = [
  { name: "Timed Message", icon: <FaClock />, link: "/dashboard/timedmessage" },
  { name: "Welcome Message", icon: <FaUser />, link: "/dashboard/welcomemessage" },
  { name: "Leave Message", icon: <FaUser />, link: "/dashboard/leavemessage" },
  { name: "YT Notification", icon: <FaYoutube />, link: "/dashboard/ytnotification" },
  { name: "Bot Log's", icon: <FaRobot />, link: "/botlog" },
  { name: "Mc Server Status", icon: <TbBrandMinecraft />, link: "/dashboard/mcstatus" },
]

export default function Page() {
  const searchParams = useSearchParams();
  const code = searchParams.get("token");
  const [user, setUser] = useState()
  const [bot, setBot] = useState()

  const { islogin, setLogin } = useContext(UserContext)
  const { inbot, setInbot } = useContext(BotMenuCotext)


  useEffect(() => {
    (async () => {
      if (code) {
        const response = await CheckVCode(code)
        if(!response.status) return toast.error(response.message)
        SetUserCookies(response.user)
        setUser(response.user)
        localStorage.setItem('login', true)
        setLogin(true)
      }
      RQ_Login(localStorage.getItem('login'))
      const strUser = GetUserCookies()
      const strBot = localStorage.getItem('bot')
      if (strUser) {
        setUser(strUser)
      }
      if (strBot) {
        if (strBot === "none") return;
        setBot(JSON.parse(strBot))
      }
      RQ_Login(localStorage.getItem('login'))
      setInbot({ bot: true })
    })();
  }, [code]);

  return (
    <section className={style.dashboard}>
      <div className={style.Cmenu}>
        <Cmenu />
      </div>
      <main className={style.main}>
        <div className={style.title}>
          <h1>Welcome to NestBot Panel</h1>

          <AddBotMessage />

          <div className={style.featureGrid}>
            {features.map((feature, index) => (
              <Link href={feature.link} key={index} className={style.featureCard}>
                <div className={style.featureIcon}>{feature.icon}</div>
                <span className={style.featureName}>{feature.name}</span>
              </Link>
            ))}
          </div>

          <div className={style.userGreeting}>
            <h3>Hello, <span>{user?.username}</span> 👋</h3>
            <p>You’re managing <strong>{bot?.bot_name}</strong>. Let's make it awesome!</p>
          </div>

          <Script
            src="//pl27706671.revenuecpmgate.com/3e0e04403a745660901311365b4cfb1f/invoke.js"
            strategy="afterInteractive"
            async
            data-cfasync="false"
          />

          <div id="container-3e0e04403a745660901311365b4cfb1f"></div>

        </div>
      </main>
    </section>
  );
}
