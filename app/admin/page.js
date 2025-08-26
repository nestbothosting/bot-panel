"use client";

import Cadmin from '@/components/Cadmin/Cadmin'
import React, { useEffect } from 'react'
import style from './admin.module.css'
import { RQ_Login, isAdmin } from '@/utilise/index'
import { useRouter } from 'next/navigation';

export default function page() {
  const router = useRouter();

  useEffect(() => {
    RQ_Login(localStorage.getItem('login'))
    isAdmin(localStorage.getItem('user'),router)
  },[])

  return (
    <section className={style.admin} >
      <div className={ style.menu } >
        <Cadmin />
      </div>
      <main className={ style.main } >
        <h1 style={{ textAlign:"center" }}>Admin Panel</h1>
        <div className={ style.container }>

          <div className={ style.box }>
            <b><p>Bots</p></b>
            <span>103</span>
          </div>

          <div className={ style.box }>
            <b><p>OnlineBots</p></b>
            <span>19</span>
          </div>

          <div className={ style.box }>
            <b><p>Auto Replay</p></b>
            <span>19</span>
          </div>

          <div className={ style.box }>
            <b><p>Auto RD</p></b>
            <span>19</span>
          </div>

          <div className={ style.box }>
            <b><p>Tickets</p></b>
            <span>19</span>
          </div>

          <div className={ style.box }>
            <b><p>Youtube NS</p></b>
            <span>19</span>
          </div>

        </div>
      </main>
    </section>
  )
}
