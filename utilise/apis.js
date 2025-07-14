'use server'

import mongo from './mongoose'
import usermd from './usermd'
import NodeModel from './nodemd'
import axios from 'axios'
import myBotsModel from './mybotmd'

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