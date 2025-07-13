'use client'

import React, { useState, useEffect } from 'react'
import style from './bots.module.css'
import Cadmin from '@/components/Cadmin/Cadmin'
import Nodes from '@/components/Nodes/Nodes'
import { NodeStatus } from '@/apis/status'
import { isAdmin, RQ_Login } from '@/utilise'
import { useRouter } from 'next/navigation';

export default function page() {
    const [nodes,setNodes] = useState([])
    const router = useRouter();

    useEffect(() => {
        RQ_Login(localStorage.getItem('login'))
        isAdmin(localStorage.getItem('user'), router);

        const GetNodes = async () => {
            const response = await NodeStatus()
            console.log(response)
            setNodes(response)
        } 
        GetNodes()
    },[])

    return (
        <div className={style.bots}>
            <div className={style.manu}>
                <Cadmin />
            </div>
            <div className={style.main}>
                <h1>Select Node</h1>
                {nodes.map((node,key) => (
                    <Nodes key={key} node_id={node.node_id} status={node.status} node_url={node.url} node_cid={node.node_cid} />
                ))}
            </div>
        </div>
    )
}
