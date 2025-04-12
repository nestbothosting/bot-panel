"use server";

import axios from "axios";
import NodeModel from "@/utilise/nodemd";
import mongo from '@/utilise/mongoose'

export async function NodeStatus() {
  try {
    mongo()
    const Nodes = await NodeModel.find(); // Await the DB call
    const statusPromises = Nodes.map((node) =>
      axios.get(`${node.nodeurl}/node_status`, {
        headers: {
          "x-api-key": node.apikey,
        },
      })
        .then((res) => ({ status: true, url: RemoveHTTP(node.nodeurl), node_id: res.data.node_id }))
        .catch(() => ({ status: false, url: RemoveHTTP(node.nodeurl), node_id: 'none' }))
    );

    const nodes = await Promise.all(statusPromises); // Wait for all requests
    return nodes;
  } catch (error) {
    console.error("Error getting node statuses:", error);
    return [];
  }
}

const RemoveHTTP = (url) => {
  return url.replace(/^https?:\/\//, "");
}

export async function CheckNodeCap() {
  let isDone = null;
  mongo()

  try {
    const nodes = await NodeModel.find();

    for (const node of nodes) {
      try {
        const response = await axios.get(`${node.nodeurl}/max_cap`, {
          headers: {
            "x-api-key": node.apikey,
          },
        });

        if (response.data.status) {
          isDone = {
            node_url: node.nodeurl,
            api_key: node.apikey,
          };
          break; // stops loop after finding a valid node
        }
      } catch (err) {
        // Optional: log or handle node-specific errors
        console.log(`Error checking node ${node.nodeurl}:`, err.message);
      }
    }
  } catch (error) {
    console.error("Server error:", error.message);
  }

  return isDone;
}
