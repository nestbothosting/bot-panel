'use client'

import React, { useState, useEffect } from 'react'
import style from './announcement.module.css'
import Cadmin from '@/components/Cadmin/Cadmin'
import Link from 'next/link'
import { isAdmin } from '@/utilise'
import { DeleteAnnouncement, GetAnnouncement } from '@/utilise/apis'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation';

export default function page() {
    const [messages, setMessages] = useState([])
    const [r,setR] = useState(0)
    const router = useRouter();


    useEffect(() => {
        (async () => {
            isAdmin(localStorage.getItem('user'),router)
            const response = await GetAnnouncement()
            if (!response.status) return toast.error(response.message)
            setMessages(response.messages)
        })();
    }, [r])

    const DeleteItem = async (index) => {
        const response = await DeleteAnnouncement(index)
        if(!response.message) return toast.error(response.message);
        toast.success(response.message)
        setR(response)
    }

    return (
        <section className={style.announcement}>
            <div className={style.menu}>
                <Cadmin />
            </div>
            <div className={style.main}>
                <h1>Announcement</h1>
                <p className={style.addbtn}>
                    <Link href='/admin/announcement/add' >Add New</Link>
                </p>
                {messages.map((message, key) => (
                    <p className={style.message} key={key}>{message} <span className={style.close} onClick={() => DeleteItem(key)}> X</span></p>
                ))}
                {messages.length === 0? <p style={{ marginTop:"10px", textAlign:"center" }}>No Messages...</p> : ""}
            </div>
        </section>
    )
}
