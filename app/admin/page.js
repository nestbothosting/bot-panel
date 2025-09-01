"use client";

import Cadmin from '@/components/Cadmin/Cadmin'
import React, { useEffect, useState } from 'react'
import style from './admin.module.css'
import { RQ_Login, isAdmin } from '@/utilise/index'
import { useRouter } from 'next/navigation';
import { AdminPanelData } from '@/apis/status'
import { toast } from 'react-toastify';

export default function page() {
  const router = useRouter();
  const [paneldata, setPaneldata] = useState({})

  useEffect(() => {
    (async () => {
      const response = await AdminPanelData()
      if (!response.status) return toast.error(response.message)
      setPaneldata(response.results)
      console.log(response)
    })();
    RQ_Login(localStorage.getItem('login'))
    isAdmin(localStorage.getItem('user'), router)
  }, [])

  return (
    <section className={style.admin} >
      <div className={style.menu} >
        <Cadmin />
      </div>
      <main className={style.main} >
        <h1 style={{ textAlign: "center" }}>Admin Panel</h1>
        <div className={style.container}>

          <div className={style.box}>
            <b><p>Users</p></b>
            <span>{  paneldata.users }</span>
          </div>

          <div className={style.box}>
            <b><p>Bots</p></b>
            <span>{  paneldata.bots }</span>
          </div>

          <div className={style.box}>
            <b><p>OnlineBots</p></b>
            <span>{ paneldata.onlinebots }</span>
          </div>

          <div className={style.box}>
            <b><p>Auto Replay</p></b>
            <span>{ paneldata.autoreplay }</span>
          </div>

          <div className={style.box}>
            <b><p>Auto RD</p></b>
            <span>{ paneldata.autoroleadd }</span>
          </div>

          <div className={style.box}>
            <b><p>Tickets</p></b>
            <span>{ paneldata.tickets }</span>
          </div>

          <div className={style.box}>
            <b><p>Youtube NS</p></b>
            <span>{ paneldata.yns }</span>
          </div>

          <div className={style.box}>
            <b><p>Timed MS</p></b>
            <span>{ paneldata.timedmsg }</span>
          </div>

        </div>
      </main>
    </section>
  )
}
