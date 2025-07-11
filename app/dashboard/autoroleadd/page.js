'use client'

import React, { useEffect, useState, useContext } from 'react'
import style from './autoroleadd.module.css'
import Cmenu from '@/components/Cmenu/Cmenu'
import Button from '@/components/Button/Button'
import { GetMyRoles, GetSettingsData } from '@/utilise/api'
import { toast } from 'react-toastify'
import { SetAutoRole } from '@/apis'
import BotMenuCotext from '@/context/botmenu';
import MessageBox from '@/components/MessageBox/MessageBox'

const SetRole = async (server_id, role_id) => {
    const response = await SetAutoRole(localStorage.getItem('bot'), server_id, role_id)
    if (!response.status) return toast.error(response.message);
    toast.success(response.message)
}

export default function page() {
    const [serverList, setServerList] = useState([])
    const [roleList, setRoleList] = useState([])
    const [role_id, setRoleId] = useState('')
    const [server_id, setServerId] = useState('')

    const { inbot, setInbot } = useContext(BotMenuCotext)

    useEffect(() => {
        const FetchServer = async () => {
            const servers = await GetSettingsData(localStorage.getItem('bot'))
            if (!servers.status) return toast.error(servers.message);
            setServerList(servers.servers)
        }
        FetchServer()
    }, [inbot])

    const fetchRole = async (server_id) => {
        const roles = await GetMyRoles(server_id, localStorage.getItem('bot'))
        if (!roles.status) return toast.error(roles.message);
        setRoleList(roles.roles)
        setServerId(server_id)
    }

    return (
        <div className={style.autoroleadd}>
            <div className={style.menu}>
                <Cmenu />
            </div>
            <div className={style.main}>
                <MessageBox />
                <h1>Auto Role Dashboard</h1>
                <span>Set a default role once—our system takes care of the rest. Perfect for welcomes, ranks, and smooth server management</span>

                <div className={style.selectm}>
                    <label htmlFor="server">Select a Server</label>
                    <select onChange={(e) => fetchRole(e.target.value)}>
                        <option>Choose your server..</option>
                        {serverList.map((server, key) => (
                            <option value={server.id} key={key}>{server.name}</option>
                        ))}
                    </select>
                </div>

                <div className={style.selectm}>
                    <label htmlFor="role">Select Auto Role</label>
                    <select onChange={(e) => setRoleId(e.target.value)}>
                        <option>Choose role to assign..</option>
                        {roleList.map((role, key) => (
                            <option value={role.id} key={key}>{role.name}</option>
                        ))}
                    </select>
                </div>

                <div className={style.btn}>
                    <span onClick={(e) => SetRole(server_id, role_id)}>
                        <Button name="Set Role" gbcolor="#14A44D" />
                    </span>
                </div>
            </div>
        </div>
    )
}
