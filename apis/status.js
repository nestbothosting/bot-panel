"use server";

import axios from "axios";
import NodeModel from "@/utilise/nodemd";

export async function NodeStatus() {
  try {
    const Nodes = await NodeModel.find(); // Await the DB call
    const statusPromises = Nodes.map((node) =>
      axios.get(`${node.nodeurl}/node_status`, {
          headers: {
            "x-api-key": node.apikey,
          },
        })
        .then((res) => ({ status:true, url:RemoveHTTP(node.nodeurl), node_id:res.data.node_id}))
        .catch(() => ({ status: false, url:RemoveHTTP(node.nodeurl), node_id:'none' }))
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