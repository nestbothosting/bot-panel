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
  const username = searchParams.get("username");
  const uid = searchParams.get("uid");
  const avatar = searchParams.get("avatar");
  const id = searchParams.get("id");
  const [user, setUser] = useState()
  const [bot, setBot] = useState()

  const { islogin, setLogin } = useContext(UserContext)

  useEffect(() => {
    if (username && uid && avatar && id) {
      const user = { username, uid, avatar, id };
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user)
      localStorage.setItem('login', true)
      setLogin(true)
    }
    RQ_Login(localStorage.getItem('login'))
    const strUser = localStorage.getItem('user')
    const strBot = localStorage.getItem('bot')
    if (strUser) {
      setUser(JSON.parse(strUser))
    }
    if (strBot) {
      if(strBot === "none") return;
      setBot(JSON.parse(strBot))
    }
    RQ_Login(localStorage.getItem('login'))
  }, [username, uid, avatar, id]);

  return (
    <div className={style.dashboard}>
      <div className={style.Cmenu}>
        <Cmenu />
      </div>
      <div className={style.main}>
        <div className={style.title}>
          <h1>Welcome to NestBot Panel</h1>

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

        </div>
      </div>
    </div>
  );
}
