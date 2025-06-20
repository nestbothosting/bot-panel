"use client"

import React from 'react'
import style from './premium.module.css'
import Cmenu from '@/components/Cmenu/Cmenu'
import PremiumMenu from '@/components/PremiumMenu/PremiumMenu'
import { MonthlyPlan1 } from '../../PremiumPlans'

export default function page() {
    return (
        <div className={style.premium} >
            <div className={style.menu} >
                <Cmenu />
            </div>
            <div className={ style.main }>
                <h1>Unlock Premium Features</h1>
                <PremiumMenu items={MonthlyPlan1} />
            </div>
        </div>
    )
}
