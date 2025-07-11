"use client"

import React, { useState, useEffect, useContext } from 'react'
import style from './botstatus.module.css'
import Cmenu from '@/components/Cmenu/Cmenu'
import Image from 'next/image';
import DiscordLogo from '../../public/image/discord.png'
import Link from 'next/link';
import { RiRadioButtonLine } from "react-icons/ri";
import { TbExternalLink } from "react-icons/tb";
import { toast } from 'react-toastify';
import { GetBotStatus } from '@/apis/status'
import { RQ_Login } from '@/utilise/index'
import MessageBox from '@/components/MessageBox/MessageBox';
import BotMenuCotext from '@/context/botmenu';


export default function page() {
    const [botdata, setBotdata] = useState({})
    const { inbot, setInbot } = useContext(BotMenuCotext)

    useEffect(() => {
        RQ_Login(localStorage.getItem('login'))
        async function Get() {
            const response = await GetBotStatus(localStorage.getItem('bot'))
            if (!response.status) toast.error(response.message);
            setBotdata(response)
        }
        Get()
    }, [inbot])

    return (
        <div className={style.botstatus} >
            <div className={style.menu}>
                <Cmenu />
            </div>
            <div className={style.main}>
                <h1>Bot Status</h1>
                <MessageBox />
                <div className={style.status}>
                    {botdata.bot_status ? <img src={botdata.bot_avatar} alt="logo" className={ style.logo } /> : <Image src={DiscordLogo} alt='logo' className={style.logo} />}
                    <div className={style.info}>
                        <p>Bot Name: {botdata.bot_name ? botdata.bot_name : "Bot Name"}</p>
                        <p>Bot ID: {botdata.bot_id ? botdata.bot_id : "0000000000000"}</p>
                        <p>Status: {botdata.bot_status ? "Online" : "Offline"} <RiRadioButtonLine color={botdata.bot_status ? 'green' : 'red'} /></p>
                    </div>
                    <div className={style.node}>
                        <p>Node ID: {botdata.node_id ? botdata.node_id : '0000000000000x'}</p>
                        <p>Node Status: Online <RiRadioButtonLine color='green' /></p>
                        <Link href='/settings'>Settings <TbExternalLink color='white' /></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
