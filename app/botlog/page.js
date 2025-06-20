"use client"

import React from 'react'
import style from './botlog.module.css'
import Cmenu from '@/components/Cmenu/Cmenu'

export default function page() {
    return (
        <div className={style.botlog} >
            <div className={style.menu} >
                <Cmenu />
            </div>
            <div className={style.main}>
                <h1>Bot Log's</h1>
                <div className={style.logbox} >
                    <div className={style.Timestamp}>
                        <h4>Timestamp</h4>
                        <span>20/09/2025</span>
                    </div>
                    <div className={style.log}>
                        <h4>Message</h4>
                        <span>Create New Bot - bot Api /create/bot - 1020120092887</span>
                    </div>
                    <div className={ style.Action }>
                        <h4>Action</h4>
                        <span>Create Bot</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
