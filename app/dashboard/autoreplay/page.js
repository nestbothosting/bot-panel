'use client'

import React, { useState, useEffect, useContext } from 'react'
import style from './autoreplay.module.css'
import Cmenu from '@/components/Cmenu/Cmenu'
import { GetSettingsData } from '@/utilise/api'
import { toast } from 'react-toastify'
import MessageBox from '@/components/MessageBox/MessageBox'
import { RQ_Login } from '@/utilise'
import BotMenuCotext from '@/context/botmenu';
import Button from '@/components/Button/Button'
import { fechAutoRoleData, SendAutoReplaySTM } from '@/utilise/apis'
import AutoReplayBox from '@/components/AutoReplayBox/AutoReplayBox'
import AdBanner from '@/components/Banner/Banner'

const SendAPI = async (serverdata, messagekey, messageReplay, GetAutoRData) => {
    const response = await SendAutoReplaySTM(serverdata, messagekey, messageReplay, localStorage.getItem('bot'))
    if (!response.status) return toast.error(response.message)
    toast.success(response.message)
    GetAutoRData(serverdata.server_id)
}

export default function page() {
    const [serverList, setServerList] = useState([])
    const [autoRPList, setAutoRPList] = useState([])
    const { inbot, setInbot } = useContext(BotMenuCotext)

    const [serverdata, setServerData] = useState({})
    const [messagekey, setMessageKey] = useState('!hi')
    const [messageReplay, setMessageReplay] = useState('Hello!')
    const [r,setR] = useState(0)

    const GetServerMessageData = async (e) => {
        setServerData({ server_id: e.target.value, name: e.target.options[e.target.selectedIndex].text })
        GetAutoRData(e.target.value)
    }

    const GetAutoRData = async (server_id) => {
        if(!server_id) return
        const response = await fechAutoRoleData(server_id, localStorage.getItem('bot'))
        if (!response.status) return
        setAutoRPList(response.autoreplays)
    }

    useEffect(() => {
        if(r > 0){
            GetAutoRData(serverdata.server_id)
        }
        (async () => {
            const response = await GetSettingsData(localStorage.getItem('bot'))
            if (!response.status) return toast.error(response.message);
            setServerList(response.servers)
        })();
        RQ_Login(localStorage.getItem('login'))
    }, [inbot,r])

    return (
        <section className={style.autoreplay}>
            <div className={style.menu}>
                <Cmenu />
            </div>
            <main className={style.main}>
                <MessageBox />
                <AdBanner />
                <h1>Auto Replay</h1>
                {autoRPList.length > 0 ? <h2>4/{autoRPList.length}</h2> : ""}
                {autoRPList.length === 0 ? "" :
                    autoRPList.map((data, key) => (
                        <AutoReplayBox key={key} servername={data.server_name} mkey={data.message_key} mvalue={data.message_value} cid={data._id} setR={setR} />
                    ))
                }
                <div className={style.select}>
                    <label htmlFor="server">Select a Server.</label>
                    <select onChange={(e) => GetServerMessageData(e)}>
                        <option value="">server...</option>
                        {serverList.map((server, key) => (
                            <option value={server.id} key={key} >{server.name}</option>
                        ))}
                    </select>
                </div>

                <div className={style.select}>
                    <label htmlFor="key">Enter Message (Key)</label>
                    <input type="text" placeholder='Message' onChange={(e) => setMessageKey(e.target.value)} value={messagekey} />
                </div>

                <div className={style.select}>
                    <label htmlFor="key">Enter Replay (value)</label>
                    <input type="text" placeholder='Replay' onChange={(e) => setMessageReplay(e.target.value)} value={messageReplay} />
                </div>

                <div className={style.btn}>
                    <span onClick={() => SendAPI(serverdata, messagekey, messageReplay,GetAutoRData)}>
                        <Button name='Set' gbcolor="#14A44D" />
                    </span>
                </div>
                <AdBanner />
            </main>
        </section>
    )
}
