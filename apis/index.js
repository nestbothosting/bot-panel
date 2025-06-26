"use server";

import axios from "axios";
import { CheckNodeCap } from "./status";
import mongo from '@/utilise/mongoose'
import MyBotsModel from '@/utilise/mybotmd'

export async function SaveBot(token, name, ownid) {
    try {
        const base = await CheckNodeCap();
        if (!base) {
            return { status: false, message: "No available node found to create the bot." }
        }
        const { api_key, node_url } = base;

        const response = await axios.post(`${node_url}/bot/add_bot`,
            {
                bot_token: token, bot_name: name, owner_id: ownid
            },
            {
                headers: {
                    "x-api-key": api_key,
                    'Content-Type': 'application/json'
                },
            })

        if (response.data.status) {
            mongo()
            const newbot = new MyBotsModel({
                node_url: node_url,
                bot_id: response.data.id,
                node_id: response.data.node_id,
                owner_id: ownid,
                api_key: api_key
            })
            await newbot.save()
        }
        return { status: true, message: response.data.message }
    } catch (error) {
        console.log(error)
        return { status: false, message: "Oops Server Error" }
    }
}

export async function Mybots(userstring) {
    try {
        mongo()
        let MyBots = []
        if(!userstring) return[]
        const user = JSON.parse(userstring)
        const mybotsdata = await MyBotsModel.find({ owner_id: user.id })

        for (let x in mybotsdata) {
            try {
                const response = await axios.get(`${mybotsdata[x].node_url}/bot/mybots/${user.id}`, {
                    headers: {
                        "x-api-key": mybotsdata[x].api_key,
                    },
                })

                if (response.data.status) {
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

export async function StartBot(bot_token, bot_id) {
    try {
        mongo()
        const botdata = await MyBotsModel.findOne({ bot_id: bot_id })
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
        return { status: false, message: "Oops Server Error" }
    }
}

export async function StopBot(bot_token, bot_id) {
    try {
        mongo()
        if (!bot_id) {
            return { status: false, message: "bot id error" }
        }
        const botdata = await MyBotsModel.findOne({ bot_id })
        const response = await axios.get(`${botdata.node_url}/bot/stop/${bot_token}`, {
            headers: {
                "x-api-key": botdata.api_key,
            },
        })

        return response.data
    } catch (error) {
        console.log(error)
        return { status: false, message: error.message }
    }
}

export async function DeleteBot(bot_id) {
    try {
        if (!bot_id || typeof bot_id !== 'string') {
            return { status: false, message: "Invalid bot ID" };
        }

        const botdata = await MyBotsModel.findOne({ bot_id });
        if (!botdata) {
            return { status: false, message: "Bot not found or unknown bot ID" };
        }

        const response = await axios.post(`${botdata.node_url}/bot/delete`,
            {
                bot_id
            },
            {
                headers: {
                    "x-api-key": botdata.api_key,
                },

            });

        if (!response.data.status) {
            return { status: false, message: response.data.message };
        }

        await botdata.deleteOne(); // .delete() is deprecated in newer Mongoose versions
        return { status: true, message: "Bot deleted successfully" };

    } catch (error) {
        console.error("DeleteBot error:", {
            message: error.message,
            response: error?.response?.data,
            stack: error.stack,
        });

        return { status: false, message: "Failed to delete bot. Try again later." };
    }
}

export const CreateNewTimedmessage = async (tday, thours, tminutes, server_id, channel_id, messages, strBot) => {
    try {
        if (!strBot) return { status: false, message: "Select a Bot!" }
        if (!server_id || !channel_id) return { status: false, message: "Select Channel or Server" }
        const Bot = JSON.parse(strBot)
        const botdata = await MyBotsModel.findOne({ bot_id: Bot.bot_id })
        if (!botdata) return { status: false, message: "No Bot Data!" }
        const response = await axios.post(`${botdata.node_url}/event/timedmessage`,
            {
                tday, thours, tminutes, server_id, channel_id, messages, bot_id: Bot.bot_id
            },
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

export const GetTMSData = async (server_id, strBot) => {
    try {
        if (!strBot) return { status: false, message: "Select a Bot" }
        if (!server_id) return { status: false, message: "Select a Server" }
        const Bot = JSON.parse(strBot)
        const botdata = await MyBotsModel.findOne({ bot_id: Bot.bot_id })
        const response = await axios.get(`${botdata.node_url}/event/my_timedmessage/${server_id}`,
            {
                headers: {
                    "x-api-key": botdata.api_key,
                }
            }
        )
        return response.data;
    } catch (error) {
        console.log(error.message)
        return { status: false, message: error.message }
    }
}

export const Stop_TMS = async (c_id, strBot) => {
    try {
        if (!strBot) return { status: false, message: "Select a Bot" }
        const Bot = JSON.parse(strBot)
        const botdata = await MyBotsModel.findOne({ bot_id: Bot.bot_id })
        const response = await axios.get(`${botdata.node_url}/event/stop_timedmessage/${c_id}`,
            {
                headers: {
                    "x-api-key": botdata.api_key,
                }
            }
        )
        return response.data;
    } catch (error) {
        console.log(error.message)
        return { status: false, message: error.message }
    }
}

export const Start_TMS = async (c_id, strBot) => {
    try {
        if (!strBot) return { status: false, message: "Select a Bot" }
        const Bot = JSON.parse(strBot)
        const botdata = await MyBotsModel.findOne({ bot_id: Bot.bot_id })
        const response = await axios.get(`${botdata.node_url}/event/start_timedmessage/${c_id}`,
            {
                headers: {
                    "x-api-key": botdata.api_key,
                }
            }
        )
        return response.data;
    } catch (error) {
        console.log(error.message)
        return { status: false, message: error.message }
    }
}

export const Delete_TMS = async (c_id, strBot) => {
    try {
        if (!strBot) return { status: false, message: "Select a Bot" }
        const Bot = JSON.parse(strBot)
        const botdata = await MyBotsModel.findOne({ bot_id: Bot.bot_id })
        const response = await axios.post(`${botdata.node_url}/event/delete_timedmessage`,
            {
                c_id
            },
            {
                headers: {
                    "x-api-key": botdata.api_key,
                }
            }
        )
        return response.data;
    } catch (error) {
        console.log(error.message)
        return { status: false, message: error.message }
    }
}

export const CreateWelcomeMessage = async (server_id, channel_id, message, strBot) => {
    try {
        if (!server_id || !channel_id || !message) return { status: false, message: "Missing required fields (Server ID, Channel ID, Message)" }
        if (!strBot) return { status: false, message: "Select a Bot" }
        const Bot = JSON.parse(strBot)
        const botdata = await MyBotsModel.findOne({ bot_id: Bot.bot_id })
        const response = await axios.post(`${botdata.node_url}/set_welcome_message`,
            {
                server_id, channel_id, message, bot_id: Bot.bot_id
            },
            {
                headers: {
                    "x-api-key": botdata.api_key,
                }
            }
        )
        return response.data;
    } catch (error) {
        console.log(error.message)
        return { status: false, message: error.message }
    }
}

export const CreateLeaveMessage = async (server_id, channel_id, message, strBot) => {
    try {
        if (!server_id || !channel_id || !message) return { status: false, message: "Missing required fields (Server ID, Channel ID, Message)" }
        if (!strBot) return { status: false, message: "Select a Bot" }
        const Bot = JSON.parse(strBot)
        const botdata = await MyBotsModel.findOne({ bot_id: Bot.bot_id })
        const response = await axios.post(`${botdata.node_url}/set_leave_message`,
            {
                server_id, channel_id, message, bot_id: Bot.bot_id
            },
            {
                headers: {
                    "x-api-key": botdata.api_key,
                }
            }
        )
        return response.data;
    } catch (error) {
        console.log(error.message)
        return { status: false, message: error.message }
    }
}

export const GetWelcomeLeaveSM = async (server_id, strBot) => {
    try {
        if (!strBot) return { status: false, message: "Select a Bot" }
        const Bot = JSON.parse(strBot)
        const botdata = await MyBotsModel.findOne({ bot_id: Bot.bot_id })
        const response = await axios.get(`${botdata.node_url}/get_wlms/${server_id}`,
            {
                headers: {
                    "x-api-key": botdata.api_key,
                }
            }
        )
        return response.data;
    } catch (error) {
        console.log(error.message);
        return { status: false, message: error.message }
    }
}

export const DeleteWLMS = async (server_id, type, strBot) => {
    try {
        if (!server_id) return { status: false, message: "Server ID is required." };
        if (!type) return { status: false, message: "Type is required." };
        if (!strBot) return { status: false, message: "Bot information is missing." };
        const Bot = JSON.parse(strBot)
        const botdata = await MyBotsModel.findOne({ bot_id: Bot.bot_id })
        const response = await axios.post(`${botdata.node_url}/delete_wlms`,
            {
                server_id, type
            },
            {
                headers: {
                    "x-api-key": botdata.api_key,
                }
            }
        )
        return response.data;
    } catch (error) {
        console.log(error.message)
        return { status: false, message: error.message }
    }
}