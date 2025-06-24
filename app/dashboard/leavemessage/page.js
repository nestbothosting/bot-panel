'use client'

import React, { useState, useEffect } from 'react'
import style from './leavemessage.module.css'
import Cmenu from '@/components/Cmenu/Cmenu'
import Button from '@/components/Button/Button'
import { GetMyChannels, GetSettingsData } from '@/utilise/api'
import { toast } from 'react-toastify'
import { CreateLeaveMessage, DeleteWLMS, GetWelcomeLeaveSM } from '@/apis'

const SetChange = async (value, setItem, type, setItem2, setItem3) => {
    if (type === 'none') return;
    const strBot = localStorage.getItem('bot')
    if (type === 'server') {
        setItem(value)
        GetWelcomeData(value, setItem3)
        const channels = await GetMyChannels(value, strBot)
        if (!channels.status) return toast.error(channels.message);
        setItem2(channels.channels)
    } else if (type === 'channel') {
        setItem(value)
    }
}

const GetWelcomeData = async (server_id, setItem) => {
    const response = await GetWelcomeLeaveSM(server_id, localStorage.getItem('bot'))
    if (response.status) setItem(response.data)
}

const SendData = async (server_id, channel_id, message, setItem) => {
    const response = await CreateLeaveMessage(server_id, channel_id, message, localStorage.getItem('bot'))
    if (!response.status) return toast.error(response.message);
    toast.success(response.message)
    GetWelcomeData(server_id, setItem)
}

const DeleteWMS = async (server_id, setItem) => {
    const response = await DeleteWLMS(server_id,'leave',localStorage.getItem('bot'))
    if(!response.status) return toast.error(response.message)
    toast.success(response.message)
    GetWelcomeData(server_id,setItem)
}

export default function Page() {
    const [serverList, setServerList] = useState([])
    const [channelList, setChannelList] = useState([])

    const [server_id, setServerID] = useState()
    const [channel_id, setChannelID] = useState()
    const [message, setMessage] = useState('')

    const [LMS, setLMS] = useState()

    useEffect(() => {
        const strBot = localStorage.getItem('bot')
        const GetData = async () => {
            const servers = await GetSettingsData(strBot)
            if (!servers.status) return toast.error(servers.message);
            setServerList(servers.servers)
        }
        GetData()
    }, [])

    return (
        <div className={style.wms}>
            <div className={style.menu}>
                <Cmenu />
            </div>

            <div className={style.main}>
                <h1>Leave Message Settings</h1>

                <div className={style.inputbox}>
                    <label htmlFor="serverSelect">Choose a Server</label>
                    <br />
                    <select id="serverSelect" onChange={(e) => SetChange(e.target.value, setServerID, 'server', setChannelList, setLMS)}>
                        <option value="none">Select a server...</option>
                        {serverList.map((server, key) => (
                            <option value={server.id} key={key}>{server.name}</option>
                        ))}
                    </select>
                </div>

                {LMS?.isleave ?

                    <div className={style.isdata}>
                        <div>
                            <h2>Available</h2>
                            <p>Message: <span>{LMS?.leave_message}</span></p>
                            <h4>Channel ID: {LMS?.lv_channel_id}</h4>
                        </div>
                        <div>
                            <span onClick={() => DeleteWMS(server_id, setLMS)}>
                                <Button name="Delete" gbcolor="red" />
                            </span>
                        </div>
                    </div>
                    :
                    <div>
                        <div className={style.inputbox}>
                            <label htmlFor="channelSelect">Choose a Channel</label>
                            <br />
                            <select id="channelSelect" onChange={(e) => SetChange(e.target.value, setChannelID, 'channel')}>
                                <option value="none">Select a channel...</option>
                                {channelList.map((channel, key) => (
                                    <option value={channel.id} key={key}>{channel.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className={style.inputbox}>
                            <h4>Customize Your Leave Message</h4>
                            <p><span style={{ color: 'red' }}>{`{user}`}</span> – Mentions the user who left</p>
                            <p><span style={{ color: 'red' }}>{`{server}`}</span> – Inserts the server name</p>
                            <input type="text" placeholder="Type your leave message here..." value={message} onChange={(e) => setMessage(e.target.value)} />
                        </div>

                        <span>Embed Message Coming Soon.!</span>

                        <div className={style.btn}>
                            <span onClick={() => SendData(server_id, channel_id, message, setLMS)}>
                                <Button name="Create" gbcolor='#14A44D' color='white' />
                            </span>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
