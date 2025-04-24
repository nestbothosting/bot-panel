"use client";

import React, { createElement, useState, useEffect } from 'react'
import style from './ticket.module.css'
import Cmenu from '@/components/Cmenu/Cmenu'
import Button from '@/components/Button/Button';
import Permissions from '@/utilise/permission';
import { GetSettingsData, GetMyChannels, GetMyRoles, SendTicket } from '@/utilise/api'
import { toast } from 'react-toastify';
// import { IoClose } from "react-icons/io5";

function handleAddFields(SetFields, setFieldvalue) {
    SetFields(prevFields => {
        const newIndex = prevFields.length + 1;

        const newElement = createElement(
            'div',
            { className: style.fields },

            createElement('span', null, `Field ${newIndex}`),
            createElement('input', {
                type: 'text',
                placeholder: 'Name',
                name: `name-${newIndex}`,
                onChange: (e) =>
                    setFieldvalue(prev => {
                        const updated = [...prev];
                        updated[newIndex] = { ...updated[newIndex], name: e.target.value };
                        return updated;
                    })

            }),
            createElement('input', {
                type: 'text',
                placeholder: 'Value',
                name: `value-${newIndex}`,
                onChange: (e) =>
                    setFieldvalue(prev => {
                        const updated = [...prev];
                        updated[newIndex] = { ...updated[newIndex], value: e.target.value };
                        return updated;
                    })
            }),
            createElement('span', null, 'Inline'),
            createElement(
                'select',
                {
                    name: `inline-${newIndex}`,
                    onChange: (e) =>
                        setFieldvalue(prev => {
                            const updated = [...prev];
                            updated[newIndex] = { ...updated[newIndex], inline: e.target.value };
                            return updated;
                        })
                },
                createElement('option', { value: 'false' }, 'False'),
                createElement('option', { value: 'true' }, 'True')
            )
        );

        return [...prevFields, newElement];
    });
}

async function handleDMenu(e, type, setValue, setType1, setType2) {

    if (e.target.value === "none") {
        return;
    }

    if (type === 'server') {
        setValue(prev => ({ ...prev, server_id: e.target.value }))
        const response = await GetMyChannels(e.target.value, localStorage.getItem('bot'))
        if (!response.status) {
            return toast.error(response.message)
        }
        let channels = []
        for (let x in response.channels) {
            if (response.channels[x].type == 2 || response.channels[x].type == 13 || response.channels[x].type == 4) continue;
            channels.push({ value: response.channels[x].id, name: response.channels[x].name })
        }
        setType1(channels)
        const roles = await GetMyRoles(e.target.value, localStorage.getItem('bot'))
        if (!roles.status) {
            return toast.error(roles.message)
        }
        setType2(roles.roles)
    }

    if (type === 'channel') {
        setValue(prev => ({ ...prev, channel_id: e.target.value }))
    }
}

function handlePermission(e, setPermission, role_id, setShowpower) {
    if (e.target.value === 'none') return;
    if(role_id === 'none') return

    const selectedText = e.target.options[e.target.selectedIndex].text;
    const selectedValue = e.target.value;

    setPermission(prevPermissions => {
        ShowPower(role_id, setShowpower, prevPermissions);

        const existingRole = prevPermissions.find(r => r.role_id === role_id.id);

        if (existingRole) {
            const alreadyExists = existingRole.permission.some(p => p.code === selectedValue);
            if (alreadyExists) return prevPermissions;

            const updatedPermissions = prevPermissions.map(role =>
                role.role_id === role_id.id
                    ? {
                        ...role,
                        permission: [...role.permission, { name: selectedText, code: selectedValue }]
                    }
                    : role
            );

            ShowPower(role_id, setShowpower, updatedPermissions);
            return updatedPermissions;
        } else {
            const newPermissions = [
                ...prevPermissions,
                {
                    role_id: role_id.id,
                    role_name: role_id.name,
                    permission: [{ name: selectedText, code: selectedValue }]
                }
            ];
            ShowPower(role_id, setShowpower, newPermissions);
            return newPermissions;
        }
    });
}

// Show permissions for a role
function ShowPower(role_id, setShowpower, permission) {
    const Permissions = permission.find(r => r.role_id === role_id.id);
    setShowpower(Permissions?.permission || []);
}

async function SendPanel(ticketdata, fieldvalue, permission) {
    const response = await SendTicket(ticketdata, fieldvalue, permission, localStorage.getItem('bot'))
    if(response?.status){
        return toast.success(response?.message)
    }

    toast.error(response?.message)
}

