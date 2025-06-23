"use client"

import React from 'react'
import style from './welcomemessage.module.css'
import Cmenu from '@/components/Cmenu/Cmenu'
import Button from '@/components/Button/Button'

export default function page() {
    return (
        <div className={style.wms}>
            <div className={style.menu}>
                <Cmenu />
            </div>
            <div className={style.main}>
                <h1>Welcome Message Settings</h1>

                <div className={style.inputbox}>
                    <span>Choose a Server</span>
                    <br />
                    <select>
                        <option value="none">Select a server...</option>
                    </select>
                </div>

                <div className={style.inputbox}>
                    <span>Choose a Channel</span>
                    <br />
                    <select>
                        <option value="none">Select a Channel</option>
                    </select>
                </div>

                <div className={style.inputbox}>
                    <h4>Customize Your Welcome Message</h4>
                    <p><span style={{ color:"red" }}>{`{user}`}</span> – Mentions the new user</p>
                    <p><span style={{ color:"red" }}>{`{server}`}</span> – Inserts the server name</p>
                    <input type="text" placeholder="Type your welcome message here..." />
                </div>

                <span>Embed Message Coming Soon.!</span>

                <div className={ style.btn }>
                    <span>
                        <Button name="Create" gbcolor='#14A44D' color='white'/>
                    </span>
                </div>

            </div>
        </div>
    )
}
