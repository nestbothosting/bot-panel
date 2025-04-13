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
                bot_id:response.data.id,
                node_id:response.data.node_id,
                owner_id:ownid,
                api_key:api_key
            })
            await newbot.save()
        }
        return { status:true, message:response.data.message }
    } catch (error) {
        console.log(error)
        return { status:false, message:"Oops Server Error"}
    }
}

export async function Mybots(userstring){
    try {
        mongo()
        let MyBots = []

        const user = JSON.parse(userstring)
        const mybotsdata = await MyBotsModel.find({ owner_id:user.id })

        for(let x in mybotsdata){
            try {
                const response = await axios.get(`${mybotsdata[x].node_url}/bot/mybots/${user.id}`,{
                    headers: {
                        "x-api-key": mybotsdata[x].api_key,
                    },
                })
                
                if(response.data.status){
                    MyBots.push(response.data.bots)
                }
            } catch (error) {
                console.log(error.message)
            }
        }
        const Bots = MyBots.flat()

        const uniqueBots = Array.from(
            new Map(Bots.map(bot => [bot._id, bot])).values()
          
        );
        return uniqueBots;
    } catch (error) {
        console.log(error)
        return []
    }
}

export async function StartBot(bot_token,bot_id) {
    try {
        mongo()
        const botdata = await MyBotsModel.findOne({ bot_id:bot_id })
        const response = await axios.post(`${botdata.node_url}/bot/start`,
            {
                bot_token
            },
            {
                headers: {
                    "x-api-key": botdata.api_key,
                    'Content-Type': 'application/json'
                },
            }
        )

        return response.data
    } catch (error) {
        console.log(error)
        return { status:false, message:"Oops Server Error"}
    }
}

export async function StopBot(bot_token, bot_id) {
    try {
        mongo()
        if(!bot_id){
            return { status:false, message:"bot id error" }
        }
        const botdata = await MyBotsModel.findOne({ bot_id })
        const response = await axios.get(`${botdata.node_url}/bot/stop/${bot_token}`,{
            headers: {
                "x-api-key": botdata.api_key,
            },
        })

        return response.data
    } catch (error) {
        console.log(error)
        return { status:false, message:error.message }
    }
}