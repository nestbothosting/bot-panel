"use client";

import { useState, useEffect, useContext } from 'react';
import styles from './header.module.css';
import Link from 'next/link';
import { DiscordAUth, LogOut } from '@/utilise/index';
import { VscThreeBars } from "react-icons/vsc";
import { FaDiscord } from "react-icons/fa";
import UserContext from '@/context/usercontext';
import { LuLogOut } from "react-icons/lu";

const Header = () => {
  const [showNav, setShowNav] = useState(false);
  const toggleNav = () => setShowNav(prev => !prev);
  const { islogin, setLogin } = useContext(UserContext)

  useEffect(() => {
    if (localStorage.getItem('login')) {
      setLogin(true)
    }
  }, [UserContext])

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>Bothost</div>

        {/* Desktop nav */}
        <nav className={styles.nav}>
          <ul className={styles.navLinks}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/dashboard">Dashboard</Link></li>
            {islogin ?
              <li className={styles.logout} onClick={() => LogOut(setLogin)}><LuLogOut />Log Out</li>
              :
              <li className={styles.login} onClick={() => { DiscordAUth(); setShowNav(false); }}><FaDiscord /> Log in</li>
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
            <li className={styles.login} onClick={() => { DiscordAUth(); setShowNav(false); }}><FaDiscord /> Log in</li>
          }
        </ul>
      </div>
    </>
  );
};

export default Header;
