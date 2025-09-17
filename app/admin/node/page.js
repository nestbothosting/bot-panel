"use client";

import React, { useEffect, useState } from 'react'
import style from './node.module.css'
import Cadmin from '@/components/Cadmin/Cadmin'
import { RQ_Login, isAdmin } from '@/utilise/index'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FcAcceptDatabase, FcDeleteDatabase } from "react-icons/fc";
import Button from '@/components/Button/Button';
import { NodeStatus } from '@/apis/status'
import { GetUserCookies } from '@/utilise/cookies';

export default function page() {
    const [nodes, setNodes] = useState([])
    const router = useRouter();
    useEffect(() => {
        const init = async () => {
            try {
                const node = await NodeStatus()
                const user = GetUserCookies()
                setNodes(node)
                RQ_Login(localStorage.getItem('login'))
                isAdmin(user, router)
            } catch (error) {
                console.log(error)
            }
        }
        init()
    }, [router])

    return (
        <section className={style.node} >
            <div className={style.menu} >
                <Cadmin />
            </div>
            <main className={style.main} >
                <h1>All Node's</h1>
                <div className={style.addbtn} >
                    <Link href='/admin/node/addnode' className={style.btn}>Add Node</Link>
                </div>

                {nodes.map((node, index) => (
                    <div className={style.nodes} key={index}>
                        <div className={style.nodesticon}>
                            { node.status ? <FcAcceptDatabase size={30} /> : <FcDeleteDatabase size={30} />}
                            
                        </div>
                        <div className={style.nodestatus}>
                            <p>{node.url}</p>
                            <p>ID:{node.node_id}</p>
                            <span style={{ color: node.status ? "green" : "red" }}>{node.status ? "Online" : "Offline"}</span>
                        </div>
                        <div className={style.btns}>
                            <Button name="Delete" gbcolor="red" />
                        </div>
                    </div>
                ))}

            </main>
        </section>
    )
}
