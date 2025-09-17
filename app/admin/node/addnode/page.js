"use client";

import React, { useEffect, useState } from 'react'
import { RQ_Login, isAdmin } from '@/utilise/index'
import style from './addnode.module.css'
import Cadmin from '@/components/Cadmin/Cadmin';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button/Button';
import { toast } from 'react-toastify';
import { GetUserCookies } from '@/utilise/cookies';

function SaveNode(apiKey,nodeurl,router){
  if(!apiKey && !nodeurl){
    return toast.warn("Enter Node URL And Key")
  }
  fetch('/api/add_node', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      apiKey: apiKey,
      nodeUrl: nodeurl
    })
  })
  .then(response => response.json())
  .then(data => {
    if(!data.status){
      return toast.error(data.message)
    }
    toast.success(data.message)
    setTimeout(() => {
      router.push('/admin/node')
    }, 2500);
  })
  .catch(err => toast.error('Oops Api Error'))
}

export default function page() {
  const router = useRouter();
  const [apikey,setApikey] = useState()
  const [nodeurl,setNodeurl] = useState()

  useEffect(() => {
    const user = GetUserCookies()
    RQ_Login(localStorage.getItem('login'))
    isAdmin(user, router)
  }, [])

  return (
    <section className={style.addnode}>
      <div className={style.menu}>
        <Cadmin />
      </div>
      <main className={style.main}>
        <h1>Add New Node!</h1>
        <div className={style.form}>

          <div className={style.item}>
            <span>API Key</span>
            <p>New Node API Key</p>
            <input type="text" placeholder='API Key' onChange={(e) => setApikey(e.target.value)} />
          </div>

          <div className={style.item}>
            <span>Node URL</span>
            <p>New Node URL (http://localhost:3000)</p>
            <input type="text" placeholder='Node URL' onChange={(e) => setNodeurl(e.target.value)}  />
          </div>

          <div style={{ marginTop:'10px'}} onClick={() => SaveNode(apikey,nodeurl,router)} >
            <Button name="Save" gbcolor="green" />
          </div>

        </div>
      </main>
    </section>
  )
}
