import React, { useState, useEffect } from 'react'
import style from './AnnouncementBar.module.css'
import { FaBullhorn } from "react-icons/fa6";
import { GetAnnouncement } from '@/utilise/apis';

export default function AnnouncementBar() {
    const [show, setShow] = useState(false)
    // const [messageCollections, setMessageCollections] = useState(data)
    const [message, setMessage] = useState()

    useEffect(() => {
        (async () => {
            const response = await GetAnnouncement()
            if (response.status) {
                if (response.messages.length === 0) {
                    setShow(false)
                } else if (response.messages.length >= 1) {
                    setShow(true)
                    setMessage(response.messages[0])
                    setMessageLoop(response.messages)
                }
            }
        })();
    }, [])

    const setMessageLoop = (messages) => {
        let index = 0;
        const length = messages.length;

        setInterval(() => {
            if(index >= length){
                index = 0
            }
            setMessage(messages[index])
            index ++
        }, 10000);
    };


    return (
        <section className={style.announcementbar} style={show ? { display: "flex" } : { display: "none" }}>
            <span className={style.message}>
                <FaBullhorn color='#86e0ecff' />
                <p style={{ marginLeft:"10px" }}>
                    {message}
                </p>
            </span>
            <p className={style.close} onClick={() => setShow(false)}>X</p>
        </section>
    )
}