export default function page() {
    const [fields, SetFields] = useState([])
    const [serverlist, setServerlist] = useState([])
    const [channellist, setChannellist] = useState([])
    const [rolekist, setRolelist] = useState([])
    const [fieldvalue, setFieldvalue] = useState([])
    const [ticketdata, setTicketdata] = useState({})
    const [permission, setPermission] = useState([])
    const [showpower, setShowpower] = useState([])
    const [role_id, setRoleid] = useState(null)

    useEffect(() => {

        async function AddDatas() {
            const response = await GetSettingsData(localStorage.getItem('bot'))
            if (!response.status) {

                return toast.error(response.message)
            }
            setServerlist(response.servers)
        }

        AddDatas()
    }, [])

    return (
        <div className={style.ticket}>
            <div className={style.menu} >
                <Cmenu />
            </div>
            <div className={style.main}>
                <h1>Ticket Panel</h1>

                <div className={style.dropdown}>
                    <select onChange={(e) => handleDMenu(e, 'server', setTicketdata, setChannellist, setRolelist)}>
                        <option value="none">Select a Server!</option>
                        {Array.isArray(serverlist) && serverlist.map((server, index) => (
                            <option key={index} value={server.id}>{server.name}</option>
                        ))}
                    </select>
                </div>

                <div className={style.dropdown}>
                    <select onChange={(e) => handleDMenu(e, 'channel', setTicketdata)}>
                        <option value="none">Select a Channel!</option>
                        {Array.isArray(channellist) && channellist.map((channel, index) => (
                            <option value={channel.value} key={index}>{channel.name}</option>
                        ))}
                    </select>
                </div>

                <h3 className={style.h3}>Main</h3>

                <div className={style.item}>
                    <span>Panel Title</span>
                    <input type="text" placeholder='Panel Title' onChange={(e) => setTicketdata(prop => ({ ...prop, title: e.target.value }))} />
                </div>

                <div className={style.item} >
                    <span>Title  URL (Optional)</span>
                    <input type="text" placeholder='Title URL (Optional)' onChange={(e) => setTicketdata(prop => ({ ...prop, title_url: e.target.value }))} />
                </div>

                <div className={style.item}>
                    <span>Panel Description</span>
                    <input type="text" placeholder='Panel Description' onChange={(e) => setTicketdata(prop => ({ ...prop, description: e.target.value }))} />
                </div>

                <div className={style.item} style={{ display: 'flex', flexDirection: 'column' }} >
                    <span>Panel Color</span>
                    <input type="color" style={{ width: '50px ' }} onChange={(e) => setTicketdata(prop => ({ ...prop, color: e.target.value }))} />
                </div>

                <h3 className={style.h3}>Author (Optional)</h3>

                <div className={style.item}  >
                    <span>Name</span>
                    <input type="text" placeholder='Name' onChange={(e) => setTicketdata(prop => ({ ...prop, auth_name: e.target.value }))} />
                </div>

                <div className={style.item} >
                    <span>Icon URL</span>
                    <input type="text" placeholder='Icon URL' onChange={(e) => setTicketdata(prop => ({ ...prop, auth_icon: e.target.value }))} />
                </div>

                <div className={style.item} >
                    <span>Redirect  URL</span>
                    <input type="text" placeholder='Redirect URL' onChange={(e) => setTicketdata(prop => ({ ...prop, auth_url: e.target.value }))} />
                </div>

                <h3 className={style.h3}>Image (Optional)</h3>

                <div className={style.item} >
                    <span>Image URL</span>
                    <input type="text" placeholder='Image URL' onChange={(e) => setTicketdata(prop => ({ ...prop, img_url: e.target.value }))} />
                </div>

                <h3 className={style.h3}>Fields (Optional)</h3>

                <div className={style.fields}>
                    <span>Fields</span>
                    <input type="text" placeholder='Name' onChange={(e) =>
                        setFieldvalue(prev => {
                            const updated = [...prev];
                            updated[0] = { ...updated[0], name: e.target.value };
                            return updated;
                        })
                    } />
                    <input type="text" placeholder='Value' onChange={(e) =>
                        setFieldvalue(prev => {
                            const updated = [...prev];
                            updated[0] = { ...updated[0], value: e.target.value };
                            return updated;
                        })
                    } />
                    <span>Inline</span>
                    <select onChange={(e) =>
                        setFieldvalue(prev => {
                            const updated = [...prev];
                            updated[0] = { ...updated[0], Inline: e.target.value };
                            return updated;
                        })
                    }  >
                        <option value="false">False</option>
                        <option value="true">True</option>
                    </select>
                </div>
                <div>
                    {fields.map((item, index) => {
                        return <div key={index}>{item}</div>
                    })}
                </div>
                <div className={style.btn}>
                    <span onClick={() => handleAddFields(SetFields, setFieldvalue)}>
                        <Button name='Add New' color="blacg" gbcolor="#14A44D" />
                    </span>
                </div>

                <h3 className={style.h3}>Footer (Optional)</h3>

                <div className={style.item} >
                    <span>Footer Text</span>
                    <input type="text" placeholder='Footer Text' onChange={(e) => setTicketdata(prop => ({ ...prop, footer_txt: e.target.value }))} />
                </div>

                <div className={style.item} >
                    <span>Icon URL</span>
                    <input type="text" placeholder='Icon URL' onChange={(e) => setTicketdata(prop => ({ ...prop, footer_icon: e.target.value }))} />
                </div>

                <h2>Role and Permission</h2>

                <div className={style.dropdown} >
                    <select onClick={(e) => setRoleid({ name: e.target.options[e.target.selectedIndex].text, id: e.target.value })} >
                        <option value="none">Role..</option>
                        {rolekist.map((role, index) => (
                            <option value={role.id} key={index}>{role.name}</option>
                        ))}
                    </select>
                </div>

                <div className={style.dropdown}>
                    <select onChange={(e) => handlePermission(e, setPermission, role_id, setShowpower)}>
                        <option value="none">Permissions..</option>
                        {Permissions.map((item, index) => (
                            <option value={item.permission_number} key={index}>{item.name}</option>
                        ))}
                    </select>
                </div>

                {/* remove icon code 
                <span>< IoClose color='red' /></span> */}

                <div className={style.permissions}>
                    <h3>{role_id ? role_id.name : 'Select a role!'}</h3>
                    {Array.isArray(permission) && permission.map((role, index) => (<li key={index}>{role.role_name}</li>))}
                    <div className={ style.power }>
                        {Array.isArray(showpower) && showpower.length > 0 ? (
                            showpower.map((perm, index) => (
                                <p key={index}>{perm.name}</p> // or whatever field to display
                            ))
                        ) : (
                            <p>No permissions available for this role.</p>
                        )}
                    </div>
                </div>



                <div className={style.btn} onClick={() => SendPanel(ticketdata, fieldvalue, permission)}>
                    <Button name="Send" color='white' gbcolor="#14A44D" />
                </div>
            </div>
        </div>
    )
}
