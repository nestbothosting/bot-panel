"use client";

import React, { useEffect, useState, useContext } from "react";
import style from "./dropdown.module.css";
import { useRouter } from "next/navigation";
import { Mybots } from '@/apis/index'
import BotMenuCotext from "@/context/botmenu";
import { GetUserCookies } from "@/utilise/cookies";

export default function Dropdown() {
    const router = useRouter();
    const [bots,setBots] = useState([])
    const [selectedbot,setSelectedbot] = useState("")
    const { inbot,setInbot } = useContext(BotMenuCotext)

    const handleChange = (e) => {
        if (e.target.value === "addnewbot") {
            router.push("/addnewbot");
            return;
        }
        const bot = e.target.value;
        localStorage.setItem('bot',bot)
        setSelectedbot(bot)
        setInbot(bot)
    };

    useEffect(() => {
        const bot = localStorage.getItem('bot')
        if(bot){
            setSelectedbot(bot)
        }
        async function GetBots(){
            try {
                const user = GetUserCookies()
                const response = await Mybots(user)
                if(response.length === 0){
                    setTimeout(async() => {
                        const recall = await Mybots(user)
                        setBots(recall)
                    }, 2000);
                }
                setBots(response)
            } catch (error) {
                setBots([])
                console.log(error.message)
            }
        }

        GetBots()
    },[inbot])

    return (
        <div className={style.dropdown}>
            <select value={ selectedbot } onChange={handleChange}>
                <option value="none">Bot's!</option>
                {bots.map((bot,index) => (
                    <option  key={index} value={JSON.stringify({ bot_id:bot._id, bot_token:bot.bot_token, bot_name:bot.bot_name })}>{ bot.bot_name }</option>
                ))}
                <option value="addnewbot">Add New Bot!</option>
            </select>
        </div>
    );
}
