// utilise/usermd.js
import mongoose, { Schema } from 'mongoose'

const NbotSchema = new Schema({
  node_url: { type:String },
  api_key: { type:String },
  bot_id: { type:String },
  node_id: { type:String },
  owner_id: { type:String },

})

const Nbot = mongoose.models?.nbot || mongoose.model("nbot", NbotSchema)

export default Nbot