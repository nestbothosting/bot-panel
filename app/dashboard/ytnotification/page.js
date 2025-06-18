"use client"

import React, { useState, useEffect } from 'react'
import style from './ytn.module.css'
import Cmenu from '@/components/Cmenu/Cmenu'
import { FaYoutube } from "react-icons/fa6";
import Button from '@/components/Button/Button';
import { GetMyChannels, GetMyRoles, GetSettingsData, SaveYNS, YNS_Data_Get } from '@/utilise/api';
import { toast } from 'react-toastify';
import YNS_menu from '@/components/YNS_menu/YNS_menu';

async function Change(e, type, setItem, setItem2, setItem3, setItem4) {
    if (e.target.value === 'none') return
    if (type === 'server') {
        setItem(prop => ({ ...prop, server_id: e.target.value }))
        setItem2([])
        setItem3([])
        const strbot = localStorage.getItem('bot')
        const channels = await GetMyChannels(e.target.value, strbot)
        const roles = await GetMyRoles(e.target.value, strbot)
        if (!channels.status && !roles.status) return toast.error("Failed to fetch channels or roles.")
        setItem2(roles.roles)
        setItem3(channels.channels)
        const YNSDATA = await YNS_Data_Get(e.target.value, strbot)
        setItem4(YNSDATA)
    }
    if (type === 'channel') {
        setItem(prop => ({ ...prop, channel_id: e.target.value }))
    }
    if (type === 'role') {
        setItem(prop => ({ ...prop, role_id: e.target.value }))
    }
}

async function SendData(data, setYNS, server_id) {
    const response = await SaveYNS(localStorage.getItem('bot'), data)
    if (!response.status) return toast.error(response.message)
    toast.success(response.message)
    if (!server_id) return
    const YNSDATA = await YNS_Data_Get(server_id, localStorage.getItem('bot'))
    setYNS(YNSDATA)
}

export default function Page() {
    const [data, setData] = useState({ title: "{role} {channel} just uploaded {title} at {link} !" })
    const [serverlist, setServerlist] = useState([])
    const [rolelist, setRolelist] = useState([])
    const [channellist, setChannellist] = useState([])
    const [YNS, setYNS] = useState({ status: false })


    useEffect(() => {
        async function GetServers() {
            const response = await GetSettingsData(localStorage.getItem('bot'))
            if (!response.status) return toast.error(response.message)
            setServerlist(response.servers)
        }
        GetServers()
    }, [])

    return (
        <div className={style.ytn}>
            <div className={style.menu}>
                <Cmenu />
            </div>
            <div className={style.main}>
                <h1 className={style.title}>YT Notification <FaYoutube color='red' size={45} /></h1>

                {YNS.status ? <YNS_menu data={YNS} setY={setYNS} /> : ""}

                <div className={style.drop}>
                    <select onChange={(e) => Change(e, 'server', setData, setRolelist, setChannellist, setYNS)}>
                        <option value="none">Server..!</option>
                        {serverlist.map((server, index) => (
                            <option value={server.id} key={index}>{server.name}</option>
                        ))}
                    </select>
                </div>

                <div className={style.drop}>
                    <span>Ping Channel</span>
                    <select onChange={(e) => Change(e, 'channel', setData)}>
                        <option value="none">Channel..!</option>
                        {channellist.map((channel, index) => (
                            <option value={channel.id} key={index}>{channel.name}</option>
                        ))}
                    </select>
                </div>

                <div className={style.drop}>
                    <span>Choose Notification Role</span>
                    <select onChange={(e) => Change(e, 'role', setData)}>
                        <option value="none">Role..!</option>
                        {rolelist.map((role, index) => (
                            <option value={role.id} key={index}>{role.name}</option>
                        ))}
                    </select>
                </div>

                <div className={style.text}>
                    <ul>
                        <li> <span style={{ color: "red" }}>{"{role}"}:</span> Role Mention</li>
                        <li> <span style={{ color: "red" }}>{"{channel}"}:</span> Renders the YouTube channel display name</li>
                        <li><span style={{ color: "red" }}>{"{title}"}:</span> Title of the uploaded video</li>
                    </ul>
                    <input type="text" placeholder='Title' value={data.title} onChange={(e) => setData(pros => ({ ...pros, title: e.target.value }))} />
                </div>

                <div className={style.text}>
                    <span>YT Channel ID</span>
                    <input type="text" placeholder='Channel URL' onChange={(e) => setData(prop => ({ ...prop, yt_channel_id: e.target.value }))} />
                </div>

                <h2>Embed</h2>

                <div className={style.text}>
                    <span>Title</span>
                    <input type="text" placeholder='Embed Titie' onChange={(e) => setData(prop => ({ ...prop, etitle: e.target.value }))} />
                </div>

                <div className={style.text}>
                    <span>Description</span>
                    <input type="text" placeholder='Embed Description' onChange={(e) => setData(prop => ({ ...prop, edescription: e.target.value }))} />
                </div>

                <div className={style.text}>
                    <span>Thumbnail URL</span>
                    <input type="text" placeholder='Embed Thumbnail URL' onChange={(e) => setData(prop => ({ ...prop, ethumbnail: e.target.value }))} />
                </div>

                <div className={style.btn}>
                    <span onClick={() => SendData(data, setYNS, data.server_id)}>
                        <Button name="Save" color="blacg" gbcolor="#14A44D" />
                    </span>
                </div>
            </div>
        </div>
    )
}
