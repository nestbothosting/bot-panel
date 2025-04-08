"use client";

import React, { useEffect } from 'react'
import style from './node.module.css'
import Cadmin from '@/components/Cadmin/Cadmin'
import Button from '@/components/Button/Button'
import { RQ_Login } from '@/utilise/index'
import Link from 'next/link';

export default function page() {

    useEffect(() => {
        RQ_Login(localStorage.getItem('login'))
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
