"use client"

import React, { useState, useEffect, useContext } from 'react'
import style from './welcomemessage.module.css'
import Cmenu from '@/components/Cmenu/Cmenu'
import Button from '@/components/Button/Button'
import { GetMyChannels, GetSettingsData } from '@/utilise/api'
import { toast } from 'react-toastify'
import { CreateWelcomeMessage, DeleteWLMS, GetWelcomeLeaveSM } from '@/apis'
import { RQ_Login } from '@/utilise/index'
import MessageBox from '@/components/MessageBox/MessageBox'
import BotMenuCotext from '@/context/botmenu';
import InputBox from '@/components/InputBox/InputBox'

const setChange = async (value, setItem, type, setItem2, setItem3) => {
    const strBot = localStorage.getItem('bot')
    if (type === 'server') {
        setItem(value)
        GetWelcomeData(value, setItem3)
        const channels = await GetMyChannels(value, strBot)
        if (!channels.status) return toast.error(channels.message)
        setItem2(channels.channels)
    } else if (type === 'channel') {
        setItem(value)
    }
}

const GetWelcomeData = async (server_id, setItem) => {
    const response = await GetWelcomeLeaveSM(server_id, localStorage.getItem('bot'))
    if (response.status) setItem(response.data)
}

const Senddata = async (server_id, channel_id, message, setItem, embed, EmbedBTN) => {
    console.log(embed)
    const response = await CreateWelcomeMessage(server_id, channel_id, message, localStorage.getItem('bot'), EmbedBTN, embed)
    if (!response.status) return toast.error(response.message)
    toast.success(response.message)
    GetWelcomeData(server_id, setItem)
}

const DeleteWMS = async (server_id, setItem) => {
    const response = await DeleteWLMS(server_id, 'welcome', localStorage.getItem('bot'))
    if (!response.status) return toast.error(response.message)
    toast.success(response.message)
    GetWelcomeData(server_id, setItem)
}

export default function page() {
    const [serverList, setServerList] = useState([])
    const [channelList, setChannelList] = useState([])

    const [server_id, setServerID] = useState()
    const [channel_id, setChannelID] = useState()
    const [message, setMessage] = useState('')
    const [EmbedBTN, setEmbedBTN] = useState(true)
    const [embed, setEmbed] = useState({ title: `Hello {user}`, thumbnail: `{user-avatar}` })

    const [WMS, setWMS] = useState()
    const { inbot, setInbot } = useContext(BotMenuCotext)

    useEffect(() => {
        RQ_Login(localStorage.getItem('login'))
        const Getdatas = async () => {
            const strBot = localStorage.getItem('bot')
            const servers = await GetSettingsData(strBot)
            if (!servers.status) return toast.error(servers.message)
            setServerList(servers.servers)
        }
        Getdatas()
        if (server_id) {
            GetWelcomeData(server_id, setWMS)
        }
    }, [inbot])

    const handleSlider = (e) => {
        setEmbedBTN(!e.target.checked);
    };

    return (
        <section className={style.wms}>
            <div className={style.menu}>
                <Cmenu />
            </div>
            <main className={style.main}>
                <h1>Welcome Message Settings</h1>
                <MessageBox />
                <div className={style.inputbox}>
                    <span>Choose a Server</span>
                    <br />
                    <select onChange={(e) => setChange(e.target.value, setServerID, 'server', setChannelList, setWMS)}>
                        <option value="none">Select a server...</option>
                        {serverList.map((server, key) => (
                            <option value={server.id} key={key}>{server.name}</option>
                        ))}
                    </select>
                </div>

                {WMS?.Iswelcome ?

                    <div className={style.isdata}>
                        <div>
                            <h2>Active </h2>
                            <p>Message: <span>{WMS?.welcome_message}</span></p>
                            <h4>Channel ID: {WMS?.wl_channel_id}</h4>
                        </div>
                        <div>
                            <span onClick={() => DeleteWMS(server_id, setWMS)}>
                                <Button name="Delete" gbcolor="red" />
                            </span>
                        </div>
                    </div>

                    :

                    <div>
                        <div className={style.inputbox}>
                            <span>Choose a Channel</span>
                            <br />
                            <select onChange={(e) => setChange(e.target.value, setChannelID, 'channel')}>
                                <option value="none">Select a Channel</option>
                                {channelList.map((channel, key) => (
                                    <option value={channel.id} key={key}>{channel.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className={style.inputbox}>
                            <h4>Customize Your Welcome Message</h4>
                            <p><span style={{ color: "red" }}>{`{user}`}</span> – Mentions the new user</p>
                            <p><span style={{ color: "red" }}>{`{server}`}</span> – Inserts the server name</p>
                            <input type="text" placeholder="Type your welcome message here..." value={message} onChange={(e) => setMessage(e.target.value)} />
                        </div>

                        <h2>Advanced</h2>
                        <span>Embed Message</span>
                        <br />
                        <label className={style.toggleswitch} onClick={(e) => handleSlider(e)}>
                            <input type="checkbox" id="myToggle" />
                            <span className={style.slider}></span>
                        </label>

                        <div style={{ opacity: EmbedBTN ? 0.5 : 1 }}>
                            <InputBox disabledin={EmbedBTN} title='Embed Title' placeholder='Enter Embed Title' setValue={setEmbed} objType={true} objkey='title' value={embed.title} description='{user} - Mentions the new user' />
                            <InputBox disabledin={EmbedBTN} title='Embed Description' placeholder='Enter Embed Description' setValue={setEmbed} objType={true} objkey='description' />
                            <InputBox disabledin={EmbedBTN} title='Embed Thumbnail' description='{user-avatar} - user profile image' placeholder='Enter Embed Thumbnail' setValue={setEmbed} objType={true} objkey='thumbnail' value={embed.thumbnail} />
                            <InputBox disabledin={EmbedBTN} title='Embed Thumbnail' description='{user-avatar} - user profile image' placeholder='Enter Embed Thumbnail' setValue={setEmbed} objType={true} objkey='thumbnail' value={embed.thumbnail} />
                            <InputBox disabledin={EmbedBTN} title='Embed Image URL' placeholder='Enter Embed Image URL' setValue={setEmbed} objType={true} objkey='image' />

                            <h3>Footer</h3>
                            <InputBox disabledin={EmbedBTN} title='Footer Title' placeholder='Enter Footer title' setValue={setEmbed} objType={true} objkey='footer_title' />
                            <InputBox disabledin={EmbedBTN} title='Footer Icon URL' placeholder='Enter Footer Icon URL' setValue={setEmbed} objType={true} objkey='footer_icon' />
                        </div>

                        <div className={style.btn}>
                            <span onClick={() => Senddata(server_id, channel_id, message, setWMS, embed, EmbedBTN)}>
                                <Button name="Create" gbcolor='#14A44D' color='white' />
                            </span>
                        </div>
                    </div>
                }



            </main>
        </section>
    )
}
