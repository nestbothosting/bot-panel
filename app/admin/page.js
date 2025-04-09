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
    <div className={style.admin} >
      <div className={ style.menu } >
        <Cadmin />
      </div>
      <div className={ style.main } >
        helo
      </div>
    </div>
  )
}
