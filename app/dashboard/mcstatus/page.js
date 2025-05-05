"use client"

import React, { useState, useEffect } from 'react'
import style from './mcstatus.module.css'
import Cmenu from '@/components/Cmenu/Cmenu'
import Button from '@/components/Button/Button'
import { GetSettingsData, GetMyChannels } from '@/utilise/api'
import { toast } from 'react-toastify'
import { SendStatusPanel } from '@/utilise/api' 


async function HandleChange(e, setValue, type, setPaneldata) {
  if (e.target.value === 'none') return;

  if (type === 'server') {
    const channels = await GetMyChannels(e.target.value, localStorage.getItem('bot'))
    if(!channels.status) return toast.error(channels.message)
    setPaneldata(prop => ({...prop, server_id: e.target.value }))
    setValue(channels.channels)
  }

  if(type === 'channel'){
    setPaneldata(prop => ({...prop,channel_id: e.target.value}))
  }
}

async function SendData(paneldata){
  const response = await SendStatusPanel(localStorage.getItem('bot'),paneldata);
  if(!response.status) return toast.error(response.message)
  toast.success(response.message)
}

export default function page() {
  const [serverlist, setServerlist] = useState([])
  const [channelslist, setChannelslist] = useState([])
  const [paneldata,setPaneldata] = useState({})

  useEffect(() => {
    async function GetServers() {
      const servers = await GetSettingsData(localStorage.getItem('bot'))
      if (!servers.status) {
        return toast.error(servers.message)
      }
      setServerlist(servers.servers)
    }

    GetServers()
  }, [])
  return (
    <div className={style.mcstatus}>
      <div className={style.menu}>
        <Cmenu />
      </div>
      <div className={style.main}>
        <h1>Minecraft Server Status</h1>

        <div className={style.select} >
          <select onChange={(e) => HandleChange(e, setChannelslist, "server",setPaneldata)}>
            <option value="none">Server...</option>
            {serverlist.map((server, index) => (
              <option value={server.id} key={index}>{server.name}</option>
            ))}
          </select>
        </div>

        <div className={style.select} >
          <select onChange={(e) => HandleChange(e,null,'channel',setPaneldata)}>
            <option value="none">Channel...</option>
            {channelslist.map((channel,index) => (
              <option value={channel.id} key={index}>{channel.name}</option>
            ))}
          </select>
        </div>

        <div className={style.text}>
          <span>Server IP</span>
          <input type="text" placeholder='Server IP' onChange={(e) => setPaneldata(prop => ({...prop,server_ip: e.target.value}))} />
        </div>

        <h3>Optional</h3>

        <div className={style.text}>
          <span>Server PORT  Default 25565</span>
          <input type="number" placeholder='Server PORT ' onChange={(e) => setPaneldata(prop => ({...prop,port: e.target.value}))} />
        </div>

        <div className={style.text}>
          <span>Title</span>
          <input type="text" placeholder='Title' onChange={(e) => setPaneldata(prop => ({...prop,title: e.target.value}))} />
        </div>

        <div className={style.text}>
          <span>Description</span>
          <input type="text" placeholder='Description' onChange={(e) => setPaneldata(prop => ({...prop,description: e.target.value}))} />
        </div>

        <div className={style.text}>
          <span>Offline Icon ID</span>
          <input type="text" placeholder='Offline icon' onChange={(e) => setPaneldata(prop => ({...prop,of_icon_id: e.target.value}))} />
        </div>

        <div className={style.text}>
          <span>Online Icon ID</span>
          <input type="text" placeholder='Onlie icon' onChange={(e) => setPaneldata(prop => ({...prop,on_icon_id: e.target.value}))} />
        </div>

        <div className={style.text}>
          <span>Thumbnail URL</span>
          <input type="text" placeholder='Thumbnail URL' onChange={(e) => setPaneldata(prop => ({...prop,thumbnail_url: e.target.value}))} />
        </div>

        <div className={style.btn}>
          <span onClick={() => SendData(paneldata)}>
            <Button name='Send' color="blacg" gbcolor="#14A44D" />
          </span>
        </div>
      </div>
    </div>
  )
}
