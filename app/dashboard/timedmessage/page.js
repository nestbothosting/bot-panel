"use client"

import React, { useState, useEffect, useContext } from 'react'
import style from './timedmessage.module.css'
import Cmenu from '@/components/Cmenu/Cmenu'
import { IoMdTime } from "react-icons/io";
import Button from '@/components/Button/Button';
import { GetSettingsData, GetMyChannels } from '@/utilise/api'
import { toast } from 'react-toastify';
import { CreateNewTimedmessage, GetTMSData } from '@/apis/index'
import BotMenuCotext from '@/context/botmenu';
import TMS_Menu from '@/components/TMS_Menu/TMS_Menu';

const SetChange = async (value, setValue, type, setItem, setItem2) => {
    const strBot = localStorage.getItem('bot')
    if (type === 'server') {
        setValue(value)
        const channels = await GetMyChannels(value, strBot)
        if (!channels.status) toast.error(channels.message)
        setItem(channels.channels)
        const response = await GetTMSData(value, strBot)
        if (!response.status) return toast.error(response.message);
        setItem2(response)
    }
    if (type === 'channel') {
        setValue(value)
    }
    if (type === "minutes") {
        setValue(value)
    }
}

const Senddata = async (tday, thours, tminutes, server_id, channel_id, messages, setTMS) => {
    if (tday == 0 && thours == 0 && tminutes == 0) toast.error('Enter Interval Time (Day, Hour, Minutes)')
    if (!messages) return toast.error("Enter Message!")
    const response = await CreateNewTimedmessage(tday, thours, tminutes, server_id, channel_id, messages, localStorage.getItem('bot'))
    if (!response.status) return toast.error(response.message);
    toast.success(response.message)
    const TMSDATA = await GetTMSData(server_id, localStorage.getItem('bot'))
    if (!TMSDATA.status) return toast.error(response.message);
    setTMS(TMSDATA)
}

export default function page() {
    const [tday, setTday] = useState(0)
    const [thours, setThours] = useState(2)
    const [tminutes, setTminutes] = useState("0")
    const [server_id, setServerid] = useState()
    const [channel_id, setChannelid] = useState()
    const [messages, setMessage] = useState('')

    const [myServers, setMyservers] = useState([])
    const [myChannels, setMychannels] = useState([])
    const [TMS, setTMS] = useState()
    const [ref, setRes] = useState(0)

    const { inbot, setInbot } = useContext(BotMenuCotext)

    useEffect(() => {
        async function GetData() {
            const servers = await GetSettingsData(localStorage.getItem('bot'))
            if (!servers.status) toast.error(servers.message);
            setMyservers(servers.servers);
            if (server_id) {
                const TMSDATA = await GetTMSData(server_id, localStorage.getItem('bot'))
                if (!TMSDATA.status) return toast.error(response.message);
                setTMS(TMSDATA)
            }
        }
        GetData()
    }, [inbot, server_id, ref])

    return (
        <div className={style.timedmessage}>

            <div className={style.menu} >
                <Cmenu />
            </div>

            <div className={style.main} >
                <h1 className={style.title}>Timed Message  <IoMdTime size={35} color='aqua' /></h1>

                {TMS?.isTMS ?
                    <div>
                        <h3>Available {TMS.TMS.length}/2</h3>
                        {TMS.TMS.map((item, key) => (<TMS_Menu key={key} data={item} index={key} setItem={setTMS} setref={setRes} />))}
                    </div>
                    :
                    ""
                }


                <div className={style.inputbox}>
                    <span>Select a Server</span>
                    <select onChange={(e) => SetChange(e.target.value, setServerid, "server", setMychannels, setTMS)}>
                        <option value="none">Server...</option>
                        {myServers?.map((server, key) => (
                            <option value={server.id} key={key}>{server.name}</option>
                        ))}
                    </select>
                </div>

                <div className={style.inputbox}>
                    <span>Select a Channel</span>
                    <select onChange={(e) => SetChange(e.target.value, setChannelid, 'channel')}>
                        <option value="none">channel...</option>
                        {myChannels?.map((channel, key) => (
                            <option value={channel.id} key={key}>{channel.name}</option>
                        ))}
                    </select>
                </div>

                <div className={style.inputbox}>
                    <h4>Time Interval - Days</h4>
                    <span>Choose the amount of days of a delay you want to have between timed messages that are sent.</span>
                    <input type="number" placeholder='0 - 30' value={tday} onChange={(e) => setTday(e.target.value)} />
                </div>

                <div className={style.inputbox}>
                    <h4>Time Interval - Hours</h4>
                    <span>Choose the amount of hours of a delay you want to have between timed messages that are sent.</span>
                    <input type="number" placeholder='0 - 24' value={thours} onChange={(e) => setThours(e.target.value)} />
                </div>

                <div className={style.inputbox}>
                    <p>Time Interval - Minutes</p>
                    <span>Choose the amount of minutes of a delay you want to have between timed messages that are sent. You are only able to specify a timeframe in 5 minute steps.</span>
                    <select onChange={(e) => SetChange(e.target.value, setTminutes, 'minutes')}>
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

                <div className={style.inputbox}>
                    <h4>Message</h4>
                    <span>Enter Interval Text Messages</span>
                    <input type="text" placeholder='Enter Your Loop Message' value={messages} onChange={(e) => setMessage(e.target.value)} />
                </div>

                <span>Embed Message Coming Soon.!</span>

                <div className={style.btn} >
                    <span onClick={() => Senddata(tday, thours, tminutes, server_id, channel_id, messages, setTMS)}>
                        <Button name='Create' gbcolor='#14A44D' color='white' />
                    </span>
                </div>

            </div>
        </div>
    )
}
