"use client"

import React, { useState, useEffect } from 'react'
import style from './botlog.module.css'
import Cmenu from '@/components/Cmenu/Cmenu'
import { GetBotLog } from '@/apis/status'
import { toast } from 'react-toastify'
import { RQ_Login } from '@/utilise/index'

export default function page() {
    const [botlog, setBotLog] = useState([])

    useEffect(() => {
        RQ_Login(localStorage.getItem('bot'))
        const GetData = async () => {
            const response = await GetBotLog(localStorage.getItem('bot'))
            if (!response.status) return toast.error(response.message)
            setBotLog(response.log)
        }
        GetData();
    }, [])

    return (
        <div className={style.botlog} >
            <div className={style.menu} >
                <Cmenu />
            </div>
            <div className={style.main}>
                <h1>Bot Log's</h1>

                {botlog?.length === 0 ? "No Log" :
                    botlog.map((log, key) => (
                        <div className={style.logbox} key={key}>
                            <div className={style.Timestamp}>
                                <h4>Timestamp</h4>
                                <span>{log.date}</span>
                            </div>
                            <div className={style.log}>
                                <h4>Message</h4>
                                <span>{log.message}</span>
                            </div>
                            <div className={style.Action}>
                                <h4>Action</h4>
                                <span>{log.action}</span>
                            </div>
                        </div>
                    ))
                }


            </div>
        </div>
    )
}
