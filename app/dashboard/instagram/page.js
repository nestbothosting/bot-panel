'use client'

import React, { useEffect, useContext } from 'react'
import style from './instagram.module.css'
import Cmenu from '@/components/Cmenu/Cmenu'
import MessageBox from '@/components/MessageBox/MessageBox'
import BotMenuCotext from '@/context/botmenu';

export default function page() {
    const { inbot, setInbot } = useContext(BotMenuCotext)
    
    useEffect(() => {
        
    },[inbot])

    return (
        <section className={style.insta}>
            <div className={style.menu}>
                <Cmenu />
            </div>
            <main className={style.main}>
                <h1>Instagram</h1>
                <MessageBox />

                <div className={style.item}>
                    <p>Instagram Username</p>
                    <input type="text" placeholder='username' />
                </div>

                <div className={style.item}>
                    <p>Select Server</p>
                    <select>
                        <option value="">Server....</option>
                    </select>
                </div>

                <div className={style.item}>
                    <p>Select Channel</p>
                    <select>
                        <option value="">Channel....</option>
                    </select>
                </div>

                <div className={style.item}>
                    <p>Choose Notification Role</p>
                    <select>
                        <option value="">Role....</option>
                    </select>
                </div>

                <div className={style.item}>
                    <p>Embed Title</p>
                    <ul>
                        <li> <span style={{ color: "red" }}>{"{role}"}:</span> Discord Role Mention</li>
                        <li> <span style={{ color: "red" }}>{"{user}"}:</span> Renders the Instagram User display name</li>
                        <li><span style={{ color: "red" }}>{"{title}"}:</span> Title of the uploaded Post</li>
                    </ul>
                    <input type="text" placeholder='Message' />
                </div>
            </main>
        </section>
    )
}
