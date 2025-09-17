"use client"

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import style from './bots.module.css'
import Cadmin from '@/components/Cadmin/Cadmin'
import Image from 'next/image'
import { GetBotsData } from '@/utilise/apis'
import { toast } from 'react-toastify'
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { useRouter } from 'next/navigation';
import { isAdmin, RQ_Login } from '@/utilise'
import { GetUserCookies } from '@/utilise/cookies'

export default function page() {
    const params = useParams()
    const [bots, setBots] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const router = useRouter();

    useEffect(() => {
        const user = GetUserCookies()
        RQ_Login(localStorage.getItem('login'))
        isAdmin(user, router);
        
        const GetData = async () => {
            setLoading(true)
            const response = await GetBotsData(params.node_cid, page)
            setLoading(false)
            if (!response.status) return toast.error(response.message)
            setBots(response.bots)
            console.log(response)
        }
        GetData()
    }, [])

    const Plus = async () => {
        setLoading(true)
        const nextPage = page + 1;
        setPage(nextPage);
        const response = await GetBotsData(params.node_cid, nextPage)
        if (!response.status) return toast.error(response.message);
        setLoading(false)
        setBots(response.bots);
    };


    const Minus = async () => {
        if (page === 1) return;
        setLoading(true)
        const nextPage = page - 1;
        setPage(nextPage);
        const response = await GetBotsData(params.node_cid, nextPage)
        if (!response.status) return toast.error(response.message);
        setLoading(false)
        setBots(response.bots);
    };

    return (
        <section className={style.bots}>
            <div className={style.manu}>
                <Cadmin />
            </div>
            <main className={style.main}>
                <h1>Bot's</h1>
                <span>Node Collection ID: {params.node_cid}</span>
                <br />
                {loading ? "Loading...." : ""}

                {bots.map((bot, key) => (
                    <div className={style.bot} key={key}>
                        <div className={style.logo}>
                            {bot.online ? <img src={bot.avatar} alt="avatar" /> : <Image alt='avatar' src={'/image/discord.png'} width={70} height={70}></Image>}
                        </div>
                        <div className={style.cont}>
                            <p>{bot.bot_name}</p>
                            <p>{bot.bot_id}</p>
                            {bot.online ? <p style={{ color: "green" }}>Online</p> : <p style={{ color: "red" }}>Ofline</p>}
                        </div>
                    </div>
                ))}

                {/* change pages btns */}
                
                <div className={style.morebtns}>
                    <button onClick={Minus} style={{ marginRight: "10px" }}><MdArrowBackIos size={19} /></button>
                    <button onClick={Plus} ><MdArrowForwardIos size={19} /></button>
                </div>

            </main>
        </section>
    )
}
