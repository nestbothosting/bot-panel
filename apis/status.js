"use server";

import axios from "axios";
import NodeModel from "@/utilise/nodemd";
import mongo from '@/utilise/mongoose'
import MyBotModel from '@/utilise/mybotmd'
// import usermd from '@/utilise/usermd'

export async function NodeStatus() {
  try {
    await mongo(); // ensure you're awaiting connection if needed

    const Nodes = await NodeModel.find(); // get all nodes

    const statusPromises = Nodes.map((node) =>
      axios.get(`${node.nodeurl}/node_status`, {
        headers: {
          'x-api-key': node.apikey,
        },
        timeout: 5000 // optional: prevents hanging forever
      })
        .then((res) => ({
          status: true,
          url: RemoveHTTP(node.nodeurl),
          node_id: res.data.node_id,
          node_cid: node._id.toString(), // safer than JSON.stringify
          location: res.data.location
        }))
        .catch((err) => {
          console.warn(`Node ${node.nodeurl} offline or errored: ${err.message}`);
          return {
            status: false,
            url: RemoveHTTP(node.nodeurl),
            node_id: 'none',
            node_cid: node._id.toString(),
            location: "NO..."
          };
        })
    );

    const nodes = await Promise.all(statusPromises); // run all requests
    return nodes;
  } catch (error) {
    console.error("Error getting node statuses:", error.message);
    return [];
  }
}

const RemoveHTTP = (url) => {
  if (typeof url !== 'string') {
    console.error("RemoveHTTP error: url is not a string", url);
    return "";
  }
  return url.replace(/^https?:\/\//, "");
};

export async function CheckNodeCap(node_cid) {
  mongo()
  try {
    const node = await NodeModel.findById(node_cid);
    const response = await axios.get(`${node.nodeurl}/max_cap`, {
      headers: {
        "x-api-key": node.apikey,
      },
    });
    return { status:response.data.status, apikey:node.apikey, url:node.nodeurl }
  } catch (error) {
    console.error("Server error:", error.message);
    return { status:false, message:error.message }
  }
}

export async function BotStatus(botsri) {
  try {
    mongo()
    if (botsri == 'none') return;
    const bot = JSON.parse(botsri)
    if (!bot.bot_id) {
      return { status: false, message: "properties of null (bot id)" }
    }

    const botdata = await MyBotModel.findOne({ bot_id: bot.bot_id })
    const response = await axios.get(`${botdata.node_url}/bot/status/${bot.bot_token}`, {
      headers: {
        "x-api-key": botdata.api_key,
      },
    })

    return response.data
  } catch (error) {
    console.log('bot Status Error:', error.message)
    return { status: false, message: error.message }
  }
}

export const GetBotStatus = async (strBot) => {
  try {
    if (!strBot) return { status: false, message: "Select a Bot" }
    const Bot = JSON.parse(strBot)
    const botdata = await MyBotModel.findOne({ bot_id: Bot.bot_id })
    if (!botdata) return { status: false, message: "No Bot Data Oops" }
    const response = await axios.get(`${botdata.node_url}/bot/info/${Bot.bot_id}`, {
      headers: {
        "x-api-key": botdata.api_key,
      },
    })
    return response.data;
  } catch (error) {
    console.log(error.message)
    return { status: false, message: error.message }
  }
}

export const GetBotLog = async (strBot) => {
  try {
    if (!strBot) return { status: false, message: "Select a Bot" }
    const Bot = JSON.parse(strBot)
    const botdata = await MyBotModel.findOne({ bot_id: Bot.bot_id })
    const response = await axios.get(`${botdata.node_url}/bot/log/${Bot.bot_id}`,
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

export const AdminPanelData = async () => {
  try {
    const nodes = await NodeModel.find()
    const users = await axios.get(`https://account.nestbot.xyz/totalusers`, {
      headers: {
        "x-api-key": process.env.ACAPIKEY
      }
    })
    const results = { users: users.data.totusers, bots: 0, onlinebots: 0, autoreplay: 0, autoroleadd: 0, tickets: 0, timedmsg: 0, yns: 0 }

    for (let node of nodes) {
      const response = await axios.get(`${node.nodeurl}/admin/panel-data`, {
        headers: {
          "x-api-key": node.apikey
        }
      })
      results.bots += response.data.bots;
      results.autoreplay += response.data.autoreplay;
      results.autoroleadd += response.data.autoroleadd;
      results.onlinebots += response.data.onlinebots;
      results.tickets += response.data.tickets;
      results.timedmsg += response.data.timedmsg;
      results.yns += response.data.yns;
    }
    return { status: true, results }
  } catch (error) {
    console.log(error.message)
    return { status: false, message: error.message }
  }
}