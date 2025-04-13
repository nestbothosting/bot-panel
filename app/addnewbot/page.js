'use client';

import React, { useState, useEffect } from 'react'
import style from './addnewbot.module.css'
import Cmenu from '@/components/Cmenu/Cmenu'
import Button from '@/components/Button/Button';
import { SaveBot } from '@/apis/index'
import { RQ_Login } from '@/utilise/index'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

function Addnewbot(token, name, ownid, router) {
  if (!token || !name || !ownid) {
    return toast.error("Please provide both bot token and name.");
  }
  SaveBot(token, name, ownid)
  .then(data => {
    if(data.status){
      toast.success(data.message)
      setTimeout(() => {
        router.push('/dashboard')
      }, 1500);
      return 
    }
    toast.error(data.message)
  })
  .catch(err => toast.error(err.message))
}

export default function page() {
  const router = useRouter();
  const [token, setToken] = useState()
  const [name, setName] = useState()
  const [ownid, setOwnid] = useState()

  useEffect(() => {
    RQ_Login(localStorage.getItem('login'))
    const user = JSON.parse(localStorage.getItem('user'))
    setOwnid(user.id)
  }, [])

  return (
    <div className={style.addnewbot} >
      <div className={style.menu}>
        <Cmenu />
      </div>
      <div className={style.main}>
        <h1>Add A Bot!</h1>

        <div className={style.item}>
          <span>Bot Name</span>
          <p>Enter This Site Bot Nickname</p>
          <input type="text" placeholder='Bot Name' onChange={(e) => setName(e.target.value)} />
        </div>

        <div className={style.item}>
          <span>Bot Token</span>
          <p>Your bot's token from Discord Developer Portal</p>
          <input type="text" placeholder='Bot Token' onChange={(e) => setToken(e.target.value)} />
        </div>

        <div className={style.btn} onClick={() => Addnewbot(token, name, ownid, router)} >
          <Button name="Save" gbcolor="#14A44D" />
        </div>

      </div>
    </div>
  )
}
