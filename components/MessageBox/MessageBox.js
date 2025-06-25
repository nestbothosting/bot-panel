import React, { useEffect, useState, useContext } from 'react'
import style from './MessageBox.module.css'
import BotMenuCotext from '@/context/botmenu';

export default function MessageBox() {
    const [isbot, setIsbot] = useState(true)
    const [visible, setVisible] = useState(true)
    const { inbot, setInbot } = useContext(BotMenuCotext)

    useEffect(() => {
        const bot = localStorage.getItem('bot')
        if (!bot || bot === 'none') {
            setIsbot(false)
        }else{
            setIsbot(true)
        }
    }, [inbot])

    if (isbot || !visible) return null

    return (
        <div className={style.MessageBox}>
            <p>Select or Add a Bot</p>
            <div className={style.close} onClick={() => setVisible(false)}>✕</div>
        </div>
    )
}
