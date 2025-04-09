"use client";

import React, { useEffect } from 'react'
import style from './node.module.css'
import Cadmin from '@/components/Cadmin/Cadmin'
import { RQ_Login, isAdmin } from '@/utilise/index'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function page() {
    const router = useRouter();

    useEffect(() => {
        RQ_Login(localStorage.getItem('login'))
        isAdmin(localStorage.getItem('user'),router)
    },[])
    return (
        <div className={style.node} >
            <div className={style.menu} >
                <Cadmin />
            </div>
            <div className={style.main} >
                <h1>All Node's</h1>
                <div className={ style.addbtn } >
                    <Link href='/admin/node/addnode' className={ style.btn }>Add Node</Link>
                </div>
            </div>
        </div>
    )
}
