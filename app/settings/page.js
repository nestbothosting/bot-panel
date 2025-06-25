"use client"

import React, { useEffect, useState, useContext } from 'react'
import Cmenu from '@/components/Cmenu/Cmenu'
import style from './settings.module.css'
import Button from '@/components/Button/Button';
import { RQ_Login } from '@/utilise/index'
import { GetOneBot, SaveChange } from '@/utilise/api'
import { toast } from 'react-toastify';
import BotMenuCotext from '@/context/botmenu';
import { StartBot, StopBot, DeleteBot } from '@/apis/index'
import { BotStatus } from '@/apis/status'
import MessageBox from '@/components/MessageBox/MessageBox';

async function handleonSave(bot_id, bot_name, bot_token, st_message) {
    try {
        const resposne = await SaveChange(bot_id, bot_name, bot_token, st_message)
        if (resposne.status) {
            return toast.success(resposne.message)
        }
        toast.error(resposne.message)
    } catch (error) {
        toast.error("Oops Server Error")
    }
}

async function handleStart(bot_token, bot_id, setStatus) {
    console.log('Helo')
    const response = await StartBot(bot_token, bot_id)
    if (response.status) {
        setStatus(true)
        return toast.success(response.message)
    }
    toast.warn(response.message)
}

async function handleStop(bot_token, bot_id, setStatus) {
    const response = await StopBot(bot_token, bot_id)
    if (response.status) {
        setStatus(false)
        return toast.success(response.message)
    }
    toast.warn(response.message)
}

async function handleDelete(bot_id,setDeletebot) {
    if (confirm("are you sure!")) {
        const response = await DeleteBot(bot_id)
        if(response.status){
            localStorage.setItem('bot','none')
            setDeletebot(true)
            return toast.success(response.message)
        }
        toast.error(response.message)
    }
}

export default function page() {
    const [bot_id, setBotid] = useState()
    const [bot_name, setBotname] = useState('')
    const [bot_token, setToken] = useState('')
    const [st_message, setStmessage] = useState('')
    const [botstatus, setStatus] = useState(false)
    const [deletebot,setDeletebot] = useState()
    const { inbot, setInbot } = useContext(BotMenuCotext)

    useEffect(() => {
        RQ_Login(localStorage.getItem('login'))

        BotStatus(localStorage.getItem('bot'))
            .then(data => {
                if (data.status) {
                    setStatus(true)
                }
            })
            .catch(err => console.log(err))
            
        const botsri = localStorage.getItem('bot')
        if(botsri === 'none') return;
        const bot = JSON.parse(botsri)
        if (!bot) {
            if(deletebot){
                return;
            }
            toast.warn('Select a Bot')
        } else {
            GetOneBot(bot.bot_id)
                .then(data => {
                    if (data.status) {
                        setBotid(data.bot._id || "")
                        setBotname(data.bot.bot_name || "")
                        setToken(data.bot.bot_token || "")
                        setStmessage(data.bot.st_message || "")
                    }
                    toast.error(data.message)
                })
                .catch(err => toast.error('Oops Server Error'))
        }


    }, [inbot,deletebot])

    return (
        <div className={style.settings}>
            <div className={style.Cmenu}>
                <Cmenu />
            </div>
            <div className={style.main}>
                <MessageBox />
                <h1>Bot Settings</h1>
                <div className={style.botname}>
                    <span>Your bot's Name</span>
                    <input type="text" placeholder='Your bots name' value={bot_name} onChange={(e) => setBotname(e.target.value)} />
                </div>

                <div className={style.stmessage}>
                    <span>Bot Status Message</span>
                    <p>Change the Made with bothoster.com to your own custom status message</p>
                    <input type="text" placeholder='Bot Status Message' value={st_message} onChange={(e) => setStmessage(e.target.value)} />
                </div>

                <h2>Settings</h2>

                <div className={style.token}>
                    <span>Bot Token</span>
                    <p>Your bot's token from Discord Developer Portal</p>
                    <input type="password" placeholder='Bot Token' value={bot_token} onChange={(e) => setToken(e.target.value)} />
                </div>

                <div className={style.save}>
                    <section>
                        <span>Save all Changes</span>
                    </section>
                    <div onClick={() => handleonSave(bot_id, bot_name, bot_token, st_message)}>
                        <Button name='Save' gbcolor='#14A44D' color='black' />
                    </div>
                </div>

                {botstatus ?
                    <div className={style.status}>
                        <section>
                            <span>Bot Status</span>
                            <p style={{ color: "green" }}>Online</p>
                        </section>
                        <div onClick={() => handleStop(bot_token, bot_id, setStatus)}>
                            <Button name='Stop' gbcolor='red' color='white' />
                        </div>
                    </div>
                    :
                    <div className={style.status}>
                        <section>
                            <span>Bot Status</span>
                            <p style={{ color: "red" }}>Offline</p>
                        </section>
                        <div onClick={() => handleStart(bot_token, bot_id, setStatus)}>
                            <Button name='Start' gbcolor='#14A44D' color='black' />
                        </div>
                    </div>
                }

                <div className={style.delete}>
                    <section>
                        <span>Remove Bot</span>
                        <p>Permanently remove this bot from this site</p>
                    </section>
                    <div onClick={() => handleDelete(bot_id, setDeletebot)}>
                        <Button name='Delete' color='white' gbcolor="red" />
                    </div>
                </div>
            </div>
        </div>
    )
}
