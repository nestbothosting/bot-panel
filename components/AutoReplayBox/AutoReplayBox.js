import React from 'react'
import style from './AutoReplayBox.module.css'
import Button from '../Button/Button'
import { DeleteARMS } from '@/utilise/apis'
import { toast } from 'react-toastify'

export default function AutoReplayBox({ servername = 'server', mkey = 'key', mvalue = 'value', cid, setR }) {
    const DeleteData = async () => {
        const response = await DeleteARMS(cid, localStorage.getItem('bot'))
        if(!response.status) return toast.error(response.message)
        toast.success(response.message)
        setR(prevCount => prevCount + 1)
    }
    return (
        <div className={style.messageBox}>
            <span className={style.top}>Server: <span className={style.server}>@{servername}</span></span>
            <p className={style.top}>Message Key: {mkey}</p>
            <p className={style.top}>Message Value: {mvalue}</p>
            <span className={style.top} onClick={DeleteData}>
                <Button name='Delete' gbcolor='red' />
            </span>
        </div>
    )
}
