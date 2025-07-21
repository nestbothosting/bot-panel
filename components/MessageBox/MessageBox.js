import React, { useEffect, useState, useContext } from 'react'
import style from './MessageBox.module.css'
import BotMenuCotext from '@/context/botmenu';
import { LuExternalLink } from "react-icons/lu";
import { config } from '@/config'

export default function MessageBox() {
    const [isbot, setIsbot] = useState(true)
    const [visible, setVisible] = useState(true)
    const { inbot, setInbot } = useContext(BotMenuCotext)
    const [chuser, setChuser] = useState(false)

    useEffect(() => {
        const bot = localStorage.getItem('bot')
        const user = localStorage.getItem('user')
        if (user) setChuser(true)
        if (!bot || bot === 'none') {
            setIsbot(false)
        } else {
            setIsbot(true)
        }
    }, [inbot])

    return (
        <>
            {isbot || !visible || !chuser ? "" :
                <div className={style.MessageBox}>
                    <p>Select or Add a Bot</p>
                    <div className={style.close} onClick={() => setVisible(false)}>✕</div>
                </div>
            }

            {chuser ? "" :
                <div className={style.MessageBox}>
                    <p>Please log in to continue <a style={{ color:"blue" }} href={ config.AuthURL }> <LuExternalLink size={15} />login</a> </p>
                    <div className={style.close} onClick={() => setChuser(false)}>✕</div>
                </div>
            }
        </>
    )
}
