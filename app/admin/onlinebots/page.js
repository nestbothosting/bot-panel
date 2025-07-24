'use client'

import React, { useState, useEffect } from 'react'
import style from './onlinebots.module.css'
import Cadmin from '@/components/Cadmin/Cadmin'
import Image from 'next/image'
import Button from '@/components/Button/Button';
import { isAdmin } from '@/utilise';
import { useRouter } from 'next/navigation';
import { NodeStatus } from '@/apis/status'
import Nodes from '@/components/Nodes/Nodes'

export default function page() {
    const [loading, setLoading] = useState(true)
    const [nodes, setNodes] = useState([])
    const router = useRouter();

    useEffect(() => {
        isAdmin(localStorage.getItem('user'), router)

        const GetNodes = async () => {
            const response = await NodeStatus()
            console.log(response)
            setLoading(false)
            setNodes(response)
        }
        GetNodes()
    }, [])

    return (
        <section className={style.onlinebots}>
            <div className={style.menu}>
                <Cadmin />
            </div>
            <main className={style.main}>
                <h1>Online Bot's (Nodes)</h1>
                <p className={style.loading}>{loading ? "Loading...." : ""}</p>

                {nodes.map((node, key) => (
                    <Nodes key={key} node_id={node.node_id} status={node.status} node_url={node.url} node_cid={node.node_cid} path='onlinebots' />
                ))}
            </main>
        </section>
    )
}
