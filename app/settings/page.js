"use client"

import React, { useEffect } from 'react'
import Cmenu from '@/components/Cmenu/Cmenu'
import style from './settings.module.css'
import Button from '@/components/Button/Button';
import { RQ_Login } from '@/utilise/index'

export default function page() {

    useEffect(() => {
        RQ_Login(localStorage.getItem('login'))
    },[])

    return (
        <div className={style.settings}>
            <div className={style.Cmenu}>
                <Cmenu />
            </div>
            <div className={style.main}>
                <h1>Bot Settings</h1>
                <div className={style.botname}>
                    <span>Your bot's Name</span>
                    <input type="text" placeholder='Your bots username' />
                </div>

                <div className={style.stmessage}>
                    <span>Bot Status Message</span>
                    <p>Change the Made with bothoster.com to your own custom status message</p>
                    <input type="text" placeholder='Bot Status Message' />
                </div>

                <h2>Settings</h2>

                <div className={style.token}>
                    <span>Bot Token</span>
                    <p>Your bot's token from Discord Developer Portal</p>
                    <input type="text" placeholder='Bot Token' />
                </div>

                <div className={style.status}>
                    <section>
                        <span>Bot Status</span>
                        <p>Offline</p>
                    </section>
                    <div>
                        <Button name='Start' gbcolor='white' color='black' />
                    </div>
                </div>

                <div className={style.delete}>
                    <section>
                        <span>Remove Bot</span>
                        <p>Permanently remove this bot from this site</p>
                    </section>
                    <div>
                        <Button name='Delete' color='white' gbcolor="red"/>
                    </div>
                </div>
            </div>
        </div>
    )
}
