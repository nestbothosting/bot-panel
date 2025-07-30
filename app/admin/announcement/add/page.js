'use client'

import React, { useState } from 'react'
import style from './add.module.css'
import Cadmin from '@/components/Cadmin/Cadmin'
import Button from '@/components/Button/Button'
import { SaveAnnouncement } from '@/utilise/apis'
import { toast } from 'react-toastify'

export default function page() {
    const [message,setMessage] = useState('')

    const Save = async () => {
        const response = await SaveAnnouncement(message);
        if(!response.status) return toast.error(response.message)
        toast.success(response.message)
    }

    return (
        <div className={style.add}>
            <div className={style.manu}>
                <Cadmin />
            </div>
            <div className={style.main}>
                <h1>Add New Announcement</h1>

                <div className={ style.form }>
                    <label htmlFor="message">Message</label>
                    <input type="text" name='message' placeholder='Enter Message(Announcement)' onChange={(e) => setMessage(e.target.value)} />
                    <span style={{ marginTop:"10px" }} onClick={Save}>
                        <Button name='Create' gbcolor="#14A44D" />
                    </span>
                </div>
            </div>
        </div>
    )
}
