"use client"

import React from 'react'
import style from './mcstatus.module.css'
import Cmenu from '@/components/Cmenu/Cmenu'
import Button from '@/components/Button/Button'

export default function page() {
  return (
    <div className={style.mcstatus}>
      <div className={style.menu}>
        <Cmenu />
      </div>
      <div className={style.main}>
        <h1>Minecraft Server Status</h1>

        <div className={style.select}>
          <select >
            <option value="none">Server...</option>
          </select>
        </div>

        <div className={style.select}>
          <select >
            <option value="none">Channel...</option>
          </select>
        </div>

        <div className={style.text}>
          <span>Server IP</span>
          <input type="text" placeholder='Server IP' />
        </div>

        <h3>Optional</h3>

        <div className={style.text}>
          <span>Server PORT  Default 25565</span>
          <input type="text" placeholder='Server PORT ' />
        </div>

        <div className={style.text}>
          <span>Title</span>
          <input type="text" placeholder='Title' />
        </div>

        <div className={style.text}>
          <span>Description</span>
          <input type="text" placeholder='Description' />
        </div>

        <div className={style.text}>
          <span>Offline Icon </span>
          <input type="text" placeholder='Offline icon' />
        </div>

        <div className={style.text}>
          <span>Online Icon </span>
          <input type="text" placeholder='Onlie icon' />
        </div>

        <div className={style.text}>
          <span>Thumbnail URL</span>
          <input type="text" placeholder='Thumbnail URL' />
        </div>

        <div className={style.btn}>
          <span>
            <Button name='Send' color="blacg" gbcolor="#14A44D" />
          </span>
        </div>
      </div>
    </div>
  )
}
