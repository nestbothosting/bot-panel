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
import { SendAutoReplaySTM } from '@/utilise/apis'

const SendAPI = async (serverdata, messagekey, messageReplay) => {
    const response = await SendAutoReplaySTM(serverdata, messagekey, messageReplay, localStorage.getItem('bot'))
    if(!response.status) return toast.error(response.message)
    toast.success(response.message)
}

export default function page() {
    const [serverList,setServerList] = useState([])
    const { inbot, setInbot } = useContext(BotMenuCotext)

    const [serverdata,setServerData] = useState({})
    const [messagekey,setMessageKey] = useState('!hi')
    const [messageReplay,setMessageReplay] = useState('Hello!')

    useEffect(() => {
        (async () => {
            const response = await GetSettingsData(localStorage.getItem('bot'))
            if(!response.status) return toast.error(response.message);
            setServerList(response.servers)
        })();
        RQ_Login(localStorage.getItem('login'))
    },[inbot])

    return (
        <div className={style.autoreplay}>
            <div className={style.menu}>
                <Cmenu />
            </div>
            <div className={style.main}>
                <MessageBox />
                <h1>Auto Replay</h1>

                <div className={ style.select }>
                    <label htmlFor="server">Select a Server.</label>
                    <select onChange={(e) => setServerData({server_id:e.target.value,name:e.target.options[e.target.selectedIndex].text})}>
                        <option value="">server...</option>
                        {serverList.map((server,key) => (
                            <option value={server.id} key={key} >{server.name}</option>
                        ))}
                    </select>
                </div>

                <div className={ style.select }>
                    <label htmlFor="key">Enter Message (Key)</label>
                    <input type="text" placeholder='Message' onChange={(e) => setMessageKey(e.target.value)} value={messagekey} />
                </div>

                <div className={ style.select }>
                    <label htmlFor="key">Enter Replay (value)</label>
                    <input type="text" placeholder='Replay' onChange={(e) => setMessageReplay(e.target.value)} value={messageReplay}/>
                </div>

                <div className={ style.btn }>
                    <span onClick={() => SendAPI(serverdata, messagekey, messageReplay)}>
                        <Button name='Set' gbcolor="#14A44D" />
                    </span>
                </div>
            </div>
        </div>
    )
}
