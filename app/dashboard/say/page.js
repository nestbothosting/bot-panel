"use client"

import React, { useState, useEffect, useContext } from 'react'
import style from './say.module.css'
import Cmenu from '@/components/Cmenu/Cmenu'
import Button from '@/components/Button/Button'
import BotMenuCotext from '@/context/botmenu'
import { GetMyChannels, GetSettingsData } from '@/utilise/api'
import { toast } from 'react-toastify'
import { sendSayMessage } from '@/apis/index'
import MessageBox from '@/components/MessageBox/MessageBox'

const SendData = async (server_id, channel_id, message) => {
    const response = await sendSayMessage(server_id, channel_id, message, localStorage.getItem('bot'))
    if(!response.status) return toast.error(response.message)
    toast.success(response.message)
}

export default function page() {
    const { inbot, setInbot } = useContext(BotMenuCotext)

    const [serverList,setServerList] = useState([])
    const [channelIst,setChanneList] = useState([])

    const [server_id,setServerID] = useState()
    const [channel_id,setChannelID] = useState()
    const [message,setMessage] = useState()

    useEffect(() => {
        const fetchServers = async () => {
            const response = await GetSettingsData(localStorage.getItem('bot'))
            if(!response.status) return toast.error(response.message);
            setServerList(response.servers)
        }
        fetchServers()
    },[inbot])

    const fetchChannels = async (serid) => {
        if(serid === 'none') return;
        const response = await GetMyChannels(serid, localStorage.getItem('bot'))
        if(!response.status) return toast.error(response.message)
        setChanneList(response.channels)
        setServerID(serid)
    } 

    return (
        <section className={style.say}>
            <div className={style.menu}>
                <Cmenu />
            </div>
            <main className={style.main}>
                <MessageBox />
                <h1>Say Text Message</h1>
                <p>This lets the bot send a custom message to a selected channel in your server.</p>

                <div className={ style.select }>
                    <label htmlFor="server">Select a Server</label>
                    <select onChange={(e) => fetchChannels(e.target.value)}>
                        <option value="">Select Server...</option>
                        {serverList.map((server,key) => (
                            <option value={ server.id } key={key}>{server.name}</option>
                        ))}
                    </select>
                </div>

                <div className={ style.select }>
                    <label htmlFor="channel">Select a Channel</label>
                    <select onChange={(e) => setChannelID(e.target.value)}>
                        <option value="">Select Channel...</option>
                        {channelIst.map((channel,key) => (
                            <option value={channel.id} key={key}>{channel.name}</option>
                        ))}
                    </select>
                </div>

                <div className={ style.input }>
                    <label htmlFor="message">Text Message</label>
                    <input type="text" placeholder='Message..' onChange={(e) => setMessage(e.target.value)}/>
                </div>
                
                <div className={ style.btn }>
                    <span onClick={() => SendData(server_id, channel_id, message)}>
                        <Button name='Send' gbcolor='#14A44D' />
                    </span>
                </div>
            </main>
        </section>
    )
}
