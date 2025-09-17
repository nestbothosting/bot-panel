'use client'

import React, { useState, useEffect, useRef } from 'react'
import style from './AddBotMessage.module.css'
import { checkAddBotinWeb } from '@/utilise/apis'
import { useRouter } from 'next/navigation'
import { GetUserCookies } from '@/utilise/cookies'

export default function AddBotMessage() {
    const [data, setData] = useState(null)
    const [visible, setVisible] = useState(true)
    const intervalRef = useRef(null) // Use ref instead of state for intervals
    const router = useRouter()

    useEffect(() => {
        const proceed = async (objuser) => {
            try {
                const response = await checkAddBotinWeb(objuser.id)
                setData(response)
            } catch (error) {
                console.error("Error checking bot:", error)
            }
        }

        const checkUserAndProceed = () => {
            const user = GetUserCookies()
            if (user) {
                proceed(user)
                return true
            }
            return false
        }

        // Initial check
        if (!checkUserAndProceed()) {
            intervalRef.current = setInterval(() => {
                if (checkUserAndProceed()) {
                    clearInterval(intervalRef.current)
                    intervalRef.current = null
                }
            }, 5000) // Reduced interval to 5s for faster UX
        }

        // Cleanup
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
    }, [])

    const handleClose = () => setVisible(false)

    const goToBotpage = () => router.push("/addnewbot")

    return (
        <>
            {data?.alert && visible && (
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
                                notifications, and more.
                            </p>
                            <button onClick={goToBotpage} className={style.btn}>Add New Bot</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
