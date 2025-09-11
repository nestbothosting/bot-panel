"use client";

import { useState, useEffect, useContext } from 'react';
import styles from './header.module.css';
import Link from 'next/link';
import { LogOut } from '@/utilise/index';
import { VscThreeBars } from "react-icons/vsc";
import { FaDiscord } from "react-icons/fa";
import UserContext from '@/context/usercontext';
import { LuLogOut } from "react-icons/lu";
import { Luckiest_Guy } from 'next/font/google'

const luckyguy = Luckiest_Guy({ subsets: ['latin'], weight: ['400'], display: 'swap' })

const Header = () => {
  const [showNav, setShowNav] = useState(false);
  const toggleNav = () => setShowNav(prev => !prev);
  const { islogin, setLogin } = useContext(UserContext)
  const [userProfile, setUserProfile] = useState({})
  const [ip, setIP] = useState()

  useEffect(() => {
    if (localStorage.getItem('login')) {
      let userdata = JSON.parse(localStorage.getItem('user'));
      if(userdata.avatar === 'null' || !userdata.avatar) userdata.avatar = null
      setUserProfile({ id: userdata.uid, avatar: userdata.avatar })
      setLogin(true)
    }
    (async function GetIP() {
      fetch('https://api.ipify.org?format=json')
        .then(res => res.json())
        .then(ip => {
          setIP(ip.ip)
        })
        .catch(err => setIP(null))
    })()
  }, [UserContext, islogin])

  const DiscordAUth = (ip) => {
    const url = `https://account.nestbot.xyz/auth/login?ip=${ip}&redirect=nocodedcpanel`
    window.location.href = url
  }

  return (
    <>
      <header className={styles.header}>
        <div className={`${styles.logo} ${luckyguy.className}`}>NestBot</div>

        {/* Desktop nav */}
        <nav className={styles.nav}>
          <ul className={styles.navLinks}>
            {/* <li><Link href="/">Home</Link></li> */}
            <li><Link href="/dashboard">Dashboard</Link></li>
            {islogin ?
              <li className={styles.logout} onClick={() => LogOut(setLogin)}><LuLogOut />Log Out</li>
              :
              <li className={styles.login} onClick={() => { DiscordAUth(ip); setShowNav(false); }}><FaDiscord /> Log in</li>
            }
            <li className={styles.discord}><a href="https://discord.gg/J83zQvaV6U"><FaDiscord />Discord</a></li>
            {islogin ?
              <div className={styles.userimg}>
                <img src={userProfile.avatar ? `https://cdn.discordapp.com/avatars/${userProfile?.id}/${userProfile?.avatar}.png`: 'https://cdn.discordapp.com/embed/avatars/0.png'} alt="avater" />
              </div> : ""
            }
          </ul>
        </nav>

        {/* Burger icon (shown on mobile only) */}
        <div className={styles.nav_icon}>
          <VscThreeBars size={38} onClick={toggleNav} />
        </div>
      </header>

      {/* Mobile nav (shown below header when clicked) */}
      <div id="nav-items" className={`${styles.resnav} ${showNav ? styles.show : ''}`}>
        <ul className={styles.navLinks}>
          <li><Link href="/" onClick={() => setShowNav(false)}>Home</Link></li>
          <li><Link href="/dashboard" onClick={() => setShowNav(false)}>Dashboard</Link></li>
          {islogin ?
            <li className={styles.logout} onClick={() => LogOut(setLogin)}><LuLogOut /> Log Out</li>
            :
            <li className={styles.login} onClick={() => { DiscordAUth(ip); setShowNav(false); }}><FaDiscord /> Log in</li>
          }
          {islogin ?
            <div className={styles.userimg}>
              <img src={userProfile.avatar ? `https://cdn.discordapp.com/avatars/${userProfile?.id}/${userProfile?.avatar}.png` : 'https://cdn.discordapp.com/embed/avatars/0.png'} alt="avater" />
            </div> : ""
          }
        </ul>
      </div>
    </>
  );
};

export default Header;
