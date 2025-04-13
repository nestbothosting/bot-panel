"use server"

import axios from 'axios'
import mongo from './mongoose'
import NodeModel from './nodemd'
import MyBotsModel from './mybotmd'

export async function SaveNode(key,url){
    try {
        await mongo()
        const NewNode = new NodeModel({
            apikey:key,
            nodeurl:url
        })
        await NewNode.save()
        console.log("Save New Node")
    } catch (error) {
        console.log(error)
    }
}

export async function GetOneBot(bot_id){
    try {
        if(!bot_id){
            return { status:false, message:"Select or Add a Bot"}
        }
        const botdata = await MyBotsModel.findOne({ bot_id:bot_id })
        const response = await axios.get(`${botdata.node_url}/bot/bot/${bot_id}`,{
            headers: {
                "x-api-key": botdata.api_key,
            },
        })
        return response.data;
    } catch (error) {
        console.log(error)
        return { status:false, message:"Oops Server Error!"}
    }
}

export async function GetmyBots(ownid){
    try {
        mongo()
        let Bots = []
        const mybots = await MyBotsModel.find({ owner_id:ownid })

        for(let x in mybots){
            const response = await axios.get(`${mybots[x].node_url}`,{
                headers: {
                    "x-api-key": mybots[x].api_key,
                },
            })

            if(response.data.status){
                Bots.push(response.data.bots)
            }
        }
        console.log(Bots)
    } catch (error) {
        console.log(error)
    }
}

export async function SaveChange(bot_id, bot_name, bot_token, st_message){
    try {
        const botdata = await MyBotsModel.findOne({ bot_id:bot_id })
    
        if (!botdata) {
            return { status: false, message: "Bot not found" };
        }

        const response = await axios.post(`${botdata.node_url}/bot/update`,
            {
                bot_id, bot_name, bot_token, st_message
            },
            {
                headers: {
                    "x-api-key": botdata.api_key,
                    'Content-Type': 'application/json'
                },
            }
        )
        return response.data;
    } catch (error) {
        console.log(error)
        return { status:false, message:"Oops Server Error" }
    }
}