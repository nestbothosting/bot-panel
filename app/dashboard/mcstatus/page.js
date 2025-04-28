"use client"

import React from 'react'
import style from './mcstatus.module.css'
import Cmenu from '@/components/Cmenu/Cmenu'

export default function page() {
  return (
    <div className={ style.mcstatus }>
      <div className={ style.menu }>
        <Cmenu />
      </div>
      <div className={ style.main }>
        helo
      </div>
    </div>
  )
}
