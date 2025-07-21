"use client"

import React, { useEffect } from 'react'
import style from './premium.module.css'
import Cmenu from '@/components/Cmenu/Cmenu'
import PremiumMenu from '@/components/PremiumMenu/PremiumMenu'
import { MonthlyPlan1 } from '../../PremiumPlans'
import { RQ_Login } from '@/utilise/index'
import MessageBox from '@/components/MessageBox/MessageBox'

export default function page() {
    useEffect(() => {
        RQ_Login(localStorage.getItem('login'))
    },[])
    return (
        <section className={style.premium} >
            <div className={style.menu} >
                <Cmenu />
            </div>
            <main className={ style.main }>
                <h1>Unlock Premium Features</h1>
                <MessageBox />
                <PremiumMenu items={MonthlyPlan1} />
            </main>
        </section>
    )
}
