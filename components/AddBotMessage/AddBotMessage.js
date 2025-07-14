'use client'

import React, { useState, useEffect } from 'react'
import style from './AddBotMessage.module.css'
import { checkAddBotinWeb } from '@/utilise/apis'
import { useRouter } from "next/navigation";

export default function AddBotMessage() {
    const [data, setData] = useState(null);
    const [intervalId, setIntervalId] = useState(null);
    const [visible, setVisible] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const GetData = async () => {
            let user = localStorage.getItem('user');

            if (!user) {
                const inter = setInterval(() => {
                    const storedUser = localStorage.getItem('user');
                    if (storedUser) {
                        clearInterval(inter);
                        setIntervalId(null);
                        proceed(JSON.parse(storedUser));
                    }
                }, 2000);
                setIntervalId(inter);
            } else {
                proceed(JSON.parse(user));
            }
        };

        const proceed = async (objuser) => {
            const response = await checkAddBotinWeb(objuser.id);
            setData(response);
        };

        GetData();

        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [intervalId]);

    const handleClose = () => {
        setVisible(false);
    };

    const goToBotpage = () => {
        router.push("/addnewbot");
    }

    return (
        <>
            {data?.alert && visible ? (
                <div className={style.addbotbox}>
                    <div className={style.box}>
                        <button className={style.closeBtn} onClick={handleClose}>×</button>
                        <div className={style.logo}>
                            <h1>N</h1>
                        </div>
                        <div className={style.cont}>
                            <h1>Add a New Bot to Your NestBot Dashboard</h1>
                            <p>
                                Welcome to the NestBot Dashboard! Here you can easily add and manage your own Discord bot.
                                Once added, you'll gain full access to powerful features like bot logs, premium tools,
                                server and bot status monitoring, ticket system management, embed messages, YouTube
                                notifications, and more. NestBot makes it easy to control every aspect of your bot in one
                                place—designed for both beginners and advanced users. Start by registering your bot and
                                unlock the full potential of your Discord experience.
                            </p>
                            <button onClick={goToBotpage} className={style.btn}>Add New Bot</button>
                        </div>
                    </div>
                </div>
            ) : ""}
        </>
    );
}
