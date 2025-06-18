import React from 'react'
import style from './YNS_menu.module.css'
import Button from '../Button/Button'
import { StartYNS, StopYNS, DeleteYNS } from '../../utilise/api'
import { toast } from 'react-toastify'

async function StartBTN(server_id,setY) {
  const response = await StartYNS(server_id, localStorage.getItem('bot'))
  if (!response.status) return toast.error(response.message)
  toast.success(response.message)
  setY(prop => ({ ...prop ,running:true }))
}

async function StopBTN(server_id,setY) {
  const response = await StopYNS(server_id,localStorage.getItem('bot'))
  if (!response.status) return toast.error(response.message)
  toast.success(response.message)
  setY(prop => ({ ...prop ,running:false }))
}

async function DeleteBTN(server_id,setY) {
  const response = await DeleteYNS(server_id,localStorage.getItem('bot'))
  if (!response.status) return toast.error(response.message)
  toast.success(response.message)
setY(prop => ({ ...prop ,status:false }))
}

export default function YNS_menu({ data, setY }) {
  return (
    <div className={style.main}>

      <div className={style.logo}>
        <img src={data.channel_icon} alt="Channel_Logo" />
        <div>
          <h3>{data.channel_name}</h3>
          <span>Status:{data.running ? "Running" : "Not Running"}</span>
        </div>
      </div>

      <div className={style.server_info}>
        <p>DC Channel ID: <span>{data.channel_id}</span></p>
        <p>DC Server ID: <span>{data.server_id}</span></p>
      </div>

      <div className={style.C_buttons}>
        <span onClick={() => DeleteBTN(data.server_id,setY)}>
          <Button name="Delete" gbcolor="red" />
        </span>
        {data.running ?
          <span onClick={() => StopBTN(data.server_id,setY)}>
            <Button name="Stop" gbcolor='yellow' color="black" />
          </span>
          :
          <span onClick={() => StartBTN(data.server_id,setY)}>
            <Button name="Start" gbcolor='green' />
          </span>
        }

      </div>
    </div>
  )
}
