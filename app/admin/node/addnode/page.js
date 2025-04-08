"use client";


import React,{ useEffect } from 'react'
import { RQ_Login } from '@/utilise/index'
import style from './addnode.module.css'
import Cadmin from '@/components/Cadmin/Cadmin';

export default function page() {

  useEffect(() => {
    RQ_Login(localStorage.getItem('login'))
  },[])
  return (
    <div className={ style.addnode }>
      <div className={ style.menu}>
        <Cadmin />
      </div>
      <div className={ style.main }>
        helo
      </div>
    </div>
  )
}
