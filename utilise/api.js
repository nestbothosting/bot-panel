"use server"

import axios from 'axios'
import mongo from './mongoose'
import NodeModel from './nodemd'
import MyBotsModel from './mybotmd'

export async function SaveNode(key, url) {
    try {
        await mongo()
        const NewNode = new NodeModel({
            apikey: key,
            nodeurl: url
        })
        await NewNode.save()
        console.log("Save New Node")
    } catch (error) {
        console.log(error)
    }
}

export async function GetOneBot(bot_id) {
    try {
        if (!bot_id) {
            return { status: false, message: "Select or Add a Bot" }
        }
        const botdata = await MyBotsModel.findOne({ bot_id: bot_id })
        const response = await axios.get(`${botdata.node_url}/bot/bot/${bot_id}`, {
            headers: {
                "x-api-key": botdata.api_key,
            },
        })
        return response.data;
    } catch (error) {
        console.log(error.message)
        return { status: false, message: "Oops Server Error!" }
    }
}

export async function GetmyBots(ownid) {
    try {
        mongo()
        let Bots = []
        const mybots = await MyBotsModel.find({ owner_id: ownid })

        for (let x in mybots) {
            const response = await axios.get(`${mybots[x].node_url}`, {
                headers: {
                    "x-api-key": mybots[x].api_key,
                },
            })

            if (response.data.status) {
                Bots.push(response.data.bots)
            }
        }
        console.log(Bots)
    } catch (error) {
        console.log(error)
    }
}

export async function SaveChange(bot_id, bot_name, bot_token, st_message) {
    try {
        const botdata = await MyBotsModel.findOne({ bot_id: bot_id })

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
        console.log(error.message)
        return { status: false, message: error.message }
    }
}

export async function GetSettingsData(strBot) {
    try {
        if (!strBot) {
            return { status: false, message: 'Select a bot' };
        }

        const Bot = JSON.parse(strBot);
        const botdata = await MyBotsModel.findOne({ bot_id: Bot.bot_id });

        if (!botdata) {
            return { status: false, message: "Bot not found or unknown Bot id" };
        }

        const servers = await axios.get(`${botdata.node_url}/bot/servers/${Bot.bot_token}`, {
            headers: {
                "x-api-key": botdata.api_key,
            },
        });

        if (servers.data?.status && Array.isArray(servers.data.server)) {
            const server = servers.data.server.map(s => ({
                name: s.name,
                id: s.id
            }));
            return {
                status: true,
                servers: server
            };
        } else {
            return {
                status: false,
                message: servers.data?.message || "Start the bot or check bot server endpoint"
            };
        }
    } catch (error) {
        console.log("GetSettingsData error:", error.message);
        return { status: false, message: error.message };
    }
}

export const GetMyChannels = async (server_id, strbot) => {
    try {
        const Channels = []
        if (!strbot) {
            return { status: false, message: "Select a Bot" }
        }
        const bot = JSON.parse(strbot)
        const botdata = await MyBotsModel.findOne({ bot_id: bot.bot_id })
        const response = await axios.post(`${botdata.node_url}/bot/channels`,
            {
                server_id, bot_token: bot.bot_token
            },
            {
                headers: {
                    "x-api-key": botdata.api_key,
                    'Content-Type': 'application/json'
                },
            }
        )

        if (!response.data.status) return response.data

        for (let x in response.data.channels) {
            Channels.push({
                name: response.data.channels[x].name,
                id: response.data.channels[x].id,
                type: response.data.channels[x].type
            })
        }

        return { status: true, channels: Channels };
    } catch (error) {
        console.log(error.message)
        return { status: false, message: error.message }
    }
}

export const GetMyRoles = async (server_id, strBot) => {
    try {
        const Roles = []
        if (!strBot) return { status: false, message: "Select a Bot" }
        const Bot = JSON.parse(strBot)
        const botdata = await MyBotsModel.findOne({ bot_id: Bot.bot_id })
        const response = await axios.post(`${botdata.node_url}/bot/roles`,
            {
                server_id, bot_token: Bot.bot_token
            },
            {
                headers: {
                    "x-api-key": botdata.api_key,
                    'Content-Type': 'application/json'
                },
            }
        )

        if (!response.data.status) {
            return response.data
        }

        for (const role of response.data.roles) {
            Roles.push({ name: role.name, id: role.id })
        }

        return { status: true, roles: Roles }
    } catch (error) {
        console.log(error.message)
        return { status: false, message: error.message }
    }
}

export const SendTicket = async (ticketdata, fieldvalue, permission, strBot) => {
    try {
        if (!strBot || strBot === 'none') return { status: false, message: 'Select a Bot!' }
        if (!ticketdata.title) return { status: false, message: "Ticket title is required." }
        if (!ticketdata.server_id) return { status: false, message: "Select a Server" }
        if (!ticketdata.channel_id) return { status: false, message: "Select a Channel" }
        const Bot = JSON.parse(strBot)
        const botdata = await MyBotsModel.findOne({ bot_id: Bot.bot_id })
        const response = await axios.post(`${botdata.node_url}/event/ticket`,
            {
                ticketdata, fieldvalue,
                permission, bot_token: Bot.bot_token
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

export const EmbedMessage = async (fields,embed, strBot) => {
    try {
        if (!strBot || strBot === 'none') return { status: false, message: 'Select a Bot!' }
        if (!embed.title) return { status: false, message: "Ticket title is required." }
        if (!embed.server_id) return { status: false, message: "Select a Server" }
        if (!embed.channel_id) return { status: false, message: "Select a Channel" }

        const Bot = JSON.parse(strBot)
        const botdata = await MyBotsModel.findOne({ bot_id:Bot.bot_id })
        if(!botdata) return { status:false, message:'Missing Your Bot Data!' }
        const response = await axios.post(`${botdata.node_url}/event/embed`,
            {
                bot_token:Bot.bot_token,
                fields,
                embed
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
        return { status:false, message: error.message }
    }
}