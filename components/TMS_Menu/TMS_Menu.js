import React from 'react'
import style from './TMS_Menu.module.css'
import Button from '../Button/Button'
import { Start_TMS, Stop_TMS, Delete_TMS } from '@/apis/index'
import { toast } from 'react-toastify'

const StopTMS = async (c_id, setItem, index) => {
    const response = await Stop_TMS(c_id, localStorage.getItem('bot'))
    if (!response.status) return toast.error(response.message)
    toast.success(response.message)
    setItem((prevObj) => {
        const updatedArray = prevObj.TMS.map((item, i) =>
            i === index ? { ...item, running: false } : item
        );
        return { ...prevObj, TMS: updatedArray };
    });
}

const StartTMS = async (c_id, setItem, index) => {
    const response = await Start_TMS(c_id, localStorage.getItem('bot'))
    if (!response.status) return toast.error(response.message)
    toast.success(response.message)
    setItem((prevObj) => {
        const updatedArray = prevObj.TMS.map((item, i) =>
            i === index ? { ...item, running: true } : item
        );
        return { ...prevObj, TMS: updatedArray };
    });
}

const DeleteTMS = async (c_id,setref) => {
    setref((e) => e + 1)
    const response = await Delete_TMS(c_id, localStorage.getItem('bot'))
    if (!response.status) return toast.error(response.message)
    toast.success(response.message)
    // setref((e) => e + 1)
}

export default function TMS_Menu({ data, index, setItem, setref }) {

    return (
        <div className={style.tms}>
            <div className={style.info}>
                <p>Server ID: {data.server_id}</p>
                <p>Channel ID: {data.channel_id}</p>
                <p>Time: {`${data.looptime.days} D/${data.looptime.hours} H/${data.looptime.minutes} M`}</p>
                <p>Status: {data.running ? <span style={{ color: "green" }}>Running</span> : <span style={{ color: "red" }}>Not Running</span>}</p>
            </div>
            <div className={style.message}>
                <h3>Message</h3>
                <p>{data.message}</p>
            </div>
            <div className={style.btn}>
                {data.running ?
                    <span onClick={() => StopTMS(data._id, setItem, index)}>
                        <Button name="Stop" gbcolor="yellow" color="black" />
                    </span>
                    :
                    <span onClick={() => StartTMS(data._id, setItem, index)}>
                        <Button name="Start" gbcolor="green" />
                    </span>
                }

                <span onClick={() => DeleteTMS(data._id, setref)}>
                    <Button name="Delete" gbcolor="red" />
                </span>
            </div>
        </div>
    )
}
