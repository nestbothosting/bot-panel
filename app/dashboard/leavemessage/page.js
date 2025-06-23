'use client'

import React from 'react'
import style from './leavemessage.module.css'
import Cmenu from '@/components/Cmenu/Cmenu'
import Button from '@/components/Button/Button'

export default function Page() {
    return (
        <div className={style.wms}>
            <div className={style.menu}>
                <Cmenu />
            </div>

            <div className={style.main}>
                <h1>Leave Message Settings</h1>

                <div className={style.inputbox}>
                    <label htmlFor="serverSelect">Choose a Server</label>
                    <br />
                    <select id="serverSelect">
                        <option value="none">Select a server...</option>
                    </select>
                </div>

                <div className={style.inputbox}>
                    <label htmlFor="channelSelect">Choose a Channel</label>
                    <br />
                    <select id="channelSelect">
                        <option value="none">Select a channel...</option>
                    </select>
                </div>

                <div className={style.inputbox}>
                    <h4>Customize Your Leave Message</h4>
                    <p><span style={{ color: 'red' }}>{`{user}`}</span> – Mentions the user who left</p>
                    <p><span style={{ color: 'red' }}>{`{server}`}</span> – Inserts the server name</p>
                    <input type="text" placeholder="Type your leave message here..." />
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
