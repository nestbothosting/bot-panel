'use server'

import mongo from './mongoose'
import usermd from './usermd'
import NodeModel from './nodemd'
import axios from 'axios'
import myBotsModel from './mybotmd'
import AnnoncModel from './announ_md'

export const GetUserData = async (id, page = 1) => {
    try {
        await mongo()
        const limit = 4

        const admin = await usermd.findById(id)
        if (!admin || !admin.admin) return { status: false, message: "Admins Only!" }

        const users = await usermd.find()
            .skip((page - 1) * limit)
            .limit(limit);

        return { status: true, users }
    } catch (error) {
        console.log(error.message)
        return { status: false, message: error.message }
    }
}

export const GetBotsData = async (node_cid, page) => {
    try {
        await mongo()
        const botdata = await NodeModel.findById(node_cid)
        if (!botdata) return { status: false, message: `No Node for ${node_cid} this C id` }
        const response = await axios.get(`${botdata.nodeurl}/admin/bots/${page}`, {
            headers: {
                "x-api-key": botdata.apikey,
            },
        })
        return response.data;
    } catch (error) {
        console.log(error.message)
        return { status: false, message: error.message }
    }
}

export async function checkAddBotinWeb(user_cid) {
    try {
        await mongo(); 
        const bots = await myBotsModel.find({ owner_id: user_cid });

        if (!bots || bots.length === 0) {
            return { status: false, message: "No bots found for this user.", alert:true };
        }

        return { status: true };
    } catch (error) {
        console.error("Error in checkAddBotinWeb:", error);
        return { status: false, message: error.message || "An error occurred." };
    }
}

export const SendAutoReplaySTM = async (serverdata, messagekey, messageReplay, strBot) => {
    try {
        if (!strBot) return { status: false, message: "Select a Bot" }
        if(!serverdata || !serverdata.server_id || !messagekey || !messageReplay) return { status:false, message:"Please fill in all fields." }
        const Bot = JSON.parse(strBot)
        const botdata = await myBotsModel.findOne({ bot_id: Bot.bot_id })
        const response = await axios.post(`${botdata.node_url}/event/autoreplay`,
            {
                serverdata, messagekey, messageReplay, bot_token:Bot.bot_token
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
        console.log(error.message)
        return { status: false, message: error.message }
    }
}

export const fechAutoRoleData = async (server_id, strBot) => {
    try {
        if (!strBot) return { status: false, message: "Select a Bot" }
        if(!server_id) return { status:false, message:"Server id is required" }
        const Bot = JSON.parse(strBot)
        const botdata = await myBotsModel.findOne({ bot_id: Bot.bot_id })
        const response = await axios.get(`${botdata.node_url}/event/autoreplay/${server_id}`,
            {
                headers: {
                    "x-api-key": botdata.api_key,
                },
            }
        )

        return response.data;
    } catch (error) {
        console.log(error.message)
        return { status: false, message: error.message }
    }
}

export const DeleteARMS = async (cid, strBot) => {
    try {
        if (!strBot) return { status: false, message: "Select a Bot" }
        if(!cid) return { status:false, message:"cid is required" }
        const Bot = JSON.parse(strBot)
        const botdata = await myBotsModel.findOne({ bot_id: Bot.bot_id })
        const response = await axios.get(`${botdata.node_url}/event/delete_autoreplay/${cid}`,
            {
                headers: {
                    "x-api-key": botdata.api_key,
                },
            }
        )

        return response.data;
    } catch (error) {
        console.log(error.message)
        return { status: false, message: error.message }
    }
}

export const GetOnlineBots = async (page = 1, node_cid) => {
    try {
        if (!node_cid) return { status: false, message: `No Node's For the id: ${node_cid}`  }
        const botdata = await NodeModel.findById(node_cid)
        const response = await axios.get(`${botdata.nodeurl}/admin/onlinebots/${page}`,
            {
                headers: {
                    "x-api-key": botdata.apikey,
                },
            }
        )

        return response.data;
    } catch (error) {
        console.log(error.message)
        return { status: false, message: error.message }
    }
}

export const SaveAnnouncement = async (message) => {
    mongo()
    try {
        if(!message) return { status:false, message:"Message is Null!, Enter Message" }
        const messages = await AnnoncModel.findOne()

        if(messages.length === 0){
            const NewMessage = new AnnoncModel({
                message:[message]
            })
            await NewMessage.save();
            return { status: true, message: "Successfully created new message!" };
        }

        messages.message.push(message)
        await messages.save()
        return { status:true, message:"Successfully Create Message!" }
    } catch (error) {
        console.log(error.message)
        return { status:true, message:error.message }
    }
}

export const GetAnnouncement = async () => {
    mongo()
    try {
        const messages = await AnnoncModel.findOne()
        return { status:true, messages:messages.message }
    } catch (error) {
        console.log(error.message)
        return { status:false, message:error.message }
    }
}

export const DeleteAnnouncement = async (index) => {
    mongo()
    try {
        const messages = await AnnoncModel.findOne();
        messages.message.splice(index,1)
        await messages.save()
        return { status:true, message:`Delete Message, Index: ${index}`}
    } catch (error) {
        console.log(error)
        return { status:false, message:error.message }
    }
}