"use client"

import React,{ useState } from 'react'
import style from './timedmessage.module.css'
import Cmenu from '@/components/Cmenu/Cmenu'
import { IoMdTime } from "react-icons/io";
import Button from '@/components/Button/Button';


export default function page() {
  const [tday,setTday] = useState(0)
  const [thours,setThours] = useState(2)

  return (
    <div className={ style.timedmessage }>

      <div className={ style.menu} >
        <Cmenu />
      </div>

      <div className={ style.main } >
        <h1 className={ style.title }>Timed Message  <IoMdTime size={35} color='aqua'/></h1>

        <div className={ style.inputbox }>
            <span>Select a Server</span>
            <select>
                <option value="none">Server...</option>
            </select>
        </div>

        <div className={ style.inputbox }>
            <span>Select a Channel</span>
            <select>
                <option value="none">channel...</option>
            </select>
        </div>

        <div className={ style.inputbox }>
            <h4>Time Interval - Days</h4>
            <span>Choose the amount of days of a delay you want to have between timed messages that are sent.</span>
            <input type="number" placeholder='0 - 30' value={tday} onChange={(e) => setTday(e.target.value)} />
        </div>

        <div className={ style.inputbox }>
            <h4>Time Interval - Hours</h4>
            <span>Choose the amount of hours of a delay you want to have between timed messages that are sent.</span>
            <input type="number" placeholder='0 - 24' value={thours} onChange={(e) => setThours(e.target.value)} />
        </div>

        <div className={ style.inputbox }>
            <p>Time Interval - Minutes</p>
            <span>Choose the amount of minutes of a delay you want to have between timed messages that are sent. You are only able to specify a timeframe in 5 minute steps.</span>
            <select>
                <option value="0">0 Minutes</option>
                <option value="5">5 Minutes</option>
                <option value="10">10 Minutes</option>
                <option value="15">15 Minutes</option>
                <option value="20">20 Minutes</option>
                <option value="25">25 Minutes</option>
                <option value="30">30 Minutes</option>
                <option value="35">35 Minutes</option>
                <option value="40">40 Minutes</option>
                <option value="45">45 Minutes</option>
                <option value="50">50 Minutes</option>
                <option value="55">55 Minutes</option>
                <option value="60">60 Minutes</option>
            </select>
        </div>

        <div className={ style.inputbox }>
            <h4>Message</h4>
            <span>Enter Interval Text Messages</span>
            <input type="number" placeholder='Enter Your Loop Message'  />
        </div>

        <span>Embed Message Coming Soon.!</span>

        <div className={ style.btn } >
            <span>
                <Button name='Create' gbcolor='#14A44D' color='white' />
            </span>
        </div>
        
      </div>
    </div>
  )
}
