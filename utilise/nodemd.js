// utilise/usermd.js
import mongoose, { Schema } from 'mongoose'

const NodeSchema = new Schema({
  apikey: { type:String },
  nodeurl: { type:String },

})

const Node = mongoose.models?.node || mongoose.model("node", NodeSchema)

export default Node
