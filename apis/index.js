"use server";

import axios from "axios";
import { CheckNodeCap } from "./status";
import mongo from '@/utilise/mongoose'
import MyBotsModel from '@/utilise/mybotmd'

export async function SaveBot(token, name, ownid) {
    try {
        const base = await CheckNodeCap();
        if (!base) {
            return { status:false, message:"No available node found to create the bot." }
        }
        const { api_key, node_url } = base;

        const response = await axios.post(`${node_url}/bot/add_bot`,
            {
                bot_token:token, bot_name:name, owner_id:ownid
            },
            {
            headers: {
                "x-api-key": api_key,
                'Content-Type': 'application/json'
            },
        })
        
        if(response.data.status){
            mongo()
            const newbot = new MyBotsModel({
                node_url:node_url,
                bot_uid:response.data.id,
                node_id:response.data.node_id
            })
            await newbot.save()
        }
        return { status:true, message:response.data.message }
    } catch (error) {
        console.log(error)
        return { status:false, message:"Oops Server Error"}
    }
}