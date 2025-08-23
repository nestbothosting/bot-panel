// utilise/usermd.js
import mongoose, { Schema } from 'mongoose'

const NodeSchema = new Schema({
  apikey: { type:String, required:true, unique: true },
  nodeurl: { type:String, required:true, unique: true },
})

const Node = mongoose.models?.node || mongoose.model("node", NodeSchema)

export default Node
