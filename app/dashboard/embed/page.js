"use client"

import React, { useEffect, createElement, useState, useContext } from 'react'
import style from './embed.module.css'
import Cmenu from '@/components/Cmenu/Cmenu'
import { RQ_Login } from '@/utilise'
import Button from '@/components/Button/Button'
import { GetSettingsData, GetMyChannels } from '@/utilise/api'
import { toast } from 'react-toastify'
import { EmbedMessage } from '@/utilise/api'
import MessageBox from '@/components/MessageBox/MessageBox'
import BotMenuCotext from '@/context/botmenu';
import AdBanner from '@/components/Banner/Banner'

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

const SendMessge = async (fields,embed) => {
    const response = await EmbedMessage(fields,embed,localStorage.getItem("bot"))
    if(!response.status){
        return toast.error(response.message)
    }
    toast.success(response.message)
}

const HandleSelectMenu = async (e, type, setValue, setValue1) => {
    if (e.target.value === 'none') return

    if (type === 'server') {
        setValue(prop => ({ ...prop, server_id: e.target.value }))
        const response = await GetMyChannels(e.target.value, localStorage.getItem('bot'))
        if (!response.status) {
            return toast.error(response.message)
        }
        setValue1(response.channels)
    }

    if (type === 'channel') {
        setValue(prop => ({ ...prop, channel_id: e.target.value }))
    }
}

export default function page() {
    const [fields, setFields] = useState([])
    const [embeddata, setEmbeddata] = useState({})
    const [fieldslist, setFieldslist] = useState([])

    const [servers, setServers] = useState([])
    const [channels, setChannels] = useState([])

    const { inbot, setInbot } = useContext(BotMenuCotext)

    useEffect(() => {
        RQ_Login(localStorage.getItem('login'))

        async function GetServers() {
            const response = await GetSettingsData(localStorage.getItem('bot'))
            if (!response.status) {
                return toast.error(response.message)
            }
            setServers(response.servers)
        }
        GetServers()
    }, [inbot])
    return (
        <section className={style.embed}>
            <div className={style.menu}>
                <Cmenu />
            </div>
            <main className={style.main}>
                <h1>Embed Message</h1>
                <MessageBox />
                <AdBanner />
                <div className={style.dropdown}>
                    <select onChange={(e) => HandleSelectMenu(e, "server", setEmbeddata, setChannels)}>
                        <option value="none">Select a Server!</option>
                        {servers.map((server, index) => (
                            <option value={server.id} key={index}>{server.name}</option>
                        ))}
                    </select>
                </div>

                <div className={style.dropdown}>
                    <select onChange={(e) => HandleSelectMenu(e, 'channel', setEmbeddata)}>
                        <option value="none">Select a Channel!</option>
                        {channels.map((channel, index) => (
                            <option value={channel.id} key={index}>{channel.name}</option>
                        ))}
                    </select>
                </div>

                <h3 className={style.h3}>Main</h3>

                <div className={style.item}>
                    <span>Panel Title</span>
                    <input type="text" placeholder='Panel Title' onChange={(e) => setEmbeddata(prop => ({ ...prop,title:e.target.value }))} />
                </div>

                <div className={style.item} >
                    <span>Title  URL (Optional)</span>
                    <input type="text" placeholder='Title URL (Optional)' onChange={(e) => setEmbeddata(prop => ({ ...prop,title_url:e.target.value }))} />
                </div>

                <div className={style.item}>
                    <span>Panel Description</span>
                    <input type="text" placeholder='Panel Description' onChange={(e) => setEmbeddata(prop => ({ ...prop, description:e.target.value }))} />
                </div>

                <div className={style.item} style={{ display: 'flex', flexDirection: 'column' }} >
                    <span>Panel Color</span>
                    <input type="color" style={{ width: '50px ' }} onChange={(e) => setEmbeddata(prop => ({ ...prop, color:e.target.value }))} />
                </div>

                <h3 className={style.h3}>Author (Optional)</h3>

                <div className={style.item}  >
                    <span>Name</span>
                    <input type="text" placeholder='Name' onChange={(e) => setEmbeddata(prop => ({ ...prop, auth_name:e.target.value }))} />
                </div>

                <div className={style.item} >
                    <span>Icon URL</span>
                    <input type="text" placeholder='Icon URL' onChange={(e) => setEmbeddata(prop => ({ ...prop, auth_icon:e.target.value }))} />
                </div>

                <div className={style.item} >
                    <span>Redirect  URL</span>
                    <input type="text" placeholder='Redirect URL' onChange={(e) => setEmbeddata(prop => ({ ...prop, auth_url:e.target.value }))} />
                </div>

                <h3 className={style.h3}>Image (Optional)</h3>

                <div className={style.item} >
                    <span>Image URL</span>
                    <input type="text" placeholder='Image URL' onChange={(e) => setEmbeddata(prop => ({ ...prop, image_url:e.target.value }))} />
                </div>

                <h3 className={style.h3}>Fields (Optional)</h3>

                <div className={style.fields}>
                    <span>Fields</span>
                    <input type="text" placeholder='Name' onChange={(e) =>
                        setFieldslist(prev => {
                            const updated = [...prev];
                            updated[0] = { ...updated[0], name: e.target.value };
                            return updated;
                        })
                    } />
                    <input type="text" placeholder='Value' onChange={(e) =>
                        setFieldslist(prev => {
                            const updated = [...prev];
                            updated[0] = { ...updated[0], value: e.target.value };
                            return updated;
                        })
                    } />
                    <span>Inline</span>
                    <select onChange={(e) =>
                        setFieldslist(prev => {
                            const updated = [...prev];
                            updated[0] = { ...updated[0], Inline: e.target.value };
                            return updated;
                        })
                    }>
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
                    <span onClick={() => handleAddFields(setFields, setFieldslist)}>
                        <Button name='Add New' color="blacg" gbcolor="#14A44D" />
                    </span>
                </div>

                <h3 className={style.h3}>Footer (Optional)</h3>

                <div className={style.item} >
                    <span>Footer Text</span>
                    <input type="text" placeholder='Footer Text' onChange={(e) => setEmbeddata(prop => ({ ...prop, footer_text:e.target.value }))} />
                </div>

                <div className={style.item} >
                    <span>Icon URL</span>
                    <input type="text" placeholder='Icon URL' onChange={(e) => setEmbeddata(prop => ({ ...prop, footer_icon:e.target.value }))} />
                </div>

                <div className={style.btn}>
                    <span onClick={() => SendMessge(fieldslist,embeddata)}>
                        <Button name='Send' color="blacg" gbcolor="#14A44D" />
                    </span>
                </div>
                <AdBanner />
            </main>
        </section>
    )
}
