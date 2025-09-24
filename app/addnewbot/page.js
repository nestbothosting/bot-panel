'use client';

import React, { useState, useEffect } from 'react'
import style from './addnewbot.module.css'
import Cmenu from '@/components/Cmenu/Cmenu'
import Button from '@/components/Button/Button';
import { SaveBot } from '@/apis/index'
import { RQ_Login } from '@/utilise/index'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { GetUserCookies } from '@/utilise/cookies';
import { NodeStatus } from '@/apis/status';
import AdBanner from '@/components/Banner/Banner';

function Addnewbot(token, name, ownid, router, nodeid) {
  if (!token || !name || !ownid) {
    return toast.error("Please provide both bot token and name.");
  }
  SaveBot(token, name, ownid, nodeid)
    .then(data => {
      if (data.status) {
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
  const [nodeid, setNodeid] = useState('none')
  const [node, setNodes] = useState([])

  useEffect(() => {
    (async () => {
      const response = await NodeStatus()
      setNodes(response)
    })();
    RQ_Login(localStorage.getItem('login'))
    const user = GetUserCookies()
    if (!user) toast.error('Login to continue')
    setOwnid(user?.id)
  }, [])

  return (
    <section className={style.addnewbot} >
      <div className={style.menu}>
        <Cmenu />
      </div>
      <main className={style.main}>
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

        <div className={style.item}>
          <span>Location</span>
          <p>Server Location</p>
          <select onChange={(e) => setNodeid(e.target.value)}>
            <option value="none">Location.!</option>
            {node.map((node, index) => (
              <option value={node.node_cid} key={index}>{node.location}</option>
            ))}
          </select>
        </div>

        <div className={style.btn} onClick={() => Addnewbot(token, name, ownid, router, nodeid)} >
          <Button name="Save" gbcolor="#14A44D" />
        </div>

        <AdBanner />

      </main>
    </section>
  )
}
