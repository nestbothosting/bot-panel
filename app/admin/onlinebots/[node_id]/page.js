'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Cadmin from '@/components/Cadmin/Cadmin'
import style from './onlinebots.module.css'
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import Image from 'next/image'
import Button from '@/components/Button/Button'
import { GetOnlineBots } from '@/utilise/apis'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation';
import { StartBot } from '@/apis'
import { GetUserCookies } from '@/utilise/cookies'
import { isAdmin } from '@/utilise'

export default function page() {
    const params = useParams()
    const [loading, setLoading] = useState(true)
    const [bots, setBots] = useState([])
    const [page, setPage] = useState(1)
    const router = useRouter();


    useEffect(() => {

        (async () => {
            const user = GetUserCookies()
            isAdmin(user, router)
            const response = await GetOnlineBots(1, params.node_id)
            if (!response.status) return toast.error(response.message)
            setLoading(false)
            setBots(response.bots)
        })();
    }, [])

    const Minus = async () => {
        if (page === 1) return;
        setLoading(true)
        const nextPage = page - 1;
        setPage(nextPage);
        const response = await GetOnlineBots(nextPage, params.node_id)
        if (!response.status) return toast.error(response.message);
        setLoading(false)
        setBots(response.bots);
    };

    const Plus = async () => {
        setLoading(true)
        const nextPage = page + 1;
        setPage(nextPage);
        const response = await GetOnlineBots(nextPage, params.node_id)
        if (!response.status) return toast.error(response.message);
        setLoading(false)
        setBots(response.bots);
    };

    return (
        <section className={style.onlinebots}>
            <div>
                <Cadmin />
            </div>
            <main className={style.main}>
                <h1>Online Bot's</h1>
                <p className={style.loading}>{loading ? "Loading...." : ""}</p>

                {bots.map((bot, key) => (
                    <div className={style.bot} key={key}>
                        <div className={style.logo}>
                            {bot.c_status ? <img src={bot.avatar} alt="avatar" /> : <Image alt='avatar' src={'/image/discord.png'} width={70} height={70}></Image>}
                        </div>
                        <div className={style.cont}>
                            <p>{bot.bot_name}</p>
                            <p>{bot.bot_id}</p>
                            {bot.c_status ? <p style={{ color: "green" }}>Online</p> : <p style={{ color: "red" }}>Ofline</p>}
                        </div>
                        <div className={style.btns}>

                            {!bot.c_status ?
                                <span>
                                    <Button name='Start' gbcolor="#14A44D" />
                                </span>
                                :
                                <span>
                                    <Button name='Stop' gbcolor="red" />
                                </span>
                            }

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
